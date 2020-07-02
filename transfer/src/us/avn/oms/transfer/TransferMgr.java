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
package us.avn.oms.transfer;

import java.io.PrintWriter;
import java.io.StringWriter;
import java.util.Calendar;
import java.util.Timer;
import java.util.TimerTask;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

public class TransferMgr {

    private Logger log = LogManager.getLogger(this.getClass());
    private static Logger slog = LogManager.getLogger("us.avn.oms.transfer.TransferMgr");

	public static void main(String[] args) {
		TransferMgr x = new TransferMgr();
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
	 * Start the thread that processes transfers.  start @ 15 seconds after 
	 * the minute and run every minute after that.
	 * 
	 * @param args  used to specify when new transfers are created
	 * 				from templates. <br>
	 * 				If 1 arg: args[0] is the repeat interval, ie, it
	 * 						  is run when  min % args[0] == 0 <br>
	 * 				If 2 args: args[0] = hour, args[1] is the minute 
	 */
	public void execute(String[]args) {
        TimerTask updx = new TransferUpdater(args);
        Timer xTimer = new Timer(true);
        Calendar cal = Calendar.getInstance();
//		wait until 45 seconds after (15 seconds before) the minute
        int start = 15;
        if( cal.get(Calendar.SECOND) > 10 ) { start += 60 ; }
        int delay = start * 1000 - 1000 * cal.get(Calendar.SECOND) - cal.get(Calendar.MILLISECOND);
        xTimer.scheduleAtFixedRate(updx, delay, 60*1000);
        log.debug("TransferMgr update thread started");
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
