/*******************************************************************************
 * Copyright (C) 2018 A. E. Van Ness
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

import java.io.PrintWriter;
import java.io.StringWriter;
import java.util.Calendar;
import java.util.Date;
import java.util.Timer;
import java.util.TimerTask;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;


public class Simulator {

    private Logger log = LogManager.getLogger(this.getClass());
    private static Logger slog = LogManager.getLogger("us.avn.oms.sim.Simulator");

	public static void main(String[] args) {
		Simulator sim = new Simulator();
		try {
			sim.execute(args);
		} catch( Exception e) {
//			Date now = new Date();
			StringWriter sw = new StringWriter();
			e.printStackTrace(new PrintWriter(sw));
			String eas = sw.toString();
//			System.out.println(sdf.format(now) + eas.toString());	
			slog.error(eas);
		}
	}
	
	public void execute(String[]args) {
        TimerTask aitt = new AnalogDataSimulator();
        TimerTask ditt = new DigitalDataSimulator();
        Timer aiTimer = new Timer(true);
        Timer diTimer = new Timer(true);
        Calendar cal = Calendar.getInstance();
//		wait until 40 seconds after (20 seconds before) the minute
        int start = 40;
        if( cal.get(Calendar.SECOND) > 40 ) { start = 60 + 50; }
        int delay = start * 1000 - 1000 * cal.get(Calendar.SECOND) - cal.get(Calendar.MILLISECOND);
        aiTimer.scheduleAtFixedRate(aitt, delay, 10*1000);
        log.debug("Analog scan started");
        diTimer.scheduleAtFixedRate(ditt, delay, 10*1000);
        log.debug("Digital scan started");
        while( 1 == 1 ) {
        	try {
        		Thread.sleep( 60 * 60 * 1000);
        	} catch (Exception e) {
//    			Date now = new Date();
    			StringWriter sw = new StringWriter();
    			e.printStackTrace(new PrintWriter(sw));
    			String eas = sw.toString();
//        		System.out.println(sdf.format(now) + eas.toString());	
    			log.error(eas);
        	}
        }

	}

}
