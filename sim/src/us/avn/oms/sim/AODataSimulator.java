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

import java.util.HashMap;
import java.util.Iterator;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.context.ApplicationContext;
//import org.springframework.context.support.ClassPathXmlApplicationContext;

//import us.avn.oms.domain.AnalogOutput;
import us.avn.oms.domain.SimIO;
import us.avn.oms.domain.Watchdog;
import us.avn.oms.domain.Xfer;
//import us.avn.oms.service.AnalogOutputService;
import us.avn.oms.service.SimIOService;
import us.avn.oms.service.WatchdogService;
import us.avn.oms.service.XferService;

public class AODataSimulator {
	
    /* Get actual class name to be printed on */
    private static Logger log = LogManager.getLogger("us.avn.oms.sim.AODataSimulator");

    private  static SimIOService sios = null;
    private  static WatchdogService wds = null;
    private  static XferService xs = null;

    
    public AODataSimulator() { }
    
    public AODataSimulator( SimIOService sios, WatchdogService wds, XferService xs) {
    	AODataSimulator.sios = sios;
    	AODataSimulator.wds = wds;
    	AODataSimulator.xs  = xs;
    }
    
    /**
     * get all analog outputs that need to be updated
     */
	public static void execute(  )
	{
		log.debug("Start AO processing");
		wds.updateWatchdog(Watchdog.DCAO);
		
		Iterator<SimIO> isio = sios.getSimIOsToUpdate("AO").iterator();
		while( isio.hasNext() ) {
			SimIO sio = isio.next();
			if( null != sio.getSioValue() ) {
				Xfer x = new Xfer();
				x.setId(sio.getInId());
//     	    	fake the collected data
//				set the value to the current value of the input
				x.setFloatValue(sio.getSioValue());
				xs.updateXfer(x);
			}
		}
/* */
		log.debug("End AO processing");
	}
	
}
