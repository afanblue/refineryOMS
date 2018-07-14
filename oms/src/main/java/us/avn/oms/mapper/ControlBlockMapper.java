package us.avn.oms.mapper;

import java.util.Collection;

import us.avn.oms.domain.ControlBlock;

public interface ControlBlockMapper {
	
	Collection<ControlBlock> getAllAOs( );
	
	Collection<ControlBlock> getAllCBs( );
	
	Collection<ControlBlock> getAllDOs( );
	
	ControlBlock getControlBlock( Long id );
	
	void insertControlBlock( ControlBlock cb );
	
	void updateControlBlock( ControlBlock cb );

}
