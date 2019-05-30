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

import java.io.PrintWriter;
import java.io.StringWriter;
import java.text.SimpleDateFormat;
import java.util.HashMap;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

/**
 * WeatherStation
 *
 *  This is the abstract class for defining weather stations for processing their inputs.
 *
 *  The idea is that you create a new WeatherStation subclass and implement the getCurrrentConditions
 *  method in which you do what you have to do to retrieve the current weather conditions, stuff
 *  the values into a hashmap w/the given condition names (WS_TEMPERATURE, WS_PRESSURE, etc).  If
 *  you don't have all those values, then add them as needed. 
 *
 * -- check the dependencies, it's got some odd ones.
 *
 * Fields:  type  -- type of WeatherStation
 *          loc   -- "location" of the data.  This can sometimes have a peculiar meaning
 *
 * @author AVN, 2018-09-10
 *
 */
public abstract class WeatherStation {
	
	public static String WS_TIME = "time";
	public static String WS_TEMPERATURE = "temperature";
	public static String WS_PRESSURE = "barometricPressure";
	public static String WS_WIND_SPEED = "windSpeed";
	public static String WS_WIND_DIRECTION = "windDirection";
	public static String WS_LAST_HOUR_PRECIP = "precipitationLastHour";
	
	protected String type;
	protected String loc;
	protected String wURL;
    protected String weatherUrl;
    protected String[] wsConditionNames;

	protected SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
	protected static String[] conditionNames= { WS_TIME, WS_TEMPERATURE, WS_PRESSURE, WS_WIND_SPEED
    		                                  , WS_WIND_DIRECTION, WS_LAST_HOUR_PRECIP };

	public WeatherStation() { }
	
	public WeatherStation( String t, String l ) {
		this.type = t;
		this.loc = l;
	}

	
	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	
    public String getLocation() {
		return loc;
	}

	public void setLocation(String loc) {
		this.loc = loc;
	}


	public String getWeatherUrl() {
		return weatherUrl;
	}

	public void setWeatherUrl(String weatherUrl) {
		this.weatherUrl = weatherUrl;
	}

	
	public String[] getWsConditionNames() {
		return wsConditionNames;
	}

	public void setWsConditionNames(String[] wsConditionNames) {
		this.wsConditionNames = wsConditionNames;
	}

	
	public SimpleDateFormat getSdf() {
		return sdf;
	}

	public void setSdf(SimpleDateFormat sdf) {
		this.sdf = sdf;
	}

	
	public abstract HashMap<String,Double> getCurrentConditions( );
	
	public String toString() {
        ObjectMapper mapper = new ObjectMapper();
        
        String json;
		try {
			mapper.setDateFormat(sdf);
			json = mapper.writeValueAsString(this);
		} catch (JsonProcessingException e) {
			StringWriter sw = new StringWriter();
			e.printStackTrace(new PrintWriter(sw));
			json = "{\"error\":\""+sw.toString()+"\"}";
		}
		return json;
	}

}
