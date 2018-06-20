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
	public Collection<Alarm> getAllAlarms( ) {
		log.debug("get all alarms");
		return alarmService.getAllAlarms();
	}
	
	@RequestMapping(method = RequestMethod.GET, produces="application/json", value="/active/all")
	public Collection<Alarm> getAllActiveAlarms( ) {
		log.debug("get all active alarms");
		return alarmService.getAllActiveAlarms();
	}
	
	@RequestMapping(method = RequestMethod.GET, produces="application/json", value="/message/all")
	public Collection<AlarmMessage> getAllAlarmMsgs( ) {
		log.debug("get all alarm messages");
		return alarmService.getAllAlarmMsgs();
	}
	
	@RequestMapping(method = RequestMethod.GET, produces="application/json", value="/type/all")
	public Collection<AlarmType> getAllAlarmTypes( ) {
		log.debug("get all alarm types");
		return alarmService.getAllAlarmTypes();
	}
	
	
	@RequestMapping(method = RequestMethod.GET, produces="application/json", value="/message/{id}")
	@ResponseBody
	public AlarmMessage getAlarmMessage( @PathVariable Long id) {
		return alarmService.getAlarmMessage(id);
	}

	@RequestMapping(method = RequestMethod.GET, produces="application/json", value="/type/{id}")
	@ResponseBody
	public AlarmType getAlarmType( @PathVariable Long id) {
		return alarmService.getAlarmType(id);
	}
	
	@RequestMapping(method = RequestMethod.PUT, value="/message/update" )
	public void updateAlarmMessage( @RequestBody AlarmMessage am) {
		alarmService.updateAlarmMessage(am);
	}
	
	@RequestMapping(method = RequestMethod.PUT, value="/acknowledge/{id}")
	public Long updateAlarm( @PathVariable Long id ) {
		Alarm alm = new Alarm();
		alm.setId(id);
		alm.setAcknowledged("Y");
		alm.setActive("Y");
		alarmService.updateAlarm(alm);
		return 1L;
	}

	@RequestMapping(method = RequestMethod.PUT, value="/type/update" )
	public void updateAlarmType( @RequestBody AlarmType at) {
		alarmService.updateAlarmType(at);
	}
	
	@RequestMapping(method = RequestMethod.POST, value="/message/insert" )
	public void insertAlarmMessage( @RequestBody AlarmMessage am) {
		alarmService.insertAlarmMessage(am);
	}

	@RequestMapping(method = RequestMethod.POST, value="/type/insert" )
	public void insertAlarmType( @RequestBody AlarmType at) {
		alarmService.insertAlarmType(at);
	}
	
}
