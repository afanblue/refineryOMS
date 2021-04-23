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
package us.avn.oms.devio;

import java.io.PrintWriter;
import java.io.StringWriter;
import java.util.Calendar;
import java.util.Collection;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Timer;
import java.util.TimerTask;
import java.util.Vector;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import us.avn.oms.devio.device.IODevice;
import us.avn.oms.devio.device.IODeviceFactory;
import us.avn.oms.domain.Device;
import us.avn.oms.service.DeviceService;


public class DevIO {

    private Logger log = LogManager.getLogger(this.getClass());
    private static Logger slog = LogManager.getLogger("us.avn.oms.devio.DevIO");

	public static void main(String[] args) {
		DevIO devio = new DevIO();
		try {
			devio.execute(args);
		} catch( Exception e) {
			StringWriter sw = new StringWriter();
			e.printStackTrace(new PrintWriter(sw));
			String eas = sw.toString();
			slog.error(eas);
		}
	}
	
	public void execute(String[]args) {
        Calendar cal = Calendar.getInstance();
        TimerTask dstt = new DeviceScanner();
		Timer t = new Timer(true);
        long start = 60L;
        long delay = start * 1000 - 1000 * cal.get(Calendar.SECOND) - cal.get(Calendar.MILLISECOND);
        if( delay < 0 ) { delay += 60000; }
        log.debug("Delay: "+delay);
        t.scheduleAtFixedRate(dstt, delay, 10*1000);
        log.debug("Device scanner started, delay: "+delay);
        int x = 1;
        while( x == 1 ) {
        	try {
        		Thread.sleep( 60 * 60 * 1000);
        	} catch (Exception e) {
    			StringWriter sw = new StringWriter();
    			e.printStackTrace(new PrintWriter(sw));
    			String eas = sw.toString();
    			log.error(eas);
        	}
        }

	}

}
