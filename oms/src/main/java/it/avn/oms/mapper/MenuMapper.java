package it.avn.oms.mapper;

import java.util.Collection;

import it.avn.oms.domain.Menu;
import it.avn.oms.domain.Category;

public interface MenuMapper {
	
	Collection<Menu> getAllMenuItems( String user );
	
	Collection<Category> getAllMenuCategories();

}
