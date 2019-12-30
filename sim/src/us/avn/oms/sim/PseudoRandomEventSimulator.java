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

import java.sql.Timestamp;
import java.time.Duration;
import java.time.Instant;
import java.util.Calendar;
import java.util.Collection;
import java.util.Date;
//import java.util.HashMap;
import java.util.Iterator;
import java.util.TimerTask;
import java.util.Vector;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.context.ApplicationContext;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.context.ApplicationContext;
//import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import us.avn.oms.domain.Carrier;
import us.avn.oms.domain.Customer;
import us.avn.oms.domain.Hold;
import us.avn.oms.domain.Item;
//import us.avn.oms.domain.Config;
import us.avn.oms.domain.Order;
import us.avn.oms.domain.RelTagTag;
import us.avn.oms.domain.Ship;
import us.avn.oms.domain.Tag;
//import us.avn.oms.domain.ReferenceCode;
//import us.avn.oms.domain.AnalogOutput;
//import us.avn.oms.domain.SimIO;
import us.avn.oms.domain.Tank;
import us.avn.oms.domain.Transfer;
//import us.avn.oms.domain.Transfer;
import us.avn.oms.domain.Value;
import us.avn.oms.domain.Watchdog;
import us.avn.oms.service.CarrierService;
//import us.avn.oms.domain.Xfer;
//import us.avn.oms.service.AnalogInputService;
//import us.avn.oms.service.AnalogOutputService;
import us.avn.oms.service.ConfigService;
import us.avn.oms.service.CustomerService;
import us.avn.oms.service.OrderService;
import us.avn.oms.service.ReferenceCodeService;
import us.avn.oms.service.ShipService;
//import us.avn.oms.service.AnalogOutputService;
//import us.avn.oms.service.SimIOService;
import us.avn.oms.service.TagService;
import us.avn.oms.service.TankService;
import us.avn.oms.service.TrainService;
import us.avn.oms.service.TransferService;
import us.avn.oms.service.WatchdogService;

/**
 * This manages the appearance (!) of tank trucks, tank cars and ships
 * which, in real life, probably aren't really random events but are highly
 * scheduled.  So, the assumptions here are<ol>
 * <li>all deliveries of crude are done via ship</li>
 * <li>no deliveries of crude are done via tank car or tank truck (given the
 *     current state of the Keystone XL pipeline, this would not likely be true
 *     for all refineries)</li>
 * <li>shipments of refined products are done by tank car and tank truck</li></ol>
 * What this does is <ul>
 * <li>Ships<br>
 *   compute how much crude is currently available.  When we get down to less than 
 *   one month's usage, we create an order and schedule a ship for the next day.
 * </li>
 * <li>Trucks<br>
 *   when there's less than a week's worth of space in the product tank, create an
 *   order and schedule a truck for it for the next hour.  We'll flip a coin to decide
 *   if a truck or a train needs to appear.
 * </li>
 * <li>Trains/Tank Cars<br>
 *   like trucks, when there's less than a week's worth of space in the product tank
 *   create a train (!), create an order, and schedule a train for it in the next hour.
 * </li>
 * </ul>
 * So, in addition to checking for product quantities, we also need to check for
 * expected ship, train and truck appearances and dock them appropriately.  
 * And, finally, once the transfer(s) are complete, we need to undock the appropriate
 * carriers.
 *         
 * @author Allan
 *
 */
public class PseudoRandomEventSimulator extends TimerTask  {

	/* Get actual class name to be printed on */
	private static Logger log = LogManager.getLogger("us.avn.oms.sim.PseudoRandomEventSimulator");

	private ApplicationContext context = null;
	private  static CarrierService crs = null;
	private  static ConfigService cs = null;
	private  static CustomerService css = null;
	private  static OrderService os = null;
	private  static ReferenceCodeService rfs = null;
//    private  static ShipService shps = null;
	private  static TagService tgs = null;
	private  static TankService tks = null;
//    private  static TrainService trs = null;
	private  static WatchdogService wds = null;
	private  static TransferService xfrs = null;
	private  Collection<Tag> dockList = null;

	private Calendar cal;

	static final double WEEKS_ASPHALT  = 7  *   2000D;
	static final double MONTHS_CRUDE   = 30 * 120000D;
	static final double WEEKS_FUELOIL  = 7  *  36000D;
	static final double WEEKS_GASOLINE = 7  *  55000D;
	static final double WEEKS_JETFUEL  = 7  *  12000D;
	static final double WEEKS_LUBES    = 7  *   1200D;
	static final double WEEKS_NAPTHA   = 7  *   2000D;
	static final double WEEKS_WAX      = 7  *   1200D;

	public void run( ) {

		if( context == null) { context = new ClassPathXmlApplicationContext("app-context.xml"); }
		if( crs  == null ) { crs  = (CarrierService) context.getBean("carrierService"); }
		if( cs   == null ) { cs   = (ConfigService) context.getBean("configService"); }
		if( css  == null ) { css  = (CustomerService) context.getBean("customerService"); }
		if( os   == null ) { os   = (OrderService) context.getBean("orderService"); }
		if( rfs  == null ) { rfs  = (ReferenceCodeService) context.getBean("refCodeService"); }
//		if( shps == null ) { shps = (ShipService) context.getBean("shipService"); }
		if( tgs  == null ) { tgs  = (TagService) context.getBean("tagService"); }
		if( tks  == null ) { tks  = (TankService) context.getBean("tankService"); }
//		if( trs  == null ) { trs  = (TrainService) context.getBean("trainService"); }
		if( xfrs == null ) { xfrs = (TransferService) context.getBean("transferService"); }
		if( wds  == null ) { wds  = (WatchdogService) context.getBean("watchdogService"); }

		log.debug("Start PRE processing");
		wds.updateWatchdog(Watchdog.PRE);
		cal = Calendar.getInstance();
		
		/*	*/
		dockList = tgs.getAllTagsByType(Tag.DOCK);
		createNeededOrders();
		addCarrierPresentForOrders();
		undockCarriersFromOrders();
		/* */
		log.debug("End PRE processing");
	}

	private void createNeededOrders() {
		Iterator<Value> itv = tks.getTotalTankVolumesForContents().iterator();
		while( itv.hasNext() ) {
			Value tv = itv.next();
			Order o = null;
			log.debug("PRE: create order for product "+tv.getCode());
			switch (tv.getCode()) {
			case Tank.ASPHALT :
				o = createRefinedOrder(tv, Tank.ASPHALT, WEEKS_ASPHALT );
				break;
			case Tank.CRUDE :
				o = createCrudeOrder(tv);
				break;
			case Tank.FUEL_OIL :
				o = createRefinedOrder(tv, Tank.FUEL_OIL, WEEKS_FUELOIL );
				break;
			case Tank.GASOLINE :
				o = createRefinedOrder(tv, Tank.GASOLINE, WEEKS_GASOLINE );
				break;
			case Tank.JET_FUEL :
				o = createRefinedOrder(tv, Tank.JET_FUEL, WEEKS_JETFUEL);
				break;
			case Tank.LUBRICANT :
				o = createRefinedOrder(tv, Tank.LUBRICANT, WEEKS_LUBES );
				break;
			case Tank.NAPTHA :
				o = createRefinedOrder(tv, Tank.NAPTHA, WEEKS_NAPTHA );
				break;
			case Tank.WAX :
				o = createRefinedOrder(tv,Tank.WAX, WEEKS_WAX );
				break;
			}
			if( null != o ) {
				log.debug("PRE create order - "+o.toString());
				os.insertOrder(o);
				Iterator<Item> ii = o.getItems().iterator();
				while( ii.hasNext() ) {
					Item i = ii.next();
					i.setShipmentId(o.getShipmentId());
					os.insertItem(i);
				}
			} else {
				log.debug("PRE: No order made for product "+tv.getCode());
			}
		}
	}

	/**
	 * Check on order for expected start time and add the necessary record to
	 * indicate that the given carrier is present ...
	 * <br/>
	 * So for all of the orders that have passed their expected start time, we
	 * find an appropriate dock for the carrier and insert a record in the REL_TAG_TAG
	 * w/carrier ID as parent, dock ID as child, and code DK.
	 */
	private void addCarrierPresentForOrders() {
		log.debug("addCarrierPresent");
		Iterator<Order> ipo = os.getPendingOrders().iterator();
		while( ipo.hasNext() ) {
			Order o = ipo.next();
			Iterator<Item> it = os.getPendingOrderItems(o.getShipmentId()).iterator();
			Vector<Long> carrierIds = new Vector<Long>();
			while( it.hasNext() ) {
				Item i = it.next();
				Tag carrier = tgs.getTag(i.getCarrierId());	
				if( ! carrierIds.contains(carrier.getId()) ) {
					carrierIds.add(carrier.getId());
					Tag dock = getDockForCarrier(carrier);
					if( null != dock ) {
						RelTagTag rtt = new RelTagTag(carrier.getId(), dock.getId(), Tag.DOCK);
						tgs.insertRelationship(rtt);
//						i.setDockId(dock.getId());
//						os.updateItem(i);
					} else {
						log.debug("No available dock for carrier "+carrier.getName()+" for order "+o.getShipmentId());;
					}
				}
			}
		}
	}
	
	/**
	 * Check the transfers for all of the active orders.  If any is complete, then we
	 * can undock the carrier, which means deleting the REL_TAG_TAG record for the carrier
	 */
	private void undockCarriersFromOrders() {
		log.debug("Undock carriers");
		Iterator<Order> iao = os.getActiveOrders().iterator();
		while( iao.hasNext() ) {
			Order o = iao.next();
			Iterator<Item> iit = os.getOrderItems(o.getShipmentId()).iterator();
			Vector<Long> carrierIds = new Vector<Long>();
			while( iit.hasNext() ) {
				Item it = iit.next();
				if( null != it.getTransferId() ) {
					Transfer x = xfrs.getTransfer(it.getTransferId());
					if( x.getStatusId() != xfrs.getTransferStatusId(Transfer.COMPLETE) ) {
						Iterator<RelTagTag> irtt = tgs.getChildrenOfType(it.getCarrierId(), Tag.DOCK).iterator();
						while( irtt.hasNext() ) {
							RelTagTag rtt = irtt.next();
							carrierIds.add(rtt.getParentTagId());
						}
					}
				}
			}
			Iterator<Long> icid = carrierIds.iterator();
			while( icid.hasNext() ) {
				Long cid = icid.next();
				tgs.deleteChildTagsOfType(cid, Tag.DOCK);
			}
			carrierIds = null;
			iit = null;
		}
	}
	
	/**
	 * Create an order for crude oil.
	 * @param tv Value object specifying current amount in inventory for given product
	 * @return 
	 */
	private Order createCrudeOrder( Value tv ) {
		Order o = null;
		if( tv.getValue() < MONTHS_CRUDE ) {
			log.debug("PRE: createCrudeOrder for type "+tv.getCode());
			o = new Order();
			Tag carrier = getCrudeCarrier();
			if( null != carrier ) {
				Carrier s = crs.getCarrier(carrier.getId());
				Customer cust = getCustomer();
				if( null != cust ) {
					o.setCustomerId(cust.getId());
					o.setCustomer(cust.getName());
//					o.setCarrier(carrier.getName());
//					o.setCarrierId(carrier.getId());
					o.setPurchase(Order.PURCHASE);

					Double amt = s.getQuantity();
					o.setExpVolume(amt);

					Duration oneDay = Duration.ofDays(1L);
					Instant expDate = Instant.now().plus(oneDay);
//					o.setExpDate(Timestamp.from(expDate));
					o.setExpDate(expDate);

					Collection<Item> ci = new Vector<Item>();
					Iterator<Hold> ch = s.getHolds().iterator();
					Long itemNo = 0L;
					while( ch.hasNext() ) {
						Hold h = ch.next();
						itemNo++;
						Item item = new Item(0L,itemNo,"A");
						item.setContentCd(Tank.CRUDE);
						item.setExpVolumeMax(h.getVolume());
						item.setExpVolumeMin(h.getVolume());
						item.setNewItem("F");
						item.setActive("P");
						item.setActVolume(0D);
						item.setCarrierId(carrier.getId());
						item.setCarrier(carrier.getName());
						ci.add(item);
					}
					o.setItems(ci);
				} else {
					o = null;
					log.debug("PRE: no customer found");
				}
			} else {
				o = null;
				log.debug("PRE: no crude carrier found");
			}
		}
		return o;
	}

	private Order createRefinedOrder( Value tv, String type, double limit ) {
		Order o = null;
		if( tv.getValue() > limit ) {
			log.debug("PRE: createRefinedOrder for type "+type);
			Tag carrier = getProductCarrier(type);
			if( null != carrier ) {
				Carrier s = crs.getCarrier(carrier.getId());
				Customer cust = getCustomer();
				if( null != cust ) {
					o = new Order();
					o.setCustomerId(cust.getId());
					o.setCustomer(cust.getName());
//					o.setCarrier(carrier.getName());
//					o.setCarrierId(carrier.getId());
					o.setPurchase(Order.SALE);

					Double amt = s.getQuantity();
					o.setExpVolume(amt);

					Duration delay = Duration.ofHours(2L);
					Instant expDate = Instant.now().plus(delay);
//					o.setExpDate(Timestamp.from(expDate));
					o.setExpDate(expDate);

					Collection<Item> ci = new Vector<Item>();
					Iterator<Hold> ch = s.getHolds().iterator();
					Long itemNo = 0L;
					while( ch.hasNext() ) {
						Hold h = ch.next();
						itemNo++;
						Item item = new Item(0L,itemNo,"A");
						item.setContentCd(type);
						item.setExpVolumeMax(h.getVolume());
						item.setExpVolumeMin(h.getVolume());
						item.setNewItem("F");
						item.setActive("P");
						item.setActVolume(0D);
						ci.add(item);
					}
					o.setItems(ci);
					if( ci.isEmpty() ) {
						o = null;
						log.debug("PRE: problem, no holds found for carrier "+carrier.getName());
					}
				} else {
					o = null;
					log.debug("PRE: no customer found");
				}
			} else {
				o = null;
				log.debug("PRE: No carrier found for product "+type);
			}
		}
		return o;
	}

	/**
	 * Get a Tag of type S (ship) which is not being used (i.e., is not currently
	 * docked) to use as a carrier for a crude order (remember: this is a simulation) 
	 * 
	 * @return
	 */
	private Tag getCrudeCarrier() {
		Tag t = null;
		Iterator<Tag> it = tgs.getTagsByTypeRandom(Tag.SHIP).iterator();
		log.debug("PRE: getCrudeCarrier "+(it.hasNext()?"not mt":"mt") );
		while( it.hasNext() ) {
			Tag xt = it.next();
			Collection<RelTagTag> crtt = tgs.getChildrenOfType(xt.getId(), Tag.DOCK);
			log.debug("PRE: getCrudeCarrier "+xt.getId()+" "+(crtt.isEmpty()?"mt":"not mt"));
			if( crtt.isEmpty() ) {
				t = xt;
				break;
			}
		}
		return t;
	}

	/**
	 * Get a Tag of either type T (train), or TT (tank truck) which is not
	 * being used (i.e., is inot currently docked) to use as a carrier for a refined
	 * product carrier.
	 * <br>
	 * Ships are not currently being used
	 * @param productType 
	 * @return
	 */
	private Tag getProductCarrier( String productType ) {
		Tag t = null;
		Iterator<Tag> it = tgs.getTagsByTypeRandom(Tag.TANK_TRUCK).iterator();
		log.debug("PRE: getProductCarrier "+(it.hasNext()?"not mt":"mt") );
		while( it.hasNext()) {
			Tag xt = it.next();
			if( xt.getMisc().equals(productType) ) {
				Collection<RelTagTag> crtt = tgs.getChildrenOfType(xt.getId(), Tag.DOCK);
				log.debug("PRE: getProductCarrier "+xt.getId()+" "+(crtt.isEmpty()?"mt":"not mt"));
				if( crtt.isEmpty() ) {
					t = xt;
					break;
				}
			}
		}
		return t;
	}

	private Customer getCustomer() {
		Customer c = null;
		Collection<Customer> cc = css.getAllCustomers();
		int noCusts = cc.size();
		if( 1 == noCusts ) {
			Iterator<Customer> icc = cc.iterator();
			c = icc.next();
		} else if ( 1 < noCusts ) {
			int idx = new Integer((new Double(Math.random())).intValue() *100) % noCusts;
			c = (Customer) cc.toArray()[idx];
		}
		return c;
	}
	
	/**
	 * Return an available dock for the given carrier.  It checks all
	 * docks to determine if
	 * {@code 
	 * - the dock is the same as the carrier (i.e., Ship/Truck/Train)
	 *   (the MISC field of the dock matches TAG_TYPE_CODE of carrier)
	 * - the carrier is already docked
	 *   (no REL_TAG_TAG records where carrier is parent w/CODE=Tag.DOCK)
	 * - the dock isn't already occupied
	 *   (no REL_TAG_TAG records where dock is child and CODE=Tag.DOCK)
	 * }		
	 * @param c Tag for carrier
	 * @return Tag for available dock
	 */
	private Tag getDockForCarrier( Tag c ) {
		Tag t = null;
		Iterator<Tag> it = dockList.iterator();
		while( it.hasNext() ) {
			Tag d = it.next();
			// can dock handle carrier? (same type?)
			if( d.getMisc().equals(c.getTagTypeCode())) {
				// check to make sure carrier isn't docked
				Collection<RelTagTag> crtt = tgs.getChildrenOfType(c.getId(), Tag.DOCK );
				if( crtt==null || crtt.isEmpty() ) {
					Collection<RelTagTag> prtt = tgs.getParentOfType(d.getId(), Tag.DOCK );					
					if( prtt==null || prtt.isEmpty() ) {
						t = d;
						break;
					}
				}
			}
		}
		return t;
	}
	
}
