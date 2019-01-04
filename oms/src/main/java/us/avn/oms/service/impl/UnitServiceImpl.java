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

import us.avn.oms.domain.Unit;
import us.avn.oms.domain.UnitConversion;
import us.avn.oms.domain.UnitType;

import us.avn.oms.mapper.UnitMapper;
import us.avn.oms.service.UnitService;

public class UnitServiceImpl implements UnitService {


	private UnitMapper unitMapper;
	
	public void setUnitMapper( UnitMapper um ) {
		this.unitMapper = um;
	}
	
	/* ********************************************* */
	
	public Collection<UnitType> getAllUnitTypes( ) {
		return unitMapper.getAllUnitTypes();
	}

	@Override
	public UnitType getUnitType( Long id ) {
		return unitMapper.getUnitType( id );
	}

	@Override
	public void updateUnitType( UnitType at ) {
		unitMapper.updateUnitType( at );
	}

	@Override
	public void insertUnitType( UnitType at ) {
		unitMapper.insertUnitType( at );
	}

/* ********************************************* */
	
	@Override
	public Collection<Unit> getAllUnits( ) {
		return unitMapper.getAllUnits();
	}

	@Override
	public Unit getUnit( Long id ) {
		return unitMapper.getUnit(id);
	}

	@Override
	public void updateUnit( Unit alm ) {
		unitMapper.updateUnit( alm );
	}

	@Override
	public void insertUnit( Unit u ) {
		unitMapper.insertUnit( u );
	}

	/* ********************************************* */
	
	public Collection<UnitConversion> getAllUnitConversions( ) {
		return unitMapper.getAllUnitConversions();
	}
	
	@Override
	public UnitConversion getUnitConversion( Long id ) {
		UnitConversion uc = unitMapper.getUnitConversion(id);
		return uc;
	}
	
	@Override
	public void insertUnitConversion( UnitConversion uc ) {
		unitMapper.insertUnitConversion( uc );
	}

	@Override
	public void updateUnitConversion( UnitConversion uc ) {
		unitMapper.updateUnitConversion( uc );
	}
	
}

