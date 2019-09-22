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
import java.io.FileReader;
import java.io.PrintWriter;
import java.io.StringWriter;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
//import java.util.Date;
import java.util.HashMap;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import com.opencsv.CSVParser;

/**
 * Class: WsCSV
 * Description: provides access to the current (last) values of a weather station
 * 				output in a CSV file.  The "csvConditionNames" provide the offsets
 * 				into the parameters on the line.
 *
 * {@code
 * 		time	- 0
 * 		temperature	- 1
 * 		barometric pressure	- 2
 * 		wind speed - 3
 * 		wind direction - 4
 * 		precipitation - 5
 * }
 *
 * @author Allan
 *
 */
public class WsCSV extends WeatherStation {

	private Logger log = LogManager.getLogger( this.getClass() );
	//                                               time, temperature, barometricPressure
	//                                             , windSpeed, windDirection, precipitationLastHour
	private static String[] csvConditionNames= { "0", "1", "2", "3", "4", "5"};
	private boolean skipFirst = false;
	private DateTimeFormatter ldtf = DateTimeFormatter.ofPattern("yyyy-MM-dd H:mm:ss");

	public WsCSV() {  }

	public WsCSV( String l ) {
		super("CSV", l );
		setDtf(ldtf);
		setWsConditionNames(csvConditionNames);
	}

	public WsCSV( String t, String l ) {
		super( t, l );
		setDtf(ldtf);
	}

	/**
	 * get skip first line state (T === skip first line)
	 * 
	 * @return boolean specifying whether or not to skip the first line of the CSV file
	 */
	public boolean isSkipFirst() {
		return skipFirst;
	}

	/**
	 * set skip first line state
	 * @param skipFirst (boolean) T === skip first line
	 */
	public void setSkipFirst(boolean skipFirst) {
		this.skipFirst = skipFirst;
	}

	/**
	 * returns a HashMap of the parameters and their values
	 * Notes: Skips the first line dependent on "skipFirst" value
	 * 		  retrieves the values from the last line of the file
	 * @return  HashMap with current values of weather parameters
	 */
	public HashMap<String,Double> getCurrentConditions( ) {
		log.debug("WeatherURL: " + loc);
		HashMap<String, Double> cc = new HashMap<String,Double>();

		try {
			BufferedReader is = new BufferedReader( new FileReader(loc) );
			CSVParser p = new CSVParser();
			String ln = null;
			int lineCount = 0;
			while( (ln = is.readLine()) != null ) {
				String[] f = p.parseLine( ln );
				log.trace("Line: "+ln);
				if( !skipFirst || (lineCount>0)) {
					for( int i=0; i<wsConditionNames.length; i++) {
						Integer v = newInt(wsConditionNames[i]);
						log.trace(v+"th parameter");
						if( 0 <= v ) {
							log.debug("Value: "+f[v]);
							if( ! "time".equals(conditionNames[i]) ) {
								Double x = newDouble( f[v] );
								cc.put(conditionNames[i], Math.round(100D*x)/100D);
							} else {
								String tz = java.util.TimeZone.getDefault().getID();
								log.debug("TimeZone: "+tz);
								LocalDateTime ld = LocalDateTime.parse(f[v], dtf );
								ZonedDateTime d = ZonedDateTime.of(ld, ZoneId.of(tz));
								Instant id = d.toInstant();

								cc.put(conditionNames[i], new Double(id.getEpochSecond()) );
							}
						}
					}
				}
				lineCount++;
			}
			is.close();

		} catch( Exception e) {
			StringWriter sw = new StringWriter();
			e.printStackTrace(new PrintWriter(sw));
			String eas = sw.toString();
			log.error(eas);
		}
		return cc;
	}

	/**
	 * cover routine to parse the index for a parameter
	 * which creates a new integer and catches and logs any exception
	 *
	 * @param s - integer string to parse
	 * @return parsed integer value 
	 */
	protected Integer newInt( String s ) {
		Integer ni = -1;
		try {
			ni = new Integer(s);
		} catch( Exception e ) {
			StringWriter sw = new StringWriter();
			e.printStackTrace(new PrintWriter(sw));
			String eas = sw.toString();
			log.error(eas);
		}
		return ni;
	}

	/**
	 * cover routine to parse the string value from the CSV file
	 * and return a Double value, catching and logging any exception
	 * 
	 * @param s - double string to parse
	 * @return parsed double value
	 */
	protected Double newDouble( String s ) {
		Double d = -1D;
		try {
			d = new Double(s);
		} catch( Exception e ) {
			StringWriter sw = new StringWriter();
			e.printStackTrace(new PrintWriter(sw));
			String eas = sw.toString();
			log.error(eas);
		}
		return d;
	}

}
