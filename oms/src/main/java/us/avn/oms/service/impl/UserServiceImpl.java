/*******************************************************************************
 * Copyright (C) 2018 A. E. Van Ness
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

import us.avn.oms.domain.Role;
import us.avn.oms.domain.User;
import us.avn.oms.domain.UserPriv;
import us.avn.oms.domain.Validation;
import us.avn.oms.mapper.MenuMapper;
import us.avn.oms.mapper.RoleMapper;
import us.avn.oms.mapper.UserMapper;
import us.avn.oms.service.UserService;

public class UserServiceImpl implements UserService {


	private RoleMapper roleMapper;
	private UserMapper userMapper;
	private MenuMapper menuMapper;
	
	public void setUserMapper( UserMapper um ) {
		this.userMapper = um;
	}

	public void setMenuMapper( MenuMapper mm ) {
		this.menuMapper = mm;
	}

	public void setRoleMapper( RoleMapper rm ) {
		this.roleMapper = rm;
	}

	@Override
	public User getUserById( Integer id ) {
		User u = userMapper.getUserById(id);
		return u;
	}
	
	@Override
	public Collection<User> getAllUsers() {
		return userMapper.getAllUsers();
	}
	
	@Override
	public void updateUser( User u ) {
		userMapper.updateUser(u);
	}

	@Override
    public Long insertUser( User u ) {
    	return userMapper.insertUser(u);
    }

	@Override
    public Collection<UserPriv> getUserRole( String alias ) {
    	return userMapper.getUserRole(alias);
    }

	@Override
    public Validation validateUser( String u, String pw ) {
    	Validation v = new Validation();
    	v.setValid(userMapper.validateUser(u, pw));
    	if( v.getValid() == 1 ) {
    		v.setCategories(menuMapper.getAllMenuCategories());
    		v.setMenus(menuMapper.getAllMenuItems(u)); 
    	}
    	return v;
    }
	
}