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
import java.util.HashMap;
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
	public HashMap<String,String> getAllConfigItems() {
		HashMap<String,String> cfg = new HashMap<String,String>();
		Iterator<Config> iat = configMapper.getAllConfigurationItems().iterator();
		while( iat.hasNext() ) {
			Config c = iat.next();
			cfg.put(c.getKey(), c.getValue());
		}
		return cfg;
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