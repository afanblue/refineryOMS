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
package us.avn.oms.mapper;

import java.util.Collection;

import us.avn.oms.domain.Item;
import us.avn.oms.domain.Order;


public interface OrderMapper {
	
	
	/**
	 * Get the order (shipment) record for the specified ID
	 * @param id ID of shipment to retrieve
	 * @return Order record only (no items)
	 */
	Order getOrder( Long id );
	
	/**
	 * Get order items (shipment_item records) for a given order (shipment)
	 * @param id ID of shipment
	 * @return all items for specified order
	 */
	Collection<Item> getOrderItems( Long id );
	
	/**
	 * Get order ID by transfer ID
	 * @param id Transfer ID
	 * @return all items w/ specified transfer ID (should only be one)
	 */
	Collection<Item> getOrderItemByTransferId( Long id );
	
	/**
	 * Get all of the active orders, i.e., those that have some items with
	 * active = 'A'
	 * @return all active orders 
	 */
	Collection<Order> getActiveOrders( );
	
	/**
	 * Get all of the pending orders, i.e., those that have some 
	 * items with active = 'P'
	 * @return All pending orders
	 */
	Collection<Order> getPendingOrders( );
	
	/**
	 * Get all the pending shipment items for a given shipment (order)
	 * @param id ID of order to get the itesm for
	 * @return pending shipment items
	 */
	Collection<Item> getPendingOrderItems( Long id );
	
	/**
	 * Get all the orders of type (Purchase or Sale)
	 * @param type P(urchase) or S(ale)
	 * @return collection of specified orders
	 */
	Collection<Order> getOrdersByType( String type );
	
	/**
	 * Get the last week's orders, i.e., all the orders from the current
	 * day minus one week
	 * @return collection of orders from the last week
	 */
	Collection<Order> getLastWeeksOrders( );
	
	/**
	 * Get the last month's orders, i.e., all the orders from the current
	 * day minus one month
	 * @return collection of the last month's orders
	 */
	Collection<Order> getLastMonthsOrders( );
	
	/**
	 * Insert a DB record for the given Order
	 * @param o Order to be inserted
	 * @return ID of order inserted
	 */
	Long insertOrder( Order o );
	
	/**
	 * Insert a DB record for the given item
	 * @param i Item to be inserted
	 */
	void insertItem( Item i );
	
	/**
	 * Update the DB record for the given order
	 * @param o Order to be updated
	 * @return ID of record updated
	 */
	Long updateOrder( Order o );
	
	/**
	 * Update the DB record for the given item
	 * @param i Item to be updated
	 */
	void updateItem( Item i );
	
}
