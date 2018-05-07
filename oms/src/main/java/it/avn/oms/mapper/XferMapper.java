package it.avn.oms.mapper;

import it.avn.oms.domain.Xfer;

public interface XferMapper {
	
	void clearUpdated( Long i );

	void updateXfer( Xfer x );
}
