package us.avn.oms.domain;

import java.io.Serializable;
import java.util.Collection;

/*
 * AlarmMessage: id, obj_id, abbr, message
 */
public class AlarmMessage implements Serializable {
	
	private static final long serialVersionUID = 8751282105532159742L;
	
	private Long id;
	private String abbr;
	private String message;
	private Collection<AlarmType> alarmMsgTypes;
	
	
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	
	public String getAbbr() {
		return abbr;
	}

	public void setAbbr(String abbr) {
		this.abbr = abbr;
	}

	
	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	
	public Collection<AlarmType> getMsgTypes() {
		return alarmMsgTypes;
	}

	public void setMsgTypes(Collection<AlarmType> ats) {
		this.alarmMsgTypes = ats;
	}


	public String toString() {
		StringBuffer sb = new StringBuffer(2000);
		sb.append("AlarmMessage{\"id\"=").append(this.id);
		sb.append(", \"abbr\"=").append(this.abbr).append("\"");
		sb.append(", \"message\"=\"").append(this.message).append("\"");
		sb.append("}");
		return sb.toString();
	}

}
