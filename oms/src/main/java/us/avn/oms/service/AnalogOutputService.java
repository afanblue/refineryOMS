package us.avn.oms.service;

import java.util.Collection;

import us.avn.oms.domain.AnalogOutput;
import us.avn.oms.domain.IdName;
import us.avn.oms.domain.ReferenceCode;


public interface AnalogOutputService {
	
	public Collection<AnalogOutput> getAllActiveAOtags( );

	public Collection<AnalogOutput> getAllAnalogOutputs( );
	
//	public AnalogOutput getBaseAnalogOutput( Long id);
	
	public AnalogOutput getAnalogOutput( Long id);
	
//	public Collection<AIValue> getCurrentAOValues();
	
	public Collection<ReferenceCode> getAllHistoryTypes();
	
	public void updateAnalogOutput( AnalogOutput ai );

	public void updateAnalogOutputStatic( AnalogOutput ai );

	public Long insertAnalogOutput( AnalogOutput ai );

}
