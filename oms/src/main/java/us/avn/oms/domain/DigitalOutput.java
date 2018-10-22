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
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Collection;
import java.util.Date;
import java.util.HashMap;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

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
public class DigitalOutput extends OMSObject implements Serializable {
	
	private static final long serialVersionUID = 8751282105532159742L;
	
	protected Long    tagId;
	protected Tag     tag;
	protected String  histTypeCode;
	protected String  valueView;
	protected Long    isNew;
	protected Double  scanValue;
	protected Date    scanTime;
 	protected Double  prevValue;
	protected Date    prevTime;
 	protected Double  lastHistValue;
 	protected Date    lastHistTime;
 	protected Integer intSinceLhs;
    protected Integer intScanTime;

 	public DigitalOutput() { }
 	
 	public DigitalOutput( Long i, String n ) {
 		this.tagId = i;
 		Tag t = new Tag(i,n);
 		t.setTagTypeCode("AI");
 		t.setActive("Y");
 		this.tag = t;
 	}
 	
 	public DigitalOutput( DigitalOutput d ) {
 		tagId = d.tagId;
 		tag = d.tag;
 		histTypeCode = d.histTypeCode;
 		valueView = d.valueView;
 		scanValue = d.scanValue;
 		scanTime = d.scanTime;
 	 	prevValue = d.prevValue;
 		prevTime = d.prevTime;
 	 	lastHistValue = d.lastHistValue;
 	 	lastHistTime = d.lastHistTime;
 	 	intSinceLhs = d.intSinceLhs;
 	    intScanTime = d.intScanTime;
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

	
	public String getValueView() {
		return valueView;
	}

	public void setValueView(String v) {
		this.valueView = v;
	}
	

	public Long getIsNew() {
		return isNew;
	}

	public void setIsNew(Long isNew) {
		this.isNew = isNew;
	}
	

	public String getHistTypeCode() {
		return histTypeCode;
	}

	public void setHistTypeCode(String htcd) {
		this.histTypeCode = htcd;
	}


	public Double getScanValue() {
		return (null==scanValue?0D:scanValue);
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

	
}