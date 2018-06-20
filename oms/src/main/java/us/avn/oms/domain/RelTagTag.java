package us.avn.oms.domain;

import java.io.Serializable;
import java.util.Collection;

/*
 *              id: 16
 *    child_tag_id: 1
 *   parent_tag_id: 19
 */
public class RelTagTag implements Serializable {
	
	private static final long serialVersionUID = 8751282105532159742L;
	
	private Long id;
	private Long parentTagId;
	private String parent;
	private Long childTagId;
	private String child;
    
	
	public Long getId() {
		return id;
	}
	
	public void setId(Long id) {
		this.id = id;
	}

	
	
	public Long getParentTagId() {
		return parentTagId;
	}

	public void setParentTagId(Long parentTagId) {
		this.parentTagId = parentTagId;
	}
	

	public String getParent() {
		return parent;
	}

	public void setParent(String parent) {
		this.parent = parent;
	}
	

	public Long getChildTagId() {
		return childTagId;
	}

	public void setChildTagId(Long childTagId) {
		this.childTagId = childTagId;
	}

	
	public String getChild() {
		return child;
	}

	public void setChild(String child) {
		this.child = child;
	}

	
	public String toString() {
		StringBuffer sb = new StringBuffer(2000);
		sb.append("RelTagTag{\"id\"=").append(this.id);
		sb.append(", \"parentTagId\"=\"").append(this.parentTagId).append("\"");
		sb.append(", \"parent\"=").append(this.parent).append("\"");
		sb.append(", \"childTagId\"=").append(this.childTagId);
		sb.append(", \"child\"=").append(this.child).append("\"");
		sb.append("}");
		return sb.toString();
	}

}
