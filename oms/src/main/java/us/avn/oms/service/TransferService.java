/*******************************************************************************
 * Copyright (C) 2018 Laboratorio de Lobo Azul
 *  
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *  
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *******************************************************************************/
package us.avn.oms.service;

import java.util.Collection;

import us.avn.oms.domain.IdName;
import us.avn.oms.domain.Transfer;


public interface TransferService {
	
	public Collection<Transfer> getAllTransfers(String type );
		
	Collection<Transfer> getActiveTransfers( );
	
	Collection<Transfer> getLastTransfers( Long num );
	
	Collection<Transfer> getScheduledTransfers();
	
	Collection<IdName> getTransferStatuses();

	Long getTransferStatusId( String code );
	
	Collection<IdName> getTransferTypes();
	
	Long getTransferTypeId( String code );
	
	Collection<Transfer> getEndingTransfers( );
	
	Collection<Transfer> getStartingTransfers( );
		
	Collection<Transfer> getPendingTemplates( );
	
	void completeTransfer( Long id );

	void startTransfer( Long id );

	Transfer getTransfer( Long id);
	
	Transfer getTemplate( String nm );
	
	void updateTransfer( Transfer t );

	Long insertTransfer( Transfer t );

}
