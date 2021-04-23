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
import java.sql.Timestamp;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.temporal.ChronoUnit;
import java.util.Calendar;
import java.util.Iterator;
import java.util.TimerTask;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import us.avn.oms.domain.Carrier;
import us.avn.oms.domain.Item;
import us.avn.oms.domain.Order;
import us.avn.oms.domain.Tag;
import us.avn.oms.domain.Watchdog;
import us.avn.oms.service.CarrierService;
import us.avn.oms.service.ConfigService;
import us.avn.oms.service.CrontabService;
import us.avn.oms.service.OrderService;
import us.avn.oms.service.ReferenceCodeService;
import us.avn.oms.service.TagService;
import us.avn.oms.service.WatchdogService;

/**
 * OrderUpdate provides the methods for creating scheduled orders.  This runs
 * every half hour.
 * <br>
 * Should probably be either an abstract class or a bunch of 
 * Transfer methods
 * @author AVN
 *
 */
public class OrderUpdate extends TimerTask {
	
    /* Get actual class name to be printed on */
    private Logger log = LogManager.getLogger(this.getClass());

    private ApplicationContext context = null;
    private CarrierService crs = null;
    private ConfigService cfgs = null;
    private CrontabService crns = null;
    private OrderService ords = null;
    private ReferenceCodeService rcs = null;
    private TagService tgs = null;
    private WatchdogService wds = null;

    
    public OrderUpdate() { 
    	this( (new String[] {"23", "30" }));
    }
    
    public OrderUpdate( String[] args ) {
    }
    
	public void run( ) {
		log.debug("run: Start order processing");
		/*  */
		if( context == null) { context = new ClassPathXmlApplicationContext("app-context.xml"); }
		if( crs  == null ) { crs  = (CarrierService) context.getBean("carrierService"); }
		if( cfgs == null ) { cfgs = (ConfigService) context.getBean("configService"); }
		if( crns == null ) { crns = (CrontabService) context.getBean("crontabService"); }
		if( ords == null ) { ords = (OrderService) context.getBean("orderService"); }
		if( rcs  == null ) { rcs  = (ReferenceCodeService) context.getBean("referenceCodeService"); }
		if( wds  == null ) { wds  = (WatchdogService) context.getBean("watchdogService"); }
		
		wds.updateWatchdog(Watchdog.ORDER);
		
		try {
			createOrders();
		} catch( Exception e ) {
			StringWriter sw = new StringWriter();
			e.printStackTrace(new PrintWriter(sw));
			String eas = sw.toString();
			log.error(eas);			
		}
		
		log.debug("Order processing complete");
	}

	
	/**
	 * Create orders from template orders, ie, those with a 
	 * non-zero/non-null crontab record
	 * <br>
	 * Notes:<ol><li></li>
	 *        <li></li>
	 *        <li></li>
	 *        </ol>
	 */
	private void createOrders() {
		log.debug("createOrders");
		Instant now = Instant.now();
		ZonedDateTime zdt = ZonedDateTime.ofInstant(now, ZoneId.systemDefault());
		LocalDateTime ldt = zdt.toLocalDateTime();
		log.debug("Time to check: "+ldt);
		Iterator<Order> iord = ords.getRepeatOrders().iterator();
		while( iord.hasNext() ) {
			Order order = iord.next();
			Long id = order.getId();
			if( crns.checkSchedule(ldt, order.getCrontabId() )) {
				log.debug("Create order: "+order.getId()+" for "+order.getCrontabId());
				order.setItems(ords.getOrderItems(id));
				Instant expDate = now.plus( order.getDelay(), ChronoUnit.HOURS);
				order.setId(0L);
				order.setCrontabId(0L);
				order.setDelay(0);
				order.setExpDate(Timestamp.from(expDate));
			
				log.debug("create order: "+order.toString());
				Iterator<Item> ii = order.getItems().iterator();
				id = ords.insertOrder(order);
				while( ii.hasNext() ) {
					Item i = ii.next();
					log.debug("Item: "+i.getId()+":"+i.getItemNo()+" for "+i.getContentCd());
					i.setId(id);
					i.setActive(Item.PENDING);
					Carrier c = crs.getProductCarrier(Tag.TANK_TRUCK, i.getContentCd(), i.getExpVolumeMax());
					log.debug("carrier: "+(c==null?"null":c.toString()));
					i.setCarrierId(c.getId());
					ords.insertItem(i);
				}
			} else {
				log.debug("Wrong time, order: "+order.getId()+" for "+order.getCrontabId());				
			}
		}
	}
	
	
}
