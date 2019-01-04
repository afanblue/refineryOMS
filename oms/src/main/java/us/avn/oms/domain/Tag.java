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
 *              id: 1
 *            name: DeCity
 *     description: NULL
 *   tag_type_code: FLD
 *            misc: NULL
 *          c1_lat: 39.592313
 *         c1_long: -75.641903
 *          c2_lat: 39.579168
 *         c2_long: -75.619368
 *          active: Y
 */
public class Tag extends OMSObject implements Serializable {
	
	private static final long serialVersionUID = 8751282105532159742L;
	
	public static final String ANALOG_INPUT = "AI";
	public static final String ANALOG_OUTPUT = "AO";
	public static final String CALCULATED = "C";
	public static final String CONTROL_BLOCK = "CB";
	public static final String DIGITAL_INPUT = "DI";
	public static final String DIGITAL_OUTPUT = "DO";
	public static final String DOCK = "DK";
	public static final String FIELD = "FLD";
	public static final String HOT_SPOT = "HS";
	public static final String PIPE = "P";
	public static final String PLOT_GROUP = "PG";
	public static final String PROCESS_UNIT = "PU";
	public static final String REFINERY_UNIT = "RU";
	public static final String SCHEMATIC = "SCM";
	public static final String SCHEMATIC_OBJECT = "SCO";
	public static final String SHIP = "S";
	public static final String TANK = "TK";
	public static final String TANK_CAR = "TC";
	public static final String TANK_TRUCK = "TT";
	public static final String TRANSFER = "XFR";
	public static final String VALVE = "V";
		
	protected Long id;
	protected String name;
	protected String description;
	protected String tagTypeCode;
	protected Long   tagTypeId;
	protected String misc;
	protected Double c1Lat;
	protected Double c1Long;
	protected Double c2Lat;
	protected Double c2Long;
    protected String active;
    protected Long   inTagId;
    protected Long   outTagId;
    protected Collection<Long> inTagList;
    protected Collection<Long> outTagList;
    
    /**
     * Contructor
     * Description: create an empty tag object
     */
    public Tag() { }
    
    /**
     * Constructor
     * Description:  Create a new tag w/the given ID and name
     * @param i
     * @param n
     */
    public Tag( Long i, String n ) {
    	this.id = i;
    	this.name = n;
    }

    /**
     * Constructor
     * Description: Create a new tag with the given ID, name, and tag type
     * @param i - id
     * @param n - name
     * @param c - Tag Type Code
     */
    public Tag( Long i, String n, String c ) {
    	this.id = i;
    	this.name = n;
    	this.tagTypeCode = c;
    }

    /**
     * Constructor
     * Description: copy contents of existing tag to a new Tag object
     * @param t
     */
    public Tag( Tag t ) {
    	this.id = t.getId();
    	this.name = t.getName();
    	this.description = t.getDescription();
    	this.tagTypeCode = t.getTagTypeCode();
    	this.tagTypeId = t.getTagTypeId();
    	this.misc = t.getMisc();
    	this.c1Lat = t.getC1Lat();
    	this.c1Long = t.getC1Long();
    	this.c2Lat = t.getC2Lat();
    	this.c2Long = t.getC2Long();
    	this.active = t.getActive();
    	this.inTagId = t.getInTagId();
    	this.outTagId = t.getOutTagId();
    	this.inTagList = t.getInTagList();
    	this.outTagList = t.getInTagList();
    }
    
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

	
	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	
	public String getTagTypeCode() {
		return tagTypeCode;
	}

	public void setTagTypeCode(String tagTypeCode) {
		this.tagTypeCode = tagTypeCode;
	}

	
	public Long getTagTypeId() {
		return tagTypeId;
	}

	public void setTagTypeId(Long tagTypeId) {
		this.tagTypeId = tagTypeId;
	}

	
	public String getMisc() {
		return misc;
	}

	public void setMisc(String misc) {
		this.misc = misc;
	}

	
	public Double getC1Lat() {
		return c1Lat;
	}

	public void setC1Lat(Double c1Lat) {
		this.c1Lat = c1Lat;
	}


	public Double getC1Long() {
		return c1Long;
	}

	public void setC1Long(Double c1Long) {
		this.c1Long = c1Long;
	}


	public Double getC2Lat() {
		return c2Lat;
	}

	public void setC2Lat(Double c2Lat) {
		this.c2Lat = c2Lat;
	}


	public Double getC2Long() {
		return c2Long;
	}

	public void setC2Long(Double c2Long) {
		this.c2Long = c2Long;
	}
	

	public String getActive() {
		return active;
	}

	public void setActive(String active) {
		this.active = active;
	}

	
	public Long getInTagId() {
		return inTagId;
	}

	public void setInTagId(Long inTag) {
		this.inTagId = inTag;
	}
	

	public Long getOutTagId() {
		return outTagId;
	}

	public void setOutTagId(Long outTag) {
		this.outTagId = outTag;
	}
	

	public Collection<Long> getInTagList() {
		return inTagList;
	}

	public void setInTagList(Collection<Long> itl) {
		this.inTagList = itl;
	}

	
	public Collection<Long> getOutTagList() {
		return outTagList;
	}

	public void setOutTagList(Collection<Long> otl ) {
		this.outTagList = otl;
	}


}
