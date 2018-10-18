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
package us.avn.oms.mapper;

import java.util.Collection;

import us.avn.oms.domain.AIValue;
import us.avn.oms.domain.AnalogInput;
import us.avn.oms.domain.IdName;
import us.avn.oms.domain.ReferenceCode;

public interface AnalogInputMapper {
	
	Collection<AnalogInput> getAllAnalogInputs( );
	
	Collection<AnalogInput> getAllActiveAItags( );

	Collection<AnalogInput> getAllUpdatedAItags( );

	Collection<AnalogInput> getAllAnalogInputsByType( String tc );
	
	Collection<IdName> getAllAIIdNameByType( String tc );
	
	public Collection<ReferenceCode> getAllAnalogInputTypes();

	public Collection<ReferenceCode> getAllHistoryTypes();
	
	AnalogInput getAnalogInput( Long id );
	
	Collection<AIValue> getCurrentAIValues();
	
	void updateAnalogInput( AnalogInput ai );

	void updateAnalogInputStatic( AnalogInput ai );

	Long insertAnalogInput( AnalogInput ai );
	
	Collection<AIValue> getProcUnitValues( String un);

}
