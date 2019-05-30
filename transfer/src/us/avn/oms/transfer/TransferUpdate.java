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

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Collection;
import java.util.Date;
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

    private SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");

    private HashMap<String,String> nameTemplates;
    private Integer newTransferHour;
    private Integer newTransferMinute;
    private Integer newTransferInterval;
    private HashMap<String,Long> types;
    private HashMap<String,Long> statuses;
    private Date tomorrow;
    
    public TransferUpdate() { 
    	this( (new String[] {"23", "30" }));
    }
    
    public TransferUpdate( String[] args ) {
    	log.debug("args[0]: "+(args.length>0?args[0]:"null")
    			 +", args[1]: "+(args.length>1?args[1]:"null"));
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
		log.debug("Start transfer processing");
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
		
		types = getTransferTypes();
		statuses = getTransferStatuses();
		nameTemplates = getConfigItems();
		
		completeTransfers();
		startTransfers();
		runScheduledTransfers();
		createTransfersFromOrders();
		
		log.debug("Transfer processing complete");
	}

	/**
	 * Complete transfers that are active whose completion time 
	 * has elapsed or volume has been transferred
	 */
	private void completeTransfers( ) {
		Iterator<Transfer> ixet = xfrs.getEndingTransfers().iterator();
		while( ixet.hasNext() ) {
			Transfer x = ixet.next();
			log.debug("Check active transfer: "+x.toString());
			if( x.getEndDiff() <= 0 ) {
				log.debug("Complete transfer (time) "+x.getName() + "/" + x.getId());
				changeTransferState(x,"OFF");
				x.completeTransfer(xfrs);
			} else if( x.getActVolume() >= x.getExpVolume() ) {
				log.debug("Complete transfer (vol) "+x.getName() + "/" + x.getId());
				changeTransferState(x,"OFF");
				x.completeTransfer(xfrs);
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
			log.debug("Pending order: "+id);
			order.setItems(ords.getPendingOrderItems(id));
			Iterator<Item> ii = order.getItems().iterator();
			Tag carrier = tgs.getTag(order.getCarrierId());
			Tag dock = carrierPresent(carrier);
			if( null != dock ) {
				while( ii.hasNext() ) {
					Item item = ii.next();
					log.debug("Pending order item: "+item.getItemNo());
					Transfer xfr = createNewTransfer(order,item,carrier,dock);
					xfr.startTransfer(xfrs);
					item.setActive(Order.ACTIVE);
					ords.updateItem(item);
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
			log.debug("Check scheduled transfer: "+x.toString());
			if( (x.getStartDiff() <= 0) && (x.getEndDiff() > 0) ) {
				log.debug("Start transfer "+x.getName() + "/" + x.getId());
				x.startTransfer(xfrs);
				changeTransferState(x,"ON");
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
		log.debug( "Time: @"+hr+":"+min+" check? "+newTransferHour+":"+newTransferMinute+" / "+newTransferInterval);
		Boolean checkOnce = ((newTransferHour != null) && (newTransferMinute != null))
						  ? (hr.equals(newTransferHour) && min.equals(newTransferMinute))
						  : false;
		Boolean checkMulti = (newTransferInterval != null)
						   ? (min % newTransferInterval == 0)
						   : false;
		log.debug( "Check? " + (checkOnce?"true":"false") + " or " + (checkMulti?"true":"false"));

		Date now = new Date();
		cal.add(Calendar.DATE,1);
		tomorrow = cal.getTime();
		Iterator<Transfer> ixpt = xfrs.getPendingTemplates().iterator();
		while( ixpt.hasNext() ) {
			Transfer x = ixpt.next();
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
			} else if( Tag.SHIP.equals(src.getTagTypeCode()) ) {   //|| "RU".equals(dest.getTagTypeCode())) {
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
	
	private void insertNewTransfer( Transfer x, Transfer newX ) {
		/* ensure that tag ID points to transfer */
		newX.setTagId(x.getTagId());
		/* Change transfer type id & status id */
		newX.setName(newX.getName()+sdf.format(tomorrow));
		newX.setTransferTypeId(types.get(Transfer.EXECUTABLE));
		newX.setStatusId(statuses.get(Transfer.SCHEDULED));
		/* source check */
		newX.checkSource( tgs, tks );
		/* destination check */
		newX.checkDestination( tgs, tks );
		newX.setExpStartTime(x.getNewStartTime());
		newX.setExpEndTime(newX.getNewEndTime());
		log.debug(newX.toString());
		xfrs.insertTransfer(newX);		
	}
		
	private HashMap<String,Long> getTransferTypes() {
		HashMap<String,Long> xt = new HashMap<String,Long>();
		Iterator<IdName> itt = xfrs.getTransferTypes().iterator();
		while( itt.hasNext() ) {
			IdName in = itt.next();
			xt.put(in.getName(), in.getId());
		}
		return xt;
	}

	private HashMap<String,Long> getTransferStatuses() {
		HashMap<String,Long> xt = new HashMap<String,Long>();
		Iterator<IdName> itt = xfrs.getTransferStatuses().iterator();
		while( itt.hasNext() ) {
			IdName in = itt.next();
			xt.put(in.getName(), in.getId());
		}
		return xt;
	}
	
	private HashMap<String,String> getConfigItems() {
		HashMap<String,String> ci = new HashMap<String,String>();
		Iterator<Config> ici = cfgs.getAllConfigurationItems().iterator();
		while( ici.hasNext() ) {
			Config c = ici.next();
			ci.put(c.getKey(), c.getValue());
		}
		return ci;
	}

	/**
	 * Change transfer state; if new state is 
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
				log.debug("Transfer "+newState+" output: "+cv.getInpTagId()+" - "+xfr);
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
				log.debug("Transfer "+newState+" output: "+cv.getInpTagId()+" - "+xfr);
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
	 * @param t Tag of specified carrier
	 * @return	Tag of loading dock
	 *
	 * If the carrier is present at a loading dock, specified 
	 * by the appropriate indicator in a RelTagTag(code = "CRR") record,
	 * we verify that it matches the carrier
	 * <p/>
	 * The dock will have multiple REL_TAG_TAG records associated w/it
	 * - the digital input which specifies something is present at the 
	 *   dock (rel_tag_tag.code = "IN")
	 * - the carrier which is present at the dock. (rel_tag_tag.code = "CAR")
	 */
	private Tag carrierPresent( Tag t ) {
		Tag dock = null;
		Iterator<Tag> idk = tgs.getAllTagsByType(Tag.DOCK).iterator();
		while( idk.hasNext() ) {
			Tag dk = idk.next();
			log.debug( "Check carrier "+t.getName()+" present for dock "+dk.getName());
			Iterator<RelTagTag> irtt = tgs.getChildrenOfType(dk.getId(), "CRR").iterator();
			if( irtt.hasNext() ) {
				RelTagTag rtt = irtt.next();
				log.debug("Carrier "+t.getId()+" @ Dock "+rtt.getChildTagId());
				if( t.getId().equals(rtt.getChildTagId()) ) {
					dock = dk;
					break;
				}
			}
		}
		log.debug("Carrier "+t.getName()+" present? "+(null==dock?"No":dock.getName()));
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
	 *        These are all "one-off" transfers, which means there is no template
	 *        associated with them, so based on the product transferred, we have 
	 *        to determine the appropriate source (for sales) and destination
	 *        (for purchases).
	 * 
	 * @param order - order to implement transfer for
	 * @oaran item - 
	 * @param carrier - carrier for products
	 * @param dock  - dock (note: this is not <b>just</b> a ship dock).
	 * 
	 * @return - Transfer object (ready to insert)
	 */
	private Transfer createNewTransfer( Order order, Item i, Tag carrier, Tag dock ) {
		log.debug("Create new transfer, order: "+order.getShipmentId()+" item "+i.toString());
		Transfer xfr = new Transfer();
		Transfer template = xfrs.getTemplate(nameTemplates.get(dock.getName()));
		Value src = null;
		Value dest = null;
		String name = "XFR";
		String today = sdf.format(new Date());
		Calendar cal = Calendar.getInstance();
		xfr.setId(0L);
		xfr.setTagId(null);
		xfr.setSourceId(template.getSourceId());
		xfr.setDestinationId(template.getDestinationId());
		if( Order.PURCHASE.equals(order.getPurchase())) {
	    	name = i.getContentCd() + "to" + dock.getName() + i.getItemNo() + "-" + today;
	    } else {
	    	name = dock.getName() + "-" + i.getItemNo() + "to" + i.getContentCd() + "-" + today;
	    }
		xfr.checkSource(tgs, tks);
		xfr.checkDestination(tgs, tks);
		xfr.setTagId(template.getId());
		xfr.setName(name);
		xfr.setContentsCode(i.getContentCd());
		xfr.setStatusId(xfrs.getTransferStatusId(Transfer.PENDING));
		xfr.setTransferTypeId(xfrs.getTransferTypeId(Transfer.EXECUTABLE));
		xfr.setDelta(0);
		xfr.setExpVolume(i.getExpVolumeMax());
		xfr.setExpStartTime(sdf.format(new Date()));
	    Double transferTime = Math.ceil(i.getExpVolumeMax()/Transfer.SLOW);
	    cal.add(Calendar.DATE, transferTime.intValue() );
	    String endTime = sdf.format(cal.getTime());
	    xfr.setExpEndTime( endTime );
		xfrs.insertTransfer(xfr);
		return xfr;
	}
	
}
