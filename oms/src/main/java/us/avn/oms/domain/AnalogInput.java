package us.avn.oms.domain;

import java.io.Serializable;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Collection;
import java.util.Date;
import java.util.HashMap;

/*
 *           tag_id: 24
 *        type_code: L
 *         scan_int: 6
 *      scan_offset: 4
 *     current_scan: 0
 *       zero_value: 0
 *        max_value: 100
 *   hist_type_code: L
 *          percent: 2
 *            slope: 0
 *        raw_value: NULL
 *       scan_value: NULL
 *        scan_time: NULL
 *       prev_value: NULL
 *        prev_time: NULL
 *  last_hist_value: NULL
 *   last_hist_time: NULL
 *               hh: 47.0000
 *               hi: 42.0000
 *               lo: 10.0000
 *               ll: 5.0000
 */
public class AnalogInput implements Serializable {
	
	private static final long serialVersionUID = 8751282105532159742L;
	
	public static final String TEMPERATURE = "T";
	public static final String LEVEL = "L";
	public static final String FLOW_RATE = "F";
	public static final String PRESSURE = "P";
	public static final String MISCELLANEOUS = "M";
	
	protected Long    tagId;
	protected Tag     tag;
	protected Long    tagTypeId;
	protected String  typeCode;
	protected Long    unitId;
	protected Integer scanInt;
	protected Integer scanOffset;
	protected Integer currentScan;
	protected Double  zeroValue;
	protected Double  maxValue;
	protected String  histTypeCode;
	protected Double  percent;
	protected Double  slope;
	protected Double  rawValue;
	protected Double  scanValue;
	protected Date    scanTime;
 	protected Double  prevValue;
	protected Date    prevTime;
 	protected Double  lastHistValue;
 	protected Date    lastHistTime;
 	protected Double  hh;
 	protected Double  hi;
 	protected Double  lo;
 	protected Double  ll;
 	protected Integer intSinceLhs;
    protected Integer intScanTime;
 	protected Double  simValue;
 	protected Date    simScanTime;
 	protected Integer updated;
 	protected Collection<ReferenceCode> aiTypes;
 	protected Collection<ReferenceCode> histTypes;
 	protected HashMap<String,AlarmType> almTypes;
	protected Collection<Alarm> calm;
	protected Collection<Unit> unitList;
 	protected Tag siteLocation;

 	public AnalogInput() { }
 	
 	public AnalogInput( Long i, String n ) {
 		this.tagId = i;
 		Tag t = new Tag(i,n);
 		t.setTagTypeCode("AI");
 		t.setActive("Y");
 		this.tag = t;
 	}
 	
 	public AnalogInput( AnalogInput ai ) {
 		tagId = ai.tagId;
 		tag = ai.tag;
 		tagTypeId = ai.tagTypeId;
 		typeCode = ai.typeCode;
 		unitId = ai.unitId;
 		zeroValue = ai.zeroValue;
 		maxValue = ai.maxValue;
 		histTypeCode = ai.histTypeCode;
 		percent = ai.percent;
 		slope = ai.slope;
 		scanValue = ai.scanValue;
 		scanTime = ai.scanTime;
 	 	prevValue = ai.prevValue;
 		prevTime = ai.prevTime;
 	 	lastHistValue = ai.lastHistValue;
 	 	lastHistTime = ai.lastHistTime;
 	 	hh = ai.hh;
 	 	hi = ai.hi;
 	 	lo = ai.lo;
 	 	ll = ai.ll;
 	 	intSinceLhs = ai.intSinceLhs;
 	    intScanTime = ai.intScanTime;
 	 	simValue = ai.simValue;
 	 	simScanTime = ai.simScanTime;
 	 	updated = ai.updated;
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

	
	public Long getTagTypeId() {
		return tagTypeId;
	}
	
	public void setTagTypeId( Long tti ) {
		this.tagTypeId = tti;
	}

	
	public String getTypeCode() {
		return typeCode;
	}

	public void setTypeCode(String typeCode) {
		this.typeCode = typeCode;
	}


	public Long getUnitId() {
		return unitId;
	}

	public void setUnitId(Long uid) {
		this.unitId = uid;
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

	public void setHistTypeCode(String histTypeCode) {
		this.histTypeCode = histTypeCode;
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


	public Double getRawValue() {
		return rawValue;
	}

	public void setRawValue(Double rawValue) {
		this.rawValue = rawValue;
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


	public Double getHh() {
		return hh;
	}

	public void setHh(Double hh) {
		this.hh = hh;
	}


	public Double getHi() {
		return hi;
	}

	public void setHi(Double hi) {
		this.hi = hi;
	}


	public Double getLo() {
		return lo;
	}

	public void setLo(Double lo) {
		this.lo = lo;
	}


	public Double getLl() {
		return ll;
	}

	public void setLl(Double ll) {
		this.ll = ll;
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

	
	public Double getSimValue() {
		return simValue;
	}

	public void setSimValue(Double simValue) {
		this.simValue = simValue;
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

	public void setUpdated(Integer u) {
		this.updated = u;
	}
	

	public Collection<ReferenceCode> getAiTypes() {
		return aiTypes;
	}

	public void setAiTypes(Collection<ReferenceCode> aiTypes) {
		this.aiTypes = aiTypes;
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

	
	public HashMap<String, AlarmType> getAlarmTypes() {
		return almTypes;
	}

	public void setAlarmTypes(HashMap<String, AlarmType> almTypes) {
		this.almTypes = almTypes;
	}


	public HashMap<String, AlarmType> getAlmTypes() {
		return almTypes;
	}

	public void setAlmTypes(HashMap<String, AlarmType> almTypes) {
		this.almTypes = almTypes;
	}

	
	public Collection<Alarm> getCalm() {
		return calm;
	}

	public void setCalm(Collection<Alarm> calm) {
		this.calm = calm;
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
		sb.append("AnalogInput{\"id\"=").append(this.tagId);
		sb.append(", \"tag\"=[").append(this.tag.toString()).append("]");
		sb.append(", \"typeCode\"=").append(this.typeCode).append("\"");
		sb.append(", \"scanInt\"=").append(this.scanInt);
		sb.append(", \"scanOffset\"=").append(this.scanOffset);
		sb.append(", \"currentScan\"=").append(this.currentScan);
		sb.append(", \"zeroValue\"=").append(this.zeroValue);
		sb.append(", \"maxValue\"=").append(this.maxValue);
		sb.append(", \"histTypeCode\"=").append(this.histTypeCode).append("\"");
		sb.append(", \"percent\"=").append(this.percent);
		sb.append(", \"slope\"=").append(this.slope);
		sb.append(", \"rawValue\"=").append(this.rawValue);
		sb.append(", \"scanValue\"=").append(this.scanValue);
		sb.append(", \"scanTime\"=\"").append(this.scanTime!=null?sdf.format(this.scanTime):"null").append("\"");
		sb.append(", \"prevValue\"=").append(this.prevValue);
		sb.append(", \"prevTime\"=\"").append(this.prevTime!=null?sdf.format(this.prevTime):"null").append("\"");
		sb.append(", \"lastHistValue\"=").append(this.lastHistValue);
		sb.append(", \"lastHistTime\"=\"").append(this.lastHistTime!=null?sdf.format(this.lastHistTime):"null").append("\"");
		sb.append(", \"hh\"=").append(this.hh);
		sb.append(", \"hi\"=").append(this.hi);
		sb.append(", \"lo\"=").append(this.lo);
		sb.append(", \"ll\"=").append(this.ll);
        sb.append("}");
		return sb.toString();
	}

}
