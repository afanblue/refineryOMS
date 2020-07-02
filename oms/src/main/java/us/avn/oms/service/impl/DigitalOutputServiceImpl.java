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


import us.avn.oms.domain.DigitalOutput;
import us.avn.oms.domain.Tag;
import us.avn.oms.mapper.DigitalOutputMapper;
import us.avn.oms.mapper.TagMapper;
import us.avn.oms.service.DigitalOutputService;

public class DigitalOutputServiceImpl implements DigitalOutputService {


	private DigitalOutputMapper doMapper;
	private TagMapper tagMapper;
	
	public void setDigitalOutputMapper( DigitalOutputMapper dom ) {
		this.doMapper =dom;
	}
	
	public void setTagMapper( TagMapper tm ) {
		this.tagMapper = tm;
	}
	

	@Override
	public Collection<DigitalOutput> getAllActiveDOtags( ) {
		return doMapper.getAllActiveDOtags();
	}

	@Override
	public Collection<DigitalOutput> getAllDigitalOutputs( ) {
		return doMapper.getAllDigitalOutputs();
	}
	
	@Override
	public Collection<DigitalOutput> getDigitalOutputsToUpdate() {
		return doMapper.getDigitalOutputsToUpdate();
	}
	
/*	
	@Override
	public DigitalOutput getBaseDigitalOutput( Long id) {
		DigitalOutput doObj = doMapper.getDigitalOutput(id);
		return doObj;
	}
*/
	@Override
	public DigitalOutput getDigitalOutput( Long id) {
		DigitalOutput doObj = new DigitalOutput(0L,"Create new tag");
		if( id != 0 ) {
			doObj = doMapper.getDigitalOutput(id);
		}
		return doObj;
	}
/*
	@Override
	public Collection<AIValue> getCurrentDOValues() {
		return aoMapper.getCurrentDOValues();
	}
*/
	@Override
	public void updateDigitalOutput( DigitalOutput doObj ) {
		doMapper.updateDigitalOutput(doObj );
	}

	@Override
	public void output(Long id, Double value ) {
		DigitalOutput d = doMapper.getDigitalOutput(id);
		Double scanValue = value;
		if( value == null ) {
			scanValue = (d.getScanValue() == 0D)?1D:0D;
		}
		d.setScanValue(scanValue);
		doMapper.updateDigitalOutput(d);
	}
	
	@Override
	public void updateDigitalOutputStatic( DigitalOutput doObj ) {
		if( doObj.getTagId() == 0L ) {
			insertDigitalOutput(doObj);
		} else {
			tagMapper.updateTag(doObj.getTag());
			doMapper.updateDigitalOutputStatic(doObj );
		}
	}
	
	@Override
	public void clearDOupdate( Long id ) {
		doMapper.clearDOupdate(id);
	}

	@Override
	public Long insertDigitalOutput( DigitalOutput doObj ) {
		Tag t = doObj.getTag();
		tagMapper.insertTag(t);
		Long id = t.getId();
		doObj.setTagId(id);
		doMapper.insertDigitalOutput(doObj);
		return id;
	}

}