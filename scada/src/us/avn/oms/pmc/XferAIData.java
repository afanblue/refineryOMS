package us.avn.oms.pmc;

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

import us.avn.oms.pmc.domain.AIX;
import us.avn.oms.domain.AlarmType;
import us.avn.oms.domain.AnalogInput;
import us.avn.oms.domain.CalcOperand;
import us.avn.oms.domain.CalcVariable;
import us.avn.oms.domain.Watchdog;
import us.avn.oms.service.AlarmService;
import us.avn.oms.service.AnalogInputService;
import us.avn.oms.service.CalcVariableService;
import us.avn.oms.service.HistoryService;
import us.avn.oms.service.WatchdogService;
import us.avn.oms.service.XferService;
import us.avn.rpn2.RPN2;

public class XferAIData extends TimerTask {
	
    /* Get actual class name to be printed on */
    private Logger log = LogManager.getLogger(this.getClass());
    private AnalogInputService ais = null;
    private AlarmService as = null;
    private CalcVariableService cvs = null;
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
				log.error(e.getMessage());
			}
		}

/*  */
		ApplicationContext context = new ClassPathXmlApplicationContext("app-context.xml");
		if( ais== null) { ais = (AnalogInputService) context.getBean("analogInputService");}
		if( xs == null) { xs = (XferService) context.getBean("xferService"); }
		if( as == null) { as = (AlarmService) context.getBean("alarmService"); }
		if( hs == null) { hs = (HistoryService) context.getBean("historyService"); }
		if( wds== null) { wds = (WatchdogService) context.getBean("watchdogService"); }
		if( cvs== null) { cvs = (CalcVariableService) context.getBean("calcVariableService");}
		
		almTypes = getAlarmTypes(as);
		wds.updateWatchdog(Watchdog.AI);

//		Update the analog inputs (check the xfer table, get and process the values)
		Iterator<AnalogInput> iai = ais.getAllUpdatedAItags().iterator();
		while( iai.hasNext() ) {
			AIX ai = new AIX(iai.next());
			log.debug("AnalogInput: "+ai.toString());
			log.debug("Processing AI tag "+ai.getTag().getName() + "/" + ai.getTagId());
			processAIValue( ai, ai.getSimValue(), ai.getSimScanTime());
		}
		log.debug("Completed processing analog inputs");
/*  */
//		Now update all the calculated variables
		RPN2 evaluator = new RPN2();
		Iterator<CalcVariable> icv = cvs.getAllCalcVariables().iterator();
		while ( icv.hasNext() ) {
			CalcVariable cv = icv.next();
			log.debug("Processing CV "+cv.getTag().getName()+"/"+cv.getId()
			         +" as "+cv.getDefinition());
			Iterator<CalcOperand> ico = cvs.getAIValuesForCalculation(cv.getId()).iterator();
			Double[] cvin = new Double[10];
			int coi = 0;
			while( ico.hasNext() ) {
				CalcOperand co = ico.next();
				cvin[coi] = co.getScanValue();
				coi++;
			}
			
			Double result = evaluator.evaluate(cv.getDefinition(), cvin );
			Date now = new Date();
			AIX ai = new AIX(ais.getAnalogInput(cv.getOutputTagId()));
			processAIValue( ai, result, now );
		}
		log.debug("Completed processing calculated variables");
		log.debug("End AI processing");
		return;
	}
	
	private void processAIValue( AIX ai, Double scanValue, Date scanTime ) {
		ai.setScanValue(scanValue);
		ai.setScanTime(scanTime);
		ai.setAlarmTypes(almTypes);
		ai.checkForAlarm(as);
		ai.updateHistory(hs);
		ais.updateAnalogInput(ai);
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
