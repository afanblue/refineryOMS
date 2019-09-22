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

import java.util.ArrayList;
import java.util.Collection;
import java.util.Iterator;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;

import us.avn.oms.domain.ChildValue;
import us.avn.oms.domain.IdName;
import us.avn.oms.domain.RelTagTag;
import us.avn.oms.domain.Tag;
import us.avn.oms.domain.TagType;
import us.avn.oms.domain.Taglet;
import us.avn.oms.mapper.TagMapper;
import us.avn.oms.service.TagService;

/**
 * Implementation of the TagService interface
 * 
 * @author Allan
 *
 */
public class TagServiceImpl implements TagService {


	private TagMapper tagMapper;
	private Logger log = LogManager.getLogger(this.getClass().getName());
	
	public void setTagMapper( TagMapper tm ) {
		this.tagMapper = tm;
	}
	
	
	@Override
	/**
	 * @see TagService#getAllTagsByType
	 */
	public Collection<Tag> getAllTagsByType( String ttc ) {
		return tagMapper.getAllTagsByType(ttc);
	}
	
	@Override
	public Collection<Tag> getTagsByTypeRandom( String ttc ) {
		return tagMapper.getTagsByTypeRandom(ttc);
	}
	
	@Override
	public Collection<Tag> getAllTags( ) {
		return tagMapper.getAllTags();
	}
	
	@Override
	public Collection<Taglet> getAllTagletsByType( String ttc ) {
		return tagMapper.getAllTagletsByType(ttc);
	}
	
	@Override
	public Collection<IdName> getAllIdNamesByType( String ttc ) {
		return tagMapper.getAllIdNamesByType(ttc);
	}
	
	@Override
	public Collection<IdName> getAllIdNamesByTypeList( ArrayList<String> p ) {
		return tagMapper.getAllIdNamesByTypeList(p);
	}

	@Override
	public Tag getTag( Long id) {
		return tagMapper.getTag(id);
	}
	
	@Override
	public Tag getTagByName( String name, String tagType ) {
		return tagMapper.getTagByName( name, tagType );
	}
	
	@Override
	public void deleteChildTags( Long id ) {
		tagMapper.deleteChildTags(id);
	}
	
	@Override
	public void deleteChildTagsOfType( Long id, String code ) {
		tagMapper.deleteChildTagsOfType(id,code);
	}
	
	@Override
	public Collection<RelTagTag> getParentTags( Long id ) {
		return tagMapper.getParentTags(id);
	}

	@Override
	public Collection<Tag> getParentTagsWCode( Long id, String code ) {
		return tagMapper.getParentTagsWCode(id, code);
	}
	
	@Override
	public Collection<RelTagTag> getChildTags( Long id ) {
		return tagMapper.getChildTags(id);
	}
	
	@Override
	public Collection<RelTagTag> getChildrenOfType( Long id, String code ) {
		return tagMapper.getChildrenOfType(id, code);
	}
	
	@Override
	public Collection<RelTagTag> getParentOfType( Long id, String code ) {
		return tagMapper.getParentOfType(id, code);
	}
	
	@Override
	public Collection<RelTagTag> getChildren( Long id ) {
		return tagMapper.getChildren(id);
	}
	
	@Override
	public Collection<TagType> getTagTypes( ) {
		return tagMapper.getTagTypes();
	}

	@Override
	public Collection<TagType> getSchematicObjectTypes( ) {
		return tagMapper.getSchematicObjectTypes();
	}
	
	@Override
	public Collection<ChildValue> getSCMChildValues( Long id) {
		return tagMapper.getSCMChildValues(id);
	}
	
	@Override
	public Collection<ChildValue> getTransferTankLevelChild( Long id ) {
		return tagMapper.getTransferTankLevelChild(id);
	}
	
	@Override
	public Collection<ChildValue> getTransferChildValues( Long id, String code ) {
		return tagMapper.getTransferChildValues(id, code );
	}

	@Override
	public Collection<ChildValue> getTransferSensorValues( Long id, String code ) {
		return tagMapper.getTransferSensorValues(id, code);
	}

	@Override
	public void updateTag( Tag t ) {
		tagMapper.updateTag( t );
	}

	@Override
	public void updateRelationship( RelTagTag rtt ) {
		if( (new Long(0L)).equals(rtt.getId()) ) {
			tagMapper.insertRelationship(rtt);
		} else {
			tagMapper.updateRelationship(rtt);
		}
	}

	@Override
	public Long insertTag( Tag t ) {
		tagMapper.insertTag(t);
		log.debug(t);
		return t.getId();
	}
	
	@Override
	public Long insertRelationship( RelTagTag rtt ) {
		if( (new Long(0L)).equals(rtt.getId()) ) {
			tagMapper.insertRelationship(rtt);
			return 1L;
		}
		tagMapper.updateRelationship(rtt);
		return 1L;
	}
	
}