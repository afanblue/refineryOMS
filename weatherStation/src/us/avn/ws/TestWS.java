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

import java.time.Instant;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;


public class TestWS {

	DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

	public TestWS() {
		
	}

	public void execute( String[] args ) {
		if( 2 == args.length ) {
			String type = args[0];
			String loc = args[1];
			WeatherStationFactory wsf = new WeatherStationFactory();
			WeatherStation ws = wsf.getWeatherStation(type, loc );
			HashMap<String,Double> cc = ws.getCurrentConditions();
			for (String name: cc.keySet()){
	            String key =name.toString();
	            String value = cc.get(name)!=null?cc.get(name).toString():"(null)";
	            if( "time".equals(key) ) {
	            	Instant d = Instant.ofEpochSecond(cc.get(name).longValue());
	            	value = d.toString();
	            } 
	            System.out.println(key + " " + value);
			}
		} else {
			StringBuffer sb = new StringBuffer(2000);
			sb.append("Usage: TestWS type location\n");
			sb.append("\twhere type is the type of weather station (e.g., API, XML, CSV)\n");
			sb.append("\t      location is NOAA location code (API or XML)\n");
			sb.append("\t                  or the location of the CSV file\n");
			System.out.println(sb.toString());
		}
	}
	
	private Long longArg( String s ) {
		Long l = 0L;
		try {
			l = Long.valueOf(s);
		} catch( Exception e ) {
			e.printStackTrace();
		}
		return l;
	}
	
	public static void main(String[] args) {
		TestWS tws = new TestWS();
		tws.execute(args);
	}

}
