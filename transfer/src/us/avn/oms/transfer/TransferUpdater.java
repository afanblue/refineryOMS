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

import java.io.PrintWriter;
import java.io.StringWriter;
import java.sql.Timestamp;
import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalDateTime;
//import java.time.Year;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoField;
import java.time.temporal.ChronoUnit;
//import java.util.Calendar;
import java.util.Collection;
import java.util.HashMap;
import java.util.Iterator;
import java.util.TimerTask;
import java.util.Vector;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import us.avn.oms.domain.AnalogInput;
import us.avn.oms.domain.ChildValue;
import us.avn.oms.domain.Config;
import us.avn.oms.domain.Crontab;
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
import us.avn.oms.domain.RawData;
import us.avn.oms.service.AnalogInputService;
import us.avn.oms.service.ConfigService;
import us.avn.oms.service.CrontabService;
import us.avn.oms.service.DigitalInputService;
import us.avn.oms.service.OrderService;
import us.avn.oms.service.ReferenceCodeService;
import us.avn.oms.service.TagService;
import us.avn.oms.service.TankService;
import us.avn.oms.service.TransferService;
import us.avn.oms.service.VertexService;
import us.avn.oms.service.WatchdogService;
import us.avn.oms.service.RawDataService;

/**
 * TransferUpdater provides the methods for updating transfers, i.e., starting,
 * stopping (completing), creating from schedules, creating from orders
 * <br>
 * Should probably be either an abstract class or a bunch of 
 * Transfer methods
 * @author AVN
 *
 */
public class TransferUpdater extends TimerTask {
	
    /* Get actual class name to be printed on */
    private Logger log = LogManager.getLogger(this.getClass());

    private ApplicationContext context = null;
    private AnalogInputService ais = null;
    private ConfigService cfgs = null;
    private CrontabService crns = null;
    private DigitalInputService dis = null;
    private OrderService ords = null;
    private ReferenceCodeService rcs = null;
    private RawDataService rds = null;
    private TagService tgs = null;
    private TankService tks = null;
    private WatchdogService wds = null;
    private TransferService xfrs = null;
    private VertexService vtxs = null;

    private HashMap<String,String> configuration;
    private LocalDateTime        ldt;
    private Integer              newTransferHour;
    private Integer              newTransferMinute;
    private Integer              newTransferInterval;
    private Instant              now;
    private HashMap<Long,String> ruIds;
    private HashMap<String,Long> statuses;
    private Vector<String>       stations = new Vector<String>(3);
    private HashMap<String,Long> types;
    private ZonedDateTime        zdt;
    
    public TransferUpdater() { 
    	this( (new String[] {"23", "30" }));
    }
    
    public TransferUpdater( String[] args ) {
    	log.debug("TransferUpdater: args[0]: "+(args.length>0?args[0]:"null")
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
    		newTransferInterval = Integer.valueOf(args[0]);
    		break;
    	case 2:
    		this.newTransferHour = Integer.valueOf(args[0]);
    		this.newTransferMinute = Integer.valueOf(args[1]);
    		this.newTransferInterval = null;
    	}
    }
    
	public void run( ) {
		log.debug("run: Start transfer processing");
		/*  */
		if( context == null) { context = new ClassPathXmlApplicationContext("app-context.xml"); }
		if( ais  == null ) { ais  = (AnalogInputService) context.getBean("analogInputService"); }
		if( cfgs == null ) { cfgs = (ConfigService) context.getBean("configService"); }
		if( crns == null ) { crns = (CrontabService) context.getBean("crontabService"); }
		if( dis  == null ) { dis  = (DigitalInputService) context.getBean("digitalInputService"); }
		if( ords == null ) { ords = (OrderService) context.getBean("orderService"); }
		if( rcs  == null ) { rcs  = (ReferenceCodeService) context.getBean("referenceCodeService"); }
		if( rds  == null ) { rds  = (RawDataService) context.getBean("rawDataService" ); }
		if( xfrs == null ) { xfrs = (TransferService) context.getBean("transferService"); }
		if( tgs  == null ) { tgs  = (TagService) context.getBean("tagService"); }
		if( tks  == null ) { tks  = (TankService) context.getBean("tankService"); }
		if( wds  == null ) { wds  = (WatchdogService) context.getBean("watchdogService"); }
		if( vtxs == null ) { vtxs = (VertexService) context.getBean("vertexService"); }
		
		wds.updateWatchdog(Watchdog.TRANSFER);
		now = Instant.now();
		zdt = ZonedDateTime.ofInstant(now, ZoneId.systemDefault());
		ldt = zdt.toLocalDateTime();

		types = xfrs.getAllTransferTypes();
		statuses = xfrs.getAllTransferStatuses();
		configuration = cfgs.getAllConfigItems();

		ruIds = getRefineryUnitIds();

		try {
			updateTransfers();
		} catch( Exception e ) {
			StringWriter sw = new StringWriter();
			e.printStackTrace(new PrintWriter(sw));
			String eas = sw.toString();
			log.error(eas);			
		}
		try {
			completeTransfers();
		} catch( Exception e ) {
			StringWriter sw = new StringWriter();
			e.printStackTrace(new PrintWriter(sw));
			String eas = sw.toString();
			log.error(eas);			
		}
		try {
			startTransfers();
		} catch( Exception e ) {
			StringWriter sw = new StringWriter();
			e.printStackTrace(new PrintWriter(sw));
			String eas = sw.toString();
			log.error(eas);			
		}
		try {
			createScheduledTransfers(ldt);
		} catch( Exception e ) {
			StringWriter sw = new StringWriter();
			e.printStackTrace(new PrintWriter(sw));
			String eas = sw.toString();
			log.error(eas);			
		}
		try {
			createTransfersFromOrders();
		} catch( Exception e ) {
			StringWriter sw = new StringWriter();
			e.printStackTrace(new PrintWriter(sw));
			String eas = sw.toString();
			log.error(eas);			
		}
		
		log.debug("run: Transfer processing complete");
	}

	/**
	 * Update the transfer and order items amount transferred, based on change
	 * in level for the tank.  Each end point (source and destination) if it's
	 * a tank is checked for a limit violation (source: LO, destination: HI) and
	 * the end point is changed if the tank is too low (source) or too high (destination)
	 */
	private void updateTransfers() {
		log.debug("updateTransfers...start");
		Iterator<Transfer> ixat = xfrs.getActiveTransfers().iterator();
		while( ixat.hasNext() ) {
			Transfer xfr = ixat.next();
			Double delta = computeSourceChange(xfr.getSourceId());
			if( null == delta ) {
				delta = computeDestinationChange(xfr.getDestinationId());
			}
			Double newVolume = xfr.getActVolume()+(delta==null?0D:delta);
			xfr.setActVolume(newVolume);
			log.debug("updateTransfer "+xfr.getId()+"/"+xfr.getName()+" "+newVolume);
			incrementOrderItem(xfr.getId(),delta);
			checkEndPointTanks(xfr);
			xfrs.updateTransfer(xfr);
		}
	}
	
	/**
	 * Complete transfers that are active whose completion time 
	 * has elapsed or volume has been transferred
	 */
	private void completeTransfers( ) {
		log.debug("completeTransfers...start");
		Iterator<Transfer> ixet = xfrs.getEndingTransfers().iterator();
		while( ixet.hasNext() ) {
			Transfer x = ixet.next();
			log.debug("completeTransfers: check active transfer "+x.getId()+"/"+x.getName());
			Value v = new Value(x.getId(), Item.DONE, 0D);
			if( x.getEndDiff() <= 0 ) {
				log.debug("completeTransfer (time) "+x.getName() + "/" + x.getId());
				changeTransferState(x,"OFF");
				x.completeTransfer(xfrs);
				ords.completeOrderItems(v);
			} else if( x.getActVolume() >= x.getExpVolume() ) {
				log.debug("completeTransfer (vol) "+x.getName() + "/" + x.getId());
				changeTransferState(x,"OFF");
				x.completeTransfer(xfrs);
				ords.completeOrderItems(v);
			}
		}
	}

	/**
	 * Start scheduled transfers whose starting time
	 * is earlier than the current time
	 */
	private void startTransfers() {
		log.debug("startTransfers...start");
		Iterator<Transfer> ixst = xfrs.getStartingTransfers().iterator();
		while( ixst.hasNext() ) {
			Transfer x = ixst.next();
			log.debug("startTransfers: check scheduled transfer "+x.getId()+"/"+x.getName());
			if( (x.getStartDiff() <= 0) && (x.getEndDiff() > 0) ) {
				log.debug("startTransfer "+x.getName() + "/" + x.getId());
				x.startTransfer(xfrs);
				changeTransferState(x,"ON");
			}
		}
	}
	
	/**
	 * Create a executable transfer for a scheduled transfer.  Scheduled transfers
	 * are those with a non-null crontabId 		
	 * <br>
	 * Only check pending transfers from or to refinery units at 23:30
	 * Check all the others every 5 minutes
	 * 
	 * @param ldt local time, used to check for time to create the scheduled transfers
	 */
	private void createScheduledTransfers( LocalDateTime ldt ) {
		log.debug("createScheduledTransfer...start");
		Iterator<Transfer> ixpt = xfrs.getPendingTemplates().iterator();
		while( ixpt.hasNext() ) {
			Transfer x = ixpt.next();
			if( crns.checkSchedule(ldt, x.getCrontabId() )) {
				log.debug("createScheduledTransfer (transfer): "+x.getId()+"/"+x.getName());
				Tag src = tgs.getTag(x.getSourceId());
				Tag dest = tgs.getTag(x.getDestinationId());
				Transfer newX = new Transfer(x);
				insertNewTransfer(ldt,x,newX);
			}
		}
	}
	
	/**
	 * Create transfers from orders IFF the specific carriers are present
	 * <br>
	 * Notes:<ol><li>Only pending orders (status is changed to Active when transfer created)</li>
	 *        <li>Carrier must be present (see CONFIG.SHIP-PRESENT-NAME, TANKCAR-PRESENT-NAME
	 *            TANKTRUCK-PRESENT-NAME)</li>
	 *        <li>Carrier can only apply to one order item/transfer at a time</li>
	 *        </ol>
	 */
	private void createTransfersFromOrders() {
		log.debug("createTransfersFromOrders...start");
		Iterator<Order> iord = ords.getPendingOrders().iterator();
		while( iord.hasNext() ) {
			Order order = iord.next();
			Long id = order.getId();
			order.setItems(ords.getPendingOrderItems(id));
			log.debug("createTransfersFromOrders (order): "+order.toString());
			Iterator<Item> ii = order.getItems().iterator();
			while( ii.hasNext() ) {
				Item item = ii.next();
				Tag carrier = tgs.getTag(item.getCarrierId());
				Tag dock = carrierPresent(item);
				if( null != dock ) {
					if( ! itemHasBusyCarrier(item) ) {
						log.debug("createTransfersFromOrders: pending order item "+item.getItemNo());
						Transfer xfr = createTransferFromOrder(order,item,carrier,dock);
						if( null != xfr ) {
							xfr.startTransfer(xfrs);
							item.setActive(Item.ACTIVE);
							item.setTransferId(xfr.getId());
							ords.updateItem(item);
							changeTransferState(xfr,"ON");
						} else {
							log.debug("No transfer created, see previous messages");
						}
					} else {
						log.debug("Carrier "+carrier.getName()+" already in use");
					}
				} else {
					log.debug("createTransfersFromOrders: carrier not present at dock");
				}
			}
			if( null == order.getActDate() ) {
				order.setActDate(Timestamp.from(Instant.now()));
				ords.updateOrder(order);
			}
		}
	}
	
	/**
	 * Find out if there's an active order already using this carrier
	 *  
	 * @param i OrderItem to validate
	 * @return True if this carrier already used in another order item 
	 */
	private boolean itemHasBusyCarrier( Item i ) {
		boolean rtnsts = false;
		Collection<Item> ci = ords.getActiveOrderItemForCarrier(i.getCarrierId());
		if ( ci.size() > 0 ) {
			Iterator<Item> ici = ci.iterator();
			while( ici.hasNext() ) {
				Item ti = ici.next();
				if( ! ti.getId().equals(i.getId()) ||
					! ti.getItemNo().equals(i.getItemNo()) ) {
					rtnsts = rtnsts || true;
				}
			}
		}
		return rtnsts;
	}

	
	/**
	 * Insert a new transfer based on the given template into the transfer table 
	 * 
	 * @param ldt local time, used to check for time to create the transfer
	 * @param xfr  transfer template
	 * @param newXfr new transfer to insert
	 */
	private void insertNewTransfer( LocalDateTime ldt, Transfer xfr, Transfer newXfr ) {
		/* ensure that tag ID points to transfer */
		newXfr.setTagId(xfr.getTagId());
		/* set the new name */
		Instant expStart = now.plus( xfr.getDelta(), ChronoUnit.HOURS);
		ZonedDateTime lzdt = ZonedDateTime.ofInstant(expStart, ZoneId.systemDefault()); 
		LocalDate ld = LocalDate.of( lzdt.get(ChronoField.YEAR)
				                   , lzdt.get(ChronoField.MONTH_OF_YEAR)
				                   , lzdt.get(ChronoField.DAY_OF_MONTH));
		newXfr.setName(newXfr.getName()+ld.toString());
		/* source check */
		boolean srcFound = newXfr.checkSource( tgs, tks );
		/* destination check */
		boolean destFound = newXfr.checkDestination( tgs, tks );
		if( srcFound && destFound ) {
			/* Change transfer type id & status id */
			newXfr.setStatusId(statuses.get(Transfer.SCHEDULED ));
			newXfr.setTransferTypeId(types.get(Transfer.EXECUTABLE));
			/* clear the crontab ID on the new transfer (avoid scheduled transfer confusion) */
			newXfr.setCrontabId(0L);
			/* expected start and end times */
			newXfr.setExpStartTime(Timestamp.from(expStart));
			Crontab c = crns.getCrontabRecord(xfr.getCrontabId());
			/* how long is this supposed to last? */
			Integer minutesDuration = 60 * c.getHourDuration() + c.getMinDuration();
			Instant expEnd = expStart.plus(minutesDuration, ChronoUnit.MINUTES);
			newXfr.setExpEndTime(Timestamp.from(expEnd));
			log.debug("insertNewTransfer: "+newXfr.getId()+"/"+newXfr.getName()
			+", sourceId: "+newXfr.getSourceId()+", destId: "+newXfr.getDestinationId());
			xfrs.insertTransfer(newXfr);
		} else {
			log.debug( "insertNewTransfer: "
					+ (srcFound?"":"Source "+newXfr.getSourceId()+" not found  ")
					+ (destFound?"":"Destination "+newXfr.getDestinationId()+" not found") );			
		}
	}
	
	/**
	 * Turn the child tags to the new state.  This turns valves and pumps to their
	 * correct position to allow the fluid to flow to the destination.
	 * @param x  Transfer to modify the state of
	 * @param newState New state for transfer
	 */
	private void changeTransferState( Transfer x, String newState ) {
		String ruNo = getRefineryUnitNumber(x);
		Iterator<ChildValue> xin = getChildTags(x.getDestinationId(),"INL").iterator();
		while( xin.hasNext() ) {
			ChildValue cv = xin.next();
			log.debug("Input tag: "+cv.getInpTagName()+", ruNo: "+ruNo+", endCode: "+cv.getEndCode());
			if( outputAllowed(cv) && ((cv.getEndCode()== null) || ruNo.equals(cv.getEndCode())) ) {
				Double outval = getValue(cv.getInpTagId(), newState );
				RawData xfr = new RawData(cv.getInpTagId(),outval);
				log.debug("changeTransferState: Transfer "+newState+" output: "+cv.getInpTagId()+" - "+xfr);
				rds.updateRawData(xfr);
			}
		}
		
		// The problem w/multi-use of objects and queries is that sometimes things get labeled wrong.
		// Even though we're dealing w/the outputs, they're getting stuffed into the input fields.
		// (sigh)
		Iterator<ChildValue> xout = getChildTags(x.getSourceId(),"OUTL").iterator();
		while( xout.hasNext() ) {
			ChildValue cv = xout.next();
			log.debug("Output tag: "+cv.getInpTagName()+", ruNo: "+ruNo+", endCode: "+cv.getEndCode());
			if( outputAllowed(cv) && ((cv.getEndCode()== null) || ruNo.equals(cv.getEndCode())) ) {
				Double outval = getValue(cv.getInpTagId(), newState );
				RawData xfr = new RawData(cv.getInpTagId(),outval);
				log.debug("changeTransferState: Transfer "+newState+" output: "+cv.getInpTagId()+" - "+xfr);
				rds.updateRawData(xfr);
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
		oa = Tag.DIGITAL_OUTPUT.equals(cv.getInpType());
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
	
	/**
	 * Determine which refinery unit involved in this transfer
	 * @param x Transfer to check
	 * @return Number of refinery unit [null (no RU involved), 1, 2, ...]
	 */
	private String getRefineryUnitNumber( Transfer x) {
		String ruNo = ruIds.get(x.getDestinationId());
		if( null == ruNo ) {
			ruNo = ruIds.get(x.getSourceId());
			if( null == ruNo ) {
				ruNo = "";
			}
		}
		return ruNo;
	}
	
	/**
	 * For digitals, translate a string value to a numerical (double) value 
	 * @param id ID of tag to translate 
	 * @param state new value to set 
	 * @return numerical value to set
	 */
	private Double getValue( Long id, String state ) {
		IdName idn = new IdName(id,state);
		Double outv = rcs.getDigitalValue(idn);
		return outv;
	}
	
	/**
	 * Check that the carrier is present at a loading dock, specified 
	 * by the appropriate indicator in a RelTagTag(code = "DK") record.  There
	 * should only be one
	 *
	 * @param i Item containing specified carrier
	 * @return	Tag of loading dock
	 *
	 */
	private Tag carrierPresent( Item i ) {
		Tag dock = null;
		Collection<RelTagTag> cdk = tgs.getChildrenOfType(i.getCarrierId(), Tag.DOCK);
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
	 * Create a new transfer object based on the order item and the carrier
	 * and the dock at which the carrier is parked.  It DOES insert
	 * the DB record.
	 * <br>            
	 * Notes: The order provides the amount to transfer and whether the transfer
	 *        is to or from the tanks.  All purchases are crude purchases so this
	 *        is easy.
	 * <p>     
	 * Though these are all "one-off" transfers, the template
	 * associated with them is based on the dock where the carrier is located
	 * and the product being transferred, we have 
	 * to determine the appropriate source and destination.  
	 * <p>
	 * It's probably implied somewhere, but an order can cause the creation
	 * of multiple transfers based on the number of order items.  Not sure why
	 * since it seems that should be specified based on the number of holds in
	 * a ship/truck or the number of tank cars in a train.
	 * 
	 * @param order - order for transfer
	 * @param i - order item for transfer
	 * @param carrier - carrier for products
	 * @param dock  - dock (note: this is not <b>just</b> a ship dock).
	 * 
	 * @return - Transfer object (ready to insert)
	 */
	private Transfer createTransferFromOrder( Order order, Item i, Tag carrier, Tag dock ) {
		log.debug("createTransferFromOrder: order: "+order.getId()+" item "+i.toString()+" for carrier "
				+carrier.getName()+" at dock "+dock.getName());
		Transfer xfr = null;
		String baseName = configuration.get(dock.getName());
		if( null != baseName ) {
			xfr = new Transfer();
			String templateName = baseName.replace("ProdCd",i.getContentCd());
			log.debug("createTransferFromOrder: template "+templateName+" for dock "+dock.getName()); 
			Transfer template = xfrs.getTemplate(templateName);
			if( null != template ) {
				log.debug("createTransferFromOrder: template for dock "+dock.getName()+" "+template.toString()); 
				Tag src = tgs.getTag(template.getSourceId());
				if( Tag.DOCK.equals(src.getTagTypeCode()) ) {
					String srcName = configuration.get(Config.STATION_NAME_MASK).replace(Tag.DOCK, src.getName())
							.replace("STN",i.getItemNo().toString());
					src = tgs.getTagByName(srcName, Tag.STATION);
				}
				xfr.setSourceId(src.getId());

				Tag dest = tgs.getTag(template.getDestinationId());
				if( Tag.DOCK.equals(dest.getTagTypeCode()) ) {
					String destName = configuration.get(Config.STATION_NAME_MASK).replace(Tag.DOCK, src.getName())
							.replace("STN",i.getItemNo().toString());
					dest = tgs.getTagByName(destName, Tag.STATION);
				}
				xfr.setDestinationId(template.getDestinationId());

				boolean sourceFound = xfr.checkSource(tgs, tks);
				boolean destFound = xfr.checkDestination(tgs, tks);
				if( sourceFound && destFound ) {
					String name = "";
					String today = DateTimeFormatter.ofPattern("yyyyMMddHHmm").format(zdt);
					//		Calendar cal = Calendar.getInstance();
					xfr.setId(0L);
					xfr.setTagId(template.getTagId());

					if( Order.PURCHASE.equals(order.getPurchase())) {
						name = dock.getName() + "-" + i.getItemNo() + "to" + i.getContentCd() + "-" + today;
					} else {
						name = i.getContentCd() + "to" + dock.getName() + i.getItemNo() + "-" + today;
					}
					xfr.setName(name);
					xfr.setContentsCode(i.getContentCd());
					xfr.setStatusId(statuses.get(Transfer.ACTIVE));
					xfr.setTransferTypeId(types.get(Transfer.EXECUTABLE));
					xfr.setDelta(0);
					xfr.setExpVolume(i.getExpVolumeMin());
					xfr.setExpStartTime(Timestamp.from(Instant.now()));
					Double transferTime = Math.ceil(i.getExpVolumeMin()/Transfer.SLOW);
					Instant et = Instant.now().plusSeconds(60 * transferTime.longValue());
					xfr.setExpEndTime( Timestamp.from(et) );
					xfrs.insertTransfer(xfr);
				} else {
					log.debug( (sourceFound?"":"Source "+src.getName()+" not found  ")
							+ (destFound?"":"Destination "+dest.getName()+" not found") );
					xfr = null;
				}
			} else {
				log.debug("No transfer template found for "+templateName);
				xfr = null;
			}
		} else {
			log.debug("No transfer template set up for dock "+dock.getName());
		}
		return xfr;
	}
	
	/**
	 * compute the change in volume for the source tank.  If it's not a tank, 
	 * no change is necessary
	 * <br> Notes: This doesn't currently correct for temperature differences
	 * <p>
	 * <br>		 IF the source is a tank
	 * <br>		.. get the current level
	 * <br>		.. compute the current volume {@link us.avn.oms.domain.Tank#computeVolume}
	 * <br>		.. compute the previous volume
	 * <br>		.. volume transferred = previous volume - current volume
	 * <br>		END IF
	 * 
	 * @param srcId tag ID for transfer source
	 * @return amount source tank changed 
	 */
	private Double computeSourceChange( Long srcId ) {
		log.debug("computeSourceChange: "+srcId);
		Double sourceVolume = null;
		Tag t = tgs.getTag(srcId);
		if( Tag.TANK.equals(t.getTagTypeCode()) ) {
			Tank tk = tks.getTank(srcId);
			AnalogInput l = ais.getAnalogInput(tk.getLevelId());
			Double volume = tk.computeVolume( l.getScanValue() );
			Double prevVolume = tk.computeVolume( l.getPrevValue() );
			sourceVolume = prevVolume-volume;
		}
		return sourceVolume;
	}

	/**
	 * Correct the level for the tank based on the
	 * change in volume; If it's not a tank, no change
	 * is necessary
	 * <br>Notes: This doesn't currently correct for temperature differences
	 * <p>
	 * <br>		IF the source is a tank
	 * <br>		.. get the current level
	 * <br>		.. compute the current volume
	 * <br>		.. add in the change 
	 * <br>		.. compute the new level (don't let it go above the max level)
	 * <br>		.. update the level tag
	 * <br>		END IF
	 * 
	 * @param destId	tag ID for transfer destination
	 * @return change in volume
	 */
	private Double computeDestinationChange( Long destId ) {
		log.debug("computeDestinationChange: "+destId);
		Double volumeChange = null;
		Tag t = tgs.getTag(destId);
		if( Tag.TANK.equals(t.getTagTypeCode()) ) {
			Tank tk = tks.getTank(destId);
			AnalogInput l = ais.getAnalogInput(tk.getLevelId());
			Double volume = tk.computeVolume( l.getScanValue());
			Double prevVolume = tk.computeVolume(l.getPrevValue());
			volumeChange = volume - prevVolume;
		}
		return volumeChange;
	}
	
	/**
	 * Increment the actual volume for an order Item.
	 * <br>
	 * Look up the order item associated with this transfer.  Then, if found,
	 * increment the actual volume and update the item.
	 * 
	 * @param id transfer ID
	 * @param delta Amount of transfer to increase
	 */
	private void incrementOrderItem(Long id, Double delta ) {
		Item i = ords.getOrderItemByTransferId(id);
		if( i != null ) {
			i.setActVolume(delta+i.getActVolume());
			ords.updateItem(i);
		}
	}
	
	/**
	 * check the end point tanks and verify that the level has not exceeded
	 * the low limit (source) or the high limit (destination).
	 * 
	 * @param xfr transfer to check
	 */
	private void checkEndPointTanks( Transfer xfr ) {
		log.debug("Check endpoints: "+xfr.getId()+"/"+xfr.getName());
		Tag src = tgs.getTag(xfr.getSourceId());
		Tag dest = tgs.getTag(xfr.getDestinationId());
		if( Tag.TANK.equals(src.getTagTypeCode()) ) {
			Long newSrcId = checkTank( Tank.SOURCE, src );
			if( null != newSrcId ) {
				xfr.setSourceId(newSrcId);
//				xfrs.updateTransfer(xfr);  // shouldn't be needed
			}
		}
		if( Tag.TANK.equals(dest.getTagTypeCode()) ) {
			Long newDestId = checkTank( Tank.DESTINATION, dest );
			if( null != newDestId ) {
				xfr.setDestinationId(newDestId);
//				xfrs.updateTransfer(xfr);  // shouldn't be needed
			}
		}
	}

	private Long checkTank( String option, Tag endPoint ) {
		log.debug("checkTank: "+(option=="S"?"Source":"Destination")+" - "+endPoint.getName());
		Tank tk = tks.getTank( endPoint.getId() );
		AnalogInput l = ais.getAnalogInput(tk.getLevelId());
		Long newTankId = null;
		if( Tank.SOURCE.equals(option) ) {
			Double almLimit = l.getLo()!=null?l.getLo():(l.getLl()!=null?l.getLl():0D);
			if(l.getScanValue() <= almLimit ) {
				Value v = tks.getFullestTankForContent(endPoint.getMisc());
				newTankId = v.getId();
			}
		} else if( Tank.DESTINATION.equals(option) && (l.getScanValue() >= l.getHi() )) {
			Double almLimit = l.getHi()!=null?l.getHi():(l.getHh()!=null?l.getHh():Double.MAX_VALUE);
			if(l.getScanValue() >= almLimit ) {
				Value v = tks.getEmptiestTankForContent(endPoint.getMisc());
				newTankId = v.getId();				
			}
		}
		return newTankId;
	}

	/**
	 * Get a hash map for the refinery unit IDs.  The key to the hash map is
	 * the Unit ID, and the value is the "number" of the refinery unit.
	 * 
	 * @return refinery unit IDs
	 */
	private HashMap<Long,String> getRefineryUnitIds() {
		HashMap<Long,String> ruIds = new HashMap<Long,String>();
		Tag ru = tgs.getTagByName(configuration.get(Config.REFINERY_UNIT_1),Tag.REFINERY_UNIT);
		ruIds.put(ru.getId(), "1");
		ru = tgs.getTagByName(configuration.get(Config.REFINERY_UNIT_2),Tag.REFINERY_UNIT);
		ruIds.put(ru.getId(), "2");
		log.debug("RefineryUnit IDs: "+ruIds);
		return ruIds;
	}
}
