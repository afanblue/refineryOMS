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
public class ControlBlock extends OMSObject implements Serializable {
	
	private static final long serialVersionUID = 8751282105532159742L;
	
	private Long id;            /* id of CO (ignored, pretty much) */
	private Long pvId;          /* id of PV */
	private Long spId;          /* id of SP */
	private String blockType;
	private String sp; 
	private String pv;
	private String co;
	private Double output;
	private Double setpoint;
	private Double procValue;
//	private Collection<IdName> allOutputs;
//	private Collection<IdName> allDInputs;
//	private Collection<IdName> allAInputs;
    
    public ControlBlock() { }
    
    public ControlBlock( Long id, String nm ) {
    	this.id = id;
    	this.co = nm;
    }
    
    public ControlBlock( Long id, Long pvId, Long spId ) {
    	this.id = id;
    	this.pvId = pvId;
    	this.spId = spId;
    	this.blockType = "analog";
    }
    
	
	public Long getId() {
		return id;
	}
	
	public void setId(Long id) {
		this.id = id;
	}
	
	
	public Long getPvId() {
		return pvId;
	}

	public void setPvId(Long pvId) {
		this.pvId = pvId;
	}


	public Long getSpId() {
		return spId;
	}

	public void setSpId(Long spId) {
		this.spId = spId;
	}


	public String getBlockType() {
		return (blockType==null)?"":blockType;
	}

	public void setBlockType(String blockType) {
		this.blockType = blockType;
	}


	public String getCo() {
		return co;
	}

	public void setCo(String out ) {
		this.co = out;
	}


	public String getPv() {
		return pv;
	}

	public void setPv(String inp) {
		this.pv = inp;
	}


	public String getSp() {
		return sp;
	}

	public void setSp(String inp) {
		this.sp = inp;
	}


	public Double getOutput() {
		return output;
	}

	public void setOutput(Double output) {
		this.output = output;
	}


	public Double getSetpoint() {
		return setpoint;
	}

	public void setSetpoint(Double setpoint) {
		this.setpoint = setpoint;
	}

	
	public Double getProcValue() {
		return procValue;
	}

	public void setProcValue(Double procValue) {
		this.procValue = procValue;
	}

	
}
