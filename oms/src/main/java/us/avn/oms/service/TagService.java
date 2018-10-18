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
package us.avn.oms.service;

import java.util.ArrayList;
import java.util.Collection;

import us.avn.oms.domain.ChildValue;
import us.avn.oms.domain.IdName;
import us.avn.oms.domain.RelTagTag;
import us.avn.oms.domain.Tag;
import us.avn.oms.domain.TagType;
import us.avn.oms.domain.Taglet;


public interface TagService {
	
	Collection<Tag> getAllTagsByType( String ttc );
	
	Tag getTag( Long id );
	
	Tag getTagByName( String name, String tagType );
	
	void deleteChildTags( Long id );
	
	Collection<Taglet> getAllTagletsByType( String ttc );
	
	Collection<IdName> getAllIdNamesByType( String ttc );
	
	Collection<IdName> getAllIdNamesByTypeList( ArrayList<String> p );

	Collection<RelTagTag> getParentTags( Long id );
	
	Collection<RelTagTag> getChildTags( Long id );
	
	Collection<Taglet> getChildren( Long id );
	
	Collection<TagType> getSchematicObjectTypes( );
	
	Collection<ChildValue> getSCMChildValues( Long id );
	
	void updateTag( Tag t );

	void updateRelationship( RelTagTag rtt );

	Long insertTag( Tag t );

	Long insertRelationship( RelTagTag rtt );

}
