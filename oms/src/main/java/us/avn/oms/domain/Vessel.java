package us.avn.oms.domain;

import java.io.Serializable;
import java.util.Collection;

/**
 * 
 * @author Allan
 * 
 * Quantities are 5000 - 11600 gal
 *                119  - 276 bbl
 */
public class Vessel implements Serializable {
	
	private static final long serialVersionUID = 8751282105532159742L;
	
	private Long     id;
	private String   name;
	private Tag      tag;
	private Long     customerId;
	private Customer customer;
	private Double   quantity;
	private Collection<IdName> customers;
    
	
	public Long getId() {
		return id;
	}
	
	public void setId( Long i ) {
		this.id = i;
	}
	
	
	public String getVesselName() {
		return this.name;
	}
	
	public void setVesselName( String n ) {
		this.name = n;
	}
	
	
	public Tag getTag() {
		return tag;
	}

	public void setTag(Tag tag) {
		this.tag = tag;
	}

	
	public Long getCustomerId() {
		return customerId;
	}
	
	public void setCustomerId( Long i ) {
		this.customerId = i;
	}
	
	
	public Customer getCustomer() {
		return customer;
	}

	public void setCustomer(Customer customer) {
		this.customer = customer;
	}


	public Double getQuantity() {
		return quantity;
	}

	public void setQuantity(Double qty) {
		this.quantity = qty;
	}

	
	public Collection<IdName> getCustomers() {
		return customers;
	}

	public void setCustomers(Collection<IdName> customers) {
		this.customers = customers;
	}

	
	public String toString() {
		StringBuffer sb = new StringBuffer(2000);
		sb.append("Vessel{\"tag\"=[").append(this.tag.toString()).append("]");
		sb.append(", \"vesselName\"=\"").append(this.name).append("\"");
		sb.append(", \"quantity\"=\"").append(this.quantity);
		if( this.customer != null ) {
			sb.append(", \"customer\"=[").append(this.customer.toString()).append("]");
		} else {
			sb.append(", \"customer\"=[null]");
		}
		sb.append("}");
		return sb.toString();
	}

}
