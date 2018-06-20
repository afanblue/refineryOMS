package us.avn.oms.domain;

import java.io.Serializable;
import java.util.Collection;

public class Field implements Serializable {
	
	private static final long serialVersionUID = 8751282105532159742L;
	
	private Long id;
	private Tag tag;
	private String roadImage;
	private String satelliteImage;
    private Long parentId;
    private String parent;
    private Collection<Field> parents;
    private Collection<IdName> tanks;
    private Collection<RelTagTag> childTanks;
	private Tag siteLocation;
    
    public Field() {}

    public Field( Long i, Tag t, String ri, String si
    		    , Long pid, String p) {
    	this.id = i;
    	this.tag = t;
    	this.roadImage = ri;
    	this.satelliteImage = si;
    	this.parentId = pid;
    	this.parent = p;
    }
    
    public Field( Long i, String n ) {
    	this.id = i;
    	Tag t = new Tag(i,n);
    	t.setTagTypeCode("FLD");
    	this.tag = t;
    }
    	
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}


	public Tag getTag() {
		return tag;
	}

	public void setTag(Tag tag) {
		this.tag = tag;
	}
	

	public String getRoadImage() {
		return roadImage;
	}

	public void setRoadImage(String roadImage) {
		this.roadImage = roadImage;
	}


	public String getSatelliteImage() {
		return satelliteImage;
	}

	public void setSatelliteImage(String satelliteImage) {
		this.satelliteImage = satelliteImage;
	}


	public Long getParentId() {
		return parentId;
	}

	public void setParentId(Long pid) {
		this.parentId = pid;
	}


	public String getParent() {
		return parent;
	}

	public void setParent(String parent) {
		this.parent = parent;
	}


	public Collection<Field> getParents() {
		return parents;
	}

	public void setParents(Collection<Field> parents) {
		this.parents = parents;
	}


	public Collection<IdName> getTanks() {
		return tanks;
	}

	public void setTanks(Collection<IdName> tanks) {
		this.tanks = tanks;
	}

	
	public Collection<RelTagTag> getChildTanks() {
		return childTanks;
	}

	public void setChildTanks(Collection<RelTagTag> cts) {
		this.childTanks = cts;
	}

	
	public Tag getSiteLocation() {
		return siteLocation;
	}

	public void setSiteLocation(Tag siteLocation) {
		this.siteLocation = siteLocation;
	}
	

	public String toString() {
		StringBuffer sb = new StringBuffer(2000);
		sb.append("Field{\"id\"=").append(this.id);
		sb.append(", \"tag\"=[").append(this.tag.toString()).append("]");
		sb.append(", \"roadImage\"=\"").append(this.roadImage);
		sb.append(", \"satelliteImage\"=\"").append(this.satelliteImage);
	    sb.append(", \"parentId\"=\"").append(this.parentId);
	    sb.append(", \"parent\"=\"").append(this.parent).append("\"");
	    sb.append("}");
		return sb.toString();
	}

}
