package us.avn.oms.service.impl;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;

import us.avn.oms.domain.AIValue;
import us.avn.oms.domain.AnalogInput;
import us.avn.oms.domain.IdName;
import us.avn.oms.domain.ReferenceCode;
import us.avn.oms.domain.Tag;
import us.avn.oms.mapper.AnalogInputMapper;
import us.avn.oms.mapper.ConfigMapper;
import us.avn.oms.mapper.TagMapper;
import us.avn.oms.mapper.UnitMapper;
import us.avn.oms.service.AnalogInputService;

public class AnalogInputServiceImpl implements AnalogInputService {


	private AnalogInputMapper aiMapper;
	private ConfigMapper cfgMapper;
	private TagMapper tagMapper;
	private UnitMapper unitMapper;
	
	public void setAnalogInputMapper( AnalogInputMapper aim ) {
		this.aiMapper =aim;
	}
	
	public void setConfigMapper(ConfigMapper cm ) {
		this.cfgMapper= cm;
	}

	public void setTagMapper( TagMapper tm ) {
		this.tagMapper = tm;
	}
	
	public void setUnitMapper( UnitMapper tm ) {
		this.unitMapper = tm;
	}
	
	@Override
	public Collection<AnalogInput> getAllActiveAItags( ) {
		return aiMapper.getAllActiveAItags();
	}

	@Override
	public Collection<AnalogInput> getAllUpdatedAItags( ) {
		return aiMapper.getAllUpdatedAItags();
	}

	@Override
	public Collection<AnalogInput> getAllAnalogInputsByType( String ttc ) {
		return aiMapper.getAllAnalogInputsByType(ttc);
	}

	@Override
	public Collection<IdName> getAllAIIdNameByType( String tc ) {
		return aiMapper.getAllAIIdNameByType(  tc );
	}

	@Override
	public Collection<AnalogInput> getAllAnalogInputs( ) {
		return aiMapper.getAllAnalogInputs();
	}
	
	@Override
	public Collection<ReferenceCode> getAllAnalogInputTypes() {
	  return aiMapper.getAllAnalogInputTypes();	
	}
	
	@Override
	public Collection<ReferenceCode> getAllHistoryTypes() {
		return aiMapper.getAllHistoryTypes();
	}
	
	@Override
	public AnalogInput getBaseAnalogInput( Long id) {
		AnalogInput ai = aiMapper.getAnalogInput(id);
		return ai;
	}
	
	@Override
	public AnalogInput getAnalogInput( Long id) {
		AnalogInput ai = new AnalogInput(0L,"Create new tag");
		if( id != 0 ) {
			ai = aiMapper.getAnalogInput(id);
		}
		ai.setAiTypes(aiMapper.getAllAnalogInputTypes());
		ai.setHistTypes(aiMapper.getAllHistoryTypes());
		ai.setSiteLocation(cfgMapper.getSiteLocation());
		ai.setUnitList(unitMapper.getAllUnits());
		return ai;
	}
	
	@Override
	public Collection<AIValue> getCurrentAIValues() {
		return aiMapper.getCurrentAIValues();
	}
	
	@Override
	public void updateAnalogInput( AnalogInput ai ) {
		aiMapper.updateAnalogInput(ai );
	}

	@Override
	public void updateAnalogInputStatic( AnalogInput ai ) {
		if( ai.getTagId() == 0L ) {
			insertAnalogInput(ai);
		} else {
			tagMapper.updateTag(ai.getTag());
			aiMapper.updateAnalogInputStatic(ai );
		}
	}

	@Override
	public Long insertAnalogInput( AnalogInput ai ) {
		Long id = tagMapper.insertTag(ai.getTag());
		Tag t = tagMapper.getTagByName(ai.getTag().getName());
		ai.setTagId(t.getId());
		aiMapper.insertAnalogInput(ai);
		return id;
	}

	@Override
	public 	Collection<AIValue> getProcUnitValues( String un) {
		return aiMapper.getProcUnitValues( un );
	}


}