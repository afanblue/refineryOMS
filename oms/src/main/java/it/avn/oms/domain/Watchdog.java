package it.avn.oms.domain;

import java.io.Serializable;
import java.util.Collection;

/*
 *  Taglet is a shortened version of an tag object, e.g., AnalogInput, Field
 *         for situations where we don't need the full object and tag info.
 *         specifically, this is originally intended for dropdown lists, but
 *         it may have further applicability
 *         
 *              id: 1
 *            name: DeCity
 *     description: Delaware City Refinery
 *   tag_type_code: FLD
 *   tag_type_info: L
 *          active: Y
 *          
 */
public class Watchdog implements Serializable {
	
	private static final long serialVersionUID = 8751282105532159742L;
	
	public static final String AI = "AnalogInput";
	public static final String AO = "AnalogOutput";
	public static final String DCAI = "DataCollectionAI";
	public static final String DCDI = "DataCollectionDI";
	public static final String DI = "DigitalInput";
	public static final String DO = "DigitalOutput";
	public static final String TRANSFER = "Transfer";
	
	protected Long updated;
	protected String name;
    
    public Watchdog() { }
    
    public Watchdog( String n ) {
    	this.name = n;
    }

	
	public Long getUpdated() {
		return updated;
	}
	
	public void setUpdated(Long upd) {
		this.updated = upd;
	}

	
	public String getName() {
		return name;
	}
	
	public void setName(String name) {
		this.name = name;
	}

	
	public String toString() {
		StringBuffer sb = new StringBuffer(2000);
		sb.append("Watchdog{");
		sb.append("\"name\"=\"").append(this.name).append("\"");
		sb.append("\"updated\"=").append(this.updated);
		sb.append("}");
		return sb.toString();
	}

}
