package it.avn.oms.service.impl;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;

import it.avn.oms.domain.AIValue;
import it.avn.oms.domain.ReferenceCode;
//import it.avn.oms.domain.Tag;
import it.avn.oms.domain.Tank;
import it.avn.oms.domain.Volume;
import it.avn.oms.mapper.TankMapper;
import it.avn.oms.mapper.AnalogInputMapper;
import it.avn.oms.mapper.ConfigMapper;
import it.avn.oms.mapper.TagMapper;
//import it.avn.oms.mapper.TagMapper;
import it.avn.oms.service.TankService;

public class TankServiceImpl implements TankService {


	private AnalogInputMapper aiMapper;
	private ConfigMapper configMapper;
	private TagMapper tagMapper;
	private TankMapper tankMapper;
	
	public void setAnalogInputMapper( AnalogInputMapper aim ) {
		this.aiMapper = aim;
	}
	
	public void setConfigMapper( ConfigMapper cm ) {
		this.configMapper = cm;
	}
	
	public void setTagMapper( TagMapper tm ) {
		this.tagMapper = tm;
	}
	
	public void setTankMapper( TankMapper tm ) {
		this.tankMapper = tm;
	}
	
	/* ************************************************ */

	@Override
	public Collection<Tank> getAllTanks( ) {
		return tankMapper.getAllTanks();
	}
	
	@Override
	public Collection<Tank> getAllTanksInField( Long id ) {
		return tankMapper.getAllTanksInField( id );
	}
	
	@Override
	public Collection<AIValue> getTankVolumesForUnit( String n) {
		return tankMapper.getTankVolumesForUnit(n);
	}
	
	@Override
	public Collection<Volume> getLevelVolumesForTank(Long id) {
		return tankMapper.getLevelVolumesForTank(id);
	}
	
	@Override
	public Tank getBaseTank( Long id ) {
		Tank t = tankMapper.getTank(id);
		if( t == null ) {
			t = new Tank();
			t.setTag(tagMapper.getTag(id));
		}
		return t;
	}
	
	@Override
	public Tank getTank( Long id) {
		Tank t = tankMapper.getTank(id);
		if( t == null ) {
			t = new Tank(0L,"New Tank");
		}
		t.setTemperatures(aiMapper.getAllAIIdNameByType("T"));
		t.setLevels(aiMapper.getAllAIIdNameByType("L"));
		t.setContentTypes(tankMapper.getAllContentTypes());
		t.setSiteLocation(configMapper.getSiteLocation());
		return t;
	}
	
	@Override
	public void updateTank( Tank tk ) {
		tankMapper.updateTank( tk );
	}

	@Override
	public void insertTank( Tank tk ) {
		tankMapper.insertTank(tk);
	}

	@Override
	public Collection<ReferenceCode> getAllContentTypes() {
		return tankMapper.getAllContentTypes();
	}

}