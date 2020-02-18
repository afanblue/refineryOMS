package us.avn.oms.devio.device.simulator;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Collection;
import java.util.HashMap;
import java.util.Iterator;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import us.avn.oms.devio.device.IODevice;
import us.avn.oms.domain.Address;
import us.avn.oms.domain.AnalogInput;
import us.avn.oms.domain.Config;
import us.avn.oms.domain.Device;
import us.avn.oms.domain.DigitalInput;
import us.avn.oms.domain.Item;
import us.avn.oms.domain.SimIO;
import us.avn.oms.domain.Tag;
import us.avn.oms.domain.Tank;
import us.avn.oms.domain.Transfer;
import us.avn.oms.domain.Watchdog;
import us.avn.oms.domain.RawData;
import us.avn.oms.service.AddressService;
import us.avn.oms.service.AnalogInputService;
import us.avn.oms.service.AnalogOutputService;
import us.avn.oms.service.ConfigService;
import us.avn.oms.service.ControlBlockService;
import us.avn.oms.service.DigitalInputService;
import us.avn.oms.service.DigitalOutputService;
import us.avn.oms.service.OrderService;
import us.avn.oms.service.SimIOService;
import us.avn.oms.service.TagService;
import us.avn.oms.service.TankService;
import us.avn.oms.service.TransferService;
import us.avn.oms.service.WatchdogService;
import us.avn.oms.service.RawDataService;

public class Simulator extends IODevice {

    private Logger log = LogManager.getLogger(this.getClass());
    private static HashMap<String,String> configuration;
    private static Double AMBIENT_TEMPERATURE = 23D;
	private HashMap<String,Double> currentTags = new HashMap<String,Double>();
	private Instant currentTempTime;
	private Double currentTemp;

	public Simulator() {
		// TODO Auto-generated constructor stub
	}

	public Simulator(Device d, AddressService adrs
			, AnalogInputService ais, AnalogOutputService aos
			, ConfigService cs, ControlBlockService cbs
			, DigitalInputService dis, DigitalOutputService dos
			, OrderService ords, RawDataService rds, TagService tgs
			, TankService tks, TransferService tfs) {
		super(d, adrs, ais, aos, cs, cbs, dis, dos, ords, rds, tgs, tks, tfs);
		
		
		configuration = cs.getAllConfigItems();

		String currentTempTag = (String)configuration.get(Config.CURRENT_TEMP);
		String currentPressTag = (String)configuration.get(Config.CURRENT_PRESSURE);
		String currentWindSpeedTag = (String)configuration.get(Config.CURRENT_WIND_SPEED);
		String currentWindDirTag = (String)configuration.get(Config.CURRENT_WIND_DIR);
		String currentPrecipTag = (String)configuration.get(Config.LAST_HOUR_PRECIP);
		Tag ctTag = tgs.getTagByName(configuration.get(Config.CURRENT_TEMP), "AI");
		AnalogInput ctAI = ais.getAnalogInput(ctTag.getId());
		currentTempTime = ctAI.getScanTime();
		currentTemp = ctAI.getScanValue();

		currentTags.put(currentTempTag,      currentTemp);
		currentTags.put(currentPressTag,     1.0D);
		currentTags.put(currentWindSpeedTag, 1.0D);
		currentTags.put(currentWindDirTag,   1.0D);
		currentTags.put(currentPrecipTag,    1.0D);
	}

	/**
	 * 
	 */
	@Override
	public void getAnalogInputs( Integer sec ) {
		log.debug("Start Simulator AI processing");
		Collection<Address> cai = adrs.getActiveAddressesForDeviceByType(device.getId(), Tag.ANALOG_INPUT);
		Iterator<Address> iai = cai.iterator();
		Instant currentScanTime = Instant.now();
		while( iai.hasNext() ) {
			Address adr = iai.next();
			AnalogInput ai = ais.getAnalogInput(adr.getIaddr1());
			RawData x = new RawData();
			x.setId(ai.getTagId());
			String aiTypeCode = ai.getAnalogTypeCode();
			String aiName = ai.getTag().getName();
//     	    fake the collected data
			if( "T".equals(ai.getAnalogTypeCode())) {
				if( currentTempTime.plus(2L,ChronoUnit.HOURS).compareTo(ai.getScanTime()) >= 0 ) {
					log.debug("Processing AI tag "+aiName + "/" + ai.getTagId());
					Double nv = (ai.getScanValue()!=null)?ai.getScanValue():AMBIENT_TEMPERATURE;
					Double ct = (currentTemp!=null?currentTemp:nv);
					log.debug("Recorded scan value (id="+x.getId()+"): "+nv+", from web: "+ct);
					nv += 0.002 * (ct - nv);
					x.setFloatValue(nv);
					x.setScanTime(currentScanTime);
//					Updated simulated data
					rds.updateRawData(x);
				} else {
					log.debug("Ignore "+aiName+" - "+currentTempTime+" < scan time ("+ai.getScanTime()+")");
				}
			} else {
//				don't update Calculated or Manual analog types or the current weather tags
				if( ! AnalogInput.CALCULATED.equals(aiTypeCode) && 
					! AnalogInput.MANUAL.equals(aiTypeCode) ) {
					if( ! currentTags.containsKey(aiName) ) {
//						set the value to its current value
//						(this will be overwritten by transfer levels)
						x.setFloatValue(ai.getScanValue());
						x.setScanTime(currentScanTime);
						rds.updateRawData(x);
					} else {
						log.debug("Ignore: "+aiName+", current weather tag");
					}
				} else {
					log.debug(aiTypeCode+" ignored: "+aiName);
				}
			}
		}
//		check transfers	
		checkTransfers( );
		log.debug("End Simulator AI processing");
	}

	@Override
	public void setAnalogOutputs( Integer sec ) {
		log.debug("Start Simulator AO processing");
		Iterator<Address> iadr = adrs.getActiveAddressesForDeviceByType(device.getId(), Tag.ANALOG_OUTPUT).iterator();
		while( iadr.hasNext() ) {
			Address addr = iadr.next();
			if( null != addr.getScanValue() && addr.getUpdated() == 1 ) {
				log.debug("Update: "+addr.getIaddr1()+" from "+addr.getId());
				RawData x = new RawData();
				x.setId(addr.getIaddr1());
//     	    	fake the collected data
//				set the value to the current value of the input
				x.setFloatValue(addr.getScanValue());
				rds.updateRawData(x);
				rds.clearUpdated(addr.getId());
			}
		}
		log.debug("End Simulator AO processing");
	}

	@Override
	public void getDigitalInputs( Integer sec ) {
		log.debug("Start Simulator DI processing");
		Collection<Address> cdi = adrs.getActiveAddressesForDeviceByType(device.getId(),Tag.DIGITAL_INPUT);
		Iterator<Address> idi = cdi.iterator();
		while( idi.hasNext() ) {
			Address di = idi.next();
/*
			RawData rd = new RawData(di.getIaddr1(), di.getScanValue());
			rds.updateRawData(rd);
*/
		}
		log.debug("End Simulator DI processing");
	}

	@Override
	public void setDigitalOutputs( Integer sec ) {
		log.debug("Start Simulator DO processing");
/* */
		Iterator<Address> iadr = adrs.getActiveAddressesForDeviceByType(device.getId(),Tag.DIGITAL_OUTPUT).iterator();
		while( iadr.hasNext() ) {
			Address addr = iadr.next();
			if( null != addr.getScanValue() && addr.getUpdated() == 1 ) {
				log.debug("Update: "+addr.getIaddr1()+" from "+addr.getId());
				RawData x = new RawData(addr.getIaddr1(), addr.getScanValue());
//     	    	fake the collected data
//				set the value to the current value of the input
				rds.updateRawData(x);
				rds.clearUpdated(addr.getId());
			}
		}
/* */
		log.debug("End Simulator DO processing");
	}
	
	/**
	 * Check the active transfers to be able to set the changes in the 
	 * analog values for the tank levels.  No changes are made to the transfer
	 */
	private void checkTransfers( ) {
		Iterator<Transfer> ix = tfs.getActiveTransfers().iterator();
		while( ix.hasNext() ) {
			Transfer x = ix.next();
			log.debug("checkTransfers: Transfer "+x.toString());
			Double delta = specifyVolumeChange( x );
			log.debug("Transfer "+x.getName()+"/"+x.getId()+" - Change: "+delta);
			decrementSource( x.getSourceId(), delta );
			incrementDestination( x.getDestinationId(), delta );
		}
	}


	/**
	 * Determine the change in volume! for a transfer
	 * {@code This is where the magic occurs!
	 *      * Transfers are only allowed between refinery units (RU),
	 *        tanks (TK), and docks (DK) 
	 *        [should probably be docking stations (STN), but the logic
	 *         is still evading me].
	 *      * Docking stations exist for Ships, Tank Trucks and Tank Cars
	 *      * If the dock (docking station) is a source, it MUST be crude and the 
	 *        destination MUST be a crude tank.
	 *      * We assume that this is called once a minute and 
	 *        returns the appropriate value
	 *      * FWIW, I don't know if these numbers are anywhere near
	 *              reasonable.
	 *      
	 * 		+-----------------------------+-----------------------+
	 * 		|    Between                  |  Amount Transferred   |
	 *      +-----------------------------+-----------------------+
	 *      | crude tank -> crude tank    |     FAST bbl/min      |
	 *      +-----------------------------+-----------------------+
	 *      | not crude -> not crude tank |     SLOW bbl/min      |
	 *      |   BUT the same content type |                       |
	 *      +-----------------------------+-----------------------+
	 *      | other tank to tank          |     0 bbl/min         |
	 *      +-----------------------------+-----------------------+
	 * 		| crude tank -> refinery unit |     FAST bbl/min      |  
	 *      +-----------------------------+-----------------------+
	 *      | refinery unit ->            |  FAST * fraction      |
	 *      |    refined tank             |    defined in CONFIG  |
	 *      +-----------------------------+-----------------------+
	 *      | ship/dock -> crude tank     |     FAST bbl /min     |
	 *      +-----------------------------+-----------------------+
	 *      | refined tank -> tank truck  |     SLOW bbl /min     |
	 *      +-----------------------------+-----------------------+
	 *      | refined tank -> tank car    |     FAST bbl /min     |
	 *      +-----------------------------+-----------------------+
	 *      | refined tank -> ship/dock   |     FAST bbl / min    |
	 *      +-----------------------------+-----------------------+
	 *      | anything else               |     0 (no transfer)   |
	 *      +-----------------------------+-----------------------+
	 * }    
	 * @param x transfer to update
	 * @return volume change (from source to destination)
	 */
	private Double specifyVolumeChange( Transfer x ) {
		Double delta;
		log.debug("computeChange for transfer "+x.toString());
		Tag src = tgs.getTag(x.getSourceId());
		Tag dest = tgs.getTag(x.getDestinationId());
		log.debug("Source: "+(src==null?"null":src.toString()));
		log.debug("Destination: "+(dest==null?"null":dest.toString()));
		switch ( src.getTagTypeCode() ) {
		case Tag.TANK :
			Tank srcTk = tks.getTank(x.getSourceId());
			/* tank - tank transfer */
			if( Tag.TANK.equals(dest.getTagTypeCode())) {
				Tank destTk = tks.getTank(x.getDestinationId());
				if( srcTk.getContentTypeCode().equals(destTk.getContentTypeCode())) {
					if( Tank.CRUDE.equals(srcTk.getContentTypeCode())) {
						delta = Transfer.FAST;
					} else {
						delta = Transfer.SLOW;
					}
				} else {
					delta = 0D;
				}
				/* tank - refinery unit transfer */
			} else if( Tag.REFINERY_UNIT.equals(dest.getTagTypeCode())) {
				if( Tank.CRUDE.equals(srcTk.getContentTypeCode())) {
					delta = Transfer.FAST;
				} else {
					delta = 0D;
				}
				/* tank - docking station transfer */
			} else {
				if ( Tank.CRUDE.equals(srcTk.getContentTypeCode()) ) {
					delta = 0D;
				} else {
					if ( Tag.DOCK.equals(dest.getTagTypeCode())) {
						delta = Transfer.FAST;
					} else if ( Tag.TANK_CAR.equals(dest.getTagTypeCode())) {
						delta = Transfer.FAST;
					} else if ( Tag.TANK_TRUCK.equals(dest.getTagTypeCode())) {
						delta = Transfer.SLOW;
					} else {
						delta = 0D;
					}
				}
			}
			break;
		case Tag.REFINERY_UNIT :
			Tank destTk = tks.getTank(x.getDestinationId());
			if( Tank.CRUDE.equals(destTk.getContentTypeCode())) {
				delta = 0D;
			} else {
				String code = destTk.getContentType().toUpperCase().concat("-PERCENT");
				String fString = (String)configuration.get(code);
				fString = (fString==null?"0":fString);
				log.debug("Fraction: "+destTk.getContentTypeCode()+" = "+fString);
				Double f = new Double( fString );
				delta = Transfer.FAST * f / 100D;
			}
			break;
		case Tag.STATION :
		case Tag.DOCK :
			Tank dstTk = tks.getTank(x.getDestinationId());
			if( Tag.TANK.equals(dest.getTagTypeCode())) {
				if( Tank.CRUDE.equals(dstTk.getContentTypeCode())) {
					delta = Transfer.FAST;
				} else {
					delta = 0D;
				}
			} else {
				delta = 0D;
			}
			break;
		default:
			delta = 0D;
		}
		log.debug("Return "+delta);
		return delta;
	}


	/**
	 * Method: decrementSource
	 * Description: correct the level for the tank based on the
	 * 				change in volume; If it's not a tank, no change
	 * 				is necessary
	 * Notes: This doesn't currently correct for temperature differences
	 * {@code IF the source is a tank
	 * 		.. get the current level
	 * 		.. compute the current volume
	 * 		.. subtract out the change (don't let it go below zero)
	 * 		.. compute the new level
	 * 		.. update the level tag
	 * 		END IF
	 * }	
	 * @param srcId
	 * @param vol
	 */
	private void decrementSource( Long srcId, Double vol ) {
		log.debug("Decrement source: "+srcId+" by "+vol);
		if( vol > 0D ) { 
			Tag t = tgs.getTag(srcId);
			if( Tag.TANK.equals(t.getTagTypeCode()) ) {
				Tank tk = tks.getTank(srcId);
				AnalogInput l = ais.getAnalogInput(tk.getLevelId());
				Double volume = tk.computeVolume( l.getScanValue() );
				volume = (volume-vol>0)?(volume-vol):0D;
				Double lvl = tk.computeLevel( volume );
				RawData rd = new RawData();
				rd.setId(tk.getLevelId());
				rd.setFloatValue(lvl);
				log.debug("Update raw data (decrement): "+rd.toString());
				rds.updateRawData(rd);
			}
		}
	}

	/**
	 * Correct the level for the tank based on the
	 * change in volume; If it's not a tank, no change
	 * is necessary
	 * {@code
	 * Notes: This doesn't currently correct for temperature differences
	 * 		IF the source is a tank
	 * 		.. get the current level
	 * 		.. compute the current volume
	 * 		.. add in the change 
	 * 		.. compute the new level (don't let it go above the max level)
	 * 		.. update the level tag
	 * 		END IF
	 * }
	 * 
	 * @param destId	ID of transfer destination
	 * @param vol	volume change
	 * @param tks	tank service
	 * @param ais	analog input service
	 */
	private void incrementDestination( Long destId, Double vol ) {
		log.debug("Increment destination: "+destId+" by "+vol);
		if( vol > 0D ) {
			Tag t = tgs.getTag(destId);
			if( Tag.TANK.equals(t.getTagTypeCode()) ) {
				Tank tk = tks.getTank(destId);
				AnalogInput l = ais.getAnalogInput(tk.getLevelId());
				Double volume = tk.computeVolume( l.getScanValue());
				volume += vol;
				Double lvl = tk.computeLevel( volume );
				lvl = (lvl>l.getMaxValue())?l.getMaxValue():lvl;
				RawData rd = new RawData();
				rd.setId(tk.getLevelId());
				rd.setFloatValue(lvl);
				log.debug("Update raw data (increment): "+rd.toString());
				rds.updateRawData(rd);
			}
		}
	}

}
