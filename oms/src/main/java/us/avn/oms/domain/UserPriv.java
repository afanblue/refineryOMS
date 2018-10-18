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

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

public class UserPriv implements Serializable {
	
	private static final long serialVersionUID = 8751282105532159742L;
	
	/*
	 * select u.alias username, concat('ROLE_',upper(r.name)) role
     *   from role r join user_role ur on r.id=ur.role_id join user u on ur.user_id = u.id
     *  where u.alias = ?
	 */
	
	private String username;
	private String role;
	  

	public String getUsername() {
		return this.username;
	}
	
	public void setUsername(String un) {
		this.username = un;
	}


	public String getRole() {
		return this.role;
	}

	public void setRole(String r) {
		this.role = r;
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
