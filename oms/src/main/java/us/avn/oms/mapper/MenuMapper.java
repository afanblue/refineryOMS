package us.avn.oms.mapper;

import java.util.Collection;

import us.avn.oms.domain.Category;
import us.avn.oms.domain.Menu;

public interface MenuMapper {
	
	Collection<Menu> getAllMenuItems( String user );
	
	Collection<Category> getAllMenuCategories();

}
