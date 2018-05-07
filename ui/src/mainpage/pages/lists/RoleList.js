import React, {Component} from 'react';

import {Role} from '../objects/Role.js';


class RoleList extends Component {
  constructor(props) {
    super(props);
    console.log( "RoleList: " + props.stage );
    this.state = {  };
  }

  render() {
    var json = this.props.returnedText;
    var roleSelect = this.props.roleSelect;
    var roleList = [];
    var nr = new Role(0,'New Role','N',null);
    roleList.push(nr);
    json.map(function(n,x){
        var r = new Role(n.id,n.name,n.active,null); 
        return roleList.push( r ); 
    } );
    return ( 
      <div className="oms-tabs">
        <h2><div><img src="./images/spacer.png" alt="space" width="30px" height="2px"/>Site Roles</div></h2>
        <table>
          <thead className="fixedHeader">
            <tr>
              <th className={["oms-spacing-120","oms-underline"].join(' ')}> Role Name </th>
              <th className={["oms-spacing-90","oms-underline"].join(' ')}> Active </th>
            </tr>
          </thead>
          <tbody className="scrollContent">
          {roleList.map(
            function(n,x){
              let z = n.id;
              return <tr key={x}>
                       <td className={["oms-spacing-120","oms-cursor-pointer"].join(' ')}>
                         <a id={z} onClick={() => {roleSelect({z})}} >
                           {n.name}
                         </a>
                       </td>
                       <td className="oms-spacing-90">{n.active}</td>
                     </tr>; 
            } )
          }
          </tbody>
        </table>
      </div>
    );
  }
  
}

export default RoleList;
