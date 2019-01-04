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
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import us.avn.oms.domain.ControlBlock;
import us.avn.oms.domain.IdName;
import us.avn.oms.domain.Tag;
import us.avn.oms.service.ControlBlockService;
import us.avn.oms.service.TagService;

@RestController

@RequestMapping("/cb")
public class ControlBlockRestController {
	
    /* Get actual class name to be printed on */
    private Logger log = LogManager.getLogger(this.getClass().getName());

	@Autowired 
	ControlBlockService cbService;
	
	@Autowired
	TagService tagService;

	
	@RequestMapping(method = RequestMethod.GET, produces="application/json", value="/all")
	public Collection<ControlBlock> getAllCBs( ) {
		log.debug("get all control blocks");
		return cbService.getAllCBs();
	}
	
	@RequestMapping(method = RequestMethod.GET, produces="application/json", value="/{id}")
	public ControlBlock getControlBlock( @PathVariable Long id) {
		ControlBlock cb = new ControlBlock(0L, "New block");
		if( ! id.equals(0L) ) { 
			cb = cbService.getControlBlock(id);
			if( null == cb ) {
				Tag nt = tagService.getTag(id);
				cb = new ControlBlock();
				cb.setId(nt.getId());
				cb.setBlockType(nt.getTagTypeCode());
			}
		}
//		new ArrayList<>(Arrays.asList("AI", "DI", "C"));
//		ArrayList<String> al = new ArrayList<String>(Arrays.asList("AO", "DO"));
//		cb.setAllOutputs(tagService.getAllIdNamesByTypeList(al));
//		cb.setAllAInputs(tagService.getAllIdNamesByType("AI"));
//		cb.setAllDInputs(tagService.getAllIdNamesByType("DI"));
		return cb;
	}
	
	@RequestMapping(method = RequestMethod.POST, value="/insert" )
	public void insertControlBlock(@RequestBody ControlBlock cb ) {
		log.debug("Insert " + cb ); 
		cbService.insertControlBlock(cb);
	}

	@RequestMapping(method = RequestMethod.PUT, value="/update" )
	public void updateControlBlock(@RequestBody ControlBlock cb ) {
		log.debug("Update " + cb);
		ControlBlock cbt = cbService.getControlBlock(cb.getId());
		if( null == cbt ) {
			cbService.insertControlBlock(cb);
		} else {
			cbService.updateControlBlock(cb);
		}
	}

}
