package us.avn.oms.service.impl;

import java.util.Collection;
import java.util.Iterator;
import java.util.Vector;

import org.springframework.beans.factory.annotation.Autowired;

import us.avn.oms.domain.ControlBlock;
import us.avn.oms.mapper.ControlBlockMapper;
import us.avn.oms.service.ControlBlockService;

public class ControlBlockServiceImpl implements ControlBlockService {


	private ControlBlockMapper cbMapper;
	
	public void setControlBlockMapper( ControlBlockMapper cb ) {
		this.cbMapper = cb;
	}
	
	@Override
	public Collection<ControlBlock> getAllAOs( ) {
		return cbMapper.getAllAOs();
	}
	
	@Override
	public Collection<ControlBlock> getAllDOs( ) {
		return cbMapper.getAllDOs();
	}

}