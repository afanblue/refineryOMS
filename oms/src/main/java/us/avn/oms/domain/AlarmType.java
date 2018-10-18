/*******************************************************************************
 * Copyright (C) 2018 A. E. Van Ness
 *  
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *  
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *******************************************************************************/
package us.avn.oms.domain;

import java.io.Serializable;
import java.util.Collection;

/*
 * AlarmType: id, priority, alarm_msg_id, code
 * AlarmMessage: id, obj_id, abbr, message
 * Alarm: id, alarm_type_id, tag_type_id, obj_id, alm_occurred, acknowledged, active, alarm_msg_id
 */
public class AlarmType extends OMSObject implements Serializable {
	
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

		
}
