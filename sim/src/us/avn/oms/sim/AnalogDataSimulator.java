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

import java.util.Calendar;
import java.util.TimerTask;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import us.avn.oms.service.AnalogInputService;
import us.avn.oms.service.AnalogOutputService;
import us.avn.oms.service.ConfigService;
import us.avn.oms.service.ControlBlockService;
import us.avn.oms.service.SimIOService;
import us.avn.oms.service.TagService;
import us.avn.oms.service.TankService;
import us.avn.oms.service.TransferService;
import us.avn.oms.service.WatchdogService;
import us.avn.oms.service.XferService;

public class AnalogDataSimulator extends TimerTask {
	
    /* Get actual class name to be printed on */
    private Logger log = LogManager.getLogger(this.getClass());

    private ApplicationContext context = null;
    private AnalogInputService ais = null;
    private AnalogOutputService aos = null;
    private ControlBlockService cbs = null;
    private ConfigService cs = null;
    private SimIOService sios = null;
    private TagService tgs = null;
    private TankService tks = null;
    private TransferService tfs = null;
    private WatchdogService wds = null;
    private XferService xs = null;
     
	public void run( ) {

/*  */
		if( context == null) { context = new ClassPathXmlApplicationContext("app-context.xml"); }
		if( ais  == null ) { ais  = (AnalogInputService) context.getBean("analogInputService"); }
		if( aos  == null ) { aos  = (AnalogOutputService) context.getBean("analogOutputService"); }
		if( cs   == null ) { cs   = (ConfigService) context.getBean("configService"); }
		if( sios == null ) { sios = (SimIOService) context.getBean("simioService"); }
		if( tgs  == null ) { tgs  = (TagService) context.getBean("tagService"); }
		if( tks  == null ) { tks  = (TankService) context.getBean("tankService"); }
		if( tfs  == null ) { tfs  = (TransferService) context.getBean("transferService"); }
		if( xs   == null ) { xs   = (XferService) context.getBean("xferService"); }
		if( wds  == null ) { wds  = (WatchdogService) context.getBean("watchdogService"); }
		
		AIDataSimulator aids = new AIDataSimulator(ais, cs, tgs, tks, tfs, wds, xs);
		AODataSimulator aods = new AODataSimulator(sios, wds, xs );
		
		Calendar now = Calendar.getInstance();
//		process the outputs
		AODataSimulator.execute();
//		process the inputs
		if( now.get(Calendar.SECOND) == 0 ) {
			AIDataSimulator.execute();
		}
	}
	
}
