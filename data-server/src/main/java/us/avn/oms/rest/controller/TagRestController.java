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

import us.avn.oms.domain.Tag;
import us.avn.oms.service.TagService;

@RestController

@RequestMapping("/tag")
public class TagRestController {
	
    /* Get actual class name to be printed on */
    private Logger log = LogManager.getLogger(this.getClass().getName());

	@Autowired 
	TagService tagService;

	@RequestMapping(method = RequestMethod.GET, produces="application/json", value="/type/{type}")
	public Collection<Tag> getAllTagsByType( @PathVariable String type ) {
		log.debug("get all tags");
		return tagService.getAllTagsByType(type.toUpperCase());
	}
	
	@RequestMapping(method = RequestMethod.GET, produces="application/json", value="/{id}")
	@ResponseBody
	public Tag getTag( @PathVariable Long id) {
		log.debug("get tag w/id "+id);
		return tagService.getTag(id);
	}

}
