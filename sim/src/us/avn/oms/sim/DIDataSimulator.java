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
import us.avn.oms.domain.Watchdog;
import us.avn.oms.domain.Xfer;
import us.avn.oms.service.DigitalInputService;
import us.avn.oms.service.WatchdogService;
import us.avn.oms.service.XferService;

public class DIDataSimulator {
	
    /* Get actual class name to be printed on */
    private static Logger log = LogManager.getLogger("us.avn.oms.sim.DIDataSimulator");
    
    /**
     * Method: execute
     * Description: Updates the digital input values
     *              The major source of values for digital inputs, is digital outputs.
     *              
     *              A secondary source (as far as the simulator is concerned) is
     *              the appearance of train cars, tank trucks and ships which set
     *              the appropriate digital values.
     *              
     * @param dis
     * @param wds
     * @param xs
     */
	public static void execute( DigitalInputService dis, WatchdogService wds, XferService xs ) {
		log.debug("Start DI processing");
		
		wds.updateWatchdog(Watchdog.DCDI);

		Collection<DigitalInput> cdi = dis.getAllActiveDItags();
		Iterator<DigitalInput> idi = cdi.iterator();
		while( idi.hasNext() ) {
			DigitalInput di = idi.next();
//			Xfer x = new Xfer(di.getTagId(), di.getScanValue());
//			xs.updateXfer(x);
		}

		log.debug("End DI processing");
	}
	
}
