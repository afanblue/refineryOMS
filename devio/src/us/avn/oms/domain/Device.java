package us.avn.oms.domain;

import java.io.Serializable;

public class Device extends OMSObject implements Serializable  {

	private Long id;
	private String description;
	private String type;
	private String model;
	private String param1;
	private String param2;
	private String param3;
	private String param4;	
	private Long cycleTime;
	private Long seqNo;
	private Long offset;
    private String active;
	
	
	public Device() {
	}

	public Device( Long id, String d ) {
		this.id = id;
		this.description = d;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}


	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}


	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}


	public String getModel() {
		return model;
	}

	public void setModel(String model) {
		this.model = model;
	}


	public String getParam1() {
		return param1;
	}

	public void setParam1(String param1) {
		this.param1 = param1;
	}

	
	public String getParam2() {
		return param2;
	}

	public void setParam2(String param2) {
		this.param2 = param2;
	}
	

	public String getParam3() {
		return param3;
	}

	public void setParam3(String param3) {
		this.param3 = param3;
	}

	
	public String getParam4() {
		return param4;
	}

	public void setParam4(String param4) {
		this.param4 = param4;
	}
	

	public Long getCycleTime() {
		return cycleTime;
	}

	public void setCycleTime(Long ct) {
		this.cycleTime = ct;
	}


	public Long getOffset() {
		return offset;
	}

	public void setOffset(Long offset) {
		this.offset = offset;
	}
	

	public Long getSeqNo() {
		return seqNo;
	}

	public void setSeqNo(Long sn) {
		this.seqNo = sn;
	}


	public String getActive() {
		return active;
	}

	public void setActive(String active) {
		this.active = active;
	}

}
