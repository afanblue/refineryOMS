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

import us.avn.oms.domain.Device;
import us.avn.oms.service.AddressService;
import us.avn.oms.service.AnalogInputService;
import us.avn.oms.service.AnalogOutputService;
import us.avn.oms.service.ConfigService;
import us.avn.oms.service.ControlBlockService;
import us.avn.oms.service.DigitalInputService;
import us.avn.oms.service.DigitalOutputService;
import us.avn.oms.service.OrderService;
import us.avn.oms.service.SimIOService;
import us.avn.oms.service.TagService;
import us.avn.oms.service.TankService;
import us.avn.oms.service.TransferService;
import us.avn.oms.service.WatchdogService;
import us.avn.oms.service.XferService;

/**
 *	This is the abstract class for defining IODevices for processing their inputs.
 *
 *	The current (2019-11-06) thinking is that this will be used for polling devices
 *	to retrieve their values.  I need to think about how to implement exception-based
 *	devices.
 *
 *	@author	AVN  2019-11-06
 *
 */
public abstract class IODevice {

	protected Device device;
	protected AddressService adrs;
	protected AnalogInputService ais;
	protected AnalogOutputService aos;
	protected ConfigService cs;
	protected ControlBlockService cbs;
	protected DigitalInputService dis;
	protected DigitalOutputService dos;
	protected OrderService ords;
	protected TagService tgs;
	protected TankService tks;
	protected TransferService tfs;
	protected XferService xs;
	
	public IODevice() {
		// TODO Auto-generated constructor stub
	}
	
	public IODevice( Device d, AddressService adrs, AnalogInputService ais
			, AnalogOutputService aos, ConfigService cs, ControlBlockService cbs
			, DigitalInputService dis, DigitalOutputService dos
			, OrderService ords, TagService tgs
			, TankService tks, TransferService tfs, XferService xs )
	{
		this.device = d;
		this.adrs = adrs;
		this.ais = ais;
		this.aos = aos;
		this.cs = cs;
		this.cbs = cbs;
		this.dis = dis;
		this.dos = dos;
		this.ords = ords;
		this.tgs = tgs;
		this.tks = tks;
		this.tfs = tfs;
		this.xs = xs;
	}

	public Device getDevice() {
		return device;
	}

	public void setType(Device d) {
		this.device = d;
	}


	public AddressService getAdrs() {
		return adrs;
	}

	public void setAdrs(AddressService adrs) {
		this.adrs = adrs;
	}

	
	public AnalogInputService getAis() {
		return ais;
	}

	public void setAis(AnalogInputService ais) {
		this.ais = ais;
	}

	
	public AnalogOutputService getAos() {
		return aos;
	}

	public void setAos(AnalogOutputService aos) {
		this.aos = aos;
	}

	
	public ConfigService getCs() {
		return cs;
	}

	public void setCs(ConfigService cs) {
		this.cs = cs;
	}
	

	public ControlBlockService getCbs() {
		return cbs;
	}

	public void setCbs(ControlBlockService cbs) {
		this.cbs = cbs;
	}
	

	public DigitalInputService getDis() {
		return dis;
	}

	public void setDis(DigitalInputService dis) {
		this.dis = dis;
	}

	
	public DigitalOutputService getDos() {
		return dos;
	}

	public void setDos(DigitalOutputService dos) {
		this.dos = dos;
	}

	
	public OrderService getOrds() {
		return ords;
	}

	public void setOrds(OrderService os) {
		this.ords = os;
	}
	

	public TagService getTgs() {
		return tgs;
	}

	public void setTgs(TagService tgs) {
		this.tgs = tgs;
	}

	
	public XferService getXs() {
		return xs;
	}

	public void setXs(XferService xs) {
		this.xs = xs;
	}

	public abstract void getAnalogInputs( Integer sec );
	
	public abstract void setAnalogOutputs( Integer sec );
	
	public abstract void getDigitalInputs( Integer sec );
	
	public abstract void setDigitalOutputs( Integer sec );
	
}
