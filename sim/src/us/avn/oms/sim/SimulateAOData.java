package us.avn.oms.sim;

import java.util.Collection;
import java.util.HashMap;
import java.util.Iterator;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
//import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import us.avn.oms.domain.ControlBlock;
import us.avn.oms.domain.Watchdog;
import us.avn.oms.domain.Xfer;
import us.avn.oms.service.ControlBlockService;
import us.avn.oms.service.WatchdogService;
import us.avn.oms.service.XferService;

public class SimulateAOData {
	
    /* Get actual class name to be printed on */
    private static Logger log = LogManager.getLogger("us.avn.oms.sim.SimulateAOData");

/*
    private static ApplicationContext context = null;
    private static ControlBlockService cbs = null;
    private static WatchdogService wds = null;
    private static XferService xs = null;
*/
    
	public static void execute( ControlBlockService cbs, WatchdogService wds
			                  , XferService xs ) {
		log.debug("Start AO processing");
		wds.updateWatchdog(Watchdog.DCAO);
		
		HashMap<String,Double> c = new HashMap<String,Double>();
		Collection<ControlBlock> ccb = cbs.getAllAOs();
		Iterator<ControlBlock> icb = ccb.iterator();
		while( icb.hasNext() ) {
			ControlBlock cb = icb.next();
			if( null != cb.getScanValue() ) {
				Xfer x = new Xfer();
				x.setId(cb.getTagId());
//     	    	fake the collected data
//				set the value to the current value of the input
				x.setFloatValue(cb.getScanValue());
				xs.updateXfer(x);
			}
		}
		log.debug("End AO processing");
	}
	
}
