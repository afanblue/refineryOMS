package us.avn.oms.domain;

import java.io.Serializable;
import java.util.Collection;

public class FieldObjects implements Serializable {
	
	private static final long serialVersionUID = 8751282105532159742L;
	
	private Field field;
    private Collection<AIValue> tags;
	private Tag siteLocation;
    
    public FieldObjects() {}


    public Field getField() {
    	return field;
    }
    
    public void setField( Field f ) {
    	this.field = f;
    }

	public Collection<AIValue> getTags() {
		return tags;
	}

	public void setTags(Collection<AIValue> t) {
		this.tags = t;
	}

	
	public Tag getSiteLocation() {
		return siteLocation;
	}

	public void setSiteLocation(Tag sl) {
		this.siteLocation = sl;
	}
	

	public String toString() {
		StringBuffer sb = new StringBuffer(2000);
		sb.append("FieldObjects{\"field\"=[").append(this.field).append("]");
		sb.append(", \"noTags\"=").append(tags==null?0:this.tags.size());
		sb.append(", \"siteLocation\"=[").append(this.siteLocation).append("]");
	    sb.append("}");
		return sb.toString();
	}

}
