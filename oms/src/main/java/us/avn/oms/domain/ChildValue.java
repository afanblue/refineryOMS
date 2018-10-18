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
 *  ChildValue is used to collect the tag IDs and values for objects like schematics
 *         which have child objects which also have objects that contain values.        
 */
public class ChildValue extends Tag implements Serializable {
	
	private static final long serialVersionUID = 8751282105532159742L;
	
	private Long   parentId;
	private Long   relTagId;
    private Long   inpTagId;
    private Long   inpRelTagId;
    private String inpTagName;
    private Double inpValue;
    private String inpType;
    private Double inpMax;
    private Double inpZero;
    private String inpAlmColor;
    private Long   outTagId;
    private Long   outRelTagId;
    private String outTagName;
    private Double outValue;
    private String outType;
    private Double outMax;
    private Double outZero;
    private String outAlmColor;
    
    public ChildValue() { super(); this.tagTypeCode="SCO"; }
    
    
	public Long getParentId() {
		return parentId;
	}

	public void setParentId(Long parentId) {
		this.parentId = (null==parentId?0:parentId);
	}


	public Long getRelTagId() {
		return relTagId;
	}

	public void setRelTagId(Long relTagId) {
		this.relTagId = (null==relTagId?0:relTagId);
	}


	public Long getInpTagId() {
		return inpTagId;
	}

	public void setInpTagId(Long inpTagId) {
		this.inpTagId = inpTagId;
	}


	public Long getInpRelTagId() {
		return inpRelTagId;
	}

	public void setInpRelTagId(Long inpRelTagId) {
		this.inpRelTagId = (null==inpRelTagId?0:inpRelTagId);
	}

	
	public String getInpTagName() {
		return inpTagName;
	}

	public void setInpTagName(String inpTagName) {
		this.inpTagName = inpTagName;
	}


	public Double getInpValue() {
		return inpValue;
	}

	public void setInpValue(Double inpValue) {
		this.inpValue = inpValue;
	}

	
	public String getInpType() {
		return inpType;
	}

	public void setInpType(String inp) {
		this.inpType = inp;
	}

	
	public Double getInpMax() {
		return inpMax;
	}

	public void setInpMax(Double inpMax) {
		this.inpMax = inpMax;
	}
	

	public Double getInpZero() {
		return inpZero;
	}

	public void setInpZero(Double inpZero) {
		this.inpZero = inpZero;
	}


	public String getInpAlmColor() {
		return inpAlmColor;
	}

	public void setInpAlmColor(String iac) {
		this.inpAlmColor = iac;
	}


	public Long getOutTagId() {
		return outTagId;
	}

	public void setOutTagId(Long outTagId) {
		this.outTagId = outTagId;
	}


	public Long getOutRelTagId() {
		return outRelTagId;
	}

	public void setOutRelTagId(Long outRelTagId) {
		this.outRelTagId = (null==outRelTagId?0:outRelTagId);
	}

	
	public String getOutTagName() {
		return outTagName;
	}

	public void setOutTagName(String outTagName) {
		this.outTagName = outTagName;
	}

	
	public Double getOutValue() {
		return outValue;
	}

	public void setOutValue(Double outValue) {
		this.outValue = outValue;
	}

	
	public String getOutType() {
		return outType;
	}

	public void setOutType(String ot ) {
		this.outType = ot;
	}


	public Double getOutMax() {
		return outMax;
	}

	public void setOutMax(Double outMax) {
		this.outMax = outMax;
	}


	public Double getOutZero() {
		return outZero;
	}

	public void setOutZero(Double outZero) {
		this.outZero = outZero;
	}


	public String getOutAlmColor() {
		return outAlmColor;
	}

	public void setOutAlmColor(String oac) {
		this.outAlmColor = oac;
	}


}
