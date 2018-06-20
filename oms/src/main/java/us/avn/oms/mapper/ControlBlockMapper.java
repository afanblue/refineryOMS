package us.avn.oms.mapper;

import java.util.Collection;

import us.avn.oms.domain.ControlBlock;

public interface ControlBlockMapper {
	
	Collection<ControlBlock> getAllDOs( );
	
	Collection<ControlBlock> getAllAOs( );

}
