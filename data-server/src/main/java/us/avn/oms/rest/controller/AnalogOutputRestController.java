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
//import java.util.Vector;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

//import us.avn.oms.domain.AIValue;
import us.avn.oms.domain.AnalogOutput;
//import us.avn.oms.domain.Field;
//import us.avn.oms.domain.History;
//import us.avn.oms.domain.HistoryData;
//import us.avn.oms.domain.HistoryRequest;
//import us.avn.oms.domain.PlotGroup;
import us.avn.oms.service.AnalogOutputService;
import us.avn.oms.service.HistoryService;
import us.avn.oms.service.PlotGroupService;
import us.avn.oms.service.UnitService;

@RestController

@RequestMapping("/ao")
public class AnalogOutputRestController {
	
    /* Get actual class name to be printed on */
    private Logger log = LogManager.getLogger(this.getClass().getName());
//    private Long MAXPLOTIDS = 4L;
    
	@Autowired 
	AnalogOutputService aoService;
	
	@Autowired
	HistoryService histService;
	
	@Autowired
	PlotGroupService pgService;
	
	@Autowired
	UnitService unitService;

	@RequestMapping(method = RequestMethod.GET, produces="application/json", value="/all")
	public Collection<AnalogOutput> getAllAnalogOutputs(  ) {
		log.debug("get all analog outputs");
		return aoService.getAllAnalogOutputs( );
	}
/*
	@RequestMapping(method = RequestMethod.GET, produces="application/json", value="/all/values")
	public Collection<AIValue> getCurrentAOValues( ) {
		log.debug("get all analog output values ");
		return aoService.getCurrentAOValues();
	}	
*/
	@RequestMapping(method = RequestMethod.GET, produces="application/json", value="/{id}")
	@ResponseBody
	public AnalogOutput getAnalogOutput( @PathVariable Long id) {
		log.debug("get analog output w/id "+id);
		return aoService.getAnalogOutput(id);
	}
/*
	@RequestMapping(method = RequestMethod.GET, produces="application/json"
			       , value="/history/{id}/{noDays}")
	@ResponseBody
	public HistoryData getHistory( @PathVariable Long id, @PathVariable Integer noDays) {
		log.debug("get analog output history for/id "+id);
		HistoryRequest hr = new HistoryRequest(id, noDays);
		HistoryData hd = new HistoryData();
		AnalogOutput ao = aoService.getBaseAnalogOutput(id);
		History h = new History();
		h.setId(id);
		h.setY(ao.getScanValue());
		h.setX(ao.getScanTime().getEpochSecond());
		Collection<History> ch = histService.getTagHistory(hr);
		ch.add(h);
		hd.setAiTag(ao);
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
*/	
	@RequestMapping(method = RequestMethod.POST, value="/insert" )
	public Long insertAnalogOutput(@RequestBody AnalogOutput ao ) {
		log.debug("Inserting analog output "+ao.toString());
		return aoService.insertAnalogOutput(ao);
	}
	
	@RequestMapping(method = RequestMethod.PUT, value="/update" )
	public void updateAnalogOutput(@RequestBody AnalogOutput ao) {
	   log.debug("Updating analog output - "+ao.toString());
	   aoService.updateAnalogOutputStatic(ao); 
	}

}
