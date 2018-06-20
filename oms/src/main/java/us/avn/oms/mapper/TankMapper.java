package us.avn.oms.mapper;

import java.util.Collection;

import us.avn.oms.domain.AIValue;
import us.avn.oms.domain.ReferenceCode;
import us.avn.oms.domain.Tank;
import us.avn.oms.domain.Volume;

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
