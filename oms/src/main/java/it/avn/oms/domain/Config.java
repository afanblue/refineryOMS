package it.avn.oms.domain;

import java.io.Serializable;

public class Config implements Serializable {
	
	public static final String NORMCOLOR = "NORMCOLOR";
	public static final String HHCOLOR = "HHCOLOR";
	public static final String HICOLOR = "HICOLOR";
	public static final String LOCOLOR = "LOCOLOR";
	public static final String LLCOLOR = "LLCOLOR";
	public static final String SITE = "SITE";
	public static final String CURRENT_TEMP = "CURRENT_TEMP";
	public static final String CURRENT_PRESSURE = "CURRENT_PRESSURE";
	public static final String CURRENT_WIND_DIR = "CURRENT_WIND_DIR";
	public static final String CURRENT_WIND_SPEED = "CURRENT_WIND_SPEED";
	public static final String LOGGER_LEVEL = "LOGGER_LEVEL";
	public static final String UI_LOG_DIRECTORY = "UI_LOG_DIRECTORY";
	public static final String WEATHER_LOCATION = "WEATHER_LOCATION";
	public static final String GASOLINE_PERCENT = "GASOLINE-PERCENT";
	public static final String FUEL_OIL_PERCENT = "FUEL-OIL-PERCENT";
	public static final String JET_FUEL_PERCENT = "JET-FUEL-PERCENT";
	public static final String NAPTHA_PERCENT = "NAPTHA-PERCENT";
	public static final String LUBRICANTS_PERCENT = "LUBRICANTS-PERCENT";
	public static final String WAXES_PERCENT = "WAXES-PERCENT";
	public static final String COKE_PERCENT = "COKE_PERCENT";
	public static final String ASPHALT_PERCENT = "ASPHALT-PERCENT";
	public static final String STILLGAS_PERCENT = "STILLGAS-PERCENT";

	private static final long serialVersionUID = 8751282105532159742L;
	
	private Long id;
	private String key;
	private String value;
	  
	
	public Long getId() {
		return this.id;
	}
	
	public void setId( Long i ) {
		this.id = i;
	}
	

	public String getKey() {
		return key;
	}
	
	public void setKey(String kn) {
		this.key = kn;
	}
	
	
	public String getValue() {
		return value;
	}
	
	public void setValue(String kv) {
		this.value = kv;
	}
	
	
	public String toString() {
		StringBuffer sb = new StringBuffer(2000);
		sb.append("Config{\"key\":\"").append(this.key).append("\"");
		sb.append("\", value\":\"").append(this.value).append("\"");
		sb.append("}");
		return sb.toString();
	}

}
