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
import java.util.Date;
import java.util.HashMap;

import javax.json.Json;
import javax.json.stream.JsonParser;
import javax.json.stream.JsonParser.Event;

import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.protocol.HTTP;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

public class NoaaApi extends WeatherStation {

	private Logger log = LogManager.getLogger( this.getClass() );
	private static String apiWeatherUrl = "https://api.weather.gov/stations/XXXX/observations/current";
    private static String[] apiConditionNames= {"timestamp","temperature","barometricPressure","windSpeed","windDirection","precipitationLastHour"};

	public NoaaApi() {
		super();
		weatherUrl = apiWeatherUrl;
		setWsConditionNames(apiConditionNames);
	}

	public NoaaApi( String l ) {
		super("API", l );
		weatherUrl = apiWeatherUrl;
		setWsConditionNames(apiConditionNames);		
		log.debug("Location: "+wURL+" - "+l);
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
			final JsonParser parser = Json.createParser(new StringReader(result.toString()));
			String key = null;
			String value = null;
			String saveKey = null;
			Double valnum = null;
			boolean saveValue = false;
			while (parser.hasNext()) {
				final Event event = parser.next();
				switch (event) {
				case START_OBJECT: 
					//		        	System.out.print("\t");
					break;
				case END_OBJECT:
					//		        	System.out.println(" ");
					break;
				case START_ARRAY:
					break;
				case END_ARRAY:
					//		        	System.out.println(" ");
					break;
				case KEY_NAME:
					key = parser.getString();
					switch ( key ) {
					case "windSpeed":
						saveKey = "windSpeed";
						break;
					case "barometricPressure":
						saveKey = "barometricPressure";
						break;
					case "temperature":
						saveKey = "temperature";
						break;
					case "windDirection":
						saveKey = "windDirection";
						break;
					case "precipitationLastHour":
						saveKey = "precipitationLastHour";
						break;
					case "timestamp":
						saveKey = "time";
						break;
					case "value":
						if( null != saveKey ) {
							saveValue = true;
						}
					}
					//		            System.out.print(key);
					break;
				case VALUE_STRING:
					value = parser.getString();
					if( "time".equals(saveKey)) {
						SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd'T'hh:mm:ssXXX");
						Date d = sdf.parse(parser.getString());
						valnum = new Double(d.getTime());
						cc.put(saveKey, valnum);
						saveKey = null;
						saveValue = false;
					}
					//		            System.out.println("\t"+value);
					break;
				case VALUE_NUMBER:
					valnum = parser.getBigDecimal().doubleValue();
					if( saveValue ) {
						cc.put(saveKey, valnum);
						saveKey = null;
						saveValue = false;
					}
					//		        	System.out.println("\t"+valnum);
					break;
				case VALUE_NULL:
					valnum = null;
					if( saveValue ) {
						cc.put(saveKey, valnum);
						saveKey = null;
						saveValue = false;
					}
					//		        	System.out.println("\t"+valnum);
					break;
				}
			}
			parser.close();
			/* */

		} catch( Exception e) {
			StringWriter sw = new StringWriter();
			e.printStackTrace(new PrintWriter(sw));
			String eas = sw.toString();
			log.error(eas);
		}
		return cc;
	}

}
