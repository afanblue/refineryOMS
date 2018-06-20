package us.avn.oms.service.impl;

import java.util.Collection;
import java.util.Iterator;
import java.util.Vector;

import org.springframework.beans.factory.annotation.Autowired;

import us.avn.oms.domain.Config;
import us.avn.oms.domain.DigitalInput;
import us.avn.oms.domain.ReferenceCode;
import us.avn.oms.domain.Tag;
import us.avn.oms.domain.Taglet;
import us.avn.oms.mapper.ConfigMapper;
import us.avn.oms.mapper.DigitalInputMapper;
import us.avn.oms.mapper.TagMapper;
import us.avn.oms.service.DigitalInputService;

public class DigitalInputServiceImpl implements DigitalInputService {


	private DigitalInputMapper diMapper;
	private ConfigMapper cfgMapper;
	private TagMapper tagMapper;
	
	public void setDigitalInputMapper( DigitalInputMapper dim ) {
		this.diMapper = dim;
	}
	
	public void setConfigMapper(ConfigMapper cm ) {
		this.cfgMapper= cm;
	}

	public void setTagMapper( TagMapper tm ) {
		this.tagMapper = tm;
	}
	
	@Override
	public Collection<DigitalInput> getAllDigitalInputs( ) {
		return diMapper.getAllDigitalInputs();
	}

	@Override
	public Collection<DigitalInput> getAllActiveDItags( ) {
		return diMapper.getAllActiveDItags();
	}

	@Override
	public Collection<DigitalInput> getAllUpdatedDItags( ) {
		return diMapper.getAllUpdatedDItags();
	}

	@Override
	public Collection<Taglet> getAllDITaglets( String tc ) {
		return diMapper.getAllDITaglets(  tc );
	}
	
	@Override
	public Collection<ReferenceCode> getAllHistoryTypes() {
		return diMapper.getAllHistoryTypes();
	}
	
	@Override
	public DigitalInput getDigitalInput( Long id) {
		
		DigitalInput di = new DigitalInput();
		if( id == 0L ) {
			di.setTagId(0L);
			Tag t = new Tag(0L,"New DI");
			t.setActive("Y");
			t.setTagTypeCode("DI");
			di.setTag(t);
			di.setHistTypeCode("");
		} else {
			di = diMapper.getDigitalInput(id);
		}
		di.setHistTypes(diMapper.getAllHistoryTypes());
		di.setSiteLocation(cfgMapper.getSiteLocation());
		Collection<Config> v = cfgMapper.getOmsViews();
		Collection<String> sv = new Vector<String>();
		Iterator<Config> iv = v.iterator();
		while(iv.hasNext()) {
			sv.add(iv.next().getKey());
		}
		di.setViews(sv);
		return di;
	}
	
	@Override
	public void updateDigitalInput( DigitalInput di ) {
		diMapper.updateDigitalInput(di );
	}

	@Override
	public void updateDigitalInputStatic( DigitalInput di ) {
		if( di.getTagId() == 0L ) {
			insertDigitalInput(di);
		} else {
			tagMapper.updateTag(di.getTag());
			diMapper.updateDigitalInputStatic(di );
		}
	}

	@Override
	public Long insertDigitalInput( DigitalInput di ) {
		Long id = tagMapper.insertTag(di.getTag());
		Tag t = tagMapper.getTagByName(di.getTag().getName());
		di.setTagId(t.getId());
		diMapper.insertDigitalInput(di);
		return id;
	}

}