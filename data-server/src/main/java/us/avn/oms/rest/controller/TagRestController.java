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
package us.avn.oms.rest.controller;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.Iterator;
import java.util.Vector;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import us.avn.oms.domain.IdName;
import us.avn.oms.domain.RelTagTag;
import us.avn.oms.domain.Tag;
import us.avn.oms.domain.TagType;
import us.avn.oms.service.AnalogOutputService;
import us.avn.oms.service.DigitalOutputService;
import us.avn.oms.service.TagService;

@RestController

@RequestMapping("/tag")
public class TagRestController {
	
    /* Get actual class name to be printed on */
    private Logger log = LogManager.getLogger(this.getClass().getName());

	@Autowired 
	TagService tagService;
	
	@Autowired
	AnalogOutputService aoService;
	
	@Autowired
	DigitalOutputService doService;

	/**
	 * Method: getTagTypes
	 * Description: get list of all tag types, i.e., process the /oms/tag/types request
	 *              e.g., /oms/tag/types
	 *
	 * @return Collection of TagType records
	 */
	@RequestMapping(method = RequestMethod.GET, produces="application/json", value="/types")
    @ResponseStatus(HttpStatus.OK)
	public Collection<TagType> getTagTypes( ) {
		log.debug("get all tag types");
		return tagService.getTagTypes();
	}
	
	/**
	 * Method: getAllTags
	 * Description: return all tags, i.e., process the
	 *              /oms/tag/type/all request
	 *              e.g., /oms/tag/type/all (all tag)
	 *
	 * @return List of all tags as Tag objects 
	 */
	@RequestMapping(method = RequestMethod.GET, produces="application/json", value="/type/ALL")
    @ResponseStatus(HttpStatus.OK)
	public Collection<Tag> getAllTags(  ) {
		log.debug("get all tags");
		return tagService.getAllTags();
	}
	

	/**
	 * Method: getAllTagsByType
	 * Description: return all tags of type "type", i.e., process the
	 *              /oms/tag/type/{type} request
	 *              e.g., /oms/tag/type/TK (all tanks)
	 *
	 * @param type (String) type of tag to get list for
	 * @return List of all tags as Tag objects 
	 */
	@RequestMapping(method = RequestMethod.GET, produces="application/json", value="/type/{type}")
    @ResponseStatus(HttpStatus.OK)
	public Collection<Tag> getAllTagsByType( @PathVariable String type ) {
		log.debug("get all tags of type "+type);
		return tagService.getAllTagsByType(type.toUpperCase());
	}
	
	/**
	 * Method: getAllIdNamesByTypeList
	 * Description: return all tags contained in type list, i.e., process the
	 *              /oms/tag/types/{types} request
	 *              e.g., /oms/tag/types/TK,SCM,AI (all tanks, schematics, analog inputs)
	 *
	 * @param types ArrayList of string of types to retrieve
	 * @return List of tags by IDname, ie, just the tag ID and tag name
	 */
	@RequestMapping(method = RequestMethod.GET, produces="application/json", value="/types/{types}")
    @ResponseStatus(HttpStatus.OK)
	public Collection<IdName> getAllIdNamesByTypeList( @PathVariable ArrayList<String> types) {
		log.debug("Get all tags for type "+types);
//		String[] tss = types.split(",");
//		ArrayList<String> tipos = new ArrayList<>(Arrays.asList(tss));
		return tagService.getAllIdNamesByTypeList(types);
	}
	
	/**
	 * Method: getTag
	 * Description: return tag for id, i.e., process the /oms/tag/{id} request
	 *              e.g., /oms/tag/1 (return tag w/id=1)
	 *
	 * @param id (Long) ID of tag to retrieve
	 * @return Tag definition 
	 */
	@RequestMapping(method = RequestMethod.GET, produces="application/json", value="/{id}")
	@ResponseBody
    @ResponseStatus(HttpStatus.OK)
	public Tag getTag( @PathVariable Long id) {
		log.debug("get tag w/id "+id);
		Tag t = tagService.getTag(id);
		if( t == null ) {
			t = new Tag(0L,"New item");
			t.setInTagId(0L);
			t.setOutTagId(0L);
			Vector<Long> vl = new Vector<Long>();
			t.setInTagList(vl);
			t.setOutTagList(vl);
		} else {
			t.setInTagId(getChildTagId(id,"IN"));
			t.setOutTagId(getChildTagId(id,"OUT"));
			t.setInTagList(getChildTagIdList(id,"INL"));
			t.setOutTagList(getChildTagIdList(id,"OUTL"));
		}
		return t;
	}
	
	private Collection<Long> getChildTagIdList( Long id, String code ) {
		Iterator<RelTagTag> irtt;
		if( "IN".equals(code) ) {
			irtt = tagService.getChildrenOfType(id, code).iterator();
		} else {
			irtt = tagService.getChildren(id).iterator();
		}
		Vector<Long> tl = new Vector<Long>();
		while( irtt.hasNext() ) {
			RelTagTag rtt = irtt.next();
			tl.add(rtt.getChildTagId());
		}
		return tl;
	}
	
	
	private Long getChildTagId( Long id, String code ) {
		Iterator<Long> il = getChildTagIdList(id, code ).iterator();
		Long l = Long.valueOf(0L);
		if( il.hasNext() ) {
			l = il.next();
		}
		return l;
	}
	/**
	 * Method: getChildTags
	 * Description: return all tags contained in type list, i.e., process the
	 *              /oms/tag/children/{id}
	 *              e.g., /oms/tag/children/3 
	 *
	 * @param id (Long) ID of parent for which to retrieve child tags
	 * @return Collection of RelTagTag objects children associated w/tag of ID
	 */
	@RequestMapping(method = RequestMethod.GET, produces="application/json", value="/children/{id}")
	@ResponseBody
    @ResponseStatus(HttpStatus.OK)
	public Collection<RelTagTag> getChildTags( @PathVariable Long id ) {
		log.debug("get child tag for id "+id);
		return tagService.getChildTags(id);
	}	
	
	@RequestMapping(method = RequestMethod.GET, produces="application/json", value="/name/{nm}/{typ}")
	@ResponseBody
    @ResponseStatus(HttpStatus.OK)
	public Tag getTag( @PathVariable String nm, @PathVariable String typ ) {
		log.debug("get tag w/name "+nm+"/"+typ);
		return tagService.getTagByName(nm,typ);
	}
	
	@RequestMapping(method = RequestMethod.GET, produces="application/json", value= "/idname/{type}")
    @ResponseStatus(HttpStatus.OK)
	public Collection<IdName> getAllIdNamesByType( @PathVariable String type ) {
		return tagService.getAllIdNamesByType( type ) ;
	}
	
	
	@RequestMapping(method = RequestMethod.PUT, value= "/update")
    @ResponseStatus(HttpStatus.OK)
	public void updateTag( @RequestBody Tag t ) {
		tagService.updateTag( t );
		updateRelationships(t);
	}

	@RequestMapping(method = RequestMethod.DELETE, value = "/delete/children")
    @ResponseStatus(HttpStatus.OK)
	public void deleteChildren( @PathVariable Long id ) {
		tagService.deleteChildTags(id);
	}
	
	@RequestMapping(method = RequestMethod.PUT, value= "/update/child")
    @ResponseStatus(HttpStatus.OK)
	public void updateRelationship( @RequestBody RelTagTag rtt ) {
		if( rtt.getId() == 0) {
			tagService.insertRelationship(rtt);
		} else {
			tagService.updateRelationship(rtt);
		}
	}

	@RequestMapping(method = RequestMethod.PUT, value= "/update/children")
    @ResponseStatus(HttpStatus.OK)
	public void updateRelationship( @RequestBody Collection<RelTagTag> crtt ) {
		Iterator<RelTagTag> icrtt = crtt.iterator();
		while( icrtt.hasNext() ) {
			RelTagTag rtt = icrtt.next();
			if( rtt.getId() == 0) {
				tagService.insertRelationship(rtt);
			} else {
				tagService.updateRelationship(rtt);
			}
		}
	}

	@RequestMapping(method = RequestMethod.PUT, value= "/output/{id}/{value}")
    @ResponseStatus(HttpStatus.OK)
	public void updateRelationship( @PathVariable Long id, @PathVariable Double value ) {
		Tag t = tagService.getTag(id);
		if( "AO".equalsIgnoreCase(t.getTagTypeCode()) ) {
			aoService.output(id, value);
		} else if( "DO".equalsIgnoreCase(t.getTagTypeCode())) {
			doService.output(id, value );
		}
	}

	@RequestMapping(method = RequestMethod.POST, produces="application/json", value= "/insert")
	@ResponseBody
    @ResponseStatus(HttpStatus.CREATED)
	public IdName insertTag( @RequestBody Tag t ) {
		tagService.insertTag(t);
		updateRelationships(t);
		IdName idnm = new IdName(t.getId(),t.getName());
		return idnm;
	}
	
	@RequestMapping(method = RequestMethod.POST, value= "/insert/children")
    @ResponseStatus(HttpStatus.CREATED)
	public void insertRelationships( @RequestBody Collection<RelTagTag> crtt ) {
		Iterator<RelTagTag> icrtt = crtt.iterator();
		while( icrtt.hasNext() ) {
			RelTagTag rtt = icrtt.next();
			tagService.insertRelationship(rtt);
		}
	}

	@RequestMapping(method = RequestMethod.POST, value= "/insert/child")
    @ResponseStatus(HttpStatus.CREATED)
	public void insertRelationship( @RequestBody RelTagTag rtt ) {
		tagService.insertRelationship(rtt);
	}

	private void updateRelationships( Tag t ) {
		Long id = t.getId();
		RelTagTag rtt = new RelTagTag(0L,id,0L);
		rtt.setParentTagId(id);
		tagService.deleteChildTags(id);
		if( (null != t.getInTagId()) && (t.getInTagId() != 0L) ) {
			rtt.setCode(null);
			rtt.setChildTagId(t.getInTagId());
			tagService.insertRelationship(rtt);
		}
		if( (null != t.getOutTagId()) && (t.getOutTagId() != 0L) ) {
			rtt.setCode(null);
			rtt.setChildTagId(t.getOutTagId());
			tagService.insertRelationship(rtt);
		}
		if( null != t.getInTagList() ) {
			tagService.deleteChildTagsOfType(id, "INL");
			Iterator<Long> iitl = t.getInTagList().iterator();
			rtt.setCode("INL");
			while( iitl.hasNext() ) {
				rtt.setChildTagId( iitl.next() );
				tagService.insertRelationship(rtt);
			}
		}
		if( null != t.getOutTagList() ) {	
			tagService.deleteChildTagsOfType(id, "OUTL");
			Iterator<Long> iotl = t.getOutTagList().iterator();
			rtt.setCode("OUTL");
			while( iotl.hasNext() ) {
				rtt.setChildTagId(iotl.next());
				tagService.insertRelationship(rtt);
			}
		}
	}
}
