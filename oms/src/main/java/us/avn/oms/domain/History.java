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


public class History extends OMSObject implements Serializable {
	
	private static final long serialVersionUID = 8751282105532159742L;
	
	public static final String BOXCAR = "B";
	public static final String LINEAR = "L";
	public static final String NONE = "N";
	
	
    protected Long   id;
	protected Long   tagId;
	protected Double y;
	protected Long   x;
	  
	
	public Long getId() {
		return this.id;
	}
	
	public void setId( Long i ) {
		this.id = i;
	}
	

	public Long getTagId() {
		return tagId;
	}
	
	public void setTagId(Long ti) {
		this.tagId = ti;
	}
	
	
	public Double getY() {
		return y;
	}
	
	public void setY(Double sv) {
		this.y = sv;
	}
	
	
	public Long getX() {
		return x;
	}
	
	public void setX(Long st) {
		this.x = st;
	}
	
	
}
