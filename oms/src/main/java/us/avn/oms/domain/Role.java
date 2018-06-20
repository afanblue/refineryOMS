package us.avn.oms.domain;

import java.io.Serializable;
import java.util.Collection;

/*
 * 
 */
public class Role implements Serializable {
	
	private static final long serialVersionUID = 8751282105532159742L;
	
	private Long id;
	private String name;
	private String active;
	private Collection<IdName> parents;
	private Long[] privs;	            	// assigned privileges
	private Collection<IdName> privileges;	// all privileges
	
	
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}


	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	
	public Long[] getPrivs() {
		return privs;
	}

	public void setPrivs(Long[] privs) {
		this.privs = privs;
	}
	

	public String getActive() {
		return active;
	}

	public void setActive(String active) {
		this.active = active;
	}
	

	public Collection<IdName> getParents() {
		return parents;
	}

	public void setParents(Collection<IdName> parents) {
		this.parents = parents;
	}

	
	public Collection<IdName> getPrivileges() {
		return privileges;
	}

	public void setPrivileges(Collection<IdName> privileges) {
		this.privileges = privileges;
	}

	
	public String toString() {
		StringBuffer sb = new StringBuffer(2000);
		sb.append("Role{\"id\"=").append(this.id);
		sb.append(", \"name\"=").append(this.name).append("\"");
		sb.append(", \"active\"=\"").append(this.active).append("\"");
		sb.append("}");
		return sb.toString();
	}

}
