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

import us.avn.oms.domain.DigitalOutput;
import us.avn.oms.service.DigitalOutputService;

@RestController

@RequestMapping("/do")
public class DigitalOutputRestController {
	
    /* Get actual class name to be printed on */
    private Logger log = LogManager.getLogger(this.getClass().getName());
    
	@Autowired 
	DigitalOutputService doService;
	
	
	@RequestMapping(method = RequestMethod.GET, produces="application/json", value="/all")
	public Collection<DigitalOutput> getAllDigitalOutputs(  ) {
		log.debug("get all digital outputs");
		return doService.getAllDigitalOutputs( );
	}

	@RequestMapping(method = RequestMethod.GET, produces="application/json", value="/{id}")
	@ResponseBody
	public DigitalOutput getDigitalOutput( @PathVariable Long id) {
		log.debug("get digital output w/id "+id);
		return doService.getDigitalOutput(id);
	}

	@RequestMapping(method = RequestMethod.POST, value="/insert" )
	public Long insertDigitalOutput(@RequestBody DigitalOutput d ) {
		log.debug("Inserting digital output "+d.toString());
		return doService.insertDigitalOutput(d);
	}
	
	@RequestMapping(method = RequestMethod.PUT, value="/update" )
	public void updateDigitalOutput(@RequestBody DigitalOutput d) {
	   log.debug("Updating digital output - "+d.toString());
	   doService.updateDigitalOutputStatic(d);
	}

}
