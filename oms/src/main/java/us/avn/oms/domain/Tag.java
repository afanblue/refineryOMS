package us.avn.oms.domain;

import java.io.Serializable;
import java.util.Collection;

/*
 *              id: 1
 *            name: DeCity
 *     description: NULL
 *   tag_type_code: FLD
 *    js_draw_file: NULL
 *          c1_lat: 39.592313
 *         c1_long: -75.641903
 *          c2_lat: 39.579168
 *         c2_long: -75.619368
 *          active: Y
 */
public class Tag implements Serializable {
	
	private static final long serialVersionUID = 8751282105532159742L;
	
	public static final String ANALOG_INPUT = "AI";
	public static final String ANALOG_OUTPUT = "AO";
	public static final String CALCULATED = "C";
	public static final String CONTROL_BLOCK = "CB";
	public static final String DIGITAL_INPUT = "DI";
	public static final String DOCK = "DK";
	public static final String DIGITAL_OUTPUT = "DO";
	public static final String FIELD = "FLD";
	public static final String HOT_SPOT = "HS";
	public static final String PIPE = "P";
	public static final String PROCESS_UNIT = "PU";
	public static final String REFINERY_UNIT = "RU";
	public static final String SCHEMATIC = "SCM";
	public static final String SHIP = "S";
	public static final String TANK_CAR = "TC";
	public static final String TANK = "TK";
	public static final String TANK_TRUCK = "TT";
	public static final String VALVE = "V";
	public static final String TRANSFER = "XFR";
	
	protected Long id;
	protected String name;
	protected String description;
	protected String tagTypeCode;
	protected Long   tagTypeId;
	protected Double c1Lat;
	protected Double c1Long;
	protected Double c2Lat;
	protected Double c2Long;
    protected String active;
    
    public Tag() { }
    
    public Tag( Long i, String n ) {
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
	
	public void setName(String name) {
		this.name = name;
	}

	
	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	
	public String getTagTypeCode() {
		return tagTypeCode;
	}

	public void setTagTypeCode(String tagTypeCode) {
		this.tagTypeCode = tagTypeCode;
	}

	
	public Long getTagTypeId() {
		return tagTypeId;
	}

	public void setTagTypeId(Long tagTypeId) {
		this.tagTypeId = tagTypeId;
	}

	
	public Double getC1Lat() {
		return c1Lat;
	}

	public void setC1Lat(Double c1Lat) {
		this.c1Lat = c1Lat;
	}


	public Double getC1Long() {
		return c1Long;
	}

	public void setC1Long(Double c1Long) {
		this.c1Long = c1Long;
	}


	public Double getC2Lat() {
		return c2Lat;
	}

	public void setC2Lat(Double c2Lat) {
		this.c2Lat = c2Lat;
	}


	public Double getC2Long() {
		return c2Long;
	}

	public void setC2Long(Double c2Long) {
		this.c2Long = c2Long;
	}
	

	public String getActive() {
		return active;
	}

	public void setActive(String active) {
		this.active = active;
	}

	
	public String toString() {
		StringBuffer sb = new StringBuffer(2000);
		sb.append("Tag{\"id\"=").append(this.id);
		sb.append(", \"name\"=\"").append(this.name).append("\"");
		sb.append(", \"description\"=").append(this.description).append("\"");
		sb.append(", \"tagTypeCode\"=").append(this.tagTypeCode).append("\"");
		sb.append(", \"c1Lat\"=").append(this.c1Lat);
		sb.append(", \"c1Long\"=").append(this.c1Long);
		sb.append(", \"c2Lat\"=").append(this.c2Lat);
		sb.append(", \"c2Long\"=").append(this.c2Long);
		sb.append(", \"active\"=\"").append(this.active).append("\"");
		sb.append("}");
		return sb.toString();
	}

}
