package us.avn.oms.service;

import java.util.Collection;

import us.avn.oms.domain.AIValue;
import us.avn.oms.domain.ReferenceCode;
import us.avn.oms.domain.Tank;
import us.avn.oms.domain.Volume;


public interface TankService {
	
	public Collection<Tank> getAllTanks( );
	
	public Collection<Tank> getAllTanksInField( Long id );
	
	Collection<ReferenceCode> getAllContentTypes();
	
	Collection<AIValue> getTankVolumesForUnit( String n);
	
	Collection<Volume> getLevelVolumesForTank( Long id);
	
	public Tank getBaseTank( Long id);
	
	public Tank getTank( Long id);
	
	void updateTank( Tank t );

	void insertTank( Tank t );

}
