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
import java.sql.Timestamp;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.Collection;
import java.util.Collections;

/**
 * For an order, Sales are the transfer of product to a buyer and Purchases
 * are transfer of crude oil from a seller
 * 
 * Order status is determined, to the extent that we need to know it,
 * by the collective state of its items.  Items transition through the
 * following
 * <ol>
 * <li>P - pending, when the item has been created before the transfer is created</li>
 * <li>A - active, when the transfer for that item has been created</li>
 * <li>D - done, when the transfer for that item has been completed</li>
 * <li>C - complete, when the carrier has been undocked</li>
 * </ol>
 * @author Allan
 *
 */
public class Order extends OMSObject implements Serializable {
	
	private static final long serialVersionUID = 8751282165329859742L;
	
	public static final String SALE = "S";
	public static final String PURCHASE = "P";


	private Long    shipmentId;
	private Long    customerId;
	private String  customer;
	private String  purchase;     // Purchase 'P', Sale 'S'
	private String  active;
	private String  contents;
	private String  carrier;
	private Instant expDate;
	private Instant actDate;
	private Double  expVolume;
	private Double  actVolume;
	private Long    crontabId;
	private Integer delay;
	private Collection<Item> items;
	
	public Order() { }
	
	public Order( Long id ) {
		shipmentId = id;
		customerId = 0L;
		purchase = PURCHASE;
		items = Collections.emptyList();
		actDate = expDate = Instant.now();
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

	
	public String getPurchase() {
		return purchase;
	}
	
	public void setPurchase(String purchase) {
		this.purchase = purchase;
	}
	

	/**
	 * This is a derived active flag based on the number of
	 * active, pending and complete order items.  If the number of
	 * active order items is not zero, the order is active.  If it
	 * is and the number of pending order items is not zero, the order
	 * is pending.  Otherwise, the order is complete.  Note that
	 * 'complete' includes the case where the item is "done", but
	 * has not yet been marked complete.
	 * @return current order status
	 */
	public String getActive() {
		return active;
	}
	
	public void setActive(String act) {
		this.active = act;
	}
	

	/**
	 * Like "active", this is a derived value based on the order items.
	 * It is a concatenated string of all the contents from the order
	 * items.
	 * @return concatenated list of content codes
	 */
	public String getContents() {
		return contents;
	}
	
	public void setContents(String c ) {
		this.contents = c;
	}
	

	public String getCarrier() {
		return carrier;
	}
	
	public void setCarrier(String c ) {
		this.carrier = c;
	}
	

	public Instant getActDate() {
		return actDate;
	}
	
	public void setActDate( Instant ad ) {
		actDate = ad;
	}
	

	public Instant getExpDate() {
		return expDate;
	}
	
	public void setExpDate( Instant xd ) {
		expDate = xd;
	}

	
	public Long getCrontabId() {
		return crontabId;
	}
	
	public void setCrontabId( Long ct ) {
		crontabId = ct;
	}


	public Integer getDelay() {
		return delay;
	}
	
	public void setDelay( Integer i ) {
		delay = i;
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
