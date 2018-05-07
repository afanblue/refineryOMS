package it.avn.oms.domain;

import java.io.Serializable;

public class Customer implements Serializable {
	
	private static final long serialVersionUID = 8751282105532159742L;
	
	private Long id;
	private String name;
	private String active;
	private String etherKey;
	  
	
	public Long getId() {
		return this.id;
	}
	
	public void setId( Long i ) {
		this.id = i;
	}
	

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	
	public String getActive() {
		return active;
	}

	public void setActive(String active) {
		this.active = active;
	}

	public String getEtherkey() {
		return etherKey;
	}
	
	public void setEtherkey(String kn) {
		this.etherKey = kn;
	}
		
	
	public String toString() {
		StringBuffer sb = new StringBuffer(2000);
		sb.append("Customer{\"id\":\"").append(this.id);
		sb.append(", \"name\"").append(this.name).append("\"");
		sb.append(", \"active\"").append(this.active).append("\"");
		sb.append("\", etherKey\":\"").append(this.etherKey).append("\"");
		sb.append("}");
		return sb.toString();
	}

}
