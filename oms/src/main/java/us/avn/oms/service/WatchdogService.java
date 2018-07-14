package us.avn.oms.service;

import java.util.Collection;

import us.avn.oms.domain.Watchdog;

public interface WatchdogService {
	
	Collection<Watchdog> getActiveWatchdogs();

	void updateWatchdog( String n );
	
}
