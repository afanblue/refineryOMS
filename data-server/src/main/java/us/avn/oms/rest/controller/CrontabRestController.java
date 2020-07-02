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

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.Iterator;
import java.util.Vector;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import us.avn.oms.domain.Crontab;
import us.avn.oms.domain.IdName;
import us.avn.oms.domain.Tag;
import us.avn.oms.service.CrontabService;
import us.avn.oms.service.TagService;

@RestController

@RequestMapping("/crontab")
public class CrontabRestController {
	
    /* Get actual class name to be printed on */
    private Logger log = LogManager.getLogger(this.getClass().getName());

	@Autowired 
	CrontabService crontabService;
	
	
	@RequestMapping(method = RequestMethod.GET, produces="application/json", value="/all")
	public Collection<Crontab> getAllCBs( ) {
		log.debug("get all control blocks");
		return crontabService.getAllCrontabRecords();
	}
	
	@RequestMapping(method = RequestMethod.GET, produces="application/json", value="/{id}")
	public Crontab getCrontab( @PathVariable Long id) {
		Crontab cb = new Crontab();
		if( ! id.equals(0L) ) { 
			cb = crontabService.getCrontabRecord(id);
			if( null == cb ) {
				cb = new Crontab();
				cb.setId(0L);
				cb.setName("New record");
			}
		}
		return cb;
	}
	
	@RequestMapping(method = RequestMethod.POST, value="/insert" )
	public void insertCrontab(@RequestBody Crontab cb ) {
		log.debug("Insert " + cb ); 
		crontabService.insertCrontab(cb);
	}

	@RequestMapping(method = RequestMethod.PUT, value="/update" )
	public void updateCrontab(@RequestBody Crontab cb ) {
		log.debug("Update " + cb);
		Crontab cbt = crontabService.getCrontabRecord(cb.getId());
		if( null == cbt ) {
			crontabService.insertCrontab(cb);
		} else {
			crontabService.updateCrontab(cb);
		}
	}

}
