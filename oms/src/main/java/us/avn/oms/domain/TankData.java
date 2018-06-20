package us.avn.oms.domain;

import java.io.Serializable;
import java.text.SimpleDateFormat;
import java.util.Collection;
import java.util.Date;

public class TankData implements Serializable {
	
	private static final long serialVersionUID = 8751282105532159742L;
		
    private Long     tagId;
    private String   name;
    private Double   zeroLevel;
    private Double   maxLevel;
    private Double   level;
    private String   levelText;
    private String   levelAlarm;
    private String   levelColor;
    private Double   temp;
    private String   tempText;
    private String   tempAlarm;
    private String   tempColor;
    private Location loc;
    
    /* ************************************** */
	
	public Long getTagId() {
		return tagId;
	}

	public void setTagId(Long tid) {
		this.tagId = tid;
	}


	public String getName() {
		return name;
	}

	public void setName(String n) {
		this.name = n;
	}


	public Double getZeroLevel() {
		return zeroLevel;
	}

	public void setZeroLevel(Double zeroLevel) {
		this.zeroLevel = zeroLevel;
	}

	
	public Double getMaxLevel() {
		return maxLevel;
	}

	public void setMaxLevel(Double maxLevel) {
		this.maxLevel = maxLevel;
	}

	
	public Double getLevel() {
		return level;
	}

	public void setLevel(Double l) {
		this.level = l;
	}


	public String getLevelText() {
		return levelText;
	}

	public void setLevelText(String lt) {
		this.levelText = lt;
	}


	public String getLevelAlarm() {
		return levelAlarm;
	}

	public void setLevelAlarm(String la) {
		this.levelAlarm = la;
	}


	public String getLevelColor() {
		return levelColor;
	}

	public void setLevelColor(String lc) {
		this.levelColor = lc;
	}


	public Double getTemp() {
		return temp;
	}

	public void setTemp(Double t) {
		this.temp = t;
	}


	public String getTempText() {
		return tempText;
	}

	public void setTempText(String tt) {
		this.tempText = tt;
	}


	public String getTempAlarm() {
		return tempAlarm;
	}

	public void setTempAlarm(String ta) {
		this.tempAlarm = ta;
	}


	public String getTempColor() {
		return tempColor;
	}

	public void setTempColor(String tc) {
		this.tempColor = tc;
	}


	public Location getLocation() {
		return loc;
	}

	public void setLocation(Location l) {
		this.loc = l;
	}


	public String toString() {
		StringBuffer sb = new StringBuffer(2000);
		sb.append("TankData{ \"tagId\":").append(this.tagId);
		sb.append(", \"name\"=[").append(this.name).append("\"");
		sb.append(", \"zeroLevel\"=").append(this.zeroLevel);
		sb.append(", \"maxLevel\"=").append(this.maxLevel);
		sb.append(", \"levelText\"=\"").append(this.tempText).append("\"");
		sb.append(", \"level\"=").append(this.level);
		sb.append(", \"levelAlarm\"=\"").append(this.levelAlarm).append("\"");
		sb.append(", \"levelColor\"=\"").append(this.levelColor).append("\"");
		sb.append(", \"tempText\"=\"").append(this.tempText).append("\"");
		sb.append(", \"temp\"=").append(this.temp);
		sb.append(", \"tempAlarm\"=[").append(this.tempAlarm).append("\"");
		sb.append(", \"tempColor\"=[").append(this.tempColor).append("\"");
		sb.append(" }");
		return sb.toString();
	}

}
