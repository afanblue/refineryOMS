package it.avn.oms.mapper;

import java.util.Collection;

import it.avn.oms.domain.IdName;
import it.avn.oms.domain.Role;
import it.avn.oms.domain.RolePriv;


public interface RoleMapper {
	
	Role getRoleById( Long id );
	
	Collection<Role> getAllRoles( );
	
	Collection<IdName> getAllRolesAsIdName();

    void updateRole( Role r );

    void insertRole( Role r );
    
    void deleteRolePrivs( Long id );
    
    void insertRolePriv( RolePriv rp );
  
}
