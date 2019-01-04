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
import java.util.TimerTask;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.context.ApplicationContext;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.context.ApplicationContext;
//import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import us.avn.oms.domain.Config;
import us.avn.oms.domain.ReferenceCode;
//import us.avn.oms.domain.AnalogOutput;
import us.avn.oms.domain.SimIO;
import us.avn.oms.domain.Tank;
import us.avn.oms.domain.Transfer;
import us.avn.oms.domain.Value;
import us.avn.oms.domain.Watchdog;
import us.avn.oms.domain.Xfer;
import us.avn.oms.service.AnalogInputService;
import us.avn.oms.service.AnalogOutputService;
import us.avn.oms.service.ConfigService;
import us.avn.oms.service.ReferenceCodeService;
//import us.avn.oms.service.AnalogOutputService;
import us.avn.oms.service.SimIOService;
import us.avn.oms.service.TagService;
import us.avn.oms.service.TankService;
import us.avn.oms.service.TransferService;
import us.avn.oms.service.WatchdogService;
import us.avn.oms.service.XferService;

/**
 * Class: PseudoRandomEventSimulator (PRE simulator)
 * Description: This generates the appearance (!) of tank trucks, tank cars and 
 *        ships which, in real life, aren't really random events but are highly
 *        scheduled.  So, the assumptions here are<ol>
 *        <li>all deliveries of crude are done via ship</li>
 *        <li>no deliveries of crude are done via tank car or tank truck (given the
 *            current state of the Keystone XL pipeline, this would not likely be true
 *            for all refineries)</li>
 *        <li>shipments of refined products are done by tank car and tank truck</li></ol>
 *        What this does is <ul>
 *        <li>Ships<br/>
 *          compute how much crude is currently available.  When we get down to less than 
 *          one week's usage, we schedule a ship for the next day.
 *        </li>
 *        <li>Trucks and Tank Cars<br/>
 *          when there's less than a week's worth of space in the product tank, schedule
 *          a truck or tank for it.
 *        </li>
 *        </ul>
 *         
 * @author Allan
 *
 */
public class PseudoRandomEventSimulator extends TimerTask  {
	
    /* Get actual class name to be printed on */
    private static Logger log = LogManager.getLogger("us.avn.oms.sim.PseudoRandomEventSimulator");

    private ApplicationContext context = null;
    private  static ConfigService cs = null;
    private  static ReferenceCodeService rfs = null;
    private  static TagService tgs = null;
    private  static TankService tks = null;
    private  static WatchdogService wds = null;
    private  static TransferService xfrs = null;
    
    static final double WEEKS_ASPHALT  = 7 *   2000D;
    static final double WEEKS_CRUDE    = 7 * 120000D;
    static final double WEEKS_FUELOIL  = 7 *  36000D;
    static final double WEEKS_GASOLINE = 7 *  55000D;
    static final double WEEKS_JETFUEL  = 7 *  12000D;
    static final double WEEKS_LUBES    = 7 *   1200D;
    static final double WEEKS_NAPTHA   = 7 *   2000D;

	public void run( ) {

		if( context == null) { context = new ClassPathXmlApplicationContext("app-context.xml"); }
		if( cs   == null ) { cs   = (ConfigService) context.getBean("configService"); }
		if( rfs  == null ) { rfs  = (ReferenceCodeService) context.getBean("refCodeService"); }
		if( tgs  == null ) { tgs  = (TagService) context.getBean("tagService"); }
		if( tks  == null ) { tks  = (TankService) context.getBean("tankService"); }
		if( xfrs == null ) { xfrs = (TransferService) context.getBean("transferService"); }
		if( wds  == null ) { wds  = (WatchdogService) context.getBean("watchdogService"); }

		log.debug("Start PRE processing");
		wds.updateWatchdog(Watchdog.PRE);
/*	
		Iterator<Value> itv = tks.getTotalTankVolumesForContents().iterator();
		while( itv.hasNext() ) {
			Value tv = itv.next();
			if( Tank.CRUDE.equals(tv.getCode()) ) {
				if( tv.getValue() < WEEKS_CRUDE ) {
					Transfer x = new Transfer();
//					get emptiest tank
					Value ve = tks.getEmptiestTankForContent("C");
					Value vc = tks.getEstTankVolume(id);
					x.setDestinationId(ve.getId());
//					find empty dock
					Config item = cs.getConfigurationItem("SHIP-PRESENT-NAME");
//					pick a ship, get the volume
//					insert transfer
					Long id = xfrs.insertTransfer(x);
					xfrs.startTransfer(id);
				}
			}
		}
/* */
		log.debug("End PRE processing");
	}
	
}
