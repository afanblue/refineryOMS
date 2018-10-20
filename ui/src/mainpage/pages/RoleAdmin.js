/*************************************************************************
 * RoleAdmin.js
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

import React, {Component} from 'react';
import {SERVERROOT}    from '../../Parameters.js';
import Log             from '../requests/Log.js';
import DefaultContents from './DefaultContents.js';
import OMSRequest      from '../requests/OMSRequest.js';
import RoleForm        from './forms/RoleForm.js';
import RoleList        from './lists/RoleList.js';
import Waiting         from './Waiting.js';
import {Role}          from './objects/Role.js';



class RoleAdmin extends Component {
  constructor(props) {
    super(props);
    Log.info( "RoleAdmin: " + props.stage );
    this.state = {
      stage: props.stage,
      updateData: false,
      updateDisplay: true,
      returnedText: null,
      role: null,
      privs: null,
      privList: null
    }
    this.handleRoleChange = this.handleRoleChange.bind(this);
    this.handleRoleSelect = this.handleRoleSelect.bind(this);
    this.handleRoleUpdate = this.handleRoleUpdate.bind(this);
    this.handleRoleQuit   = this.handleRoleQuit.bind(this);
    this.finishRoleFetch  = this.finishRoleFetch.bind(this);
    this.finishPrivsFetch = this.finishPrivsFetch.bind(this);
    this.finishRolePrivsFetch  = this.finishRolePrivsFetch.bind(this);
  }
  
  handleErrors(response) {
    if (!response.ok) {
        throw Error(response.status+" ("+response.statusText+")");
    }
    return response;
  }

  componentWillReceiveProps(nextProps) {
    Log.info( "RoleAdmin.willRcvProps: " + nextProps.selected + ":"
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
    Log.info( "RoleAdmin.shouldUpdate? : (" + nextState.stage + ") " + (sts?"T":"F") );
    return sts;
  }

  finishRoleFetch( req ) {
    let rd = req;
    const role = new Role(rd.id,rd.name,rd.active,this.state.privs,null);
    this.setState({stage: "itemRetrieved", updateDisplay: true, role: role });
  }
  
  finishPrivsFetch(req) {
    let privs = [];
    req.map(function(n,x){ return privs.push(n.id); } )
    let rnew = Object.assign({},this.state.role);
    rnew.privs = privs;    
    this.setState({stage: "itemRetrieved", updateDisplay: true, role: rnew, privs: privs });
  }
  
  finishRolePrivsFetch(req) {
    let privList = req;
    this.setState({stage: "itemRetrieved", updateDisplay: true, privList: privList });
  }
  
  fetchFormData(id) {
    const loc = "RoleAdmin.select";
    let req0 = new OMSRequest(loc, SERVERROOT + "/role/" + id,
                            "Problem selecting role id "+id, this.finishRoleFetch);
    req0.fetchData();
    let req2 = new OMSRequest(loc, SERVERROOT + "/privilege/role/" + id,
                            "Problem retrieving role privs "+id, this.finishPrivsFetch);
    req2.fetchData();
    let req3 = new OMSRequest(loc, SERVERROOT + "/privilege/all",
                            "Problem retrieving privilege list", this.finishRolePrivsFetch);
    req3.fetchData();    
  }

  handleRoleSelect(event) {
    let now = new Date();
    Log.info( "RoleAdmin.roleSelect " + now.toISOString() );
    const id = event.z;
    this.fetchFormData(id);
  }

  handleRoleUpdate(event) {
    event.preventDefault();
    const clsMthd = "RoleAdmin.roleUpdate";
    const id = this.state.role.id;
    let method = "PUT";
    let url = SERVERROOT + "/role/update";
    if( id === 0 ) {
      method = "POST";
      url = SERVERROOT + "/role/insert";
    }
    var r = this.state.role;
    const b = JSON.stringify(r);
    const request = async () => {
      await fetch(url, {method:method, headers:{'Content-Type':'application/json'}, body: b});
      Log.info( "Role update complete",clsMthd );
      alert("Update/insert complete on "+r.name)
      this.fetchFormData(id);
    }
    try {
      request();
    } catch( error ) {
      alert("Problem "+(id===0?"inserting":"updating")+" role "
           +"id "+id+"\n"+error);
      Log.error("Error - " + error,clsMthd);
    }
  }
  
  componentDidMount() {
    Log.info( "RoleAdmin.didMount: " + this.state.stage );
    this.fetchList();
  }
  
  componentDidUpdate( prevProps, prevState ) {
    Log.info( "RoleAdmin.didUpdate: " + this.state.stage );
    switch (this.state.stage) {
      case "begin":
        break;
      default:
    }
  }
  
  handleRoleChange(event) {
    const target = event.target;
    const value = parseInt(target.value,10);
    const name = target.name;
    let np = name.split(".");
    let rnew = Object.assign({},this.state.role);
    if( target.name === "privs" ) {
        let f = -1;
        let tNew = [];
        let tLength = (rnew.privs===null?0:rnew.privs.length);
        for( var i=0; i<tLength; i++) {
            let v = rnew.privs.shift();
            if( v === value ) { 
                f = i;
            } else {
                tNew.push(v);
            }
        }
        if( f === -1 ) {
            tNew.push(value);
        }
        rnew.privs = tNew;
    } else if( np.length === 1 ) {
        const role = np[0];
        rnew[role] = value;
    } else {
        const role = np[1];
        rnew.tag[role] = value;
    }
    this.setState({role: rnew } );
  }
  
  fetchList() {
    const clsMthd = "RoleAdmin.fetchList";
    const myRequest = SERVERROOT + "/role/all";
    const now = new Date();
    Log.info( now.toISOString() + " Request: " + myRequest, clsMthd );
    if( myRequest !== null ) {
      const request = async () => {
        const response = await fetch(myRequest);
        const json = await response.json();
        this.setState( {returnedText: json, 
                        updateData: false, 
                        updateDisplay:true,
                        stage: "dataFetched" } );
      }
      try {
        request();
      } catch( e ) {
        const emsg = "Problem fetching role list";
        alert(emsg+"\n"+e);
        Log.error(emsg+" - " + e, clsMthd);        
      }
    }
  }
  
  handleRoleQuit(event) {
    event.preventDefault();
    this.fetchList();
    this.setState( {returnedText: null, 
                    updateData: true, 
                    updateDisplay:true,
                    stage: "begin" } );
  }

  render() {
    Log.info("RoleAdmin.render - stage: "+this.state.stage);
    switch( this.state.stage ) {
  	  case "begin":
        return <Waiting />
      case "dataFetched":
        return <RoleList returnedText = {this.state.returnedText}
                         roleSelect   = {this.handleRoleSelect} />
      case "itemRetrieved":
        if( (this.state.role === null) || (this.state.privs === null) ||
            (this.state.privList === null) ) {
          return <Waiting />
        } else {
          return <RoleForm returnedText = {this.state.returnedText}
                           role         = {this.state.role}
                           privs        = {this.state.privs}
                           privList     = {this.state.privList}
                           roleUpdate   = {this.handleRoleUpdate}
                           roleChange   = {this.handleRoleChange}
                           handleQuit    = {this.handleRoleQuit}
                           handleMouseUp = {this.handleMouseUp} />
        }
      default:
        return <DefaultContents />
    }
  }
}


export default RoleAdmin