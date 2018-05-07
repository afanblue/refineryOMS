package it.avn.oms.service;

import it.avn.oms.domain.Xfer;

public interface XferService {
	
	void clearUpdated( Long i );
	
	void updateXfer( Xfer x );

}
