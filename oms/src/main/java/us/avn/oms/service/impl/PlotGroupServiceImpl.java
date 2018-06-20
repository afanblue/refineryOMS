package us.avn.oms.service.impl;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;

import us.avn.oms.domain.IdName;
import us.avn.oms.domain.PlotGroup;
import us.avn.oms.mapper.PlotGroupMapper;
import us.avn.oms.service.PlotGroupService;

public class PlotGroupServiceImpl implements PlotGroupService {


	private PlotGroupMapper pgMapper;
	
	public void setPlotGroupMapper( PlotGroupMapper rm ) {
		this.pgMapper = rm;
	}


	@Override
	public PlotGroup getPlotGroupDefinition( Long id ) {
		return pgMapper.getPlotGroupDefinition(id);
	}
	
	@Override
	public Collection<PlotGroup> getAllPlotGroups() {
		return pgMapper.getAllPlotGroups();
	}

	@Override
	public void updatePlotGroup( PlotGroup u ) {
		pgMapper.updatePlotGroup(u);
	}

	@Override
    public void insertPlotGroup( PlotGroup pg ) {
    	pgMapper.insertPlotGroup(pg);
    }
    
}