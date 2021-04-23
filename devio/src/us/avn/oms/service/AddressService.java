package us.avn.oms.service;

import java.util.Collection;

import us.avn.oms.domain.Address;
//import us.avn.oms.domain.Device;
//import us.avn.oms.domain.IdName;

public interface AddressService {

	/**
	 * Get addresses for device 
	 * @param devId ID of device 
	 * @return addresses for device
	 */
	Collection<Address> getAddressesForDevice( Long devId );
	
	/**
	 * Get active addresses for specified device and type that need to be
	 * processed.  The scanning/processing takes place every 10 seconds. 
	 * The selection is based on mod(sec, cycle_time) = offset * 10.  It
	 * is therefore possible w/an injudicious choice of cycle time and offset
	 * that the tad/address will never be processed, e.g., cycle time of 50
	 * @param devId ID of device
	 * @param type device (tag) type ... AI, AO, DO, DI)
	 * @param sec seconds in the hour
	 * @return collection of active addresses
	 */
	Collection<Address> getActiveAddressesForDeviceByType( Long devId, String type, Integer sec);
	
	Address getAddress( Long id);
		
	Long insertAddress( Address addr );

	void updateAddress( Address addr );

}
