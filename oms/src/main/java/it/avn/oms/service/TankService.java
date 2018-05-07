package it.avn.oms.service;

import java.util.Collection;

import it.avn.oms.domain.AIValue;
import it.avn.oms.domain.ReferenceCode;
import it.avn.oms.domain.Tank;
import it.avn.oms.domain.Volume;


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
