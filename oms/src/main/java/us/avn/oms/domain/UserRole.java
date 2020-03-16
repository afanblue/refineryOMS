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

public class UserRole extends OMSObject implements Serializable {
	
	private static final long serialVersionUID = 8751282105532159742L;
	
	/*
	 * select u.alias username, concat('ROLE_',upper(r.name)) role
     *   from role r join user_role ur on r.id=ur.role_id join user u on ur.user_id = u.id
     *  where u.alias = ?
	 */
	
	private Long userRoleId;
	private Long userId;
	private Long roleId;
	private String username;
	private String role;
	  
	
	public UserRole() {}
	
	public UserRole( Long urId, Long uId, Long rId ) {
		userRoleId = urId;
		userId = uId;
		roleId = rId;
	}

	/**
	 * @return the userRoleId
	 */
	public Long getUserRoleId() {
		return userRoleId;
	}

	/**
	 * @param userRoleId the userRoleId to set
	 */
	public void setUserRoleId(Long userRoleId) {
		this.userRoleId = userRoleId;
	}

	/**
	 * @return the userId
	 */
	public Long getUserId() {
		return userId;
	}

	/**
	 * @param userId the userId to set
	 */
	public void setUserId(Long userId) {
		this.userId = userId;
	}
	

	/**
	 * @return the roleId
	 */
	public Long getRoleId() {
		return roleId;
	}

	/**
	 * @param roleId the roleId to set
	 */
	public void setRoleId(Long roleId) {
		this.roleId = roleId;
	}
	

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

}
