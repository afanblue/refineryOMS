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
import us.avn.oms.domain.PlotGroup;
import us.avn.oms.service.AnalogInputService;
import us.avn.oms.service.PlotGroupService;

@RestController
@RequestMapping("/plotGroup")
public class PlotGroupRestController {
	
    /* Get actual class name to be printed on */
    private Logger log = LogManager.getLogger(this.getClass().getName());
	
    @Autowired
    PlotGroupService pgs;

    @Autowired
    AnalogInputService ais;

	@RequestMapping(method = RequestMethod.GET, produces="application/json", value="/all")
	@ResponseBody
    @ResponseStatus(HttpStatus.OK)
	public Collection<PlotGroup> getAllPlotGroups( ) {
		log.debug("getting all fields");
		return pgs.getAllPlotGroups();
	}
		
	@RequestMapping(method = RequestMethod.GET, produces="application/json", value="/{id}")
	@ResponseBody
    @ResponseStatus(HttpStatus.OK)
	public PlotGroup getPlotGroup( @PathVariable Long id  ) {
		
		PlotGroup pg = new PlotGroup(0L, "New Plot Group");
		if( id != 0L ) {
			pg = pgs.getPlotGroupDefinition(id);
		} 
		return pg;
	}
	
	@RequestMapping(method = RequestMethod.POST, value="/insert" )
    @ResponseStatus(HttpStatus.CREATED)
	public void insertPlotGroup(@RequestBody PlotGroup pg) {
		log.debug("Inserting plot group "+pg.toString());
		pgs.insertPlotGroup(pg);
	}
	
	@RequestMapping(method = RequestMethod.PUT, value="/update" )
    @ResponseStatus(HttpStatus.OK)
	public void updatePlotGroup(@RequestBody PlotGroup pg) {
		log.debug("Updating plot group - "+pg.toString());
		pgs.updatePlotGroup(pg); 
	}

}
