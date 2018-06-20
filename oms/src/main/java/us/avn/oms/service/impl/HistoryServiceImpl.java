package us.avn.oms.service.impl;

import java.util.Collection;

import us.avn.oms.domain.History;
import us.avn.oms.domain.HistoryRequest;
import us.avn.oms.mapper.HistoryMapper;
import us.avn.oms.service.HistoryService;

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