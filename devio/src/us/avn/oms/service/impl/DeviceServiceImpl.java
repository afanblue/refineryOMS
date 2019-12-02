package us.avn.oms.service.impl;

import java.util.Collection;

import us.avn.oms.domain.Device;
import us.avn.oms.domain.IdName;
import us.avn.oms.mapper.DeviceMapper;
import us.avn.oms.service.DeviceService;

public class DeviceServiceImpl implements DeviceService {

	public DeviceServiceImpl() {
		// TODO Auto-generated constructor stub
	}

	private DeviceMapper deviceMapper;
	
	public void setDeviceMapper( DeviceMapper dm ) {
		this.deviceMapper = dm;
	}
	

	public Collection<IdName> getAllDeviceTypes() {
		return deviceMapper.getAllDeviceTypes();
	}
	
	public Collection<Device> getAllDevices( ) {
		return deviceMapper.getAllDevices();
	}
	
	public Collection<Device> getAllActiveDevices() {
		return deviceMapper.getAllActiveDevices();
	}
	
	public Collection<Device> getAllActiveDevicesOfType( Long t ) {
		return deviceMapper.getAllActiveDevicesOfType(t);
	}
	
	public Device getDevice( Long id) {
		return deviceMapper.getDevice(id);
	}
		
	public void updateDevice( Device d ) {
		deviceMapper.updateDevice(d);
	}

	public Long insertDevice( Device d ) {
		deviceMapper.insertDevice(d);
		return d.getId();
	}

}
