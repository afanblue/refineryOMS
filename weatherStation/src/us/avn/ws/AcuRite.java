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

import java.text.SimpleDateFormat;
import java.time.format.DateTimeFormatter;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import us.avn.ws.WsCSV;

/**
 * Class: AcuRite
 * Description: Specific type of CSV WeatherStation.  Provides access to the 
 * 				current (last) values of a weather station
 * 				output in a CSV file.  The "csvConditionNames" provide the offsets
 * 				into the parameters on the line.
 *
 * {@code
 * 		time	- 0 (local time!)
 * 		temperature	- 1
 * 		barometric pressure	- 6
 * 		wind speed - 8
 * 		wind direction - 11
 * 		precipitation - 7
 * }
 *
 * Note: the precipitation value for the AcuRite weather station increases
 * 		 continuously through a "rain event".  Once it has stopped for some
 * 		 period of time, it resets to zero.
 * 
 * @author Allan
 *
 */
public class AcuRite extends WsCSV {

	private Logger log = LogManager.getLogger( this.getClass() );
//  Condition names specify offsets for time, outdoor temperature, 
//  barometricPressure, windSpeed, windDirection, precipitationLastHour
    private static String[] csvConditionNames= { "0", "1", "6", "8", "11", "7"};
    private static DateTimeFormatter dtf = DateTimeFormatter.ofPattern("M/d/yyyy h:m:ss a");

    /**
     * Create a WeatherStation object as an ACU, w/a location of 1
     *              @see WeatherStation#WeatherStation
     *              A "location" of "1" will likely not return any useful values and
     *              will need to be reset to a useful file location.
     */
	public AcuRite() {
		super( "ACU", "1" );
		setWsConditionNames(csvConditionNames);
		setDtf(dtf);
		setSkipFirst(true);
	}

	/**
	 * Create a WeatherStation objects as an ACU, w/the provided location
	 *
	 * @param l (String) location of CSV file containing weather values
	 */
	public AcuRite( String l ) {
		super( "ACU", l );
		setWsConditionNames(csvConditionNames);
		setDtf(dtf);
		setSkipFirst(true);
	}

}