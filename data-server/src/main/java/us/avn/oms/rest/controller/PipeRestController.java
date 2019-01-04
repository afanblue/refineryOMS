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

import us.avn.oms.domain.Pipe;
import us.avn.oms.domain.RelTagTag;
import us.avn.oms.domain.Tag;
import us.avn.oms.domain.Vertex;
import us.avn.oms.service.TagService;
import us.avn.oms.service.VertexService;

@RestController

@RequestMapping("/pipe")
public class PipeRestController {
	
    /* Get actual class name to be printed on */
    private Logger log = LogManager.getLogger(this.getClass().getName());

	@Autowired 
	TagService tagService;

	@Autowired 
	VertexService vertexService;

	@RequestMapping(method = RequestMethod.GET, produces="application/json", value="/all")
	public Collection<Tag> getAllPipes( ) {
		log.debug("get all pipes");
		return tagService.getAllTagsByType("P");
	}
	
	@RequestMapping(method = RequestMethod.GET, produces="application/json", value="/{id}")
	public Pipe getPipe( @PathVariable Long id) {
		Pipe p = new Pipe();
		if( 0L != id ) {
			Tag t = tagService.getTag(id);
			p = new Pipe(t);
			if( (p == null?true:(p.getId()==0L)) ) {
				t = new Tag(0L,"Nothing for id "+id);
				p = new Pipe(t);
			} else {
				p.setVtxList(vertexService.getAllVertices(id));
			}
		} else {
			p = new Pipe(0L,"New Pipe");
		}
		return p;
	}
	
	@RequestMapping(method = RequestMethod.PUT, value="/update" )
	public void updatePipe(@RequestBody Pipe p ) {
		log.debug("Update " + p.toString()); 
		Long id = p.getId();
		if( p.getId() == 0L ) {
			id = tagService.insertTag(p);
		} else {
			tagService.updateTag(p);
		}
		updateChildTags(p,"IN");
		vertexService.updateVertices(id, p.getVtxList());
	}

	@RequestMapping(method = RequestMethod.POST, value="/insert" )
	public Long insertPipe(@RequestBody Pipe p ) {
		log.debug("Insert " + p.toString());
		Long id = p.getId();
		if( id == 0L ) {
			id = tagService.insertTag(p);
		} else {
			tagService.updateTag(p);
		}
		updateChildTags(p, "IN");
		vertexService.updateVertices(id, p.getVtxList());
		return id;
	}

	private void updateChildTags( Pipe p, String code ) {
		Long id = p.getId();
		tagService.deleteChildTagsOfType(id, code);
		RelTagTag rtt = new RelTagTag(0L,id,0L);
		rtt.setChildTagId(p.getInTagId());
		rtt.setCode(code);
		tagService.insertRelationship(rtt);
	}
}
