package it.avn.oms.service.impl;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;

import it.avn.oms.mapper.WatchdogMapper;
import it.avn.oms.service.WatchdogService;


public class WatchdogServiceImpl implements WatchdogService {


	private WatchdogMapper wdMapper;
	
	public void setWatchdogMapper( WatchdogMapper wdm ) {
		this.wdMapper = wdm;
	}
	
	/* ************************************************************** */
	
	@Override
	public void updateWatchdog( String n ) {
		wdMapper.updateWatchdog( n );
	}

}