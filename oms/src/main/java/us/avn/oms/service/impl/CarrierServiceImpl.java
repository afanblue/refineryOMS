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

import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Collection;
import java.util.Iterator;
import java.util.Vector;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import us.avn.oms.domain.Carrier;
import us.avn.oms.domain.Hold;
import us.avn.oms.domain.RelTagTag;
import us.avn.oms.domain.Tag;
import us.avn.oms.mapper.CarrierMapper;
import us.avn.oms.mapper.CustomerMapper;
import us.avn.oms.mapper.TagMapper;
import us.avn.oms.service.CarrierService;

public class CarrierServiceImpl implements CarrierService {


	private CarrierMapper carrierMapper;
	private TagMapper tagMapper;
    private Logger log = LogManager.getLogger(this.getClass());

	
	public void setCarrierMapper( CarrierMapper vm ) {
		this.carrierMapper = vm;
	}
	
	public void setTagMapper( TagMapper tm ) {
		this.tagMapper = tm;
	}
	
	
	/**
	 * Get the collection of carrier records
	 * @return collection of carrier records (w/o their item data)
	 */
	@Override
	public Collection<Carrier> getAllCarriers( ) {
		Collection<Carrier> cc = carrierMapper.getAllCarriers( );
		return cc;
	}
	
	@Override
	public Carrier getCarrier( Long id) {
		Carrier c = carrierMapper.getCarrier(id);
		c.setHolds(this.getHolds(id));
		return c;
	}
	
	@Override
	public Collection<Carrier> getAllCarriersForProduct( String code ) {
		Collection<Carrier> cc = carrierMapper.getAllCarriersForProduct( code );
		Collection<Carrier> ck = new Vector<Carrier>(cc.size());
		Iterator<Carrier> icc = cc.iterator();
		while( icc.hasNext() ) {
			Carrier c = icc.next();
			c.setHolds(this.getHolds(c.getId()));
			ck.add(c);
		}
		return ck;
	}
	

	public Collection<Hold> getHolds( Long id ) {
		return carrierMapper.getHolds(id);
	}
	
	@Override
	public Long updateCarrier( Carrier c ) {
		tagMapper.updateTag(c);
		return c.getId();
	}

	@Override
	public Long insertCarrier( Carrier c ) {		
		Long id = tagMapper.insertTag(c);
		return id;
	}
	
	@Override
	public void updateHold( Hold h ) {
		carrierMapper.updateHold(h);
	}
	
	@Override
	public void insertHold( Hold h ) {
		carrierMapper.insertHold(h);
	}
	
	/**
	 * Get a Tag of type S (ship) which is not being used (i.e., is not currently
	 * docked) to use as a carrier for a crude order (remember: this is a simulation) 
	 * 
	 * @return carrier record
	 */
	@Override
	public Carrier getCrudeCarrier() {
		Carrier t = null;
		Iterator<Tag> it = tagMapper.getTagsByTypeRandom(Tag.SHIP).iterator();
		while( it.hasNext() ) {
			Tag xt = it.next();
			Collection<RelTagTag> crtt = tagMapper.getChildrenOfType(xt.getId(), Tag.DOCK);
			if( crtt.isEmpty() ) {
				t = new Carrier(xt);
				break;
			}
		}
		return t;
	}

	/**
	 * Get a Tag of either type T (train), or TT (tank truck) which is not
	 * being used (i.e., is not currently docked) to use as a carrier for a refined
	 * product carrier.
	 * <br>
	 * Ships are not currently being used
	 * @param carrierType carrier type (Train - T, TankTruck - TT)
	 * @param productType product (contents) code
	 * @param volRequired volume of material we need to ship.
	 * @return
	 */
	@Override
	public Carrier getProductCarrier( String carrierType, String productType, Double volRequired ) {
		Carrier t = null;
		if( carrierType.equals(Tag.TRAIN) ) {
			t = getTrain(productType, volRequired);
		} else {
			t = getTruck(productType);
		}
		return t;
	}
	
	/**
	 * Return a train for use as a carrier.  Create the train with a 
	 * maximum of 100 tank cars.
	 * @param productType product (contents) code
	 * @param volRequired amount of product needed to be shipped
	 * @return
	 */
	private Carrier getTrain( String productType, Double volRequired ) {
		String trainName = "TR".concat(DateTimeFormatter.ofPattern("yyyyMMdd").format(ZonedDateTime.now()));
		Carrier carrier = null;
		Tag t = tagMapper.getTagByName(trainName, Tag.TRAIN);
		if( t == null ) {
			t = new Tag(0L,trainName,Tag.TRAIN);
			t.setDescription(trainName+" for "+productType);
			t.setMisc(productType);
			t.setActive(Tag.ACTIVE);
			tagMapper.insertTag(t);
			Hold h = new Hold();
			h.setCarrierId(t.getId());
			Long noCars = 1 + Math.min(volRequired.longValue()/Carrier.TANK_CAR,100L);
			h.setHoldNo(1L);
			h.setVolume(new Double(Carrier.TANK_CAR));
			h.setNoDuplicates(noCars);
			carrierMapper.insertHold(h);
			carrier = new Carrier(t);
			Collection<Hold> holds = new Vector<Hold>();
			holds.add(h);
			carrier.setHolds(holds);
		}
		return carrier;
	}
	
	/**
	 * Get a truck for the specified product type. 
	 * @param productType
	 * @return
	 */
	private Carrier getTruck( String productType ) {
		Carrier carrier = null;
		Iterator<Tag> it = tagMapper.getTagsByTypeRandom(Tag.TANK_TRUCK).iterator();
		while( it.hasNext()) {
			Tag xt = it.next();
			if( xt.getMisc().equals(productType) ) {
				Collection<RelTagTag> crtt = tagMapper.getChildrenOfType(xt.getId(), Tag.DOCK);
				if( crtt.isEmpty() ) {
					carrier = new Carrier(xt);
					carrier.setHolds(carrierMapper.getHolds(xt.getId()));
					break;
				}
			}
		}
		return carrier;
	}



}