package us.avn.oms.mapper;

import java.util.Collection;

import us.avn.oms.domain.IdName;
import us.avn.oms.domain.Role;
import us.avn.oms.domain.RolePriv;


public interface RoleMapper {
	
	Role getRoleById( Long id );
	
	Collection<Role> getAllRoles( );
	
	Collection<IdName> getAllRolesAsIdName();

    void updateRole( Role r );

    void insertRole( Role r );
    
    void deleteRolePrivs( Long id );
    
    void insertRolePriv( RolePriv rp );
  
}
