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

import us.avn.oms.domain.AIValue;
import us.avn.oms.domain.ReferenceCode;
import us.avn.oms.domain.Tank;
import us.avn.oms.domain.Value;
import us.avn.oms.domain.Volume;
import us.avn.oms.mapper.AnalogInputMapper;
import us.avn.oms.mapper.ConfigMapper;
import us.avn.oms.mapper.TagMapper;
import us.avn.oms.mapper.TankMapper;
import us.avn.oms.service.TankService;

public class TankServiceImpl implements TankService {


	private AnalogInputMapper aiMapper;
	private ConfigMapper configMapper;
	private TagMapper tagMapper;
	private TankMapper tankMapper;
	
	public void setAnalogInputMapper( AnalogInputMapper aim ) {
		this.aiMapper = aim;
	}
	
	public void setConfigMapper( ConfigMapper cm ) {
		this.configMapper = cm;
	}
	
	public void setTagMapper( TagMapper tm ) {
		this.tagMapper = tm;
	}
	
	public void setTankMapper( TankMapper tm ) {
		this.tankMapper = tm;
	}
	
	/* ************************************************ */

	@Override
	public Collection<Tank> getAllTanks( ) {
		return tankMapper.getAllTanks();
	}
	
	@Override
	public Collection<Tank> getAllTanksInField( Long id ) {
		return tankMapper.getAllTanksInField( id );
	}

	@Override
	public Value getEstTankVolume( Long id ) {
		return tankMapper.getEstTankVolume(id);
	}
	
	@Override
	public Value getEmptiestTankForContent( String t ) {
		return tankMapper.getEmptiestTankForContent(t);
	}
	
	@Override
	public Value getFullestTankForContent( String t ) {
		return tankMapper.getFullestTankForContent(t);
	}
	
	@Override
	public Collection<Value> getTotalTankCapacitiesForContents() {
		return tankMapper.getTotalTankCapacitiesForContents();
	}

	@Override
	public Collection<Value> getTotalTankVolumesForContents() {
		return tankMapper.getTotalTankVolumesForContents();
	}

	@Override
	public Collection<Value> getTankCapacitiesForContents( String t ) {
		return tankMapper.getTankCapacitiesForContents(t);
	}
	
	@Override
	public Collection<Value> getTankVolumesForContents( String t ) {
		return tankMapper.getTankVolumesForContents(t);
	}
	
	@Override
	public Collection<Value> getTankVolumesForUnit( String n) {
		return tankMapper.getTankVolumesForUnit(n);
	}
	
	@Override
	public Collection<Volume> getLevelVolumesForTank(Long id) {
		return tankMapper.getLevelVolumesForTank(id);
	}
	
	@Override
	public Tank getTank( Long id) {
		Tank t = tankMapper.getTank(id);
		if( t == null ) {
			t = new Tank(0L,"New Tank");
		} else {
			t.setVolumes(tankMapper.getLevelVolumesForTank(id));
		}
		return t;
	}
	
	@Override
	public void updateTank( Tank tk ) {
		tankMapper.updateTank( tk );
	}

	@Override
	public void insertTank( Tank tk ) {
		tankMapper.insertTank(tk);
	}

}