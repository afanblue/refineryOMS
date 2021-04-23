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


public class ProcessUnit extends Tag implements Serializable {
	
	private static final long serialVersionUID = 8751282105532159742L;
	
    private Collection<RelTagTag> childTags;
    private Collection<IdName> tags;			/* list of tags available for unit */
	private Tag siteLocation;
    
    public ProcessUnit() { super(); }
    
    public ProcessUnit( Long i, String n ) {
    	super(i,n);
    	this.tagTypeCode = "PU";
    	this.active = "Y";
    }
    
    public ProcessUnit( Tag t ) {
    	super (t);
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
    
	public Collection<RelTagTag> getChildTags() {
		return childTags;
	}

	public void setChildTags(Collection<RelTagTag> t) {
		this.childTags = t;
	}

	
	public Collection<IdName> getTags() {
		return tags;
	}

	public void setTags(Collection<IdName> t) {
		this.tags = t;
	}

	
	public Tag getSiteLocation() {
		return siteLocation;
	}

	public void setSiteLocation(Tag siteLocation) {
		this.siteLocation = siteLocation;
	}
	

}
