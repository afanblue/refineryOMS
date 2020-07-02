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
 *          c1_lat: 39.592313
 *         c1_long: -75.641903
 *          c2_lat: 39.579168
 *         c2_long: -75.619368
 */
public class Location extends OMSObject implements Serializable {
	
	private static final long serialVersionUID = 8751282105532159742L;
		
	private Double c1Lat;
	private Double c1Long;
	private Double c2Lat;
	private Double c2Long;
    private String active;
    
    public Location() { }
    

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
	
	
}
