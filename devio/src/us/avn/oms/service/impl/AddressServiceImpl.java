package us.avn.oms.service.impl;

import java.util.Collection;

import us.avn.oms.domain.Address;
import us.avn.oms.mapper.AddressMapper;
import us.avn.oms.service.AddressService;

public class AddressServiceImpl implements AddressService {

	public AddressServiceImpl() {
	}

	private AddressMapper addrMapper;
	
	public void setAddressMapper( AddressMapper am ) {
		this.addrMapper = am;
	}
	
	public Collection<Address> getAddressesForDevice( Long devId ) {
		return addrMapper.getAddressesForDevice(devId);
	}
	
	public Collection<Address> getActiveAddressesForDeviceByType( Long devId, String type, Integer sec ) {
		return addrMapper.getActiveAddressesForDeviceByType(devId, type, sec);
	}
	
	public Address getAddress( Long id) {
		return addrMapper.getAddress(id);
	}
		
	public Long insertAddress( Address addr ) {
		addrMapper.insertAddress(addr);
		return addr.getId();
	}

	public void updateAddress( Address addr ) {
		addrMapper.updateAddress(addr);
	}

}
