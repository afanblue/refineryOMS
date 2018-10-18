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

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;

import us.avn.oms.domain.AIValue;
import us.avn.oms.domain.Field;
import us.avn.oms.domain.RelTagTag;
import us.avn.oms.domain.Tag;
import us.avn.oms.mapper.ConfigMapper;
import us.avn.oms.mapper.FieldMapper;
import us.avn.oms.mapper.TagMapper;
import us.avn.oms.service.FieldService;

public class FieldServiceImpl implements FieldService {

    private Logger log = LogManager.getLogger(this.getClass().getName());

    private ConfigMapper configMapper;
	private FieldMapper fieldMapper;
	private TagMapper tagMapper;
	
	
	public void setFieldMapper( FieldMapper fm ) {
		this.fieldMapper = fm;
	}
	
	public void setTagMapper( TagMapper tm ) {
		this.tagMapper = tm;
	}
	
	public void setConfigMapper(ConfigMapper cm ) {
		this.configMapper= cm;
	}

	@Override
	public Field getFieldByName( String fn ) {
		return fieldMapper.getFieldByName(fn);
	}
	

	@Override
	public Field getFieldDefinition( Long id ) {
		Field f = null;
		log.debug("getting field record for "+id);
		if( id != 0 ) {
			f = fieldMapper.getFieldDefinition(id);
		} else {
			f = new Field(0L,"Enter new field ...");
		}
		f.setParents(fieldMapper.getAllFields());
		f.setSiteLocation(configMapper.getSiteLocation());
		return f;
	}
	
	@Override
	public Field getFieldForDisplay( Long id ) {
		Field f = fieldMapper.getFieldDefinition(id);
		f.setSiteLocation(configMapper.getSiteLocation());
		return f;
	}
	
	@Override
	public Collection<Field> getAllFields() {
		return fieldMapper.getAllFields();
	}
	
	@Override
	public Collection<AIValue> getFieldObjects( String f ) {
		return fieldMapper.getFieldObjects( f );
	}

	@Override
	public void updateField( Field f ) {
		log.debug("Updating field - "+f.toString());
		tagMapper.updateTag(f);
		fieldMapper.updateField(f);
	}

	@Override
    public Long insertField( Field f ) {
		log.debug("Inserting field - "+f);
		Long id = tagMapper.insertTag(f);
		f.setId(id);
    	fieldMapper.insertField(f);
    	return id;
    }

}