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
import java.sql.Timestamp;
import java.time.Duration;
import java.time.Instant;
import java.util.Collection;
import java.util.HashMap;
//import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
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
//import us.avn.oms.domain.RawData;
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

//	private Calendar cal;

	static final Double WEEKS_ASPHALT  = 7  *   2200D;
	static final Double MONTHS_CRUDE   = 30 * 115000D;
	static final Double WEEKS_FUELOIL  = 7  *  35500D;
	static final Double WEEKS_GASOLINE = 7  *  54000D;
	static final Double WEEKS_JETFUEL  = 7  *  11400D;
	static final Double WEEKS_LUBES    = 7  *   1050D;
	static final Double WEEKS_NAPTHA   = 7  *   2500D;
	static final Double WEEKS_WAX      = 7  *      0D;
	
	private class TwoLongs { 
		public Long carrierId;
		public Long orderId;
		
		public TwoLongs( Long c, Long s ) {
			this.carrierId = c;
			this.orderId = s;
		}
		
	}

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
//		cal = Calendar.getInstance();
		
		/*	*/
		try {
			dockList = tgs.getAllTagsByType(Tag.DOCK);
			undockCarriersFromOrders();
		} catch( Exception e ) {
			StringWriter sw = new StringWriter();
			e.printStackTrace(new PrintWriter(sw));
			String eas = sw.toString();
			log.error(eas);			
		}
		try {
			createNeededOrders();
		} catch( Exception e ) {
			StringWriter sw = new StringWriter();
			e.printStackTrace(new PrintWriter(sw));
			String eas = sw.toString();
			log.error(eas);			
		}
		try {
			addCarrierPresentForOrders();
		} catch( Exception e ) {
			StringWriter sw = new StringWriter();
			e.printStackTrace(new PrintWriter(sw));
			String eas = sw.toString();
			log.error(eas);			
		}
		/* */
		log.debug("End PRE processing");
	}

	private void createNeededOrders() {
		Iterator<Value> ittv = tks.getTotalTankVolumesForContents().iterator();
		Map<String,Double> mttc = mapVolumes(tks.getTotalTankCapacitiesForContents());
		Map<String,Double> mov = mapVolumes(os.getOrderVolumesForContents());
		while( ittv.hasNext() ) {
			Value tv = ittv.next();
			if( ! orderPending(tv.getCode())) {
				Double orderAmount =mov.get(tv.getCode())==null?0D:mov.get(tv.getCode());
				Double capacity = Math.max(mttc.get(tv.getCode()),0D);
				Double curVolume = Math.max( tv.getValue(), 0D);
				Order o = null;
				log.debug("PRE: create order for product "+tv.getCode());
				switch (tv.getCode()) {
				case Tank.ASPHALT :
					o = createRefinedOrder(capacity, curVolume, orderAmount, tv.getCode(), Tag.TANK_TRUCK, WEEKS_ASPHALT );
					break;
				case Tank.CRUDE :
					o = createCrudeOrder(capacity, curVolume, orderAmount, Tank.CRUDE, Tag.SHIP, 2 * MONTHS_CRUDE );
					break;
				case Tank.FUEL_OIL :
					o = createRefinedOrder(capacity, curVolume, orderAmount, tv.getCode(), Tag.TRAIN, WEEKS_FUELOIL );
					if( null == o ) {
						o = createRefinedOrder(capacity, curVolume, orderAmount, tv.getCode(), Tag.TANK_TRUCK, WEEKS_FUELOIL );
					}
					break;
				case Tank.GASOLINE :
					o = createRefinedOrder(capacity, curVolume, orderAmount, tv.getCode(), Tag.TRAIN, WEEKS_GASOLINE );
					if( null == o ) {
						o = createRefinedOrder(capacity, curVolume, orderAmount, tv.getCode(), Tag.TANK_TRUCK, WEEKS_GASOLINE );
					}
					break;
				case Tank.JET_FUEL :
					o = createRefinedOrder(capacity, curVolume, orderAmount, tv.getCode(), Tag.TRAIN, WEEKS_JETFUEL);
					if( null == o ) {
						o = createRefinedOrder(capacity, curVolume, orderAmount, tv.getCode(), Tag.TANK_TRUCK, WEEKS_JETFUEL);
					}
					break;
				case Tank.LUBRICANT :
					o = createRefinedOrder(capacity, curVolume, orderAmount, tv.getCode(), Tag.TANK_TRUCK, WEEKS_LUBES );
					break;
				case Tank.NAPTHA :
					o = createRefinedOrder(capacity, curVolume, orderAmount, tv.getCode(), Tag.TANK_TRUCK, WEEKS_NAPTHA );
					break;
				case Tank.WAX :
					o = createRefinedOrder(capacity, curVolume, orderAmount, tv.getCode(), Tag.TANK_TRUCK, WEEKS_WAX );
					break;
				}
				if( null != o ) {
					log.debug("PRE create order - "+o.toString());
					os.insertOrder(o);
					Iterator<Item> ii = o.getItems().iterator();
					while( ii.hasNext() ) {
						Item i = ii.next();
						i.setId(o.getId());
						os.insertItem(i);
					}
				} else {
					log.debug("PRE: No order made for product "+tv.getCode());
				}
			} else {
				log.debug("PRE: order for product "+tv.getCode()+" already pending.  Nothing created");
			}
		}
	}

	/**
	 * Check on order for expected start time and add the necessary record to
	 * indicate that the given carrier is present ...
	 * <br>
	 * So for all of the orders that have passed their expected start time, we
	 * find an appropriate dock for the carrier and insert a record in the REL_TAG_TAG
	 * w/carrier ID as parent, dock ID as child, and code DK.
	 */
	private void addCarrierPresentForOrders() {
		log.debug("addCarrierPresent");
		Iterator<Order> ipo = os.getPendingOrders().iterator();
		while( ipo.hasNext() ) {
			Order o = ipo.next();
			Iterator<Item> it = os.getPendingOrderItems(o.getId()).iterator();
			Vector<Long> carrierIds = new Vector<Long>();
			while( it.hasNext() ) {
				Item i = it.next();
				Tag carrier = tgs.getTag(i.getCarrierId());	
				if( ! carrierIds.contains(carrier.getId()) ) {
					carrierIds.add(carrier.getId());
					Long dockId = getDockForCarrier(carrier);
					if( dockId.compareTo(0L) > 0 ) {
						log.debug("addCarrierPresent: dock "+dockId
								 +" found for carrier "+carrier.getName());
						RelTagTag rtt = new RelTagTag(carrier.getId(), dockId, Tag.DOCK);
						tgs.insertRelationship(rtt);
//						i.setDockId(dock.getId());
//						os.updateItem(i);
					} else if( dockId.equals(0L) ) {
						log.debug("addCarrierPresent: No available dock for carrier "
								 +carrier.getName()+" for order "+o.getId());;
					} else {
						log.debug("addCarrierPresent: carrier "+i.getCarrierId()
								 +" already docked at dock ID "+dockId);
					}
				} else {
					log.debug("addCarrierPresent: carrier "+i.getCarrierId()+" already docked");
				}
			}
			carrierIds = null;
		}
	}
	
	/**
	 * Check the transfers for all of the active order items.  
	 * If any is complete, then we can mark the item as complete.
	 * If all of the order items for this shipment are complete, then we can undock 
	 * the carriers, which means deleting the REL_TAG_TAG record for the carriers.
	 */
	private void undockCarriersFromOrders() {
		log.debug("Undock carriers");
		Iterator<Long> iao = os.getOrderListByStatus(Item.DONE).iterator();
		Vector<TwoLongs> carrierIds = new Vector<TwoLongs>();
		while( iao.hasNext() ) {
			Long orderId = iao.next();
			log.debug("undockCarriers? for order "+orderId);
//			Order order = os.getOrder(orderId);
			Iterator<Item> ii = os.getOrderItems(orderId).iterator();
			while( ii.hasNext() ) {
				Item it = ii.next();
				if( null != it.getTransferId() ) {
					Transfer x = xfrs.getTransfer(it.getTransferId());
					if( x.getStatusId() == xfrs.getTransferStatusId(Transfer.COMPLETE) ) {
						if(it.getActive().equals(Item.DONE) ) {
							log.debug("undockCarriers: transfer "+x.getId()
							+" complete, order item "+it.getId()+"/"+it.getItemNo());
							it.setActive(Item.COMPLETE);
							os.updateItem(it);
							TwoLongs tl = new TwoLongs(it.getCarrierId(),orderId);
							if( ! carrierIds.contains(tl) ) {
								carrierIds.add(tl);
							}
						}
					} else {
						log.debug("undockCarriers: order item "+it.getId()
						+"/"+it.getItemNo()+" already complete");
					}
				}
			}			
		}
		log.debug("Number of carriers to remove? "+carrierIds.size());
		Iterator<TwoLongs> icid = carrierIds.iterator();
		while( icid.hasNext() ) {
			TwoLongs cid = icid.next();
			Long count = os.getNumberActiveItems(cid.orderId, cid.carrierId );
			if( count == 0L ) {
				log.debug("undockCarriers: carrierId "+cid.carrierId+" for shipment "+cid.orderId);
				tgs.deleteChildTagsOfType(cid.carrierId, Tag.DOCK);
			}
		}
	}
	
	/**
	 * Create an order for crude oil if the current amount in inventory plus the total
	 * amount ordered is less than the amount needed to run the refinery for 3 weeks.
	 * We also limit the order amount to the quantity the carrier can hold.  Just in case.
	 * @param capacity capacity of crude tanks
	 * @param curVolume current amount of crude in tanks
	 * @param orderVolume  amount in existing orders
	 * @param productCode product code 
	 * @param carrierType carrier type 
	 * @param limit volume limit for contents
	 * @return order object ready to insert
	 */
	private Order createCrudeOrder( Double capacity, Double curVolume, Double orderVolume
								  , String productCode, String carrierType, Double limit ) {
		Order o = null;
		log.debug("PRE: createCrudeOrder: capacity="+capacity+", curVolume="+curVolume+", orderVolume="+orderVolume
				+", limit="+limit);
		if( (curVolume + orderVolume) < limit ) {
			log.debug("PRE: createCrudeOrder: room enough and time ");
			Carrier carrier = crs.getCrudeCarrier();
			if( null != carrier ) {
				Carrier s = crs.getCarrier(carrier.getId());
				Customer cust = getCustomer();
				if( null != cust ) {
					Long orderDuration = 24L;
					o = buildNewOrder(s, cust, Order.PURCHASE, Tank.CRUDE, 
									  Math.min(orderVolume,s.getQuantity()), orderDuration );
				} else {
					o = null;
					log.debug("PRE: no customer found");
				}
			} else {
				o = null;
				log.debug("PRE: no crude carrier found");
			}
		} else {
			log.debug("PRE: no need for new crude order");
		}
		return o;
	}

	/**
	 * Create an order for the refined product given by the code in the value parameter
	 * if the capacity - (current volume + order volume) less than the limit
	 * @param capacity total capacity of tanks  
	 * @param curVolume total current volume of tanks with content code 
	 * @param orderVolume volume of contents currently on order
	 * @param productCode product code
	 * @param carrierType carrier type 
	 * @param limit volume limit for contents
	 * @return order object ready to insert
	 */
	private Order createRefinedOrder( Double capacity, Double curVolume, Double orderVolume
									, String productCode, String carrierType, Double limit ) {
		Order o = null;
		Double expectedVolume = curVolume + orderVolume;
		log.debug("PRE: createRefinedOrder, product code "+productCode+", capacity: "+capacity
				+", curVol="+curVolume+", orderVolume="+orderVolume+", expectedVolume="+expectedVolume
				+", limit="+limit);
		if( (capacity - expectedVolume) < limit ) {
			log.debug("PRE: createRefinedOrder for "+productCode+" on "+ carrierType);
			Carrier carrier = crs.getProductCarrier( carrierType, productCode, 
									expectedVolume-limit  );
			if( null != carrier ) {
//				Carrier s = crs.getCarrier(carrier.getId() );
				Customer cust = getCustomer();
				if( null != cust ) {
					Long orderDuration = 2L;
					o = buildNewOrder(carrier, cust, Order.SALE, productCode, orderVolume, orderDuration );
				} else {
					o = null;
					log.debug("PRE: no customer found");
				}
			} else {
				o = null;
				log.debug("PRE: No carrier found for product "+productCode);
			}
		} else {
			log.debug("PRE: no need for new order for product "+productCode);
		}
		return o;
	}

	private Order buildNewOrder( Carrier s, Customer cust, String orderType, String productCode
							   , Double orderVolume, Long orderDuration )
	{
		Order o = new Order();
		o.setCustomerId(cust.getId());
		o.setCustomer(cust.getName());
		o.setPurchase(orderType);

		Double amt = s.getQuantity();
		o.setExpVolume(amt);

		Duration delay = Duration.ofHours(orderDuration);
		Instant expDate = Instant.now().plus(delay);
//		o.setExpDate(Timestamp.from(expDate));
		o.setExpDate(Timestamp.from(expDate));

		Collection<Item> ci = new Vector<Item>();
		Iterator<Hold> ch = s.getHolds().iterator();
		Long itemNo = 0L;
		while( ch.hasNext() ) {
			Hold h = ch.next();
			itemNo++;
			Item item = new Item(0L,itemNo,Item.PENDING);
			item.setContentCd(productCode);
			item.setExpVolumeMax(h.getVolume()*h.getNoDuplicates());
			item.setExpVolumeMin(h.getVolume()*h.getNoDuplicates());
			item.setNewItem("F");
			item.setActive(Item.PENDING);
			item.setActVolume(0D);
//			item.setCarrier(carrier.getName());
			item.setCarrierId(s.getId());
			ci.add(item);
		}
		o.setItems(ci);
		if( ci.isEmpty() ) {
			o = null;
			log.debug("PRE: problem, no holds found for carrier "+s.getName());
		}
		return o;
	}

	/**
	 * Get a random customer to serve as the buyer/seller of an order 
	 * @return customer
	 */
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
	 * If the carrier is already docked, return the object for that dock.
	 * @param c Tag for carrier
	 * @return ID for selected dock; 0 =&gt; no dock found; &gt; 0 ID of dock found
	 */
	private Long getDockForCarrier( Tag c ) {
		log.debug("Get dock for carrier "+c.getName());
		Long t = 0L;
		// check to make sure carrier isn't docked
		Collection<RelTagTag> crtt = tgs.getChildrenOfType(c.getId(), Tag.DOCK );
		if( crtt==null || crtt.isEmpty() ) {
			Iterator<Tag> it = dockList.iterator();
			while( it.hasNext() ) {
				Tag d = it.next();
				// can dock handle carrier? (same type?)
				if( d.getMisc().equals(c.getTagTypeCode())) {
					// verify that dock isn't already occupied
					Collection<RelTagTag> prtt = tgs.getParentOfType(d.getId(), Tag.DOCK );					
					if( prtt==null || prtt.isEmpty() ) {
						t = d.getId();
						break;
					}
				}
			}
		} else {
			log.debug(c.getName()+" already docked");
			// already docked.  Make sure it isn't docked twice
			if( 1 == crtt.size() ) {
				Iterator<RelTagTag> icrtt = crtt.iterator();
				RelTagTag rtt = icrtt.next();
				t = - rtt.getChildTagId();
			}
		}
		return t;
	}
	
	private HashMap<String,Double> mapVolumes( Collection<Value> tv ) {
		HashMap<String,Double> ov = new HashMap<String,Double>();
		Iterator<Value> cov = tv.iterator();
		while( cov.hasNext() ) {
			Value v = cov.next();
			ov.put(v.getCode(), v.getValue());
		}
		return ov;
	}
	
	/**
	 * Determine if there's an order already pending, but not active for this
	 * product code
	 * @param productCode product code to look for
	 * @return true if there is a pending order for this product code
	 */
	private  boolean orderPending( String productCode ) {
		boolean pending = false;
		Long count = os.getPendingOrderCountForContent(productCode);
		log.debug("PRE: orderPending "+count+" for product "+productCode);
		if( ! count.equals(0L) ) {
			pending = true;
		}
		return pending;
	}
	
}
