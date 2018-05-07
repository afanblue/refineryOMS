package it.avn.oms.service.impl;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;

import it.avn.oms.domain.IdName;
import it.avn.oms.domain.Transfer;
import it.avn.oms.mapper.TransferMapper;
import it.avn.oms.mapper.TagMapper;
import it.avn.oms.service.TransferService;

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
		String[] tagList = {"TK","RU","S","TC","TT","PU"};
		ArrayList<String> al = new ArrayList<String>(
				Arrays.asList(tagList));
		
		Collection<IdName> sd = tagMapper.getAllIdNamesByTypeList(al);
		
		x.setSources(sd);
		x.setDestinations(sd);
		x.setStatuses(transferMapper.getTransferStatuses());
		x.setTransferTypes(transferMapper.getTransferTypes());
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