package it.avn.oms.service.impl;

import java.util.ArrayList;
import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;

import it.avn.oms.domain.IdName;
import it.avn.oms.domain.RelTagTag;
import it.avn.oms.domain.Tag;
import it.avn.oms.domain.Taglet;
import it.avn.oms.mapper.TagMapper;
import it.avn.oms.service.TagService;

public class TagServiceImpl implements TagService {


	private TagMapper tagMapper;
	
	public void setTagMapper( TagMapper tm ) {
		this.tagMapper = tm;
	}
	
	@Override
	public Collection<Tag> getAllTagsByType( String ttc ) {
		return tagMapper.getAllTagsByType(ttc);
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
	public Tag getTagByName( String name ) {
		return tagMapper.getTagByName( name );
	}
	
	@Override
	public void deleteChildTags( Long id ) {
		tagMapper.deleteChildTags(id);
	}
	@Override
	public Collection<RelTagTag> getParentTags( Long id ) {
		return tagMapper.getParentTags(id);
	}

	@Override
	public Collection<RelTagTag> getChildTags( Long id ) {
		return tagMapper.getChildTags(id);
	}

	@Override
	public Collection<Taglet> getChildren( Long id ) {
		return tagMapper.getChildren(id);
	}
	
	@Override
	public void updateTag( Tag t ) {
		tagMapper.updateTag( t );
	}

	@Override
	public void updateRelationship( RelTagTag rtt ) {
		if( rtt.getId() == 0) {
			tagMapper.insertRelationship(rtt);
		} else {
			tagMapper.updateRelationship(rtt);
		}
	}

	@Override
	public Long insertTag( Tag t ) {
		return tagMapper.insertTag(t);
	}
	
	@Override
	public Long insertRelationship( RelTagTag rtt ) {
		if( rtt.getId() != 0 ) {
			tagMapper.updateRelationship(rtt);
			return rtt.getId();
		}
		return tagMapper.insertRelationship(rtt);
	}

}