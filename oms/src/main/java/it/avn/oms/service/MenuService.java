package it.avn.oms.service;

import java.util.Collection;

import it.avn.oms.domain.Category;
import it.avn.oms.domain.Menu;

public interface MenuService {
	
	public Collection<Menu> getAllMenuItems(String user);
	
	public Collection<Category> getAllMenuCategories();

}
