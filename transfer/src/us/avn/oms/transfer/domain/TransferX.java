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
package us.avn.oms.transfer.domain;

import java.util.Iterator;

import us.avn.oms.domain.AIValue;
import us.avn.oms.domain.Tag;
import us.avn.oms.domain.Transfer;
import us.avn.oms.service.TagService;
import us.avn.oms.service.TankService;
import us.avn.oms.service.TransferService;

public class TransferX extends Transfer {
	
	private static final long serialVersionUID = 1L;

	public TransferX() {
		super();
	}
	
	public TransferX( Transfer x ) {
		super(x);
	}

	public void startTransfer( TransferService xs ) {
		xs.startTransfer(id);
	}
	
	public void completeTransfer( TransferService xs ) {
		xs.completeTransfer(id);
	}
	
	/**
	 * Method: checkSource
	 * Description: check the source for this transfer
	 *  
	 * @param ts  - tagService
	 * @param tks - tankService
	 * 
	 * Notes:
	 * 		get source tag
	 * 		IF source tag is a process unit
	 * 		.. get the (rough) tank volumes of this unit
	 * 		.. WHILE there are tanks left to check
	 * 		.. .. IF this is the biggest
	 * 		.. .. .. save the tagID
	 */
	public void checkSource( TagService ts, TankService tks ) {
		Tag src = ts.getTag(sourceId);
		if( Tag.PROCESS_UNIT.equals(src.getTagTypeCode())) {
			Iterator<AIValue> is = tks.getTankVolumesForUnit(src.getName()).iterator();
			Double maxVolume = 0.0;
			while( is.hasNext() ) {
				AIValue aiv = is.next();
				if( aiv.getValue() > maxVolume ) {
					maxVolume = aiv.getValue();
					this.sourceId = aiv.getTagId();
				}
			}
		}
	}
	
	public void checkDestination( TagService ts, TankService tks ) {
		Tag dest = ts.getTag(destinationId);
		if( Tag.PROCESS_UNIT.equals(dest.getTagTypeCode())) {
			Iterator<AIValue> is = tks.getTankVolumesForUnit(dest.getName()).iterator();
			Double minVolume = Double.MAX_VALUE;
			while( is.hasNext() ) {
				AIValue aiv = is.next();
				if( aiv.getValue() < minVolume ) {
					minVolume = aiv.getValue();
					this.destinationId = aiv.getTagId();
				}
			}
		}
	}

}
