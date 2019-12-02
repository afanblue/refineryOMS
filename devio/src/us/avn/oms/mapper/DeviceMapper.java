package us.avn.oms.mapper;

import java.util.Collection;

import us.avn.oms.domain.Device;
import us.avn.oms.domain.IdName;

public interface DeviceMapper {

	Collection<IdName> getAllDeviceTypes();
	
	Collection<Device> getAllDevices( );
	
	Collection<Device> getAllActiveDevices();
	
	Collection<Device> getAllActiveDevicesOfType( Long t );
	
	Device getDevice( Long id);
		
	Long insertDevice( Device d );

	void updateDevice( Device d );

}
