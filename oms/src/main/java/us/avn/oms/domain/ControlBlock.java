package us.avn.oms.domain;

import java.io.Serializable;
import java.util.Collection;

/*
 *  select cb.id, cb.tag_id, cb.block_type, t.name output, ti.name input
 *    from oms.control_block cb 
 *    join digital_output do on cb.id=do.tag_id
 *    join tag t on cb.id=t.id
 *    join tag ti on cb.tag_id = ti.id
 *   order by 1;
 *         
 *           id: 236
 *       tag_id: 213
 *   block_type: 1
 *       output: RU1CP-DO
 *        input: RU1CP-DI
 *          
 */
public class ControlBlock implements Serializable {
	
	private static final long serialVersionUID = 8751282105532159742L;
	
	private Long id;            /* id of output */
	private Long tagId;         /* id of input  */
	private String blockType;
	private String output; 
	private String input;
	private Double scanValue;
	private Collection<IdName> allOutputs;
	private Collection<IdName> allDInputs;
	private Collection<IdName> allAInputs;
    
    public ControlBlock() { }
    
    public ControlBlock( Long id, String outp ) {
    	this.id = id;
    	this.output = outp;
    	this.tagId = 0L;
    	this.blockType = "analog";
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

	public void setTagId(Long tagId) {
		this.tagId = tagId;
	}


	public String getBlockType() {
		return (blockType==null)?"":blockType;
	}

	public void setBlockType(String blockType) {
		this.blockType = blockType;
	}


	public String getOutput() {
		return output;
	}

	public void setOutput(String output) {
		this.output = output;
	}


	public String getInput() {
		return input;
	}

	public void setInput(String input) {
		this.input = input;
	}


	public Double getScanValue() {
		return scanValue;
	}

	public void setScanValue(Double scanValue) {
		this.scanValue = scanValue;
	}


	public Collection<IdName> getAllOutputs() {
		return allOutputs;
	}

	public void setAllOutputs(Collection<IdName> allOutputs) {
		this.allOutputs = allOutputs;
	}

	
	public Collection<IdName> getAllDInputs() {
		return allDInputs;
	}

	public void setAllDInputs(Collection<IdName> allDInputs) {
		this.allDInputs = allDInputs;
	}

	
	public Collection<IdName> getAllAInputs() {
		return allAInputs;
	}

	public void setAllAInputs(Collection<IdName> allAInputs) {
		this.allAInputs = allAInputs;
	}
	

	public String toString() {
		StringBuffer sb = new StringBuffer(2000);
		sb.append("ControlBlock{\"id\"=").append(this.id);
		sb.append("\"tag_id\"=").append(this.tagId);
		sb.append("\"block_type\"=").append(this.blockType);
		sb.append(", \"output\"=\"").append(this.output).append("\"");
		sb.append(", \"input\"=\"").append(this.input).append("\"");
		sb.append("}");
		return sb.toString();
	}

}
