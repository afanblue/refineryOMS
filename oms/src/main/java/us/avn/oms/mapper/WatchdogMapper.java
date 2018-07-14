package us.avn.oms.mapper;

import java.util.Collection;

import us.avn.oms.domain.Watchdog;

public interface WatchdogMapper {
	
	Collection<Watchdog> getActiveWatchdogs();
	
	void updateWatchdog( String n );

}