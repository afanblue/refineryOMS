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
import it.avn.oms.domain.Xfer;
import it.avn.oms.service.AlarmService;
import it.avn.oms.service.AnalogInputService;
import it.avn.oms.service.ConfigService;
import it.avn.oms.service.XferService;

public class TestSimulateAIData extends TimerTask {

    /* Get actual class name to be printed on */
    private Logger log = LogManager.getLogger(this.getClass());
    private AnalogInputService ais = null;
    private String weatherUrl = "http://w1.weather.gov/xml/current_obs/";
    private HashMap<String,Config> configuration;
    private static String[] conditionNames= {"temp_f","pressure_in","wind_mph","wind_degrees"};
     
	public static void main( String[] args) {
		System.out.println("Start TestSimulateAIData");
		TestSimulateAIData sad = new TestSimulateAIData();
		sad.run( );
	}

	public void run( ) {
		log.debug("Start AI processing");
/*  */
		ApplicationContext context = new ClassPathXmlApplicationContext("app-context.xml");
		AnalogInputService ais = (AnalogInputService) context.getBean("analogInputService");
		ConfigService cs = (ConfigService) context.getBean("configService");
		XferService xs = (XferService) context.getBean("xferService");
		
		configuration = getSystemConfiguration(cs);
		Calendar cal = Calendar.getInstance();
//		boolean updateCurrentConditions = true;
		HashMap<String,Double> c = new HashMap<String,Double>();
//		if( updateCurrentConditions ) {
//			get the current conditions
			Config wl = (Config)configuration.get(Config.WEATHER_LOCATION);
			String wUrl = weatherUrl + wl.getValue() + ".xml";
			log.debug("Weather uri: "+wUrl);
			c = getCurrentConditions(wUrl);
//		}
/*
		Collection<AnalogInput> cai = ais.getAllActiveAItags();
		Iterator<AnalogInput> iai = cai.iterator();
		while( iai.hasNext() ) {
			AnalogInput ai = iai.next();
			Xfer x = new Xfer();
			x.setId(ai.getTagId());
//     	    fake the collected data
			if( updateCurrentConditions) {
				log.debug("Processing AI tag "+ai.getName() + "/" + ai.getTagId());
				if( ai.getName().equals(configuration.get(Config.CURRENT_TEMP) )) {
					x.setFloatValue((Double)c.get(conditionNames[0]));
				} else if( ai.getName().equals(configuration.get(Config.CURRENT_PRESSURE))) {
					x.setFloatValue((Double)c.get(conditionNames[1]));
				} else if( ai.getName().equals(configuration.get(Config.CURRENT_WIND_SPEED))) {
					x.setFloatValue((Double)c.get(conditionNames[2]));					
				} else if( ai.getName().equals(configuration.get(Config.CURRENT_WIND_DIR))) {
					x.setFloatValue((Double)c.get(conditionNames[3]));
				} else if( "T".equals(ai.getTypeCode())) {
					Double nv = (ai.getScanValue()!=null)?ai.getScanValue():72.0;
					Double ct = (c.get(conditionNames[0])!=null?c.get(conditionNames[0]):nv);
					log.debug("Recorded scan value: "+nv+", from web: "+ct);
					if( ct > nv ) {
						nv = ct + 0.01 * (ct - nv);
					} else {
						nv = ct - 0.01 * (nv - ct);
					}
					x.setFloatValue(nv);
				}
//				Updated simulated data
				xs.updateXfer(x);
			} else {
//				check transfers				
			}
		}
*/
		log.debug("End AI processing");
	}
	

	private HashMap<String,Config> getSystemConfiguration( ConfigService cs ) {
		HashMap<String,Config> cfg = new HashMap<String,Config>();
		Iterator<Config> iat = cs.getAllConfigurationItems().iterator();
		while( iat.hasNext() ) {
			Config c = iat.next();
			cfg.put(c.getKey(), c);
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
 
			log.debug("Create new DocumentBuilder");
			DocumentBuilder dBuilder = DocumentBuilderFactory.newInstance()
                    .newDocumentBuilder();

			log.debug("Parse the document");
//			Document doc = dBuilder.parse(weatherUrl);
			Document doc = dBuilder.parse(
					new InputSource(new ByteArrayInputStream(result.toString().getBytes("utf-8"))));
			log.debug("Root element :" + doc.getDocumentElement().getNodeName());
			Element e = doc.getDocumentElement();
			for( int i=0; i<conditionNames.length; i++ ) {
				String seVal = e.getElementsByTagName(conditionNames[i]).item(0).getTextContent();
			    log.debug("Weather element: "+conditionNames[i]+" = "+seVal);
				Double eVal = new Double(seVal);
				cc.put(conditionNames[i], eVal);
			}
			
		} catch( Exception e) {
			log.error(e.getMessage());
		}
		return cc;
	}

}
