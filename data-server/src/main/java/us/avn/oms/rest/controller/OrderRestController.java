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
package us.avn.oms.rest.controller;

import java.util.Collection;
import java.util.Iterator;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import us.avn.oms.domain.Item;
import us.avn.oms.domain.Order;
import us.avn.oms.service.OrderService;

@RestController

@RequestMapping("/order")
public class OrderRestController {
	
    /* Get actual class name to be printed on */
    private Logger log = LogManager.getLogger(this.getClass().getName());

	@Autowired 
	OrderService orderService;

	@RequestMapping(method = RequestMethod.GET, produces="application/json", value="/active/{code}")
	public Collection<Order> getActiveOrders( @PathVariable String code ) {
		log.debug("get active orders");
		Collection<Order> orders = orderService.getActiveOrders( code );
//		Iterator<Order> io = orders.iterator();
//		while( io.hasNext() ) {
//			Order o = io.next();
//			o.setItems(orderService.getOrderItems(o.getId()));
//		}
		return orders;
	}
	
	@RequestMapping(method = RequestMethod.GET, produces="application/json", value="/type/{type}/{code}")
	public Collection<Order> getOrdersByType( @PathVariable String type, @PathVariable String code ) {
		log.debug("get active orders of type "+type);
		Collection<Order> orders = orderService.getOrdersByType(type,code);
		return orders;
	}
	
	
	@RequestMapping(method = RequestMethod.GET, produces="application/json", value="/lastWeek/{code}")
	public Collection<Order> getLastWeeksOrders( @PathVariable String code ) {
		log.debug("get active orders");
		Collection<Order> orders = orderService.getLastWeeksOrders(code);
		return orders;
	}
	
	@RequestMapping(method = RequestMethod.GET, produces="application/json", value="/lastMonth/{code}")
	public Collection<Order> getLastMonthOrders( @PathVariable String code ) {
		log.debug("get active orders");
		Collection<Order> orders = orderService.getLastMonthsOrders(code);
		return orders;
	}
	
	@RequestMapping(method = RequestMethod.GET, produces="application/json", value="/{id}")
	public Order getOrder( @PathVariable Long id) {
		Order o = orderService.getOrder(id);
		if( o == null ) {
			o = new Order(id);
			o.setItems(null);
		} else {
			o.setItems(orderService.getOrderItems(id));
		}
		log.debug("Order ("+id+") "+o.toString());
		return o;
	}
	
	private void updateItems( Order o ) {
		Long id = o.getId()==null?0L:o.getId();
		Iterator<Item> itemItr = o.getItems().iterator();
		Long ino = 1L;
		while( itemItr.hasNext() ) {
			Item i = itemItr.next();
			i.setId(id);
			i.setItemNo(ino);
			ino++;
			orderService.insertItem(i);
		}
	}

	
	@RequestMapping(method = RequestMethod.PUT, value="/update" )
	public void updateOrder(@RequestBody Order o ) {
		log.debug("Update " + o.toString()); 
		Long id = o.getId()==null?0L:o.getId();
		if( id == 0L ) {
			o.setId(id);
			id = orderService.insertOrder(o);
		} else {
			orderService.updateOrder(o);
		}
		updateItems(o);
	}

	@RequestMapping(method = RequestMethod.POST, value="/insert" )
	public Long insertorder(@RequestBody Order o ) {
		log.debug("Insert " + o.toString());
		Long id = o.getId();
		if( id == 0L ) {
			id = orderService.insertOrder(o);
		} else {
			orderService.updateOrder(o);
		}
		updateItems(o);
		return id;
	}

}
