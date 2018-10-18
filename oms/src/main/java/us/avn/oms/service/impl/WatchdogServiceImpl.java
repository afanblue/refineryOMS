/*******************************************************************************
 * Copyright (C) 2018 A. E. Van Ness
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