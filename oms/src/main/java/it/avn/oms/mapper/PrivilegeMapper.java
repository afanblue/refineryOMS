package it.avn.oms.mapper;

import java.util.Collection;

import it.avn.oms.domain.IdName;


public interface PrivilegeMapper {
	
	IdName getPrivilegeById( Long id );
	
	Collection<IdName> getAllPrivileges( );
	
	Collection<IdName> getPrivilegesForRole( Long id );

    void updatePrivilege( IdName r );

    void insertPrivilege( IdName r );
  
}
