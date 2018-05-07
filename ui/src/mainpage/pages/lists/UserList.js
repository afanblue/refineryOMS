import React, {Component} from 'react';
import {User} from '../objects/User.js';


class UserList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  
  render () {
    var json = this.props.returnedText;
    var userSelect = this.props.userSelect;
    
    var userList = [];
    var nu = new User(0,'','Create new user','','','','','','',0);
    userList.push(nu);
    json.map(function(n,x){var u = new User(n.id,n.alias,n.firstName,n.middleName,n.lastName,n.email
                                           ,n.password,n.state,n.status,n.roleId); 
                           return userList.push( u ); } );
    return ( 
      <div className="oms-tabs">
        <h2><div><img src="./images/spacer.png" alt="space" width="30px" height="2px"/>OMS Users</div></h2>
        <table>
          <thead className="fixedHeader">
            <tr>
              <th className={["oms-spacing-120","oms-underline"].join(' ')}> User name </th>
              <th className={["oms-spacing-240","oms-underline"].join(' ')}> Email </th>
              <th className={["oms-spacing-90","oms-underline"].join(' ')}> User ID </th>
              <th className={["oms-spacing-50","oms-underline"].join(' ')}> State </th>
              <th className={["oms-spacing-50","oms-underline"].join(' ')}> Active </th>
              <th className={["oms-spacing-50","oms-underline"].join(' ')}> Role </th>
            </tr>
          </thead>
          <tbody className="scrollContent">
          {userList.map(
            function(n,x){
              let z = n.id;
              return <tr key={x}>
                       <td className={["oms-spacing-120","oms-cursor-pointer"].join(' ')}>
                         <a id={z} onClick={() => {userSelect({z})}} >
                           {n.firstName} {n.lastName}
                         </a>
                       </td>
                       <td className="oms-spacing-240">{n.email}</td>
                       <td className="oms-spacing-90">{n.alias}</td>
                       <td className="oms-spacing-50">{n.state}</td>
                       <td className="oms-spacing-50">{n.active}</td>
                       <td className="oms-spacing-50"> ? </td>
                     </tr>; 
            } )
          }
          </tbody>
        </table>
      </div>
    );
  }
}

export default UserList;
