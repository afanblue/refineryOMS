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


public class User extends OMSObject implements Serializable {
	
	private static final long serialVersionUID = 8751282105532159742L;
	
	/*
	 * id, alias, first_name, middle_name, last_name, email , password, state, active
	 */
	private Long id;
	private String alias;
	private String firstName;
	private String middleName;
	private String lastName;
	private String email;
	private String password;
	private String state;
	private String active;
	private Long userRoleId;
	private Long roleId;
	private String role;
	  
	public User() { 
		this.id = 0L;
		this.alias = "";
		this.firstName = "";
		this.middleName = "";
		this.lastName = "";
		this.password = "";
		this.state = "P";
		this.active = "N";
		this.roleId = 0L;
		this.userRoleId = 0L;		
	}
	
	public User( Long i, String a, String fn, String mn, String ln
			   , String e, String p, String st, String act, Long rid ) {
		this.id = i;
		this.alias = a;
		this.firstName = fn;
		this.middleName = mn;
		this.lastName = ln;
		this.email = e;
		this.password = p;
		this.state = st;
		this.active = act;
		this.roleId = rid;
		this.userRoleId = 0L;
	}
	
	public User( User u ) {
		this.id = 0L;
		this.alias = "";
		this.firstName = u.firstName;
		this.middleName = u.middleName;
		this.lastName = u.lastName;
		this.email = u.email;
		this.password = "";
		this.roleId = u.roleId;
		this.userRoleId = 0L;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}
	

	public String getAlias() {
		return alias;
	}

	public void setAlias(String alias) {
		this.alias = alias;
	}
	

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}
	

	public String getMiddleName() {
		return middleName;
	}
	
	public void setMiddleName(String middleName) {
		this.middleName = middleName;
	}
	

	public String getLastName() {
		return lastName;
	}
	
	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	
	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}
	

	public String getPassword() {
		return password;
	}
	
	public void setPassword(String password) {
		this.password = password;
	}
	

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}
	

	public String getActive() {
		return active;
	}

	public void setActive(String act) {
		this.active = act;
	}


	public Long getUserRoleId() {
		return userRoleId;
	}

	public void setUserRoleId(Long urId) {
		this.userRoleId = urId;
	}
	

	public Long getRoleId() {
		return roleId;
	}

	public void setRoleId(Long roleId) {
		this.roleId = roleId;
	}
	

	public String getRole() {
		return role;
	}

	public void setRole(String r) {
		this.role = r;
	}
	

}
