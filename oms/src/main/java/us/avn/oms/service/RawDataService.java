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
 *****************************************************************************/
package us.avn.oms.service;

import us.avn.oms.domain.RawData;

/**
 * Interface:  RawDataService
 * Description: Specify the methods for DB access to the RAW_DATA transfer table
 *
 * @author Allan
 *
 */
public interface RawDataService {

	/**
	 * clear the updated flag in the given RAW_DATA record
	 *
	 * @param id - Long - ID for the specified RAW_DATA record
	 */
	void clearUpdated( Long id );

	/**
	 * update the RAW_DATA w/the specified object values
	 *
	 * @param x RawData object to update
	 */
	void updateRawData( RawData x );

}
