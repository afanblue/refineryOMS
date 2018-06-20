package us.avn.oms.service;

import java.util.Collection;

import us.avn.oms.domain.AIValue;
import us.avn.oms.domain.CalcOperand;
import us.avn.oms.domain.CalcVariable;
import us.avn.oms.domain.Field;
import us.avn.oms.domain.IdName;

public interface CalcVariableService {
	
	public Collection<CalcVariable> getAllCalcVariables() ;

	public CalcVariable getCalcVariable( Long id );
  
	public CalcVariable getCalcVariableByName( String name );
  
	public Collection<Long> getInputTags( Long id );
	
	public Collection<CalcOperand> getAIValuesForCalculation( Long id );
	
	public Collection<CalcOperand> getDIValuesForCalculation( Long id );
  
	public void updateCalcVariable( CalcVariable cv );
  
	public void insertCalcVariable( CalcVariable cv );
    
}
