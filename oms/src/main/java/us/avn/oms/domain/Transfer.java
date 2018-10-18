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

import java.io.Serializable;
import java.text.SimpleDateFormat;
import java.util.Collection;
import java.util.Date;


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
	
	private SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
	protected Long    id;
	protected Long    tagId;
	protected String  name;
	protected Long    statusId;
	protected String  status;
	protected Long    transferTypeId;
	protected String  transferType;
	protected Long    sourceId;
	protected String  source;
	protected Long    destinationId;
	protected String  destination;
	protected Date    expStartTime;
	protected Date    expEndTime;
    protected Double  expVolume;
    protected Integer delta;
    protected Date    actStartTime;
    protected Date    actEndTime;
    protected Double  actVolume;
    protected Long    startDiff;
    protected Long    endDiff;
    protected Long    bot;                /* beginning of time 1970-01-01 0:00:00 */
    protected Long    midnight;           /* Today 0:00:00, not 24:00:00          */
    protected Date    newStartTime;
    protected Date    newEndTime;
    
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
    	bot = x.bot;
    	midnight = x.midnight;
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
	

	public String getExpStartTime() {
		if( expStartTime != null ) {
			return sdf.format(expStartTime);
		}
		return null;
	}

	public void setExpStartTime(String est) {
		try {
			this.expStartTime = sdf.parse(est);
		} catch( Exception e) {
			this.expStartTime = null;
		}
	}
	
	
	public String getExpEndTime() {
		if( expEndTime != null ) {
			return sdf.format(expEndTime);
		}
		return null;
	}

	public void setExpEndTime(String eet) {
		try {
			this.expEndTime = sdf.parse(eet);
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

	
	public String getActStartTime() {
		if( actStartTime != null ) {
			return sdf.format(actStartTime);
		}
		return null;
	}

	public void setActStartTime(String ast) {
		try {
			this.actStartTime = sdf.parse(ast);
		} catch( Exception e) {
			this.actStartTime = null;
		}
	}
	
	
	public String getActEndTime() {
		if( actEndTime != null ) {
			return sdf.format(actEndTime);
		}
		return null;
	}

	public void setActEndTime(String aet) {
		try {
			this.actEndTime = sdf.parse(aet);
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
	
	
	public Long getMidnight() {
		return this.midnight;
	}
	
	public void setMidnight( Long m ) {
		this.midnight = m;
	}
	
	
	public String getNewStartTime() {
		if( newStartTime != null ) {
			return sdf.format(newStartTime);
		}
		return null;
	}

	public void setNewStartTime(String nst) {
		try {
			this.newStartTime = sdf.parse(nst);
		} catch( Exception e) {
			this.newStartTime = null;
		}
	}
	
	
	public String getNewEndTime() {
		if( newEndTime != null ) {
			return sdf.format(newEndTime);
		}
		return null;
	}

	public void setNewEndTime(String net) {
		try {
			this.newEndTime = sdf.parse(net);
		} catch( Exception e) {
			this.newEndTime = null;
		}
	}
	
/*
	public Collection<IdName> getStatuses() {
		return statuses;
	}

	public void setStatuses(Collection<IdName> statuses) {
		this.statuses = statuses;
	}

	
	public Collection<IdName> getTransferTypes() {
		return transferTypes;
	}

	public void setTransferTypes(Collection<IdName> transferTypes) {
		this.transferTypes = transferTypes;
	}

	
	public Collection<IdName> getSources() {
		return sources;
	}

	public void setSources(Collection<IdName> sources) {
		this.sources = sources;
	}

	
	public Collection<IdName> getDestinations() {
		return destinations;
	}

	public void setDestinations(Collection<IdName> destinations) {
		this.destinations = destinations;
	}
*/
}
