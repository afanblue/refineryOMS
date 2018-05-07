package it.avn.oms.mapper;

import java.util.Collection;

import it.avn.oms.domain.AIValue;
import it.avn.oms.domain.ReferenceCode;
import it.avn.oms.domain.Tank;
import it.avn.oms.domain.Volume;

public interface TankMapper {
	
	Collection<Tank> getAllTanks( );
	
	Collection<Tank> getAllTanksInField( Long id );
	
	Collection<ReferenceCode> getAllContentTypes();
	
	Collection<AIValue> getTankVolumesForUnit( String n);
	
	Collection<Volume> getLevelVolumesForTank( Long id );
	
	Tank getBaseTank( Long id );
	
	Tank getTank( Long id);
	
	Integer updateTank( Tank cfg );

	Integer insertTank( Tank cfg );

}
