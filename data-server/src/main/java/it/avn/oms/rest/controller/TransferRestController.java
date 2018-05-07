package it.avn.oms.rest.controller;

import java.util.Collection;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import it.avn.oms.domain.Transfer;
import it.avn.oms.service.TransferService;

@RestController

@RequestMapping("/transfer")
public class TransferRestController {
	
    /* Get actual class name to be printed on */
    private Logger log = LogManager.getLogger(this.getClass().getName());

	@Autowired 
	TransferService transferService;
	
	
	@RequestMapping(method = RequestMethod.GET, produces="application/json", value="/active")
	public Collection<Transfer> getActiveTransfers( ) {
		log.debug("get active transfers");
		return transferService.getActiveTransfers();
	}
	
	@RequestMapping(method = RequestMethod.GET, produces="application/json", value="/all/{type}")
	public Collection<Transfer> getAllTransfers(@PathVariable String type ) {
		log.debug("get all transfers");
		return transferService.getAllTransfers(type);
	}
	
	@RequestMapping(method = RequestMethod.GET, produces="application/json", value="/last/{num}")
	public Collection<Transfer> getLastTransfers( @PathVariable Long num ) {
		log.debug("get last "+num+" days transfers");
		return transferService.getLastTransfers( num );
	}
	
	@RequestMapping(method = RequestMethod.GET, produces="application/json", value="/scheduled")
	public Collection<Transfer> getScheduledTransfers(  ) {
		log.debug("get scheduled transfers");
		return transferService.getScheduledTransfers( );
	}
	
	@RequestMapping(method = RequestMethod.PUT, produces="application/json", value="/update")
	@ResponseBody
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
	public Transfer getTransfer( @PathVariable Long id) {
		log.debug("get transfer w/id "+id);
		Transfer t = null;
		t = transferService.getTransfer(id);
		return t;
	}

}
