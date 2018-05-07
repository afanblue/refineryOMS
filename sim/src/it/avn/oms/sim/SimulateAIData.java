package it.avn.oms.sim;

import java.io.BufferedReader;
import java.io.ByteArrayInputStream;
import java.io.InputStreamReader;
import java.util.Calendar;
import java.util.Collection;
import java.util.HashMap;
import java.util.Iterator;
import java.util.TimerTask;
import java.util.Vector;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;

import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.protocol.HTTP;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.NodeList;
import org.xml.sax.InputSource;

import it.avn.oms.domain.Alarm;
import it.avn.oms.domain.AlarmType;
import it.avn.oms.domain.AnalogInput;
import it.avn.oms.domain.Config;
import it.avn.oms.domain.Tag;
import it.avn.oms.domain.Tank;
import it.avn.oms.domain.Transfer;
import it.avn.oms.domain.Volume;
import it.avn.oms.domain.Watchdog;
import it.avn.oms.domain.Xfer;
import it.avn.oms.service.AlarmService;
import it.avn.oms.service.AnalogInputService;
import it.avn.oms.service.ConfigService;
import it.avn.oms.service.TagService;
import it.avn.oms.service.TankService;
import it.avn.oms.service.TransferService;
import it.avn.oms.service.WatchdogService;
import it.avn.oms.service.XferService;

public class SimulateAIData extends TimerTask {
	
    /* Get actual class name to be printed on */
    private Logger log = LogManager.getLogger(this.getClass());

    private ApplicationContext context = null;
    private AnalogInputService ais = null;
    private ConfigService cs = null;
    private TagService tgs = null;
    private TankService tks = null;
    private TransferService tfs = null;
    private WatchdogService wds = null;
    private XferService xs = null;
    private String weatherUrl = "http://w1.weather.gov/xml/current_obs/";
    private HashMap<String,String> configuration;
    private static String[] conditionNames= {"temp_f","pressure_in","wind_mph","wind_degrees"};
     
	public void run( ) {
		log.debug("Start "
				+ "AI processing");
		Calendar cal = Calendar.getInstance();
/*  */
		if( context == null) { context = new ClassPathXmlApplicationContext("app-context.xml"); }
		if( ais == null ) { ais = (AnalogInputService) context.getBean("analogInputService"); }
		if( cs  == null ) { cs = (ConfigService) context.getBean("configService"); }
		if( tgs == null ) { tgs = (TagService) context.getBean("tagService"); }
		if( tks == null ) { tks = (TankService) context.getBean("tankService"); }
		if( tfs == null ) { tfs = (TransferService) context.getBean("transferService"); }
		if( xs  == null ) { xs = (XferService) context.getBean("xferService"); }
		if( wds == null ) { wds = (WatchdogService) context.getBean("watchdogService"); }
		
		wds.updateWatchdog(Watchdog.DCAI);
		
		configuration = getSystemConfiguration(cs);

		boolean updateCurrentConditions = cal.get(Calendar.MINUTE) == 59;
		HashMap<String,Double> c = new HashMap<String,Double>();
		if( updateCurrentConditions ) {
//			get the current conditions
			String wl = (String)configuration.get(Config.WEATHER_LOCATION);
			String wUrl = weatherUrl + wl + ".xml";
			c = getCurrentConditions(wUrl);
		}
		Collection<AnalogInput> cai = ais.getAllActiveAItags();
		Iterator<AnalogInput> iai = cai.iterator();
		while( iai.hasNext() ) {
			AnalogInput ai = iai.next();
			Xfer x = new Xfer();
			x.setId(ai.getTagId());
//     	    fake the collected data
			if( updateCurrentConditions) {
				log.debug("Processing AI tag "+ai.getTag().getName() + "/" + ai.getTagId());
				if( ai.getTag().getName().equals(((String)configuration.get(Config.CURRENT_TEMP)) )) {
					log.debug(configuration.get(Config.CURRENT_TEMP)+"="
				              +(Double)c.get(conditionNames[0]));
					x.setFloatValue((Double)c.get(conditionNames[0]));
//					Update simulated data
					xs.updateXfer(x);
				} else if( ai.getTag().getName().equals(((String)configuration.get(Config.CURRENT_PRESSURE)) )) {
					log.debug(configuration.get(Config.CURRENT_PRESSURE)+"="
				              +(Double)c.get(conditionNames[1]));
					x.setFloatValue((Double)c.get(conditionNames[1]));
//					Update simulated data
					xs.updateXfer(x);
				} else if( ai.getTag().getName().equals(((String)configuration.get(Config.CURRENT_WIND_SPEED)) )) {
					log.debug(configuration.get(Config.CURRENT_WIND_SPEED)+"="
				              +(Double)c.get(conditionNames[2]));
					x.setFloatValue((Double)c.get(conditionNames[2]));					
//					Update simulated data
					xs.updateXfer(x);
				} else if( ai.getTag().getName().equals(((String)configuration.get(Config.CURRENT_WIND_DIR)) )) {
					log.debug(configuration.get(Config.CURRENT_WIND_DIR)+"="
				              +(Double)c.get(conditionNames[3]));
					x.setFloatValue((Double)c.get(conditionNames[3]));
//					Update simulated data
					xs.updateXfer(x);
				} else if( "T".equals(ai.getTypeCode())) {
					Double nv = (ai.getScanValue()!=null)?ai.getScanValue():72.0;
					Double ct = (c.get(conditionNames[0])!=null?c.get(conditionNames[0]):nv);
					log.debug("Recorded scan value (id="+x.getId()+"): "+nv+", from web: "+ct);
					nv += 0.002 * (ct - nv);
					x.setFloatValue(nv);
//					Updated simulated data
					xs.updateXfer(x);
				}
			} else {
//				set the value to its current value
//				(this will be overwritten by transfer levels)
				x.setFloatValue(ai.getScanValue());
				xs.updateXfer(x);
			}
		}
//		check transfers	
		checkTransfers();

		log.debug("End AI processing");

	}
	

	private HashMap<String,String> getSystemConfiguration( ConfigService cs ) {
		HashMap<String,String> cfg = new HashMap<String,String>();
		Iterator<Config> iat = cs.getAllConfigurationItems().iterator();
		while( iat.hasNext() ) {
			Config c = iat.next();
			cfg.put(c.getKey(), c.getValue());
		}
		return cfg;
	}
	
	private HashMap<String,Double> getCurrentConditions( String url ) {
		log.debug("WeatherURL: " + url);
		HashMap<String, Double> cc = new HashMap<String,Double>();
		HttpClient client = HttpClientBuilder.create().build();
		HttpGet request = new HttpGet(url);

		try {
			// add request header
			request.addHeader("User-Agent", HTTP.USER_AGENT);
			HttpResponse response = client.execute(request);
			log.debug("Response Code : "
					+ response.getStatusLine().getStatusCode());
			BufferedReader rd = new BufferedReader(
					new InputStreamReader(response.getEntity().getContent()));

			StringBuffer result = new StringBuffer();
			String line = "";
			while ((line = rd.readLine()) != null) {
				result.append(line);
			}
			log.debug("Weather XML: "+result);

			DocumentBuilder dBuilder = DocumentBuilderFactory.newInstance()
                    .newDocumentBuilder();

			Document doc = dBuilder.parse(
					new InputSource(
						new ByteArrayInputStream(
							result.toString().getBytes("utf-8"))));

			log.debug("Root element :" + doc.getDocumentElement().getNodeName());
			Element e = doc.getDocumentElement();
			for( int i=0; i<conditionNames.length; i++ ) {
				String seVal = e.getElementsByTagName(
						conditionNames[i]).item(0).getTextContent();
			    log.debug("Weather element: "+conditionNames[i]+" = "+seVal);
				Double eVal = new Double(seVal);
				cc.put(conditionNames[i], eVal);
			}
			
		} catch( Exception e) {
			log.error(e.getMessage());
		}
		return cc;
	}
	
	private void checkTransfers() {
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

	private Double FAST = 40D;
	private Double SLOW = 20D;

	/**
	 * Method: computeChange
	 * Description: determine the change in volume! for a transfer
	 * Notes: This is where the magic occurs!
	 *      * We assume that this is called once a minute and 
	 *        return that value
	 *      * FWIW, I don't know if these numbers are anywhere near
	 *              reasonable.
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
	 *      | ship -> crude tank          |     FAST bbl /min     |
	 *      +-----------------------------+-----------------------+
	 *      | refined tank -> tank truck  |     SLOW bbl /min     |
	 *      +-----------------------------+-----------------------+
	 *      | refined tank -> tank car    |     SLOW bbl /min     |
	 *      +-----------------------------+-----------------------+
	 *      | refined tank -> ship        |     FAST bbl / min    |
	 *      +-----------------------------+-----------------------+
	 *      | anything else               |     0 (no transfer)   |
	 *      +-----------------------------+-----------------------+
	 *      
	 * @param x
	 * @return
	 */
	private Double computeChange( Transfer x ) {
		Double delta;
		log.debug(x.toString());
		Tank src = tks.getBaseTank(x.getSourceId());
		Tank dest = tks.getBaseTank(x.getDestinationId());
		log.debug("Source: "+(src==null?"null":src.toString()));
		log.debug("Destination: "+(dest==null?"null":dest.toString()));
		switch ( src.getTag().getTagTypeCode() ) {
			case Tag.TANK :
				if( Tag.TANK.equals(dest.getTag().getTagTypeCode())) {
					if( src.getContentTypeCode().equals(dest.getContentTypeCode())) {
						if( Tank.CRUDE.equals(src.getContentTypeCode())) {
							delta = FAST;
						} else {
							delta = SLOW;
						}
					} else {
						delta = 0D;
					}
				} else if( Tag.REFINERY_UNIT.equals(dest.getTag().getTagTypeCode())) {
					delta = FAST;
				} else {
					if ( Tank.CRUDE.equals(src.getContentTypeCode()) ) {
						delta = 0D;
					} else {
						if ( Tag.SHIP.equals(dest.getTag().getTagTypeCode())) {
							delta = FAST;
						} else if ( Tag.TANK_CAR.equals(dest.getTag().getTagTypeCode())) {
							delta = SLOW;
						} else if ( Tag.TANK_TRUCK.equals(dest.getTag().getTagTypeCode())) {
							delta = SLOW;
						} else {
							delta = 0D;
						}
					}
				}
				break;
			case Tag.REFINERY_UNIT :
				String code = dest.getContentType().toUpperCase().concat("-PERCENT");
				String fString = (String)configuration.get(code);
				fString = (fString==null?"0":fString);
				log.debug("Fraction: "+dest.getContentTypeCode()+" = "+fString);
				Double f = new Double( fString );
				delta = FAST * f / 100D;
				break;
			case Tag.SHIP :
				if( Tag.TANK.equals(dest.getTag().getTagTypeCode())) {
					if( Tank.CRUDE.equals(dest.getContentTypeCode())) {
						delta = FAST;
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
	private void decrementSource( Long srcId, Double vol ) {
		log.debug("Decrement source: "+srcId+" by "+vol);
		if( vol > 0D ) { 
			Tank tk = tks.getBaseTank(srcId);
			if( Tag.TANK.equals(tk.getTag().getTagTypeCode()) ) {
				AnalogInput l = ais.getAnalogInput(tk.getLevelId());
				Double volume = computeVolume(tk.getId(), l.getScanValue());
				volume = (volume-vol>0)?(volume-vol):0D;
				Double lvl = computeLevel(tk.getId(), volume );
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
	private void incrementDestination( Long destId, Double vol ) {
		log.debug("Increment destination: "+destId+" by "+vol);
		if( vol > 0D ) {
			Tank tk = tks.getBaseTank(destId);
			if( Tag.TANK.equals(tk.getTag().getTagTypeCode()) ) {
				AnalogInput l = ais.getAnalogInput(tk.getLevelId());
				Double volume = computeVolume(tk.getId(), l.getScanValue());
				volume += vol;
				Double lvl = computeLevel(tk.getId(), volume );
				Xfer x = new Xfer();
				x.setId(tk.getLevelId());
				x.setFloatValue(lvl);
				log.debug("Update xfer (increment): "+x.toString());
				xs.updateXfer(x);
			}
		}

	}
	
	private Double computeLevel( Long tankId, Double vol ) {
		Double level = 0D;
		Volume vb = null;
		Volume ve = null;
		Collection<Volume> cv = tks.getLevelVolumesForTank(tankId);
		Integer cvSize = cv.size();
		Integer loopCount = 0;
		Iterator<Volume> iv = cv.iterator();
		while( iv.hasNext() ) {
			loopCount++;
			Volume v = iv.next();
			log.debug("Volume: "+vol+", volume: "+v.toString());
			if( (v.getVolume() < vol) && (loopCount < (cvSize-1)) ) {
				vb = v;
			}
			if( (v.getVolume() >= vol) || (loopCount == cvSize) ) {
				ve = v;
				break;
			}
		}
		log.debug("Vb: "+vb.toString()+", Ve: "+ve.toString());
		Double slope = (ve.getLevel() - vb.getLevel())
					 / (ve.getVolume() - vb.getVolume());
		level = vb.getLevel() + slope * (vol - vb.getVolume());
		return level;
	}

	private Double computeVolume( Long tankId, Double level ) {
		Double vol = 0D;
		Volume vb = null;
		Volume ve = null;
		Collection<Volume> cv = tks.getLevelVolumesForTank(tankId);
		Integer cvSize = cv.size();
		Integer loopCount = 0;
		Iterator<Volume> iv = cv.iterator();
		while( iv.hasNext() ) {
			loopCount++;
			Volume v = iv.next();
			log.debug("Level: "+level+", volume: "+v.toString());
			if( (v.getLevel() < level) && (loopCount < (cvSize-1)) ) {
				vb = v;
			}
			if( v.getLevel() >= level || (loopCount == cvSize) ) {
				if( loopCount == 1 ) {
					vb = v;
					ve = iv.next();
				} else {
					ve = v;
				}
				break;
			}
		}
		Double slope = (ve.getVolume() - vb.getVolume())
					 / (ve.getLevel() - vb.getLevel());
		vol = vb.getVolume() + slope * (level - vb.getLevel());
		return vol;
	}

}
