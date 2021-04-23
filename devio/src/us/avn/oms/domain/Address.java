package us.avn.oms.domain;

import java.io.Serializable;

public class Address extends OMSObject implements Serializable {

	private Long id;
	private Long deviceId;
	private Long interval;
	private Long offset;
	private Long iaddr1; 
	private Long iaddr2; 
	private Long iaddr3; 
	private Long iaddr4; 
	private Long iaddr5;
	private Long iaddr6;
	private String saddr1; 
	private String saddr2;
	private String saddr3; 
	private String saddr4; 
	private String saddr5; 
	private String saddr6;
    private String active;
    private Double scanValue;
	private Integer updated;
	
	public Address() {
	}

	public Address( Long id, Long d ) {
		this.id = id;
		this.deviceId = d;
	}


	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	
	public Long getDeviceId() {
		return deviceId;
	}

	public void setDeviceId(Long deviceId) {
		this.deviceId = deviceId;
	}

	
	public Long getInterval() {
		return interval;
	}

	public void setInterval(Long interval) {
		this.interval = interval;
	}


	public Long getOffset() {
		return offset;
	}

	public void setOffset(Long offset) {
		this.offset = offset;
	}

	
	public Long getIaddr1() {
		return iaddr1;
	}

	public void setIaddr1(Long iaddr1) {
		this.iaddr1 = iaddr1;
	}

	
	public String getSaddr1() {
		return saddr1;
	}

	public void setSaddr1(String saddr1) {
		this.saddr1 = saddr1;
	}

	
	public Long getIaddr2() {
		return iaddr2;
	}

	public void setIaddr2(Long iaddr2) {
		this.iaddr2 = iaddr2;
	}

	
	public String getSaddr2() {
		return saddr2;
	}

	public void setSaddr2(String saddr2) {
		this.saddr2 = saddr2;
	}

	
	public Long getIaddr3() {
		return iaddr3;
	}

	public void setIaddr3(Long iaddr3) {
		this.iaddr3 = iaddr3;
	}

	
	public String getSaddr3() {
		return saddr3;
	}
	
	public void setSaddr3(String saddr3) {
		this.saddr3 = saddr3;
	}
	

	public Long getIaddr4() {
		return iaddr4;
	}

	public void setIaddr4(Long iaddr4) {
		this.iaddr4 = iaddr4;
	}

	
	public String getSaddr4() {
		return saddr4;
	}
	
	public void setSaddr4(String saddr4) {
		this.saddr4 = saddr4;
	}

	
	public Long getIaddr5() {
		return iaddr5;
	}
	
	public void setIaddr5(Long iaddr5) {
		this.iaddr5 = iaddr5;
	}

	
	public String getSaddr5() {
		return saddr5;
	}
	
	public void setSaddr5(String saddr5) {
		this.saddr5 = saddr5;
	}

	
	public Long getIaddr6() {
		return iaddr6;
	}
	
	public void setIaddr6(Long iaddr6) {
		this.iaddr6 = iaddr6;
	}

	
	public String getSaddr6() {
		return saddr6;
	}
	
	public void setSaddr6(String saddr6) {
		this.saddr6 = saddr6;
	}
	

	public String getActive() {
		return active;
	}

	public void setActive(String active) {
		this.active = active;
	}


	public Double getScanValue() {
		return scanValue;
	}

	public void setScanValue(Double sv) {
		this.scanValue = sv;
	}

	
	public Integer getUpdated() {
		return updated;
	}
	
	public void setUpdated( Integer u ) {
		updated = u;
	}

	
}
