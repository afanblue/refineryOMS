package it.avn.oms.domain;

import java.io.Serializable;

/*
 * 
 */
public class RolePriv implements Serializable {
	
	private static final long serialVersionUID = 8751282105532159742L;
	
	private Long roleId;
	private String role;
	private Long privId;
	private String priv;
	
	public RolePriv() { }
	
	public RolePriv( Long rid, Long pid ) {
		this.roleId = rid;
		this.privId = pid;
	}
	
	public Long getRoleId() {
		return roleId;
	}

	public void setRoleId(Long roleId) {
		this.roleId = roleId;
	}


	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}


	public Long getPrivId() {
		return privId;
	}

	public void setPrivId(Long privId) {
		this.privId = privId;
	}


	public String getPriv() {
		return priv;
	}

	public void setPriv(String priv) {
		this.priv = priv;
	}


	public String toString() {
		StringBuffer sb = new StringBuffer(2000);
		sb.append("RolePriv{\"roleId\"=").append(this.roleId);
		sb.append(", \"role\"=").append(this.role).append("\"");
		sb.append("\"privId\"=").append(this.privId);
		sb.append(", \"priv\"=").append(this.priv).append("\"");
		sb.append("}");
		return sb.toString();
	}

}
