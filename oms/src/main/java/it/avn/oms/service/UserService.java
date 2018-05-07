package it.avn.oms.service;

import java.util.Collection;

import it.avn.oms.domain.User;
import it.avn.oms.domain.UserPriv;
import it.avn.oms.domain.Validation;

public interface UserService {
	
	public User getUserById( Integer id );
	
	public Collection<User> getAllUsers();
	
	public void updateUser( User u );

    public Long insertUser( User u );

    public Collection<UserPriv> getUserRole( String alias );

    public Validation validateUser( String u, String pw );

}
