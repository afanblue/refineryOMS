package it.avn.oms.service;

import java.util.Collection;

import it.avn.oms.domain.Vessel;


public interface VesselService {
	
	public Collection<Vessel> getAllVessels( );
	
	public Vessel getVessel( Long id);
	
	public Vessel getVessel( String name);

	public Long updateVessel( Vessel c );

	public Long insertVessel( Vessel c );

}
