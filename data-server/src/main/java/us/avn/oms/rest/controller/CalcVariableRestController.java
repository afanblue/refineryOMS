package us.avn.oms.rest.controller;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.Iterator;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

//import us.avn.oms.domain.CalcOperand;
import us.avn.oms.domain.CalcVariable;
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
	public Collection<CalcVariable> getAllCalcVariables( ) {
		log.debug("getting all calc variables");
		return cvs.getAllCalcVariables();
	}
	
	@RequestMapping(method = RequestMethod.GET, produces="application/json", value="/{id}")
	@ResponseBody
	public CalcVariable getCalcVariable( @PathVariable Long id  ) {
		CalcVariable cv = cvs.getCalcVariable(id);
		ArrayList<String> tl = new ArrayList<>(Arrays.asList("AI", "DI", "C"));
		cv.setTagList(ts.getAllIdNamesByTypeList(tl));
		cv.setOutputTagList(ais.getAllAIIdNameByType("C"));
		return cv;
	}
	
	@RequestMapping(method = RequestMethod.GET, produces="application/json", value="/name/{name}")
	@ResponseBody
	public CalcVariable getCalcVariable( @PathVariable String nm  ) {
		CalcVariable cv = cvs.getCalcVariableByName(nm);
		return cv;
	}
	
	@RequestMapping(method = RequestMethod.POST, value="/insert" )
	public Long insertCalcVariable(@RequestBody CalcVariable cv) {
		log.debug("Inserting calcVariable "+cv.toString());
		cvs.insertCalcVariable(cv);
		Long id = cv.getId();
		insertInputTags(id, cv.getInputTags());
		return 1L;
	}
	
	@RequestMapping(method = RequestMethod.PUT, value="/update" )
	public void updateCalcVariable(@RequestBody CalcVariable cv) {
		log.debug("Updating calc variable - "+cv.toString());
		cvs.updateCalcVariable(cv); 
		Long id = cv.getId();
		// delete & insert tags
		ts.deleteChildTags(id);
		insertInputTags(id, cv.getInputTags());
	}
	
	private void insertInputTags( Long id, Collection<Long> ct ) {
		// insert tags
		Iterator<Long> ict = ct.iterator();
		while( ict.hasNext() ) {
			Long cid = ict.next();
			RelTagTag rtt = new RelTagTag();
			rtt.setId(0L);
			rtt.setParentTagId(id);
			rtt.setChildTagId(cid);
			ts.insertRelationship(rtt);
		}		
	}

}
