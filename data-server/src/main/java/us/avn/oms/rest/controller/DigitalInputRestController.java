package us.avn.oms.rest.controller;

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

import us.avn.oms.domain.DigitalInput;
import us.avn.oms.service.DigitalInputService;

@RestController

@RequestMapping("/di")
public class DigitalInputRestController {
	
    /* Get actual class name to be printed on */
    private Logger log = LogManager.getLogger(this.getClass().getName());

	@Autowired 
	DigitalInputService diService;

	@RequestMapping(method = RequestMethod.GET, produces="application/json", value="/all")
	public Collection<DigitalInput> getAllDigitalInputs(  ) {
		log.debug("get all digital inputs");
		return diService.getAllDigitalInputs( );
	}
	
	@RequestMapping(method = RequestMethod.GET, produces="application/json", value="/{id}")
	@ResponseBody
	public DigitalInput getDigitalInput( @PathVariable Long id) {
		log.debug("get digital input w/id "+id);
		return diService.getDigitalInput(id);
	}
	
	@RequestMapping(method = RequestMethod.POST, value="/insert" )
	public Long insertDigitalInput(@RequestBody DigitalInput di ) {
		log.debug("Inserting digital input "+di.toString());
		return diService.insertDigitalInput(di);
	}
	
	@RequestMapping(method = RequestMethod.PUT, value="/update" )
	public void updateDigitalInput(@RequestBody DigitalInput di) {
	   log.debug("Updating digital input - "+di.toString());
	   diService.updateDigitalInputStatic(di); 
	}

}
