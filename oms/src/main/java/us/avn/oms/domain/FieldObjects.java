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

public class FieldObjects extends OMSObject implements Serializable {
	
	private static final long serialVersionUID = 8751282105532159742L;
	
	private Field field;
    private Collection<AIValue> tags;
	private Tag siteLocation;
    
    public FieldObjects() {}


    public Field getField() {
    	return field;
    }
    
    public void setField( Field f ) {
    	this.field = f;
    }

	public Collection<AIValue> getTags() {
		return tags;
	}

	public void setTags(Collection<AIValue> t) {
		this.tags = t;
	}

	
	public Tag getSiteLocation() {
		return siteLocation;
	}

	public void setSiteLocation(Tag sl) {
		this.siteLocation = sl;
	}
	

}
