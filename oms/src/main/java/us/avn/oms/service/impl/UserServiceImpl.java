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

import java.util.ArrayList;
import java.util.Collection;
import java.util.Iterator;

import org.springframework.beans.factory.annotation.Autowired;

import us.avn.oms.domain.Category;
import us.avn.oms.domain.Menu;
import us.avn.oms.domain.Role;
import us.avn.oms.domain.User;
import us.avn.oms.domain.UserRole;
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
	public User getUserById( Long id ) {
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
    	userMapper.insertUser(u);
    	Long userId = u.getId();
    	return userId;
    }

	@Override
    public Collection<UserRole> getUserRole( String alias ) {
    	return userMapper.getUserRole(alias);
    }

	@Override
    public Validation validateUser( String u, String pw ) {
    	Validation v = new Validation();
    	v.setValid(userMapper.validateUser(u, pw));
    	if( v.getValid() == 1 ) {
    		Collection<Category> c = new ArrayList<Category>();
    		Collection<Category> cx = menuMapper.getAllMenuCategories();
    		Iterator<Category> ic = cx.iterator();
    		while( ic.hasNext() ) {
    			Category c0 = ic.next();
    			Collection<Menu> menus = menuMapper.getMenuItemsForCategory(u, c0.getText());
    			c0.setMenus(menus);
    			c.add(c0);
    		}
    		v.setCategories(c);
    	}
    	return v;
    }
	
	@Override
	public Integer insertUserRole( UserRole ur ) {
		return userMapper.insertUserRole(ur);
	}
	
}