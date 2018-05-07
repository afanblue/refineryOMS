package it.avn.oms.mapper;

import java.util.Collection;

import it.avn.oms.domain.IdName;
import it.avn.oms.domain.Transfer;

public interface TransferMapper {
	
	Collection<Transfer> getAllTransfers(String type );
	
	Collection<Transfer> getActiveTransfers( );
	
	Collection<Transfer> getLastTransfers( Long num );
	
	Collection<Transfer> getScheduledTransfers();
	
	Collection<Transfer> getAllTransfersInField( Long id );
	
	Collection<IdName> getTransferStatuses();

	Collection<IdName> getTransferTypes();
	
	Collection<Transfer> getEndingTransfers( );
	
	Collection<Transfer> getStartingTransfers( );
	
	Collection<Transfer> getPendingTemplates();
		
	void completeTransfer( Long id );

	void startTransfer( Long id );

	Transfer getTransfer( Long id);
	
	Integer updateTransfer( Transfer x );

	Integer insertTransfer( Transfer x );

}
