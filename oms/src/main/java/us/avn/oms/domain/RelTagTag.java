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


/*
 *              id: 16
 *    child_tag_id: 1
 *   parent_tag_id: 19
 */
public class RelTagTag extends OMSObject implements Serializable {
	
	private static final long serialVersionUID = 8751282105532159742L;
	
	private Long id;
	private String code;
	private String code2;
	private Long parentTagId;
	private String parent;
	private Long childTagId;
	private String child;
    
	public RelTagTag() { }
	
	public RelTagTag( Long id, Long pid, Long cid ) {
		this.id = id;
		this.parentTagId = pid;
		this.childTagId = cid;
	}
	
	public RelTagTag( Long pid, Long cid, String cd ) {
		this.id = 0L;
		this.parentTagId = pid;
		this.childTagId = cid;
		this.code = cd;
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
	
	public void setCode(String k) {
		this.code = k;
	}

	
	public String getCode2() {
		return code2;
	}
	
	public void setCode2(String k) {
		this.code2 = k;
	}

	
	public Long getParentTagId() {
		return parentTagId;
	}

	public void setParentTagId(Long parentTagId) {
		this.parentTagId = parentTagId;
	}
	

	public String getParent() {
		return parent;
	}

	public void setParent(String parent) {
		this.parent = parent;
	}
	

	public Long getChildTagId() {
		return childTagId;
	}

	public void setChildTagId(Long childTagId) {
		this.childTagId = childTagId;
	}

	
	public String getChild() {
		return child;
	}

	public void setChild(String child) {
		this.child = child;
	}

}
