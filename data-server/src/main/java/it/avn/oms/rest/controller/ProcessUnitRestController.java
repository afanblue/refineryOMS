package it.avn.oms.rest.controller;

import java.util.Collection;
import java.util.Vector;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;


import it.avn.oms.domain.ProcessUnit;
import it.avn.oms.domain.RelTagTag;
import it.avn.oms.domain.Tag;
import it.avn.oms.domain.Taglet;
import it.avn.oms.domain.User;
import it.avn.oms.service.ConfigService;
import it.avn.oms.service.TagService;

@RestController
@RequestMapping("/processunit")
public class ProcessUnitRestController {
	
    /* Get actual class name to be printed on */
    private Logger log = LogManager.getLogger(this.getClass().getName());
	
	@Autowired 
	TagService ts;
	
	@Autowired
	ConfigService cs;

	@RequestMapping(method = RequestMethod.GET, produces="application/json", value="/{id}")
	@ResponseBody
	public ProcessUnit getProcessUnit( @PathVariable Long id  ) {
		log.debug("getting process unit " + id);
		ProcessUnit pu = new ProcessUnit();
		pu.setSiteLocation(cs.getSiteLocation());
		Tag t = null;
		if( id == 0 ) {
			t = new Tag(0L, "new" );
		} else {
			t = ts.getTag(id);
			pu.setChildTags(ts.getChildTags(id));
		}
		Collection<Taglet> tags = ts.getAllTagletsByType("TK");
		tags.addAll(ts.getAllTagletsByType("AI"));
		tags.addAll(ts.getAllTagletsByType("DI"));
		pu.setTags(tags);
		pu.setTag(t);
		return pu;
	}
	
	@RequestMapping(method = RequestMethod.GET, produces="application/json", value="/all")
	@ResponseBody
	public Collection<ProcessUnit> getAllProcessUnits( ) {
		log.debug("getting all process units");
		Collection<Tag> cts = ts.getAllTagsByType("PU");
		Collection<ProcessUnit> cpu = new Vector<ProcessUnit>();
		for( Tag t: cts ) {
			ProcessUnit pu = new ProcessUnit();
			pu.setTag(t);
			cpu.add(pu);
		}
		return cpu;
	}
	
	@RequestMapping(method = RequestMethod.POST, value="/insert" )
	public Long insertProcessUnit(@RequestBody ProcessUnit pu) {
		log.debug("Inserting process unit " + pu.toString());
		ts.insertTag(pu.getTag());
		Tag t = ts.getTagByName(pu.getTag().getName());
		for( RelTagTag rtt: pu.getChildTags()) {
			rtt.setParentTagId(t.getId());
			ts.insertRelationship(rtt);
		}
		return 1L;
	}
	
	@RequestMapping(method = RequestMethod.PUT, value="/update" )
	public void updateProcessUnit(@RequestBody ProcessUnit pu ) {
		log.debug("Updating process unit - "+pu.toString());
		Long id = pu.getTag().getId();
		ts.deleteChildTags(id);
		ts.updateTag(pu.getTag());
		for( RelTagTag rtt: pu.getChildTags()) {
			rtt.setParentTagId(id);
			ts.insertRelationship(rtt);
		}
	}

}
