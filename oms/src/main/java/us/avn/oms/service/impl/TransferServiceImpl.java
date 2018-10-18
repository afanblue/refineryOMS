/*******************************************************************************
 * Copyright (C) 2018 A. E. Van Ness
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
package us.avn.oms.service.impl;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;

import us.avn.oms.domain.IdName;
import us.avn.oms.domain.Transfer;
import us.avn.oms.mapper.TagMapper;
import us.avn.oms.mapper.TransferMapper;
import us.avn.oms.service.TransferService;

public class TransferServiceImpl implements TransferService {


	private TagMapper tagMapper;
	private TransferMapper transferMapper;
	
	public void setTagMapper( TagMapper tm ) {
		this.tagMapper = tm;
	}
	
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
/*
		String[] tagList = {"TK","RU","S","TC","TT","PU"};
		ArrayList<String> al = new ArrayList<String>(
				Arrays.asList(tagList));
		
		Collection<IdName> sd = tagMapper.getAllIdNamesByTypeList(al);
		
		x.setSources(sd);
		x.setDestinations(sd);
		x.setStatuses(transferMapper.getTransferStatuses());
		x.setTransferTypes(transferMapper.getTransferTypes());
*/
		return x;
	}
	
	@Override
	public void updateTransfer( Transfer x ) {
		transferMapper.updateTransfer( x );
	}

	@Override
	public void insertTransfer( Transfer x ) {
		transferMapper.insertTransfer(x);
	}

	@Override
	public Collection<IdName> getTransferStatuses() {
		return transferMapper.getTransferStatuses();
	}

	@Override
	public Collection<IdName> getTransferTypes() {
		return transferMapper.getTransferTypes();
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