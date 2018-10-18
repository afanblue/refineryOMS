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

import java.util.TimerTask;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import us.avn.oms.domain.DigitalInput;
import us.avn.oms.domain.Watchdog;
import us.avn.oms.service.DigitalInputService;
import us.avn.oms.service.DigitalOutputService;
import us.avn.oms.service.SimIOService;
import us.avn.oms.service.WatchdogService;
import us.avn.oms.service.XferService;

public class DigitalDataSimulator extends TimerTask {
	
    /* Get actual class name to be printed on */
    private Logger log = LogManager.getLogger(this.getClass());
    
    private ApplicationContext context = null;
    private DigitalInputService dis = null;
    private DigitalOutputService dos = null;
    private SimIOService sios = null;
    private WatchdogService wds = null;
    private XferService xs = null;

	public void run( ) {

		if( context == null) { context = new ClassPathXmlApplicationContext("app-context.xml"); }
		if( dis  == null) { dis  = (DigitalInputService) context.getBean("digitalInputService"); }
		if( dos  == null) { dos  = (DigitalOutputService) context.getBean("digitalOutputService"); }
		if( sios == null) { sios = (SimIOService) context.getBean("simioService"); }
		if( xs   == null) { xs   = (XferService) context.getBean("xferService"); }
		if( wds  == null) { wds  = (WatchdogService) context.getBean("watchdogService"); }
		
		DODataSimulator.execute( sios, dis, dos, wds, xs );
		DIDataSimulator.execute( dis, wds, xs );

	}
	
}
