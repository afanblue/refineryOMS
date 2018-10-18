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
import java.util.Iterator;
import java.util.Vector;

import org.springframework.beans.factory.annotation.Autowired;

import us.avn.oms.domain.ControlBlock;
import us.avn.oms.mapper.ControlBlockMapper;
import us.avn.oms.mapper.TagMapper;
import us.avn.oms.service.ControlBlockService;

public class ControlBlockServiceImpl implements ControlBlockService {


	private ControlBlockMapper cbMapper;
	
	public void setControlBlockMapper( ControlBlockMapper cbm ) {
		this.cbMapper = cbm;
	}
	
	
	@Override
	public Collection<ControlBlock> getAllAOs( ) {
		return cbMapper.getAllAOs();
	}
	
	@Override
	public Collection<ControlBlock> getAllCBs( ) {
		return cbMapper.getAllCBs();
	}
	
	@Override
	public Collection<ControlBlock> getAllDOs( ) {
		return cbMapper.getAllDOs();
	}
	
	@Override
	public ControlBlock getControlBlock( Long id ) {
		return cbMapper.getControlBlock( id );
	}
	
	@Override
	public void insertControlBlock( ControlBlock cb ) {
		cbMapper.insertControlBlock(cb);
	}
	
	public void updateControlBlock( ControlBlock cb ) {
		cbMapper.updateControlBlock(cb);
	}


}