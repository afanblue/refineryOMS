package us.avn.oms.mapper;

import us.avn.oms.domain.Xfer;

public interface XferMapper {
	
	void clearUpdated( Long i );

	void updateXfer( Xfer x );
}
