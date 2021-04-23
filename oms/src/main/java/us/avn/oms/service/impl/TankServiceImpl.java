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
package us.avn.oms.service.impl;

import java.util.Collection;
import java.util.Iterator;

import org.springframework.beans.factory.annotation.Autowired;

import us.avn.oms.domain.AIValue;
import us.avn.oms.domain.ReferenceCode;
import us.avn.oms.domain.Tank;
import us.avn.oms.domain.Value;
import us.avn.oms.domain.Volume;
import us.avn.oms.mapper.AnalogInputMapper;
import us.avn.oms.mapper.ConfigMapper;
import us.avn.oms.mapper.TagMapper;
import us.avn.oms.mapper.TankMapper;
import us.avn.oms.service.TankService;

/**
 * Class: TankServiceImpl
 * Description: this provides the Java implementation of the 
 * 				tank service interface for the database
 * 
 * @author Allan
 */
public class TankServiceImpl implements TankService {


	private TankMapper tankMapper;
	
	public void setTankMapper( TankMapper tm ) {
		this.tankMapper = tm;
	}
	
	/* ************************************************ */

	
	/**
	 * Method: getAllTanks
	 * Description: get a collection of Tank objects for all the tanks
	 * 				in the refinery
	 * 
	 * @return Collection<Tank> all the tanks in the refinery
	 */
	@Override
	public Collection<Tank> getAllTanks( ) {
		return tankMapper.getAllTanks();
	}
	
	@Override
	/**
	 * Method: getAllTanksInField
	 * Description: get a collection of Tank objects for all the tanks
	 * 				in the specified Field
	 * 
	 * @param id (Long) requested field ID
	 * @return Collection<Tank> all the tanks in the specified field
	 */
	public Collection<Tank> getAllTanksInField( Long id ) {
		return tankMapper.getAllTanksInField( id );
	}

	@Override
	/**
	 * Method: getEstTankVolume
	 * Description: get estimated tank volume in barrels for
	 * 				the tank of this ID
	 * 
	 * @param id - tank ID
	 * @return - Value object (tank ID, code, value) w/estimated volume in barrels
	 */
	public Value getEstTankVolume( Long id ) {
		return tankMapper.getEstTankVolume(id);
	}
	
	@Override
	/**
	 * Get the value object (ID, contents code, volume) for the tank w/the least amount 
	 * (in barrels) for all the tanks w/the provided content code which is not currently 
	 * being used in a transfer
	 * 
	 * @param t - String - contents code
	 * @return Value object (tank ID, code, volume)
	 */
	public Value getEmptiestTankForContent( String t ) {
		Collection<Value>ct = tankMapper.getEmptiestTankForContent(t);
		return (Value)ct.toArray()[0];
	}
	
	/**
	 * Return the value object (ID, contents code, volume) for the tank w/the most amount
	 * (in barrels) for all the tanks w/the provided content code which is not currently 
	 * being used in a transfer
	 * 
	 * @param t - String - contents code
	 * @return Value object (tank ID, code, volume)
	 */
	@Override
	public Value getFullestTankForContent( String t ) {
		Collection<Value> ct = tankMapper.getFullestTankForContent(t);
		return (Value)ct.toArray()[0];
	}
	
	/**
	 * Return a collection of value objects (ID, contents code, volume) for
	 * the total amount currently stored for tanks for each content code, ie,
	 * the total amount currently stored for all crude tanks, 
	 * for all gasoline tanks, etc.
	 * 
	 * @return Collection<Value> object (ID is null, code, volume)
	 */
	@Override
	public Collection<Value> getTotalTankCapacitiesForContents() {
		return tankMapper.getTotalTankCapacitiesForContents();
	}

	/**
	 * Return a collection of value objects (ID, contents code, volume) for
	 * the total <b>possible</b> storage volume for tanks for 
	 * each content code, ie, the total amount currently stored
	 * for all crude tanks, for all gasoline tanks, etc.
	 * 
	 * @return Collection<Value> object (ID is null, code, volume)
	 */
	@Override
	public Collection<Value> getTotalTankVolumesForContents() {
		return tankMapper.getTotalTankVolumesForContents();
	}

	@Override
	/**
	 * Return a collection of value objects (ID, contents code, volume) for
	 * the total amount currently stored for tanks for each content code, ie,
	 * the total amount currently stored for all crude tanks, 
	 * for all gasoline tanks, etc.
	 * 
	 * @param t - String - contents code
	 * @return Collection<Value> object (tank ID, code, volume)
	 */
	public Collection<Value> getTankCapacitiesForContents( String t ) {
		return tankMapper.getTankCapacitiesForContents(t);
	}
	
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
	@Override
	public Value getFullestUnusedTankVolumeForContents( String t ) {
		Iterator<Value> ctv = tankMapper.getUnusedTankVolumesForContents(t).iterator();
		Value v = new Value(0L,t,0D);
		while( ctv.hasNext() ) {
			Value vt = ctv.next();
			if( vt.getValue() > v.getValue() ) {
				v = vt;
			}
		}
		return v;
	}
	
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
	@Override
	public Value getEmptiestUnusedTankVolumeForContents( String t ) {
		Iterator<Value> ctv = tankMapper.getUnusedTankVolumesForContents(t).iterator();
		Value v = new Value(0L,t,0D);
		while( ctv.hasNext() ) {
			Value vt = ctv.next();
			if( vt.getValue() < v.getValue() ) {
				v = vt;
			}
		}
		return v;		
	}
	
	/**
	 * get id and volume for all unused (i.e., not a source or destination for an active
	 * or pending transfer) tank volumes for the given contents code  
	 *
	 * @param t (String) contents code
	 * @return Collection of value objects (tank ID, contents, max possible volume) for all the 
	 * 			tanks containing the given contents
	 */
	@Override
	public Collection<Value> getUnusedTankVolumesForContents( String t ) {
		return tankMapper.getUnusedTankVolumesForContents(t);
	}
	
	/**
	 * Return a collection of tanks in Unit not involved in Active or Scheduled transfers
	 * 
	 * @param unit - name of unit
	 * @return Collection<Value> (tank ID, contents, max possible volume) for all the 
	 * 			tanks of the specified unit
	 */
	@Override
	public Collection<Value> getUnusedTankVolumesForUnit( String unit) {
		return tankMapper.getUnusedTankVolumesForUnit(unit);
	}
	
	/**
	 * Returns a Collection of Volume objects for the specified Tank
	 * <br>
	 * This is a mapping of level vs volume to allow for the computation
	 * (interpolation) of volume from level or level from volume
	 * <br>
	 * N.B., there is no temperature correction done.  These are specified for standard
	 * 		 temperature, i.e, 300 degrees C. 
	 * 
	 * @param id
	 * @return <Volume> object
	 */
	@Override
	public Collection<Volume> getLevelVolumesForTank(Long id) {
		return tankMapper.getLevelVolumesForTank(id);
	}
	
	/**
	 * Returns the tank record for the given ID
	 * 
	 * @param id (Long) tank ID to retrieve
	 * @return <Tank> tank object retrieved, null if not present
	 */
	@Override
	public Tank getTank( Long id) {
		Tank t = tankMapper.getTank(id);
		if( t == null ) {
			t = new Tank(0L,"New Tank");
		} else {
			t.setVolumes(tankMapper.getLevelVolumesForTank(id));
		}
		return t;
	}
	
	/**
	 * Update the DB record for the given tank object
	 * 
	 * @param t (Tank)
	 */
	@Override
	public void updateTank( Tank tk ) {
		tankMapper.updateTank( tk );
	}

	/**
	 * Add provided tank object to database
	 * 
	 * @param t - Tank to insert
	 */
	@Override
	public void insertTank( Tank tk ) {
		tankMapper.insertTank(tk);
	}

}