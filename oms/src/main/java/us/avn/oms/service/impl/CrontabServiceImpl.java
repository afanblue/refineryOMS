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

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.Iterator;

import us.avn.oms.domain.Crontab;
import us.avn.oms.mapper.CrontabMapper;
import us.avn.oms.service.CrontabService;

public class CrontabServiceImpl implements CrontabService {

	private static String ALL = "*";
	
	private CrontabMapper crontabMapper;
	
	public void setCrontabMapper( CrontabMapper cm ) {
		this.crontabMapper = cm;
	}
	
	/**
	 * Get all of the records in the crontab table
	 * @return
	 */
	@Override
	public Collection<Crontab> getAllCrontabRecords( ) {
		return crontabMapper.getAllCrontabRecords();
	}
	
	/**
	 * Get a specific record from the crontab table
	 * @param id ID of record 
	 * @return specified crontab record
	 */
	@Override
	public Crontab getCrontabRecord( Long id ) {
		return crontabMapper.getCrontabRecord(id);
	}
	
	/**
	 * check the given record to see if the given time matches the 
	 * given crontab record
	 * <br>Notes:
	 * <br> IF both month of year and day of month match ALL
	 * <br> .. IF day of week doesn't match ALL
	 * <br> .. .. get dow list from crontab
	 * <br> .. .. IF day of week matches
	 * <br> .. .. .. match minute and hour
	 * <br> .. .. END IF
	 * <br> .. ELSE (both month of year and day of month match ALL)
	 * <br> .. .. match minute and hour
	 * <br> .. END IF
	 * <br> ELSE IF month of year matches ALL
	 * <br> .. get dom list from crontab
	 * <br> .. IF day of month matches
	 * <br> .. .. match minute and hour
	 * <br> .. END IF
	 * <br> ELSE IF day of month matches ALL
	 * <br> .. get moy list from crontab
	 * <br> .. IF month of year matches
	 * <br> .. .. match minute and hour
	 * <br> .. END IF
	 * <br> ELSE
	 * <br> .. get dom and moy lists from crontab
	 * <br> .. IF day of month and month of year match
	 * <br> .. .. match minute and hour
	 * <br> .. END IF
	 * <br> END IF
	 * 
	 * @param tm local time to check
	 * @param id ID of record
	 * @return true if given time matches the crontab record
	 */
	@Override
	public boolean checkSchedule( LocalDateTime ldt, Long id ) {
		boolean ok = false;
		Crontab crn = getCrontabRecord(id);
		Long minuteOfHour = new Long(ldt.getMinute());
		Long hourOfDay = new Long(ldt.getHour());
		Long dayOfMonth = new Long(ldt.getDayOfMonth());
		Long monthOfYear = new Long(ldt.getMonthValue());
		Long dayOfWeek = new Long(ldt.getDayOfWeek().getValue( ) % 7);

		if( ALL.equals(crn.getMoy()) && ALL.equals(crn.getDom()) ) {
			if( ! ALL.equals(crn.getDow()) ) {
				ArrayList<Long> dowList = getList(crn.getDow());
				if( dowList.contains(dayOfWeek)) {
					ok = matchTimeFields( crn.getHod(), crn.getMoh(), hourOfDay, minuteOfHour );
				}
			} else {
				ok = matchTimeFields( crn.getHod(), crn.getMoh(), hourOfDay, minuteOfHour );
			}
		} else if( ALL.equals(crn.getMoy()) ) {
			ArrayList<Long> domList = getList(crn.getDom());
			if( domList.contains(dayOfMonth)) {
				ok = matchTimeFields( crn.getHod(), crn.getMoh(), hourOfDay, minuteOfHour );
			}
		} else if( ALL.equals(crn.getDom()) ) {
			ArrayList<Long> moyList = getList(crn.getMoy());
			if( moyList.contains(monthOfYear) ) {
				ok = matchTimeFields( crn.getHod(), crn.getMoh(), hourOfDay, minuteOfHour );
			}
		} else {
			ArrayList<Long> domList = getList( crn.getDom());
			ArrayList<Long> moyList = getList( crn.getMoy());
			if( domList.contains(dayOfMonth) && moyList.contains(monthOfYear) ) {
				ok = matchTimeFields( crn.getHod(), crn.getMoh(), hourOfDay, minuteOfHour );
			}
		}

		return ok;
	}
	
	private boolean matchTimeFields( String hod, String moh, Long hour, Long minute ) {
		boolean ok = false;
		if( ALL.equals(hod) && ALL.equals(moh) ) {
			ok = true;
		} else if( ALL.equals(hod) ) {
			ArrayList<Long> mohList = getList(moh);
			ok = mohList.contains(minute);
		} else if( ALL.equals(moh) ) {
			ArrayList<Long> hodList = getList(hod);
			ok = hodList.contains(hour);
		} else {
			ArrayList<Long> mohList = getList(moh);
			ArrayList<Long> hodList = getList(hod);
			ok = mohList.contains(minute) && hodList.contains(hour);			
		}
		return ok;
	}
	
	/**
	 * Returns a list of Longs from a string of the form
	 * n1,n2,n3-n4,... 
	 * @param listSpec list specification
	 * @return list of Long values
	 */
	private ArrayList<Long> getList( String listSpec ) {
		ArrayList<Long> rtnList = new ArrayList<Long>();
		try {
			String[] vList = listSpec.split(",");
			Iterator<String> iList = Arrays.asList(vList).iterator();
			while( iList.hasNext() ) {
				String item = iList.next().trim();
				Iterator<String> eList = Arrays.asList(item.split("-")).iterator();
				Long start = new Long(eList.next());
				rtnList.add(start++);
				if( eList.hasNext() ) {
					Long end = new Long(eList.next());
					do {
						rtnList.add(start++);
					} while( start <= end );
				}
			} 
		} catch( Exception e ) { 
			rtnList = new ArrayList<Long>(1); 
		}
		return rtnList;
	}
	
	/**
	 * Update the given crontab item in the DB
	 * @param crn crontab object
	 */
	@Override
	public void updateCrontab( Crontab crn ) {
		crontabMapper.updateCrontab(crn);
	}

	/**
	 * Insert the given crontab object in the DB
	 * @param crn crontab object
	 * @return ID of inserted record
	 */
	@Override
	public Long insertCrontab( Crontab crn ) {
		crontabMapper.insertCrontab(crn);
		return crn.getId();
	}

}