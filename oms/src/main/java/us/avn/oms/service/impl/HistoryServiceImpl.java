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

import us.avn.oms.domain.History;
import us.avn.oms.domain.HistoryRequest;
import us.avn.oms.mapper.HistoryMapper;
import us.avn.oms.service.HistoryService;

public class HistoryServiceImpl implements HistoryService {


	private HistoryMapper histMapper;
	
	public void setHistoryMapper( HistoryMapper hm ) {
		this.histMapper =hm;
	}

	
	@Override
	public void insertHistoryRecord( History h ) {
		histMapper.insertHistoryRecord(h);
	}
	
	@Override
	public Collection<History> getTagHistory( HistoryRequest hr ) {
		return histMapper.getTagHistory(hr);
	}

}