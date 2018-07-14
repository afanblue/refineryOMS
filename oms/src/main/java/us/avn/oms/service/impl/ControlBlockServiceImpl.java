package us.avn.oms.service.impl;

import java.util.Collection;
import java.util.Iterator;
import java.util.Vector;

import org.springframework.beans.factory.annotation.Autowired;

import us.avn.oms.domain.ControlBlock;
import us.avn.oms.mapper.ControlBlockMapper;
import us.avn.oms.mapper.TagMapper;
import us.avn.oms.service.ControlBlockService;

public class ControlBlockServiceImpl implements ControlBlockService {


	private ControlBlockMapper cbMapper;
	
	public void setControlBlockMapper( ControlBlockMapper cbm ) {
		this.cbMapper = cbm;
	}
	
	
	@Override
	public Collection<ControlBlock> getAllAOs( ) {
		return cbMapper.getAllAOs();
	}
	
	@Override
	public Collection<ControlBlock> getAllCBs( ) {
		return cbMapper.getAllCBs();
	}
	
	@Override
	public Collection<ControlBlock> getAllDOs( ) {
		return cbMapper.getAllDOs();
	}
	
	@Override
	public ControlBlock getControlBlock( Long id ) {
		return cbMapper.getControlBlock( id );
	}
	
	@Override
	public void insertControlBlock( ControlBlock cb ) {
		cbMapper.insertControlBlock(cb);
	}
	
	public void updateControlBlock( ControlBlock cb ) {
		cbMapper.updateControlBlock(cb);
	}


}