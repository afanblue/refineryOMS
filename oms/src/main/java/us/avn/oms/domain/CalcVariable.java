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
import java.util.Collection;


public class CalcVariable extends OMSObject implements Serializable {
	
	private static final long serialVersionUID = 8751282105532159742L;
	
	private Long id;
	private String definition;
    private Long outputTagId;
	private Double scanValue;
	private Tag  tag;
    private Collection<IdName> inputTags;	   	// list of input tag IDs
//    private Collection<IdName> inputTagList;	// list of possible input tags
//    private Collection<IdName> outputTagList;


/* *************************************************** */
    
    public CalcVariable() { }
    
    public CalcVariable( Long id, String name ) {
    	this.id = id;
    	Tag t = new Tag(id, name);
    	t.active = "Y";
    	t.tagTypeCode = Tag.CALCULATED;
    	this.tag = t;
    	this.definition = "0";
    }
	
	public Long getId() {
		return id;
	}
	
	public void setId(Long i) {
		this.id = i;
	}
	
	
	public String getDefinition() {
		return this.definition;
	}
	
	public void setDefinition(String defn) {
		this.definition = defn;
	}
	
	
	public Long getOutputTagId() {
		return this.outputTagId;
	}

	public void setOutputTagId(Long otid) {
		this.outputTagId = otid;
	}
	

	public Double getScanValue() {
		return scanValue;
	}

	public void setScanValue(Double scanValue) {
		this.scanValue = scanValue;
	}

	
	public Tag getTag() {
		return tag;
	}
	
	public void setTag(Tag t) {
		this.tag = t;
	}
	
	
	public Collection<IdName> getInputTags() {
		return inputTags;
	}

	public void setInputTags(Collection<IdName> inputTags) {
		this.inputTags = inputTags;
	}
	
/*
	public Collection<IdName> getInputTagList() {
		return inputTagList;
	}

	public void setInputTagList(Collection<IdName> tagList) {
		this.inputTagList = tagList;
	}

	
	public Collection<IdName> getOutputTagList() {
		return outputTagList;
	}

	public void setOutputTagList(Collection<IdName> outputTagList) {
		this.outputTagList = outputTagList;
	}
*/
	
}
