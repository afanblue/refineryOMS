package it.avn.oms.service;

import java.util.Collection;

import it.avn.oms.domain.Alarm;
import it.avn.oms.domain.AlarmMessage;
import it.avn.oms.domain.AlarmType;
import it.avn.oms.domain.Config;


public interface AlarmService {
	
	public Collection<Alarm> getTagAlarms( Long id);

	public Collection<Alarm> getAllAlarms( );
	
	public Collection<Alarm> getAllActiveAlarms( );
	
	public Collection<AlarmMessage> getAllAlarmMsgs( );
	
	public Collection<AlarmType> getAllAlarmTypes( );

	public Collection<AlarmType> getAlarmTypes();
	
	Collection<Config> getAlarmColors();
	
	public AlarmMessage getAlarmMessage( Long id);
	
	void updateAlarm( Alarm alm  );

	void updateAlarmMessage( AlarmMessage am  );

	void insertAlarmMessage( AlarmMessage am );

	public AlarmType getAlarmType( Long id);
	
	void updateAlarmType( AlarmType at  );

	void insertAlarm( Alarm alm );

	void insertAlarmType( AlarmType at );

}
