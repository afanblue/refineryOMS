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
package us.avn.oms.rest.controller;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.Iterator;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import us.avn.oms.domain.IdName;
import us.avn.oms.domain.RelTagTag;
import us.avn.oms.domain.Tag;
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

	@RequestMapping(method = RequestMethod.GET, produces="application/json", value="/type/{type}")
	public Collection<Tag> getAllTagsByType( @PathVariable String type ) {
		log.debug("get all tags");
		return tagService.getAllTagsByType(type.toUpperCase());
	}
	
	@RequestMapping(method = RequestMethod.GET, produces="application/json", value="/types/{types}")
	public Collection<IdName> getAllIdNamesByTypeList( @PathVariable ArrayList<String> types) {
		log.debug("Get all tags for type "+types);
//		String[] tss = types.split(",");
//		ArrayList<String> tipos = new ArrayList<>(Arrays.asList(tss));
		return tagService.getAllIdNamesByTypeList(types);
	}
	
	@RequestMapping(method = RequestMethod.GET, produces="application/json", value="/{id}")
	@ResponseBody
	public Tag getTag( @PathVariable Long id) {
		log.debug("get tag w/id "+id);
		return tagService.getTag(id);
	}
	
	@RequestMapping(method = RequestMethod.GET, produces="application/json", value="/children/{id}")
	@ResponseBody
	public Collection<RelTagTag> getChildTags( @PathVariable Long id ) {
		log.debug("get child tag for id "+id);
		return tagService.getChildTags(id);
	}	
	
	@RequestMapping(method = RequestMethod.GET, produces="application/json", value="/name/{nm}/{typ}")
	@ResponseBody
	public Tag getTag( @PathVariable String nm, @PathVariable String typ ) {
		log.debug("get tag w/name "+nm+"/"+typ);
		return tagService.getTagByName(nm,typ);
	}
	
	@RequestMapping(method = RequestMethod.GET, produces="application/json", value= "/idname/{type}")
	public Collection<IdName> getAllIdNamesByType( @PathVariable String type ) {
		return tagService.getAllIdNamesByType( type ) ;
	}
	
	@RequestMapping(method = RequestMethod.PUT, value= "/update")
	public void updateTag( @RequestBody Tag t ) {
		tagService.updateTag( t );
	}

	@RequestMapping(method = RequestMethod.DELETE, value = "/delete/children")
	public void deleteChildren( @PathVariable Long id ) {
		tagService.deleteChildTags(id);
	}
	
	@RequestMapping(method = RequestMethod.PUT, value= "/update/child")
	public void updateRelationship( @RequestBody RelTagTag rtt ) {
		if( rtt.getId() == 0) {
			tagService.insertRelationship(rtt);
		} else {
			tagService.updateRelationship(rtt);
		}
	}

	@RequestMapping(method = RequestMethod.PUT, value= "/update/children")
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

	@RequestMapping(method = RequestMethod.PUT, value= "/output/{id}")
	public void updateRelationship( @PathVariable Long id ) {
		Tag t = tagService.getTag(id);
		if( "AO".equalsIgnoreCase(t.getTagTypeCode()) ) {
			aoService.output(id);
		} else if( "DO".equalsIgnoreCase(t.getTagTypeCode())) {
			doService.output(id);
		}
	}

	@RequestMapping(method = RequestMethod.POST, produces="application/json", value= "/insert")
	@ResponseBody
	public IdName insertTag( @RequestBody Tag t ) {
		tagService.insertTag(t);
		IdName idnm = new IdName(t.getId(),t.getName());
		return idnm;
	}
	
	@RequestMapping(method = RequestMethod.POST, value= "/insert/children")
	public void insertRelationship( @RequestBody Collection<RelTagTag> crtt ) {
		Iterator<RelTagTag> icrtt = crtt.iterator();
		while( icrtt.hasNext() ) {
			RelTagTag rtt = icrtt.next();
			tagService.insertRelationship(rtt);
		}
	}

}
