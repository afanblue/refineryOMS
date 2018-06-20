package us.avn.oms.service.impl;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;

import us.avn.oms.domain.Alarm;
import us.avn.oms.domain.AlarmMessage;
import us.avn.oms.domain.AlarmType;
import us.avn.oms.domain.Config;
import us.avn.oms.mapper.AlarmMapper;
import us.avn.oms.service.AlarmService;

public class AlarmServiceImpl implements AlarmService {


	private AlarmMapper alarmMapper;
	
	public void setAlarmMapper( AlarmMapper am ) {
		this.alarmMapper = am;
	}
	
	@Override
	public Collection<Alarm> getAllAlarms( ) {
		return alarmMapper.getAllAlarms();
	}

	@Override
	public Collection<Alarm> getTagAlarms( Long id ) {
		return alarmMapper.getTagAlarms(id);
	}

	@Override
	public Collection<Alarm> getAllActiveAlarms( ) {
		return alarmMapper.getAllActiveAlarms();
	}

	public Collection<AlarmMessage> getAllAlarmMsgs( ) {
		return alarmMapper.getAllAlarmMsgs();
	}
	
	public Collection<AlarmType> getAllAlarmTypes( ) {
		return alarmMapper.getAllAlarmTypes();
	}

	@Override
	public Collection<AlarmType> getAlarmTypes() {
		return alarmMapper.getAlarmTypes();
	}
	@Override
	public AlarmMessage getAlarmMessage( Long id ) {
		AlarmMessage am = alarmMapper.getAlarmMessage(id);
		am.setMsgTypes(alarmMapper.getAllAlarmTypes());
		return am;
	}
	
	@Override
	public AlarmType getAlarmType( Long id ) {
		AlarmType at = alarmMapper.getAlarmType(id);
		at.setAlarmMessages(alarmMapper.getAllAlarmMsgs());
		return at;
	}

	@Override
	public Collection<Config> getAlarmColors() {
		return alarmMapper.getAlarmColors();
	}
	
	@Override
	public void updateAlarm( Alarm alm ) {
		alarmMapper.updateAlarm( alm );
	}

	@Override
	public void updateAlarmMessage( AlarmMessage am ) {
		alarmMapper.updateAlarmMessage( am );
	}

	@Override
	public void updateAlarmType( AlarmType at ) {
		alarmMapper.updateAlarmType( at );
	}

	@Override
	public void insertAlarm( Alarm alm ) {
		alarmMapper.insertAlarm( alm );
	}

	@Override
	public void insertAlarmMessage( AlarmMessage am ) {
		alarmMapper.insertAlarmMessage( am );
	}

	@Override
	public void insertAlarmType( AlarmType at ) {
		alarmMapper.insertAlarmType( at );
	}

}