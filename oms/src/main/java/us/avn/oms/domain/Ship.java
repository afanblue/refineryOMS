package us.avn.oms.domain;

import java.io.Serializable;
import java.util.Collection;
import java.util.Vector;


public class Ship extends Tag implements Serializable {

	private static final long serialVersionUID = -2719140494446170126L;
	private String fullName;
	private String owner;
	private Long ownerId;
	
	public Ship() {
		super();
		tagTypeCode = "S";
	}

	public Ship(Long i, String n) {
		super(i, n);
		tagTypeCode = "S";
	}

	public Ship(Long i, String n, String c) {
		super(i, n, c);
		tagTypeCode = "S";
	}

	public Ship(Tag t) {
		super(t);
		tagTypeCode = "S";
	}

	
	public String getFullName() {
		return fullName;
	}

	public void setFullName(String fullName) {
		this.fullName = fullName;
	}

	
	public String getOwner() {
		return owner;
	}
	

	public void setOwner(String o) {
		this.owner = o;
	}
	
	
	public Long getOwnerId() {
		return ownerId;
	}

	public void setOwnerId(Long ownerId) {
		this.ownerId = ownerId;
	}
	
	
}
