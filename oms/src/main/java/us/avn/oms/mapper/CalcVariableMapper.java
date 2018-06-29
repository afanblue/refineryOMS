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
	
	Collection<CalcOperand> getAIValuesForCalculation( Long id );
	
	Collection<CalcOperand> getDIValuesForCalculation( Long id );
  
	void updateCalcVariable( CalcVariable cv );
  
	void insertCalcVariable( CalcVariable cv );

}
