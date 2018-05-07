package it.avn.oms.service.impl;

import java.util.Collection;

//import org.springframework.beans.factory.annotation.Autowired;

import it.avn.oms.domain.Customer;
import it.avn.oms.domain.IdName;
import it.avn.oms.mapper.CustomerMapper;
import it.avn.oms.service.CustomerService;

public class CustomerServiceImpl implements CustomerService {


	private CustomerMapper customerMapper;
	
	public void setCustomerMapper( CustomerMapper cm ) {
		this.customerMapper = cm;
	}
	
	@Override
	public Collection<Customer> getAllCustomers( ) {
		return customerMapper.getAllCustomers();
	}
	
	@Override
	public Collection<IdName> getAllCustomersAsIdNames( ) {
		return customerMapper.getAllCustomersAsIdNames();
	}
	
	@Override
	public Customer getCustomer( Long id) {
		return customerMapper.getCustomer(id);
	}
	
	@Override
	public Customer getCustomerByName( String name) {
		return customerMapper.getCustomerByName(name);
	}

	@Override
	public Long updateCustomer( Customer c ) {
		customerMapper.updateCustomer(c);
		return 1L;
	}

	@Override
	public Long insertCustomer( Customer c ) {
		customerMapper.insertCustomer(c);
		return 1L;
	}

}