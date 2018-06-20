package us.avn.oms.service;

import java.util.Collection;

import us.avn.oms.domain.Category;
import us.avn.oms.domain.Menu;

public interface MenuService {
	
	public Collection<Menu> getAllMenuItems(String user);
	
	public Collection<Category> getAllMenuCategories();

}
