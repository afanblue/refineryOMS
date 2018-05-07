package it.avn.oms.mapper;

import java.util.Collection;

import it.avn.oms.domain.DigitalInput;
import it.avn.oms.domain.ReferenceCode;
import it.avn.oms.domain.Taglet;

public interface DigitalInputMapper {
	
	Collection<DigitalInput> getAllDigitalInputs( );
	
	Collection<DigitalInput> getAllActiveDItags( );

	Collection<DigitalInput> getAllUpdatedDItags( );

	Collection<Taglet> getAllDITaglets( String tc );
	
	DigitalInput getDigitalInput( Long id );
	
	Collection<ReferenceCode> getAllHistoryTypes();
	
	void updateDigitalInput( DigitalInput di );

	void updateDigitalInputStatic( DigitalInput di );

	Long insertDigitalInput( DigitalInput di );

}
