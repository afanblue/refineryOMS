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
package us.avn.oms.mapper;

import java.util.Collection;

import us.avn.oms.domain.AIValue;
import us.avn.oms.domain.ReferenceCode;
import us.avn.oms.domain.Tank;
import us.avn.oms.domain.Value;
import us.avn.oms.domain.Volume;

public interface TankMapper {
	
	Collection<Tank> getAllTanks( );
	
	Collection<Tank> getAllTanksInField( Long id );
	
	Value getEstTankVolume( Long id );
	
	Value getEmptiestTankForContent( String t );
	
	Value getFullestTankForContent( String t );
	
	Collection<Value> getTotalTankCapacitiesForContents();

	Collection<Value> getTotalTankVolumesForContents();

	Collection<Value> getTankCapacitiesForContents( String t );
	
	Collection<Value> getTankVolumesForContents( String t );
	
	/**
	 * Get list of tanks in Unit not involved in Active or Scheduled transfers
	 * 
	 * @param unit - name of unit
	 * @return Collection of tanks 
	 */
	Collection<Value> getUnusedTankVolumesForUnit( String unit);
	
	Collection<Volume> getLevelVolumesForTank( Long id );
	
	Tank getTank( Long id);
	
	Integer updateTank( Tank cfg );

	Integer insertTank( Tank cfg );

}
