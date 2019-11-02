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
import java.util.Iterator;
import java.util.Vector;

import us.avn.oms.domain.Carrier;
import us.avn.oms.domain.Hold;
import us.avn.oms.mapper.TagMapper;
import us.avn.oms.mapper.CarrierMapper;
import us.avn.oms.service.CarrierService;

public class CarrierServiceImpl implements CarrierService {


	private CarrierMapper carrierMapper;
	private TagMapper tagMapper;
	
	public void setCarrierMapper( CarrierMapper vm ) {
		this.carrierMapper = vm;
	}
	
	public void setTagMapper( TagMapper tm ) {
		this.tagMapper = tm;
	}
	
	
	@Override
	public Collection<Carrier> getAllCarriers( ) {
		Collection<Carrier> cc = carrierMapper.getAllCarriers( );
		Collection<Carrier> ck = new Vector<Carrier>(cc.size());
		Iterator<Carrier> icc = cc.iterator();
		while( icc.hasNext() ) {
			Carrier c = icc.next();
			c.setHolds(this.getHolds(c.getId()));
			ck.add(c);
		}
		return ck;
	}
	
	@Override
	public Carrier getCarrier( Long id) {
		Carrier c = carrierMapper.getCarrier(id);
		c.setHolds(this.getHolds(id));
		return c;
	}
	
	@Override
	public Collection<Carrier> getAllCarriersForProduct( String code ) {
		Collection<Carrier> cc = carrierMapper.getAllCarriersForProduct( code );
		Collection<Carrier> ck = new Vector<Carrier>(cc.size());
		Iterator<Carrier> icc = cc.iterator();
		while( icc.hasNext() ) {
			Carrier c = icc.next();
			c.setHolds(this.getHolds(c.getId()));
			ck.add(c);
		}
		return ck;
	}
	

	public Collection<Hold> getHolds( Long id ) {
		return carrierMapper.getHolds(id);
	}
	
	@Override
	public Long updateCarrier( Carrier c ) {
		tagMapper.updateTag(c);
		return c.getId();
	}

	@Override
	public Long insertCarrier( Carrier c ) {		
		Long id = tagMapper.insertTag(c);
		return id;
	}
	
	@Override
	public void updateHold( Hold h ) {
		carrierMapper.updateHold(h);
	}
	
	@Override
	public void insertHold( Hold h ) {
		carrierMapper.insertHold(h);
	}

}