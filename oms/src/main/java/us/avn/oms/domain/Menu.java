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

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

public class Menu extends OMSObject implements Serializable {
	
	private static final long serialVersionUID = 8751282105532159742L;
	
	private String text;
	private Integer orderNo;
	private String uri;
	private String viewPriv;
	private String execPriv;
	private String category;
	private String menuName;
	  

	public String getText() {
		return text;
	}
	
	public void setText(String text) {
		this.text = text;
	}
	
	
	public Integer getOrderno() {
		return orderNo;
	}
	
	public void setOrderno(Integer orderNo) {
		this.orderNo = orderNo;
	}
	
	
	public String getUri() {
		return uri;
	}
	
	public void setUri(String uri) {
		this.uri = uri;
	}
	
	
	public String getViewpriv() {
		return viewPriv;
	}
	
	public void setViewpriv(String viewPriv) {
		this.viewPriv = viewPriv;
	}
	
	
	public String getExecpriv() {
		return execPriv;
	}
	
	public void setExecpriv(String execPriv) {
		this.execPriv = execPriv;
	}

	
	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	
	public String getMenuname() {
		return menuName;
	}

	public void setMenuname(String menuName) {
		this.menuName = menuName;
	}


}
