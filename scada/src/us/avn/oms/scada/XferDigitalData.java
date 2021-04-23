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
import java.time.Instant;
import java.util.Calendar;
import java.util.Collection;
import java.util.Date;
import java.util.Iterator;
import java.util.TimerTask;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import us.avn.oms.domain.AnalogOutput;
import us.avn.oms.domain.DigitalInput;
import us.avn.oms.domain.DigitalOutput;
import us.avn.oms.domain.Watchdog;
import us.avn.oms.domain.RawData;
import us.avn.oms.service.ControlBlockService;
import us.avn.oms.service.DigitalInputService;
import us.avn.oms.service.DigitalOutputService;
import us.avn.oms.service.WatchdogService;
import us.avn.oms.service.RawDataService;

public class XferDigitalData extends TimerTask {
	
    /* Get actual class name to be printed on */
    private Logger log = LogManager.getLogger(this.getClass());
    private ControlBlockService cbs = null;
    private DigitalInputService dis = null;
    private DigitalOutputService dos = null;
    private WatchdogService wds = null;
    private RawDataService rds = null;

	public void run( ) {
		log.debug("Start digital processing");
/*  */
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

		ApplicationContext context = new ClassPathXmlApplicationContext("app-context.xml");
		if( dis == null) { dis = (DigitalInputService) context.getBean("digitalInputService"); }
		if( dos == null) { dos = (DigitalOutputService) context.getBean("digitalOutputService"); }
		if( cbs == null) { cbs = (ControlBlockService) context.getBean("controlBlockService"); }
		if( rds == null) { rds = (RawDataService) context.getBean("rawDataService"); }
		if( wds== null) { wds = (WatchdogService) context.getBean("watchdogService"); }

		processDigitalInputs();
		
//		processControlBlocks();
		
		processDigitalOutputs();
/*  */
		log.debug("End digital processing");
		return;
	}
	
	private void processDigitalInputs() {
		wds.updateWatchdog(Watchdog.DI);

		Collection<DigitalInput> cdi = dis.getAllUpdatedDItags();
		Iterator<DigitalInput> idi = cdi.iterator();
		while( idi.hasNext() ) {
			DigitalInput di = idi.next();
			log.debug("Processing DI tag "+di.toString());
			if( 0 != di.getUpdated() ) {
				Instant now = Instant.now();
				di.setPrevValue(di.getScanValue());
				di.setPrevScanTime(di.getScanTime());
				di.setScanValue(Double.valueOf(di.getSimValue()));
				di.setScanTime(now);
				dis.updateDigitalInput(di);
			}
			rds.clearUpdated(di.getTagId());
		}
	}
	
	private void processControlBlocks() {
//		wds.updateWatchdog(Watchdog.CB);
		
	}
	
	private void processDigitalOutputs() {
		wds.updateWatchdog(Watchdog.DO);
		Iterator<DigitalOutput> ido = dos.getDigitalOutputsToUpdate().iterator();
		while( ido.hasNext()) {
			DigitalOutput d = ido.next();
			log.debug("Processing DigitalOutput: "+d.toString());
			RawData rd = new RawData(d.getTagId(), d.getScanValue() );
			rds.updateRawData(rd);
			dos.clearDOupdate(d.getTagId());
		}
		log.debug("Completed processing digital outputs");
	}
	
}
