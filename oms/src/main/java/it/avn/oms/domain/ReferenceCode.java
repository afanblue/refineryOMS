package it.avn.oms.domain;

import java.io.Serializable;

/**
 * 
 * @author Allan
 *
 * Can be used for any of the views based on the REFERENCE_CODE table.
 *      
 *           id: 35
 *     category: CONTENT-TYPE
 *         name: StillGas
 *         code: SG
 *        value: 11
 *  description: Still Gas
 *       active: Y
 */
public class ReferenceCode implements Serializable {
	
	private static final long serialVersionUID = 8751282105532159742L;
	
	private Long id;
	private String category;
	private String name;
	private String code;
	private Integer value;
	private String description;
	private String active;
	  
	
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}


	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
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
	

	public Integer getValue() {
		return value;
	}

	public void setValue(Integer value) {
		this.value = value;
	}


	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}


	public String getActive() {
		return active;
	}

	public void setActive(String active) {
		this.active = active;
	}


	public String toString() {
		StringBuffer sb = new StringBuffer(2000);
		sb.append("ReferenceCode{\"id\"=\"").append(this.id);
		sb.append(", \"category\"=\"").append(this.category).append("\"");
		sb.append(", \"name\"=\"").append(this.name).append("\"");
		sb.append(", \"code\"=\"").append(this.code).append("\"");
		sb.append(", \"value\"=\"").append(this.value);
		sb.append(", \"description\"=\"").append(this.description).append("\"");
		sb.append(", \"active\"=\"").append(this.active).append("\"");
		sb.append("}");
		return sb.toString();
	}

}
