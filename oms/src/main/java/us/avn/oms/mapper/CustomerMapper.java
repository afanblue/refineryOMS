package us.avn.oms.mapper;

import java.util.Collection;

import us.avn.oms.domain.Customer;
import us.avn.oms.domain.IdName;


public interface CustomerMapper {
	
	Collection<Customer> getAllCustomers( );
	
	Collection<IdName> getAllCustomersAsIdNames( );
	
	Customer getCustomer( Long id );
	
	Customer getCustomerByName( String name );

	Long updateCustomer( Customer c );

	Long insertCustomer( Customer c );

}
