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
	
	@Override
	public Order getOrder( Long id ) {
		return orderMapper.getOrder(id);
	}
	
	@Override
	public Collection<Item> getOrderItems( Long id ) {
		return orderMapper.getOrderItems(id);
	}
	
	@Override
	public Collection<Order> getActiveOrders( ) {
		return orderMapper.getActiveOrders();
	}
	
	@Override
	public Collection<Order> getOrdersByType( String type ) {
		return orderMapper.getOrdersByType(type);
	}
	
	@Override
	public Collection<Order> getLastWeeksOrders( ) {
		return orderMapper.getLastWeeksOrders();
	}
	
	@Override
	public Collection<Order> getLastMonthsOrders( ) {
		return orderMapper.getLastMonthsOrders();
	}
	
	@Override
	public Long insertOrder( Order o ) {
		orderMapper.insertOrder(o);
		return o.getShipmentId();
	}
	
	@Override
	public void insertItem( Item i ) {
		orderMapper.insertItem(i);
	}
	
	@Override
	public Long updateOrder( Order o ) {
		orderMapper.updateOrder(o);
		return o.getShipmentId();
	}
	
	@Override
	public 	void updateItem( Item i ) {
		orderMapper.updateItem(i);
	}

}