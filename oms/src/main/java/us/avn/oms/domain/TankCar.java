package us.avn.oms.domain;

import java.io.Serializable;
import java.util.Collection;

/**
 * railroad tank cars DOT-111
 * @author Allan
 * 
 * Quantities are 34,500 gal (821 bbl)
 *                
 */
public class TankCar implements Serializable {
	
	private static final long serialVersionUID = 8751282105532159742L;
	
	private Long   id;
	private Tag    tag;
	private Double quantity;
	private Long   companyId;
    
    
	public TankCar() { }
    
    public TankCar( Long i, String n ) {
    	this.id = i;
    	Tag t = new Tag(i,n);
    	t.setTagTypeCode("TC");
    	t.setActive("Y");
    	this.tag = t;
    }

	
	public Long getId() {
		return id;
	}
	
	public void setId(Long id) {
		this.id = id;
	}
	
	
	public Tag getTag() {
		return tag;
	}

	public void setTag(Tag tag) {
		this.tag = tag;
	}



	public Double getQuantity() {
		return quantity;
	}

	public void setQuantity(Double quantity) {
		this.quantity = quantity;
	}

	
	public Long getCompanyId() {
		return companyId;
	}

	public void setCompanyId(Long companyId) {
		this.companyId = companyId;
	}

	
	public String toString() {
		StringBuffer sb = new StringBuffer(2000);
		sb.append("TankerTruck{\"id\"=").append(this.id);
		sb.append(", \"tag\"=[").append(tag.toString()).append("]");
		sb.append(", \"quantity\"=").append(this.quantity);
		sb.append(", \"companyId\"=").append(this.companyId);
		sb.append("}");
		return sb.toString();
	}

}
