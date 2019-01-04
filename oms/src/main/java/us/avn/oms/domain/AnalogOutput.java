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
import java.util.Date;


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
public class AnalogOutput extends OMSObject implements Serializable {
	
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
	protected Long    isNew;
	protected Double  scanValue;
	protected Date    scanTime;
 	protected Double  prevValue;
	protected Date    prevTime;
 	protected Double  lastHistValue;
 	protected Date    lastHistTime;
 	protected Integer intSinceLhs;
    protected Integer intScanTime;

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
 		isNew = 0L;
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

	public void setHistTypeCode(String htcd) {
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


	public Long getIsNew() {
		return isNew;
	}

	public void setIsNew(Long isNew) {
		this.isNew = isNew;
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

	
}
