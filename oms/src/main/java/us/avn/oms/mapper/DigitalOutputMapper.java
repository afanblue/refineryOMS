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

import us.avn.oms.domain.DigitalOutput;

public interface DigitalOutputMapper {
	
	Collection<DigitalOutput> getAllActiveDOtags( );

	Collection<DigitalOutput> getAllDigitalOutputs( );
	
	Collection<DigitalOutput> getDigitalOutputsToUpdate();
	
//	DigitalOutput getBaseDigitalOutput( Long id);
	
	DigitalOutput getDigitalOutput( Long id );
	
	void updateDigitalOutput( DigitalOutput ai );
	
	void clearDOupdate( Long id );

	void updateDigitalOutputStatic( DigitalOutput ai );

	Long insertDigitalOutput( DigitalOutput ai );
	
}
