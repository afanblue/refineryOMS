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
import java.util.Iterator;
import java.util.Vector;

import org.springframework.beans.factory.annotation.Autowired;

import us.avn.oms.domain.IdName;
import us.avn.oms.domain.ReferenceCode;
import us.avn.oms.mapper.ReferenceCodeMapper;
import us.avn.oms.service.ReferenceCodeService;

public class ReferenceCodeServiceImpl implements ReferenceCodeService {


	private ReferenceCodeMapper rcm;
	
	public void setReferenceCodeMapper( ReferenceCodeMapper rcm ) {
		this.rcm = rcm;
	}
	
	@Override
	public Collection<ReferenceCode> getAllForCategory( String cat ) {
		return rcm.getAllForCategory( cat );
	}

	@Override
	public Collection<ReferenceCode> getAllContentTypes( ) {
		return rcm.getAllForCategory("content-type");
	}
	
	@Override
	public Double getDigitalValue( IdName idn ) {
		return rcm.getDigitalValue(idn);
	}
	

	@Override
	public void updateReferenceCode( ReferenceCode cfg ) {
		rcm.updateReferenceCode( cfg );
	}

	@Override
	public void insertReferenceCode( ReferenceCode cfg ) {
		rcm.insertReferenceCode(cfg);
	}

}