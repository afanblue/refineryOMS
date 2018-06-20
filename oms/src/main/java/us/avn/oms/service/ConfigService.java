package us.avn.oms.service;

import java.util.Collection;

import us.avn.oms.domain.Config;
import us.avn.oms.domain.Tag;


public interface ConfigService {
	
	public Collection<Config> getAllConfigurationItems( );
	
	public Collection<String> getOmsViews();
	
	public Config getConfigurationItem( String key);
	
	public Tag getSiteLocation();
	
	void updateConfigurationItem( Config cfg );

	void insertConfigurationItem( Config cfg );

}
