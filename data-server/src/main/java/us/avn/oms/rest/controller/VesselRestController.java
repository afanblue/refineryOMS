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

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import us.avn.oms.domain.Tag;
import us.avn.oms.domain.Vessel;
import us.avn.oms.service.CustomerService;
import us.avn.oms.service.TagService;
import us.avn.oms.service.VesselService;

@RestController

@RequestMapping("/vessel")
public class VesselRestController {
	
    /* Get actual class name to be printed on */
    private Logger log = LogManager.getLogger(this.getClass().getName());

	@Autowired 
	CustomerService customerService;

	@Autowired 
	TagService tagService;

	@Autowired 
	VesselService vesselService;

	@RequestMapping(method = RequestMethod.GET, produces="application/json", value="/all")
	public Collection<Vessel> getAllVessels( ) {
		log.debug("get all configuration items");
		return vesselService.getAllVessels();
	}
	
	@RequestMapping(method = RequestMethod.GET, produces="application/json", value="/{id}")
	public Vessel getVessel( @PathVariable Long id) {
		Vessel v = new Vessel();
		if( 0L != id ) {
			v = vesselService.getVessel(id);
			if( (v == null?true:(v.getId()==0L)) ) {
				v = new Vessel();
				v.setId(id);
				v.setVesselName("Nothing for id "+id);
			} else {
				v.setTag(tagService.getTag(id));
				v.setCustomer(customerService.getCustomer(v.getCustomerId()));
			}
		} else {
			v.setId(0L);
			v.getTag().setId(0L);
			v.getTag().setName("New Vessel");
		}
		v.setCustomers(customerService.getAllCustomersAsIdNames());
		return v;
	}
	
	@RequestMapping(method = RequestMethod.PUT, value="/update" )
	public void updateVessel(@RequestBody Vessel v ) {
		log.debug("Update " + v.toString()); 
		Long id = v.getId();
		if( v.getId() == 0L ) {
			id = tagService.insertTag(v.getTag());
			v.setId(id);
			vesselService.insertVessel(v);
		} else {
			tagService.updateTag(v.getTag());
			vesselService.updateVessel(v);
		}
	}

	@RequestMapping(method = RequestMethod.POST, value="/insert" )
	public Long insertVessel(@RequestBody Vessel v ) {
		log.debug("Insert " + v.toString());
		Long id = v.getTag().getId();
		if( v.getId() == 0L ) {
			id = tagService.insertTag(v.getTag());
			v.setId(id);
			vesselService.insertVessel(v);
		} else {
			tagService.updateTag(v.getTag());
			vesselService.updateVessel(v);
		}
		return id;
	}

}
