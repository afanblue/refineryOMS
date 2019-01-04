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
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import us.avn.oms.domain.Category;
import us.avn.oms.domain.Menu;
import us.avn.oms.service.MenuService;

@RestController
@RequestMapping("/menu")
public class MenuRestController {
	
    /* Get actual class name to be printed on */
    private Logger log = LogManager.getLogger(this.getClass().getName());
	
	@Autowired 
	MenuService menuService;

	@RequestMapping(method = RequestMethod.GET, produces="application/json", value="/categories")
	@ResponseBody
	public Collection<Category> getAllMenuClasses( ) {
		
		log.debug("getting all menu class records");
		return menuService.getAllMenuCategories();
	}
	
	@RequestMapping(method = RequestMethod.GET, produces="application/json", value="/{user}")
	@ResponseBody
	public Collection<Menu> getAllMenuItems( @PathVariable String user) {
		
		log.debug("getting all configuration records for "+user);
		return menuService.getAllMenuItems(user);
	}
	
	
}
