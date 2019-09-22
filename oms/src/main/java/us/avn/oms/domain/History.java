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

import java.io.PrintWriter;
import java.io.Serializable;
import java.io.StringWriter;

import us.avn.oms.service.HistoryService;


public class History extends OMSObject implements Serializable {
	
	private static final long serialVersionUID = 8751282105532159742L;
	
	public static final String BOXCAR = "B";
	public static final String LINEAR = "L";
	public static final String NONE = "N";
	
	
    protected Long   id;
	protected Long   tagId;
	protected Double y;
	protected Long   x;
	  
	
	public Long getId() {
		return this.id;
	}
	
	public void setId( Long i ) {
		this.id = i;
	}
	

	public Long getTagId() {
		return tagId;
	}
	
	public void setTagId(Long ti) {
		this.tagId = ti;
	}
	
	
	public Double getY() {
		return y;
	}
	
	public void setY(Double sv) {
		this.y = sv;
	}
	
	
	public Long getX() {
		return x;
	}
	
	public void setX(Long st) {
		this.x = st;
	}
	
	/**
	 * Compute slope of current trend of values
	 * 
	 * @param ai analog input for which to compute the slope
	 * @return slope
	 * 
	 */
	public Double computeSlope( AnalogInput ai ) {
		
		Double slope = 0D;
//		log.debug("("+ai.getTagId()+") - scanValue: "+ai.getScanValue()
//		         +", lastHistValue: "+ai.getLastHistValue()
//		         +", intSinceLhs: "+ai.getIntSinceLhs());
		Long intScanTime = (ai.getIntScanTime()==null?0:ai.getIntScanTime());
		if( intScanTime == 0 ) {
			slope = 0.0;
		} else {
			try {
				slope = (ai.getScanValue() - ai.getLastHistValue())
						/ ai.getIntSinceLhs();
			} catch( Exception e ) {
				StringWriter sw = new StringWriter();
				e.printStackTrace(new PrintWriter(sw));
				String eas = sw.toString();
//				log.error( eas );
				slope = 0D;
			}
		}
//		log.debug("slope ("+ai.getTagId()+"): "+slope);
		return slope;
	}
	
	public AnalogInput doBoxcarCheck( AnalogInput ai, HistoryService hs ) {
		AnalogInput nai = null;
		Double scale = ai.getMaxValue() - ai.getZeroValue();
		Double pcDelta = Math.abs(100D * (ai.getScanValue() - ai.getLastHistValue()) 
				                  / scale );
		if( pcDelta > ai.getPercent() ) {
			nai = ai;
			History h = new History();
			h.setTagId(ai.getTagId());
			h.setX(ai.getScanTime().getEpochSecond());
			h.setY(ai.getScanValue());
//			log.debug("Insert history record tag "+ai.getTag().getName()+"/"+ai.getTagId());
			hs.insertHistoryRecord(h);
			nai.setLastHistTime(ai.getScanTime());
			nai.setLastHistValue(ai.getLastHistValue());
		}
		return nai;
	}
	
	public AnalogInput doLinearCheck( AnalogInput ai, HistoryService hs ) {
		AnalogInput nai = null;
		Double predictedValue = ai.getLastHistValue() +
				ai.getSlope() * ai.getIntSinceLhs();
//		log.debug("Predicted value ("+ai.getTagId()+") = "+predictedValue
//				 +", intsinceLhs: "+ai.getIntSinceLhs());
		Double scale = ai.getMaxValue() - ai.getZeroValue();
		Double pcDelta = Math.abs(100.0 * (ai.getScanValue() - predictedValue)/scale); 
//		log.debug("New change: "+pcDelta+", percentAllowed: "+ai.getPercent());
		if( pcDelta > ai.getPercent()) {
			nai = ai;
			History h = new History();
			h.setTagId(ai.getTagId());
			h.setX(ai.getScanTime().getEpochSecond());
			h.setY(ai.getScanValue());
//			log.debug("Insert history record tag "+ai.getTag().getName()+"/"+ai.getTagId());
			hs.insertHistoryRecord(h);
			nai.setLastHistTime(ai.getScanTime());
			nai.setLastHistValue(ai.getLastHistValue());			
		}
		return nai;
	}
	
}
