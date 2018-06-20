package us.avn.oms.domain;

import java.io.Serializable;
import java.util.Collection;

/**
 *  HistoryRequest is a JavaBean used for configuring the parameters
 *  for requesting history data for a particular tag. 
 */
public class HistoryRequest implements Serializable {
	
	private static final long serialVersionUID = 8751282105532159742L;
	
	public static final String DAY = "day";
	public static final String HOUR = "hour";
	
	private Long    tagId;
	private Integer startInterval;
	private Integer endInterval;
	private String  units;
	
    
    public HistoryRequest() { 
    	this.startInterval = 1;
    	this.units = DAY;
    }
    
    public HistoryRequest( Long id, Integer si ) {
    	this.tagId = id;
    	this.startInterval = si;
    	this.units = DAY;
    }
    
    /* ************************************************** */
	
	public Long getTagId() {
		return tagId;
	}
	
	public void setTagId(Long id) {
		this.tagId = id;
	}

	
	public Integer getStartInterval() {
		return startInterval;
	}
	
	public void setStartInterval(Integer st) {
		this.startInterval = st;
	}

	
	public Integer getEndInterval() {
		return endInterval;
	}
	
	public void setEndInterval(Integer et) {
		this.endInterval = et;
	}
	
	
	public String getUnits() {
		return this.units;
	}
	
	public void setUnits( String u) {
		this.units = u;
	}
	
	
	public String toString() {
		StringBuffer sb = new StringBuffer(2000);
		sb.append("HistoryRequest{\"tagId\"=").append(this.tagId);
		sb.append(", \"startInterval\"=").append(this.startInterval);
		sb.append(", \"endInterval\"=").append(this.endInterval);
		sb.append(", \"units\"=\"").append(this.units).append("\"");
		sb.append("}");
		return sb.toString();
	}

}
