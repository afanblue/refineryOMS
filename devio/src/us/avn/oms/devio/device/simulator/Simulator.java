package us.avn.oms.devio.device.simulator;

import java.time.Instant;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.temporal.ChronoField;
import java.time.temporal.ChronoUnit;
import java.util.Collection;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Vector;

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
		Tag ctTag = tgs.getTagByName(configuration.get(Config.CURRENT_TEMP), Tag.ANALOG_INPUT);
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
	 * Get the values for all of the analog inputs.  For the simulation, the changes
	 * due to transfers are first calculated, then the changes for most of the other
	 * analog values.  The changes due to transfers are first calculated and a collection
	 * of endpoint tag IDs is returned.  The address used (iaddr1) contains the tag ID
	 * for the source 
	 * @param sec the current second, used to determine the tags to "scan". 
	 */
	@Override
	public void getAnalogInputs( Integer sec ) {
		log.debug("Start Simulator AI processing");
		Instant currentScanTime = Instant.now();

		//		check transfers	
		Vector<Long> epIds = checkTransfers( currentScanTime, sec );
		// log.debug("# endPoints: "+epIds.size()+" - "+epIds);

		Collection<Address> cai = 
				adrs.getActiveAddressesForDeviceByType(device.getId(), Tag.ANALOG_INPUT, sec);
		Iterator<Address> iai = cai.iterator();
		while( iai.hasNext() ) {
			Address adr = iai.next();
			AnalogInput ai = ais.getAnalogInput(adr.getIaddr1());
			String aiTypeCode = ai.getAnalogTypeCode();
			String aiName = ai.getTag().getName();
			//     	    fake the collected data
			log.debug("Processing AI tag "+aiName + "/" + ai.getTagId()+":"+aiTypeCode);
			if( ! epIds.contains(ai.getTagId())) {
				switch (aiTypeCode) {
				case AnalogInput.TEMPERATURE :
					updateTemperature( ai, currentScanTime);
					break;
				case AnalogInput.CALCULATED:
				case AnalogInput.MANUAL:
					log.debug(aiName+" ignored: "+aiTypeCode+" not simulated");
					break;
				case AnalogInput.FLOW_RATE:
				case AnalogInput.LEVEL:
				case AnalogInput.PRESSURE:
				case AnalogInput.ANGLE_HEADING:
				case AnalogInput.ACCUMULATOR:
				case AnalogInput.MISCELLANEOUS:
					updateOther( ai, currentScanTime );
					break;
				case AnalogInput.EXPERIMENTAL:
					updateExperimental( adr, currentScanTime );
					break;
				default:
					log.debug(aiName +" ignored: "+aiTypeCode+" not recognized");
					break;
				}
			} else {
				log.debug(aiName+" ignored, updated by transfer");;
			}
		}
		log.debug("End Simulator AI processing");
	}

	/**
	 * update the analog outputs.  Note that the "address" for the output in this
	 * case are the IDs of the pv and setpoint for this output.  This simulation just writes the
	 * value of the output directly to the input.  A real address would depend on
	 * something actually acting on this output which would then be reflected back
	 * through the input. 
	 * @param sec the current second, used to determine the tags to "scan".  
	 */
	@Override
	public void setAnalogOutputs( Integer sec ) {
		log.debug("Start Simulator AO processing");
		Iterator<Address> iadr = 
				adrs.getActiveAddressesForDeviceByType(device.getId(), Tag.ANALOG_OUTPUT, sec).iterator();
		while( iadr.hasNext() ) {
			Address addr = iadr.next();
			if( null != addr.getScanValue() && addr.getUpdated() == 1 ) {
				log.debug("Update: "+addr.getIaddr1()+" from "+addr.getId());
				RawData xpv = new RawData();
				xpv.setId(addr.getIaddr1());
//     	    	fake the collected data
//				set the value to the current value of the input
				xpv.setFloatValue(addr.getScanValue());
				rds.updateRawData(xpv);
				RawData xsp = new RawData();
				xsp.setId(addr.getIaddr2());
				xsp.setFloatValue(addr.getScanValue());
				rds.updateRawData(xsp);
				rds.clearUpdated(addr.getId());
			}
		}
		log.debug("End Simulator AO processing");
	}

	/**
	 * No simulation is done on digital inputs.  If it's tied to an output
	 * then the output simulates the input; otherwise, the setting of a 
	 * simulated digital input is done by the Simulation process.
	 * @param sec the current second, used to determine the tags to "scan".  
	 */
	@Override
	public void getDigitalInputs( Integer sec ) {
		log.debug("Start Simulator DI processing");
/*
 		Collection<Address> cdi = 
				adrs.getActiveAddressesForDeviceByType(device.getId(),Tag.DIGITAL_INPUT, sec);
		Iterator<Address> idi = cdi.iterator();
		while( idi.hasNext() ) {
			Address di = idi.next();
			RawData rd = new RawData(di.getIaddr1(), di.getScanValue());
			rds.updateRawData(rd);
		}
*/
		log.debug("End Simulator DI processing");
	}

	/**
	 * update the digital outputs.  Note that the "address" for the output in this
	 * case is the ID of the input tag to update.  This simulation just writes the
	 * value of the output directly to the input.  A real address would depend on
	 * something actually acting on this output which would then be reflected back
	 * through the input. 
	 * @param sec the current second, used to determine the tags to "scan".  
	 */
	@Override
	public void setDigitalOutputs( Integer sec ) {
		log.debug("Start Simulator DO processing");
/* */
		Iterator<Address> iadr = 
				adrs.getActiveAddressesForDeviceByType(device.getId(),Tag.DIGITAL_OUTPUT, sec).iterator();
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
	 * Update the raw data value for an analog temperature
	 * @param ai Analog Input to update
	 * @param cst current scan time
	 */
	private void updateTemperature( AnalogInput ai, Instant cst ) {
		RawData x = new RawData();
		x.setId(ai.getTagId());
		if( currentTempTime.plus(2L,ChronoUnit.HOURS).compareTo(ai.getScanTime()) >= 0 ) {
			Double nv = (ai.getScanValue()!=null)?ai.getScanValue():AMBIENT_TEMPERATURE;
			Double ct = (currentTemp!=null?currentTemp:nv);
			log.debug("Recorded scan value (id="+x.getId()+"): "+nv+", from web: "+ct);
			nv += 0.002 * (ct - nv);
			x.setFloatValue(nv);
			x.setScanTime(cst);
			//	Update simulated data
			rds.updateRawData(x);
		} else {
			log.debug("Ignore "+ai.getTag().getName() +" - "+currentTempTime+" < scan time ("+ai.getScanTime()+")");
		}
	}
	
	private void updateOther( AnalogInput ai, Instant cst ) {
		RawData x = new RawData();
		String aiName = ai.getTag().getName();
		x.setId(ai.getTagId());
		//	don't update Calculated or Manual analog types or the current weather tags
		if( ! currentTags.containsKey(aiName) ) {
		//	set the value to its current value
			x.setFloatValue(ai.getScanValue());
			x.setScanTime(cst);
			rds.updateRawData(x);
		} else {
			log.debug("Ignore: "+aiName+", current weather tag");
		}		
	}
	
	/**
	 * Generate a sine wave signal for the given address.  param1 = cycle time,
	 * param2 = offset, both of which are in minutes...
	 * @param adr address of tag to update
	 * @param cst current scan time
	 */
	private void updateExperimental( Address adr, Instant cst ) {
		RawData x = new RawData();
		x.setId(adr.getId());
		ZonedDateTime zdt = ZonedDateTime.ofInstant(cst, ZoneId.systemDefault());
		Double phi = 2D * Math.PI * ( (Double.valueOf(adr.getIaddr3())) + (Double.valueOf(zdt.get(ChronoField.MINUTE_OF_DAY))) )
				     / (Double.valueOf(adr.getIaddr2()) ) ;
		log.debug("Experimental value: "+adr.getId()+" - "+phi);
		x.setFloatValue(Math.sin(phi));
		x.setScanTime(cst);
		rds.updateRawData(x);
	}

	
	/**
	 * Check the active transfers to be able to set the changes in the 
	 * analog values for the tank levels.  No changes are made to the transfer
	 * @param cst current scan time
	 * @param sec the current second (from gatAnalogInput, passed to decrementSource and incrementDestination)
	 * @return list of IDs of all source and destination tags
	 */
	private Vector<Long> checkTransfers( Instant cst, Integer sec ) {
		Vector<Long> endPointIDs = new Vector<Long>();
		Iterator<Transfer> ix = tfs.getActiveTransfers().iterator();
		while( ix.hasNext() ) {
			Transfer x = ix.next();
			log.debug("checkTransfers: Transfer "+x.toString());
			Double delta = specifyVolumeChange( x );
			log.debug("checkTransfers: Transfer "+x.getName()+"/"+x.getId()+" - Change: "+delta);
			Long srcId = decrementSource( x.getSourceId(), delta, sec, cst );
			if( null != srcId ) { endPointIDs.add(srcId); }
			Long destId = incrementDestination( x.getDestinationId(), delta, sec, cst );
			if( null != destId ) { endPointIDs.add(destId); }
		}
		return endPointIDs;
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
			if( 0 == srcTk.getId() ) {
				delta = 0D;
			} else if( Tag.TANK.equals(dest.getTagTypeCode())) {
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
			if( 0 == destTk.getId() ) {
				delta = 0D;
			} else if( Tank.CRUDE.equals(destTk.getContentTypeCode())) {
				delta = 0D;
			} else {
				String code = destTk.getContentType().toUpperCase().concat("-PERCENT");
				String fString = (String)configuration.get(code);
				fString = (fString==null?"0":fString);
				log.debug("Fraction: "+destTk.getContentTypeCode()+" = "+fString);
				Double f = Double.valueOf( fString );
				delta = Transfer.FAST * f / 100D;
			}
			break;
		case Tag.STATION :
		case Tag.DOCK :
		case Tag.SHIP :
			Tank dstTk = tks.getTank(x.getDestinationId());
			if( 0 == dstTk.getId() ) {
				delta = 0D;
			} else if ( Tag.TANK.equals(dest.getTagTypeCode())) {
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
	 * correct the level for the tank based on the change in volume; If it's 
	 * not a tank, no change is necessary
	 * <br>
	 * <br>Notes: This doesn't currently correct for temperature differences
	 * <br>IF the source is a tank and is to be updated
	 * <br>.. get the current level
	 * <br>.. compute the current volume
	 * <br>.. subtract out the change (don't let it go below zero)
	 * <br>.. compute the new level
	 * <br>.. update the level tag
	 * <br>END IF
	 * 	
	 * @param srcId tag ID for transfer source
	 * @param delta volume change to source
	 * @param sec current second for scan
	 * @param cst current scan time
	 * @return levelID updated
	 */
	private Long decrementSource( Long srcId, Double delta, Integer sec, Instant cst ) {
		Long levelID = null;
		if( delta > 0D ) { 
			Tag t = tgs.getTag(srcId);
			if( Tag.TANK.equals(t.getTagTypeCode()) ) {
				Tank tk = tks.getTank(srcId);
				AnalogInput aiLvl = ais.getAnalogInput(tk.getLevelId());
				Address aLvl = adrs.getAddress(tk.getLevelId()); 
				log.debug("decrementSource: "+srcId+" ("+aLvl.getId()+"), sec: "+sec
						 +", interval: "+aLvl.getInterval()+", offset: "+aLvl.getOffset()
				         +" sec % interval: "+sec%aLvl.getInterval());
				if( sec % aLvl.getInterval() == aLvl.getOffset() * 10 ) {
					levelID = aLvl.getId();
					log.debug("decrementSource: "+srcId+" ("+aLvl.getId()+") by "+delta);
					
					Double volume = tk.computeVolume( aiLvl.getScanValue() );
					Double volume2 = (volume-delta>0)?(volume-delta):0D;
					Double lvl = tk.computeLevel( volume2 );
					log.debug("decrementSource ("+aLvl.getId()+"): delta="+delta
							 +", currentLvl="+aiLvl.getScanValue()+
							  ", currentVol="+volume+", newLvl="+lvl+", newVol="+volume2);
					RawData rd = new RawData();
					rd.setId(tk.getLevelId());
					rd.setFloatValue(lvl);
					rd.setScanTime(cst);
					log.debug("decrementSource: update raw data: "+rd.toString());
					rds.updateRawData(rd);
				}
			}
		}
		return levelID;
	}

	/**
	 * Correct the level for the tank based on the change in volume; 
	 * If it's not a tank, no change is necessary
	 * <br>
	 * <br>Notes: This doesn't currently correct for temperature differences
	 * <br>IF the source is a tank and is to be updated (correct offset in scan interval)
	 * <br>.. get the current level
	 * <br>.. compute the current volume
	 * <br>.. add in the change 
	 * <br>.. compute the new level (don't let it go above the max level)
	 * <br>.. update the level tag
	 * <br>END IF
	 * <br>
	 * @param destId	ID of transfer destination
	 * @param delta	volume change
	 * @param sec current second for scan
	 * @param cst   curent scan time
	 * @return ID of level updated
	 */
	private Long incrementDestination( Long destId, Double delta, Integer sec, Instant cst ) {
		Long levelID = null;
		if( delta > 0D ) {
			Tag t = tgs.getTag(destId);
			if( Tag.TANK.equals(t.getTagTypeCode()) ) {
				Tank tk = tks.getTank(destId);
				AnalogInput aiLvl = ais.getAnalogInput(tk.getLevelId());
				Address aLvl = adrs.getAddress(tk.getLevelId()); 
				if( sec % aLvl.getInterval() == aLvl.getOffset() * 10 ) {
					levelID = aLvl.getId();
					log.debug("incrementDestination: "+destId+" ("+aLvl.getId()+") by "+delta);

					Double volume = tk.computeVolume( aiLvl.getScanValue());
					Double volume2 = volume + delta;
					Double lvl = tk.computeLevel( volume2 );
					lvl = (lvl>aiLvl.getMaxValue())?aiLvl.getMaxValue():lvl;
					log.debug("incrementDestination: "+destId+" ("+aLvl.getId()+"), delta="+delta
						     +", currentLvl="+aiLvl.getScanValue()+
							  ", currentVol="+volume+", newLvl="+lvl+", newVol="+volume2);
					RawData rd = new RawData();
					rd.setId(tk.getLevelId());
					rd.setFloatValue(lvl);
					rd.setScanTime(cst);
					log.debug("incrementDestination: update raw data: "+rd.toString());
					rds.updateRawData(rd);
				}
			}
		}
		return levelID;
	}

}
