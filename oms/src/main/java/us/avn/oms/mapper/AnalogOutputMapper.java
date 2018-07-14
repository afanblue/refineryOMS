package us.avn.oms.mapper;

import java.util.Collection;

import us.avn.oms.domain.AnalogOutput;
import us.avn.oms.domain.IdName;
import us.avn.oms.domain.ReferenceCode;

public interface AnalogOutputMapper {
	
	Collection<AnalogOutput> getAllActiveAOtags( );

	Collection<AnalogOutput> getAllAnalogOutputs( );
	
//	AnalogOutput getBaseAnalogOutput( Long id);
	
	AnalogOutput getAnalogOutput( Long id );
	
//	Collection<AOValue> getCurrentAOValues();
	
	public Collection<ReferenceCode> getAllHistoryTypes();
	
	void updateAnalogOutput( AnalogOutput ai );

	void updateAnalogOutputStatic( AnalogOutput ai );

	Long insertAnalogOutput( AnalogOutput ai );
	
}
