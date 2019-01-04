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

import java.io.PrintWriter;
import java.io.Serializable;
import java.io.StringWriter;
import java.util.Collection;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

public class CalcOperand extends OMSObject implements Serializable {
	
	private static final long serialVersionUID = 8751282105532159742L;
	
	private Long id;
	private Long orderNo;
	private String name;
	private String type;
	private Double scanValue;


/* *************************************************** */
    
    public CalcOperand() { }
    
    public CalcOperand( Long id, String name ) {
    	this.id = id;
    	this.name = name;
    }
	
	public Long getId() {
		return id;
	}
	
	public void setId(Long i) {
		this.id = i;
	}
	
	
	public Long getOrderNo() {
		return orderNo;
	}
	
	public void setOrderNo(Long ono) {
		this.orderNo = ono;
	}
	
	
	public String getName() {
		return name;
	}
	
	public void setName(String n) {
		this.name = n;
	}
	
	
	public String getType() {
		return type;
	}
	
	public void setType(String t) {
		this.type = t;
	}
	
	
	public Double getScanValue() {
		return scanValue;
	}

	public void setScanValue(Double scanValue) {
		this.scanValue = scanValue;
	}
	

}
