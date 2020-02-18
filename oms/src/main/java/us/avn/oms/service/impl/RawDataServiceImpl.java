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

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;

import us.avn.oms.domain.RawData;
import us.avn.oms.mapper.RawDataMapper;
import us.avn.oms.service.RawDataService;


public class RawDataServiceImpl implements RawDataService {


	private RawDataMapper rdMapper;
	
	public void setRawDataMapper( RawDataMapper rdm ) {
		this.rdMapper = rdm;
	}
	
	
	
	@Override
	public void clearUpdated( Long i ) {
		rdMapper.clearUpdated(i );
	}

	@Override
	public void updateRawData( RawData x ) {
		rdMapper.updateRawData(x);
	}
	
}