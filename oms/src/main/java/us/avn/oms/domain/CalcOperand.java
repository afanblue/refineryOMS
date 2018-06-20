package us.avn.oms.domain;

import java.io.Serializable;
import java.util.Collection;

public class CalcOperand implements Serializable {
	
	private static final long serialVersionUID = 8751282105532159742L;
	
	private Long id;
	private String name;
	private Double scanValue;


/* *************************************************** */
    
    public CalcOperand() { }
    
    public CalcOperand( Long id, String name ) {
    	this.id = id;
    	this.name = name;
    }
	
	public Long getId() {
		return id;
	}
	
	public void setId(Long i) {
		this.id = i;
	}
	
	
	public String getName() {
		return name;
	}
	
	public void setName(String n) {
		this.name = n;
	}
	
	
	public Double getScanValue() {
		return scanValue;
	}

	public void setScanValue(Double scanValue) {
		this.scanValue = scanValue;
	}
	

	public String toString() {
		StringBuffer sb = new StringBuffer(2000);
		sb.append("CalcOperand{\"id\"=").append(this.id);
		sb.append("\"name\"=\"").append(this.name).append("\"");
		sb.append("\"scanValue\"=").append(this.scanValue);
		sb.append("}");
		return sb.toString();
	}

}
