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

import java.io.PrintWriter;
import java.io.Serializable;
import java.io.StringWriter;
//import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Collection;
import java.util.Date;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

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
public class DigitalInput extends OMSObject implements Serializable {
	
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

	
}
