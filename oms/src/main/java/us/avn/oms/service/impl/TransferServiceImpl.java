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
 ******************************************************************************/
package us.avn.oms.service.impl;

import java.util.Collection;


import us.avn.oms.domain.IdName;
import us.avn.oms.domain.Transfer;
import us.avn.oms.mapper.TransferMapper;
import us.avn.oms.service.TransferService;

/**
 * Class:  TransferServiceImpl
 * Description: implementation of the TransferService methods
 *
 * @author Allan
 *
 */
public class TransferServiceImpl implements TransferService {


	private TransferMapper transferMapper;
	
	public void setTransferMapper( TransferMapper tm ) {
		this.transferMapper = tm;
	}
	

	@Override
	public Collection<Transfer> getAllTransfers( String type ) {
		return transferMapper.getAllTransfers(type);
	}
	
	@Override
	public Collection<Transfer> getActiveTransfers( ) {
		return transferMapper.getActiveTransfers();
	}
	
	@Override
	public Collection<Transfer> getLastTransfers( Long num ) {
		return transferMapper.getLastTransfers(num);
	}

	@Override
	public Collection<Transfer> getScheduledTransfers() {
		return transferMapper.getScheduledTransfers();
	}
	
	@Override
	public Transfer getTransfer( Long id) {
		Transfer x = transferMapper.getTransfer(id);
		if( x == null ) {
			x = new Transfer(0L, "New Transfer");
		}
		return x;
	}

	/**
	 * Retrieve the transfer object by name
	 * @param {@link String} nm name of transfer to retrieve
	 * @return {@link Transfer} object, null if none found
	 */
	@Override
	public Transfer getTemplate( String nm ) {
		Transfer x = transferMapper.getTemplate(nm);
		return x;
	}
	

	@Override
	public void updateTransfer( Transfer x ) {
		transferMapper.updateTransfer( x );
	}

	@Override
	public Long insertTransfer( Transfer x ) {
		transferMapper.insertTransfer(x);
		return x.getId();
	}

	@Override
	public Collection<IdName> getTransferStatuses() {
		return transferMapper.getTransferStatuses();
	}

	@Override
	public Long getTransferStatusId( String code ) {
		return transferMapper.getTransferStatusId(code);
	}
	
	@Override
	public Collection<IdName> getTransferTypes() {
		return transferMapper.getTransferTypes();
	}
	
	@Override
	public Long getTransferTypeId( String code ) {
		return transferMapper.getTransferTypeId(code);
	}

	@Override
	public Collection<Transfer> getEndingTransfers() {
		return transferMapper.getEndingTransfers();
	}

	@Override
	public Collection<Transfer> getStartingTransfers() {
		return transferMapper.getStartingTransfers();
	}

	@Override
	public Collection<Transfer> getPendingTemplates() {
		return transferMapper.getPendingTemplates();
	}
	
	@Override
	public void completeTransfer(Long id) {
		transferMapper.completeTransfer(id);
	}

	@Override
	public void startTransfer(Long id) {
		transferMapper.startTransfer(id);
	}

}