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
 */
public class SimIO extends OMSObject implements Serializable {

	private static final long serialVersionUID = 20180911172354L;
	
	private Long    id;
	private Long    inId;
	private Double  sioValue;
	
	public SimIO()  {}
		
	
	public Long getId() {
		return id;
	}

	public void setId(Long i) {
		this.id = i;
	}


	public Long getInId() {
		return inId;
	}

	public void setInId(Long iv) {
		this.inId = iv;
	}


	public Double getSioValue() {
		return sioValue;
	}

	public void setSioValue(Double iv) {
		this.sioValue = iv;
	}

}