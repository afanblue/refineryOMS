package it.avn.oms.domain;

import java.text.SimpleDateFormat;
import java.util.Date;

public class Xfer {

/*
                id: 281
           updated: 0
     integer_value: 0
       float_value: 0
         scan_time: NULL
*/
	
	private Long    id;
	private Integer updated;
	private Long    integerValue;
	private Double  floatValue;
	private Date    scanTime;
	
	
	
	public Long getId() {
		return id;
	}

	public void setId(Long i) {
		this.id = i;
	}


	public Integer getUpdated() {
		return updated;
	}

	public void setUpdated(Integer upd ) {
		this.updated = upd;
	}


	public Long getIntegerValue() {
		return integerValue;
	}

	public void setIntegerValue(Long iv) {
		this.integerValue = iv;
	}


	public Double getFloatValue() {
		return floatValue;
	}

	public void setFloatValue(Double fv ) {
		this.floatValue = fv;
	}


	public Date getScanTime() {
		return scanTime;
	}

	public void setScanTime(Date st ) {
		this.scanTime = st;
	}


	public String toString() {
		StringBuffer sb = new StringBuffer(2000);
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		sb.append("XFER: [");
		sb.append("\"id\"=").append(this.id);
		sb.append(", \"updated\"=\"").append(this.updated).append("\"");
		sb.append(", \"integerValue\"=").append(this.integerValue);
		sb.append(", \"floatValue\"=").append(this.floatValue);
		sb.append(", \"scanTime\"=");
		sb.append((this.scanTime==null?"null":sdf.format(this.scanTime)));
		sb.append("\"");
		sb.append("]");
		return sb.toString();
	}
}
