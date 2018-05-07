package it.avn.oms.rest.controller;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.Iterator;
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

import it.avn.oms.domain.IdName;
import it.avn.oms.domain.PlotGroup;
import it.avn.oms.service.AnalogInputService;
import it.avn.oms.service.PlotGroupService;

@RestController
@RequestMapping("/plotGroup")
public class PlotGroupRestController {
	
    /* Get actual class name to be printed on */
    private Logger log = LogManager.getLogger(this.getClass().getName());
	
    @Autowired
    PlotGroupService pgs;

    @Autowired
    AnalogInputService ais;

	@RequestMapping(method = RequestMethod.GET, produces="application/json", value="/all")
	@ResponseBody
	public Collection<PlotGroup> getAllPlotGroups( ) {
		log.debug("getting all fields");
		return pgs.getAllPlotGroups();
	}
		
	@RequestMapping(method = RequestMethod.GET, produces="application/json", value="/{id}")
	@ResponseBody
	public PlotGroup getPlotGroup( @PathVariable Long id  ) {
		
		PlotGroup pg = new PlotGroup(0L, "New Plot Group");
		if( id != 0L ) {
			pg = pgs.getPlotGroupDefinition(id);
		}
		Collection<IdName> pgl = ais.getAllAIIdNameByType("F");
		pgl.addAll(ais.getAllAIIdNameByType("L"));
		pgl.addAll(ais.getAllAIIdNameByType("M"));
		pgl.addAll(ais.getAllAIIdNameByType("P"));
		pgl.addAll(ais.getAllAIIdNameByType("R"));
		pgl.addAll(ais.getAllAIIdNameByType("T"));		
		pg.setAiList(pgl);
		return pg;
	}
	
	@RequestMapping(method = RequestMethod.POST, value="/insert" )
	public void insertPlotGroup(@RequestBody PlotGroup pg) {
		log.debug("Inserting plot group "+pg.toString());
		pgs.insertPlotGroup(pg);
	}
	
	@RequestMapping(method = RequestMethod.PUT, value="/update" )
	public void updatePlotGroup(@RequestBody PlotGroup pg) {
		log.debug("Updating plot group - "+pg.toString());
		pgs.updatePlotGroup(pg); 
	}

}
