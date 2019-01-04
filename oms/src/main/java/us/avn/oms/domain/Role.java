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

/*
 * 
 */
public class Role implements Serializable {
	
	private static final long serialVersionUID = 8751282105532159742L;
	
	private Long id;
	private String name;
	private String active;
	private Collection<IdName> parents;
	private Long[] privs;	            	// assigned privileges
	private Collection<IdName> privileges;	// all privileges
	
	
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}


	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	
	public Long[] getPrivs() {
		return privs;
	}

	public void setPrivs(Long[] privs) {
		this.privs = privs;
	}
	

	public String getActive() {
		return active;
	}

	public void setActive(String active) {
		this.active = active;
	}
	

	public Collection<IdName> getParents() {
		return parents;
	}

	public void setParents(Collection<IdName> parents) {
		this.parents = parents;
	}

	
	public Collection<IdName> getPrivileges() {
		return privileges;
	}

	public void setPrivileges(Collection<IdName> privileges) {
		this.privileges = privileges;
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
