package us.avn.oms.pmc;

import java.util.Calendar;
import java.util.Collection;
import java.util.Iterator;
import java.util.TimerTask;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import us.avn.oms.domain.DigitalInput;
import us.avn.oms.domain.Watchdog;
import us.avn.oms.service.DigitalInputService;
import us.avn.oms.service.WatchdogService;
import us.avn.oms.service.XferService;

public class XferDIData extends TimerTask {
	
    /* Get actual class name to be printed on */
    private Logger log = LogManager.getLogger(this.getClass());
    private DigitalInputService dis = null;
    private WatchdogService wds = null;
    private XferService xs = null;

	public void run( ) {
		log.debug("Start DI processing");
/*  */
		Calendar cal = Calendar.getInstance();
		if( cal.get(Calendar.HOUR) == 0 && cal.get(Calendar.MINUTE) == 0 ) {
			try {
				wait(10000);
			} catch( Exception e ) {
				log.error(e.getMessage());
			}
		}

		ApplicationContext context = new ClassPathXmlApplicationContext("app-context.xml");
		if( dis == null) { dis = (DigitalInputService) context.getBean("digitalInputService"); }
		if( xs == null)  { xs = (XferService) context.getBean("xferService"); }
		if( wds== null) { wds = (WatchdogService) context.getBean("watchdogService"); }

		wds.updateWatchdog(Watchdog.DI);

		Collection<DigitalInput> cdi = dis.getAllUpdatedDItags();
		Iterator<DigitalInput> idi = cdi.iterator();
		while( idi.hasNext() ) {
			DigitalInput di = idi.next();
			log.debug("Processing DI tag "+di.getTag().getName() + "/" + di.getTagId());
			
			xs.clearUpdated(di.getTagId());
		}
/*  */
		log.debug("End DI processing");
		return;
	}
	
}
