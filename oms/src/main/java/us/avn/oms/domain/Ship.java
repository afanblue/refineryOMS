package us.avn.oms.domain;

import java.io.Serializable;
import java.util.Collection;
import java.util.Vector;


/**
 * Ship sizes 
 * AFRA Scale[38]                           Flexible market scale[38]
 * Class	                Size in DWT	    Class	        Size in DWT
 * General Purpose tanker	10,000–24,999   Product tanker	10,000–60,000
 * Medium Range tanker	    25,000–44,999   
 * LR1 (Large Range 1)	    45,000–79,999   Panamax	        60,000–80,000 (500,000 bbls)
 * LR2 (Large Range 2)	    80,000–159,999  Aframax	        80,000–120,000 (750,000 bbls)
 *                                          Suezmax	        120,000–200,000 (1,000,000 bbls)
 * VLCC                     160,000–319,999 VLCC            200,000–320,000 (2,000,000 bbls)
 * ULCC                     320,000–549,999 ULCC            320,000–550,000 (4,000,000 bbls)
 * @author Allan
 *
 */
public class Ship extends Tag implements Serializable {

	private static final long serialVersionUID = -2719140494446170126L;
	private String fullName;
	private String owner;
	private Long ownerId;
	private Collection<Hold> holds;
	
	public Ship() {
		super();
		tagTypeCode = "S";
	}

	public Ship(Long i, String n) {
		super(i, n);
		tagTypeCode = "S";
	}

	public Ship(Long i, String n, String c) {
		super(i, n, c);
		tagTypeCode = "S";
	}

	public Ship(Tag t) {
		super(t);
		tagTypeCode = "S";
	}

	
	public String getFullName() {
		return fullName;
	}

	public void setFullName(String fullName) {
		this.fullName = fullName;
	}

	
	public String getOwner() {
		return owner;
	}
	

	public void setOwner(String o) {
		this.owner = o;
	}
	
	
	public Long getOwnerId() {
		return ownerId;
	}

	public void setOwnerId(Long ownerId) {
		this.ownerId = ownerId;
	}

	
	public Collection<Hold> getHolds() {
		return holds;
	}

	public void setHolds(Collection<Hold> holds) {
		this.holds = holds;
	}
	
	
}
