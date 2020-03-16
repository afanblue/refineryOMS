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
import java.util.Collection;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Vector;

import org.slf4j.Logger;

import us.avn.oms.service.AlarmService;
import us.avn.oms.service.HistoryService;


/*
 *           tag_id: 24
 *        type_code: L
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
public class AnalogInput extends OMSObject implements Serializable {
	
	private static final long serialVersionUID = 8751282105532159742L;
	
	public static final String ACCUMULATOR = "A";
	public static final String ANGLE_HEADING = "R";
	public static final String CALCULATED = "C";
	public static final String FLOW_RATE = "F";
	public static final String LEVEL = "L";
	public static final String MANUAL = "M";
	public static final String MISCELLANEOUS = "S";
	public static final String PRESSURE = "P";
	public static final String TEMPERATURE = "T";
	
	protected Long    tagId;
	protected Tag      tag;
	protected String   analogTypeCode;
	protected Long     unitId;
	protected Double   zeroValue;
	protected Double   maxValue;
	protected String   histTypeCode;
	protected Double   percent;
	protected Double   slope;
	protected Double   rawValue;
	protected Double   scanValue;
	protected Instant  scanTime;
 	protected Double   prevValue;
	protected Instant  prevTime;
 	protected Double   lastHistValue;
 	protected Instant  lastHistTime;
 	protected Double   hh;
 	protected Double   hi;
 	protected Double   lo;
 	protected Double   ll;
 	protected Long     intSinceLhs;
    protected Long     intScanTime;
 	protected Double   simValue;
 	protected Instant  simScanTime;
 	protected Integer  updated;
	protected Collection<Alarm> calm;
 	protected Tag      siteLocation;

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
 		analogTypeCode = ai.analogTypeCode;
 		unitId = ai.unitId;
 		rawValue = ai.rawValue;
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

	
	public String getAnalogTypeCode() {
		return analogTypeCode;
	}

	public void setTypeCode(String atc) {
		this.analogTypeCode = atc;
	}


	public Long getUnitId() {
		return unitId;
	}

	public void setUnitId(Long uid) {
		this.unitId = uid;
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


	public Instant getScanTime() {
		return scanTime;
	}

	public void setScanTime(Instant scanTime) {
		this.scanTime = scanTime;
	}


	public Double getPrevValue() {
		return prevValue;
	}

	public void setPrevValue(Double prevValue) {
		this.prevValue = prevValue;
	}


	public Instant getPrevTime() {
		return prevTime;
	}

	public void setPrevTime(Instant prevTime) {
		this.prevTime = prevTime;
	}


	public Double getLastHistValue() {
		return lastHistValue;
	}

	public void setLastHistValue(Double lastHistValue) {
		this.lastHistValue = lastHistValue;
	}


	public Instant getLastHistTime() {
		return lastHistTime;
	}

	public void setLastHistTime(Instant lastHistTime) {
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

	
 	public Long getIntSinceLhs() {
		return intSinceLhs;
	}

	public void setIntSinceLhs(Long intSinceLhs) {
		this.intSinceLhs = intSinceLhs;
	}

	
	public Long getIntScanTime() {
		return intScanTime;
	}

	public void setIntScanTime(Long intScanTime) {
		this.intScanTime = intScanTime;
	}

	
	public Double getSimValue() {
		return simValue;
	}

	public void setSimValue(Double simValue) {
		this.simValue = simValue;
	}

	
	public Instant getSimScanTime() {
		return simScanTime;
	}

	public void setSimScanTime(Instant pst) {
		this.simScanTime = pst;
	}

	
	public Integer getUpdated() {
		return updated;
	}

	public void setUpdated(Integer u) {
		this.updated = u;
	}
	
	
	public Tag getSiteLocation() {
		return siteLocation;
	}

	public void setSiteLocation(Tag siteLocation) {
		this.siteLocation = siteLocation;
	}

	
	public Collection<Alarm> getCalm() {
		return calm;
	}

	public void setCalm(Collection<Alarm> calm) {
		this.calm = calm;
	}

	/**
	 * Check for an alarm state and update the alarm table as needed
	 * <br>
	 * @param as (AlarmService)
	 * @param almTypes collection of alarm types
	 * <br>
	 *<br> Note 1: we use the class variable as (AlarmService) 
	 *<br> Note 2: we assume only one existing alarm for the given AI
	 *<br> Note 3: the handling of the existing alarm 
	 *<br> 
	 *<br>    set createAlarm false
	 *<br>    IF there's no alarm active
	 *<br>    .. IF there's a new alarm
	 *<br>    .. .. set createAlarm true
	 *<br>    .. END IF
	 *<br>    ELSE
	 *<br>    .. IF this state has returned to normal
	 *<br>    .. .. set active and acknowledged to N and Y
	 *<br>    .. .. update alarm
	 *<br>    .. ELSE IF this is not the same alarm state
	 *<br>    .. .. set active to N
	 *<br>    .. .. update alarm
	 *<br>    .. .. set createAlarm true
	 *<br>    .. END IF
	 *<br>    END IF
	 *
	 */
	public void checkForAlarm( AlarmService as, HashMap<String,AlarmType> almTypes ) {
		/* Note: there should only be one alarm, but in the future */
		/*       we can implement a rate of change alarm           */
		Alarm alm = new Alarm();
		alm.setTagId(tagId);
		alm.setTagTypeId(tag.getTagTypeId());
		String almCode = "NORM";
		if( scanValue != null ) { 
			if( scanValue <= (ll==null?Long.MIN_VALUE:ll) ) {
				almCode = "LL";
			} else if( scanValue <= (lo==null?Long.MIN_VALUE:lo) ) {
				almCode = "LO";
			} else if( scanValue >= (hh==null?Long.MAX_VALUE:hh) ) {
				almCode = "HH";
			} else if( scanValue >= (hi==null?Long.MAX_VALUE:hi) ) {
				almCode = "HI";
			}
			boolean createAlarm = false;
//			log.debug("Alarm found for "+tagId+" ? "+almCode);
			Collection<Alarm> calm = as.getTagAlarms( tagId );
			if( calm == null ) { calm = new Vector<Alarm>(); }
//			log.debug(calm.size()+" alarms for "+tagId);
			if( calm.isEmpty() ) {
				if(! "NORM".equals(almCode) ) {
					createAlarm = true;
				}
			} else {
				Iterator<Alarm> ialm = calm.iterator();
				Alarm xa = new Alarm();
				if( ialm.hasNext()) { xa = ialm.next(); }
//				log.debug(xa.toString());
//				log.debug("Alarm exists for "+xa.getTagId()+"? "+almCode+" = "+xa.getAlarmCode());
				if( "NORM".equals(almCode) ) {
					xa.setActive("N");
					xa.setAcknowledged("Y");
					as.updateAlarm(xa);
				} else if( ! almCode.equals(xa.getAlarmCode())) {
					xa.setActive("N");
					xa.setAcknowledged("Y");
					as.updateAlarm(xa);
					createAlarm = true;
				}
			}
			if( createAlarm ) {	
				alm.setTagId(tagId);
				alm.setAlarmTypeId(almTypes.get(almCode).getId());
				alm.setAlarmMsgId(almTypes.get(almCode).getAlarmMsgId());
				alm.setAcknowledged("N");
				alm.setActive("Y");
				alm.setAlmOccurred(simScanTime);
				as.insertAlarm(alm);
			}
		}
	}
	
	/**
	 * Check the current history and update as needed
	 * 
	 * @param hs HistoryService
	 * <br>
	 * Notes:
	 *<br>		IF there's a value
	 *<br>		..	IF there's no history (no last history value) or it's been an hour
	 *<br>		..	..	save history record
	 *<br>		..	..	compute slope
	 *<br>		..	..	update AI record (set last history values)
	 *<br>		..	ELSE IF there's no slope (probly means second hist check)
	 *<br>		..	..	save history record
	 *<br>		..	..	compute slope
	 *<br>		..	..	update AI record
	 *<br>		..	ELSE
	 *<br>		..	..	IF linear
	 *<br>		..	..	..	do linear checks
	 *<br>		..	..	ELSE IF boxcar
	 *<br>		..	..	..	do boxcar checks
	 *<br>		..	..	END IF
	 *<br>		..	END IF
	 *<br>		END IF
	 *
	 *<br>
	 *	 The interval since the last time stored, ie, 3600-60-15, is due to
	 *   the delay between the query retrieving the last time scanned, which
	 *   is always (nominally) 60 seconds behind the update occurring.  Since
	 *   we have the "correct" data here, we could do the math here, but it's
	 *   easier to just compensate for that by subtracting a minute from the 
	 *   interval.  The 15 seconds is just to allow for elapsed time in the 
	 *   processing (PMC) or the routine doing the data scan.
	 */
	public void updateHistory( HistoryService hs ) {
//		log.debug("History update needed? "+this.toString());
		if( (scanValue != null) && (scanTime != null) 
				&& (scanTime != prevTime) ) {
			History h = new History();
			h.setTagId(tagId);
			h.setX(scanTime.getEpochSecond());
			
//			intSinceLhs = (intSinceLhs==null)?0:intSinceLhs;
			intSinceLhs = scanTime.getEpochSecond()-lastHistTime.getEpochSecond();
//			log.debug("Hourly update flag: "+tagId+" - intSinceLhs "+intSinceLhs);
			if( (lastHistValue == null) 
					|| (intSinceLhs >= (3600-60-15))  ) {
//				log.debug("Hourly update ("+tagId+")");
				h.setY(scanValue);
				hs.insertHistoryRecord(h);
				slope = h.computeSlope(this);
				lastHistValue = scanValue;
				lastHistTime = scanTime;
			} else if( slope == null ) {
				h.setY(scanValue);
				slope = h.computeSlope(this);
				lastHistValue = scanValue;
				lastHistTime = scanTime;
			} else {
				AnalogInput nai = null;
				if( "L".equals(histTypeCode) ) {
					nai = h.doLinearCheck( this, hs );				
				} else if( "B".equals(histTypeCode) ) {
					nai = h.doBoxcarCheck( this, hs );
				}
				if( nai != null ) {
					slope = h.computeSlope(this);
					lastHistValue = nai.getScanValue();
					lastHistTime = nai.getScanTime();					
				}
			}
		}
	}

}
