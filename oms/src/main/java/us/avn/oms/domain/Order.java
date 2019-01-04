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
import java.util.Collection;
import java.util.Date;

public class Order extends OMSObject implements Serializable {
	
	private static final long serialVersionUID = 8751282165329859742L;
	
	public static final String ACTIVE = "A";
	public static final String PENDING = "P";
	public static final String COMPLETE = "C";
	
	public static final String SALE = "S";
	public static final String PURCHASE = "P";


	private Long    shipmentId;
	private Long    customerId;
	private String  customer;
	private Long    carrierId;
	private String  carrier;
	private String  active;       // 'A','P','C'
	private String  purchase;     // 'P','S'
	private Date    expDate;
	private Date    actDate;
	private Double  expVolume;
	private Double  actVolume;
	private Collection<Item> items;
	
	public Order() { }
	
	public Order( Long id ) {
		shipmentId = id;
		customerId = 0L;
		carrierId = 0L;
		active = PENDING;
		purchase = PURCHASE;
		Date d = new Date();
		expDate = d;
		actDate = d;
	}
	
	public Long getShipmentId() {
		return shipmentId;
	}
	
	public void setShipmentId(Long id) {
		this.shipmentId = id;
	}
	
	
	public Long getCustomerId() {
		return customerId;
	}
	
	public void setCustomerId(Long customerId) {
		this.customerId = customerId;
	}
	
	
	public String getCustomer() {
		return customer;
	}

	public void setCustomer(String customer) {
		this.customer = customer;
	}

	
	public Long getCarrierId() {
		return carrierId;
	}
	
	public void setCarrierId(Long carrierId) {
		this.carrierId = carrierId;
	}
	
	
	public String getCarrier() {
		return carrier;
	}

	public void setCarrier(String carrier) {
		this.carrier = carrier;
	}

	
	public String getActive() {
		return active;
	}
	
	public void setActive(String active) {
		this.active = active;
	}
	
	
	public String getPurchase() {
		return purchase;
	}
	
	public void setPurchase(String purchase) {
		this.purchase = purchase;
	}
	
	
	public String getExpDate() {
		if( expDate != null ) {
			return sdfd.format(expDate);
		}
		return null;
	}
	
	public void setExpDate(String xd) {
		try {
			this.expDate = sdfd.parse(xd);
		} catch( Exception e) {
			this.expDate = null;
		}
	}
	
	
	public String getActDate() {
		if( actDate != null ) {
			return sdfd.format(actDate);
		}
		return null;
	}
	
	public void setActDate(String ad ) {
		try {
			this.actDate = sdfd.parse(ad);
		} catch( Exception e ) {
			this.actDate = null;
		}
	}

	
	public Double getExpVolume() {
		return expVolume;
	}

	public void setExpVolume(Double expVolume) {
		this.expVolume = expVolume;
	}

	
	public Double getActVolume() {
		return actVolume;
	}

	public void setActVolume(Double actVolume) {
		this.actVolume = actVolume;
	}

	
	public Collection<Item> getItems() {
		return items;
	}

	public void setItems(Collection<Item> items) {
		this.items = items;
	}
	
	
}
