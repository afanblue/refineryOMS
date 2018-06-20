package us.avn.oms.mapper;

import java.util.Collection;

import us.avn.oms.domain.Unit;
import us.avn.oms.domain.UnitConversion;
import us.avn.oms.domain.UnitType;

public interface UnitMapper {
	
	Collection<UnitType> getAllUnitTypes();

	UnitType getUnitType( Long id );
	
	void insertUnitType( UnitType ut );

	void updateUnitType( UnitType ut );

/*  ************************************** */
	
	Collection<Unit> getAllUnits( );
	
	Unit getUnit( Long id );

	void insertUnit( Unit u );

	void updateUnit( Unit u );
	
/*  ************************************** */
	
	Collection<UnitConversion> getAllUnitConversions();

	UnitConversion getUnitConversion( Long id );
	
	void insertUnitConversion( UnitConversion uc );

	void updateUnitConversion( UnitConversion uc );

}
