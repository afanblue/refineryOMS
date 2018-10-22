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

import us.avn.oms.domain.ChildValue;
import us.avn.oms.domain.IdName;
import us.avn.oms.domain.RelTagTag;
import us.avn.oms.domain.Schematic;
import us.avn.oms.domain.Tag;
import us.avn.oms.domain.TagType;
import us.avn.oms.domain.Transfer;
import us.avn.oms.service.TagService;
import us.avn.oms.service.TransferService;

@RestController

@RequestMapping("/schematic")
public class SchematicRestController {
	
    /* Get actual class name to be printed on */
    private Logger log = LogManager.getLogger(this.getClass().getName());

	@Autowired 
	TagService tagService;
	
	@Autowired
	TransferService xferService;

	@RequestMapping(method = RequestMethod.GET, produces="application/json", value="/all")
	public Collection<IdName> getAllSchematics( ) {
		log.debug("get all schematics");
		Collection<IdName> cscm = tagService.getAllIdNamesByType("SCM");
		Iterator<Transfer> cxfer = xferService.getActiveTransfers().iterator();
		while( cxfer.hasNext() ) {
			Transfer x = cxfer.next();
			IdName idn = new IdName(-x.getId(),x.getName());
			cscm.add(idn);
		}
		return cscm;
	}
	
	@RequestMapping(method = RequestMethod.GET, produces="application/json", value="/objTypeList")
	public Collection<TagType> getSchematicObjectTypes( ) {
		log.debug("get all schematic object types");
		return tagService.getSchematicObjectTypes();
	}
	
	@RequestMapping(method = RequestMethod.GET, produces="application/json", value="/{id}")
	@ResponseBody
	public Schematic getSchematic( @PathVariable Long id) {
		log.debug("getSchematic (w/id) "+id);
		Schematic scm = new Schematic(0L, "New schematic");
		if( id >= 0 ) {
			if( 0L != id ) {
				Tag t = tagService.getTag(id);
				scm = new Schematic(t);
				scm.setChildTags(tagService.getSCMChildValues(id));
			}
		} else {
			Transfer x = xferService.getTransfer(-id);
			scm = new Schematic(id, x.getName());
		}
		return scm;
	}	
	
	@RequestMapping(method = RequestMethod.GET, produces="application/json", value="/name/{nm}")
	@ResponseBody
	public Schematic getSchematicByName( @PathVariable String nm) {
		log.debug("getSchematicByName: "+nm);
		Tag t = tagService.getTagByName(nm, "SCM");
		Schematic scm;
		if( null == t ) {
			scm = new Schematic(0L, "New schematic");
		} else {
			scm = new Schematic(t);
			scm.setChildTags(tagService.getSCMChildValues(scm.getId()));
		}
		return scm;
	}
	
	@RequestMapping(method = RequestMethod.PUT, value= "/update")
	public void updateSchematic( @RequestBody Schematic scm ) {
		log.debug("updateSchematic "+scm.toString());
		tagService.updateTag( scm );
		Collection<ChildValue> ccv = scm.getChildTags();
		updateRelationships(ccv);
	}

	@RequestMapping(method = RequestMethod.DELETE, value = "/delete/children/{id}")
	public void deleteChildren( @PathVariable Long id ) {
		tagService.deleteChildTags(id);
	}
	
	@RequestMapping(method = RequestMethod.PUT, value= "/update/child")
	public void updateRelationship( @RequestBody RelTagTag rtt ) {
		log.debug("updateRelationship: "+rtt);
		if( (new Long(0L).equals(rtt.getId()) ) ) {
			tagService.insertRelationship(rtt);
		} else {
			tagService.updateRelationship(rtt);
		}
	}

	@RequestMapping(method = RequestMethod.PUT, value= "/update/children")
	public void updateRelationships( @RequestBody Collection<ChildValue> ccv ) {
		Iterator<ChildValue> iccv = ccv.iterator();
		while( iccv.hasNext() ) {
			ChildValue cv = iccv.next();
			log.debug("update ChildValue "+cv.toString());
			Long id = cv.getId();
			if( (new Long(0L)).equals(cv.getId()) ) {
				id = tagService.insertTag(cv);
				cv.setId(id);
			} else {
				tagService.updateTag(cv);
			}
			RelTagTag rtt = new RelTagTag(cv.getRelTagId(), cv.getParentId(), cv.getId());
			log.debug("update SCM & SCO relationship "+rtt.toString());
			updateRelationship(rtt);
			RelTagTag rti = new RelTagTag( cv.getInpRelTagId(), cv.getId(), cv.getInpTagId());
			log.debug("update SCO and input tag relationship "+rti.toString());
			updateRelationship(rti);
			Long outTagId = cv.getOutTagId()==null?0L:cv.getOutTagId();
			if( 0L != outTagId ) {
				RelTagTag rto = new RelTagTag( cv.getOutRelTagId(), cv.getId(), outTagId );
				log.debug("update SCO and output tag relationship "+rto.toString());
				updateRelationship(rto);
			}
		}
	}

	@RequestMapping(method = RequestMethod.POST, produces="application/json", value= "/insert")
	@ResponseBody
	public void insertSchematic( @RequestBody Schematic scm ) {
		log.debug("insertSchematic "+scm.toString());
		Long id = tagService.insertTag(scm);
		Collection<ChildValue> ccv = scm.getChildTags();
		// Add the ID for the parent we just created 
		Iterator<ChildValue> iccv = ccv.iterator();
		while( iccv.hasNext() ) {
			ChildValue cv = iccv.next();
			cv.setParentId(id);
		}
		insertRelationships(ccv);
	}
	
	@RequestMapping(method = RequestMethod.POST, value= "/insert/children")
	public void insertRelationships( @RequestBody Collection<ChildValue> ccv ) {
		Iterator<ChildValue> iccv = ccv.iterator();
		while( iccv.hasNext() ) {
			ChildValue cv = iccv.next();
			log.debug("insert SCM & SCO Relationship: "+cv.toString());
			Long id = tagService.insertTag(cv);
			RelTagTag rtt = new RelTagTag(0L, cv.getParentId(), id);
			tagService.insertRelationship(rtt);
			RelTagTag rti = new RelTagTag(0L, id, cv.getInpTagId());
			log.debug("insert SCO & input tag relationship "+rti.toString());
			tagService.insertRelationship(rti);
			if( null != cv.getOutTagId()) {
				RelTagTag rto = new RelTagTag(0L, id, cv.getOutTagId());
				log.debug("insert SCO & output tag relationship "+rto.toString());
				tagService.insertRelationship(rto);
			}
		}
	}

}
