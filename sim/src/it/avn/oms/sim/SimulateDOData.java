package it.avn.oms.sim;

import java.util.Collection;
import java.util.Iterator;
import java.util.TimerTask;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import it.avn.oms.domain.ControlBlock;
import it.avn.oms.domain.DigitalInput;
import it.avn.oms.domain.Watchdog;
import it.avn.oms.domain.Xfer;
import it.avn.oms.service.ControlBlockService;
import it.avn.oms.service.DigitalInputService;
import it.avn.oms.service.WatchdogService;
import it.avn.oms.service.XferService;

public class SimulateDOData {
	
    /* Get actual class name to be printed on */
    private static Logger log = LogManager.getLogger("it.avn.oms.sim.SimulateDOData");
    
	public static void execute( ControlBlockService cbs, DigitalInputService dis
			                  , WatchdogService wds, XferService xs )
	{
		log.debug("Start DO processing");

		wds.updateWatchdog(Watchdog.DCDO);

		Collection<ControlBlock> cbi = cbs.getAllDOs();
		Iterator<ControlBlock> icb = cbi.iterator();
		while( icb.hasNext() ) {
			ControlBlock cb = icb.next();
//			log.debug("Processing DO tag "+cb.getOutput() + "/" + cb.getId());
			if( null != cb.getScanValue() ) {
				Xfer x = new Xfer();
				x.setId(cb.getTagId());
				x.setIntegerValue(cb.getScanValue().longValue());
				xs.updateXfer(x);
			}
		}
		log.debug("End DO processing");
	}
	
}
