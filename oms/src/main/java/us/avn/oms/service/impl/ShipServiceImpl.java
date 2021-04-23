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
package us.avn.oms.service.impl;

import java.util.Collection;

import us.avn.oms.domain.Ship;
import us.avn.oms.mapper.ShipMapper;
import us.avn.oms.mapper.TagMapper;
import us.avn.oms.service.ShipService;

public class ShipServiceImpl implements ShipService {

	private ShipMapper shipMapper;
	private TagMapper tagMapper;


	public void setShipMapper( ShipMapper sm ) {
		this.shipMapper = sm;
	}

	public void setTagMapper( TagMapper tm ) {
		this.tagMapper = tm;
	}

	public Ship getShipByName( String n ) {
		return shipMapper.getShipByName(n);
	}
	
	public Ship getShip( Long id ) {
		return shipMapper.getShip(id);
	}
	
	public Collection<Ship> getAllShips() {
		return shipMapper.getAllShips();
	}
	
	public Long updateShip( Ship s ) {
		Long id = s.getId();
		if( id != 0 ) {
			tagMapper.updateTag(s);
			shipMapper.updateShip(s);
		} else {
			id = tagMapper.insertTag(s);
			shipMapper.insertShip(s);
		}
		return id;
	}

    public Long insertShip( Ship s ) {
    	return updateShip(s);
    }


}
