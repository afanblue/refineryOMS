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

import us.avn.oms.domain.Train;
import us.avn.oms.mapper.TrainMapper;
import us.avn.oms.service.TrainService;
import us.avn.oms.mapper.TagMapper;

public class TrainServiceImpl implements TrainService {

	private TrainMapper trainMapper;
	private TagMapper tagMapper;


	public void setTrainMapper( TrainMapper sm ) {
		this.trainMapper = sm;
	}

	public void setTagMapper( TagMapper tm ) {
		this.tagMapper = tm;
	}

	public Train getTrain( Long id ) {
		return trainMapper.getTrain(id);
	}
	
	public Collection<Train> getAllTrains() {
		return trainMapper.getAllTrains();
	}
	
	public Long updateTrain( Train s ) {
		Long id = s.getId();
		if( id != 0 ) {
			tagMapper.updateTag(s);
			trainMapper.updateTrain(s);
		} else {
			id = tagMapper.insertTag(s);
			trainMapper.insertTrain(s);
		}
		return id;
	}

    public Long insertTrain( Train s ) {
    	return updateTrain(s);
    }


}
