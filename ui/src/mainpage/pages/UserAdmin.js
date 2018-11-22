/*************************************************************************
 * UserAdmin.js
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

import React, {Component} from 'react';
import {SERVERROOT}    from '../../Parameters.js';
import UserList        from './lists/UserList.js';
import UserForm        from './forms/UserForm.js';
import DefaultContents from './DefaultContents.js';
import Log             from '../requests/Log.js';
import OMSRequest      from '../requests/OMSRequest.js';
import Waiting         from './Waiting.js';
import {User}          from './objects/User.js';



class UserAdmin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stage: props.stage,
      updateData: false,
      updateDisplay: true,
      returnedText: null,
      roles: null,
      user: null
    };
    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.handleUserSelect = this.handleUserSelect.bind(this);
    this.handleUserUpdate = this.handleUserUpdate.bind(this);
    this.finishUserFetch  = this.finishUserFetch.bind(this);
    this.finishRolesFetch = this.finishRolesFetch.bind(this);
    this.handleQuit       = this.handleQuit.bind(this);
  }
  
  handleErrors(response) {
    if (!response.ok) {
        throw Error(response.status+" ("+response.statusText+")");
    }
    return response;
  }

  componentWillReceiveProps(nextProps) {
    if( nextProps.stage !== this.state.stage )
    {
      this.setState({ stage: nextProps.stage,
                      updateData: true,
                      updateDisplay: false,
                      returnedText: null });
    }
  }
  
  shouldComponentUpdate(nextProps,nextState) {
    let sts = nextState.updateDisplay;
    return sts;
  }

/* */
  finishUserFetch( req ) {
    let ud = req;
    const u = new User(ud.id,ud.alias,ud.firstName,ud.middleName,ud.lastName,ud.email
                      ,ud.password,ud.state,ud.status,ud.roleId);
    this.setState({stage: "userRetrieved", updateDisplay: true, user: u });
  }
  
  finishRolesFetch(req) {
    let roles = req;
    this.setState({stage: "userRetrieved", updateDisplay: true, roles: roles });
                      
  }
  
  handleUserSelect(event) {
    const id = event.z;
    const loc = "UserAdmin.userSelect";
    let req0 = new OMSRequest(loc, SERVERROOT + "/user/" + id,
                            "Problem selecting user id "+id, this.finishUserFetch);
    req0.fetchData();
    let req1 = new OMSRequest(loc, SERVERROOT + "/role/all",
                            "Problem retrieving roles", this.finishRolesFetch);
    req1.fetchData();
//    Log.info( "req0.uri="+req0.uri + " <-> req1.uri="+req1.uri);
//    Log.info( "req0.erm="+req0.errMsg + " <-> req1.erm="+req1.errMsg);
  }

  handleUserUpdate(event) {
    event.preventDefault();
    const clsMthd = "UserAdmin.handleUpdate";
    const user = this.state.user;
    const id = user.id;
    let method = "PUT";
    let url = "http://localhost:8080/oms/user/update";
    if( id === 0 ) {
      method = "POST";
      url = "http://localhost:8080/oms/user/insert";
    }
    const b = JSON.stringify(user);
    const request = async () => {
      try {
        await fetch(url, {method:method, headers:{'Content-Type':'application/json'}, body: b});
        alert("Update/insert complete on user, id="+id)
      } catch( error ) {
        const emsg = "Problem "+(id===0?"inserting":"updating")+" user, id="+id;
        alert(emsg+"\n"+error);
        Log.error(emsg+" - " + error,clsMthd);
      }
    }
    request();
  }

  componentDidMount() {
    this.fetchList();
  }
  
  componentDidUpdate( prevProps, prevState ) {
    switch (this.state.stage) {
      case "begin":
        break;
      default:
    }
  }
  
  handleFieldChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    let unew = Object.assign({},this.state.user);
    unew[name] = value;
    this.setState({user:unew, activity:"userInput" } );
  }
  
  fetchList() {
    const clsMthd = "UserAdmin.fetchList";
    const myRequest = SERVERROOT + "/user/all";
    if( myRequest !== null ) {
      const request = async () => {
        try {
          const response = await fetch(myRequest);
          const json = await response.json();
          this.setState( {returnedText: json, 
                          updateData: false, 
                          updateDisplay:true,
                          stage: "dataFetched" } );
        } catch( e ) {
          const emsg = "Problem fetching user list";
          alert(emsg+"\n"+e);
          Log.error(emsg+" - " + e, clsMthd);        
        }
      }
      request();
    }
  }

  handleQuit(event) {
    event.preventDefault();
    this.fetchList();
    this.setState( {returnedText: null, 
                    updateData: true, 
                    updateDisplay:true,
                    stage: "begin" } );
  }
  
  render() {
    switch( this.state.stage ) {
  	  case "begin":
        return <Waiting />
      case "dataFetched":
        return <UserList returnedText = {this.state.returnedText}
                         userSelect = {this.handleUserSelect} />
      case "userRetrieved":
        if( (this.state.user === null) || (this.state.roles === null) ) {
          return <Waiting />
        } else {
          return <UserForm roles        = {this.state.roles}
                           user         = {this.state.user}
                           userUpdate   = {this.handleUserUpdate}
                           fieldChange  = {this.handleFieldChange}
                           handleQuit   = {this.handleQuit} />
        }
      default:
        return <DefaultContents />
    }
  }
}

export default UserAdmin;
