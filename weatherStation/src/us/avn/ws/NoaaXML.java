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
package us.avn.ws;

import java.io.BufferedReader;
import java.io.ByteArrayInputStream;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.io.StringReader;
import java.io.StringWriter;
import java.text.SimpleDateFormat;
import java.time.Instant;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.HashMap;

import javax.json.Json;
import javax.json.stream.JsonParser;
import javax.json.stream.JsonParser.Event;
import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;

import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.protocol.HTTP;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.xml.sax.InputSource;

/**
 * Module: WeatherStation
 * Package: us.avn.ws
 * 
 * Class: NoaaXML 
 * 
 * The NoaaXML class represents the functions of a WeatherStation, particularly
 * the retrieval of the data from the NOAA site for identifier XXXX
 * 
 * 	http://w1.weather.gov/xml/current_obs/XXXX.xml"
 * 
 * It returns the values for the fields temp_c, pressure_in, wind_mpg and wind_degrees
 * for the WeatherStation fields WS_TEMPERATURE, WS_PRESSURE, WS_WIND_SPEED, and 
 * WS_WIND_DIRECTION.  WS_LAST_HOUR_PRECIP is not implemented.
 */
public class NoaaXML extends WeatherStation {

    private Logger log = LogManager.getLogger( this.getClass() );
    private static String[] xmlConditionNames= {"observation_time_rfc822","temp_c","pressure_in","wind_mph","wind_degrees"};
    

	public NoaaXML() {
		super();
		weatherUrl = "http://w1.weather.gov/xml/current_obs/XXXX.xml";
		setWsConditionNames(xmlConditionNames);
	}
	
	public NoaaXML( String l ) {
		super("API", l);
		weatherUrl = "http://w1.weather.gov/xml/current_obs/XXXX.xml";
		setWsConditionNames(xmlConditionNames);
		wURL = weatherUrl.replace("XXXX",l);
	}

	public HashMap<String,Double> getCurrentConditions( ) {
		log.debug("WeatherURL: " + wURL);
		HashMap<String, Double> cc = new HashMap<String,Double>();
		HttpClient client = HttpClientBuilder.create().build();
		HttpGet request = new HttpGet(wURL);

		try {
			// add request header
			request.addHeader("User-Agent", HTTP.USER_AGENT);
			request.addHeader("Accept", "application/ld+json");
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
/*	*/
			DocumentBuilder dBuilder = DocumentBuilderFactory.newInstance()
					.newDocumentBuilder();

			Document doc = dBuilder.parse(
					new InputSource(
							new ByteArrayInputStream(
									result.toString().getBytes("utf-8"))));

			log.debug("Root element :" + doc.getDocumentElement().getNodeName());
			Element e = doc.getDocumentElement();
			for( int i=0; i<wsConditionNames.length; i++ ) {
				String seVal = e.getElementsByTagName(
						wsConditionNames[i]).item(0).getTextContent();
				seVal = (seVal == null?"0":seVal);
				log.debug("Weather element: "+wsConditionNames[i]+" ("+conditionNames[i]+") = "+seVal);
				Double eVal = 0D;
				if( "observation_time_rfc822".equals(wsConditionNames[i]) ) {
					DateTimeFormatter sdf = DateTimeFormatter.ofPattern("EEE, d MMM yyyy HH:mm:ss Z");
					ZonedDateTime d = ZonedDateTime.parse(seVal, sdf );
					Instant id = d.toInstant();
					eVal = new Double(id.getEpochSecond());
				} else {
					eVal = new Double(seVal);
				}
				cc.put(conditionNames[i], eVal);
			}

		} catch( Exception e) {
			StringWriter sw = new StringWriter();
			e.printStackTrace(new PrintWriter(sw));
			String eas = sw.toString();
			log.error(eas);
		}
		return cc;
	}

}
