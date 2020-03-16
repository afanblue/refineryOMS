/*************************************************************************
 * UserForm.js
 * Copyright (C) 2018  Laboratorio de Lobo Azul
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
 ***********************************************************************/
/* eslint-env node, browser, es6 */

import React, {Component} from 'react';
import PropTypes          from 'prop-types';


class UserForm extends Component {
  constructor( props ) {
    super(props);
    this.state={};
  }

  static get propTypes() {
      return {
          user: PropTypes.object,
          roles: PropTypes.array,
          id: PropTypes.number,
          roleId: PropTypes.number,
          userRoleId: PropTypes.number,
          alias: PropTypes.string,
          status: PropTypes.string,
          password: PropTypes.string,
          firstName: PropTypes.string,
          middleName: PropTypes.string,
          lastName: PropTypes.string,
          email: PropTypes.string,
          userUpdate: PropTypes.func,
          fieldChange: PropTypes.func,
          handleQuit: PropTypes.func
      }
  }

  render() {
    let u = this.props.user;
    let roles = this.props.roles;
    let userUpdate = this.props.userUpdate;
    let fieldChange = this.props.fieldChange;
    let handleQuit = this.props.handleQuit;
    return(
      <div className="oms-tabs">
      <form id="userForm" onSubmit={(e) => {userUpdate(e)}} >
        Please enter your user information
        <table>
          <tbody className="scrollContent">
          <tr>
            <th className="oms-spacing-180">&nbsp;</th>
            <td className="oms-spacing"><img src="images/spacer.png"
                alt="" height="5px" width="240px"/></td>
          </tr>
          <tr>
            <th className="oms-spacing-180">Username (10 chars):</th>
            <td className="oms-spacing">
              <input type="hidden" name="id" value={u.id} />
              <input type="text" id="alias" name="alias" value={u.alias}
                     className="oms-spacing-80" size="10" maxLength="10"
                     onChange={fieldChange} />
            </td>
          </tr>
          <tr>
            <th className="oms-spacing-180">User Status:</th>
            <td className="oms-spacing">
              <select id="active" name="active" value={u.active} onChange={fieldChange} >
                <option value="">------</option>
                <option value="Y">Active</option>
                <option value="N">Inactive</option>
              </select>
            </td>
          </tr>
          <tr>
            <th className="oms-spacing-180">Password:</th>
            <td className="oms-spacing">
              <input type="password" id="password" name="password" value={u.password}
                     className="oms-spacing-50" size="20" maxLength="30"
                     onChange={fieldChange} />
            </td>
          </tr>
          <tr>
            <th className="oms-spacing-180">First name (30 chars):</th>
            <td className="oms-spacing">
              <input type="text" id="firstName" name="firstName" value={u.firstName}
                     className="oms-spacing-90" size="20" maxLength="30"
                     onChange={fieldChange} />
            </td>
          </tr>
          <tr>
            <th className="oms-spacing-180">Middle name (30 chars):</th>
            <td className="oms-spacing">
              <input type="text" id="middleName" name="middleName" value={u.middleName}
                     className="oms-spacing-90" size="20" maxLength="30"
                     onChange={fieldChange} />
            </td>
          </tr>
          <tr>
            <th className="oms-spacing-180">Last Name (60 chars):</th>
            <td className="oms-spacing">
              <input type="text" id="lastName" name="lastName" value={u.lastName}
                     className="oms-padding-120" size="20" maxLength="60"
                     onChange={fieldChange} />
            </td>
          </tr>
          <tr>
            <th className="oms-spacing-180">Email Address (128 chars):</th>
            <td className="oms-spacing-240">
              <input type="text" id="email" name="email" value={u.email}
                     className="oms-spacing-240" maxLength="128"
                     onChange={fieldChange} />
            </td>
          </tr>
          <tr>
            <th className="oms-spacing-180">Role:</th>
            <td className="oms-spacing">
              <input type="hidden" id="userRoleId" name="userRoleId" value={u.userRoleId} />
              <select id="roleId" name="roleId" value={u.roleId} onChange={fieldChange} >
                {roles.map(
                   function(n,x){
                     return <option key={x} value={n.id}>{n.name}</option>
                   }
                ) }
              </select>
            </td>
          </tr>
          <tr>
            <td colSpan="2">
              &nbsp;<input type="submit" id="closeForm"  name="closeForm"
                           value="Quit" onClick={(e) => {handleQuit(e)}}/>
              &nbsp;<input type="submit" id="submitForm" name="submitForm"
                           value="Submit" onClick={(e) => {userUpdate(e)}} />
            </td>
          </tr>
          </tbody>
        </table>
      </form>
      </div>
    );
  }
}


export default UserForm;