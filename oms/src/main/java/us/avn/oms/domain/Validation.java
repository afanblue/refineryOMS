package us.avn.oms.domain;

import java.io.Serializable;
import java.util.Collection;

public class Validation implements Serializable {
	
	private static final long serialVersionUID = 8751282105532159742L;
	
	private Integer valid;
	private Collection<Category> categories;
	private Collection<Menu> menus;
	  

	public Integer getValid() {
		return valid;
	}
	
	public void setValid(Integer v) {
		this.valid = v;
	}
	
	public Collection<Category> getCategories() {
		return categories;
	}

	public void setCategories(Collection<Category> categories) {
		this.categories = categories;
	}

	public Collection<Menu> getMenus() {
		return menus;
	}

	public void setMenus(Collection<Menu> menus) {
		this.menus = menus;
	}
	

	public String toString() {
		StringBuffer sb = new StringBuffer(2000);
		sb.append("Validation{\"valid\"=\"").append(this.valid).append("\"");
		sb.append("}");
		return sb.toString();
	}

}
