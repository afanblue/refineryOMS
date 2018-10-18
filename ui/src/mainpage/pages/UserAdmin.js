import React, {Component} from 'react';
import {SERVERROOT}    from '../../Parameters.js';
import UserList        from './lists/UserList.js';
import UserForm        from './forms/UserForm.js';
import DefaultContents from './DefaultContents.js';
import Log             from '../requests/Log.js';
import OMSRequest      from '../requests/OMSRequest.js';
import Waiting         from './Waiting.js';
import {User}          from './objects/User.js';

/*************************************************************************
 * UserAdmin.js
 * Copyright (C) 2018  A. E. Van Ness
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



class UserAdmin extends Component {
  constructor(props) {
    super(props);
    Log.info( "UserAdmin: " + props.stage );
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
    Log.info( "UserAdmin.willRcvProps: " + nextProps.selected + ":"
               + ((nextProps.option===null)?"null":nextProps.option)
               + "/" + nextProps.stage );
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
    Log.info( "UserAdmin.shouldUpdate? : (" + nextState.stage + ") " + (sts?"T":"F") );
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
/* */
/*
  handleUserSelect(event) {
    let now = new Date();
    Log.info( "UserAdmin.userSelect " + now.toISOString() );
    const id = event.z;
    const myRequest=SERVERROOT + "/user/" + id;
    now = new Date();
    Log.info( "UserAdmin.userSelect - Request: " + myRequest );
    fetch(myRequest)
      .then(this.handleErrors)
      .then(response => {
        var contentType = response.headers.get("Content-Type");
        if(contentType && contentType.includes("application/json")) {
          return response.json();
        }
        throw new TypeError("UserAdmin.userSelect: response ("+contentType+") must be a JSON string");
    }).then(json => {
       let ud = json;
       const u = new User(ud.id,ud.alias,ud.firstName,ud.middleName,ud.lastName,ud.email
                         ,ud.password,ud.state,ud.status,ud.roleId);
       this.setState({stage: "itemRetrieved",
                      updateDisplay: true,
                      updateData: false,
                      returnedText: json,
                      user: u                     
                     });
    }).catch(function(error) { 
       alert("Problem selecting user id "+id+"\n"+error);
       Log.error("UserAdmin.userSelect: Error - " + error);  
    });
  }
*/

  handleUserUpdate(event) {
    event.preventDefault();
//    Log.info("UserAdmin.handleUpdate: "+event);
    const id = this.state.user.id;
    Log.info("UserAdmin.userUpdate: id="+id
               +", alias:"+this.state.alias);
    let method = "PUT";
    let url = "http://localhost:8080/oms/user/update";
    if( id === 0 ) {
      method = "POST";
      url = "http://localhost:8080/oms/user/insert";
    }
    const b = JSON.stringify(this.state.user);
    fetch(url, {
      method: method,
      headers: {'Content-Type':'application/json'},
      body: b
    }).then(this.handleErrors)
      .catch(function(error) { 
        alert("Problem "+(id===0?"inserting":"updating")+" user "
             +"id "+id+"\n"+error);
        Log.error("UserAdmin.userUpdate: Error - " + error);  
    });
  }

  componentDidMount() {
    Log.info( "UserAdmin.didMount: " + this.state.stage );
    this.fetchList();
  }
  
  componentDidUpdate( prevProps, prevState ) {
    Log.info( "UserAdmin.didUpdate: " + this.state.stage );
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
    Log.info( "UserAdmin.fetchList : " + this.state.stage );
    const myRequest = SERVERROOT + "/user/all";
    const now = new Date();
    Log.info( "UserAdmin.fetchList " + now.toISOString() + " Request: " + myRequest );
    if( myRequest !== null ) {
      fetch(myRequest)
          .then(this.handleErrors)
          .then(response => {
            var contentType = response.headers.get("content-type");
            if(contentType && contentType.includes("application/json")) {
              return response.json();
            }
            throw new TypeError("UserAdmin(fetchList): response ("+contentType+") must be a JSON string");
        }).then(json => {
           Log.info("UserAdmin.fetchList: JSON retrieved - " + json);
           this.setState( {returnedText: json, 
                           updateData: false, 
                           updateDisplay:true,
                           stage: "dataFetched" } );
        }).catch(function(e) { 
           alert("Problem retrieving user list\n"+e);
           const emsg = "UserAdmin.fetchList: Fetching user list " + e;
           Log.error(emsg);
      });
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
    Log.info("UserAdmin.render - stage: "+this.state.stage);
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
