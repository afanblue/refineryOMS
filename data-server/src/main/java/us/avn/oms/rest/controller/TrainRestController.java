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
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import us.avn.oms.domain.Train;
import us.avn.oms.service.TrainService;
import us.avn.oms.service.TagService;

public class TrainRestController {

    /* Get actual class name to be printed on */
    private Logger log = LogManager.getLogger(this.getClass().getName());
	
	@Autowired 
	TrainService ss;
	
	@Autowired
	TagService ts;

	@RequestMapping(method = RequestMethod.GET, produces="application/json", value="/all")
	@ResponseBody
	public Collection<Train> getAllTrains( ) {
		log.debug("getting all trains");
		return ss.getAllTrains();
	}
	
	@RequestMapping(method = RequestMethod.GET, produces="application/json", value="/{id}")
	@ResponseBody
	public Train getTrain( @PathVariable Long id  ) {
		Train s = ss.getTrain(id);
		return s;
	}
	
	@RequestMapping(method = RequestMethod.POST, value="/insert" )
	public Long insertTrain(@RequestBody Train s) {
		log.debug("Inserting train " + s.toString());
		Long id = ss.insertTrain(s);
		return id;
	}
	
	@RequestMapping(method = RequestMethod.PUT, value="/update" )
	public void updateTrain(@RequestBody Train s) {
		log.debug("Updating train - " + s.toString());
		ss.updateTrain(s); 
		Long id = s.getId();
	}



}
