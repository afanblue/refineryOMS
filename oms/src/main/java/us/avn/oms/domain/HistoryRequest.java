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
package us.avn.oms.domain;

import java.io.Serializable;


/**
 *  HistoryRequest is a JavaBean used for configuring the parameters
 *  for requesting history data for a particular tag. 
 */
public class HistoryRequest extends OMSObject implements Serializable {
	
	private static final long serialVersionUID = 8751282105532159742L;
	
	public static final String DAY = "day";
	public static final String HOUR = "hour";
	
	private Long    tagId;
	private Integer startInterval;
	private Integer endInterval;
	private String  units;
	
    
    public HistoryRequest() { 
    	this.startInterval = 1;
    	this.units = DAY;
    }
    
    public HistoryRequest( Long id, Integer si ) {
    	this.tagId = id;
    	this.startInterval = si;
    	this.units = DAY;
    }
    
    /* ************************************************** */
	
	public Long getTagId() {
		return tagId;
	}
	
	public void setTagId(Long id) {
		this.tagId = id;
	}

	
	public Integer getStartInterval() {
		return startInterval;
	}
	
	public void setStartInterval(Integer st) {
		this.startInterval = st;
	}

	
	public Integer getEndInterval() {
		return endInterval;
	}
	
	public void setEndInterval(Integer et) {
		this.endInterval = et;
	}
	
	
	public String getUnits() {
		return this.units;
	}
	
	public void setUnits( String u) {
		this.units = u;
	}
	
}
