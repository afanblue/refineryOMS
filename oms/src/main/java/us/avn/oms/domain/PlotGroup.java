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


public class PlotGroup extends OMSObject implements Serializable {
	
	private static final long serialVersionUID = 8751282105532159742L;
	
	private Long id;
	private String name;
	private Long id1;
	private Long id2;
	private Long id3;
	private Long id4;
	private String active;
	private String source;
//    private Collection<IdName> aiList;
    
    public PlotGroup() {}

    public PlotGroup( Long i, String n ) {
    	this.id = i;
    	this.name = n;
    }
    	
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}


	public String getName() {
		return name;
	}

	public void setName(String n) {
		this.name = n;
	}
		

	public Long getId1() {
		return id1;
	}

	public void setId1(Long id1) {
		this.id1 = id1;
	}


	public Long getId2() {
		return id2;
	}

	public void setId2(Long id2) {
		this.id2 = id2;
	}


	public Long getId3() {
		return id3;
	}

	public void setId3(Long id3) {
		this.id3 = id3;
	}


	public Long getId4() {
		return id4;
	}

	public void setId4(Long id4) {
		this.id4 = id4;
	}

/*
	public Collection<IdName> getAiList() {
		return aiList;
	}

	public void setAiList(Collection<IdName> aiList) {
		this.aiList = aiList;
	}
*/

	public String getActive() {
		return active;
	}

	public void setActive(String a) {
		this.active = a;
	}
		

	public String getSource() {
		return source;
	}

	public void setSource(String source) {
		this.source = source;
	}

}
