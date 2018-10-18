/*******************************************************************************
 * Copyright (C) 2018 A. E. Van Ness
 *  
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *  
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *******************************************************************************/
package us.avn.oms.service;

import java.util.Collection;

import us.avn.oms.domain.Unit;
import us.avn.oms.domain.UnitConversion;
import us.avn.oms.domain.UnitType;


public interface UnitService {
	
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
