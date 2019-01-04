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

import us.avn.oms.domain.DigitalInput;
import us.avn.oms.service.DigitalInputService;

@RestController

@RequestMapping("/di")
public class DigitalInputRestController {
	
    /* Get actual class name to be printed on */
    private Logger log = LogManager.getLogger(this.getClass().getName());

	@Autowired 
	DigitalInputService diService;

	@RequestMapping(method = RequestMethod.GET, produces="application/json", value="/all")
    @ResponseStatus(HttpStatus.OK)
	public Collection<DigitalInput> getAllDigitalInputs(  ) {
		log.debug("get all digital inputs");
		return diService.getAllDigitalInputs( );
	}
	
	@RequestMapping(method = RequestMethod.GET, produces="application/json", value="/{id}")
	@ResponseBody
    @ResponseStatus(HttpStatus.OK)
	public DigitalInput getDigitalInput( @PathVariable Long id) {
		log.debug("get digital input w/id "+id);
		return diService.getDigitalInput(id);
	}
	
	@RequestMapping(method = RequestMethod.POST, value="/insert" )
    @ResponseStatus(HttpStatus.CREATED)
	public Long insertDigitalInput(@RequestBody DigitalInput di ) {
		log.debug("Inserting digital input "+di.toString());
		return diService.insertDigitalInput(di);
	}
	
	@RequestMapping(method = RequestMethod.PUT, value="/update" )
    @ResponseStatus(HttpStatus.OK)
	public void updateDigitalInput(@RequestBody DigitalInput di) {
	   log.debug("Updating digital input - "+di.toString());
	   diService.updateDigitalInputStatic(di); 
	}

}
