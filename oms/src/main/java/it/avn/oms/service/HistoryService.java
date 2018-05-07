package it.avn.oms.service;

import java.util.Collection;

import it.avn.oms.domain.History;
import it.avn.oms.domain.HistoryRequest;


public interface HistoryService {
	
	void insertHistoryRecord( History h );
	
	Collection<History> getTagHistory( HistoryRequest hr );

}
