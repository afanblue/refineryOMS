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
public class Taglet extends IdName implements Serializable {
	
	private static final long serialVersionUID = 8751282105532159742L;
	
	private String description;
	private String tagTypeCode;
    private String tagTypeInfo;  // specific to user, NOT a field of TAG table 
    private String active;
    
    public Taglet() { }
    
    public Taglet( Long i, String n ) {
    	this.id = i;
    	this.name = n;
    }
	
	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	
	public String getTagTypeCode() {
		return tagTypeCode;
	}

	public void setTagTypeCode(String tagTypeCode) {
		this.tagTypeCode = tagTypeCode;
	}

	
	public String getTagTypeInfo() {
		return tagTypeInfo;
	}

	public void setTagTypeInfo(String tti) {
		this.tagTypeInfo = tti;
	}

	
	public String getActive() {
		return active;
	}

	public void setActive(String active) {
		this.active = active;
	}

	
	public String toString() {
		StringBuffer sb = new StringBuffer(2000);
		sb.append("Taglet{\"id\"=").append(this.id);
		sb.append(", \"name\"=\"").append(this.name).append("\"");
		sb.append(", \"description\"=").append(this.description).append("\"");
		sb.append(", \"tagTypeCode\"=").append(this.tagTypeCode).append("\"");
		sb.append(", \"tagTypeInfo\"=").append(this.tagTypeInfo).append("\"");
		sb.append(", \"active\"=\"").append(this.active).append("\"");
		sb.append("}");
		return sb.toString();
	}

}
