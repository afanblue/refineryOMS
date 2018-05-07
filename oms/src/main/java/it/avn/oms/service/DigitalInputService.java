package it.avn.oms.service;

import java.util.Collection;

import it.avn.oms.domain.AnalogInput;
import it.avn.oms.domain.DigitalInput;
import it.avn.oms.domain.ReferenceCode;
import it.avn.oms.domain.Taglet;


public interface DigitalInputService {
	
	public Collection<DigitalInput> getAllDigitalInputs( );
	
	public Collection<DigitalInput> getAllActiveDItags( );

	public Collection<DigitalInput> getAllUpdatedDItags( );

	public Collection<Taglet> getAllDITaglets( String tc );
	
	public DigitalInput getDigitalInput( Long id );
	
	public Collection<ReferenceCode> getAllHistoryTypes();
	
	public void updateDigitalInput( DigitalInput di );

	public void updateDigitalInputStatic( DigitalInput di );

	public Long insertDigitalInput( DigitalInput di );

}
