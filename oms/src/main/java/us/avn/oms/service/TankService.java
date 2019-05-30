/*******************************************************************************
 * Copyright (C) 2018 Laboratorio de Lobo Azul
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

import us.avn.oms.domain.AIValue;
import us.avn.oms.domain.ReferenceCode;
import us.avn.oms.domain.Tank;
import us.avn.oms.domain.Value;
import us.avn.oms.domain.Volume;

/**
 * Interface: TankService
 * Description: This provides the CRUD interface (a bit more than less)
 * 				for the Tank and Volume tables
 * 
 * @author Allan
 */
public interface TankService {
	
	/**
	 * Method: getAllTanks
	 * Description: get a collection of Tank objects for all the tanks
	 * 				in the refinery
	 *
	 * @return collection of all the tanks in the refinery
	 */
	public Collection<Tank> getAllTanks( );
	
	/**
	 * Method: getAllTanksInField
	 * Description: get a collection of Tank objects for all the tanks
	 * 				in the specified Field
	 *
	 * @param id (Long) requested field ID
	 * @return collection of all the tanks in the specified field
	 */
	public Collection<Tank> getAllTanksInField( Long id );
	
	/**
	 * Method: getEstTankVolume
	 * Description: get estimated tank volume in barrels for
	 * 				the tank of this ID
	 * 
	 * @param id - tank ID
	 * @return - Value object (tank ID, code, value) w/estimated volume in barrels
	 */
	Value getEstTankVolume( Long id );
	
	/**
	 * Method: getEmptiestTankForContent
	 * Description: get the value object (ID, contents code, volume) for
	 * 				the tank w/the most amount available for storage (in barrels)
	 * 				for all the tanks w/the provided content code
	 *
	 * @param t - String - contents code
	 * @return Value object (tank ID, code, volume)
	 */
	Value getEmptiestTankForContent( String t );
	
	/**
	 * Method: getFullestTankForContent
	 * Description: get the value object (ID, contents code, volume) for
	 * 				the tank w/the least amount available for storage (in barrels)
	 * 				for all the tanks w/the provided content code
	 * 
	 * @param t - String - contents code
	 * @return Value object (tank ID, code, volume)
	 */
	Value getFullestTankForContent( String t );
	
	/**
	 * Method: getTotalTankCapacitiesForContent
	 * Description: get a collection of value objects (ID, contents code, volume) for
	 * 				the total amount currently stored for tanks for each content code, ie,
	 * 				the total amount currently stored for all crude tanks, 
	 * 				for all gasoline tanks, etc.
	 * 
	 * @return Collection of value objects (ID is null, code, volume)
	 */
	Collection<Value> getTotalTankCapacitiesForContents();

	/**
	 * Method: getTotalTankVolumesForContent
	 * Description: get a collection of value objects (ID, contents code, volume) for
	 * 				the total <b>possible</b> storage volume for tanks for 
	 * 				each content code, ie, the total amount currently stored
	 * 				for all crude tanks, for all gasoline tanks, etc.
	 *
	 * @return Collection of value objects (ID is null, code, volume)
	 */
	Collection<Value> getTotalTankVolumesForContents();

	/**
	 * Method: getTankCapacitiesForContent
	 * Description: get a collection of value objects (ID, contents code, volume) for
	 * 				the total amount currently stored for tanks for each content code, ie,
	 * 				the total amount currently stored for all crude tanks, 
	 * 				for all gasoline tanks, etc.
	 *
	 * @param t - String - contents code
	 * @return Collection of value objects (tank ID, code, volume)
	 */
	Collection<Value> getTankCapacitiesForContents( String t );
	
	/**
	 * Method: getTankVolumesForContents
	 * Description: for the given refinery unit, 
	 *
	 * @param t (String) contents code
	 * @return Collection of value objects (tank ID, contents, max possible volume) for all the 
	 * 			tanks containing the given contents
	 */
	Collection<Value> getTankVolumesForContents( String t );
	
	/**
	 * Method: getTankVolumesForUnit
	 * Description: for the given refinery unit, 
	 * 
	 * @param n (String) name of refinery unit
	 * @return Collection of value objects (tank ID, contents, max possible volume) for all the 
	 * 			tanks of the specified unit
	 */
	Collection<Value> getTankVolumesForUnit( String n);
	
	/**
	 * Method: getLevelVolumesForTank
	 * Description: returns a Collection of Volume objects for the specified Tank
	 * 				This is a mapping of level vs volume to allow for the computation
	 * 				(interpolation) of volume from level or level from volume
	 * N.B., there is no temperature correction done.  These are specified for standard
	 * 		 temperature, i.e, 300 degrees C. 
	 *
	 * @param id (Long) ID of tank to get volume objects for
	 * @return collection of volume objects for tank
	 */
	Collection<Volume> getLevelVolumesForTank( Long id);
	
	/**
	 * Method: getTank
	 * Description: get the tank record for the given ID
	 * 
	 * @param id (Long) tank ID to retrieve
	 * @return Tank object retrieved, null if not present
	 */
	public Tank getTank( Long id);
	
	/**
	 * Method: updateTank
	 * Description: update the DB record for the given tank object
	 * 
	 * @param t (Tank)
	 */
	void updateTank( Tank t );

	/**
	 * Method: insertTank
	 * Description: add provided tank object to database
	 * 
	 * @param t - Tank to insert
	 */
	void insertTank( Tank t );

}
