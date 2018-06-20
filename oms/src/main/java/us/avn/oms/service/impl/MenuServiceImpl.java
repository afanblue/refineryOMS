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
	public Collection<Category> getAllMenuCategories() {
		return menuMapper.getAllMenuCategories();
	}

}