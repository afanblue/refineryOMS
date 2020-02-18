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
	 * Get a collection of Tank objects for all the tanks
	 * 	in the refinery
	 *
	 * @return collection of all the tanks in the refinery
	 */
	public Collection<Tank> getAllTanks( );
	
	/**
	 * Get a collection of Tank objects for all the tanks
	 * 	in the specified Field
	 *
	 * @param id (Long) requested field ID
	 * @return collection of all the tanks in the specified field
	 */
	public Collection<Tank> getAllTanksInField( Long id );
	
	/**
	 * Get estimated tank volume in barrels for the tank of this ID
	 * 
	 * @param id - tank ID
	 * @return - Value object (tank ID, code, value) w/estimated volume in barrels
	 */
	Value getEstTankVolume( Long id );
	
	/**
	 * Get the value object (ID, contents code, volume) for
	 * 	the tank w/the most amount available for storage (in barrels)
	 * 	for all the tanks w/the provided content code
	 *
	 * @param t - String - contents code
	 * @return Value object (tank ID, code, volume)
	 */
	Value getEmptiestTankForContent( String t );
	
	/**
	 * Get the value object (ID, contents code, volume) for
	 * 	the tank w/the least amount available for storage (in barrels)
	 * 	for all the tanks w/the provided content code
	 * 
	 * @param t - String - contents code
	 * @return Value object (tank ID, code, volume)
	 */
	Value getFullestTankForContent( String t );
	
	/**
	 * Get a collection of value objects (ID, contents code, volume) for
	 * 				the total amount currently stored for tanks for each content code, ie,
	 * 				the total amount currently stored for all crude tanks, 
	 * 				for all gasoline tanks, etc.
	 * 
	 * @return Collection of value objects (ID is null, code, volume)
	 */
	Collection<Value> getTotalTankCapacitiesForContents();

	/**
	 * Get a collection of value objects (ID, contents code, volume) for
	 * 				the total <b>possible</b> storage volume for tanks for 
	 * 				each content code, ie, the total amount currently stored
	 * 				for all crude tanks, for all gasoline tanks, etc.
	 *
	 * @return Collection of value objects (ID is null, code, volume)
	 */
	Collection<Value> getTotalTankVolumesForContents();

	/**
	 * get id and volume for the unused (i.e., not a source or destination for an active
	 * or pending transfer) tank with the most volume for the given contents code.  The 
	 * volume computed here is a simple "volume of the cylinder" computation and should
	 * not be used in any transfers. 
	 *
	 * @param t (String) contents code
	 * @return Value object (tank ID, contents, max volume) for all the 
	 * 			tank with the  containing the given contents
	 */
	Value getFullestUnusedTankVolumeForContents( String t );
	
	/**
	 * get id and volume for the unused (i.e., not a source or destination for an active
	 * or pending transfer) tank with the least volume for the given contents code.  The 
	 * volume computed here is a simple "volume of the cylinder" computation and should
	 * not be used in any transfers.   
	 *
	 * @param t (String) contents code
	 * @return Value object (tank ID, contents, min  volume) for all the 
	 * 			tank with the least volume containing the given contents
	 */
	Value getEmptiestUnusedTankVolumeForContents( String t );
	
	/**
	 * Get a collection of value objects (ID, contents code, volume) for
	 * 				the total amount currently stored for tanks for each content code, ie,
	 * 				the total amount currently stored for all crude tanks, 
	 * 				for all gasoline tanks, etc.
	 *
	 * @param t - String - contents code
	 * @return Collection of value objects (tank ID, code, volume)
	 */
	Collection<Value> getTankCapacitiesForContents( String t );
	
	/**
	 * get id and volume for all unused (i.e., not a source or destination for an active
	 * or pending transfer) tank volumes for the given contents code  
	 *
	 * @param t (String) contents code
	 * @return Collection of value objects (tank ID, contents, max possible volume) for all the 
	 * 			tanks containing the given contents
	 */
	Collection<Value> getUnusedTankVolumesForContents( String t );
	
	/**
	 * Return collection of tanks in Unit not involved in Active or Scheduled transfers
	 * 
	 * @param unit - name of refinery unit
	 * @return Collection of value objects (tank ID, contents, max possible volume) for all the 
	 * 			tanks of the specified unit
	 */
	Collection<Value> getUnusedTankVolumesForUnit( String unit);
	
	/**
	 * Returns a Collection of Volume objects for the specified Tank
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
	 * Get the tank record for the given ID
	 * 
	 * @param id (Long) tank ID to retrieve
	 * @return Tank object retrieved, null if not present
	 */
	public Tank getTank( Long id);
	
	/**
	 * Update the DB record for the given tank object
	 * 
	 * @param t (Tank)
	 */
	void updateTank( Tank t );

	/**
	 * Add provided tank object to database
	 * 
	 * @param t - Tank to insert
	 */
	void insertTank( Tank t );

}
