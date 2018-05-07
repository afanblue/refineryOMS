package it.avn.oms.service.impl;

import java.util.Collection;

import it.avn.oms.domain.History;
import it.avn.oms.domain.HistoryRequest;
import it.avn.oms.mapper.HistoryMapper;
import it.avn.oms.service.HistoryService;

public class HistoryServiceImpl implements HistoryService {


	private HistoryMapper histMapper;
	
	public void setHistoryMapper( HistoryMapper hm ) {
		this.histMapper =hm;
	}

	
	@Override
	public void insertHistoryRecord( History h ) {
		histMapper.insertHistoryRecord(h);
	}
	
	@Override
	public Collection<History> getTagHistory( HistoryRequest hr ) {
		return histMapper.getTagHistory(hr);
	}

}