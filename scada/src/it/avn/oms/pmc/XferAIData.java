package it.avn.oms.pmc;

import java.util.Calendar;
import java.util.Collection;
import java.util.HashMap;
import java.util.Iterator;
import java.util.TimerTask;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import it.avn.oms.domain.AlarmType;
import it.avn.oms.domain.AnalogInput;
import it.avn.oms.domain.Watchdog;
import it.avn.oms.pmc.domain.AIX;
import it.avn.oms.service.AlarmService;
import it.avn.oms.service.AnalogInputService;
import it.avn.oms.service.HistoryService;
import it.avn.oms.service.WatchdogService;
import it.avn.oms.service.XferService;

public class XferAIData extends TimerTask {
	
    /* Get actual class name to be printed on */
    private Logger log = LogManager.getLogger(this.getClass());
    private AnalogInputService ais = null;
    private AlarmService as = null;
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
		
		almTypes = getAlarmTypes(as);
		wds.updateWatchdog(Watchdog.AI);

		Iterator<AnalogInput> iai = ais.getAllUpdatedAItags().iterator();
		while( iai.hasNext() ) {
			AIX ai = new AIX(iai.next());
			log.debug("AnalogInput: "+ai.toString());
			log.debug("Processing AI tag "+ai.getTag().getName() + "/" + ai.getTagId());
//          transfer the collected data			
			ai.setScanValue(ai.getSimValue());
			ai.setScanTime(ai.getSimScanTime());
			ai.setAlarmTypes(almTypes);
//			check for alarm
			ai.checkForAlarm( as );
//          clear the updated flag
			xs.clearUpdated(ai.getTagId());
//          figure out the history updates
			ai.updateHistory(hs);
			ais.updateAnalogInput(ai);
		}
/*  */
		log.debug("End AI processing");
		return;
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
