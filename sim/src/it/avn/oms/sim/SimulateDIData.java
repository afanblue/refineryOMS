package it.avn.oms.sim;

import java.util.Collection;
import java.util.Iterator;
import java.util.TimerTask;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import it.avn.oms.domain.DigitalInput;
import it.avn.oms.domain.Watchdog;
import it.avn.oms.service.DigitalInputService;
import it.avn.oms.service.WatchdogService;
import it.avn.oms.service.XferService;

public class SimulateDIData extends TimerTask {
	
    /* Get actual class name to be printed on */
    private Logger log = LogManager.getLogger(this.getClass());
    
    private ApplicationContext context = null;
    private DigitalInputService dis = null;
    private WatchdogService wds = null;
    private XferService xs = null;

	public void run( ) {
		log.debug("Start DI processing");
/*  */
		if( context == null) { context = new ClassPathXmlApplicationContext("app-context.xml"); }
		if( dis == null) { dis = (DigitalInputService) context.getBean("digitalInputService"); }
		if( xs  == null) { xs = (XferService) context.getBean("xferService"); }
		if( wds == null) { wds = (WatchdogService) context.getBean("watchdogService"); }
		
		wds.updateWatchdog(Watchdog.DCDI);

		Collection<DigitalInput> cdi = dis.getAllActiveDItags();
		Iterator<DigitalInput> idi = cdi.iterator();
		while( idi.hasNext() ) {
			DigitalInput di = idi.next();
//			log.debug("Processing DI tag "+di.getName() + "/" + di.getTagId());
			
//			xs.updateXfer(di.getTagId());
		}
/*  */
		log.debug("End DI processing");
	}
	
}
