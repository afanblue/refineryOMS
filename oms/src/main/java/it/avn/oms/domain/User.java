package it.avn.oms.domain;

import java.io.Serializable;
import java.util.Collection;

public class User implements Serializable {
	
	private static final long serialVersionUID = 8751282105532159742L;
	
	/*
	 * id, alias, first_name, middle_name, last_name, email , password, state, status
	 */
	private Integer id;
	private String alias;
	private String firstName;
	private String middleName;
	private String lastName;
	private String email;
	private String password;
	private String state;
	private String status;
	private Long roleId;
	private Collection<Role> roles;
	  
	public User() { }
	
	public User( Integer i, String a, String fn, String mn, String ln
			   , String e, String p, String st, String sts, Long rid
			   , Collection<Role> rs ) {
		this.id = i;
		this.alias = a;
		this.firstName = fn;
		this.middleName = mn;
		this.lastName = ln;
		this.email = e;
		this.password = p;
		this.state = st;
		this.status = sts;
		this.roleId = rid;
		this.roles = rs;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}
	

	public String getAlias() {
		return alias;
	}

	public void setAlias(String alias) {
		this.alias = alias;
	}
	

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}
	

	public String getMiddleName() {
		return middleName;
	}
	
	public void setMiddleName(String middleName) {
		this.middleName = middleName;
	}
	

	public String getLastName() {
		return lastName;
	}
	
	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	
	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}
	

	public String getPassword() {
		return password;
	}
	
	public void setPassword(String password) {
		this.password = password;
	}
	

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}
	

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	
	public Collection<Role> getRoles() {
		return roles;
	}

	public void setRoles(Collection<Role> roles) {
		this.roles = roles;
	}
	

	public Long getRoleId() {
		return roleId;
	}

	public void setRoleId(Long roleId) {
		this.roleId = roleId;
	}
	

	public String toString() {
		StringBuffer sb = new StringBuffer(2000);
		sb.append("User{\"id\":").append(this.id);
		sb.append(", \"alias\":").append(this.alias).append("\"");
		sb.append(", \"firstName\":\"").append(this.firstName).append("\"");
		sb.append(", \"middleName\":\"").append(this.middleName).append("\"");
		sb.append(", \"lastName\":\"").append(this.lastName).append("\"");
		sb.append(", \"email\":\"").append(this.email).append("\"");
		sb.append(", \"state\":\"").append(this.state).append("\"");
		sb.append(", \"status\":\"").append(this.status).append("\"");
		sb.append(", \"roleId\":").append(this.roleId);
		sb.append("}");
		return sb.toString();
	}

}
