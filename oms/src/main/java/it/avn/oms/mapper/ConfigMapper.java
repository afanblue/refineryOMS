package it.avn.oms.mapper;

import java.util.Collection;

import it.avn.oms.domain.Config;
import it.avn.oms.domain.Tag;

public interface ConfigMapper {
	
	Collection<Config> getAllConfigurationItems( );
	
	Collection<Config> getOmsViews();
	
	Config getConfigurationItem( String key);
	
	Tag getSiteLocation();
	
	Integer updateConfigurationItem( Config cfg );

	Integer insertConfigurationItem( Config cfg );

}
