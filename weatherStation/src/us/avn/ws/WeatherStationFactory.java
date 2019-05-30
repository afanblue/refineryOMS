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

public class WeatherStationFactory {

	/**
	 * Constructor
	 */
	public WeatherStationFactory() { }
	

	/**
	 * Create a WeatherStation of type wsType, location loc
	 * <br>
	 * Note: For CSV or ACU, the location is the location of the file containing
	 * 		the values; for API and XML it is the appropriate identifier for
	 * 		the NOAA API and XML requests. 
	 *
	 * @param wsType weather station type (API, XML, ACU, CSV)
	 * @param loc "location" usage dependent on WeatherStation type.
	 *
	 * @return WeatherStation object
	 */
	public WeatherStation getWeatherStation(String wsType, String loc) {
		if(wsType == null){
			return null;
		}		
		if(wsType.equalsIgnoreCase("API")){
			return new NoaaApi( loc );
		} else if(wsType.equalsIgnoreCase("XML")){
			return new NoaaXML( loc );
		} else if(wsType.equalsIgnoreCase("ACU")){
          return new AcuRite( loc );
		} else if(wsType.equalsIgnoreCase("CSV")){
			return new WsCSV( loc );
		}
		return null;
	}

}
