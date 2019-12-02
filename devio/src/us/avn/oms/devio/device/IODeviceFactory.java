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
package us.avn.oms.devio.device;

import us.avn.oms.devio.device.simulator.Simulator;
import us.avn.oms.devio.device.ws.WS;
import us.avn.oms.domain.Device;
import us.avn.oms.service.AddressService;
import us.avn.oms.service.AnalogInputService;
import us.avn.oms.service.AnalogOutputService;
import us.avn.oms.service.ConfigService;
import us.avn.oms.service.ControlBlockService;
import us.avn.oms.service.DigitalInputService;
import us.avn.oms.service.DigitalOutputService;
import us.avn.oms.service.SimIOService;
import us.avn.oms.service.TagService;
import us.avn.oms.service.TankService;
import us.avn.oms.service.TransferService;
import us.avn.oms.service.WatchdogService;
import us.avn.oms.service.XferService;

public class IODeviceFactory {

	public IODeviceFactory() {
		// TODO Auto-generated constructor stub
	}

	public IODevice getIODevice( Device d, AddressService adrs
			, AnalogInputService ais, AnalogOutputService aos
			, ControlBlockService cbs, ConfigService cs
			, DigitalInputService dis, DigitalOutputService dos
			, SimIOService sios, TagService tgs
			, TankService tks, TransferService tfs, XferService xs ) 
	{
		if(d.getType() == null ) {
			return null;
		}	
		if(d.getType().equalsIgnoreCase("WS")){
			return new WS( d, adrs, ais, aos, cs, cbs, dis, dos, sios, tgs, tks, tfs, xs  );
		} else if(d.getType().equalsIgnoreCase("SIM")){
			return new Simulator( d, adrs, ais, aos, cs, cbs, dis, dos, sios, tgs, tks, tfs, xs );
		}
		return null;
	}


}
