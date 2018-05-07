package it.avn.oms.service.impl;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;

import it.avn.oms.domain.Xfer;
import it.avn.oms.mapper.XferMapper;
import it.avn.oms.service.XferService;


public class XferServiceImpl implements XferService {


	private XferMapper xMapper;
	
	public void setXferMapper( XferMapper xm ) {
		this.xMapper = xm;
	}
	
	
	
	@Override
	public void clearUpdated( Long i ) {
		xMapper.clearUpdated(i );
	}

	@Override
	public void updateXfer( Xfer x ) {
		xMapper.updateXfer(x);
	}
}