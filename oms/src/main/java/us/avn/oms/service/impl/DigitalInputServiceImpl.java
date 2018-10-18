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

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;

import us.avn.oms.domain.AIValue;
import us.avn.oms.domain.Config;
import us.avn.oms.domain.DigitalInput;
import us.avn.oms.domain.ReferenceCode;
import us.avn.oms.domain.Tag;
import us.avn.oms.domain.Taglet;
import us.avn.oms.mapper.ConfigMapper;
import us.avn.oms.mapper.DigitalInputMapper;
import us.avn.oms.mapper.TagMapper;
import us.avn.oms.service.DigitalInputService;

public class DigitalInputServiceImpl implements DigitalInputService {

    private Logger log = LogManager.getLogger(this.getClass().getName());

	private DigitalInputMapper diMapper;
	private ConfigMapper cfgMapper;
	private TagMapper tagMapper;
	
	public void setDigitalInputMapper( DigitalInputMapper dim ) {
		this.diMapper = dim;
	}
	
	public void setConfigMapper(ConfigMapper cm ) {
		this.cfgMapper= cm;
	}

	public void setTagMapper( TagMapper tm ) {
		this.tagMapper = tm;
	}
	
	@Override
	public Collection<DigitalInput> getAllDigitalInputs( ) {
		return diMapper.getAllDigitalInputs();
	}

	@Override
	public Collection<DigitalInput> getAllActiveDItags( ) {
		return diMapper.getAllActiveDItags();
	}

	@Override
	public Collection<DigitalInput> getAllUpdatedDItags( ) {
		return diMapper.getAllUpdatedDItags();
	}

	@Override
	public Collection<Taglet> getAllDITaglets( String tc ) {
		return diMapper.getAllDITaglets(  tc );
	}
	
	@Override
	public Collection<ReferenceCode> getAllHistoryTypes() {
		return diMapper.getAllHistoryTypes();
	}
	
	@Override
	public DigitalInput getDigitalInput( Long id) {
		
		DigitalInput di = new DigitalInput();
		if( id == 0L ) {
			di.setTagId(0L);
			Tag t = new Tag(0L,"New DI");
			t.setActive("Y");
			t.setTagTypeCode("DI");
			di.setTag(t);
			di.setHistTypeCode("");
		} else {
			di = diMapper.getDigitalInput(id);
		}
		return di;
	}
	
	@Override
	public void updateDigitalInput( DigitalInput di ) {
		diMapper.updateDigitalInput(di );
	}
	
	@Override
	public Collection<AIValue> getProcUnitValues( String pu ) {
		return diMapper.getProcUnitValues(pu);
	}


	@Override
	public void updateDigitalInputStatic( DigitalInput di ) {
		if( di.getTagId() == 0L ) {
			insertDigitalInput(di);
		} else {
			tagMapper.updateTag(di.getTag());
			diMapper.updateDigitalInputStatic(di );
		}
	}

	@Override
	public Long insertDigitalInput( DigitalInput di ) {
		Tag t = di.getTag();
		Long id = tagMapper.insertTag(t);
		di.setTagId(t.getId());
		diMapper.insertDigitalInput(di);
		return id;
	}

}