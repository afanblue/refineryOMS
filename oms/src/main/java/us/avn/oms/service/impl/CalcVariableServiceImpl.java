package us.avn.oms.service.impl;

import java.util.Collection;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;

import us.avn.oms.domain.AIValue;
import us.avn.oms.domain.CalcOperand;
import us.avn.oms.domain.CalcVariable;
import us.avn.oms.domain.IdName;
import us.avn.oms.domain.RelTagTag;
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
			cv.setInputTags(cvMapper.getInputTags(id));
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
	public Collection<Long> getInputTags( Long id ) {
		return cvMapper.getInputTags( id );
	}

	@Override
	public Collection<CalcOperand> getAIValuesForCalculation( Long id ) {
		return cvMapper.getAIValuesForCalculation(id);
	}
	
	@Override
	public Collection<CalcOperand> getDIValuesForCalculation( Long id ) {
		return cvMapper.getDIValuesForCalculation(id);
	}
	
	@Override
	public void updateCalcVariable( CalcVariable cv ) {
		log.debug("Updating calc variable - "+cv.toString());
		tagMapper.updateTag(cv.getTag());
		cvMapper.updateCalcVariable(cv);
	}

	@Override
    public void insertCalcVariable( CalcVariable cv ) {
		Long id = tagMapper.insertTag(cv.getTag());
		Tag t = tagMapper.getTagByName(cv.getTag().getName());
		cv.setId(t.getId());
    	cvMapper.insertCalcVariable(cv);
    }

}