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
/**
 * 
 */
package us.avn.oms.domain;

import java.io.PrintWriter;
import java.io.Serializable;
import java.io.StringWriter;
import java.time.format.DateTimeFormatter;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;

/**
 * @author Allan
 *
 */
public abstract class OMSObject implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 20180831131012L;
	protected DateTimeFormatter sdf  = DateTimeFormatter.ofPattern("y-MM-dd HH:mm:ss");
	protected DateTimeFormatter sdfd = DateTimeFormatter.ofPattern("y-MM-dd");

	/**
	 * 
	 */
	public OMSObject() {

	}

	public String toString() {
        ObjectMapper mapper = new ObjectMapper();
        
        String json;
		try {
//			mapper.registerModule( new JavaTimeModule());
			mapper.findAndRegisterModules()
			      .configure(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS, false);;
//			mapper.setDateFormat(sdf);
			json = mapper.writeValueAsString(this);
		} catch (JsonProcessingException e) {
			StringWriter sw = new StringWriter();
			e.printStackTrace(new PrintWriter(sw));
			json = "{\"error\":\""+sw.toString()+"\"}";
		}
		return json;
	}

}
