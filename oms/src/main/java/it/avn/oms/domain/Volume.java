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
public class Volume implements Serializable {
	
	private static final long serialVersionUID = 8751282105532159742L;
	
	private Long   tankId;
	private Double level;
	private Double vol;
	
    
    public Volume() { }
    
	
	public Long getTankId() {
		return tankId;
	}
	
	public void setTankId(Long id) {
		this.tankId = id;
	}

	
	public Double getLevel() {
		return level;
	}
	
	public void setLevel(Double l) {
		this.level = l;
	}

	
	public Double getVolume() {
		return vol;
	}
	
	public void setVolume(Double v) {
		this.vol = v;
	}

	
	public String toString() {
		StringBuffer sb = new StringBuffer(2000);
		sb.append("Volume{\"tankId\"=").append(this.tankId);
		sb.append(", \"level\"=").append(this.level);
		sb.append(", \"volume\"=").append(this.vol);
		sb.append("}");
		return sb.toString();
	}

}
