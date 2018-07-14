package us.avn.oms.service.impl;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;

import us.avn.oms.domain.Watchdog;
import us.avn.oms.mapper.WatchdogMapper;
import us.avn.oms.service.WatchdogService;


public class WatchdogServiceImpl implements WatchdogService {


	private WatchdogMapper wdMapper;
	
	public void setWatchdogMapper( WatchdogMapper wdm ) {
		this.wdMapper = wdm;
	}
	
	/* ************************************************************** */
	
	@Override
	public Collection<Watchdog> getActiveWatchdogs() {
		return wdMapper.getActiveWatchdogs();
	}

	@Override
	public void updateWatchdog( String n ) {
		wdMapper.updateWatchdog( n );
	}

}