package it.avn.oms.service.impl;

import java.util.Collection;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;

import it.avn.oms.domain.AIValue;
import it.avn.oms.domain.Field;
import it.avn.oms.domain.RelTagTag;
import it.avn.oms.domain.Tag;
import it.avn.oms.mapper.ConfigMapper;
import it.avn.oms.mapper.FieldMapper;
import it.avn.oms.mapper.TagMapper;
import it.avn.oms.service.FieldService;

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
		tagMapper.updateTag(f.getTag());
		fieldMapper.updateField(f);
	}

	@Override
    public Long insertField( Field f ) {
		Long id = tagMapper.insertTag(f.getTag());
		Tag t = tagMapper.getTagByName(f.getTag().getName());
		f.setId(t.getId());
    	return fieldMapper.insertField(f);
    }

}