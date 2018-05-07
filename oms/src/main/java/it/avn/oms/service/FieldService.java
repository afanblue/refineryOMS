package it.avn.oms.service;

import java.util.Collection;

import it.avn.oms.domain.AIValue;
import it.avn.oms.domain.Field;

public interface FieldService {
	
	public Field getFieldDefinition( Long id );
	
	public Field getFieldByName( String fn );
	
	public Field getFieldForDisplay( Long id );
	
	public Collection<Field> getAllFields();
	
	public Collection<AIValue> getFieldObjects( String f );

	public void updateField( Field f );

    public Long insertField( Field f );
    
}
