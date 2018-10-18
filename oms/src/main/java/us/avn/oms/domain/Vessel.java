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
import java.util.Collection;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

/**
 * 
 * @author Allan
 * 
 * Quantities are 5000 - 11600 gal
 *                119  - 276 bbl
 */
public class Vessel implements Serializable {
	
	private static final long serialVersionUID = 8751282105532159742L;
	
	private Long     id;
	private String   name;
	private Tag      tag;
	private Long     customerId;
	private Customer customer;
	private Double   quantity;
	private Collection<IdName> customers;
    
	
	public Long getId() {
		return id;
	}
	
	public void setId( Long i ) {
		this.id = i;
	}
	
	
	public String getVesselName() {
		return this.name;
	}
	
	public void setVesselName( String n ) {
		this.name = n;
	}
	
	
	public Tag getTag() {
		return tag;
	}

	public void setTag(Tag tag) {
		this.tag = tag;
	}

	
	public Long getCustomerId() {
		return customerId;
	}
	
	public void setCustomerId( Long i ) {
		this.customerId = i;
	}
	
	
	public Customer getCustomer() {
		return customer;
	}

	public void setCustomer(Customer customer) {
		this.customer = customer;
	}


	public Double getQuantity() {
		return quantity;
	}

	public void setQuantity(Double qty) {
		this.quantity = qty;
	}

	
	public Collection<IdName> getCustomers() {
		return customers;
	}

	public void setCustomers(Collection<IdName> customers) {
		this.customers = customers;
	}

	
	public String toString() {
        ObjectMapper mapper = new ObjectMapper();
        
        String json;
		try {
			json = mapper.writeValueAsString(this);
		} catch (JsonProcessingException e) {
			StringWriter sw = new StringWriter();
			e.printStackTrace(new PrintWriter(sw));
			json = "{\"error\":\""+sw.toString()+"\"}";
		}
		return json;
	}

}
