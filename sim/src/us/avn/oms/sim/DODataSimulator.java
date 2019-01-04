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
import us.avn.oms.domain.DigitalOutput;
import us.avn.oms.domain.SimIO;
import us.avn.oms.domain.Watchdog;
import us.avn.oms.domain.Xfer;
import us.avn.oms.service.DigitalInputService;
import us.avn.oms.service.DigitalOutputService;
import us.avn.oms.service.SimIOService;
import us.avn.oms.service.WatchdogService;
import us.avn.oms.service.XferService;

public class DODataSimulator {
	
    /* Get actual class name to be printed on */
    private static Logger log = LogManager.getLogger("us.avn.oms.sim.DODataSimulator");
    
	public static void execute( SimIOService sios, DigitalInputService dis
			                  , DigitalOutputService dos, WatchdogService wds, XferService xs )
	{
		log.debug("Start DO processing");
		wds.updateWatchdog(Watchdog.DCDO);
/* */
		Iterator<SimIO> isio = sios.getSimIOsToUpdate("DO").iterator();

		while( isio.hasNext() ) {
			SimIO sio = isio.next();
			log.debug("SIO: "+sio.toString());
			if( null != sio.getSioValue() ) {
				Xfer x = new Xfer(sio.getInId(), sio.getSioValue());
//     	    	fake the collected data
//				set the value to the current value of the input
				x.setFloatValue( sio.getSioValue() );
				log.debug("Xfer: "+x.toString());
				xs.updateXfer(x);
			}
		}
/* */
		log.debug("End DO processing");
	}
	
}
