package it.avn.oms.service;

import java.util.Collection;

import it.avn.oms.domain.Config;
import it.avn.oms.domain.Tag;


public interface ConfigService {
	
	public Collection<Config> getAllConfigurationItems( );
	
	public Collection<String> getOmsViews();
	
	public Config getConfigurationItem( String key);
	
	public Tag getSiteLocation();
	
	void updateConfigurationItem( Config cfg );

	void insertConfigurationItem( Config cfg );

}
