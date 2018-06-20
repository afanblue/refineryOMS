package us.avn.oms.service;

import java.util.Collection;

import us.avn.oms.domain.Alarm;
import us.avn.oms.domain.AlarmMessage;
import us.avn.oms.domain.AlarmType;
import us.avn.oms.domain.Config;


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
