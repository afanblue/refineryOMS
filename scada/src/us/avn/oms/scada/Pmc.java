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
package us.avn.oms.scada;

import java.io.PrintWriter;
import java.io.StringWriter;
import java.util.Calendar;
import java.util.Date;
import java.util.Timer;
import java.util.TimerTask;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;


public class Pmc {

    private Logger log = LogManager.getLogger(this.getClass());
    private static Logger slog = LogManager.getLogger("us.avn.oms.scada.Pmc");

	public static void main(String[] args) {
		Pmc pmc = new Pmc();
		try {
			pmc.execute(args);
		} catch( Exception e) {
			StringWriter sw = new StringWriter();
			e.printStackTrace(new PrintWriter(sw));
			String eas = sw.toString();
			slog.error(eas);
		}
	}
	
	public void execute(String[]args) {
        TimerTask dxtt = new DataXfer();
        Timer dxTimer = new Timer(true);
        Calendar cal = Calendar.getInstance();
        int delay = 60000 - 1000 * cal.get(Calendar.SECOND) - cal.get(Calendar.MILLISECOND);
        dxTimer.scheduleAtFixedRate(dxtt, delay, 10*1000);
        log.debug("Data scan loop started");
        //running timer task as daemon thread
        //cancel after never
        while( 1 == 1 ) {
        	try {
        		Thread.sleep( 60 * 60 * 1000);
        		System.gc();
        	} catch (Exception e) {
    			StringWriter sw = new StringWriter();
    			e.printStackTrace(new PrintWriter(sw));
    			String eas = sw.toString();
    			log.error(eas);
        	}
        }

	}

}
