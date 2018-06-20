package us.avn.oms.domain;

import java.io.Serializable;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Collection;
import java.util.Date;

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
public class AIValue implements Serializable {
	
	private static final long serialVersionUID = 8751282105532159742L;
	private SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

	private Long   tagId;
	private String name;
	private Double value;
	private String aiType;
	private String valueText;
	private Date   scanTime;
	private String alarmCode;
	private String alarmColor;
	private Location location;
	

 	public AIValue() { }
 	
 	public AIValue( Long i, String n ) {
 		this.tagId = i;
 		this.name = n;
 	}
 	
	public Long getTagId() {
		return tagId;
	}

	public void setTagId(Long tagId) {
		this.tagId = tagId;
	}
	

	public String getName() {
		return name;
	}

	public void setName(String n) {
		this.name = n;
	}


	public Double getValue() {
		return value;
	}

	public void setValue(Double v) {
		this.value = v;
	}


	public String getAiType() {
		return aiType;
	}

	public void setAiType(String t) {
		this.aiType = t;
	}


	public String getValueText() {
		return valueText;
	}

	public void setValueText(String v) {
		this.valueText = v;
	}


	public String getScanTime() {
		if( scanTime != null ) {
			return sdf.format(scanTime);
		}
		return null;
	}

	public void setScanTime(String scanTime) {
		try {
			this.scanTime = sdf.parse(scanTime);
		} catch( Exception e ) {
			this.scanTime = null;
		}
	}
	
	
	public String getAlarmCode() {
		return alarmCode;
	}

	public void setAlarmCode(String ac) {
		this.alarmCode = ac;
	}


	public String getAlarmColor() {
		return alarmColor;
	}

	public void setAlarmColor(String ac) {
		this.alarmColor = ac;
	}
	
	
	public Location getLocation() {
		return this.location;
	}
	
	public void setLocation( Location l ) {
		this.location = l;
	}


	public String toString() {
		StringBuffer sb = new StringBuffer(2000);
		sb.append("AIValue{\"id\"=").append(this.tagId);
		sb.append(", \"name\"=\"").append(this.name).append("\"");
		sb.append(", \"value\"=\"").append(this.value).append("\"");
		sb.append(", \"scanTime\"=\"").append(this.scanTime!=null?sdf.format(this.scanTime):"null").append("\"");
		sb.append(", \"alarmCode\"=\"").append(this.alarmCode).append("\"");
		sb.append(", \"alarmColor\"=\"").append(this.alarmColor).append("\"");
		sb.append("}");
		return sb.toString();
	}

}
