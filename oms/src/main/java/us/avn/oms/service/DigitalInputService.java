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
import us.avn.oms.domain.AnalogInput;
import us.avn.oms.domain.DigitalInput;
import us.avn.oms.domain.ReferenceCode;
import us.avn.oms.domain.Taglet;


public interface DigitalInputService {
	
	public Collection<DigitalInput> getAllDigitalInputs( );
	
	public Collection<DigitalInput> getAllActiveDItags( );

	public Collection<DigitalInput> getAllUpdatedDItags( );

	public Collection<Taglet> getAllDITaglets( String tc );
	
	public Collection<AIValue> getProcUnitValues( String pu );
	
	public DigitalInput getDigitalInput( Long id );
	
	public Collection<ReferenceCode> getAllHistoryTypes();
	
	public Collection<DigitalInput> getCarrierPresentTags( String ptn );
	
	public void updateDigitalInput( DigitalInput di );

	public void updateDigitalInputStatic( DigitalInput di );

	public Long insertDigitalInput( DigitalInput di );

}
