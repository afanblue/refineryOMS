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


public class TankData extends OMSObject implements Serializable {
	
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


}
