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

import java.io.PrintWriter;
import java.io.Serializable;
import java.io.StringWriter;
import java.util.Collection;
import java.util.Iterator;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import us.avn.oms.service.TankService;

public class Tank extends OMSObject implements Serializable {
	
	private static final long serialVersionUID = 8751282105532159742L;
	
	public static final String CRUDE = "C";
	public static final String GASOLINE = "G";
	public static final String FUEL_OIL = "FO";
	public static final String JET_FUEL = "JF";
	public static final String NAPTHA = "N";
	public static final String LUBRICANT = "L";
	public static final String WAX = "W";
	public static final String COKE = "CK";
	public static final String ASPHALT = "A";
	public static final String STILL_GAS = "SG";
	
	private Long id;
	private Tag  tag;
	private Double api;
	private Double density;
	private Double height;
	private Double diameter;
	private String units;
    private String contentType;
    private String contentTypeCode;
    private Long tempId;
    private Long levelId;
    private Long tempRttId;
    private Long levelRttId;
    private String tempTag;
    private String levelTag;
    private Tag siteLocation;
    private Collection<Volume> volumes;
    
    
	public Tank() { }
    
    public Tank( Long i, String n ) {
    	this.id = i;
    	Tag t = new Tag(i,n);
    	t.setTagTypeCode("TK");
    	t.setActive("Y");
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

	public Double getApi() {
		return api;
	}

	public void setApi(Double api) {
		this.api = api;
	}


	public Double getDensity() {
		return density;
	}

	public void setDensity(Double density) {
		this.density = density;
	}


	public Double getHeight() {
		return height;
	}

	public void setHeight(Double height) {
		this.height = height;
	}


	public Double getDiameter() {
		return diameter;
	}

	public void setDiameter(Double diameter) {
		this.diameter = diameter;
	}


	public String getUnits() {
		return units;
	}

	public void setUnits(String units) {
		this.units = units;
	}


	public String getContentType() {
		return contentType;
	}

	public void setContentType(String contentType) {
		this.contentType = contentType;
	}


	public String getContentTypeCode() {
		return contentTypeCode;
	}

	public void setContentTypeCode(String contentTypeCode) {
		this.contentTypeCode = contentTypeCode;
	}

	
	public Long getTempId() {
		return tempId;
	}

	public void setTempId(Long tempId) {
		this.tempId = tempId;
	}

	
	public Long getLevelId() {
		return levelId;
	}

	public void setLevelId(Long levelId) {
		this.levelId = levelId;
	}
	

	public Long getTempRttId() {
		return tempRttId;
	}

	public void setTempRttId(Long tempRttId) {
		this.tempRttId = tempRttId;
	}
	

	public Long getLevelRttId() {
		return levelRttId;
	}

	public void setLevelRttId(Long levelRttId) {
		this.levelRttId = levelRttId;
	}

	
	public String getTempTag() {
		return tempTag;
	}

	public void setTempTag(String tempTag) {
		this.tempTag = tempTag;
	}


	public String getLevelTag() {
		return levelTag;
	}

	public void setLevelTag(String levelTag) {
		this.levelTag = levelTag;
	}

	   
	public Tag getSiteLocation() {
		return siteLocation;
	}

	public void setSiteLocation(Tag sl) {
		this.siteLocation = sl;
	}

	
	public Collection<Volume> getVolumes() {
		return volumes;
	}

	public void setVolumes(Collection<Volume> vs) {
		this.volumes = vs;
	}
	
	@SuppressWarnings("unused")
	public Double computeLevel( Double vol ) {
		Double level = 0D;
		Volume vb = null;     // beginning volume for interpolation
		Volume ve = null;     // ending volume for interpolation
		Volume vl = null;     // "last" volume checked
		Integer cvSize = volumes.size();
		Integer loopCount = 0;
		Iterator<Volume> iv = volumes.iterator();
		while( iv.hasNext() ) {
			loopCount++;
			Volume v = iv.next();
			if( (v.getVolume() < vol) && (loopCount < (cvSize-1)) ) {
				vb = v;
			}
			if( (v.getVolume() >= vol) || (loopCount == cvSize) ) {
				if( vb == null ) {
					vb = v;
					ve = iv.next();
				} else {
					ve = v;
				}
				break;
			}
		}
		Double slope = (ve.getLevel() - vb.getLevel())
					 / (ve.getVolume() - vb.getVolume());
		level = vb.getLevel() + slope * (vol - vb.getVolume());
		return level;
	}

	@SuppressWarnings("unused")
	public Double computeVolume( Double level ) {
		Double vol = 0D;
		Volume vb = null;
		Volume ve = null;
		Integer cvSize = volumes.size();
		Integer loopCount = 0;
		Iterator<Volume> iv = volumes.iterator();
		while( iv.hasNext() ) {
			loopCount++;
			Volume v = iv.next();
//			log.debug("Level: "+level+", volume: "+v.toString());
			if( (v.getLevel() < level) && (loopCount < (cvSize-1)) ) {
				vb = v;
			}
			if( v.getLevel() >= level || (loopCount == cvSize) ) {
				if( loopCount == 1 ) {
					vb = v;
					ve = iv.next();
				} else {
					ve = v;
				}
				break;
			}
		}
		Double slope = (ve.getVolume() - vb.getVolume())
					 / (ve.getLevel() - vb.getLevel());
		vol = vb.getVolume() + slope * (level - vb.getLevel());
		return vol;
	}

	
/*
	public Collection<IdName> getTemperatures() {
		return temperatures;
	}

	public void setTemperatures(Collection<IdName> temperatures) {
		this.temperatures = temperatures;
	}
	

	public Collection<IdName> getLevels() {
		return levels;
	}

	public void setLevels(Collection<IdName> levels) {
		this.levels = levels;
	}

	
    public Collection<ReferenceCode> getContentTypes() {
		return contentTypes;
	}

	public void setContentTypes(Collection<ReferenceCode> contentTypes) {
		this.contentTypes = contentTypes;
	}
*/

}
