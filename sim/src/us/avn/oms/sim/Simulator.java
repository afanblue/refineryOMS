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

import java.io.PrintWriter;
import java.io.StringWriter;
import java.util.Calendar;
import java.util.Timer;
import java.util.TimerTask;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;


public class Simulator {

    private Logger log = LogManager.getLogger(this.getClass());
    private static Logger slog = LogManager.getLogger("us.avn.oms.sim.Simulator");
//	interval in minutes to run PseudoRandomEventSimulator.  It gets run every 
//	interval starting on the hour.  If this number isn't a factor of 60, it will
//	not necessarily run starting on the hour.  Which might not be a bad thing.
    private Integer pseDelayInterval = 30;

	public static void main(String[] args) {
		Simulator sim = new Simulator();
		try {
			sim.execute(args);
		} catch( Exception e) {
			StringWriter sw = new StringWriter();
			e.printStackTrace(new PrintWriter(sw));
			String eas = sw.toString();
			slog.error(eas);
		}
	}
	
	public void execute(String[]args) {
        TimerTask prett = new PseudoRandomEventSimulator();
        Timer preTimer = new Timer(true);
        Calendar cal = Calendar.getInstance();
    	Integer psed = pseDelayInterval;
    	log.debug("Number of arguments:"+args.length);
        if( 0 < args.length ) {
        	log.debug("First arg: "+args[0]);
        	try {
        		psed = new Integer(args[0]);
        		if( 0 == psed ) { psed = pseDelayInterval; }
        	} catch( Exception e ) {
        		psed = pseDelayInterval;
        	}
        }
//		run the pseudo random event simulator every delayInterval
        int calMin = cal.get(Calendar.MINUTE);
        int delayMin = psed - calMin%psed - 1;
        int pseDelay = 1000 * (delayMin * 60 + (60 - cal.get(Calendar.SECOND)));
        preTimer.scheduleAtFixedRate(prett, pseDelay, pseDelayInterval*60*1000);
        log.debug("PSE scan started, delay: "+pseDelay+"/"+delayMin);
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
