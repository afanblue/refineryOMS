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

import us.avn.oms.domain.Field;
import us.avn.oms.domain.ReferenceCode;
import us.avn.oms.domain.RelTagTag;
import us.avn.oms.domain.Tank;
import us.avn.oms.service.TagService;
import us.avn.oms.service.TankService;

@RestController

@RequestMapping("/tank")
public class TankRestController {
	
    /* Get actual class name to be printed on */
    private Logger log = LogManager.getLogger(this.getClass().getName());

	@Autowired 
	TankService tankService;
	
	@Autowired
	TagService tagService;

	@RequestMapping(method = RequestMethod.GET, produces="application/json", value="/all")
	public Collection<Tank> getAllTanks( ) {
		log.debug("get all tanks");
		return tankService.getAllTanks();
	}
	
	@RequestMapping(method = RequestMethod.GET, produces="application/json", value="/contentTypes")
	public Collection<ReferenceCode> getAllContentTypes() {
		log.debug("get content type list");
		return tankService.getAllContentTypes();
	}
	
	@RequestMapping(method = RequestMethod.GET, produces="application/json", value="/{id}")
	@ResponseBody
	public Tank getTank( @PathVariable Long id) {
		log.debug("get tank w/id "+id);
		return tankService.getTank(id);
	}

	@RequestMapping(method = RequestMethod.PUT, produces="application/json", value="/update")
	@ResponseBody
	public void updateTank(@RequestBody Tank tk ) {
		log.debug("update tank w/id "+tk.getId());
		if( tk.getId() != 0 ) {
			tagService.updateTag(tk.getTag());
			tankService.updateTank(tk);
			updateRelationships(tk);
		} else {
			tagService.insertTag(tk.getTag());
			tankService.insertTank(tk);
			updateRelationships(tk);
		}
	}

	@RequestMapping(method = RequestMethod.POST, produces="application/json", value="/insert")
	@ResponseBody
	public void insertTank(@RequestBody Tank tk ) {
		log.debug("update tank w/id "+tk.getId());
		if( tk.getId() != 0 ) {
			tagService.updateTag(tk.getTag());
			tankService.updateTank(tk);
			updateRelationships(tk);
		} else {
			tagService.insertTag(tk.getTag());
			tankService.insertTank(tk);
			updateRelationships(tk);
		}
	}

	private void updateRelationships( Tank tk ) {
		RelTagTag rttt = new RelTagTag(tk.getTempRttId(), tk.getId(), tk.getTempId());
		tagService.updateRelationship(rttt);
		RelTagTag rttl = new RelTagTag(tk.getLevelRttId(), tk.getId(), tk.getLevelId());
		tagService.updateRelationship(rttt);
	}
	
}
