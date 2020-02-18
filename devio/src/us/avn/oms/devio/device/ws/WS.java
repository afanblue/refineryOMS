package us.avn.oms.devio.device.ws;

import java.time.Instant;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.Calendar;
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
import us.avn.oms.domain.Tag;
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

import us.avn.ws.WeatherStation;
import us.avn.ws.WeatherStationFactory;

/**
 * WS (WeatherStation) IODevice implements the retrieval and setting of
 * the field variables associated with this device
 * 
 * For the WS device, the fields in the device table should be
 *   type: WS
 *   model: ACU (Acurite)
 *          CSV (generic Weather station w/output to a CSV file)
 *          API (NOAA API)
 *          XML (NOAA XMI)
 *   param1: ACU: location of CSV file output by ACURITE PC connect
 *           CSV: location of CSV file output by weather station software
 *           API: XXXX location: find in https://forecast.weather.gov/stations.php?foo=0
 *           XML: XXXX location: find in https://forecast.weather.gov/stations.php?foo=0
 *           
 * @author Allan
 *
 */
public class WS extends IODevice {

    private Logger log = LogManager.getLogger(this.getClass());

    private static HashMap<String,String> configuration;
    private static Double AMBIENT_TEMPERATURE = 23D;
    private static WeatherStationFactory wsf = new WeatherStationFactory();

	public WS() {
		// TODO Auto-generated constructor stub
	}

	/**
	 * Create the WS (Weather Station) I/O device
	 * 
	 * @param d - device configuration record
	 * @param adrs - address service
	 * @param ais - analog input service
	 * @param aos - analog output service 
	 * @param cs - configuration service
	 * @param cbs - control block service
	 * @param dis - digital input service
	 * @param dos - digital output service
	 * @param ords - order service 
	 * @param rds - raw data service
	 * @param tgs - tag service
	 * @param tks - tank service
	 * @param tfs - transfer service
	 * 
	 * d, adrs, ais, aos, cs, cbs, dis, dos, tgs, tks, tfs, xs 
	 */
	public WS(Device d, AddressService adrs
			, AnalogInputService ais, AnalogOutputService aos
			, ConfigService cs, ControlBlockService cbs
			, DigitalInputService dis, DigitalOutputService dos
			, OrderService ords, RawDataService rds, TagService tgs
			, TankService tks, TransferService tfs ) {
		super(d, adrs, ais, aos, cs, cbs, dis, dos, ords, rds, tgs, tks, tfs);
		// TODO Auto-generated constructor stub
	}

	@Override
	public void getAnalogInputs( Integer sec )
	{
		Calendar cal = Calendar.getInstance();
		
		configuration = cs.getAllConfigItems();
		
		HashMap<String,Double> cc = new HashMap<String,Double>();
		//			get the current conditions
		String wt = device.getModel();
		String wl = device.getParam1();
		Long wi = device.getCycleTime();
		try {
			wi = (wi==null)?new Long((String)configuration.get(Config.WEATHER_INTERVAL)):wi;
		} catch( Exception e ) {
			wi = 60L;
		}
		Long wd = device.getOffset();
		try {
			wd = (wd==null)?new Long((String)configuration.get(Config.WEATHER_DELAY)):wd;
		} catch( Exception e ) {
			wd = 16L;
		}
		boolean updateCurrentConditions = cal.get(Calendar.MINUTE) % wi == wd;
		log.debug("Delay: "+wd+", interval: "+wi+", update? "+(updateCurrentConditions?"yes":"no"));
		if( updateCurrentConditions ) {
			WeatherStation ws = wsf.getWeatherStation(wt, wl);
			cc = ws.getCurrentConditions();
		}

		Instant cst = Instant.now();
		ZonedDateTime currentScanTime = null;
		if(null != cc.get(WeatherStation.WS_TIME)) {
			cst = Instant.ofEpochSecond(cc.get(WeatherStation.WS_TIME).longValue());
			currentScanTime = ZonedDateTime.ofInstant(cst, ZoneId.of("Z"));
			log.debug("WS time: "+cst.toString());
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
		
		
		Collection<Address> cadr = adrs.getActiveAddressesForDeviceByType(device.getId(), Tag.ANALOG_INPUT);
		Iterator<Address> iadr = cadr.iterator();
		while( iadr.hasNext() ) {
			Address addr = iadr.next();
			log.debug("Scan "+addr);
			AnalogInput ai = ais.getAnalogInput(addr.getId() );
			RawData rd = new RawData();
			rd.setId(ai.getTagId());
			String aiTypeCode = ai.getAnalogTypeCode();
			String aiName = ai.getTag().getName();
//     	    fake the collected data
			if( updateCurrentConditions) {
				log.debug("Processing WS AI tag "+aiName + "/" + ai.getTagId());
				if( currentTags.containsKey(aiName) ) {
					Double currentValue = currentTags.get(aiName); 
					log.debug(aiName+"-"+currentValue);
					if( null != currentValue ) {
						rd.setUpdated(1);
						rd.setFloatValue(currentValue);
						rd.setScanTime(cst);
						log.debug(rd.toString());
						rds.updateRawData(rd);
					}
				}
			}
		}
	}

	@Override
	public void setAnalogOutputs( Integer sec ) {
		// no analog outputs
	}

	@Override
	public void getDigitalInputs( Integer sec ) {
		// no digital inputs
	}

	@Override
	public void setDigitalOutputs( Integer sec ) {
		// no digital outputs.

	}

}
