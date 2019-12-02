package us.avn.oms.mapper;

import java.util.Collection;

import us.avn.oms.domain.Address;

public interface AddressMapper {

	Collection<Address> getAddressesForDevice( Long devId );
	
	Collection<Address> getActiveAddressesForDeviceByType( Long devId, String type);
	
	Address getAddress( Long id);
		
	Long insertAddress( Address addr );

	void updateAddress( Address addr );

}
