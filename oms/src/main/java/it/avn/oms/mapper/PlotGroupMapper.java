package it.avn.oms.mapper;

import java.util.Collection;

import it.avn.oms.domain.PlotGroup;


public interface PlotGroupMapper {
	
	Collection<PlotGroup> getAllPlotGroups( );
	
	PlotGroup getPlotGroupDefinition( Long id );
	
	void insertPlotGroup( PlotGroup pg );
	
	void updatePlotGroup( PlotGroup pg );

}
