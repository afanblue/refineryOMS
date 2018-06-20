package us.avn.oms.service;

import java.util.Collection;

import us.avn.oms.domain.History;
import us.avn.oms.domain.HistoryRequest;


public interface HistoryService {
	
	void insertHistoryRecord( History h );
	
	Collection<History> getTagHistory( HistoryRequest hr );

}
