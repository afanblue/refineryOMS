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
package us.avn.oms.service;

import java.time.Instant;
import java.time.LocalDateTime;
import java.util.Collection;
import java.util.HashMap;

import us.avn.oms.domain.Crontab;


public interface CrontabService {
	
	/**
	 * Get all of the records in the crontab table
	 * @return collection of all crontab records
	 */
	public Collection<Crontab> getAllCrontabRecords( );
	
	/**
	 * Get a specific record from the crontab table
	 * @param id ID of record 
	 * @return specified crontab record
	 */
	public Crontab getCrontabRecord( Long id );
	
	/**
	 * check the given record to see if the given time matches the 
	 * given crontab record
	 * @param tm time to check
	 * @param id ID of record
	 * @return true if given time matches the crontab record
	 */
	public boolean checkSchedule( LocalDateTime tm, Long id );
	
	/**
	 * Update the given crontab item in the DB
	 * @param crn crontab object
	 */
	void updateCrontab( Crontab crn );

	/**
	 * Insert the given crontab object in the DB
	 * @param crn crontab object
	 * @return id of inserted record
	 */
	Long insertCrontab( Crontab crn );

}
