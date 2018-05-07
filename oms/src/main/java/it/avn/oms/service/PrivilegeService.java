package it.avn.oms.service;

import java.util.Collection;

import it.avn.oms.domain.IdName;

public interface PrivilegeService {
	
	public IdName getPrivilegeById( Long id );
	
	public Collection<IdName> getAllPrivileges();

	public Collection<IdName> getPrivilegesForRole( Long id );

	public void updatePrivilege( IdName r );

    public void insertPrivilege( IdName r );

}
