package us.avn.oms.mapper;

import java.util.Collection;

import us.avn.oms.domain.Alarm;
import us.avn.oms.domain.AlarmMessage;
import us.avn.oms.domain.AlarmType;
import us.avn.oms.domain.Config;

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
