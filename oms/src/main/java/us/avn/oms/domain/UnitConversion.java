package us.avn.oms.domain;

import java.io.Serializable;
import java.util.Collection;

/**
 */
public class UnitConversion implements Serializable {
	
	private static final long serialVersionUID = 8751282105532159742L;
	
	private Long id;
	private Long fromId;
	private Long toId;
	private String from;
	private String to;
	private Double offset;
	private Double factor;
 
	
    public UnitConversion() { }
    
	
	public Long getId() {
		return id;
	}
	
	public void setId(Long id) {
		this.id = id;
	}


	public Long getFromId() {
		return fromId;
	}

	public void setFromId(Long fromId) {
		this.fromId = fromId;
	}


	public Long getToId() {
		return toId;
	}

	public void setToId(Long toId) {
		this.toId = toId;
	}

	
	public String getFrom() {
		return from;
	}

	public void setFrom(String from) {
		this.from = from;
	}
	

	public String getTo() {
		return to;
	}

	public void setTo(String to) {
		this.to = to;
	}


	public Double getOffset() {
		return offset;
	}

	public void setOffset(Double offset) {
		this.offset = offset;
	}


	public Double getFactor() {
		return factor;
	}

	public void setFactor(Double factor) {
		this.factor = factor;
	}


	public String toString() {
		StringBuffer sb = new StringBuffer(2000);
		sb.append("UnitConversion{\"id\"=").append(this.id);
		sb.append(", \"fromId\"=").append(this.fromId);
		sb.append(", \"from\"=\"").append(this.from).append("\"");
		sb.append(", \"toId\"=").append(this.toId);
		sb.append(", \"to\"=\"").append(this.to).append("\"");
		sb.append(", \"offset\"=").append(this.offset);
		sb.append(", \"factor\"=").append(this.factor);
		sb.append("}");
		return sb.toString();
	}

}
