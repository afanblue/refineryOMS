package it.avn.oms.mapper;

import java.util.Collection;

import it.avn.oms.domain.Alarm;
import it.avn.oms.domain.AlarmMessage;
import it.avn.oms.domain.AlarmType;
import it.avn.oms.domain.Config;

public interface AlarmMapper {
	
	Collection<Alarm> getTagAlarms(Long id);

	Collection<Alarm> getAllAlarms( );

	Collection<Alarm> getAllActiveAlarms( );

	Collection<AlarmMessage> getAllAlarmMsgs();

	Collection<AlarmType> getAllAlarmTypes();

	Collection<Config> getAlarmColors();

	Collection<AlarmType> getAlarmTypes();

	AlarmType getAlarmType( Long id );
	
	AlarmMessage getAlarmMessage( Long id );
	
	void updateAlarm( Alarm alm );
	
	void updateAlarmMessage( AlarmMessage am );

	void updateAlarmType( AlarmType at );

	void insertAlarm( Alarm alm );

	void insertAlarmMessage( AlarmMessage am );

	void insertAlarmType( AlarmType at );

}
