/*******************************************************************************
 * Copyright (C) 2018 Laboratorio de Lobo Azul
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
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;

/*
 *           tag_id: 24
 *             name:
 *            value: NULL
 *        scan_time: NULL
 *          ai_type: NULL
 *       value_text: NULL
 *       alarm_code: 47.0000
 *      alarm_color: 42.0000
 *         location: 10.0000
 */
public class AIValue extends OMSObject implements Serializable {
	
	private static final long serialVersionUID = 8751282105532159742L;

	private Long     tagId;
	private String   name;
	private Double   value;
	private String   aiType;
	private String   valueText;
	private Instant  scanTime;
	private String   alarmCode;
	private String   alarmColor;
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
			String tz = java.util.TimeZone.getDefault().getID();
			LocalDateTime ld = LocalDateTime.parse(scanTime, sdf );
			ZonedDateTime d = ZonedDateTime.of(ld, ZoneId.of(tz));
			this.scanTime = d.toInstant();
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


}
