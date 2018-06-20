package us.avn.oms.service.impl;

import java.util.Collection;
import java.util.Iterator;
import java.util.Vector;

import org.springframework.beans.factory.annotation.Autowired;

import us.avn.oms.domain.Config;
import us.avn.oms.domain.Tag;
import us.avn.oms.mapper.ConfigMapper;
import us.avn.oms.service.ConfigService;

public class ConfigServiceImpl implements ConfigService {


	private ConfigMapper configMapper;
	
	public void setConfigMapper( ConfigMapper cm ) {
		this.configMapper = cm;
	}
	
	@Override
	public Collection<Config> getAllConfigurationItems( ) {
		return configMapper.getAllConfigurationItems();
	}
	
	@Override
	public Collection<String> getOmsViews() {
		Collection<Config> v = configMapper.getOmsViews();
		Collection<String> sv = new Vector<String>();
		Iterator<Config> iv = v.iterator();
		while(iv.hasNext()) {
			sv.add(iv.next().getKey());
		}
		return sv;
	}
	
	@Override
	public Config getConfigurationItem( String key) {
		return configMapper.getConfigurationItem(key);
	}
	
	@Override
	public Tag getSiteLocation() {
		return configMapper.getSiteLocation();
	}
	
	@Override
	public void updateConfigurationItem( Config cfg ) {
		configMapper.updateConfigurationItem( cfg );
	}

	@Override
	public void insertConfigurationItem( Config cfg ) {
		configMapper.insertConfigurationItem(cfg);
	}

}