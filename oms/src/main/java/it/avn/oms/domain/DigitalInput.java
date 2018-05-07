package it.avn.oms.domain;

import java.io.Serializable;
//import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Collection;
import java.util.Date;

/*
 *           tag_id: 24
 *         scan_int: 6
 *      scan_offset: 4
 *     current_scan: 0
 *   hist_type_code: L
 *      alarm_state: 
 *       alarm_code:
 *       scan_value: NULL
 *        scan_time: NULL
 *       prev_value: NULL
 *   prev_scan_time: NULL
 *  last_hist_value: NULL
 *   last_hist_time: NULL
 *       value_view: 
 */
public class DigitalInput implements Serializable {
	
	private static final long serialVersionUID = 8751282105532159742L;
	
	protected Long    tagId;
	protected Tag     tag;
	protected Integer scanInt;
	protected Integer scanOffset;
	protected Integer currentScan;
	protected String  histTypeCode;
	protected Double  alarmState;
	protected Double  alarmCode;
	protected Double  scanValue;
	protected Date    scanTime;
 	protected Double  prevValue;
	protected Date    prevScanTime;
 	protected Date    lastHistValue;
 	protected Date    lastHistTime;
 	protected String  valueView;
 	protected Integer simValue;
 	protected Date    simScanTime;
 	protected Integer updated;
 	protected Tag     siteLocation;
 	protected Collection<ReferenceCode> histTypes;
 	protected Collection<String>views;
	
	

	public Long getTagId() {
		return tagId;
	}

	public void setTagId(Long tagId) {
		this.tagId = tagId;
	}
	

	public Tag getTag() {
		return tag;
	}

	public void setTag(Tag t) {
		this.tag = t;
	}

	
	public Integer getScanInt() {
		return scanInt;
	}

	public void setScanInt(Integer scanInt) {
		this.scanInt = scanInt;
	}


	public Integer getScanOffset() {
		return scanOffset;
	}

	public void setScanOffset(Integer scanOffset) {
		this.scanOffset = scanOffset;
	}


	public Integer getCurrentScan() {
		return currentScan;
	}

	public void setCurrentScan(Integer currentScan) {
		this.currentScan = currentScan;
	}


	public String getHistTypeCode() {
		return histTypeCode;
	}

	public void setHistTypeCode(String histTypeCode) {
		this.histTypeCode = histTypeCode;
	}


	public Double getAlarmState() {
		return alarmState;
	}

	public void setAlarmState(Double as) {
		this.alarmState = as;
	}


	public Double getAlarmCode() {
		return alarmCode;
	}

	public void setAlarmCode(Double ac) {
		this.alarmCode = ac;
	}


	public Double getScanValue() {
		return scanValue;
	}

	public void setScanValue(Double scanValue) {
		this.scanValue = scanValue;
	}


	public Date getScanTime() {
		return scanTime;
	}

	public void setScanTime(Date scanTime) {
		this.scanTime = scanTime;
	}


	public Double getPrevValue() {
		return prevValue;
	}

	public void setPrevValue(Double prevValue) {
		this.prevValue = prevValue;
	}


	public Date getPrevScanTime() {
		return prevScanTime;
	}

	public void setPrevScanTime(Date prevTime) {
		this.prevScanTime = prevTime;
	}


	public Date getLastHistValue() {
		return lastHistValue;
	}

	public void setLastHistValue(Date lastHistValue) {
		this.lastHistValue = lastHistValue;
	}


	public Date getLastHistTime() {
		return lastHistTime;
	}

	public void setLastHistTime(Date lastHistTime) {
		this.lastHistTime = lastHistTime;
	}


	public String getValueView() {
		return valueView;
	}

	public void setValueView(String valueView) {
		this.valueView = valueView;
	}


	public Integer getSimValue() {
		return simValue;
	}

	public void setSimValue(Integer pv) {
		this.simValue = pv;
	}


	public Date getSimScanTime() {
		return simScanTime;
	}

	public void setSimScanTime(Date pst) {
		this.simScanTime = pst;
	}


	public Integer getUpdated() {
		return updated;
	}

	public void setUpdated( Integer u ) {
		this.updated = u;
	}

	
	public Collection<ReferenceCode> getHistTypes() {
		return histTypes;
	}

	public void setHistTypes(Collection<ReferenceCode> histTypes) {
		this.histTypes = histTypes;
	}

	
	public Collection<String> getViews() {
		return views;
	}

	public void setViews(Collection<String> views) {
		this.views = views;
	}


	public Tag getSiteLocation() {
		return siteLocation;
	}

	public void setSiteLocation(Tag siteLocation) {
		this.siteLocation = siteLocation;
	}

	
	public String toString() {
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		StringBuffer sb = new StringBuffer(2000);
		sb.append("DigitalInput{\"tagId\"=").append(this.tagId);
		sb.append(", \"tag\"=[").append(this.tag.toString()).append("]");
		sb.append(", \"scanInt\"=").append(this.scanInt);
		sb.append(", \"scanOffset\"=").append(this.scanOffset);
		sb.append(", \"currentScan\"=").append(this.currentScan);
		sb.append(", \"alarmState\"=").append(this.alarmState);
		sb.append(", \"alarmCode\"=").append(this.alarmCode);
		sb.append(", \"histTypeCode\"=\"").append(this.histTypeCode).append("\"");
		sb.append(", \"scanValue\"=").append(this.scanValue);
		sb.append(", \"scanTime\"=\"").append(this.scanTime!=null?sdf.format(this.scanTime):"null").append("\"");
		sb.append(", \"prevValue\"=").append(this.prevValue);
		sb.append(", \"prevScanTime\"=\"").append(this.prevScanTime!=null?sdf.format(this.prevScanTime):"null").append("\"");
		sb.append(", \"lastHistValue\"=").append(this.lastHistValue);
		sb.append(", \"lastHistTime\"=\"").append(this.lastHistTime!=null?sdf.format(this.lastHistTime):"null").append("\"");
		sb.append(", \"valueView\"=\"").append(this.valueView).append("\"");
        sb.append("}");
		return sb.toString();
	}

}
