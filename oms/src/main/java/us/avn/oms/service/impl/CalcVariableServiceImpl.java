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

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
//import org.springframework.beans.factory.annotation.Autowired;

//import us.avn.oms.domain.AIValue;
import us.avn.oms.domain.CalcOperand;
import us.avn.oms.domain.CalcVariable;
import us.avn.oms.domain.IdName;
//import us.avn.oms.domain.RelTagTag;
import us.avn.oms.domain.Tag;
import us.avn.oms.mapper.CalcVariableMapper;
import us.avn.oms.mapper.ConfigMapper;
import us.avn.oms.mapper.TagMapper;
import us.avn.oms.service.CalcVariableService;

public class CalcVariableServiceImpl implements CalcVariableService {

    private Logger log = LogManager.getLogger(this.getClass().getName());

    private CalcVariableMapper cvMapper;
	private ConfigMapper cfgMapper;
	private TagMapper tagMapper;
	
	
	public void setCalcVariableMapper( CalcVariableMapper cv ) {
		this.cvMapper = cv;
	}
	
	public void setTagMapper( TagMapper tm ) {
		this.tagMapper = tm;
	}
	
	public void setConfigMapper(ConfigMapper cm ) {
		this.cfgMapper= cm;
	}

	@Override
	public CalcVariable getCalcVariableByName( String fn ) {
		return cvMapper.getCalcVariableByName(fn);
	}
	

	@Override
	public CalcVariable getCalcVariable( Long id ) {
		CalcVariable cv = null;
		log.debug("getting calc variable record for "+id);
		if( id != 0 ) {
			cv = cvMapper.getCalcVariable(id);
		} else {
			cv = new CalcVariable(0L,"Enter new field ...");
		}
		return cv;
	}
	
	@Override
	public Collection<CalcVariable> getAllCalcVariables() {
		return cvMapper.getAllCalcVariables();
	}
	
	@Override
	public Collection<IdName> getInputTagList( Long id ) {
		return cvMapper.getInputTagList( id );
	}

	@Override
	public Collection<CalcOperand> getValuesForCalculation( Long id ) {
		return cvMapper.getValuesForCalculation(id);
	}
	
	@Override
	public void updateCalcVariable( CalcVariable cv ) {
		log.debug("Updating calc variable - "+cv.toString());
		tagMapper.updateTag(cv.getTag());
		cvMapper.updateCalcVariable(cv);
	}

	@Override
    public Long insertCalcVariable( CalcVariable cv ) {
		Tag t = cv.getTag();
		tagMapper.insertTag(t);
		Long id = t.getId();
		cv.setId(id);
    	cvMapper.insertCalcVariable(cv);
    	return id;
    }

}