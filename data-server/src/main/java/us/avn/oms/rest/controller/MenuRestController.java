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
