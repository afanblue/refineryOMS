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
package us.avn.oms.service.impl;

import java.util.Collection;

import us.avn.oms.domain.Item;
import us.avn.oms.domain.Order;
import us.avn.oms.mapper.OrderMapper;
import us.avn.oms.service.OrderService;

public class OrderServiceImpl implements OrderService {


	private OrderMapper orderMapper;
	
	public void setOrderMapper( OrderMapper om ) {
		this.orderMapper = om;
	}
	
	/**
	 * Get the order (shipment) record for the specified ID
	 * @param id ID of shipment to retrieve
	 * @return Order record only (no items)
	 */
	@Override
	public Order getOrder( Long id ) {
		Order o = orderMapper.getOrder(id);
		o.setItems(orderMapper.getOrderItems(id));
		return o;
	}
	
	/**
	 * Get order items (shipment_item records) for a given order (shipment)
	 * @param id ID of shipment
	 * @return all items for specified order
	 */
	@Override
	public Collection<Item> getOrderItems( Long id ) {
		return orderMapper.getOrderItems(id);
	}
	
	/**
	 * Get all of the active orders, i.e., those that have some items with
	 * active = 'A'
	 * @return all active orders 
	 */
	@Override
	public Collection<Order> getActiveOrders( ) {
		return orderMapper.getActiveOrders();
	}
	
	/**
	 * Get all of the pending orders, i.e., those that have some 
	 * items with active = 'P'
	 * @param id 
	 * @return All pending orders
	 */
	@Override
	public Collection<Order> getPendingOrders( ) {
		return orderMapper.getPendingOrders();
	}
	
	/**
	 * Get all the pending shipment items for a given shipment (order)
	 * @param id ID of order to get the itesm for
	 * @return pending shipment items
	 */
	@Override
	public Collection<Item> getPendingOrderItems( Long id ) {
		return orderMapper.getPendingOrderItems(id);
	}
	
	/**
	 * Get all the orders of type (Purchase or Sale)
	 * @param type P(urchase) or S(ale)
	 * @return collection of specified orders
	 */
	@Override
	public Collection<Order> getOrdersByType( String type ) {
		return orderMapper.getOrdersByType(type);
	}
	
	/**
	 * Get the last week's orders, i.e., all the orders from the current
	 * day minus one week
	 * @return
	 */
	@Override
	public Collection<Order> getLastWeeksOrders( ) {
		return orderMapper.getLastWeeksOrders();
	}
	
	/**
	 * Get the last month's orders, i.e., all the orders from the current
	 * day minus one month
	 * @return collection of the last month's orders
	 */
	@Override
	public Collection<Order> getLastMonthsOrders( ) {
		return orderMapper.getLastMonthsOrders();
	}
	
	/**
	 * Insert a DB record for the given Order
	 * @param o Order to be inserted
	 * @return ID of order inserted
	 */
	@Override
	public Long insertOrder( Order o ) {
		orderMapper.insertOrder(o);
		return o.getShipmentId();
	}
	
	/**
	 * Insert a DB record for the given item
	 * @param i Item to be inserted
	 */
	@Override
	public void insertItem( Item i ) {
		orderMapper.insertItem(i);
	}
	
	/**
	 * Update the DB record for the given order
	 * @param o Order to be updated
	 * @return ID of record updated
	 */
	@Override
	public Long updateOrder( Order o ) {
		orderMapper.updateOrder(o);
		return o.getShipmentId();
	}
	
	/**
	 * Update the DB record for the given item
	 * @param i Item to be updated
	 */
	@Override
	public 	void updateItem( Item i ) {
		orderMapper.updateItem(i);
	}

}