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
import us.avn.oms.domain.DigitalInput;
import us.avn.oms.domain.ReferenceCode;
import us.avn.oms.domain.Taglet;

public interface DigitalInputMapper {
	
	Collection<DigitalInput> getAllDigitalInputs( );
	
	Collection<DigitalInput> getAllActiveDItags( );

	Collection<DigitalInput> getAllUpdatedDItags( );

	Collection<Taglet> getAllDITaglets( String tc );
	
	Collection<AIValue> getProcUnitValues( String pu );
	
	DigitalInput getDigitalInput( Long id );
	
	Collection<ReferenceCode> getAllHistoryTypes();
	
	Collection<DigitalInput> getCarrierPresentTags( String ptn );
	
	void updateDigitalInput( DigitalInput di );

	void updateDigitalInputStatic( DigitalInput di );

	Long insertDigitalInput( DigitalInput di );

}
