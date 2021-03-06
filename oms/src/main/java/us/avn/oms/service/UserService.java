/*******************************************************************************
 * Copyright (C) 2018 Laboratorio de Lobo Azul
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
package us.avn.oms.service;

import java.util.Collection;

import us.avn.oms.domain.User;
import us.avn.oms.domain.UserRole;
import us.avn.oms.domain.Validation;

public interface UserService {
	
	public User getUserById( Long id );
	
	public Collection<User> getAllUsers();
	
	public void updateUser( User u );

    public Long insertUser( User u );

    public Collection<UserRole> getUserRole( String alias );

    public Validation validateUser( String u, String pw );
    
    public Integer insertUserRole( UserRole ur );

}
