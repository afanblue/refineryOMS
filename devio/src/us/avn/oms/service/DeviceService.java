package us.avn.oms.service;

import java.util.Collection;

import us.avn.oms.domain.Device;
import us.avn.oms.domain.IdName;

public interface DeviceService {

	Collection<IdName> getAllDeviceTypes();
	
	Collection<Device> getAllDevices( );
	
	Collection<Device> getAllActiveDevices( Integer sec );
	
	Collection<Device> getAllActiveDevicesOfType( Long t );
		
	Device getDevice( Long id);
		
	void updateDevice( Device d );

	Long insertDevice( Device d );


}
