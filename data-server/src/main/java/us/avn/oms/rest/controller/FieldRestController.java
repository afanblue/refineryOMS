package us.avn.oms.rest.controller;

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

import us.avn.oms.domain.AIValue;
import us.avn.oms.domain.Field;
import us.avn.oms.domain.FieldObjects;
import us.avn.oms.domain.IdName;
import us.avn.oms.domain.RelTagTag;
import us.avn.oms.domain.Tag;
import us.avn.oms.domain.Taglet;
import us.avn.oms.domain.User;
import us.avn.oms.service.ConfigService;
import us.avn.oms.service.FieldService;
import us.avn.oms.service.TagService;

@RestController
@RequestMapping("/field")
public class FieldRestController {
	
    /* Get actual class name to be printed on */
    private Logger log = LogManager.getLogger(this.getClass().getName());
	
	@Autowired 
	FieldService fs;
	
	@Autowired
	ConfigService cs;
	
	@Autowired
	TagService ts;

	@RequestMapping(method = RequestMethod.GET, produces="application/json", value="/all")
	@ResponseBody
	public Collection<Field> getAllFields( ) {
		log.debug("getting all fields");
		return fs.getAllFields();
	}
	
	@RequestMapping(method = RequestMethod.GET, produces="application/json", value="/objects/{f}" )
	public FieldObjects getFieldObjectList( @PathVariable String f ) {
		FieldObjects fo = new FieldObjects();
		fo.setField(fs.getFieldByName(f));
		Collection<AIValue> ol = fs.getFieldObjects(f);
		fo.setTags(ol);
		fo.setSiteLocation(cs.getSiteLocation());
		return fo;
	}
	
	@RequestMapping(method = RequestMethod.GET, produces="application/json", value="/{id}")
	@ResponseBody
	public Field getField( @PathVariable Long id  ) {
		Field f = fs.getFieldDefinition(id);
		Collection<IdName> ttk = ts.getAllIdNamesByType(Tag.TANK);
		f.setTanks(ttk);
		f.setChildTanks(ts.getChildTags(id));
		return f;
	}
	
	@RequestMapping(method = RequestMethod.POST, value="/insert" )
	public Long insertField(@RequestBody Field f) {
		log.debug("Inserting field "+f.toString());
		fs.insertField(f);
		Long id = f.getId();
		// insert parent relationship
		RelTagTag rtt = new RelTagTag();
		rtt.setParentTagId(f.getParentId());
		rtt.setChildTagId(id);
		ts.insertRelationship(rtt);
		// insert tanks
		Iterator<RelTagTag> ict = f.getChildTanks().iterator();
		while( ict.hasNext() ) {
			RelTagTag ct = ict.next();
			ct.setParentTagId(id);
			ts.insertRelationship(ct);
		}
		return 1L;
	}
	
	@RequestMapping(method = RequestMethod.PUT, value="/update" )
	public void updateField(@RequestBody Field f) {
		log.debug("Updating field - "+f.toString());
		fs.updateField(f); 
		Long id = f.getId();
		// update parent relationship
		Collection<RelTagTag> crtt = ts.getParentTags(f.getId());
		for (RelTagTag rtt : crtt ) {
			if( ! rtt.getParentTagId().equals(f.getParentId()) ) {
				rtt.setParentTagId( f.getParentId() );
				ts.updateRelationship(rtt);
			}
		}
		// delete & insert tanks
		ts.deleteChildTags(id);
		Iterator<RelTagTag> ict = f.getChildTanks().iterator();
		while( ict.hasNext() ) {
			RelTagTag ct = ict.next();
			ct.setParentTagId(id);
			ts.insertRelationship(ct);
		}
	}

}
