package us.avn.oms.domain;

import java.io.Serializable;
import java.text.SimpleDateFormat;
import java.util.Date;

public class History implements Serializable {
	
	private static final long serialVersionUID = 8751282105532159742L;
	
	public static final String BOXCAR = "B";
	public static final String LINEAR = "L";
	public static final String NONE = "N";
	
	
    protected Long   id;
	protected Long   tagId;
	protected Double y;
	protected Long   x;
	  
	
	public Long getId() {
		return this.id;
	}
	
	public void setId( Long i ) {
		this.id = i;
	}
	

	public Long getTagId() {
		return tagId;
	}
	
	public void setTagId(Long ti) {
		this.tagId = ti;
	}
	
	
	public Double getY() {
		return y;
	}
	
	public void setY(Double sv) {
		this.y = sv;
	}
	
	
	public Long getX() {
		return x;
	}
	
	public void setX(Long st) {
		this.x = st;
	}
	
	
	public String toString() {
		StringBuffer sb = new StringBuffer(2000);
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		sb.append("History{\"id\":\"").append(this.id);
		sb.append(", \"tagId\"=").append(this.tagId);
		sb.append("\", scanValue\":\"").append(this.y);
		sb.append(", \"scanTime\"=").append(this.x);
		sb.append("}");
		return sb.toString();
	}

}
