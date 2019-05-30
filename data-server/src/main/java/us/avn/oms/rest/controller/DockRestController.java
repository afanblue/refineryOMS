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
import java.util.Vector;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import us.avn.oms.domain.AIValue;
import us.avn.oms.domain.Field;
import us.avn.oms.domain.FieldObjects;
import us.avn.oms.domain.IdName;
import us.avn.oms.domain.RelTagTag;
import us.avn.oms.domain.Tag;
import us.avn.oms.service.ConfigService;
import us.avn.oms.service.FieldService;
import us.avn.oms.service.TagService;

@RestController
@RequestMapping("/dock")
public class DockRestController {
	
    /* Get actual class name to be printed on */
    private Logger log = LogManager.getLogger(this.getClass().getName());
	
	@Autowired
	ConfigService cs;
	
	@Autowired
	TagService ts;

	@RequestMapping(method = RequestMethod.GET, produces="application/json", value="/all")
	@ResponseBody
	public Collection<Tag> getAllDocks( ) {
		log.debug("getting all docks");
		return ts.getAllTagsByType(Tag.DOCK);
	}
	
	@RequestMapping(method = RequestMethod.GET, produces="application/json", value="/{id}")
	@ResponseBody
	public Tag getDock( @PathVariable Long id  ) {
		log.debug("get dock, id="+id);
		Tag t = new Tag(0L,"New Dock","DK");
		if( id != 0L ) {
			t = ts.getTag(id);
			t.setInTagId(getChildId(id,null));
			t.setOutTagId(getChildId(id,"CRR"));
			t.setOutTagList(getPumpList(id,"PMP"));
		}
		return t;
	}
	
	private Long getChildId( Long id, String code ) {
		Long cid = 0L;
		Iterator<RelTagTag> irtt = null;
		if( null == code ) {
			irtt = ts.getChildren(id).iterator();
		} else {
			irtt = ts.getChildrenOfType(id, code).iterator();
		}
		if(irtt.hasNext()) {
			RelTagTag rtt = irtt.next();
			cid = rtt.getChildTagId();
		}
		return cid;
	}
	
	private Collection<Long> getPumpList( Long id, String code ) {
		Collection<Long> cid = new Vector<Long>();
		Iterator<RelTagTag> irtt = null;
		if( null == code ) {
			irtt = ts.getChildrenOfType(id,"PMP").iterator();
		} else {
			irtt = ts.getChildrenOfType(id, code).iterator();
		}
		while(irtt.hasNext()) {
			RelTagTag rtt = irtt.next();
			cid.add(rtt.getChildTagId());
		}
		return cid;
	}
	
	@RequestMapping(method = RequestMethod.POST, value="/insert" )
	public Long insertDock(@RequestBody Tag t) {
		log.debug("Inserting dock "+t.toString());
		ts.insertTag(t);
		insertDetector(t);
		// insert carrier (if any)
		insertCarrier(t);
		insertPumpList(t);
		return t.getId();
	}
	
	/**
	 * Update the Dock object
	 * @param t Dock (Tag) to update
	 */
	@RequestMapping(method = RequestMethod.PUT, value="/update" )
	public void updateDock(@RequestBody Tag t) {
		log.debug("Updating dock - "+t.toString());
		ts.updateTag(t);
		insertDetector(t);
		insertCarrier(t);
		insertPumpList(t);
	}
	
	/**
	 * Add carrier tag ID to the REL_TAG_TAG table
	 * 
	 * @param t	- Tag
	 */
	private void insertCarrier(Tag t) {
		Long id = t.getId();
		String code = t.getTagTypeCode();
		ts.deleteChildTagsOfType(id,code);
		RelTagTag ct = new RelTagTag(id,t.getOutTagId(),code);
		ts.insertRelationship(ct);
	}

	/**
	 * Add the "carrier present" digital input tag ID to the
	 * 				REL_TAG_TAG table
	 * @param t - Tag 
	 */
	private void insertDetector(Tag t) {
		Long id = t.getId();
		String code = null;
		ts.deleteChildTags(id);
		RelTagTag ct = new RelTagTag(id,t.getInTagId(),code);
		ts.insertRelationship(ct);
	}
	
	/**
	 * Insert the pump list (outTagList) for Tag t
	 * @param t Tag with pump list
	 */
	private void insertPumpList(Tag t) {
		Long id = t.getId();
		ts.deleteChildTagsOfType(id, "PMP");
		Iterator<Long> pumpList = t.getOutTagList().iterator();
		while(pumpList.hasNext()) {
			Long pid = pumpList.next();
			RelTagTag rtt = new RelTagTag(id,pid,"PMP");
			ts.insertRelationship(rtt);
		}
		
	}
}
