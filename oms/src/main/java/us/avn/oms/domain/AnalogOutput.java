package us.avn.oms.domain;

import java.io.Serializable;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Collection;
import java.util.Date;
import java.util.HashMap;

/*
 *           tag_id: 24
 *       zero_value: 0
 *        max_value: 100
 *   hist_type_code: L
 *          percent: 2
 *            slope: 0
 *       scan_value: NULL
 *        scan_time: NULL
 *       prev_value: NULL
 *        prev_time: NULL
 *  last_hist_value: NULL
 *   last_hist_time: NULL
 */
public class AnalogOutput implements Serializable {
	
	private static final long serialVersionUID = 8751282105532159742L;
	
	protected Long    tagId;
	protected Tag     tag;
	protected Long    unitId;
	protected String  unit;
	protected Double  zeroValue;
	protected Double  maxValue;
	protected String  histTypeCode;
	protected Double  percent;
	protected Double  slope;
	protected Double  scanValue;
	protected Date    scanTime;
 	protected Double  prevValue;
	protected Date    prevTime;
 	protected Double  lastHistValue;
 	protected Date    lastHistTime;
 	protected Integer intSinceLhs;
    protected Integer intScanTime;
 	protected Collection<ReferenceCode> histTypes;
	protected Collection<Unit> unitList;
 	protected Tag siteLocation;

 	public AnalogOutput() { }
 	
 	public AnalogOutput( Long i, String n ) {
 		this.tagId = i;
 		Tag t = new Tag(i,n);
 		t.setTagTypeCode("AI");
 		t.setActive("Y");
 		this.tag = t;
 	}
 	
 	public AnalogOutput( AnalogOutput ao ) {
 		tagId = ao.tagId;
 		tag = ao.tag;
 		unitId = ao.unitId;
 		zeroValue = ao.zeroValue;
 		maxValue = ao.maxValue;
 		histTypeCode = ao.histTypeCode;
 		percent = ao.percent;
 		slope = ao.slope;
 		scanValue = ao.scanValue;
 		scanTime = ao.scanTime;
 	 	prevValue = ao.prevValue;
 		prevTime = ao.prevTime;
 	 	lastHistValue = ao.lastHistValue;
 	 	lastHistTime = ao.lastHistTime;
 	 	intSinceLhs = ao.intSinceLhs;
 	    intScanTime = ao.intScanTime;
 	}
 	
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

	
	public Long getUnitId() {
		return unitId;
	}

	public void setUnitId(Long uid) {
		this.unitId = uid;
	}
	

	public String getUnit() {
		return unit;
	}

	public void setUnit(String unit) {
		this.unit = unit;
	}

	
	public Double getZeroValue() {
		return zeroValue;
	}

	public void setZeroValue(Double zeroValue) {
		this.zeroValue = zeroValue;
	}


	public Double getMaxValue() {
		return maxValue;
	}

	public void setMaxValue(Double maxValue) {
		this.maxValue = maxValue;
	}


	public String getHistTypeCode() {
		return histTypeCode;
	}

	public void setHistoryTypeId(String htcd) {
		this.histTypeCode = htcd;
	}


	public Double getPercent() {
		return percent;
	}

	public void setPercent(Double percent) {
		this.percent = percent;
	}


	public Double getSlope() {
		return slope;
	}

	public void setSlope(Double slope) {
		this.slope = slope;
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


	public Date getPrevTime() {
		return prevTime;
	}

	public void setPrevTime(Date prevTime) {
		this.prevTime = prevTime;
	}


	public Double getLastHistValue() {
		return lastHistValue;
	}

	public void setLastHistValue(Double lastHistValue) {
		this.lastHistValue = lastHistValue;
	}


	public Date getLastHistTime() {
		return lastHistTime;
	}

	public void setLastHistTime(Date lastHistTime) {
		this.lastHistTime = lastHistTime;
	}


 	public Integer getIntSinceLhs() {
		return intSinceLhs;
	}

	public void setIntSinceLhs(Integer intSinceLhs) {
		this.intSinceLhs = intSinceLhs;
	}

	
	public Integer getIntScanTime() {
		return intScanTime;
	}

	public void setIntScanTime(Integer intScanTime) {
		this.intScanTime = intScanTime;
	}

	
	public Collection<ReferenceCode> getHistTypes() {
		return histTypes;
	}

	public void setHistTypes(Collection<ReferenceCode> histTypes) {
		this.histTypes = histTypes;
	}

	
	public Tag getSiteLocation() {
		return siteLocation;
	}

	public void setSiteLocation(Tag siteLocation) {
		this.siteLocation = siteLocation;
	}

	
	public Collection<Unit> getUnitList() {
		return unitList;
	}

	public void setUnitList(Collection<Unit> unitList) {
		this.unitList = unitList;
	}

	
	public String toString() {
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		StringBuffer sb = new StringBuffer(2000);
		sb.append("AnalogOutput{ \"id\"=").append(this.tagId);
		sb.append(", \"tag\"=[").append(this.tag.toString()).append("]");
		sb.append(", \"unit\"=\"").append(this.unit).append(" (").append(this.unitId).append(")");
		sb.append(", \"zeroValue\"=").append(this.zeroValue);
		sb.append(", \"maxValue\"=").append(this.maxValue);
		sb.append(", \"histTypeCode\"=").append(this.histTypeCode);
		sb.append(", \"percent\"=").append(this.percent);
		sb.append(", \"slope\"=").append(this.slope);
		sb.append(", \"scanValue\"=").append(this.scanValue);
		sb.append(", \"scanTime\"=\"").append(this.scanTime!=null?sdf.format(this.scanTime):"null").append("\"");
		sb.append(", \"prevValue\"=").append(this.prevValue);
		sb.append(", \"prevTime\"=\"").append(this.prevTime!=null?sdf.format(this.prevTime):"null").append("\"");
		sb.append(", \"lastHistValue\"=").append(this.lastHistValue);
		sb.append(", \"lastHistTime\"=\"").append(this.lastHistTime!=null?sdf.format(this.lastHistTime):"null").append("\"");
        sb.append("}");
		return sb.toString();
	}

}
