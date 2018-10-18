/*******************************************************************************
 * Copyright (C) 2018 A. E. Van Ness
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
package us.avn.oms.domain;

import java.io.PrintWriter;
import java.io.Serializable;
import java.io.StringWriter;
import java.text.SimpleDateFormat;
import java.util.Collection;
import java.util.Date;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

/*       
 *       id: 2
 *     name: DigitalInput
 *  updated: 170700
 *   active: Y
 */
public class Watchdog extends OMSObject implements Serializable {
	
	private static final long serialVersionUID = 8751282105532159742L;

	public static final String AI = "AnalogInput";
	public static final String AO = "AnalogOutput";
	public static final String CB = "ControlBlock";
	public static final String CV = "CalculatedVariable";
	public static final String DCAI = "DataCollectionAI";
	public static final String DCAO = "DataCollectionAO";
	public static final String DCDI = "DataCollectionDI";
	public static final String DCDO = "DataCollectionDO";
	public static final String DI = "DigitalInput";
	public static final String DO = "DigitalOutput";
	public static final String TRANSFER = "Transfer";
	
	private Long id;
	private Long updated;
	private String name;
	private String active;
	private String lastModifiedDt;
    
    public Watchdog() { }
    
    public Watchdog( String n ) {
    	this.name = n;
    }

	
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}
	

	public Long getUpdated() {
		return updated;
	}
	
	public void setUpdated(Long upd) {
		this.updated = upd;
	}

	
	public String getName() {
		return name;
	}
	
	public void setName(String name) {
		this.name = name;
	}

	
	public String getActive() {
		return active;
	}

	public void setActive(String active) {
		this.active = active;
	}
	

	public String getLastModifiedDt() {
		return lastModifiedDt;
	}

	public void setLastModifiedDt(String lastModifiedDt) {
		this.lastModifiedDt = lastModifiedDt;
	}

}
