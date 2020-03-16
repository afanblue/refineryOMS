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
package us.avn.oms.devio;

import java.util.Calendar;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.TimerTask;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import us.avn.oms.devio.device.IODevice;
import us.avn.oms.devio.device.IODeviceFactory;
import us.avn.oms.domain.Device;
import us.avn.oms.domain.Watchdog;
import us.avn.oms.service.AddressService;
import us.avn.oms.service.AnalogInputService;
import us.avn.oms.service.AnalogOutputService;
import us.avn.oms.service.ConfigService;
import us.avn.oms.service.ControlBlockService;
import us.avn.oms.service.DeviceService;
import us.avn.oms.service.DigitalInputService;
import us.avn.oms.service.DigitalOutputService;
import us.avn.oms.service.OrderService;
import us.avn.oms.service.SimIOService;
import us.avn.oms.service.TagService;
import us.avn.oms.service.TankService;
import us.avn.oms.service.TransferService;
import us.avn.oms.service.WatchdogService;
import us.avn.oms.service.RawDataService;

public class DeviceScanner extends TimerTask {
	
    /* Get actual class name to be printed on */
    private Logger log = LogManager.getLogger(this.getClass());

	private HashMap<Long,IODevice> iodevs = new HashMap<Long,IODevice>();

    private ApplicationContext context = null;
    private AddressService adrs = null;
    private AnalogInputService ais = null;
    private AnalogOutputService aos = null;
    private ControlBlockService cbs = null;
    private ConfigService cs = null;
    private DeviceService devs = null;
    private DigitalInputService dis = null;
    private DigitalOutputService dos = null;
    private OrderService ords = null;
    private RawDataService rds = null;
    private TagService tgs = null;
    private TankService tks = null;
    private TransferService tfs = null;
    private WatchdogService wds = null;
     
	public void run( ) {

/*  */
		if( context == null) { context = new ClassPathXmlApplicationContext("app-context.xml"); }
		if( adrs == null ) { adrs = (AddressService) context.getBean("addressService"); }
		if( ais  == null ) { ais  = (AnalogInputService) context.getBean("analogInputService"); }
		if( aos  == null ) { aos  = (AnalogOutputService) context.getBean("analogOutputService"); }
		if( cs   == null ) { cs   = (ConfigService) context.getBean("configService"); }
		if( devs == null ) { devs = (DeviceService) context.getBean("deviceService"); }
		if( dis  == null ) { dis  = (DigitalInputService) context.getBean("digitalInputService"); }
		if( dos  == null ) { dos  = (DigitalOutputService) context.getBean("digitalOutputService"); }
		if( ords == null ) { ords = (OrderService) context.getBean("orderService"); }
		if( tgs  == null ) { tgs  = (TagService) context.getBean("tagService"); }
		if( tks  == null ) { tks  = (TankService) context.getBean("tankService"); }
		if( tfs  == null ) { tfs  = (TransferService) context.getBean("transferService"); }
		if( rds  == null ) { rds  = (RawDataService) context.getBean("rawDataService"); }
		if( wds  == null ) { wds  = (WatchdogService) context.getBean("watchdogService"); }
		
		Calendar now = Calendar.getInstance();
		Integer sec = now.get(Calendar.MINUTE)*60+now.get(Calendar.SECOND); 

		Iterator<Device> idev = devs.getAllActiveDevices(sec).iterator();
	    IODeviceFactory iodf = new IODeviceFactory();
		while( idev.hasNext() ) {
			Device d = idev.next();
	        IODevice iodev = iodf.getIODevice(d, adrs, ais, aos, cbs, cs, dis, dos, ords, rds, tgs, tks, tfs);
	        iodevs.put(d.getSeqNo(), iodev);
		}
		
		wds.updateWatchdog(Watchdog.DCAO);
//		process the outputs
		for( Map.Entry<Long, IODevice> entry : iodevs.entrySet()) {
			IODevice dev = entry.getValue();
			Device d = dev.getDevice();
	    	log.debug("Start outputs for "+d.getType()+"/"+d.getModel());
	    	dev.setAnalogOutputs(sec);
	    	dev.setDigitalOutputs(sec);			
	    	log.debug("End outputs for "+d.getType()+"/"+d.getModel());
		}
		wds.updateWatchdog(Watchdog.DCAI);
		for( Map.Entry<Long, IODevice> entry : iodevs.entrySet()) {
			IODevice dev = entry.getValue();
			Device d = dev.getDevice();
	    	log.debug("Start inputs for "+d.getType()+"/"+d.getModel());
	    	dev.getAnalogInputs(sec);
	    	dev.getDigitalInputs(sec);			
	    	log.debug("End inputs for "+d.getType()+"/"+d.getModel());
		}
	}
	
}
