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
package us.avn.oms.order;

import java.io.PrintWriter;
import java.io.StringWriter;
import java.util.Calendar;
import java.util.Timer;
import java.util.TimerTask;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

public class OrderMgr {

    private Logger log = LogManager.getLogger(this.getClass());
    private static Logger slog = LogManager.getLogger("us.avn.oms.order.OrderMgr");
    private static Integer DEFAULT_INTERVAL = 60;  // 60 seconds

	public static void main(String[] args) {
		OrderMgr x = new OrderMgr();
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
	 * Start the thread that creates scheduled orders.  It runs once a minute 
	 * but it doesn't really do a lot when it runs.
	 * 
	 */
	public void execute(String[]args) {
		Integer interval = DEFAULT_INTERVAL;
        TimerTask updx = new OrderUpdate(args);
        Timer xTimer = new Timer(true);
        Calendar cal = Calendar.getInstance();
        Integer milDelay = 1000 - cal.get(Calendar.MILLISECOND);
        Integer secDelay = 59 - cal.get(Calendar.SECOND);
        int delay = secDelay * 1000 + milDelay;
        xTimer.scheduleAtFixedRate(updx, delay, interval*1000);
        log.debug("OrderMgr update thread started - delayed "+ delay+" milliseconds");
        while( true ) {
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
