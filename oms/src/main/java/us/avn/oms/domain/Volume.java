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
 *  Taglet is a shortened version of an tag object, e.g., AnalogInput, Field
 *         for situations where we don't need the full object and tag info.
 *         specifically, this is originally intended for dropdown lists, but
 *         it may have further applicability
 *         
 *              id: 1
 *            name: DeCity
 *     description: Delaware City Refinery
 *   tag_type_code: FLD
 *   tag_type_info: L
 *          active: Y
 *          
 */
public class Volume extends OMSObject implements Serializable {
	
	private static final long serialVersionUID = 8751282105532159742L;
	
	private Long   tankId;
	private Double level;
	private Double vol;
	
    
    public Volume() { }
    
	
	public Long getTankId() {
		return tankId;
	}
	
	public void setTankId(Long id) {
		this.tankId = id;
	}

	
	public Double getLevel() {
		return level;
	}
	
	public void setLevel(Double l) {
		this.level = l;
	}

	
	public Double getVolume() {
		return vol;
	}
	
	public void setVolume(Double v) {
		this.vol = v;
	}

	
}
