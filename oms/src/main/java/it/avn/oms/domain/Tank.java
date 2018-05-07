package it.avn.oms.domain;

import java.io.Serializable;
import java.util.Collection;

public class Tank implements Serializable {
	
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
    private String tempTag;
    private String levelTag;
    private Tag siteLocation;
    private Collection<IdName> temperatures;
    private Collection<IdName> levels;
    private Collection<ReferenceCode> contentTypes;
    
    
	public Tank() { }
    
    public Tank( Long i, String n ) {
    	this.id = i;
    	Tag t = new Tag(i,n);
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


	public String toString() {
		StringBuffer sb = new StringBuffer(2000);
		sb.append("Tank{\"id\"=").append(this.id);
		sb.append(", \"tag\"=[").append(tag.toString()).append("]");
		sb.append(", \"api\"=").append(this.api);
		sb.append(", \"density\"=").append(this.density);
		sb.append(", \"height\"=").append(this.height);
		sb.append(", \"diameter\"=").append(this.diameter);
		sb.append(", \"units\"=\"").append(this.units).append("\"");
		sb.append(", \"contentType\"=\"").append(this.contentType).append("\"");
		sb.append(", \"contentTypeCode\"=\"").append(this.contentTypeCode).append("\"");
		sb.append(", \"levelTag\"=\"").append(this.levelTag).append("\"");
		sb.append(", \"tempTag\"=\"").append(this.tempTag).append("\"");
		sb.append("}");
		return sb.toString();
	}

}
