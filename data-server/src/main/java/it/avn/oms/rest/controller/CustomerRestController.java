package it.avn.oms.rest.controller;

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


import it.avn.oms.domain.Config;
import it.avn.oms.domain.Customer;
import it.avn.oms.domain.IdName;
import it.avn.oms.domain.RelTagTag;
import it.avn.oms.domain.User;
import it.avn.oms.service.ConfigService;
import it.avn.oms.service.CustomerService;

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
