package us.avn.oms.mapper;


import java.util.Collection;

import us.avn.oms.domain.History;
import us.avn.oms.domain.HistoryRequest;

public interface HistoryMapper {
	
	void insertHistoryRecord( History h );
	
	Collection<History> getTagHistory( HistoryRequest hr );

}
