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
