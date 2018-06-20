package us.avn.oms.service.impl;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;

import us.avn.oms.domain.IdName;
import us.avn.oms.domain.Role;
import us.avn.oms.domain.RolePriv;
import us.avn.oms.mapper.RoleMapper;
import us.avn.oms.service.RoleService;

public class RoleServiceImpl implements RoleService {


	private RoleMapper roleMapper;
	
	public void setRoleMapper( RoleMapper rm ) {
		this.roleMapper = rm;
	}


	@Override
	public Role getRoleById( Long id ) {
		return roleMapper.getRoleById(id);
	}
	
	@Override
	public Collection<Role> getAllRoles() {
		return roleMapper.getAllRoles();
	}

	@Override
	public Collection<IdName> getAllRolesAsIdName() {
		return roleMapper.getAllRolesAsIdName();
	}

	@Override
	public void updateRole( Role u ) {
		roleMapper.updateRole(u);
	}

	@Override
    public void insertRole( Role u ) {
    	roleMapper.insertRole(u);
    }

	@Override
    public void deleteRolePrivs( Long id ) {
		roleMapper.deleteRolePrivs(id);
	}
    
	@Override
    public void insertRolePriv( RolePriv rp ) {
		roleMapper.insertRolePriv(rp);
	}
    

}