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
	
	/**
	 * Return all tag objects with specified tag type code ordered by tag name
	 * @param ttc specified tag type code 
	 * @return Collection of Tag objects
	 */
	Collection<Tag> getAllTagsByType( String ttc );
	
	/**
	 * Return all tag objects with specified tag type code randomly ordered
	 * @param ttc specified tag type code 
	 * @return Collection of Tag objects
	 */
	Collection<Tag> getTagsByTypeRandom( String ttc );
	
	/**
	 * Get tag object for specified ID
	 * @param id specified ID
	 * @return Tag object
	 */
	Tag getTag( Long id );
	
	/**
	 * Get Tag object for given name, tag type (which is the unique identifier)
	 * @param name Tag name
	 * @param tagType Tag type code
	 * @return Tag object
	 */
	Tag getTagByName( String name, String tagType );
	
	/**
	 * Delete all child tags (from REL_TAG_TAG) of ID and code null
	 * @param id ID of child tag to delete
	 */
	void deleteChildTags( Long id );
	
	/**
	 * Delete all child tags (from REL_TAG_TAG) of ID with the specified code
	 * @param id ID of child (child_tag_id) 
	 * @param code REL_TAG_TAG code
	 */
	void deleteChildTagsOfType( Long id, String code );

	/**
	 * Get all tags (gonna be a long list)
	 * @return Collection of Tag objects
	 */
	Collection<Tag> getAllTags();
	
	/**
	 * Get all tags as Taglets of specified type
	 * @param ttc type of tags to get
	 * @return Collection of Taglet objects
	 */
	Collection<Taglet> getAllTagletsByType( String ttc );
	
	/**
	 * Get all tags as IdNames of specified type
	 * @param ttc type of tags to get
	 * @return Collection of IdName objects
	 */
	Collection<IdName> getAllIdNamesByType( String ttc );
	
	/**
	 * Get all tags as IdNames of types specified in list p 
	 * @param p List of tag types to get
	 * @return Collection of IdName objects
	 */
	Collection<IdName> getAllIdNamesByTypeList( ArrayList<String> p );

	/**
	 * Get all parent REL_TAG_TAG records for child ID regardless of code
	 * @param id ID of child to get the parent relationship records for
	 * @return Collection of RelTagTag objects
	 */
	Collection<RelTagTag> getParentTags( Long id );
	
	/**
	 * Get parent records for child ID with specified code
	 * @param id ID of child to get the parent relationship records for
	 * @param code code used to limit parents
	 * @return Collection of Tag objects
	 */
	Collection<Tag> getParentTagsWCode( Long id, String code );
	
	/**
	 * Get all child REL_TAG_TAG records for parent ID regardless of code
	 * @param id ID of parent to get the child relationship records for
	 * @return Collection of RelTagTag objects
	 */
	Collection<RelTagTag> getChildTags( Long id );
	
	/**
	 * Get all child REL_TAG_TAG records for parent ID with specified code
	 * @param id ID of parent to get the child relationship records for
	 * @param code code used to limit child records
	 * @return Collection of RelTagTag objects
	 */
	Collection<RelTagTag> getChildrenOfType( Long id, String code );
	
	/**
	 * Get all parents REL_TAG_TAG for child ID with specified code 
	 * @param id ID of child to get the parent relationship records for
	 * @param code code used to limit parents
	 * @return Collection of RelTagTag objects
	 */
	Collection<RelTagTag> getParentOfType( Long id, String code );
	
	/**
	 * Get all children for parent ID regardless of code
	 * @param id ID of parent to get the child relationship records for
	 * @return Collection of RelTagTag objects
	 */
	Collection<RelTagTag> getChildren( Long id );
	
	/**
	 * Get all tag types
	 * @return Collection of TagType objects
	 */
	Collection<TagType> getTagTypes( );

	/**
	 * Get all schematic object types from SCM_OBJECT_VW
	 * @return Collection of tag types
	 */
	Collection<TagType> getSchematicObjectTypes( );
	
	/**
	 * This query retrieves the children of schematics
	 * {@code   
	 * Note that we've limited the type of CHILDREN allowed to the 
	 * parent (tag of type SCM)
	 *  [child] (tag of type SCO, related via the rel_tag_tag table)
	 *    [grandchild] (tag of type AI,DI,AO,DO related via the rel_tag_tag table)
	 * }
	 * @param id ID of schematic
	 * @return Collection of ChildValue objects
	 */
	Collection<ChildValue> getSCMChildValues( Long id );
	
	/**
	 * This query retrieves the level child for a given tank to be used as
	 * a schematic object.
	 * <p>
	 * It's suboptimal in that the tank/ not-tank show up as a union of
	 * two queries when we only expect to return one row, but it allows us
	 * to use the same "query" to fetch both the source and destination
	 * w/o caring about what kind of tag it is.  I hope.
	 * <p>
	 * One caveat: the source and destination must have an associated tag
	 * for the object, ie, like a tag signifying the state of the object
	 * 
	 * @param id ID of tank
	 * @return Collection of ChildValue objects
	 */
	Collection<ChildValue> getTransferTankLevelChild( Long id );
	
	Collection<ChildValue> getTransferChildValues( Long id, String code );
	
	Collection<ChildValue> getTransferSensorValues( Long id, String code );

	/**
	 * Update the DB record for tag object
	 * @param t tag to update
	 */
	void updateTag( Tag t );

	/**
	 * Update the DB record for the RelTagTag object
	 * @param rtt relationship to update
	 */
	void updateRelationship( RelTagTag rtt );

	/**
	 * Insert a DB record for tag objects
	 * @param t tag to insert (id should be zero)
	 * @return ID of tag record inserted
	 */
	Long insertTag( Tag t );

	/**
	 * Insert a DB record for the RelTagTag object
	 * @param rtt relationship to insert
	 * @return ID of REL_TAG_TAG record inserted
	 */
	Long insertRelationship( RelTagTag rtt );

}
