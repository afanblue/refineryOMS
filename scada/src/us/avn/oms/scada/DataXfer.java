/*******************************************************************************
 * Copyright (C) 2018 Laboratorio de Lobo Azul
 *  
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *  
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *******************************************************************************/
package us.avn.oms.scada;

import java.io.PrintWriter;
import java.io.StringWriter;
import java.util.Calendar;
import java.util.Collection;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.TimerTask;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import us.avn.oms.domain.AlarmType;
import us.avn.oms.domain.AnalogInput;
import us.avn.oms.domain.AnalogOutput;
import us.avn.oms.domain.CalcOperand;
import us.avn.oms.domain.CalcVariable;
import us.avn.oms.domain.ControlBlock;
import us.avn.oms.domain.DigitalInput;
import us.avn.oms.domain.DigitalOutput;
import us.avn.oms.domain.Watchdog;
import us.avn.oms.domain.Xfer;
import us.avn.oms.scada.domain.AIX;
import us.avn.oms.service.AlarmService;
import us.avn.oms.service.AnalogInputService;
import us.avn.oms.service.AnalogOutputService;
import us.avn.oms.service.CalcVariableService;
import us.avn.oms.service.ControlBlockService;
import us.avn.oms.service.DigitalInputService;
import us.avn.oms.service.DigitalOutputService;
import us.avn.oms.service.HistoryService;
import us.avn.oms.service.WatchdogService;
import us.avn.oms.service.XferService;
import us.avn.rpn2.RPN2;

public class DataXfer extends TimerTask {
	
    /* Get actual class name to be printed on */
    private Logger log = LogManager.getLogger(this.getClass());
    private AnalogInputService ais = null;
    private AnalogOutputService aos = null;
    private AlarmService as = null;
    private ControlBlockService cbs = null;
    private CalcVariableService cvs = null;
    private DigitalInputService dis = null;
    private DigitalOutputService dos = null;
    private HistoryService hs = null;
    private WatchdogService wds = null;
    private XferService xs = null;

    private HashMap<String,AlarmType> almTypes = null;
 
	public void run( ) {
		log.debug("Start AI processing");
		Calendar cal = Calendar.getInstance();
		if( cal.get(Calendar.HOUR) == 0 && cal.get(Calendar.MINUTE) == 0 ) {
			try {
				wait(10000);
			} catch( Exception e ) {
				StringWriter sw = new StringWriter();
				e.printStackTrace(new PrintWriter(sw));
				String eas = sw.toString();
				log.error(eas);
			}
		}

/*  */
		ApplicationContext context = new ClassPathXmlApplicationContext("app-context.xml");
		if( ais== null) { ais = (AnalogInputService) context.getBean("analogInputService"); }
		if( aos== null) { aos = (AnalogOutputService) context.getBean("analogOutputService"); }
		if( dis== null) { dis = (DigitalInputService) context.getBean("digitalInputService"); }
		if( dos== null) { dos = (DigitalOutputService) context.getBean("digitalOutputService"); }
		if( xs == null) { xs = (XferService) context.getBean("xferService"); }
		if( as == null) { as = (AlarmService) context.getBean("alarmService"); }
		if( hs == null) { hs = (HistoryService) context.getBean("historyService"); }
		if( wds== null) { wds = (WatchdogService) context.getBean("watchdogService"); }
		if( cvs== null) { cvs = (CalcVariableService) context.getBean("calcVariableService"); }
		if( cbs== null) { cbs = (ControlBlockService) context.getBean("controlBlockService"); }
		
		almTypes = getAlarmTypes(as);
		
		Calendar now = Calendar.getInstance();
		if( now.get(Calendar.SECOND) == 0 ) {
			processAnalogInputs();
		}
/*  */
		processDigitalInputs();
		
		processCalculatedVariables();
		
		processControlBlocks();
		
		processAnalogOutputs();
		
		processDigitalOutputs();

		log.debug("End process variable processing");
		return;
	}
	
	private void processAnalogInputs() {
		wds.updateWatchdog(Watchdog.AI);
//		Update the analog inputs (check the xfer table, get and process the values)
		Iterator<AnalogInput> iai = ais.getAllUpdatedAItags().iterator();
		while( iai.hasNext() ) {
			AIX ai = new AIX(iai.next());
			log.debug("AnalogInput: "+ai.toString());
			log.debug("Processing AI tag "+ai.getTag().getName() + "/" + ai.getTagId());
			processAIValue( ai, ai.getSimValue(), ai.getSimScanTime());
			xs.clearUpdated(ai.getTagId());
		}
		log.debug("Completed processing analog inputs");
	}
	
	private void processDigitalInputs() {
		wds.updateWatchdog(Watchdog.DI);

		Collection<DigitalInput> cdi = dis.getAllUpdatedDItags();
		Iterator<DigitalInput> idi = cdi.iterator();
		while( idi.hasNext() ) {
			DigitalInput di = idi.next();
			log.debug("Processing DI tag "+di.toString());
			if( 0 != di.getUpdated() ) {
				Date now = new Date();
				Double result = new Double(di.getSimValue());
				processDIValue(di, result, now );
			}
			xs.clearUpdated(di.getTagId());
		}
	}
	
	private void processCalculatedVariables() {
		wds.updateWatchdog(Watchdog.CV);
//		Now update all the calculated variables
		RPN2 evaluator = new RPN2();
		Iterator<CalcVariable> icv = cvs.getAllCalcVariables().iterator();
		while ( icv.hasNext() ) {
			CalcVariable cv = icv.next();
			log.debug("Processing CV "+cv.getTag().getName()+"/"+cv.getId()
			         +" as "+cv.getDefinition());
			Iterator<CalcOperand> ico = cvs.getValuesForCalculation(cv.getId()).iterator();
			Double[] cvin = new Double[10];
			int coi = 0;
			while( ico.hasNext() ) {
				CalcOperand co = ico.next();
				cvin[coi] = co.getScanValue();
				coi++;
			}
			Double result = evaluator.evaluate(cv.getDefinition(), cvin );
			log.debug("CV: "+cv.getTag() +" Defn: "+cv.getDefinition()+" using input "+cvin[0]
					 +" yields "+result);
			Date now = new Date();
			AnalogInput ai = ais.getAnalogInput(cv.getOutputTagId());
			if( null != ai ) {
				AIX aix = new AIX(ai);
				processAIValue( aix, result, now );
			} else {
				DigitalInput di = dis.getDigitalInput(cv.getOutputTagId());
				processDIValue( di, result, now );
			}
		}
		log.debug("Completed processing calculated variables");
	}
	
	/**
	 * Method: processControlBlocks
	 * Parameters: none
	 * Description: the getAllAOs retrieves all the control blocks for which the PV != SP
	 */
	private void processControlBlocks() {
		wds.updateWatchdog(Watchdog.CB);
		Iterator<ControlBlock> icb = cbs.getAllAOs().iterator();
		while( icb.hasNext() ) {
			ControlBlock cb = icb.next();
			log.debug("Processing ControlBlock: "+cb.toString());
			AnalogOutput co = aos.getAnalogOutput(cb.getId());
			AnalogInput sp = ais.getAnalogInput(cb.getSpId());
			co.setPrevValue(co.getScanValue());
			co.setPrevTime(co.getScanTime());
			// not sure the following is right.  I was thinking to scale the output based on the
			// proportion of the setpoint scale, ie, if the setpoint is 50% of the setpoint range,
			// set the output to 50% of its range.  Does that make sense to you?
			Double prop = (cb.getSetpoint()-sp.getZeroValue())/(sp.getMaxValue()-sp.getZeroValue());
			Double cov = prop * (co.getMaxValue()-co.getZeroValue());
			co.setScanValue(cov);
			aos.updateAOvalue(co);
		}
		log.debug("Completed processing control blocks");
	}
	
	private void processAnalogOutputs() {
		wds.updateWatchdog(Watchdog.AO);
		Iterator<AnalogOutput> iao = aos.getAnalogOutputsToUpdate().iterator();
		while( iao.hasNext()) {
			AnalogOutput ao = iao.next();
			log.debug("Processing AnalogOutput: "+ao.toString());
			Xfer x = new Xfer(ao.getTagId(), ao.getScanValue() );
			xs.updateXfer(x);
			aos.clearAOupdate(ao.getTagId());
		}
		log.debug("Completed processing analog outputs");
	}
	
	private void processDigitalOutputs() {
		wds.updateWatchdog(Watchdog.DO);
		Iterator<DigitalOutput> ido = dos.getDigitalOutputsToUpdate().iterator();
		while( ido.hasNext()) {
			DigitalOutput d = ido.next();
			log.debug("Processing DigitalOutput: "+d.toString());
			Xfer x = new Xfer(d.getTagId(), d.getScanValue() );
			xs.updateXfer(x);
			dos.clearDOupdate(d.getTagId());
		}
		log.debug("Completed processing digital outputs");
	}
	
	/**
	 * Method: correctScanValue
	 * Description: provide any needed corrections for the raw scan value
	 *              based on the analog type.
	 *              Currently the only modification is for Accumulator analogs
	 *              which increase the value based on the amount for the current
	 *              rain event.  NB, this may only be applicable for AcuRite
	 *              rain values.
	 * @param ai
	 * @param scanValue
	 * @return newScanValue 
	 */
	private Double correctScanValue( AIX ai, Double scanValue ) {
		Double newScanValue = scanValue;
		if( "A".equals(ai.getAnalogTypeCode()) ) {
			Double rawValue = ai.getRawValue();
			newScanValue = ai.getScanValue();
			if( scanValue != 0D ) {
				if( scanValue > rawValue ) {
					newScanValue += (scanValue-rawValue);
				}
			}
		}
		return newScanValue;
	}
	
	/**
	 * Method: processAIValue
	 * Description: 
	 * @param ai
	 * @param scanValue
	 * @param scanTime
	 */
	private void processAIValue( AIX ai, Double scanValue, Date scanTime ) {
		try {
			Double newScanValue = correctScanValue( ai, scanValue );
			ai.setRawValue(scanValue);
			ai.setPrevValue(ai.getScanValue());
			ai.setPrevTime(ai.getScanTime());
			ai.setScanValue(newScanValue);
			ai.setScanTime(scanTime);
			ai.checkForAlarm(as, almTypes);
			ai.updateHistory(hs);
			ais.updateAnalogInput(ai);
		} catch( Exception e ) {
			StringWriter sw = new StringWriter();
			e.printStackTrace(new PrintWriter(sw));
			log.error(sw.toString());
		}
	}

	/**
	 * Method: processDIValue 
	 * Description: 
	 * @param di
	 * @param scanValue
	 * @param scanTime
	 */
	private void processDIValue( DigitalInput di, Double scanValue, Date scanTime ) {
		di.setPrevValue(di.getScanValue());
		di.setPrevScanTime(di.getScanTime());
		di.setScanValue(scanValue);
		di.setScanTime(scanTime);
		dis.updateDigitalInput(di);
	}
	
	private HashMap<String,AlarmType> getAlarmTypes( AlarmService as ) {
		HashMap<String,AlarmType> tat = new HashMap<String,AlarmType>();
		Iterator<AlarmType> iat = as.getAlarmTypes().iterator();
		while( iat.hasNext() ) {
			AlarmType c = iat.next();
			tat.put(c.getCode(), c);
		}
		return tat;
	}
	
}
