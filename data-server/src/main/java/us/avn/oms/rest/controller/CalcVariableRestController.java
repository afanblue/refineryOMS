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

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.Iterator;

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

//import us.avn.oms.domain.CalcOperand;
import us.avn.oms.domain.CalcVariable;
import us.avn.oms.domain.IdName;
//import us.avn.oms.domain.IdName;
import us.avn.oms.domain.RelTagTag;
import us.avn.oms.service.AnalogInputService;
//import us.avn.oms.domain.Tag;
import us.avn.oms.service.CalcVariableService;
import us.avn.oms.service.ConfigService;
import us.avn.oms.service.TagService;

@RestController
@RequestMapping("/calcVariable")
public class CalcVariableRestController {
	
    /* Get actual class name to be printed on */
    private Logger log = LogManager.getLogger(this.getClass().getName());
	
    @Autowired
    AnalogInputService ais;
    
	@Autowired 
	CalcVariableService cvs;
	
	@Autowired
	ConfigService cs;
	
	@Autowired
	TagService ts;

	@RequestMapping(method = RequestMethod.GET, produces="application/json", value="/all")
	@ResponseBody
    @ResponseStatus(HttpStatus.OK)
	public Collection<CalcVariable> getAllCalcVariables( ) {
		log.debug("getting all calc variables");
		return cvs.getAllCalcVariables();
	}
	
	@RequestMapping(method = RequestMethod.GET, produces="application/json", value="/{id}")
	@ResponseBody
    @ResponseStatus(HttpStatus.OK)
	public CalcVariable getCalcVariable( @PathVariable Long id  ) {
		CalcVariable cv = cvs.getCalcVariable(id);
		ArrayList<String> tl = new ArrayList<>(Arrays.asList("AI", "DI", "C"));
//		cv.setInputTags(tl);
		return cv;
	}
	
	@RequestMapping(method = RequestMethod.GET, produces="application/json", value="/name/{name}")
	@ResponseBody
    @ResponseStatus(HttpStatus.OK)
	public CalcVariable getCalcVariable( @PathVariable String nm  ) {
		CalcVariable cv = cvs.getCalcVariableByName(nm);
		return cv;
	}
	
	@RequestMapping(method = RequestMethod.POST, value="/insert" )
    @ResponseStatus(HttpStatus.CREATED)
	public Long insertCalcVariable(@RequestBody CalcVariable cv) {
		log.debug("Inserting calcVariable "+cv.toString());
		cvs.insertCalcVariable(cv);
		Long id = cv.getId();
		insertInputTags(id, cv.getInputTags());
		return 1L;
	}
	
	@RequestMapping(method = RequestMethod.PUT, value="/update" )
    @ResponseStatus(HttpStatus.OK)
	public void updateCalcVariable(@RequestBody CalcVariable cv) {
		log.debug("Updating calc variable - "+cv.toString());
		cvs.updateCalcVariable(cv); 
		Long id = cv.getId();
		// delete & insert tags
		ts.deleteChildTags(id);
		insertInputTags(id, cv.getInputTags());
	}
	
	private void insertInputTags( Long id, Collection<IdName> ct ) {
		// insert tags
		Iterator<IdName> ict = ct.iterator();
		Long orderNo = 0L;
		while( ict.hasNext() ) {
			IdName cidn = ict.next();
			orderNo++;
			RelTagTag rtt = new RelTagTag();
			rtt.setId(0L);
			rtt.setParentTagId(id);
			rtt.setCode(orderNo.toString());
			rtt.setChildTagId(cidn.getId());
			ts.insertRelationship(rtt);
		}		
	}

}
