package it.avn.oms.mapper;


import java.util.Collection;

import it.avn.oms.domain.History;
import it.avn.oms.domain.HistoryRequest;

public interface HistoryMapper {
	
	void insertHistoryRecord( History h );
	
	Collection<History> getTagHistory( HistoryRequest hr );

}
