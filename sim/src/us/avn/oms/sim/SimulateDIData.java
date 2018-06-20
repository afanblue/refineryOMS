package us.avn.oms.sim;

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

public class SimulateDIData {
	
    /* Get actual class name to be printed on */
    private static Logger log = LogManager.getLogger("us.avn.oms.sim.SiomulateDIData");
    
	public static void execute( DigitalInputService dis, WatchdogService wds, XferService xs ) {
		log.debug("Start DI processing");
		
		wds.updateWatchdog(Watchdog.DCDI);

		Collection<DigitalInput> cdi = dis.getAllActiveDItags();
		Iterator<DigitalInput> idi = cdi.iterator();
		while( idi.hasNext() ) {
			DigitalInput di = idi.next();
//			xs.updateXfer(di.getTagId());
		}

		log.debug("End DI processing");
	}
	
}
