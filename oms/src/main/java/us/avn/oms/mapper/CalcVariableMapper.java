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

import us.avn.oms.domain.CalcOperand;
import us.avn.oms.domain.CalcVariable;
import us.avn.oms.domain.IdName;


public interface CalcVariableMapper {
	
	Collection<CalcVariable> getAllCalcVariables() ;
  
	CalcVariable getCalcVariable( Long id );
  
	CalcVariable getCalcVariableByName( String name );
	
	Collection<IdName> getInputTagList( Long id );
	
	Collection<CalcOperand> getValuesForCalculation( Long id );
	
	void updateCalcVariable( CalcVariable cv );
  
	Long insertCalcVariable( CalcVariable cv );

}
