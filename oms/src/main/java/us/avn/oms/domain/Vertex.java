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
 * 
 * @author Allan
 * 
 * Quantities are 5000 - 11600 gal
 *                119  - 276 bbl
 */
public class Vertex extends OMSObject implements Serializable {
	
	private static final long serialVersionUID = 8751282105532159742L;
	
	private Long     id;
	private Long     tagId;
	private Long     seqNo;
	private Double   latitude;
	private Double   longitude;
    
	
	public Long getId() {
		return id;
	}
	
	public void setId( Long i ) {
		this.id = i;
	}
	
	
	public Long getTagId() {
		return tagId;
	}
	
	public void setTagId( Long i ) {
		this.tagId = i;
	}
	
	
	public Long getSeqNo() {
		return this.seqNo;
	}
	
	public void setSeqNo( Long sno ) {
		this.seqNo = sno;
	}
	
	
	public Double getLatitude() {
		return latitude;
	}

	public void setLatitude(Double lat) {
		this.latitude = lat;
	}

	
	public Double getLongitude() {
		return longitude;
	}

	public void setLongitude(Double l) {
		this.longitude = l;
	}

	
}
