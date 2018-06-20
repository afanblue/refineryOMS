package us.avn.oms.domain;

import java.io.Serializable;
import java.util.Collection;

public class ProcessUnit implements Serializable {
	
	private static final long serialVersionUID = 8751282105532159742L;
	
	private Tag tag;
    private Collection<RelTagTag> childTags;
    private Collection<Taglet> tags;			/* list of tags available for unit */
	private Tag siteLocation;
    
    public ProcessUnit() {}
    
    public ProcessUnit( Long i, String n ) {
    	Tag t = new Tag(i,n);
    	t.setTagTypeCode("PU");
    	t.setActive("Y");
    	this.tag = t;
    }
    	
	public Tag getTag() {
		return tag;
	}

	public void setTag(Tag tag) {
		this.tag = tag;
	}
	

	public Collection<RelTagTag> getChildTags() {
		return childTags;
	}

	public void setChildTags(Collection<RelTagTag> t) {
		this.childTags = t;
	}

	
	public Collection<Taglet> getTags() {
		return tags;
	}

	public void setTags(Collection<Taglet> t) {
		this.tags = t;
	}

	
	public Tag getSiteLocation() {
		return siteLocation;
	}

	public void setSiteLocation(Tag siteLocation) {
		this.siteLocation = siteLocation;
	}
	

	public String toString() {
		StringBuffer sb = new StringBuffer(2000);
		sb.append("ProcessUnit{");
		sb.append("\"tag\"=[").append(this.tag.toString()).append("]");
		sb.append(", \"childTags:[\"");
		String delim = "";
		if( this.childTags != null ) {
			for( RelTagTag t: childTags ) {
				sb.append(delim).append("[");
				sb.append(", \"childTagId\"=").append(t.getChildTagId());
				sb.append(", \"child\"=\"").append(t.getChild()).append("\"");
				sb.append("]");
				delim = ", ";
			}
		} else {
			sb.append(", \"childTags\"={empty}");
		}
		sb.append("] ");
	    sb.append("}");
		return sb.toString();
	}

}
