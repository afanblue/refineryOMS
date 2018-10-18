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
package us.avn.oms.service.impl;

import java.util.Collection;

import us.avn.oms.domain.Vessel;
import us.avn.oms.mapper.CustomerMapper;
import us.avn.oms.mapper.TagMapper;
import us.avn.oms.mapper.VesselMapper;
import us.avn.oms.service.VesselService;

public class VesselServiceImpl implements VesselService {


	private VesselMapper vesselMapper;
	private CustomerMapper customerMapper;
	private TagMapper tagMapper;
	
	public void setVesselMapper( VesselMapper vm ) {
		this.vesselMapper = vm;
	}
	
	public void setCustomerMapper( CustomerMapper cm ) {
		this.customerMapper = cm;
	}
	
	public void setTagMapper( TagMapper tm ) {
		this.tagMapper = tm;
	}
	
	@Override
	public Collection<Vessel> getAllVessels( ) {
		return vesselMapper.getAllVessels();
	}
	
	@Override
	public Vessel getVessel( Long id) {
		return vesselMapper.getVessel(id);
	}
	
	@Override
	public Vessel getVessel( String name) {
		return vesselMapper.getVesselByName(name);
	}

	@Override
	public Long updateVessel( Vessel v ) {
		vesselMapper.updateVessel(v);
		return 1L;
	}

	@Override
	public Long insertVessel( Vessel c ) {		
		vesselMapper.insertVessel(c);
		return 1L;
	}

}