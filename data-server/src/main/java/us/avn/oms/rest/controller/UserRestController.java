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
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import us.avn.oms.domain.User;
import us.avn.oms.domain.Validation;
import us.avn.oms.service.UserService;

@RestController
@RequestMapping("/user")
public class UserRestController {
	
    /* Get actual class name to be printed on */
    private Logger log = LogManager.getLogger(this.getClass().getName());
	
	
	@Autowired 
	private UserService userService;
	
//	@Autowired
//	private RoleService roleService;
	

	@RequestMapping(method = RequestMethod.GET, produces="application/json", value="/all")
	@ResponseBody
    @ResponseStatus(HttpStatus.OK)
	public Collection<User> getAll( ) {
		log.debug("getting all users");
		return userService.getAllUsers();
	}

	@RequestMapping(method = RequestMethod.GET, produces="application/json", value="/{id}")
	@ResponseBody
    @ResponseStatus(HttpStatus.OK)
	public User getUserById( @PathVariable Integer id ) {
		log.debug("getting user by ID "+id);
		User u = new User();
		if( id != 0 ) {
			u = userService.getUserById(id);
		} else {
			u = new User(0,"","","","","","","","",0L);
		}
		return u;
	}
	
	@RequestMapping(method = RequestMethod.GET, produces="application/json", value="/{name}/{pwd}") 
	@ResponseBody
    @ResponseStatus(HttpStatus.OK)
	public Validation validateUser( @PathVariable("name") String name, @PathVariable("pwd") String pwd ) {
		log.debug("validating user "+name);
		return userService.validateUser(name, pwd);
	}


	@RequestMapping(method = RequestMethod.POST, value="/insert" )
    @ResponseStatus(HttpStatus.CREATED)
	public Long insertUser(@RequestBody User u) {
		log.debug("Inserting user "+u.toString());
		return userService.insertUser(u);
	}
	
	@RequestMapping(method = RequestMethod.PUT, value="/update" )
    @ResponseStatus(HttpStatus.OK)
	public void updateUser(@RequestBody User u) {
	   log.debug("Updating user - "+u.toString());
	   userService.updateUser(u);
	}

}
