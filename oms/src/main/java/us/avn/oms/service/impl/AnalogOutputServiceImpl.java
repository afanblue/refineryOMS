package us.avn.oms.service.impl;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;

import us.avn.oms.domain.AIValue;
import us.avn.oms.domain.AnalogOutput;
//import us.avn.oms.domain.IdName;
import us.avn.oms.domain.ReferenceCode;
import us.avn.oms.domain.Tag;
import us.avn.oms.mapper.AnalogOutputMapper;
import us.avn.oms.mapper.ConfigMapper;
import us.avn.oms.mapper.TagMapper;
import us.avn.oms.mapper.UnitMapper;
import us.avn.oms.service.AnalogOutputService;

public class AnalogOutputServiceImpl implements AnalogOutputService {


	private AnalogOutputMapper aoMapper;
	private ConfigMapper cfgMapper;
	private TagMapper tagMapper;
	private UnitMapper unitMapper;
	
	public void setAnalogOutputMapper( AnalogOutputMapper aom ) {
		this.aoMapper =aom;
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
	public Collection<AnalogOutput> getAllActiveAOtags( ) {
		return aoMapper.getAllActiveAOtags();
	}

	@Override
	public Collection<AnalogOutput> getAllAnalogOutputs( ) {
		return aoMapper.getAllAnalogOutputs();
	}
/*	
	@Override
	public AnalogOutput getBaseAnalogOutput( Long id) {
		AnalogOutput ao = aoMapper.getAnalogOutput(id);
		return ao;
	}
*/
	@Override
	public AnalogOutput getAnalogOutput( Long id) {
		AnalogOutput ao = new AnalogOutput(0L,"Create new tag");
		if( id != 0 ) {
			ao = aoMapper.getAnalogOutput(id);
		}
		ao.setHistTypes(aoMapper.getAllHistoryTypes());
		ao.setUnitList(unitMapper.getAllUnits());
		return ao;
	}
/*
	@Override
	public Collection<AIValue> getCurrentAOValues() {
		return aoMapper.getCurrentAOValues();
	}
*/
	@Override
	public Collection<ReferenceCode> getAllHistoryTypes() {
		return aoMapper.getAllHistoryTypes();
	}
	
	@Override
	public void updateAnalogOutput( AnalogOutput ao ) {
		aoMapper.updateAnalogOutput(ao );
	}

	@Override
	public void updateAnalogOutputStatic( AnalogOutput ao ) {
		if( ao.getTagId() == 0L ) {
			insertAnalogOutput(ao);
		} else {
			tagMapper.updateTag(ao.getTag());
			aoMapper.updateAnalogOutputStatic(ao );
		}
	}

	@Override
	public Long insertAnalogOutput( AnalogOutput ao ) {
		Long id = tagMapper.insertTag(ao.getTag());
		Tag t = tagMapper.getTagByName(ao.getTag().getName());
		ao.setTagId(t.getId());
		aoMapper.insertAnalogOutput(ao);
		return id;
	}

}