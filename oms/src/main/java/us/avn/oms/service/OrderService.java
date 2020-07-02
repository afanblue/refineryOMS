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
package us.avn.oms.service;

import java.util.Collection;

import us.avn.oms.domain.Carrier;
import us.avn.oms.domain.Item;
import us.avn.oms.domain.Order;
import us.avn.oms.domain.Value;


public interface OrderService {
	
	/**
	 * Get the number of order items for a given transfer which are not complete
	 * @param xfrId Transfer ID
	 * @return number of order items
	 */
	Long countActiveItems( Long xfrId );
	
	/**
	 * Get the number of active items for a shipment ID and carrier ID
	 * Active is where the shipment_item.active not in ('C','D')
	 * @param id ID for given order
	 * @param carrierId ID for given carrier
	 * @return number of active items
	 */
	Long getNumberActiveItems( Long id, Long carrierId );

	/**
	 * Get the number of pending orders for a given content type
	 * @param type content code
	 * @return number of pending orders
	 */
	Long getPendingOrderCountForContent(String type);
	
	/**
	 * Get the total volume ordered for all content types
	 * @return order volumes by content type
	 */
	Collection<Value> getOrderVolumesForContents();
	
	/**
	 * Get a collection of the shipment ID's which have an item of the specified state
	 * @param sts ("A","C","D","P") to retrieve list 
	 * @return shipment IDs
	 */
	Collection<Long> getOrderListByStatus( String sts); 
	
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
	Item getOrderItemByTransferId( Long id );
	
	/**
	 * Get any active order for the specified carrier.  There should only
	 * be one, but just in case ...
	 * 
	 * @param id Tag ID for specified carrier
	 * @return Item object(s)
	 */
	Collection<Item> getActiveOrderItemForCarrier( Long id );
	
	/**
	 * Get all of the active orders, i.e., those that have some items with
	 * active = 'A' and content code as specified
	 * @param code specified content code ("T" = all)
	 * @return all active orders 
	 */
	Collection<Order> getActiveOrders( String code );
	
	/**
	 * Get all repeat orders, ie, those with a non-zero cycle time
	 * @return all repeat orders
	 */
	Collection<Order> getRepeatOrders();
	
	/**
	 * Get all of the pending orders, i.e., those that have some 
	 * items with active = 'P'
	 * @return All pending orders
	 */
	Collection<Order> getPendingOrders( );

	/**
	 * Get all the pending shipment items for a given shipment (order)
	 * @param id ID of order to get the items for
	 * @return pending shipment items
	 */
	Collection<Item> getPendingOrderItems( Long id );
	
	/**
	 * Get all the orders of type (Purchase or Sale)
	 * @param type P(urchase) or S(ale)
	 * @param code specified content code ("T" = all)
	 * @return collection of specified orders
	 */
	Collection<Order> getOrdersByType( String type, String code );
	
	/**
	 * Get the last week's orders, i.e., all the orders from the current
	 * day minus one week
	 * @param code specified content code ("T" = all)
	 * @return collection of last weeks orders
	 */
	Collection<Order> getLastWeeksOrders( String code );
	
	/**
	 * Get the last month's orders, i.e., all the orders from the current
	 * day minus one month
	 * @param code specified content code ("T" = all)
	 * @return collection of the last month's orders
	 */
	Collection<Order> getLastMonthsOrders( String code );
	
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
	
	/**
	 * Update the item record to mark the item with the specified code
	 * for the given  ID provided in the Value object
	 * @param v value object with id and code 
	 */
	void completeOrderItems( Value v );
	
}
