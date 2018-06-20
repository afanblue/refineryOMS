package us.avn.oms.mapper;

import java.util.Collection;

import us.avn.oms.domain.AIValue;
import us.avn.oms.domain.AnalogInput;
import us.avn.oms.domain.IdName;
import us.avn.oms.domain.ReferenceCode;

public interface AnalogInputMapper {
	
	Collection<AnalogInput> getAllAnalogInputs( );
	
	Collection<AnalogInput> getAllActiveAItags( );

	Collection<AnalogInput> getAllUpdatedAItags( );

	Collection<AnalogInput> getAllAnalogInputsByType( String tc );
	
	Collection<IdName> getAllAIIdNameByType( String tc );
	
	public Collection<ReferenceCode> getAllAnalogInputTypes();

	public Collection<ReferenceCode> getAllHistoryTypes();
	
	AnalogInput getAnalogInput( Long id );
	
	Collection<AIValue> getCurrentAIValues();
	
	void updateAnalogInput( AnalogInput ai );

	void updateAnalogInputStatic( AnalogInput ai );

	Long insertAnalogInput( AnalogInput ai );
	
	Collection<AIValue> getProcUnitValues( String un);

}
