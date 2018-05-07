package it.avn.oms.domain;

import java.io.Serializable;
import java.util.Collection;

/*
 *          c1_lat: 39.592313
 *         c1_long: -75.641903
 *          c2_lat: 39.579168
 *         c2_long: -75.619368
 */
public class Location implements Serializable {
	
	private static final long serialVersionUID = 8751282105532159742L;
		
	private Double c1Lat;
	private Double c1Long;
	private Double c2Lat;
	private Double c2Long;
    private String active;
    
    public Location() { }
    

    public Double getC1Lat() {
		return c1Lat;
	}

	public void setC1Lat(Double c1Lat) {
		this.c1Lat = c1Lat;
	}


	public Double getC1Long() {
		return c1Long;
	}

	public void setC1Long(Double c1Long) {
		this.c1Long = c1Long;
	}


	public Double getC2Lat() {
		return c2Lat;
	}

	public void setC2Lat(Double c2Lat) {
		this.c2Lat = c2Lat;
	}


	public Double getC2Long() {
		return c2Long;
	}

	public void setC2Long(Double c2Long) {
		this.c2Long = c2Long;
	}
	
	
	public String toString() {
		StringBuffer sb = new StringBuffer(2000);
		sb.append("Tag{\"c1Lat\"=").append(this.c1Lat);
		sb.append(", \"c1Long\"=").append(this.c1Long);
		sb.append(", \"c2Lat\"=").append(this.c2Lat);
		sb.append(", \"c2Long\"=").append(this.c2Long);
		sb.append("}");
		return sb.toString();
	}

}
