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


public class Crontab extends OMSObject implements Serializable {
	
	private static final long serialVersionUID = 8751396105532159742L;
	
	private Long id;
	private String name;
	private String moh;
	private String hod;
	private String dom;
	private String moy;
	private String dow;
	private Integer hourDuration;
	private Integer minDuration;
	  
	
	public Long getId() {
		return this.id;
	}
	
	public void setId( Long i ) {
		this.id = i;
	}

	/**
	 * @return the name
	 */
	public String getName() {
		return name;
	}

	/**
	 * @param name the name to set
	 */
	public void setName(String name) {
		this.name = name;
	}

	/**
	 * @return the moh
	 */
	public String getMoh() {
		return moh;
	}

	/**
	 * @param moh the moh to set
	 */
	public void setMoh(String moh) {
		this.moh = moh;
	}

	/**
	 * @return the hod
	 */
	public String getHod() {
		return hod;
	}

	/**
	 * @param hod the hod to set
	 */
	public void setHod(String hod) {
		this.hod = hod;
	}

	/**
	 * @return the dom
	 */
	public String getDom() {
		return dom;
	}

	/**
	 * @param dom the dom to set
	 */
	public void setDom(String dom) {
		this.dom = dom;
	}

	/**
	 * @return the moy
	 */
	public String getMoy() {
		return moy;
	}

	/**
	 * @param moy the moy to set
	 */
	public void setMoy(String moy) {
		this.moy = moy;
	}

	/**
	 * @return the dow
	 */
	public String getDow() {
		return dow;
	}

	/**
	 * @param dow the dow to set
	 */
	public void setDow(String dow) {
		this.dow = dow;
	}

	/**
	 * @return the hourDuration
	 */
	public Integer getHourDuration() {
		return hourDuration;
	}

	/**
	 * @param hourDuration the hourDuration to set
	 */
	public void setHourDuration(Integer hourDuration) {
		this.hourDuration = hourDuration;
	}

	/**
	 * @return the minDuration
	 */
	public Integer getMinDuration() {
		return minDuration;
	}

	/**
	 * @param minDuration the minDuration to set
	 */
	public void setMinDuration(Integer minDuration) {
		this.minDuration = minDuration;
	}

	
}
