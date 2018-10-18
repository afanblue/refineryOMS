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
import java.util.Collection;
import java.util.Iterator;
import java.util.List;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import us.avn.oms.domain.IdName;
import us.avn.oms.domain.RelTagTag;
import us.avn.oms.domain.Role;
import us.avn.oms.domain.RolePriv;
import us.avn.oms.service.PrivilegeService;
import us.avn.oms.service.RoleService;

@RestController
@RequestMapping("/role")
public class RoleRestController {
	
    /* Get actual class name to be printed on */
    private Logger log = LogManager.getLogger(this.getClass().getName());
	
	@Autowired 
	private RoleService roleService;
	
	@Autowired
	private PrivilegeService privService;
	

	@RequestMapping(method = RequestMethod.GET, produces="application/json", value="/all")
	@ResponseBody
	public Collection<Role> getAllRoles( ) {
		log.debug("getting all roles");
		return roleService.getAllRoles();
	}

	@RequestMapping(method = RequestMethod.GET, produces="application/json", value="/{id}")
	@ResponseBody
	public Role getRoleById( @PathVariable Long id ) {
		log.debug("getting role by ID "+id);
		Role r = new Role();
		if( id != 0 ) {
			r = roleService.getRoleById(id);
		} else {
			r.setId(0L);
			r.setName("New Role");
			r.setActive("N");
		}
		return r;
	}

	@RequestMapping(method = RequestMethod.PUT, produces="application/json", value="/update")
	public void updateRole( @RequestBody Role r ) {
		roleService.updateRole(r);
		roleService.deleteRolePrivs(r.getId());
		Long[] privs = r.getPrivs();
		for( int i=0; i<privs.length; i++ ) {
			RolePriv rp = new RolePriv( r.getId(), privs[i]);
			roleService.insertRolePriv(rp);
		}
	}

	@RequestMapping(method = RequestMethod.POST, produces="application/json", value="/insert")
	public void insertRole( @RequestBody Role r ) {
		roleService.insertRole(r);
		Long[] privs = r.getPrivs();
		for( int i=0; i<privs.length; i++ ) {
			RolePriv rp = new RolePriv( r.getId(), privs[i]);
			roleService.insertRolePriv(rp);
		}
	}

}
