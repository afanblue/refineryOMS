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

import it.avn.oms.domain.AIValue;
import it.avn.oms.domain.AnalogInput;
import it.avn.oms.domain.Field;
import it.avn.oms.domain.History;
import it.avn.oms.domain.HistoryData;
import it.avn.oms.domain.HistoryRequest;
import it.avn.oms.domain.PlotGroup;
import it.avn.oms.service.AnalogInputService;
import it.avn.oms.service.HistoryService;
import it.avn.oms.service.PlotGroupService;

@RestController

@RequestMapping("/ai")
public class AnalogInputRestController {
	
    /* Get actual class name to be printed on */
    private Logger log = LogManager.getLogger(this.getClass().getName());
    private Long MAXPLOTIDS = 4L;
	@Autowired 
	AnalogInputService aiService;
	
	@Autowired
	HistoryService histService;
	
	@Autowired
	PlotGroupService pgService;

	@RequestMapping(method = RequestMethod.GET, produces="application/json", value="/all")
	public Collection<AnalogInput> getAllAnalogInputs(  ) {
		log.debug("get all analog inputs");
		return aiService.getAllAnalogInputs( );
	}
	
	@RequestMapping(method = RequestMethod.GET, produces="application/json", value="/all/values")
	public Collection<AIValue> getCurrentAIValues( ) {
		log.debug("get all analog input values ");
		return aiService.getCurrentAIValues();
	}	
	
	@RequestMapping(method = RequestMethod.GET, produces="application/json", value="/all/{type}")
	public Collection<AnalogInput> getAllAnalogInputsByType( @PathVariable String type ) {
		log.debug("get all analog inputs for type "+type.toUpperCase());
		return aiService.getAllAnalogInputsByType(type.toUpperCase());
	}
	
	@RequestMapping(method = RequestMethod.GET, produces="application/json", value="/{id}")
	@ResponseBody
	public AnalogInput getAnalogInput( @PathVariable Long id) {
		log.debug("get analog input w/id "+id);
		return aiService.getAnalogInput(id);
	}
	
	@RequestMapping(method = RequestMethod.GET, produces="application/json"
			       , value="/history/{id}/{noDays}")
	@ResponseBody
	public HistoryData getHistory( @PathVariable Long id, @PathVariable Integer noDays) {
		log.debug("get analog input history for/id "+id);
		HistoryRequest hr = new HistoryRequest(id, noDays);
		HistoryData hd = new HistoryData();
		AnalogInput ai = aiService.getBaseAnalogInput(id);
		History h = new History();
		h.setId(id);
		h.setY(ai.getScanValue());
		h.setX(ai.getScanTime().getTime()/1000L);
		Collection<History> ch = histService.getTagHistory(hr);
		ch.add(h);
		hd.setAiTag(ai);
		hd.setHistory( ch );
		return hd;
	}
	
	@RequestMapping(method=RequestMethod.GET, produces="application/json"
			       ,value="/plotGroup/{id}")
	public Collection<HistoryData> getPlotGroup( @PathVariable Long id ) {
		Collection<HistoryData> hdc = new Vector<HistoryData>(4);
		PlotGroup pg = pgService.getPlotGroupDefinition(id);
		Long[] plotIds = {pg.getId1(), pg.getId2(), pg.getId3(), pg.getId4()};
		
		for( int i=0; i<plotIds.length; i++) {
			Long lid = plotIds[i];
			if( lid != null ) {
				HistoryData hd = getHistory(lid,2);
				hdc.add(hd);
			}
		}
		return hdc;
	}
	
	@RequestMapping(method = RequestMethod.POST, value="/insert" )
	public Long insertAnalogInput(@RequestBody AnalogInput ai ) {
		log.debug("Inserting analog input "+ai.toString());
		return aiService.insertAnalogInput(ai);
	}
	
	@RequestMapping(method = RequestMethod.PUT, value="/update" )
	public void updateAnalogInput(@RequestBody AnalogInput ai) {
	   log.debug("Updating analog input - "+ai.toString());
	   aiService.updateAnalogInputStatic(ai); 
	}

	@RequestMapping(method = RequestMethod.GET, value="/pulist/{un}" )
	public Collection<AIValue> getProcUnitValues(@PathVariable String un ) {
	   log.debug("retrieve tag values for ProcessUnit "+un);
	   return aiService.getProcUnitValues(un); 
	}

}
