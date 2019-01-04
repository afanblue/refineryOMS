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


/**
 * 
 * @author Allan
 * 
 * Quantities are 5000 - 11600 gal
 *                119  - 276 bbl
 */
public class Carrier extends Tag implements Serializable {
	
	private static final long serialVersionUID = 8751282105532159742L;

	private Double   quantity;
	private Collection<Hold> holds;
    
	
	public Double getQuantity() {
		return quantity;
	}

	public void setQuantity(Double qty) {
		this.quantity = qty;
	}
	

	public Collection<Hold> getHolds() {
		return holds;
	}

	public void setHolds(Collection<Hold> holds) {
		this.holds = holds;
	}

	
}
