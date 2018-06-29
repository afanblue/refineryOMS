package us.avn.oms.domain;

import java.io.Serializable;
import java.util.Collection;
import java.util.Iterator;


public class CalcVariable implements Serializable {
	
	private static final long serialVersionUID = 8751282105532159742L;
	
	private Long id;
	private String definition;
    private Long outputTagId;
	private Double scanValue;
	private Tag  tag;
    private Collection<IdName> inputTags;	   	// list of input tag IDs
    private Collection<IdName> inputTagList;	// list of possible input tags
    private Collection<IdName> outputTagList;


/* *************************************************** */
    
    public CalcVariable() { }
    
    public CalcVariable( Long id, String name ) {
    	this.id = id;
    	Tag t = new Tag(id, name);
    	t.active = "Y";
    	t.tagTypeCode = Tag.CALCULATED;
    	this.tag = t;
    	this.definition = "0";
    }
	
	public Long getId() {
		return id;
	}
	
	public void setId(Long i) {
		this.id = i;
	}
	
	
	public String getDefinition() {
		return this.definition;
	}
	
	public void setDefinition(String defn) {
		this.definition = defn;
	}
	
	
	public Long getOutputTagId() {
		return this.outputTagId;
	}

	public void setOutputTagId(Long otid) {
		this.outputTagId = otid;
	}
	

	public Double getScanValue() {
		return scanValue;
	}

	public void setScanValue(Double scanValue) {
		this.scanValue = scanValue;
	}

	
	public Tag getTag() {
		return tag;
	}
	
	public void setTag(Tag t) {
		this.tag = t;
	}
	
	
	public Collection<IdName> getInputTags() {
		return inputTags;
	}

	public void setInputTags(Collection<IdName> inputTags) {
		this.inputTags = inputTags;
	}
	

	public Collection<IdName> getInputTagList() {
		return inputTagList;
	}

	public void setInputTagList(Collection<IdName> tagList) {
		this.inputTagList = tagList;
	}

	
	public Collection<IdName> getOutputTagList() {
		return outputTagList;
	}

	public void setOutputTagList(Collection<IdName> outputTagList) {
		this.outputTagList = outputTagList;
	}

	
	public String toString() {
		StringBuffer sb = new StringBuffer(2000);
		sb.append("CalcVariable{ \"id\"=").append(this.id);
		sb.append(", \"tag\"={").append(this.tag.toString()).append("}");
		sb.append(", \"definition\"=\"").append(this.definition).append("\"");
		sb.append(", \"outputTagId\"=").append(this.outputTagId);
		if( this.inputTags != null ) {
			Iterator<IdName> cti = this.inputTags.iterator();
			sb.append(", \"inputTags\"={");
			String delim = "";
			while( cti.hasNext() ) {
				IdName ct = cti.next();
				sb.append(delim).append("[").append(ct.getId());
				sb.append(", \"").append(ct.getName()).append("\"]");
				delim = ", ";
			}
			sb.append("}");
		} else {
			sb.append(", \"inputTags\"={empty}");
		}
		sb.append(" }");
		return sb.toString();
	}

}
