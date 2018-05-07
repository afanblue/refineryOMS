package it.avn.oms.mapper;

import java.util.Collection;

import it.avn.oms.domain.Vessel;


public interface VesselMapper {
	
	Collection<Vessel> getAllVessels( );
	
	Vessel getVessel( Long id );
	
	Vessel getVesselByName( String name );

	Long updateVessel( Vessel v );

	Long insertVessel( Vessel v );

}
