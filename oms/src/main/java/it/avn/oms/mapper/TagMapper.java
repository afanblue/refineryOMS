package it.avn.oms.mapper;

import java.util.ArrayList;
import java.util.Collection;

import it.avn.oms.domain.IdName;
import it.avn.oms.domain.RelTagTag;
import it.avn.oms.domain.Tag;
import it.avn.oms.domain.Taglet;

public interface TagMapper {
	
	Collection<Tag> getAllTagsByType(  String ttc );
	
	Collection<Taglet> getAllTagletsByType( String ttc );
	
	Collection<IdName> getAllIdNamesByType( String ttc );
	
	Collection<IdName> getAllIdNamesByTypeList( ArrayList<String> p );
	
	Tag getTag( Long id );
	
	Tag getTagByName( String name );
	
	void deleteChildTags( Long id );
	
	Collection<RelTagTag> getParentTags( Long id );
	
	Collection<RelTagTag> getChildTags( Long id );
	
	Collection<Taglet> getChildren( Long id );
	
	void updateTag( Tag t );
	
	void updateRelationship( RelTagTag rtt );

	Long insertTag( Tag t );

	Long insertRelationship( RelTagTag rtt );

}
