import React, {Component} from 'react';




class UserForm extends Component {
  constructor( props ) {
    super(props);
    this.state={};
  }  
  
  render() {
    let ud = this.props.returnedText;
    let userUpdate = this.props.userUpdate;
    let fieldChange = this.props.FieldChange;
    let handleQuit = this.props.handleQuit;
    let u = this.props.user;
    return(
      <div className="oms-tabs">
      <form id="userForm" onSubmit={(e) => {userUpdate(e)}} >
        Please enter your user information 
        <table>
          <tbody className="scrollContent">
          <tr>
            <th className="oms-spacing-180">&nbsp;</th>
            <td className="oms-spacing"><img src="images/spacer.png" 
                alt="space" height="5px" width="240px"/></td>
          </tr>
          <tr>
            <th className="oms-spacing-180">Username (10 chars):</th>
            <td className="oms-spacing">
              <input type="hidden" name="id" value={u.id} />
              <input type="text" id="alias" name="alias" value={u.alias} 
                     className="oms-spacing-50" size="10" maxLength="10"
                     onChange={fieldChange} />
            </td>
          </tr>
          <tr>
            <th className="oms-spacing-180">User Status:</th>
            <td className="oms-spacing">
              <select id="status" name="status" value={u.status}
                      onChange={fieldChange} >
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
            <th className="oms-spacing-180">User Request State:</th>
            <td className="oms-spacing">
        		<input type="hidden" id="state" name="state" value={u.state}/>
                {u.state}
            </td>
          </tr>
          <tr>
            <th className="oms-spacing-180">Role:</th>
            <td className="oms-spacing">
              <select id="role_id" name="role_id" onChange={fieldChange} >
                {ud.roles.map(
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