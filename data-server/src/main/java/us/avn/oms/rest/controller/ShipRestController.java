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
import org.springframework.web.bind.annotation.RestController;

import us.avn.oms.domain.Ship;
import us.avn.oms.service.ShipService;
import us.avn.oms.service.TagService;

@RestController
@RequestMapping("/ship")
public class ShipRestController {

    /* Get actual class name to be printed on */
    private Logger log = LogManager.getLogger(this.getClass().getName());
	
	@Autowired 
	ShipService ss;
	
	@Autowired
	TagService ts;

	@RequestMapping(method = RequestMethod.GET, produces="application/json", value="/all")
	@ResponseBody
	public Collection<Ship> getAllShips( ) {
		log.debug("getting all ships");
		return ss.getAllShips();
	}
	
	@RequestMapping(method = RequestMethod.GET, produces="application/json", value="/{id}")
	@ResponseBody
	public Ship getShip( @PathVariable Long id  ) {
		Ship s = ss.getShip(id);
		return s;
	}
	
	@RequestMapping(method = RequestMethod.POST, value="/insert" )
	public Long insertShip(@RequestBody Ship s) {
		log.debug("Inserting ship " + s.toString());
		Long id = ss.insertShip(s);
		return id;
	}
	
	@RequestMapping(method = RequestMethod.PUT, value="/update" )
	public void updateShip(@RequestBody Ship s) {
		log.debug("Updating ship - " + s.toString());
		ss.updateShip(s); 
//		Long id = s.getId();
	}


}
