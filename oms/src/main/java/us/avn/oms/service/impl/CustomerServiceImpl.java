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
package us.avn.oms.service.impl;

import java.util.Collection;

import us.avn.oms.domain.Customer;
import us.avn.oms.domain.IdName;
import us.avn.oms.mapper.CustomerMapper;
import us.avn.oms.service.CustomerService;

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