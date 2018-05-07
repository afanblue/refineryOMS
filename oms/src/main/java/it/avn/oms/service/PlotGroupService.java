package it.avn.oms.service;

import java.util.Collection;

import it.avn.oms.domain.PlotGroup;


public interface PlotGroupService {
	
	public PlotGroup getPlotGroupDefinition( Long id );
	
	public Collection<PlotGroup> getAllPlotGroups();
	
	public void updatePlotGroup( PlotGroup f );

    public void insertPlotGroup( PlotGroup f );
    
}
