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
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import us.avn.oms.domain.Config;
import us.avn.oms.domain.Customer;
import us.avn.oms.domain.IdName;
import us.avn.oms.domain.RelTagTag;
import us.avn.oms.domain.User;
import us.avn.oms.service.ConfigService;
import us.avn.oms.service.CustomerService;

@RestController

@RequestMapping("/customer")
public class CustomerRestController {
	
    /* Get actual class name to be printed on */
    private Logger log = LogManager.getLogger(this.getClass().getName());

	@Autowired 
	CustomerService customerService;

	@RequestMapping(method = RequestMethod.GET, produces="application/json", value="/all")
	public Collection<Customer> getAllCustomers( ) {
		log.debug("get all configuration items");
		return customerService.getAllCustomers();
	}
		
	@RequestMapping(method = RequestMethod.GET, produces="application/json", value="/{id}")
	public Customer getCustomerByName( @PathVariable Long id) {
		return customerService.getCustomer(id);
	}
	
	@RequestMapping(method = RequestMethod.PUT, value="/update" )
	public void updateCustomer(@RequestBody Customer c ) {
		if( c.getId() == 0L ) {
			customerService.insertCustomer(c);
		} else {
			customerService.updateCustomer(c);
		}
	}

	@RequestMapping(method = RequestMethod.POST, value="/insert" )
	public void insertCustomer(@RequestBody Customer c ) {
		if( c.getId() == 0L ) {
			customerService.insertCustomer(c);
		} else {
			customerService.updateCustomer(c);
		}
	}

}
