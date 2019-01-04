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

import java.io.PrintWriter;
import java.io.Serializable;
import java.io.StringWriter;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import us.avn.oms.domain.History;
import us.avn.oms.service.HistoryService;

public class HX extends History implements Serializable {
	
	private static final long serialVersionUID = 8751282105532159742L;
	
    private Logger log = LogManager.getLogger(this.getClass());

    public HX() {
    	super();
    }
    
	/**
	 * Method: computeSlope
	 * Description: compute slope of current trend of values
	 * 
	 * @param ai
	 * @return
	 * 
	 * Notes:
	 */
	public Double computeSlope( AIX ai ) {
		
		Double slope = 0D;
		log.debug("("+ai.getTagId()+") - scanValue: "+ai.getScanValue()
		         +", lastHistValue: "+ai.getLastHistValue()
		         +", intSinceLhs: "+ai.getIntSinceLhs());
		Integer intScanTime = (ai.getIntScanTime()==null?0:ai.getIntScanTime());
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
				log.error( eas );
				slope = 0D;
			}
		}
		log.debug("slope ("+ai.getTagId()+"): "+slope);
		return slope;
	}
	
	public AIX doBoxcarCheck( AIX ai, HistoryService hs ) {
		AIX nai = null;
		Double scale = ai.getMaxValue() - ai.getZeroValue();
		Double pcDelta = Math.abs(100D * (ai.getScanValue() - ai.getLastHistValue()) 
				                  / scale );
		if( pcDelta > ai.getPercent() ) {
			nai = ai;
			HX h = new HX();
			h.setTagId(ai.getTagId());
			h.setX(ai.getScanTime().getTime()/1000L);
			h.setY(ai.getScanValue());
			log.debug("Insert history record tag "+ai.getTag().getName()+"/"+ai.getTagId());
			hs.insertHistoryRecord(h);
			nai.setLastHistTime(ai.getScanTime());
			nai.setLastHistValue(ai.getLastHistValue());
		}
		return nai;
	}
	
	public AIX doLinearCheck( AIX ai, HistoryService hs ) {
		AIX nai = null;
		Double predictedValue = ai.getLastHistValue() +
				ai.getSlope() * ai.getIntSinceLhs();
		log.debug("Predicted value ("+ai.getTagId()+") = "+predictedValue
				 +", intsinceLhs: "+ai.getIntSinceLhs());
		Double scale = ai.getMaxValue() - ai.getZeroValue();
		Double pcDelta = Math.abs(100.0 * (ai.getScanValue() - predictedValue)/scale); 
		log.debug("New change: "+pcDelta+", percentAllowed: "+ai.getPercent());
		if( pcDelta > ai.getPercent()) {
			nai = ai;
			HX h = new HX();
			h.setTagId(ai.getTagId());
			h.setX(ai.getScanTime().getTime()/1000L);
			h.setY(ai.getScanValue());
			log.debug("Insert history record tag "+ai.getTag().getName()+"/"+ai.getTagId());
			hs.insertHistoryRecord(h);
			nai.setLastHistTime(ai.getScanTime());
			nai.setLastHistValue(ai.getLastHistValue());			
		}
		return nai;
	}
	
}
