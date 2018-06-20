package us.avn.oms.service.impl;

import java.util.Collection;

import us.avn.oms.domain.Vessel;
import us.avn.oms.mapper.CustomerMapper;
import us.avn.oms.mapper.TagMapper;
import us.avn.oms.mapper.VesselMapper;
import us.avn.oms.service.VesselService;

public class VesselServiceImpl implements VesselService {


	private VesselMapper vesselMapper;
	private CustomerMapper customerMapper;
	private TagMapper tagMapper;
	
	public void setVesselMapper( VesselMapper vm ) {
		this.vesselMapper = vm;
	}
	
	public void setCustomerMapper( CustomerMapper cm ) {
		this.customerMapper = cm;
	}
	
	public void setTagMapper( TagMapper tm ) {
		this.tagMapper = tm;
	}
	
	@Override
	public Collection<Vessel> getAllVessels( ) {
		return vesselMapper.getAllVessels();
	}
	
	@Override
	public Vessel getVessel( Long id) {
		return vesselMapper.getVessel(id);
	}
	
	@Override
	public Vessel getVessel( String name) {
		return vesselMapper.getVesselByName(name);
	}

	@Override
	public Long updateVessel( Vessel v ) {
		vesselMapper.updateVessel(v);
		return 1L;
	}

	@Override
	public Long insertVessel( Vessel c ) {		
		vesselMapper.insertVessel(c);
		return 1L;
	}

}