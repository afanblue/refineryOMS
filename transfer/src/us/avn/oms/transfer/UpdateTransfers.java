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
import us.avn.oms.domain.IdName;
import us.avn.oms.domain.Tag;
import us.avn.oms.domain.Transfer;
import us.avn.oms.domain.Watchdog;
import us.avn.oms.domain.Xfer;
import us.avn.oms.service.ConfigService;
import us.avn.oms.service.ReferenceCodeService;
import us.avn.oms.service.TagService;
import us.avn.oms.service.TankService;
import us.avn.oms.service.TransferService;
import us.avn.oms.service.VertexService;
import us.avn.oms.service.WatchdogService;
import us.avn.oms.service.XferService;
import us.avn.oms.transfer.domain.TransferX;

public class UpdateTransfers extends TimerTask {
	
    /* Get actual class name to be printed on */
    private Logger log = LogManager.getLogger(this.getClass());

    private ApplicationContext context = null;
    private ConfigService cfgs = null;
    private ReferenceCodeService rcs = null;
    private TagService tgs = null;
    private TankService tks = null;
    private WatchdogService wds = null;
    private TransferService xs = null;
    private VertexService vtxs = null;
    private XferService xfs = null;

    private SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");

    private Collection<Config> nameTemplates;
    private Integer newTransferHour;
    private Integer newTransferMinute;
    private Integer newTransferInterval;
    private HashMap<String,Long> types;
    private HashMap<String,Long> statuses;
    private Date tomorrow;
    
    public UpdateTransfers() { 
    	this( (new String[] {"23", "30" }));
    }
    
    public UpdateTransfers( String[] args ) {
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
		Calendar cal = Calendar.getInstance();
		/*  */
		if( context == null) { context = new ClassPathXmlApplicationContext("app-context.xml"); }
		if( cfgs == null ) { cfgs = (ConfigService) context.getBean("configService"); }
		if( rcs  == null ) { rcs  = (ReferenceCodeService) context.getBean("referenceCodeService"); }
		if( xs   == null ) { xs   = (TransferService) context.getBean("transferService"); }
		if( tgs  == null ) { tgs  = (TagService) context.getBean("tagService"); }
		if( tks  == null ) { tks  = (TankService) context.getBean("tankService"); }
		if( wds  == null ) { wds  = (WatchdogService) context.getBean("watchdogService"); }
		if( vtxs == null ) { vtxs = (VertexService) context.getBean("vertexService"); }
		if( xfs  == null ) { xfs  = (XferService) context.getBean("xferService" ); }
		
		wds.updateWatchdog(Watchdog.TRANSFER);
		
		types = getTransferTypes();
		statuses = getTransferStatuses();
		nameTemplates = cfgs.getAllConfigurationItems();
		
		/* complete transfers that are active whose completion time */
		/* has elapsed                                              */
		Iterator<Transfer> ixet = xs.getEndingTransfers().iterator();
		while( ixet.hasNext() ) {
			TransferX x = new TransferX(ixet.next());
			log.debug("Check active transfer: "+x.toString());
			if( x.getEndDiff() <= 0 ) {
				log.debug("Complete transfer (time) "+x.getName() + "/" + x.getId());
				changeTransferState(x,"OFF");
				x.completeTransfer(xs);
			} else if( x.getActVolume() >= x.getExpVolume() ) {
				log.debug("Complete transfer (vol) "+x.getName() + "/" + x.getId());
				changeTransferState(x,"OFF");
				x.completeTransfer(xs);
			}
		}

		/* start transfers that are scheduled whose starting time */
		/* is earlier than the current time                       */
		Iterator<Transfer> ixst = xs.getStartingTransfers().iterator();
		while( ixst.hasNext() ) {
			TransferX x = new TransferX(ixst.next());
			log.debug("Check scheduled transfer: "+x.toString());
			if( x.getStartDiff() <= 0 && x.getEndDiff() > 0 ) {
				log.debug("Start transfer "+x.getName() + "/" + x.getId());
				x.startTransfer(xs);
				changeTransferState(x,"ON");
			}
		}
		
		/* schedule pending templates ONLY at (default) 23:30 */
		/* if you check the SQL, note that the expected       */
		/* start & end time calculations ignore the time      */
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
		/* Only check pending transfers from or to refinery units at 23:30
		 * Check all the others every 5 minutes
		 */
		Iterator<Transfer> ixpt = xs.getPendingTemplates().iterator();
		while( ixpt.hasNext() ) {
			Transfer x = ixpt.next();
			Tag src = tgs.getTag(x.getSourceId());
			Tag dest = tgs.getTag(x.getDestinationId());
			TransferX newX = new TransferX(x);
			if( "RU".equals(src.getTagTypeCode()) || "RU".equals(dest.getTagTypeCode())) {
				if(  checkOnce || checkMulti ) {
					insertNewTransfer(x, newX);
				} else if( 0 != newX.getDelta() ) {
					insertNewTransfer(x, newX);
				}
			} else if( "S".equals(src.getTagTypeCode()) ) {   //|| "RU".equals(dest.getTagTypeCode())) {
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
	
	private void insertNewTransfer( Transfer x, TransferX newX ) {
		/* ensure that tag ID points to transfer */
		newX.setTagId(x.getTagId());
		/* Change transfer type id & status id */
		newX.setName(newX.getName()+sdf.format(tomorrow));
		newX.setTransferTypeId(types.get("X"));
		newX.setStatusId(statuses.get("S"));
		/* source check */
		newX.checkSource( tgs, tks );
		/* destination check */
		newX.checkDestination( tgs, tks );
		newX.setExpStartTime(x.getNewStartTime());
		newX.setExpEndTime(newX.getNewEndTime());
		log.debug(newX.toString());
		xs.insertTransfer(newX);		
	}
		
	private HashMap<String,Long> getTransferTypes() {
		HashMap<String,Long> xt = new HashMap<String,Long>();
		Iterator<IdName> itt = xs.getTransferTypes().iterator();
		while( itt.hasNext() ) {
			IdName in = itt.next();
			xt.put(in.getName(), in.getId());
		}
		return xt;
	}

	private HashMap<String,Long> getTransferStatuses() {
		HashMap<String,Long> xt = new HashMap<String,Long>();
		Iterator<IdName> itt = xs.getTransferStatuses().iterator();
		while( itt.hasNext() ) {
			IdName in = itt.next();
			xt.put(in.getName(), in.getId());
		}
		return xt;
	}

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
	
	private boolean outputAllowed( ChildValue cv ) {
		boolean oa = false;
		oa = "DO".equals(cv.getInpType());
		return oa;
	}
	
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

}
