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

import org.springframework.beans.factory.annotation.Autowired;

import us.avn.oms.domain.AIValue;
import us.avn.oms.domain.AnalogOutput;
//import us.avn.oms.domain.IdName;
import us.avn.oms.domain.ReferenceCode;
import us.avn.oms.domain.Tag;
import us.avn.oms.mapper.AnalogOutputMapper;
import us.avn.oms.mapper.ConfigMapper;
import us.avn.oms.mapper.TagMapper;
import us.avn.oms.mapper.UnitMapper;
import us.avn.oms.service.AnalogOutputService;

public class AnalogOutputServiceImpl implements AnalogOutputService {


	private AnalogOutputMapper aoMapper;
	private TagMapper tagMapper;
	
	public void setAnalogOutputMapper( AnalogOutputMapper aom ) {
		this.aoMapper = aom;
	}
	
	public void setTagMapper( TagMapper tm ) {
		this.tagMapper = tm;
	}
	

	@Override
	public Collection<AnalogOutput> getAllActiveAOtags( ) {
		return aoMapper.getAllActiveAOtags();
	}

	@Override
	public Collection<AnalogOutput> getAllAnalogOutputs( ) {
		return aoMapper.getAllAnalogOutputs();
	}
/*	
	@Override
	public AnalogOutput getBaseAnalogOutput( Long id) {
		AnalogOutput ao = aoMapper.getAnalogOutput(id);
		return ao;
	}
*/
	@Override
	public AnalogOutput getAnalogOutput( Long id) {
		AnalogOutput ao = new AnalogOutput(0L,"Create new tag");
		if( id != 0 ) {
			ao = aoMapper.getAnalogOutput(id);
		}
		return ao;
	}

	@Override
	public Collection<AnalogOutput> getAnalogOutputsToUpdate() {
		return aoMapper.getAnalogOutputsToUpdate();
	}

	@Override
	public void updateAOvalue( AnalogOutput ao ) {
		aoMapper.updateAOvalue(ao);
	}
	
	@Override
	public void clearAOupdate( Long id ) {
		aoMapper.clearAOupdate(id);
	}
	
	@Override
	public void updateAnalogOutput( AnalogOutput ao ) {
		aoMapper.updateAnalogOutput(ao );
	}

	@Override
	public void output( Long id, Double value ) {
		AnalogOutput ao = aoMapper.getAnalogOutput(id);
		Double val = value;
		if( val == null ) {
			Double inc = 0.20*(ao.getMaxValue() - ao.getZeroValue());
			val = ao.getScanValue()+inc;
		}
		val = (val>ao.getMaxValue()?ao.getMaxValue():val);
		ao.setScanValue(val);
		aoMapper.updateAOvalue(ao);
	}
	
	@Override
	public void updateAnalogOutputStatic( AnalogOutput ao ) {
		if( ao.getTagId() == 0L ) {
			insertAnalogOutput(ao);
		} else {
			tagMapper.updateTag(ao.getTag());
			aoMapper.updateAnalogOutputStatic(ao );
		}
	}

	@Override
	public Long insertAnalogOutput( AnalogOutput ao ) {
		Tag t = ao.getTag();
		tagMapper.insertTag(t);
		Long id = t.getId();
		ao.setTagId(id);
		aoMapper.insertAnalogOutput(ao);
		return id;
	}

}