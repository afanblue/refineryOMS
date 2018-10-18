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

import java.io.Serializable;
import java.util.Collection;

public class Field extends Tag implements Serializable {
	
	private static final long serialVersionUID = 8751282105532159742L;
	
	private Long id;
	private String roadImage;
	private String satelliteImage;
    private Long parentId;
    private String parent;
    private Collection<Field> parents;
    private Collection<IdName> tanks;
    private Collection<RelTagTag> childTanks;
	private Tag siteLocation;
    
    public Field() {}

    public Field( Long i, String nm, String ri, String si
    		    , Long pid, String p) {
    	this.id = i;
    	this.name = nm;
    	this.tagTypeCode = "FLD";
    	this.roadImage = ri;
    	this.satelliteImage = si;
    	this.parentId = pid;
    	this.parent = p;
    }
    
    public Field( Long i, String n ) {
    	this.id = i;
    	this.name = n;
    	this.tagTypeCode = "FLD";
    }
    
    public Field( Tag t ) {
    	super(t);
    }
    	
    
    public void setTag( Tag t ) {
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
    }
    

	public String getRoadImage() {
		return roadImage;
	}

	public void setRoadImage(String roadImage) {
		this.roadImage = roadImage;
	}


	public String getSatelliteImage() {
		return satelliteImage;
	}

	public void setSatelliteImage(String satelliteImage) {
		this.satelliteImage = satelliteImage;
	}


	public Long getParentId() {
		return parentId;
	}

	public void setParentId(Long pid) {
		this.parentId = pid;
	}


	public String getParent() {
		return parent;
	}

	public void setParent(String parent) {
		this.parent = parent;
	}


	public Collection<Field> getParents() {
		return parents;
	}

	public void setParents(Collection<Field> parents) {
		this.parents = parents;
	}


	public Collection<IdName> getTanks() {
		return tanks;
	}

	public void setTanks(Collection<IdName> tanks) {
		this.tanks = tanks;
	}

	
	public Collection<RelTagTag> getChildTanks() {
		return childTanks;
	}

	public void setChildTanks(Collection<RelTagTag> cts) {
		this.childTanks = cts;
	}

	
	public Tag getSiteLocation() {
		return siteLocation;
	}

	public void setSiteLocation(Tag siteLocation) {
		this.siteLocation = siteLocation;
	}
	

}
