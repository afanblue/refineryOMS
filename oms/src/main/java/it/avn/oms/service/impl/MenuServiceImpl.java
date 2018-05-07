package it.avn.oms.service.impl;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;

import it.avn.oms.domain.Category;
import it.avn.oms.domain.Menu;
import it.avn.oms.mapper.MenuMapper;
import it.avn.oms.service.MenuService;

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
	public Collection<Category> getAllMenuCategories() {
		return menuMapper.getAllMenuCategories();
	}

}