package us.avn.oms.domain;

import java.io.Serializable;
import java.util.Collection;
import java.util.Date;
import java.util.Vector;


public class Train extends Tag implements Serializable {

	private static final long serialVersionUID = -2719140494446170126L;
	private String owner;
	private Long ownerId;
	private Long noCars;
	private String contentCode;
	private Date arrivalDt;
	
	
	public Train() {
		super();
		tagTypeCode = "T";
	}

	public Train(Long i, String n) {
		super(i, n);
		tagTypeCode = "T";
	}

	public Train(Long i, String n, String c) {
		super(i, n, c);
		tagTypeCode = "T";
	}

	public Train(Tag t) {
		super(t);
		tagTypeCode = "T";
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
	

	public Long getNoCars() {
		return noCars;
	}

	public void setNoCars(Long noCars) {
		this.noCars = noCars;
	}

	
	public String getContentCode() {
		return contentCode;
	}

	public void setContentCode(String contentCode) {
		this.contentCode = contentCode;
	}

	
	public Date getArrivalDt() {
		return arrivalDt;
	}

	public void setArrivalDt(Date arrivalDt) {
		this.arrivalDt = arrivalDt;
	}
	
	
}
