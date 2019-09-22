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
package us.avn.oms.mapper;

import java.util.ArrayList;
import java.util.Collection;

import us.avn.oms.domain.ChildValue;
import us.avn.oms.domain.IdName;
import us.avn.oms.domain.RelTagTag;
import us.avn.oms.domain.Tag;
import us.avn.oms.domain.TagType;
import us.avn.oms.domain.Taglet;

public interface TagMapper {
	
	Collection<Tag> getAllTags();
	
	Collection<Tag> getAllTagsByType(  String ttc );
	
	Collection<Tag> getTagsByTypeRandom( String ttc );
	
	Collection<Taglet> getAllTagletsByType( String ttc );
	
	Collection<IdName> getAllIdNamesByType( String ttc );
	
	Collection<IdName> getAllIdNamesByTypeList( ArrayList<String> p );
	
	Tag getTag( Long id );
	
	Tag getTagByName( String name, String tagType );
	
	void deleteChildTags( Long id );
	
	void deleteChildTagsOfType( Long id, String code );

	Collection<RelTagTag> getParentTags( Long id );
	
	/**
	 * Get list of parent tags for child 'id' with relationship 'code'
	 * @param id child id to fetch parent tags for
	 * @param code relationship code (rel_tag_type.code)
	 * @return list of parent tags
	 */
	Collection<Tag> getParentTagsWCode( Long id, String code );
	
	Collection<RelTagTag> getChildTags( Long id );
	
	Collection<RelTagTag> getChildrenOfType( Long id, String code );
	
	Collection<RelTagTag> getParentOfType( Long id, String code );
	
	Collection<TagType> getTagTypes( );
	
	Collection<TagType> getSchematicObjectTypes( );
	
	Collection<ChildValue> getSCMChildValues( Long id );
	
	Collection<ChildValue> getTransferTankLevelChild( Long id );
	
	Collection<ChildValue> getTransferChildValues( Long id, String code );
	
	Collection<ChildValue> getTransferSensorValues( Long id, String code );
	
	Collection<RelTagTag> getChildren( Long id );
	
	void updateTag( Tag t );
	
	void updateRelationship( RelTagTag rtt );

	long insertTag( Tag t );

	void insertRelationship( RelTagTag rtt );
	
}
