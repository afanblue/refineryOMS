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

import us.avn.oms.domain.Category;
import us.avn.oms.domain.Menu;
import us.avn.oms.mapper.MenuMapper;
import us.avn.oms.service.MenuService;

public class MenuServiceImpl implements MenuService {


	private MenuMapper menuMapper;
	
	public void setMenuMapper( MenuMapper mm ) {
		this.menuMapper = mm;
	}
	
	@Override
	public Collection<Menu> getAllMenuItems(String user) {
		return menuMapper.getAllMenuItems(user);
	}
	
	@Override
	public Collection<Menu> getMenuItemsForCategory( String user, String category ) {
		return menuMapper.getMenuItemsForCategory(user, category);
	}
	

	@Override
	public Collection<Category> getAllMenuCategories() {
		return menuMapper.getAllMenuCategories();
	}

}