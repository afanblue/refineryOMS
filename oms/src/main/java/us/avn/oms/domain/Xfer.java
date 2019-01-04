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
import java.util.Date;


public class Xfer extends OMSObject implements Serializable {

/*
                id: 281
           updated: 0
       float_value: 0
         scan_time: NULL
*/
	
	private Long    id;
	private Integer updated;
	private Double  floatValue;
	private Date    scanTime;
	
	public Xfer()  {}
	
	public Xfer( Long id, Double fv ) {
		this.id = id;
		this.floatValue = fv;
		this.updated = 1;
		this.scanTime = new Date();
	}
	
	
	public Long getId() {
		return id;
	}

	public void setId(Long i) {
		this.id = i;
	}


	public Integer getUpdated() {
		return updated;
	}

	public void setUpdated(Integer upd ) {
		this.updated = upd;
	}


	public Double getFloatValue() {
		return floatValue;
	}

	public void setFloatValue(Double fv ) {
		this.floatValue = fv;
	}


	public Date getScanTime() {
		return scanTime;
	}

	public void setScanTime(Date st ) {
		this.scanTime = st;
	}


}
