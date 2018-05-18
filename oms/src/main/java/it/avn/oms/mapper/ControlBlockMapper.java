package it.avn.oms.mapper;

import java.util.Collection;

import it.avn.oms.domain.ControlBlock;

public interface ControlBlockMapper {
	
	Collection<ControlBlock> getAllDOs( );
	
	Collection<ControlBlock> getAllAOs( );

}
