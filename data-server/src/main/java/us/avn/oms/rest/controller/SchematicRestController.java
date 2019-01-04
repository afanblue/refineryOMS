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
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.Vector;

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

import us.avn.oms.domain.ChildValue;
import us.avn.oms.domain.IdName;
import us.avn.oms.domain.RelTagTag;
import us.avn.oms.domain.Schematic;
import us.avn.oms.domain.Tag;
import us.avn.oms.domain.TagType;
import us.avn.oms.domain.Transfer;
import us.avn.oms.domain.Vertex;
import us.avn.oms.service.ConfigService;
import us.avn.oms.service.TagService;
import us.avn.oms.service.TransferService;
import us.avn.oms.service.VertexService;

@RestController

@RequestMapping("/schematic")
public class SchematicRestController {
	
    /* Get actual class name to be printed on */
    private Logger log = LogManager.getLogger(this.getClass().getName());
    
	static Double HEIGHT = 480D;    // shouldn't be defined this way
	static Double WIDTH = 640D;		// see note on computeCoordinates

	@Autowired 
	ConfigService cfgService;
	
	@Autowired
	TagService tagService;
	
	@Autowired
	VertexService vtxService;
	
	@Autowired
	TransferService xferService;

	@RequestMapping(method = RequestMethod.GET, produces="application/json", value="/all")
    @ResponseStatus(HttpStatus.OK)
	public Collection<IdName> getAllSchematics( ) {
		log.debug("get all schematics");
		Collection<IdName> cscm = tagService.getAllIdNamesByType("SCM");
		Iterator<Transfer> cxfer = xferService.getActiveTransfers().iterator();
		while( cxfer.hasNext() ) {
			Transfer x = cxfer.next();
			IdName idn = new IdName(-x.getId(),x.getName());
			cscm.add(idn);
		}
		return cscm;
	}
	
	@RequestMapping(method = RequestMethod.GET, produces="application/json", value="/objTypeList")
    @ResponseStatus(HttpStatus.OK)
	public Collection<TagType> getSchematicObjectTypes( ) {
		log.debug("get all schematic object types");
		return tagService.getSchematicObjectTypes();
	}
	
	@RequestMapping(method = RequestMethod.GET, produces="application/json", value="/{id}")
	@ResponseBody
    @ResponseStatus(HttpStatus.OK)
	public Schematic getSchematic( @PathVariable Long id) {
		log.debug("getSchematic (w/id) "+id);
		Schematic scm = new Schematic(0L, "New schematic");
		Tag site = cfgService.getSiteLocation();
		if( id >= 0 ) {
			if( 0L != id ) {
				Tag t = tagService.getTag(id);
				scm = new Schematic(t);
				Collection<ChildValue> ccv = tagService.getSCMChildValues(id);
				Collection<ChildValue> vcv = addVerticesToSCObjs(ccv);
				scm.setChildTags(vcv);
//				scm.setChildTags(ccv);
			}
		} else {
			Transfer x = xferService.getTransfer(-id);
			scm = new Schematic(id, x.getName());
			Collection<ChildValue> csco = buildChildTags(x,site);
			Collection<ChildValue> vsco = fixSchematicObjects(csco,site);
			scm.setChildTags(vsco);
		}
		return scm;
	}	
	
	@RequestMapping(method = RequestMethod.GET, produces="application/json", value="/name/{nm}")
	@ResponseBody
    @ResponseStatus(HttpStatus.OK)
	public Schematic getSchematicByName( @PathVariable String nm) {
		log.debug("getSchematicByName: "+nm);
		Tag t = tagService.getTagByName(nm, "SCM");
		Schematic scm;
		if( null == t ) {
			scm = new Schematic(0L, "New schematic");
		} else {
			scm = new Schematic(t);
			Tag site = cfgService.getSiteLocation();
			Collection<ChildValue> csco = tagService.getSCMChildValues(t.getId());
			Collection<ChildValue> vsco = addVerticesToSCObjs(csco);
			scm.setChildTags(vsco);
//			scm.setChildTags(csco);
		}
		return scm;
	}
	
	@RequestMapping(method = RequestMethod.PUT, value= "/update")
    @ResponseStatus(HttpStatus.OK)
	public void updateSchematic( @RequestBody Schematic scm ) {
		log.debug("updateSchematic "+scm.toString());
		tagService.updateTag( scm );
		Collection<ChildValue> ccv = scm.getChildTags();
		updateRelationships(ccv);
	}

	@RequestMapping(method = RequestMethod.DELETE, value = "/delete/children/{id}")
    @ResponseStatus(HttpStatus.OK)
	public void deleteChildren( @PathVariable Long id ) {
		tagService.deleteChildTags(id);
	}
	
	@RequestMapping(method = RequestMethod.PUT, value= "/update/child")
    @ResponseStatus(HttpStatus.OK)
	public void updateRelationship( @RequestBody RelTagTag rtt ) {
		log.debug("updateRelationship: "+rtt);
		if( (new Long(0L).equals(rtt.getId()) ) ) {
			tagService.insertRelationship(rtt);
		} else {
			tagService.updateRelationship(rtt);
		}
	}

	@RequestMapping(method = RequestMethod.PUT, value= "/update/children")
    @ResponseStatus(HttpStatus.OK)
	public void updateRelationships( @RequestBody Collection<ChildValue> ccv ) {
		Iterator<ChildValue> iccv = ccv.iterator();
		while( iccv.hasNext() ) {
			ChildValue cv = iccv.next();
			log.debug("update ChildValue "+cv.toString());
			Long id = cv.getId();
			if( (new Long(0L)).equals(cv.getId()) ) {
				id = tagService.insertTag(cv);
				cv.setId(id);
			} else {
				tagService.updateTag(cv);
			}
			RelTagTag rtt = new RelTagTag(cv.getRelTagId(), cv.getParentId(), cv.getId());
			log.debug("update SCM & SCO relationship "+rtt.toString());
			updateRelationship(rtt);
			RelTagTag rti = new RelTagTag( cv.getInpRelTagId(), cv.getId(), cv.getInpTagId());
			log.debug("update SCO and input tag relationship "+rti.toString());
			updateRelationship(rti);
			Long outTagId = cv.getOutTagId()==null?0L:cv.getOutTagId();
			if( 0L != outTagId ) {
				RelTagTag rto = new RelTagTag( cv.getOutRelTagId(), cv.getId(), outTagId );
				log.debug("update SCO and output tag relationship "+rto.toString());
				updateRelationship(rto);
			}
			if( "P".equals(cv.getMisc()) ) {
				vtxService.updateVertices( id, cv.getVtxList() );
			}
		}
	}

	@RequestMapping(method = RequestMethod.POST, produces="application/json", value= "/insert")
	@ResponseBody
    @ResponseStatus(HttpStatus.CREATED)
	public void insertSchematic( @RequestBody Schematic scm ) {
		log.debug("insertSchematic "+scm.toString());
		Long id = tagService.insertTag(scm);
		Collection<ChildValue> ccv = scm.getChildTags();
		// Add the ID for the parent we just created 
		Iterator<ChildValue> iccv = ccv.iterator();
		while( iccv.hasNext() ) {
			ChildValue cv = iccv.next();
			cv.setParentId(id);
		}
		insertRelationships(ccv);
	}
	
	@RequestMapping(method = RequestMethod.POST, value= "/insert/children")
    @ResponseStatus(HttpStatus.CREATED)
	public void insertRelationships( @RequestBody Collection<ChildValue> ccv ) {
		Iterator<ChildValue> iccv = ccv.iterator();
		while( iccv.hasNext() ) {
			ChildValue cv = iccv.next();
			log.debug("insert SCM & SCO Relationship: "+cv.toString());
			Long id = tagService.insertTag(cv);
			RelTagTag rtt = new RelTagTag(0L, cv.getParentId(), id);
			tagService.insertRelationship(rtt);
			RelTagTag rti = new RelTagTag(0L, id, cv.getInpTagId());
			log.debug("insert SCO & input tag relationship "+rti.toString());
			tagService.insertRelationship(rti);
			if( null != cv.getOutTagId()) {
				RelTagTag rto = new RelTagTag(0L, id, cv.getOutTagId());
				log.debug("insert SCO & output tag relationship "+rto.toString());
				tagService.insertRelationship(rto);
			}
			if( "P".equals(cv.getMisc()) ) {
				vtxService.updateVertices( id, cv.getVtxList() );
			}
		}
	}
	
	/**
	 * Method: buildChildTags
	 * Description: Create the schematic's child tags for a transfer. 
	 * @param scm
	 * @return Collection<ChildValue> 
	 * 
	 */		
	private Collection<ChildValue> buildChildTags( Transfer x, Tag site ) {
		Collection<ChildValue> cvn = new Vector<ChildValue>();
		Collection<ChildValue> cvo = new Vector<ChildValue>();
		
		cvn.addAll(tagService.getTransferTankLevelChild(x.getSourceId()));
//		cvn.addAll(tagService.getTransferSensorValues(x.getSourceId(), "OUT"));
		cvn.addAll(tagService.getTransferChildValues(x.getSourceId(), "OUTL"));
		
		cvn.addAll(tagService.getTransferTankLevelChild(x.getDestinationId()));
//		cvn.addAll(tagService.getTransferSensorValues(x.getDestinationId(), "IN"));
		cvn.addAll(tagService.getTransferChildValues(x.getDestinationId(), "INL"));
		
		Iterator<ChildValue> icvn = cvn.iterator();
		while( icvn.hasNext() ) {
			ChildValue cv = icvn.next();
			cv.setMisc(cv.getTagTypeCode());
			cv.setTagTypeCode("SCO");
			Map<String,Double> cc = computeCoordinates( cv, site );
			cv.setC1Long(cc.get("x1"));
			cv.setC1Lat (cc.get("y1"));
			cv.setC2Long(cc.get("x2"));
			cv.setC2Lat (cc.get("y2"));
			
			cvo.add(cv);
		}
		return cvo;
	}
	
	/**
	 * Method: computeCoordinates
	 * Description: convert a tag's corner latitude (y)/longitude (x) to zero-based
	 *        pixels for the site.
	 * @param t - tag to locate (c1Lat, c1Long, c2Lat and c2Long used)
	 * @param site - tag specifying site
	 * @return Map<String,Integer> -> [("x",#x pixels), ("y",#y pixels)]
	 * Notes: 1. This is terrible, but i assume here the dimensions of the image 
	 *           (height=480, width=640) which is defined in the Parameters.js
	 *           of the UI.  I'll have to think about a good way to share those
	 *           values.  This isn't it.
	 *        2. trivial point: we assume a small enough section that Euclidean
	 *           geometry is applicable.
	 */
	private Map<String, Double> computeCoordinates(ChildValue t, Tag site) {
		Map<String,Double> cc = new HashMap<String,Double>();
		Double xFactor = WIDTH/(site.getC1Long()-site.getC2Long());
		Double yFactor = HEIGHT/(site.getC1Lat()-site.getC2Lat());
		Double x = new Double( Math.round((site.getC1Long()-t.getC1Long())*xFactor) );
		Double y = new Double( Math.round((site.getC1Lat() -t.getC1Lat()) *yFactor) );
		cc.put("x1",x);
		cc.put("y1",y);
		x = new Double( Math.round((site.getC1Long()-t.getC2Long())*xFactor) );
		y = new Double( Math.round((site.getC1Lat() -t.getC2Lat()) *yFactor) );
		cc.put("x2",x);
		cc.put("y2",y);
		return cc;
	}
	
	/**
	 * Method: fixSchematicObjects
	 * Description: 
	 * @param ccv
	 * @return
	 */
	private Collection<ChildValue> fixSchematicObjects( Collection<ChildValue> ccv, Tag site ) {
		Double xFactor = WIDTH/(site.getC1Long()-site.getC2Long());
		Double yFactor = HEIGHT/(site.getC1Lat()-site.getC2Lat());
		Vector<ChildValue> vsco = new Vector<ChildValue>();
		Iterator<ChildValue> isco = ccv.iterator();
		while( isco.hasNext() ) {
			ChildValue cv = isco.next();
			if( "P".equals(cv.getMisc()) ) {
				Iterator<Vertex> iav = vtxService.getAllVertices(cv.getId()).iterator();
				Vector<Vertex> vv = new Vector<Vertex>();
				while( iav.hasNext() ) {
					Vertex v = iav.next();
					Double px = new Double( Math.round((site.getC1Long()-v.getLongitude())*xFactor) );
					Double py = new Double( Math.round((site.getC1Lat() -v.getLatitude()) *yFactor) );
					v.setLongitude(px);
					v.setLatitude(py);
					vv.add(v);
				}
				cv.setVtxList(vv);
			}
			vsco.add(cv);
		}
		return vsco;
	}

	private Collection<ChildValue> addVerticesToSCObjs( Collection<ChildValue> ccv ) {
		Vector<ChildValue> vsco = new Vector<ChildValue>();
		Iterator<ChildValue> isco = ccv.iterator();
		while( isco.hasNext() ) {
			ChildValue cv = isco.next();
			Collection<Vertex> cav = vtxService.getAllVertices(cv.getId());
			cv.setVtxList(cav);
			vsco.add(cv);
		}
		return vsco;
	}

}
