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

import java.sql.Timestamp;
import java.time.Instant;
import java.time.LocalDate;
import java.time.Year;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoField;
import java.time.temporal.ChronoUnit;
import java.util.Calendar;
import java.util.Collection;
import java.util.HashMap;
import java.util.Iterator;
import java.util.TimerTask;
import java.util.Vector;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import us.avn.oms.domain.ChildValue;
import us.avn.oms.domain.Config;
import us.avn.oms.domain.DigitalInput;
import us.avn.oms.domain.IdName;
import us.avn.oms.domain.Item;
import us.avn.oms.domain.Order;
import us.avn.oms.domain.RelTagTag;
import us.avn.oms.domain.Tag;
import us.avn.oms.domain.Tank;
import us.avn.oms.domain.Transfer;
import us.avn.oms.domain.Value;
import us.avn.oms.domain.Watchdog;
import us.avn.oms.domain.Xfer;
import us.avn.oms.service.ConfigService;
import us.avn.oms.service.DigitalInputService;
import us.avn.oms.service.OrderService;
import us.avn.oms.service.ReferenceCodeService;
import us.avn.oms.service.TagService;
import us.avn.oms.service.TankService;
import us.avn.oms.service.TransferService;
import us.avn.oms.service.VertexService;
import us.avn.oms.service.WatchdogService;
import us.avn.oms.service.XferService;

/**
 * TransferUpdate provides the methods for updating transfers, i.e., starting,
 * stopping (completing), creating from schedules, creating from orders
 * <br>
 * Should probably be either an abstract class or a bunch of 
 * Transfer methods
 * @author AVN
 *
 */
public class TransferUpdate extends TimerTask {
	
    /* Get actual class name to be printed on */
    private Logger log = LogManager.getLogger(this.getClass());

    private ApplicationContext context = null;
    private ConfigService cfgs = null;
    private DigitalInputService dis = null;
    private OrderService ords = null;
    private ReferenceCodeService rcs = null;
    private TagService tgs = null;
    private TankService tks = null;
    private WatchdogService wds = null;
    private TransferService xfrs = null;
    private VertexService vtxs = null;
    private XferService xfs = null;

    private HashMap<String,String> nameTemplates;
    private Integer newTransferHour;
    private Integer newTransferMinute;
    private Integer newTransferInterval;
    private HashMap<String,Long> types;
    private HashMap<String,Long> statuses;
    private ZonedDateTime tomorrow;
    private Vector<String> stations = new Vector<String>(3);

    
    public TransferUpdate() { 
    	this( (new String[] {"23", "30" }));
    }
    
    public TransferUpdate( String[] args ) {
    	log.debug("TransferUpdate: args[0]: "+(args.length>0?args[0]:"null")
    			 +", args[1]: "+(args.length>1?args[1]:"null"));
    	stations.add( Tag.DOCK);
    	stations.add( Tag.TANK_CAR);
    	stations.add( Tag.TANK_TRUCK);

    	switch( args.length ) {
    	case 0:
    		newTransferHour = 23;
    		newTransferMinute = 30;
    		newTransferInterval = null;
    		break;
    	case 1:
    		newTransferHour = null;
    		newTransferMinute = null;
    		newTransferInterval = new Integer(args[0]);
    		break;
    	case 2:
    		this.newTransferHour = new Integer(args[0]);
    		this.newTransferMinute = new Integer(args[1]);
    		this.newTransferInterval = null;
    	}
    }
    
	public void run( ) {
		log.debug("run: Start transfer processing");
		/*  */
		if( context == null) { context = new ClassPathXmlApplicationContext("app-context.xml"); }
		if( cfgs == null ) { cfgs = (ConfigService) context.getBean("configService"); }
		if( dis  == null ) { dis  = (DigitalInputService) context.getBean("digitalInputService"); }
		if( ords == null ) { ords = (OrderService) context.getBean("orderService"); }
		if( rcs  == null ) { rcs  = (ReferenceCodeService) context.getBean("referenceCodeService"); }
		if( xfrs == null ) { xfrs = (TransferService) context.getBean("transferService"); }
		if( tgs  == null ) { tgs  = (TagService) context.getBean("tagService"); }
		if( tks  == null ) { tks  = (TankService) context.getBean("tankService"); }
		if( wds  == null ) { wds  = (WatchdogService) context.getBean("watchdogService"); }
		if( vtxs == null ) { vtxs = (VertexService) context.getBean("vertexService"); }
		if( xfs  == null ) { xfs  = (XferService) context.getBean("xferService" ); }
		
		wds.updateWatchdog(Watchdog.TRANSFER);
		
		types = xfrs.getAllTransferTypes();
		statuses = xfrs.getAllTransferStatuses();
		nameTemplates = cfgs.getAllConfigItems();
		
		completeTransfers();
		startTransfers();
		runScheduledTransfers();
		createTransfersFromOrders();
		
		log.debug("run: Transfer processing complete");
	}

	/**
	 * Complete transfers that are active whose completion time 
	 * has elapsed or volume has been transferred
	 */
	private void completeTransfers( ) {
		Iterator<Transfer> ixet = xfrs.getEndingTransfers().iterator();
		while( ixet.hasNext() ) {
			Transfer x = ixet.next();
			log.debug("completeTransfers: check active transfer "+x.toString());
			if( x.getEndDiff() <= 0 ) {
				log.debug("completeTransfer (time) "+x.getName() + "/" + x.getId());
				changeTransferState(x,"OFF");
				x.completeTransfer(xfrs);
				undockCarrier(x);
			} else if( x.getActVolume() >= x.getExpVolume() ) {
				log.debug("completeTransfer (vol) "+x.getName() + "/" + x.getId());
				changeTransferState(x,"OFF");
				x.completeTransfer(xfrs);
				undockCarrier(x);
			}
		}
	}

	/**
	 * Create transfers from orders IFF the specific carriers are present
	 * <br>
	 * Notes:<ol><li>Only pending orders (status is changed to Active when transfer created)</li>
	 *        <li>Carrier must be present (see CONFIG.SHIP-PRESENT-NAME, TANKCAR-PRESENT-NAME
	 *            TANKTRUCK-PRESENT-NAME)</li>
	 *        <li></li>
	 *        </ol>
	 */
	private void createTransfersFromOrders() {
		Iterator<Order> iord = ords.getPendingOrders().iterator();
		while( iord.hasNext() ) {
			Order order = iord.next();
			Long id = order.getShipmentId();
			order.setItems(ords.getPendingOrderItems(id));
			log.debug("createTransfersFromOrders (order): "+order.toString());
			Iterator<Item> ii = order.getItems().iterator();
			Tag carrier = tgs.getTag(order.getCarrierId());
			Tag dock = carrierPresent(order);
			if( null != dock ) {
				while( ii.hasNext() ) {
					Item item = ii.next();
					log.debug("createTransfersFromOrders: pending order item "+item.getItemNo());
					Transfer xfr = createNewTransfer(order,item,carrier,dock);
					xfr.startTransfer(xfrs);
					item.setActive(Order.ACTIVE);
					ords.updateItem(item);
				}
			} else {
				log.debug("createTransfersFromOrders: carrier not present at dock");
			}
		}
	}
	
	/**
	 * Create a executable transfer for a scheduled transfer		
	 * 
	 * Only check pending transfers from or to refinery units at 23:30
	 * Check all the others every 5 minutes
	 */
	private void runScheduledTransfers() {
		/* schedule pending templates ONLY at (default) 23:30 */
		/* if you check the SQL, note that the expected       */
		/* start & end time calculations ignore the time      */
		Calendar cal = Calendar.getInstance();
		Integer hr = cal.get(Calendar.HOUR_OF_DAY);
		Integer min = cal.get(Calendar.MINUTE);
		log.debug( "runScheduledTransfers: Time: @"+hr+":"+min+" check? "+newTransferHour+":"+newTransferMinute+" / "+newTransferInterval);
		Boolean checkOnce = ((newTransferHour != null) && (newTransferMinute != null))
						  ? (hr.equals(newTransferHour) && min.equals(newTransferMinute))
						  : false;
		Boolean checkMulti = (newTransferInterval != null)
						   ? (min % newTransferInterval == 0)
						   : false;
		log.debug( "runScheduledTransfers: Check? " + (checkOnce?"true":"false") + " or " + (checkMulti?"true":"false"));

		ZonedDateTime now = ZonedDateTime.now();
		tomorrow = now.plus(24,ChronoUnit.HOURS) ;
		Iterator<Transfer> ixpt = xfrs.getPendingTemplates().iterator();

		while( ixpt.hasNext() ) {
			Transfer x = ixpt.next();
			log.debug("runScheduledTransfer (transfer): "+x.toString());
			Tag src = tgs.getTag(x.getSourceId());
			Tag dest = tgs.getTag(x.getDestinationId());
			Transfer newX = new Transfer(x);
			if( Tag.REFINERY_UNIT.equals(src.getTagTypeCode()) ||
				Tag.REFINERY_UNIT.equals(dest.getTagTypeCode())) {
				if(  checkOnce || checkMulti ) {
					insertNewTransfer(x, newX);
				} else if( 0 != newX.getDelta() ) {
					insertNewTransfer(x, newX);
				}
			} else if( stations.contains(src.getTagTypeCode()) ) {   //|| "RU".equals(dest.getTagTypeCode())) {
				if(  checkOnce || checkMulti ) {
					insertNewTransfer(x, newX);
				} else if( 0 != newX.getDelta() ) {
					insertNewTransfer(x, newX);
				}
			} else if ( 0 == min%5 ) {
				if( (newX.getStartDiff() >= 0) && (newX.getStartDiff() < 60)) {
					insertNewTransfer(x,newX);
				} else if( 0 != newX.getDelta()) {
					insertNewTransfer(x,newX);
				}
			}
		}
	}
	
	/**
	 * Start scheduled transfers whose starting time
	 * is earlier than the current time
	 */
	private void startTransfers() {
		Iterator<Transfer> ixst = xfrs.getStartingTransfers().iterator();
		while( ixst.hasNext() ) {
			Transfer x = ixst.next();
			log.debug("startTransfers: check scheduled transfer "+x.toString());
			if( (x.getStartDiff() <= 0) && (x.getEndDiff() > 0) ) {
				log.debug("startTransfer "+x.getName() + "/" + x.getId());
				x.startTransfer(xfrs);
				changeTransferState(x,"ON");
			}
		}
	}
	
	/**
	 * Insert a new transfer into the transfer table 
	 * @param x
	 * @param newX
	 */
	private void insertNewTransfer( Transfer x, Transfer newX ) {
		/* ensure that tag ID points to transfer */
		newX.setTagId(x.getTagId());
		/* Change transfer type id & status id */
		DateTimeFormatter ldtf = DateTimeFormatter.ofPattern("yyyy-MM-dd");
		LocalDate ld = LocalDate.of( tomorrow.get(ChronoField.YEAR)
				                   , tomorrow.get(ChronoField.MONTH_OF_YEAR)
				                   , tomorrow.get(ChronoField.DAY_OF_MONTH));
		newX.setName(newX.getName()+ld.toString());
		newX.setTransferTypeId(types.get(Transfer.EXECUTABLE));
		newX.setStatusId(statuses.get(Transfer.SCHEDULED));
		/* source check */
		newX.checkSource( tgs, tks );
		/* destination check */
		newX.checkDestination( tgs, tks );
		newX.setStatusId(xfrs.getTransferStatusId(Transfer.SCHEDULED ));
		newX.setTransferTypeId(xfrs.getTransferTypeId(Transfer.EXECUTABLE));
		newX.setExpStartTime(x.getNewStartTime());
		newX.setExpEndTime(newX.getNewEndTime());
		log.debug("insertNewTransfer: "+newX.toString());
		xfrs.insertTransfer(newX);		
	}
	
	private void undockCarrier( Transfer x ) {
		
	}
	
	/**
	 * Change transfer state
	 * @param x  Transfer to modify the state of
	 * @param newState New state for transfer
	 */
	private void changeTransferState( Transfer x, String newState ) {
		Iterator<ChildValue> xin = getChildTags(x.getDestinationId(),"INL").iterator();
		while( xin.hasNext() ) {
			ChildValue cv = xin.next();
			if( outputAllowed(cv) ) {
				Double outval = getValue(cv.getInpTagId(), newState );
				Xfer xfr = new Xfer(cv.getInpTagId(),outval);
				log.debug("changeTransferState: Transfer "+newState+" output: "+cv.getInpTagId()+" - "+xfr);
				xfs.updateXfer(xfr);
			}
		}
		
		// The problem w/multi-use of objects and queries is that sometimes things get labeled wrong.
		// Even though we're dealing w/the outputs, they're getting stuffed into the input fields.
		// (sigh)
		Iterator<ChildValue> xout = getChildTags(x.getSourceId(),"OUTL").iterator();
		while( xout.hasNext() ) {
			ChildValue cv = xout.next();
			if( outputAllowed(cv) ) {
				Double outval = getValue(cv.getInpTagId(), newState );
				Xfer xfr = new Xfer(cv.getInpTagId(),outval);
				log.debug("changeTransferState: Transfer "+newState+" output: "+cv.getInpTagId()+" - "+xfr);
				xfs.updateXfer(xfr);
			}
		}
		
	}
	
	/**
	 * Check the child value to determine if it is a digital output
	 * @param cv ChildValue to validate for DO
	 * 
	 * @return boolean T if digital output 
	 */
	private boolean outputAllowed( ChildValue cv ) {
		boolean oa = false;
		oa = "DO".equals(cv.getInpType());
		return oa;
	}
	
	/**
	 * Get the child tags associated w/the end point transfer
	 *
	 * @param id (Long) tag ID of transfer end point 
	 * @param code (String) code associated correct w/RelTagTag records
	 *  
	 * @return collection of ChildValues
	 */
	private Collection<ChildValue> getChildTags(Long id, String code) {
		Collection<ChildValue> cvn = new Vector<ChildValue>();
		
		cvn.addAll(tgs.getTransferTankLevelChild(id));
		cvn.addAll(tgs.getTransferChildValues(id, code));
		return cvn;
	}
	
	private Double getValue( Long id, String state ) {
		IdName idn = new IdName(id,state);
		Double outv = rcs.getDigitalValue(idn);
		return outv;
	}
	
	/**
	 * Verify the presence of a carrier specified by tag at a transfer point
	 *
	 * @param t Order containing specified carrier
	 * @return	Tag of loading dock
	 *
	 * Check that the carrier is present at a loading dock, specified 
	 * by the appropriate indicator in a RelTagTag(code = "CRR") record.  There
	 * should only be one
	 */
	private Tag carrierPresent( Order o ) {
		Tag dock = null;
		Collection<RelTagTag> cdk = tgs.getChildrenOfType(o.getCarrierId(), "DK");
		if( cdk.size() == 1 ) { 
			Iterator<RelTagTag> idk = cdk.iterator();
			if( idk.hasNext() ) {
				dock = tgs.getTag(idk.next().getChildTagId());
			}
		}
		log.debug("carrierPresent? "+(null==dock?"No":dock.getName()));
		return dock;
	}

	/**
	 * Create a new transfer object based on the order and the carrier
	 * and the dock at which the carrier is parked.  It DOES insert
	 * the DB record.
	 * <br/>            
	 * Notes: The order provides the amount to transfer and whether the transfer
	 *        is to or from the tanks.  All purchases are crude purchases so this
	 *        is easy.
	 * <p/>     
	 * Though these are all "one-off" transfers, the template
	 * associated with them is based on the dock where the carrier is located
	 * and the product being transferred, we have 
	 * to determine the appropriate source and destination.  
	 * <p/>
	 * It's probably implied somewhere, but an order can cause the creation
	 * of multiple transfers based on the number of order items.  Not sure why
	 * since it seems that should be specified based on the number of holds in
	 * a ship/truck or the number of tank cars in a train.
	 * 
	 * @param order - order for transfer
	 * @param item - order item for transfer
	 * @param carrier - carrier for products
	 * @param dock  - dock (note: this is not <b>just</b> a ship dock).
	 * 
	 * @return - Transfer object (ready to insert)
	 */
	private Transfer createNewTransfer( Order order, Item i, Tag carrier, Tag dock ) {
		log.debug("createNewTransfer: order: "+order.getShipmentId()+" item "+i.toString()+" for carrier "
				 +carrier.getName()+" at dock "+dock.getName());
		Transfer xfr = new Transfer();
		String templateName = nameTemplates.get(dock.getName()).replace("ProdCd",i.getContentCd());
		Transfer template = xfrs.getTemplate(templateName);
		log.debug("createNewTransfer: template for dock "+dock.getName()+" "+template.toString()); 
		Tag src = tgs.getTag(template.getSourceId());
		Tag dest = tgs.getTag(template.getDestinationId());
		String name = "";
		String today = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss").format(Instant.now());
//		Calendar cal = Calendar.getInstance();
		xfr.setId(0L);
		xfr.setTagId(template.getId());
		
		if( Tag.DOCK.equals(src.getTagTypeCode()) ) {
			String srcName = nameTemplates.get(Config.STATION_NAME_MASK).replace("DK", src.getName())
					                      .replace("STN",i.getItemNo().toString());
			src = tgs.getTagByName(srcName, "STN");
		}
		xfr.setSourceId(src.getId());
		
		if( Tag.DOCK.equals(dest.getTagTypeCode()) ) {
			String destName = nameTemplates.get(Config.STATION_NAME_MASK).replace("DK", src.getName())
                    .replace("STN",i.getItemNo().toString());
			dest = tgs.getTagByName(destName, "STN");
		}
		xfr.setDestinationId(template.getDestinationId());
		
		if( Order.PURCHASE.equals(order.getPurchase())) {
	    	name = dock.getName() + "-" + i.getItemNo() + "to" + i.getContentCd() + "-" + today;
	    } else {
	    	name = i.getContentCd() + "to" + dock.getName() + i.getItemNo() + "-" + today;
	    }
		
		xfr.checkSource(tgs, tks);
		xfr.checkDestination(tgs, tks);
		xfr.setName(name);
		xfr.setContentsCode(i.getContentCd());
		xfr.setStatusId(xfrs.getTransferStatusId(Transfer.ACTIVE));
		xfr.setTransferTypeId(xfrs.getTransferTypeId(Transfer.EXECUTABLE));
		xfr.setDelta(0);
		xfr.setExpVolume(i.getExpVolumeMax());
		xfr.setExpStartTime(Timestamp.from(Instant.now()));
	    Double transferTime = Math.ceil(i.getExpVolumeMax()/Transfer.SLOW);
	    Instant et = Instant.now().plus(transferTime.longValue(), ChronoUnit.DAYS );
	    xfr.setExpEndTime( Timestamp.from(et) );
		xfrs.insertTransfer(xfr);
		return xfr;
	}
	
}
