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

import us.avn.oms.domain.Alarm;
import us.avn.oms.domain.AlarmMessage;
import us.avn.oms.domain.AlarmType;
import us.avn.oms.service.AlarmService;

@RestController

@RequestMapping("/alarm")
public class AlarmRestController {
	
    /* Get actual class name to be printed on */
    private Logger log = LogManager.getLogger(this.getClass().getName());

	@Autowired 
	AlarmService alarmService;

	@RequestMapping(method = RequestMethod.GET, produces="application/json", value="/all")
    @ResponseStatus(HttpStatus.OK)
	public Collection<Alarm> getAllAlarms( ) {
		log.debug("get all alarms");
		return alarmService.getAllAlarms();
	}
	
	@RequestMapping(method = RequestMethod.GET, produces="application/json", value="/active/all")
    @ResponseStatus(HttpStatus.OK)
	public Collection<Alarm> getAllActiveAlarms( ) {
		log.debug("get all active alarms");
		return alarmService.getAllActiveAlarms();
	}
	
	@RequestMapping(method = RequestMethod.GET, produces="application/json", value="/message/all")
    @ResponseStatus(HttpStatus.OK)
	public Collection<AlarmMessage> getAllAlarmMsgs( ) {
		log.debug("get all alarm messages");
		return alarmService.getAllAlarmMsgs();
	}
	
	@RequestMapping(method = RequestMethod.GET, produces="application/json", value="/type/all")
    @ResponseStatus(HttpStatus.OK)
	public Collection<AlarmType> getAllAlarmTypes( ) {
		log.debug("get all alarm types");
		return alarmService.getAllAlarmTypes();
	}
	
	
	@RequestMapping(method = RequestMethod.GET, produces="application/json", value="/message/{id}")
    @ResponseStatus(HttpStatus.OK)
	@ResponseBody
	public AlarmMessage getAlarmMessage( @PathVariable Long id) {
		return alarmService.getAlarmMessage(id);
	}

	@RequestMapping(method = RequestMethod.GET, produces="application/json", value="/type/{id}")
    @ResponseStatus(HttpStatus.OK)
	@ResponseBody
	public AlarmType getAlarmType( @PathVariable Long id) {
		return alarmService.getAlarmType(id);
	}
	
	@RequestMapping(method = RequestMethod.PUT, value="/message/update" )
    @ResponseStatus(HttpStatus.OK)
	public void updateAlarmMessage( @RequestBody AlarmMessage am) {
		alarmService.updateAlarmMessage(am);
	}
	
	@RequestMapping(method = RequestMethod.PUT, value="/acknowledge/{id}")
    @ResponseStatus(HttpStatus.OK)
	public Long updateAlarm( @PathVariable Long id ) {
		Alarm alm = new Alarm();
		alm.setId(id);
		alm.setAcknowledged("Y");
		alm.setActive("Y");
		alarmService.updateAlarm(alm);
		return 1L;
	}

	@RequestMapping(method = RequestMethod.PUT, value="/type/update" )
    @ResponseStatus(HttpStatus.OK)
	public void updateAlarmType( @RequestBody AlarmType at) {
		alarmService.updateAlarmType(at);
	}
	
	@RequestMapping(method = RequestMethod.POST, value="/message/insert" )
    @ResponseStatus(HttpStatus.CREATED)
	public void insertAlarmMessage( @RequestBody AlarmMessage am) {
		alarmService.insertAlarmMessage(am);
	}

	@RequestMapping(method = RequestMethod.POST, value="/type/insert" )
    @ResponseStatus(HttpStatus.CREATED)
	public void insertAlarmType( @RequestBody AlarmType at) {
		alarmService.insertAlarmType(at);
	}
	
}
