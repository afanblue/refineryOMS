package us.avn.oms.domain;

import java.io.Serializable;
import java.text.SimpleDateFormat;
import java.util.Date;

/*
 * AlarmType: id, priority, alarm_msg_id, code
 * AlarmMessage: id, obj_id, abbr, message
 * Alarm: id, alarm_type_id, tag_type_id, obj_id, alm_occurred, acknowledged, active, alarm_msg_id
 */
public class Alarm implements Serializable {
	
	private static final long serialVersionUID = 8751282105532159742L;
	
	private Long   id;
	private Long   alarmTypeId;
	private String alarmCode;
	private Long   tagTypeId;
	private Long   tagId;
	private Tag    alarmTag;
	private Date   almOccurred;
	private String acknowledged;
	private String active;
	private Long   alarmMsgId;
	private String message;
	private String color;
	private String priority;
	private Double value;
	
	public Alarm() {
		this.alarmTag = new Tag();
	}
	
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}


	public Long getAlarmTypeId() {
		return alarmTypeId;
	}

	public void setAlarmTypeId(Long alarmTypeId) {
		this.alarmTypeId = alarmTypeId;
	}


	public String getAlarmCode() {
		return (alarmCode==null?"NORM":alarmCode);
	}

	public void setAlarmCode(String alarmCode) {
		this.alarmCode = alarmCode;
	}

	
	public Long getTagTypeId() {
		return tagTypeId;
	}

	public void setTagTypeId(Long tti ) {
		this.tagTypeId = tti;
	}


	public Long getTagId() {
		return tagId;
	}

	public void setTagId(Long tagId) {
		this.tagId = tagId;
	}

	
	public Tag getAlarmTag() {
		return alarmTag;
	}

	public void setAlarmTag(Tag alarmTag) {
		this.alarmTag = alarmTag;
	}

	
	public Date getAlmOccurred() {
		return almOccurred;
	}

	public void setAlmOccurred(Date almOccurred) {
		this.almOccurred = almOccurred;
	}

	
	public String getAcknowledged() {
		return (acknowledged==null?"Y":acknowledged);
	}

	public void setAcknowledged(String acknowledged) {
		this.acknowledged = acknowledged;
	}

	
	public String getActive() {
		return (active==null?"N":active);
	}

	public void setActive(String active) {
		this.active = active;
	}

	
	public Long getAlarmMsgId() {
		return alarmMsgId;
	}

	public void setAlarmMsgId(Long alarmMsgId) {
		this.alarmMsgId = alarmMsgId;
	}

	
	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}
	

	public String getColor() {
		return color;
	}

	public void setColor(String color) {
		this.color = color;
	}
	

	public String getPriority() {
		return priority;
	}

	public void setPriority(String priority) {
		this.priority = priority;
	}
	

	public Double getValue() {
		return value;
	}

	public void setValue(Double value) {
		this.value = value;
	}
	

	public String toString() {
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-mm-DD hh:MM:ss");
		StringBuffer sb = new StringBuffer(2000);
		sb.append("Alarm{\"id\"=").append(this.id);
		sb.append(", \"alarmTypeId\"=").append(this.alarmTypeId);
		sb.append(", \"tagId\"=").append(this.tagId);
		sb.append(", \"alarmCode\"=\"").append(this.alarmCode).append("\"");
		sb.append(", \"almOccurred\"=").append(this.almOccurred!=null?sdf.format(this.almOccurred):"(null)").append("\"");
		sb.append(", \"acknowledged\"=").append(this.acknowledged).append("\"");
		sb.append(", \"active\"=").append(this.active).append("\"");
		sb.append(", \"alarmMsgId\"=").append(this.alarmMsgId);
		sb.append(", \"value\"=").append(this.value);
		sb.append("}");
		return sb.toString();
	}

}
