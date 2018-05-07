package it.avn.oms.service.impl;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;

import it.avn.oms.domain.IdName;
import it.avn.oms.mapper.PrivilegeMapper;
import it.avn.oms.service.PrivilegeService;

public class PrivilegeServiceImpl implements PrivilegeService {


	private PrivilegeMapper privilegeMapper;
	
	public void setPrivilegeMapper( PrivilegeMapper rm ) {
		this.privilegeMapper = rm;
	}


	@Override
	public IdName getPrivilegeById( Long id ) {
		return privilegeMapper.getPrivilegeById(id);
	}
	
	@Override
	public Collection<IdName> getAllPrivileges() {
		return privilegeMapper.getAllPrivileges();
	}
	
	@Override
	public Collection<IdName> getPrivilegesForRole( Long id ) {
		return privilegeMapper.getPrivilegesForRole( id );
	}

	@Override
	public void updatePrivilege( IdName u ) {
		privilegeMapper.updatePrivilege(u);
	}

	@Override
    public void insertPrivilege( IdName u ) {
    	privilegeMapper.insertPrivilege(u);
    }


}