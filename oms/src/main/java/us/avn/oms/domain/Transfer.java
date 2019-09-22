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
import java.sql.Timestamp;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.Iterator;

import us.avn.oms.service.TagService;
import us.avn.oms.service.TankService;
import us.avn.oms.service.TransferService;

/**
 * Transfer object defines properties and methods for moving product from
 * a source to a destination
 * @author Allan
 */
public class Transfer extends OMSObject implements Serializable {
	
	private static final long serialVersionUID = 8751282105532159742L;
	
	/* Types */
	public static final String EXECUTABLE = "X";
	public static final String TEMPLATE = "T";
	
	/* Statuses */
	public static final String ACTIVE = "A";
	public static final String COMPLETE = "C";
	public static final String INCOMPLETE = "I";
	public static final String PENDING = "P";
	public static final String SCHEDULED = "S";
	
	/* Transfer Speeds */
	public static final Double FAST = 40D;
	public static final Double SLOW = 20D;

	
	/** The {@link Long} instance for the transfer ID */
	protected Long    id;
	/** The {@link Long} instance for the transfer template ID */
	protected Long    tagId;
	/** The {@link String} instance for the particular transfer name */
	protected String  name;
	/** The {@link String} instance for the content code (C=Crude, etc) */
	protected String  contentsCode;
	/** The {@link Long} instance for the status ID.  See the TRANSFER_STATUS_VW */
	protected Long    statusId;
	/** The {@link String} instance for the status.  See the TRANSFER_STATUS_VW */
	protected String  status;
	/** The {@link Long} instance for the transfer type ID.  See the TRANSFER_TYPE_VW */
	protected Long    transferTypeId;
	/** The {@link String} instance for the transfer type.  See the TRANSFER_TYPE_VW */
	protected String  transferType;
	/** The {@link Long} instance for the source tag ID */
	protected Long    sourceId;
	/** The {@link String} instance for the source name (in TAG, not in TRANSFER DB record) */
	protected String  source;
	/** The {@link Long} instance for the destination tag ID */
	protected Long    destinationId;
	/** The {@link String} instance for the destination name (in TAG, not in TRANSFER DB record) */
	protected String  destination;
	/** The {@link Instant} instance for the expected start time */
	protected Instant expStartTime;
	/** The {@link Instant} instance for the expected end time */
	protected Instant expEndTime;
	/** The {@link Double} instance for the expected volume (in bbls) */
    protected Double  expVolume;
    /** The {@link Integer} instance for the repeat interval (in minutes) */
    protected Integer delta;
    /** The {@link Instant} instance for the actual start time */
    protected Instant    actStartTime;
    /** The {@link Instant} instance for the actual end time */
    protected Instant    actEndTime;
    /** The {@link Double} instance for the actuall volume transferred (in bbls) */
    protected Double  actVolume;
    /** The {@link Long} difference in time (seconds) between the current time and the expected start time (computed in query) */
    protected Long    startDiff;
    /** The {@link Long} difference in time (seconds) between the current time and the expected end time (computed in query) */
    protected Long    endDiff;
    /** The {@link Instant} new start time, computed in the query using the formula:
     * {@code 
     * IF repeat interval is not zero, set newStartTime = today
     * ELSE set newStartTime = tomorrow
     * Add expected start time to newStartTime
     * If repeat interval IS zero, add zero to newStartTime
     * ELSE add repeat interval to newStartTime
     * Subtract beginning of time (1/1/1970, 0:00:00) from newStartTime
     * }
     */
    protected Instant newStartTime;
    /** The {@link Instant} new start time, computed in the query using the formula:
     * {@code 
     * IF repeat interval is not zero, set newEndTime = today
     * ELSE set newEndTime = tomorrow
     * Add expected end time to newEndTime
     * If repeat interval IS zero, add zero to newEndTime
     * ELSE add repeat interval to newEndTime
     * Subtract beginning of time (1/1/1970, 0:00:00) from newEndTime
     * }
     */
    protected Instant    newEndTime;
    
//    private Collection<IdName> statuses;
//    private Collection<IdName> transferTypes;
//    private Collection<IdName> sources;
//    private Collection<IdName> destinations;
    
    
	public Transfer() { }
    
    public Transfer( Long i, String n ) {
    	this.id = i;
    	this.name = n;
    }
    
    public Transfer( Transfer x ) {
    	id = x.id;
    	tagId = x.tagId;
    	name = x.name;
    	contentsCode = x.contentsCode;
    	statusId = x.statusId;
    	transferTypeId = x.transferTypeId;
    	sourceId = x.sourceId;
    	destinationId = x.destinationId;
    	expStartTime = x.expStartTime;
    	expEndTime = x.expEndTime;
    	expVolume = x.expVolume;
    	actStartTime = x.actStartTime;
    	actEndTime = x.actEndTime;
    	actVolume = x.actVolume;
    	startDiff = x.startDiff;
    	endDiff = x.endDiff;
    	newStartTime = x.newStartTime;
    	newEndTime = x.newEndTime;
    	delta = x.delta;
    }

	
	public Long getId() {
		return id;
	}
	
	public void setId(Long id) {
		this.id = id;
	}
	

	public Long getTagId() {
		return tagId;
	}
	
	public void setTagId(Long id) {
		this.tagId = id;
	}
	

	public String getName() {
		return name;
	}
	
	public void setName(String n) {
		this.name = n;
	}
	

	public String getContentsCode() {
		return contentsCode;
	}

	public void setContentsCode(String contentsCode) {
		this.contentsCode = contentsCode;
	}
	

	public Long getStatusId() {
		return statusId;
	}

	public void setStatusId(Long statusId) {
		this.statusId = statusId;
	}

	
	public String getStatus() {
		return status;
	}
	
	public void setStatus(String s) {
		this.status = s;
	}
	

	public Long getTransferTypeId() {
		return transferTypeId;
	}

	public void setTransferTypeId(Long transferTypeId) {
		this.transferTypeId = transferTypeId;
	}

	
	public String getTransferType() {
		return transferType;
	}
	
	public void setTransferType(String tt) {
		this.transferType = tt;
	}
	

	public Long getSourceId() {
		return sourceId;
	}

	public void setSourceId(Long sourceId) {
		this.sourceId = sourceId;
	}

	
	public String getSource() {
		return source;
	}
	
	public void setSource(String s) {
		this.source = s;
	}
	

	public Long getDestinationId() {
		return destinationId;
	}

	public void setDestinationId(Long destinationId) {
		this.destinationId = destinationId;
	}

	
	public String getDestination() {
		return destination;
	}
	
	public void setDestination(String d) {
		this.destination = d;
	}
	

	public Timestamp getExpStartTime() {
		if( expStartTime != null ) {
			return Timestamp.from(expStartTime);
		}
		return null;
	}

	public void setExpStartTime(Timestamp est) {
		try {
			this.expStartTime = est.toInstant();
		} catch( Exception e) {
			this.expStartTime = null;
		}
	}
	
	
	public Timestamp getExpEndTime() {
		if( expEndTime != null ) {
			return Timestamp.from(expEndTime);
		}
		return null;
	}

	public void setExpEndTime(Timestamp eet) {
		try {
			this.expEndTime = eet.toInstant();
		} catch( Exception e) {
			this.expEndTime = null;
		}
	}
	
	
	public Double getExpVolume() {
		return expVolume;
	}

	public void setExpVolume(Double expVolume) {
		this.expVolume = expVolume;
	}

	
	public Integer getDelta() {
		return delta;
	}

	public void setDelta(Integer d) {
		this.delta = d;
	}

	
	public Timestamp getActStartTime() {
		if( actEndTime != null ) {
			return Timestamp.from(actEndTime);
		}
		return null;
	}

	public void setActStartTime(Timestamp ast) {
		try {
			this.actStartTime = ast.toInstant();
		} catch( Exception e) {
			this.actStartTime = null;
		}
	}
	
	
	public Timestamp getActEndTime() {
		if( actEndTime != null ) {
			return Timestamp.from(actEndTime);
		}
		return null;
	}

	public void setActEndTime(Timestamp aet) {
		try {
			this.actEndTime = aet.toInstant();
		} catch( Exception e) {
			this.actEndTime = null;
		}
	}

	
	public Double getActVolume() {
		return (actVolume==null?0D:actVolume);
	}

	public void setActVolume(Double actVolume) {
		this.actVolume = actVolume;
	}

	
	public Long getStartDiff() {
		return this.startDiff;
	}
	
	public void setStartDiff( Long sd ) {
		this.startDiff = sd;
	}
	
	
	public Long getEndDiff() {
		return this.endDiff;
	}
	
	public void setEndDiff( Long ed ) {
		this.endDiff = ed;
	}
	
		
	public Timestamp getNewStartTime() {
		if( newStartTime != null ) {
			return Timestamp.from(newStartTime);
		}
		return null;
	}

	public void setNewStartTime(Timestamp nst) {
		try {
			this.newStartTime = nst.toInstant();
		} catch( Exception e) {
			this.newStartTime = null;
		}
	}
	
	
	public Timestamp getNewEndTime() {
		if( newEndTime != null ) {
			return Timestamp.from(newEndTime);
		}
		return null;
	}

	public void setNewEndTime(Timestamp net) {
		try {
			this.newEndTime = net.toInstant();
		} catch( Exception e) {
			this.newEndTime = null;
		}
	}
	
	/**
	 * Start the transfer, i.e., set the status to Active
	 * 
	 * @param xs - TransferService
	 */
	public void startTransfer( TransferService xs ) {
		xs.startTransfer(id);
	}
	
	/**
	 * Complete the transfer, i.e., set the status to Complete
	 * 
	 * @param xs - TransferService
	 */
	public void completeTransfer( TransferService xs ) {
		xs.completeTransfer(id);
	}

	
	/**
	 * Check the source for this transfer.  If it's a process unit, find the tank
	 * with the most volume and set the source ID to that tank.
	 *
	 * @param ts  - tagService
	 * @param tks - tankService
	 *
	 * Notes:
	 * {@code
	 * 		get source tag
	 * 		IF source tag is a process unit
	 * 		.. get the (rough) tank volumes of this unit
	 * 		.. WHILE there are tanks left to check
	 * 		.. .. IF this is the greatest volume
	 * 		.. .. .. save the tagID as the source ID
	 * }
	 */
	public void checkSource( TagService ts, TankService tks ) {
		Tag src = ts.getTag(sourceId);
		if( Tag.PROCESS_UNIT.equals(src.getTagTypeCode())) {
			Iterator<Value> is = tks.getTankVolumesForUnit(src.getName()).iterator();
			Double maxVolume = 0.0;
			while( is.hasNext() ) {
				Value aiv = is.next();
				if( aiv.getValue() > maxVolume ) {
					maxVolume = aiv.getValue();
					this.sourceId = aiv.getId();
				}
			}
		} else if( Tag.DOCK.equals(src.getTagTypeCode())) {
			
		}
	}
	
	/**
	 * Check the destination for a transfer.  If it's a process unit, find the tank
	 * with the least volume and set the source ID to that tank. 
	 * 				
	 * @param ts  TagService
	 * @param tks TankService
	 * 
	 * Notes:
	 * {@code
	 * 		get destination tag
	 * 		IF destination tag is a process unit
	 * 		.. get the (rough) tank volumes of this unit
	 * 		.. WHILE there are tanks left to check
	 * 		.. .. IF this has the least volume
	 * 		.. .. .. save the tagID as the source ID
	 * }
	 */
	public void checkDestination( TagService ts, TankService tks ) {
		Tag dest = ts.getTag(destinationId);
		if( Tag.PROCESS_UNIT.equals(dest.getTagTypeCode())) {
			Iterator<Value> is = tks.getTankVolumesForUnit(dest.getName()).iterator();
			Double minVolume = Double.MAX_VALUE;
			while( is.hasNext() ) {
				Value aiv = is.next();
				if( aiv.getValue() < minVolume ) {
					minVolume = aiv.getValue();
					this.destinationId = aiv.getId();
				}
			}
		}
	}

}
