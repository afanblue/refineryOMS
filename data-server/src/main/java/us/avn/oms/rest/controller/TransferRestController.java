/*******************************************************************************
 * Copyright (C) 2018 A. E. Van Ness
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

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import us.avn.oms.domain.IdName;
import us.avn.oms.domain.Transfer;
import us.avn.oms.service.TransferService;

@RestController

@RequestMapping("/transfer")
public class TransferRestController {
	
    /* Get actual class name to be printed on */
    private Logger log = LogManager.getLogger(this.getClass().getName());

	@Autowired 
	TransferService transferService;
	
	
	@RequestMapping(method = RequestMethod.GET, produces="application/json", value="/active")
    @ResponseStatus(HttpStatus.OK)
	public Collection<Transfer> getActiveTransfers( ) {
		log.debug("get active transfers");
		return transferService.getActiveTransfers();
	}
	
	@RequestMapping(method = RequestMethod.GET, produces="application/json", value="/all/{type}")
    @ResponseStatus(HttpStatus.OK)
	public Collection<Transfer> getAllTransfers(@PathVariable String type ) {
		log.debug("get all transfers");
		return transferService.getAllTransfers(type);
	}
	
	@RequestMapping(method = RequestMethod.GET, produces="application/json", value="/last/{num}")
    @ResponseStatus(HttpStatus.OK)
	public Collection<Transfer> getLastTransfers( @PathVariable Long num ) {
		log.debug("get last "+num+" days transfers");
		return transferService.getLastTransfers( num );
	}
	
	@RequestMapping(method = RequestMethod.GET, produces="application/json", value="/scheduled")
    @ResponseStatus(HttpStatus.OK)
	public Collection<Transfer> getScheduledTransfers(  ) {
		log.debug("get scheduled transfers");
		return transferService.getScheduledTransfers( );
	}
	
	@RequestMapping(method = RequestMethod.PUT, produces="application/json", value="/update")
	@ResponseBody
    @ResponseStatus(HttpStatus.OK)
	public void updateTransfer(@RequestBody Transfer x ) {
		log.debug("update transfer w/id "+x.getId());
		if( x.getId() != 0 ) {
			transferService.updateTransfer(x);
		} else {
			transferService.insertTransfer(x);
		}
	}

	@RequestMapping(method = RequestMethod.POST, produces="application/json", value="/insert")
	@ResponseBody
    @ResponseStatus(HttpStatus.CREATED)
	public void insertTransfer(@RequestBody Transfer x ) {
		log.debug("update transfer w/id "+x.getId());
		if( x.getId() != 0 ) {
			transferService.updateTransfer(x);
		} else {
			transferService.insertTransfer(x);
		}
	}

	@RequestMapping(method = RequestMethod.GET, produces="application/json", value="/{id}")
	@ResponseBody
    @ResponseStatus(HttpStatus.OK)
	public Transfer getTransfer( @PathVariable Long id) {
		log.debug("get transfer w/id "+id);
		Transfer t = null;
		t = transferService.getTransfer(id);
		return t;
	}
	
	@RequestMapping(method = RequestMethod.GET, produces="application/json", value="/statuses")
	@ResponseBody
    @ResponseStatus(HttpStatus.OK)
	public Collection<IdName> getTransferStatuses( ) {
		log.debug("get transfer statuses ");
		return transferService.getTransferStatuses();
	}

	@RequestMapping(method = RequestMethod.GET, produces="application/json", value="/types")
	@ResponseBody
    @ResponseStatus(HttpStatus.OK)
	public Collection<IdName> getTransferTypes( ) {
		log.debug("get transfer types ");
		return transferService.getTransferTypes();
	}

}
