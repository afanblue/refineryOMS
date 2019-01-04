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
package us.avn.oms.scada.domain;

import java.io.Serializable;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Collection;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Vector;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import us.avn.oms.domain.Alarm;
import us.avn.oms.domain.AlarmType;
import us.avn.oms.domain.AnalogInput;
import us.avn.oms.service.AlarmService;
import us.avn.oms.service.HistoryService;

/*
 *           tag_id: 24
 * analog_type_code: L
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
public class AIX extends AnalogInput implements Serializable {
	
	private static final long serialVersionUID = 8751282105532159742L;
	
    private Logger log = LogManager.getLogger(this.getClass());

    public AIX() {
    	super();
    }
    
    public AIX( AnalogInput ai ) {
    	super(ai);
    }
    
	/**
	 * Method: checkForAlarm
	 * Description: check for an alarm state and update the alarm table as needed
	 * 
	 * @param as (AlarmService)
	 * 
	 * Note 1: we use the class variable as (AlarmService) 
	 * Note 2: we assume only one existing alarm for the given AI
	 * Note 3: the handling of the existing alarm 
	 * 
	 *    set createAlarm false
	 *    IF there's no alarm active
	 *    .. IF there's a new alarm
	 *    .. .. set createAlarm true
	 *    .. END IF
	 *    ELSE
	 *    .. IF this state has returned to normal
	 *    .. .. set active & acknowledged to N and Y
	 *    .. .. update alarm
	 *    .. ELSE IF this is not the same alarm state
	 *    .. .. set active to N
	 *    .. .. update alarm
	 *    .. .. set createAlarm true
	 *    .. END IF
	 *    END IF
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
			log.debug("Alarm found for "+tagId+" ? "+almCode);
			Collection<Alarm> calm = as.getTagAlarms( tagId );
			if( calm == null ) { calm = new Vector<Alarm>(); }
			log.debug(calm.size()+" alarms for "+tagId);
			if( calm.isEmpty() ) {
				if(! "NORM".equals(almCode) ) {
					createAlarm = true;
				}
			} else {
				Iterator<Alarm> ialm = calm.iterator();
				Alarm xa = new Alarm();
				while( ialm.hasNext()) { xa = ialm.next(); }
				log.debug(xa.toString());
				log.debug("Alarm exists for "+xa.getTagId()+"? "+almCode+" = "+xa.getAlarmCode());
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
	 * Method: updateHistory
	 * Description: check the current history and update as needed
	 * 
	 * @param ai
	 * @return
	 * 
	 * Notes:
	 *		IF there's a value
	 *		..	IF there's no history (no last history value) or it's been an hour
	 *		..	..	save history record
	 *		..	..	compute slope
	 *		..	..	update AI record (set last history values)
	 *		..	ELSE IF there's no slope (probly means second hist check)
	 *		..	..	save history record
	 *		..	..	compute slope
	 *		..	..	update AI record
	 *		..	ELSE
	 *		..	..	IF linear
	 *		..	..	..	do linear checks
	 *		..	..	ELSE IF boxcar
	 *		..	..	..	do boxcar checks
	 *		..	..	END IF
	 *		..	END IF
	 *		END IF
	 *
	 *	 The interval since the last time stored, ie, 3600-60-15, is due to
	 *   the delay between the query retrieving the last time scanned, which
	 *   is always (nominally) 60 seconds behind the update occurring.  Since
	 *   we have the "correct" data here, we could do the math here, but it's
	 *   easier to just compensate for that by subtracting a minute from the 
	 *   interval.  The 15 seconds is just to allow for elapsed time in the 
	 *   processing (PMC) or the routine doing the data scan.
	 */
	public void updateHistory( HistoryService hs ) {
		log.debug("History update needed? "+this.toString());
		if( (scanValue != null) && (scanTime != null) 
				&& (scanTime != prevTime) ) {
			HX h = new HX();
			h.setTagId(tagId);
			h.setX(scanTime.getTime()/1000L);
			intSinceLhs = (intSinceLhs==null)?0:intSinceLhs;
			log.debug("Hourly update flag: "+tagId+" - intSinceLhs "+intSinceLhs);
			if( (lastHistValue == null) 
					|| (intSinceLhs >= (3600-60-15))  ) {
				log.debug("Hourly update ("+tagId+")");
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
				AIX nai = null;
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
