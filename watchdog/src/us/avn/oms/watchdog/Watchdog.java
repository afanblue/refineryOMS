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
package us.avn.oms.watchdog;

import java.io.PrintWriter;
import java.io.StringWriter;
import java.util.Calendar;
import java.util.Timer;
import java.util.TimerTask;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

public class Watchdog {

    private Logger log = LogManager.getLogger(this.getClass());
    private static Logger slog = LogManager.getLogger("us.avn.oms.watchdog.Watchdog");

	public static void main(String[] args) {
		Watchdog x = new Watchdog();
		try {
			x.execute(args);
		} catch( Exception e ) {
			StringWriter sw = new StringWriter();
			e.printStackTrace(new PrintWriter(sw));
			String eas = sw.toString();
			slog.error(eas);
		}
	}
	
	/**
	 * Start the thread that checks watchdogs.  Start @ the minute and run 
	 * every minute after that.
	 * @param args list of arguments (passed on to @see WatchdogCheck)
	 */
	public void execute(String[]args) {
        TimerTask wdck = new WatchdogCheck(args);
        Timer xTimer = new Timer(true);
        Calendar cal = Calendar.getInstance();
//		wait until  seconds after (15 seconds before) the minute
        int start = 30;
        if( cal.get(Calendar.SECOND) > 20 ) { start += 60 ; }
        int delay = start * 1000 - 1000 * cal.get(Calendar.SECOND) - cal.get(Calendar.MILLISECOND);
        xTimer.scheduleAtFixedRate(wdck, delay, 60*1000);
        log.debug("Watchdog check thread started");
        int x = 1;
        while( x == 1 ) {
        	try {
        		Thread.sleep( 60 * 60 * 1000);
        	} catch (Exception e) {
    			StringWriter sw = new StringWriter();
    			e.printStackTrace(new PrintWriter(sw));
        		log.error(sw.toString());
        	}
        }

	}

}
