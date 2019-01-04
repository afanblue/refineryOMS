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

import us.avn.oms.domain.IdName;
import us.avn.oms.mapper.PrivilegeMapper;
import us.avn.oms.service.PrivilegeService;

public class PrivilegeServiceImpl implements PrivilegeService {


	private PrivilegeMapper privilegeMapper;
	
	public void setPrivilegeMapper( PrivilegeMapper rm ) {
		this.privilegeMapper = rm;
	}


	@Override
	public IdName getPrivilegeById( Long id ) {
		return privilegeMapper.getPrivilegeById(id);
	}
	
	@Override
	public Collection<IdName> getAllPrivileges() {
		return privilegeMapper.getAllPrivileges();
	}
	
	@Override
	public Collection<IdName> getPrivilegesForRole( Long id ) {
		return privilegeMapper.getPrivilegesForRole( id );
	}

	@Override
	public void updatePrivilege( IdName u ) {
		privilegeMapper.updatePrivilege(u);
	}

	@Override
    public void insertPrivilege( IdName u ) {
    	privilegeMapper.insertPrivilege(u);
    }


}