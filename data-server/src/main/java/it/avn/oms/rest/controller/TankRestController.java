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

import it.avn.oms.domain.Field;
import it.avn.oms.domain.Tank;
import it.avn.oms.service.TagService;
import it.avn.oms.service.TankService;

@RestController

@RequestMapping("/tank")
public class TankRestController {
	
    /* Get actual class name to be printed on */
    private Logger log = LogManager.getLogger(this.getClass().getName());

	@Autowired 
	TankService tankService;
	
	@Autowired
	TagService tagService;

	@RequestMapping(method = RequestMethod.GET, produces="application/json", value="/all")
	public Collection<Tank> getAllTanks( ) {
		log.debug("get all tanks");
		return tankService.getAllTanks();
	}
	
	@RequestMapping(method = RequestMethod.GET, produces="application/json", value="/{id}")
	@ResponseBody
	public Tank getTank( @PathVariable Long id) {
		log.debug("get tank w/id "+id);
		return tankService.getTank(id);
	}

	@RequestMapping(method = RequestMethod.PUT, produces="application/json", value="/update")
	@ResponseBody
	public void updateTank(@RequestBody Tank tk ) {
		log.debug("update tank w/id "+tk.getId());
		if( tk.getId() != 0 ) {
			tagService.updateTag(tk.getTag());
			tankService.updateTank(tk);
		} else {
			tagService.insertTag(tk.getTag());
			tankService.insertTank(tk);
		}
	}

	@RequestMapping(method = RequestMethod.POST, produces="application/json", value="/insert")
	@ResponseBody
	public void insertTank(@RequestBody Tank tk ) {
		log.debug("update tank w/id "+tk.getId());
		if( tk.getId() != 0 ) {
			tagService.updateTag(tk.getTag());
			tankService.updateTank(tk);
		} else {
			tagService.insertTag(tk.getTag());
			tankService.insertTank(tk);
		}
	}

}
