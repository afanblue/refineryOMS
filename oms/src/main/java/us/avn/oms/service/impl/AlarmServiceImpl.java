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
package us.avn.oms.service.impl;

import java.util.Collection;

//import org.springframework.beans.factory.annotation.Autowired;

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
		return am;
	}
	
	@Override
	public AlarmType getAlarmType( Long id ) {
		AlarmType at = alarmMapper.getAlarmType(id);
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