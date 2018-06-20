package us.avn.oms.domain;

import java.io.Serializable;
import java.util.Collection;

/*
 * AlarmType: id, priority, alarm_msg_id, code
 * AlarmMessage: id, obj_id, abbr, message
 * Alarm: id, alarm_type_id, tag_type_id, obj_id, alm_occurred, acknowledged, active, alarm_msg_id
 */
public class AlarmType implements Serializable {
	
	private static final long serialVersionUID = 8751282105532159742L;
	
	public static final String HIGH_HIGH = "HH";
	public static final String HIGH = "HI";
	public static final String LOW = "LO";
	public static final String LOW_LOW = "LL";
	
	private Long id;
	private Integer priority;
	private Long alarmMsgId;
	private String code;
	private String alarmMsg;
	private Collection<AlarmMessage> alarmMessages;
	
	
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}


	public Integer getPriority() {
		return priority;
	}

	public void setPriority(Integer priority) {
		this.priority = priority;
	}


	public Long getAlarmMsgId() {
		return alarmMsgId;
	}

	public void setAlarmMsgId(Long alarmMsgId) {
		this.alarmMsgId = alarmMsgId;
	}


	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	
	public String getAlarmMsg() {
		return alarmMsg;
	}

	public void setAlarmMsg(String alarmMsg) {
		this.alarmMsg = alarmMsg;
	}

	
	public Collection<AlarmMessage> getAlarmMessages() {
		return alarmMessages;
	}

	public void setAlarmMessages(Collection<AlarmMessage> alarmMessages) {
		this.alarmMessages = alarmMessages;
	}

	
	public String toString() {
		StringBuffer sb = new StringBuffer(2000);
		sb.append("AlarmType{\"id\"=").append(this.id);
		sb.append(", \"priority\"=").append(this.priority);
		sb.append(", \"alarmMsgId\"=").append(this.alarmMsgId);
		sb.append(", \"code\"=\"").append(this.code).append("\"");
		sb.append(", \"alarmMsg\"=\"").append(this.alarmMsg).append("\"");
		sb.append("}");
		return sb.toString();
	}

}
