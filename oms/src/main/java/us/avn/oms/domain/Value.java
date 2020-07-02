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
 *  Value provides a more-or-less generic structure for a value to be fetched or updated
 *  <ol>
 *  <li>     id: 1 (id for Tank)</li>
 *  <li>   code: C (product code for tank contents)</li>
 *  <li>  value: 42.00 (associated volume of tank)</li>
 *  </ol> 
 *          
 */
public class Value extends OMSObject implements Serializable {
	
	private static final long serialVersionUID = 8751282108532159742L;
	
	protected Long id;
	protected String code;
	protected Double value;
    
    public Value() { }
    
    public Value( Long i, String n, Double v ) {
    	this.id = i;
    	this.code = n;
    	this.value = v;
    }

	
	public Long getId() {
		return id;
	}
	
	public void setId(Long id) {
		this.id = id;
	}

	
	public String getCode() {
		return code;
	}
	
	public void setCode(String cd) {
		this.code = cd;
	}
	

	public Double getValue() {
		return value;
	}

	public void setValue(Double value) {
		this.value = value;
	}

}
