package us.avn.oms.service;

import us.avn.oms.domain.Xfer;

public interface XferService {
	
	void clearUpdated( Long i );
	
	void updateXfer( Xfer x );

}
