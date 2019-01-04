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

import us.avn.oms.domain.Unit;
import us.avn.oms.domain.UnitConversion;
import us.avn.oms.domain.UnitType;
import us.avn.oms.service.UnitService;

@RestController
@RequestMapping("/unit")
public class UnitRestController {
	
    /* Get actual class name to be printed on */
    private Logger log = LogManager.getLogger(this.getClass().getName());
	
	
	@Autowired 
	private UnitService unitService;
		

	@RequestMapping(method = RequestMethod.GET, produces="application/json", value="/all")
	@ResponseBody
    @ResponseStatus(HttpStatus.OK)
	public Collection<Unit> getAllUnits( ) {
		log.debug("getting all units");
		return unitService.getAllUnits();
	}

	@RequestMapping(method = RequestMethod.GET, produces="application/json", value="/{id}")
	@ResponseBody
    @ResponseStatus(HttpStatus.OK)
	public Unit getUnitById( @PathVariable Long id ) {
		log.debug("getting unit by ID "+id);
		Unit u = new Unit();
		if( id != 0 ) {
			u = unitService.getUnit(id);
		} else {
			u = new Unit(0L,"");
		}
		return u;
	}
	
	@RequestMapping(method = RequestMethod.POST, value="/insert" )
    @ResponseStatus(HttpStatus.CREATED)
	public void insertUnit(@RequestBody Unit u) {
		log.debug("Inserting unit "+u.toString());
		unitService.insertUnit(u);
	}
	
	@RequestMapping(method = RequestMethod.PUT, value="/update" )
    @ResponseStatus(HttpStatus.OK)
	public void updateUnit(@RequestBody Unit u) {
	   log.debug("Updating unit - "+u.toString());
	   unitService.updateUnit(u);
	}
	
/*  Unit Type */

	@RequestMapping(method = RequestMethod.GET, produces="application/json", value="/type/all")
	@ResponseBody
    @ResponseStatus(HttpStatus.OK)
	public Collection<UnitType> getAllUnitTypes( ) {
		log.debug("getting all units");
		return unitService.getAllUnitTypes();
	}

	@RequestMapping(method = RequestMethod.GET, produces="application/json", value="/type/{id}")
	@ResponseBody
    @ResponseStatus(HttpStatus.OK)
	public UnitType getUnitTypeById( @PathVariable Long id ) {
		log.debug("getting unit by ID "+id);
		UnitType ut = new UnitType();
		if( id != 0 ) {
			ut = unitService.getUnitType(id);
		} else {
			ut = new UnitType(0L,"");
		}
		return ut;
	}
	
	@RequestMapping(method = RequestMethod.POST, value="/type/insert" )
    @ResponseStatus(HttpStatus.CREATED)
	public void insertUnitType(@RequestBody UnitType ut) {
		log.debug("Inserting unit "+ut.toString());
		unitService.insertUnitType(ut);
	}
	
	@RequestMapping(method = RequestMethod.PUT, value="/type/update" )
    @ResponseStatus(HttpStatus.OK)
	public void updateUnit(@RequestBody UnitType ut) {
	   log.debug("Updating unit - "+ut.toString());
	   unitService.updateUnitType(ut);
	}

/*  Unit Conversion */
	
	@RequestMapping(method = RequestMethod.GET, produces="application/json", value="/conversion/all")
	@ResponseBody
    @ResponseStatus(HttpStatus.OK)
	public Collection<UnitConversion> getAllUnitConversions( ) {
		log.debug("getting all units");
		return unitService.getAllUnitConversions();
	}

	@RequestMapping(method = RequestMethod.GET, produces="application/json", value="/conversion/{id}")
	@ResponseBody
    @ResponseStatus(HttpStatus.OK)
	public UnitConversion getUnitConversionById( @PathVariable Long id ) {
		log.debug("getting unit by ID "+id);
		UnitConversion uc = new UnitConversion();
		if( id != 0 ) {
			uc = unitService.getUnitConversion(id);
		} else {
			uc = new UnitConversion(0L);
		}
		return uc;
	}
	
	@RequestMapping(method = RequestMethod.POST, value="/conversion/insert" )
    @ResponseStatus(HttpStatus.CREATED)
	public void insertUnitConversion(@RequestBody UnitConversion uc) {
		log.debug("Inserting unit "+uc.toString());
		unitService.insertUnitConversion(uc);
	}
	
	@RequestMapping(method = RequestMethod.PUT, value="/conversion/update" )
    @ResponseStatus(HttpStatus.OK)
	public void updateUnitConversion(@RequestBody UnitConversion uc) {
	   log.debug("Updating unit conversion - "+uc.toString());
	   unitService.updateUnitConversion(uc);
	}

}
