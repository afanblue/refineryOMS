package us.avn.oms.service;

import java.util.Collection;

import us.avn.oms.domain.ControlBlock;


public interface ControlBlockService {
	
	public Collection<ControlBlock> getAllAOs( );
	
	public Collection<ControlBlock> getAllCBs( );

	public Collection<ControlBlock> getAllDOs( );

	public ControlBlock getControlBlock( Long id );
	
	public void insertControlBlock( ControlBlock cb );
	
	public void updateControlBlock( ControlBlock cb );

}
