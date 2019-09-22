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


import java.time.Instant;
import java.util.Calendar;
import java.util.Collection;
import java.util.HashMap;
import java.util.Iterator;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import us.avn.oms.domain.AnalogInput;
import us.avn.oms.domain.Config;
import us.avn.oms.domain.Tag;
import us.avn.oms.domain.Tank;
import us.avn.oms.domain.Transfer;
import us.avn.oms.domain.Watchdog;
import us.avn.oms.domain.Xfer;
import us.avn.oms.service.AnalogInputService;
import us.avn.oms.service.ConfigService;
import us.avn.oms.service.TagService;
import us.avn.oms.service.TankService;
import us.avn.oms.service.TransferService;
import us.avn.oms.service.WatchdogService;
import us.avn.oms.service.XferService;
import us.avn.ws.WeatherStation;
import us.avn.ws.WeatherStationFactory;

public class AIDataSimulator {
	
    /* Get actual class name to be printed on */
    private static Logger log = LogManager.getLogger("us.avn.oms.sim.AIDataSimulator");

//    private static String[] conditionNames= {"temperature","barometricPressure","windSpeed","windDirection","precipitationLastHour"};
    private static HashMap<String,String> configuration;
    private static Double AMBIENT_TEMPERATURE = 23D;
    private static WeatherStationFactory wsf = new WeatherStationFactory();
        
    private static AnalogInputService ais;
    private static ConfigService cs;
    private static TagService tgs;
    private static TankService tks;
    private static TransferService tfs;
    private static WatchdogService wds;
    private static XferService xs;
    
    public AIDataSimulator() { }
    
    public AIDataSimulator( AnalogInputService ais, ConfigService cs
                          , TagService tgs, TankService tks, TransferService tfs
                          , WatchdogService wds, XferService xs ) {
    	AIDataSimulator.ais = ais;
    	AIDataSimulator.cs  = cs;
    	AIDataSimulator.tgs = tgs;
    	AIDataSimulator.tks = tks;
    	AIDataSimulator.tfs = tfs;
    	AIDataSimulator.wds = wds;
    	AIDataSimulator.xs  = xs;
    }
     
	public static void execute( ) {
		log.debug("Start AI processing");
		Calendar cal = Calendar.getInstance();

		wds.updateWatchdog(Watchdog.DCAI);
		
		configuration = cs.getAllConfigItems();
		
		HashMap<String,Double> cc = new HashMap<String,Double>();
//			get the current conditions
			String wt = (String)configuration.get(Config.WEATHER_TYPE);
			String wl = (String)configuration.get(Config.WEATHER_LOCATION);
			Long wi = 60L;
			try {
				wi = new Long((String)configuration.get(Config.WEATHER_INTERVAL));
			} catch( Exception e ) {
				wi = 60L;
			}
			Long wd = 16L;
			try {
				wd = new Long((String)configuration.get(Config.WEATHER_DELAY));
			} catch( Exception e ) {
				wd = 16L;
			}
			boolean updateCurrentConditions = cal.get(Calendar.MINUTE) % wi == wd;
			log.debug("Delay: "+wd+", interval: "+wi+", update? "+(updateCurrentConditions?"yes":"no"));
			if( updateCurrentConditions ) {
				WeatherStation ws = wsf.getWeatherStation(wt, wl);
				cc = ws.getCurrentConditions();
			}

		Instant currentScanTime = null;
		if(null != cc.get(WeatherStation.WS_TIME)) {
			currentScanTime = Instant.ofEpochSecond(cc.get(WeatherStation.WS_TIME).longValue());
			log.debug("WeatherStation time: "+currentScanTime.toString());
		}
		Double currentTemp = (Double)cc.get(WeatherStation.WS_TEMPERATURE); 
		Double currentPressure = (Double)cc.get(WeatherStation.WS_PRESSURE);
		Double currentWindSpeed = (Double)cc.get(WeatherStation.WS_WIND_SPEED);
		Double currentWindDir = (Double)cc.get(WeatherStation.WS_WIND_DIRECTION);
		Double currentPrecip = (Double)cc.get(WeatherStation.WS_LAST_HOUR_PRECIP);
		currentPrecip = (currentPrecip==null)?0D:currentPrecip;
		
		String currentTempTag = (String)configuration.get(Config.CURRENT_TEMP);
		String currentPressTag = (String)configuration.get(Config.CURRENT_PRESSURE);
		String currentWindSpeedTag = (String)configuration.get(Config.CURRENT_WIND_SPEED);
		String currentWindDirTag = (String)configuration.get(Config.CURRENT_WIND_DIR);
		String currentPrecipTag = (String)configuration.get(Config.LAST_HOUR_PRECIP);
		
		HashMap<String,Double> currentTags = new HashMap<String,Double>();
		currentTags.put(currentTempTag,      currentTemp);
		currentTags.put(currentPressTag,     currentPressure);
		currentTags.put(currentWindSpeedTag, currentWindSpeed);
		currentTags.put(currentWindDirTag,   currentWindDir);
		currentTags.put(currentPrecipTag,    currentPrecip);
		
		
		Collection<AnalogInput> cai = ais.getAllActiveAItags();
		Iterator<AnalogInput> iai = cai.iterator();
		while( iai.hasNext() ) {
			AnalogInput ai = iai.next();
			Xfer x = new Xfer();
			x.setId(ai.getTagId());
			String aiTypeCode = ai.getAnalogTypeCode();
			String aiName = ai.getTag().getName();
//     	    fake the collected data
			if( updateCurrentConditions) {
				log.debug("Processing AI tag "+aiName + "/" + ai.getTagId());
				if( currentTags.containsKey(aiName) ) {
					Double currentValue = currentTags.get(aiName); 
					log.debug(aiName+"-"+currentValue);
					if( null != currentValue ) {
						x.setFloatValue(currentValue);
						x.setScanTime(currentScanTime);
						xs.updateXfer(x);
					}
				} else if( "T".equals(ai.getAnalogTypeCode())) {
					Double nv = (ai.getScanValue()!=null)?ai.getScanValue():AMBIENT_TEMPERATURE;
					Double ct = (currentTemp!=null?currentTemp:nv);
					log.debug("Recorded scan value (id="+x.getId()+"): "+nv+", from web: "+ct);
					nv += 0.002 * (ct - nv);
					x.setFloatValue(nv);
					x.setScanTime(currentScanTime);
//					Updated simulated data
					xs.updateXfer(x);
				}
			} else {
//				don't update Calculated or Manual analog types or the 
				if( ! "C".equals(aiTypeCode) && ! "M".equals(aiTypeCode) ) {
					if( ! currentTags.containsKey(aiName) ) {
//						set the value to its current value
//						(this will be overwritten by transfer levels)
						x.setFloatValue(ai.getScanValue());
						x.setScanTime(currentScanTime);
						xs.updateXfer(x);
					}
				}
			}
		}
//		check transfers	
		checkTransfers(ais, tks, tfs, xs);

		log.debug("End AI processing");

	}
	

	private static void checkTransfers( AnalogInputService ais, TankService tks
			                          , TransferService tfs, XferService xs) {
		Iterator<Transfer> ix = tfs.getActiveTransfers().iterator();
		while( ix.hasNext() ) {
			Transfer x = ix.next();
			Double delta = computeChange( x );
			log.debug("Transfer "+x.getName()+"/"+x.getId()+" - Change: "+delta);
			decrementSource( x.getSourceId(), delta );
			incrementDestination( x.getDestinationId(), delta );
			x.setActVolume(x.getActVolume()+delta);
			tfs.updateTransfer(x);
		}
	}


	/**
	 * Determine the change in volume! for a transfer
	 * {@code This is where the magic occurs!
	 *      * Transfers are only allowed between refinery units (RU),
	 *        tanks (TK), and docking stations (STN).
	 *      * Docking stations exist for Ships, Tank Trucks and Tank Cars
	 *      * If the docking station is a source, it MUST be crude and the 
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
	private static Double computeChange( Transfer x ) {
		Double delta;
		log.debug(x.toString());
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
						if ( Tag.STATION.equals(dest.getMisc())) {
							delta = Transfer.FAST;
						} else if ( Tag.TANK_CAR.equals(dest.getMisc())) {
							delta = Transfer.FAST;
						} else if ( Tag.TANK_TRUCK.equals(dest.getMisc())) {
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
	 * 		IF the source is a tank
	 * 		.. get the current level
	 * 		.. compute the current volume
	 * 		.. subtract out the change (don't let it go below zero)
	 * 		.. compute the new level
	 * 		.. update the level tag
	 * 		END IF
	 * 		
	 * @param srcId
	 * @param vol
	 */
	private static void decrementSource( Long srcId, Double vol ) {
		log.debug("Decrement source: "+srcId+" by "+vol);
		if( vol > 0D ) { 
			Tag t = tgs.getTag(srcId);
			if( Tag.TANK.equals(t.getTagTypeCode()) ) {
				Tank tk = tks.getTank(srcId);
				AnalogInput l = ais.getAnalogInput(tk.getLevelId());
				Double volume = tk.computeVolume( l.getScanValue() );
				volume = (volume-vol>0)?(volume-vol):0D;
				Double lvl = tk.computeLevel( volume );
				Xfer x = new Xfer();
				x.setId(tk.getLevelId());
				x.setFloatValue(lvl);
				log.debug("Update xfer (decrement): "+x.toString());
				xs.updateXfer(x);
			}
		}
	}
	
	/**
	 * Method: incrementDestination
	 * Description: correct the level for the tank based on the
	 * 				change in volume; If it's not a tank, no change
	 * 				is necessary
	 * Notes: This doesn't currently correct for temperature differences
	 * 		IF the source is a tank
	 * 		.. get the current level
	 * 		.. compute the current volume
	 * 		.. subtract out the change (don't let it go below zero)
	 * 		.. compute the new level
	 * 		.. update the level tag
	 * 		END IF
	 * 		
	 * 
	 * @param destId	ID of transfer destination
	 * @param vol	volume change
	 * @param tks	tank service
	 * @param ais	analog input service
	 */
	private static void incrementDestination( Long destId, Double vol ) {
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
				Xfer x = new Xfer();
				x.setId(tk.getLevelId());
				x.setFloatValue(lvl);
				log.debug("Update xfer (increment): "+x.toString());
				xs.updateXfer(x);
			}
		}

	}
	

}
