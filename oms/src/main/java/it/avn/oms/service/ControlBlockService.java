package it.avn.oms.service;

import java.util.Collection;

import it.avn.oms.domain.ControlBlock;


public interface ControlBlockService {
	
	public Collection<ControlBlock> getAllAOs( );
	
	public Collection<ControlBlock> getAllDOs( );

}
