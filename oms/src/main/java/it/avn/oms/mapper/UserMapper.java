package it.avn.oms.mapper;

import java.util.Collection;

import it.avn.oms.domain.User;
import it.avn.oms.domain.UserPriv;


public interface UserMapper {
	
	User getUserById( Integer id );
	
	Collection<User> getAllUsers(  );
	
    void updateUser( User u );

    Long insertUser( User u );

    Collection<UserPriv> getUserRole( String alias );

    Integer validateUser( String u, String pw );
	  
}
