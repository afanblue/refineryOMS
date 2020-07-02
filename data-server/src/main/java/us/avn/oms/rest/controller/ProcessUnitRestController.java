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

import us.avn.oms.domain.AIValue;
import us.avn.oms.domain.IdName;
import us.avn.oms.domain.ProcessUnit;
import us.avn.oms.domain.RelTagTag;
import us.avn.oms.domain.Tag;
import us.avn.oms.domain.Taglet;
import us.avn.oms.domain.User;
import us.avn.oms.service.AnalogInputService;
import us.avn.oms.service.ConfigService;
import us.avn.oms.service.DigitalInputService;
import us.avn.oms.service.TagService;

@RestController
@RequestMapping("/processunit")
public class ProcessUnitRestController {
	
    /* Get actual class name to be printed on */
    private Logger log = LogManager.getLogger(this.getClass().getName());
	
	@Autowired 
	TagService ts;
	
	@Autowired
	ConfigService cs;
	
	@Autowired
	AnalogInputService ais;
	
	@Autowired
	DigitalInputService dis;

	@RequestMapping(method = RequestMethod.GET, produces="application/json", value="/{id}")
	@ResponseBody
    @ResponseStatus(HttpStatus.OK)
	public ProcessUnit getProcessUnit( @PathVariable Long id  ) {
		log.debug("getting process unit " + id);
		ProcessUnit pu = new ProcessUnit(id, "New process unit ...");
		pu.setSiteLocation(cs.getSiteLocation());
		if( id != 0 ) {
			Tag t = ts.getTag(id);
			pu.setTag(t);
			pu.setChildTags(ts.getChildTags(id));
		}
		pu.setSiteLocation(cs.getSiteLocation());
		return pu;
	}
	
	@RequestMapping(method = RequestMethod.GET, produces="application/json", value="/name/{nm}")
	@ResponseBody
    @ResponseStatus(HttpStatus.OK)
	public ProcessUnit getProcessUnitByName( @PathVariable String nm  ) {
		log.debug("getting process unit " + nm);
		ProcessUnit pu = new ProcessUnit(0L, "New process unit ...");
		pu.setSiteLocation(cs.getSiteLocation());
		Tag t = ts.getTagByName(nm,Tag.PROCESS_UNIT);
		if( (t==null?false:(t.getId()!= 0)) ) {
			pu.setTag(t);
			pu.setChildTags(ts.getChildTags(t.getId()));
		}
		pu.setSiteLocation(cs.getSiteLocation());
		return pu;
	}
	
	@RequestMapping(method = RequestMethod.GET, produces="application/json", value="/all")
	@ResponseBody
    @ResponseStatus(HttpStatus.OK)
	public Collection<ProcessUnit> getAllProcessUnits( ) {
		log.debug("getting all process units");
		Collection<Tag> cts = ts.getAllTagsByType(Tag.PROCESS_UNIT);
		Collection<ProcessUnit> cpu = new Vector<ProcessUnit>();
		for( Tag t: cts ) {
			ProcessUnit pu = new ProcessUnit(t);
			cpu.add(pu);
		}
		return cpu;
	}
	
	@RequestMapping(method = RequestMethod.POST, value="/insert" )
    @ResponseStatus(HttpStatus.CREATED)
	public Long insertProcessUnit(@RequestBody ProcessUnit pu) {
		log.debug("Inserting process unit " + pu.toString());
		Long id = ts.insertTag(pu);
		for( RelTagTag rtt: pu.getChildTags()) {
			rtt.setParentTagId(id);
			ts.insertRelationship(rtt);
		}
		return 1L;
	}
	
	@RequestMapping(method = RequestMethod.PUT, value="/update" )
    @ResponseStatus(HttpStatus.OK)
	public void updateProcessUnit(@RequestBody ProcessUnit pu ) {
		log.debug("Updating process unit - "+pu.toString());
		Long id = pu.getId();
		ts.deleteChildTags(id);
		ts.updateTag(pu);
		for( RelTagTag rtt: pu.getChildTags()) {
			rtt.setParentTagId(id);
			ts.insertRelationship(rtt);
		}
	}
	
	@RequestMapping(method = RequestMethod.GET, value="/values/{un}" )
    @ResponseStatus(HttpStatus.OK)
	public Collection<AIValue> getProcUnitValues(@PathVariable String un ) {
	   log.debug("retrieve tag values for ProcessUnit "+un);
	   Collection<AIValue> puv = ais.getProcUnitValues(un);
	   puv.addAll(dis.getProcUnitValues(un));
	   return puv;
	}


}
