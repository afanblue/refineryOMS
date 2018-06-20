package us.avn.oms.domain;

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
public class Unit implements Serializable {
	
	private static final long serialVersionUID = 8751282105532159742L;
	
	private Long id;
	private String name;
	private String code;
	private Long unitTypeId;
	private String unitType;
    
    public Unit() { }
    
    public Unit( Long i, String n ) {
    	this.id = i;
    	this.name = n;
    }

	
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

	
	public Long getUnitTypeId() {
		return unitTypeId;
	}

	public void setUnitTypeId(Long unitTypeId) {
		this.unitTypeId = unitTypeId;
	}

	
	public String getUnitType() {
		return unitType;
	}

	public void setUnitType(String unitType) {
		this.unitType = unitType;
	}

	
	public String toString() {
		StringBuffer sb = new StringBuffer(2000);
		sb.append("Unit{\"id\"=").append(this.id);
		sb.append(", \"name\"=\"").append(this.name).append("\"");
		sb.append(", \"code\"=\"").append(this.code).append("\"");
		sb.append(", \"unitTypeId\"=").append(this.unitTypeId);
		sb.append(", \"unitType\"=\"").append(this.unitType).append("\"");
		sb.append("}");
		return sb.toString();
	}

}
