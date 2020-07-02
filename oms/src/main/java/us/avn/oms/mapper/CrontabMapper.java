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
package us.avn.oms.mapper;

import java.util.Collection;

import us.avn.oms.domain.Crontab;


public interface CrontabMapper {
	
	/**
	 * Get all of the records in the crontab table
	 * @return all crontab records
	 */
	Collection<Crontab> getAllCrontabRecords( );
	
	/**
	 * Get a specific record from the crontab table
	 * @param id ID of record 
	 * @return specified crontab record
	 */
	Crontab getCrontabRecord( Long id );
	
	/**
	 * Update the given crontab item in the DB
	 * @param crn crontab object
	 */
	void updateCrontab( Crontab crn);

	/**
	 * Insert the given crontab object in the DB
	 * @param crn crontab object
	 * @return ID of inserted record
	 */
	Integer insertCrontab( Crontab crn );

}
