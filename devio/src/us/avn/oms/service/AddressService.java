package us.avn.oms.service;

import java.util.Collection;

import us.avn.oms.domain.Address;
import us.avn.oms.domain.Device;
import us.avn.oms.domain.IdName;

public interface AddressService {

	Collection<Address> getAddressesForDevice( Long devId );
	
	Collection<Address> getActiveAddressesForDeviceByType( Long devId, String type);
	
	Address getAddress( Long id);
		
	Long insertAddress( Address addr );

	void updateAddress( Address addr );

}
