package us.avn.oms.domain;

import java.io.Serializable;

public class UserPriv implements Serializable {
	
	private static final long serialVersionUID = 8751282105532159742L;
	
	/*
	 * select u.alias username, concat('ROLE_',upper(r.name)) role
     *   from role r join user_role ur on r.id=ur.role_id join user u on ur.user_id = u.id
     *  where u.alias = ?
	 */
	
	private String username;
	private String role;
	  

	public String getUsername() {
		return this.username;
	}
	
	public void setUsername(String un) {
		this.username = un;
	}


	public String getRole() {
		return this.role;
	}

	public void setRole(String r) {
		this.role = r;
	}


	public String toString() {
		StringBuffer sb = new StringBuffer(2000);
		sb.append("UserPriv{\"username\":\"").append(this.username).append("\"");
		sb.append("\", role\":\"").append(this.role).append("\"");
		sb.append("}");
		return sb.toString();
	}

}
