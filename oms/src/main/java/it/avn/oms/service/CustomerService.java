package it.avn.oms.service;

import java.util.Collection;

import it.avn.oms.domain.Customer;
import it.avn.oms.domain.IdName;


public interface CustomerService {
	
	public Collection<Customer> getAllCustomers( );
	
	public Collection<IdName> getAllCustomersAsIdNames( );
	
	public Customer getCustomer( Long id);
	
	public Customer getCustomerByName( String name);

	public Long updateCustomer( Customer c );

	public Long insertCustomer( Customer c );

}
