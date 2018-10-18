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

import us.avn.oms.domain.Config;
import us.avn.oms.domain.RelTagTag;
import us.avn.oms.domain.Tag;
import us.avn.oms.domain.User;
import us.avn.oms.service.ConfigService;

@RestController

@RequestMapping("/config")
public class ConfigRestController {
	
    /* Get actual class name to be printed on */
    private Logger log = LogManager.getLogger(this.getClass().getName());

	@Autowired 
	ConfigService configService;

	@RequestMapping(method = RequestMethod.GET, produces="application/json", value="/all")
	public Collection<Config> getAllConfigurationItems( ) {
		log.debug("get all configuration items");
		return configService.getAllConfigurationItems();
	}
	
	@RequestMapping(method = RequestMethod.GET, produces="application/json", value="/site")
	public Tag getSiteLocation( ) {
		log.debug("get all site location");
		return configService.getSiteLocation();
	}
	
	@RequestMapping(method = RequestMethod.GET, produces="application/json", value="/views")
	public Collection<String> getAllOmsViews( ) {
		log.debug("get all OMS view names");
		return configService.getOmsViews();
	}
	
	@RequestMapping(method = RequestMethod.GET, produces="application/json", value="/{key}")
	public Config getConfigurationItem( @PathVariable String key) {
		return configService.getConfigurationItem(key);
	}
	
	@RequestMapping(method = RequestMethod.PUT, value="/update" )
	public void updateConfigItem(@RequestBody Collection<Config> cci ) {
		log.debug("Update " + cci.size() + " configuration items"); 
		for (Config newci : cci ) {
			if( newci.getId() == 0L ) {
				configService.insertConfigurationItem(newci);
			} else {
				configService.updateConfigurationItem(newci);
			}
		}
	}

}
