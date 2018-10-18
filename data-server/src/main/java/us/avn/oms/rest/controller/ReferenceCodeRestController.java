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

import us.avn.oms.domain.ReferenceCode;
import us.avn.oms.service.ReferenceCodeService;

@RestController

@RequestMapping("/referencecode")
public class ReferenceCodeRestController {
	
    /* Get actual class name to be printed on */
    private Logger log = LogManager.getLogger(this.getClass().getName());

	@Autowired 
	ReferenceCodeService rcService;

	@RequestMapping(method = RequestMethod.GET, produces="application/json", value="/historytypes")
	public Collection<ReferenceCode> getAllHistoryTypes( ) {
		log.debug("get all history types");
		return rcService.getAllForCategory("HISTORY-TYPE");
	}
	
	@RequestMapping(method = RequestMethod.GET, produces="application/json", value="/aitypes")
	public Collection<ReferenceCode> getAllAITypes( ) {
		log.debug("get all analog input types");
		return rcService.getAllForCategory("ANALOG-TYPE");
	}
	
	@RequestMapping(method = RequestMethod.GET, produces="application/json", value="/category/{cat}")
	public Collection<ReferenceCode> getAllForCategory( @PathVariable String cat ) {
		log.debug("get all for category "+cat);
		return rcService.getAllForCategory(cat);
	}
	
	@RequestMapping(method = RequestMethod.PUT, value="/insert" )
	public void insertReferenceCode(@RequestBody ReferenceCode rc ) {
		rcService.insertReferenceCode(rc);
	}

	@RequestMapping(method = RequestMethod.PUT, value="/update" )
	public void updateConfigItem(@RequestBody ReferenceCode rc ) {
		rcService.updateReferenceCode( rc );
	}

}
