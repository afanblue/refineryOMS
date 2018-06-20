package us.avn.oms.domain;

import java.io.Serializable;
import java.util.Collection;

/**
 */
public class UnitType implements Serializable {
	
	private static final long serialVersionUID = 8751282105532159742L;
	
	private Long id;
	private String name;
	private String code;
    
    public UnitType() { }
    
	
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

	
	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}


	public String toString() {
		StringBuffer sb = new StringBuffer(2000);
		sb.append("UnitType{\"id\"=").append(this.id);
		sb.append(", \"name\"=\"").append(this.name).append("\"");
		sb.append(", \"code\"=\"").append(this.code).append("\"");
		sb.append("}");
		return sb.toString();
	}

}
