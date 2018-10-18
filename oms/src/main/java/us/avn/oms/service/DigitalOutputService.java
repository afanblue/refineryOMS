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

import us.avn.oms.domain.DigitalOutput;


public interface DigitalOutputService {
	
	public Collection<DigitalOutput> getAllActiveDOtags( );

	public Collection<DigitalOutput> getAllDigitalOutputs( );
	
	public Collection<DigitalOutput> getDigitalOutputsToUpdate();
	
//	public DigitalOutput getBaseDigitalOutput( Long id);
	
	public DigitalOutput getDigitalOutput( Long id);
		
	public void updateDigitalOutput( DigitalOutput d );
	
	public void clearDOupdate( Long id );

	public void output( Long id );
	
	public void updateDigitalOutputStatic( DigitalOutput ai );

	public Long insertDigitalOutput( DigitalOutput ai );

}
