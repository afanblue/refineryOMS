package it.avn.oms.service;

import java.util.Collection;

import it.avn.oms.domain.IdName;
import it.avn.oms.domain.Transfer;


public interface TransferService {
	
	public Collection<Transfer> getAllTransfers(String type );
		
	Collection<Transfer> getActiveTransfers( );
	
	Collection<Transfer> getLastTransfers( Long num );
	
	Collection<Transfer> getScheduledTransfers();
	
	Collection<IdName> getTransferStatuses();

	Collection<IdName> getTransferTypes();
	
	Collection<Transfer> getEndingTransfers( );
	
	Collection<Transfer> getStartingTransfers( );
		
	Collection<Transfer> getPendingTemplates( );
	
	void completeTransfer( Long id );

	void startTransfer( Long id );

	public Transfer getTransfer( Long id);
	
	void updateTransfer( Transfer t );

	void insertTransfer( Transfer t );

}
