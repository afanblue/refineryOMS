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
//import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
//import org.springframework.web.servlet.ModelAndView;

import us.avn.oms.domain.IdName;
import us.avn.oms.service.PrivilegeService;

@RestController
@RequestMapping("/privilege")
public class PrivilegeRestController {
	
    /* Get actual class name to be printed on */
    private Logger log = LogManager.getLogger(this.getClass().getName());
	
	@Autowired
	private PrivilegeService privService;
	
	
	@RequestMapping(method = RequestMethod.GET, produces="application/json", value="/{id}")
	@ResponseBody
	public IdName getPrivilegeById( @PathVariable Long id ) {
		log.debug("getting privilege by ID "+id);
		IdName priv = new IdName(0L, "New Privilege");
		if( id != 0 ) {
			priv = privService.getPrivilegeById(id);
		}
		return priv;
	}
	
	@RequestMapping(method = RequestMethod.GET, produces="application/json", value="/all")
	@ResponseBody
	public Collection<IdName> getAllPrivileges( ) {
		log.debug("getting all privileges");
		return privService.getAllPrivileges();
	}

	@RequestMapping(method = RequestMethod.GET, produces="application/json", value="/role/{id}")
	@ResponseBody
	public Collection<IdName> getPrivilegesForRole( @PathVariable Long id ) {
		return privService.getPrivilegesForRole(id);
	}

	@RequestMapping(method = RequestMethod.PUT, produces="application/json", value="/update")
	public void updatePrivilege( @RequestBody IdName priv ) {
		privService.updatePrivilege(priv);
	}

	@RequestMapping(method = RequestMethod.POST, produces="application/json", value="/insert")
	public void insertPrivilege( @RequestBody IdName priv ) {
		privService.insertPrivilege(priv);
	}

}
