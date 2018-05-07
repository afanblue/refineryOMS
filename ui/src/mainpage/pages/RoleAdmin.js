import React, {Component} from 'react';
import {SERVERROOT} from '../../Parameters.js';
import DefaultContents from './DefaultContents.js';
import RoleForm from './forms/RoleForm.js';
import RoleList from './lists/RoleList.js';
import Waiting from './Waiting.js';
import {Role} from './objects/Role.js';



class RoleAdmin extends Component {
  constructor(props) {
    super(props);
    console.log( "RoleAdmin: " + props.stage );
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
  }
  
  handleErrors(response) {
    if (!response.ok) {
        throw Error(response.status+" ("+response.statusText+")");
    }
    return response;
  }

  componentWillReceiveProps(nextProps) {
    console.log( "RoleAdmin.willRcvProps: " + nextProps.selected + ":"
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
    console.log( "RoleAdmin.shouldUpdate? : (" + nextState.stage + ") " + (sts?"T":"F") );
    return sts;
  }

  fetchFormData(id) {
    const myRequest = SERVERROOT + "/role/" + id;
    console.log( "RoleAdmin.fetchFormData - Request: " + myRequest );
    fetch(myRequest)
      .then(this.handleErrors)
      .then(response => {
        var contentType = response.headers.get("Content-Type");
        if(contentType && contentType.includes("application/json")) {
          return response.json();
        }
        throw new TypeError("RoleAdmin.fetchFormData: response ("+contentType+") must be a JSON string");
    }).then(json => {
       let rd = json;
       const r = new Role(rd.id,rd.name,rd.active,rd.privs,null);
       const privList = rd.privileges;
       this.setState({stage: "itemRetrieved",
                      updateDisplay: true,
                      updateData: false,
                      returnedText: rd,
                      role: r,
                      privList: privList
                     });
    }).catch(function(error) { 
       alert("Problem selecting role id "+id+"\n"+error);
       console.log("RoleAdmin.fetchFormData: Error - " + error);  
    });
  }

  handleRoleSelect(event) {
    let now = new Date();
    console.log( "RoleAdmin.roleSelect " + now.toISOString() );
    const id = event.z;
    this.fetchFormData(id);
  }

  handleRoleUpdate(event) {
    event.preventDefault();
    const id = this.state.role.id;
    let method = "PUT";
    let url = SERVERROOT + "/role/update";
    if( id === 0 ) {
      method = "POST";
      url = SERVERROOT + "/role/insert";
    }
    var r = this.state.role;
    const b = JSON.stringify(r);
    console.log("RoleAdmin.roleUpdate "+method)
    fetch(url, {
      method: method,
      headers: {'Content-Type':'application/json'},
      body: b
    }).then(this.handleErrors)
      .then(response => {
        this.fetchFormData(id);
    }).catch(function(error) { 
        alert("Problem "+(id===0?"inserting":"updating")+" role "
             +"id "+id+"\n"+error);
        console.log("RoleAdmin.roleUpdate: Error - " + error);  
    });
  }
  
  componentDidMount() {
    console.log( "RoleAdmin.didMount: " + this.state.stage );
    this.fetchList();
  }
  
  componentDidUpdate( prevProps, prevState ) {
    console.log( "RoleAdmin.didUpdate: " + this.state.stage );
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
    console.log( "RoleAdmin.fetchList : " + this.state.stage );
    const myRequest = SERVERROOT + "/role/all";
    const now = new Date();
    console.log( "RoleAdmin.fetchList " + now.toISOString() + " Request: " + myRequest );
    if( myRequest !== null ) {
      fetch(myRequest)
          .then(this.handleErrors)
          .then(response => {
            var contentType = response.headers.get("content-type");
            if(contentType && contentType.includes("application/json")) {
              return response.json();
            }
            throw new TypeError("RoleAdmin(fetchList): response ("+contentType+") must be a JSON string");
        }).then(json => {
           console.log("RoleAdmin.fetchList: JSON retrieved - " + json);
           this.setState( {returnedText: json, 
                           updateData: false, 
                           updateDisplay:true,
                           stage: "dataFetched" } );
        }).catch(function(e) { 
           alert("Problem retrieving role list\n"+e);
           const emsg = "RoleAdmin.fetchList: Fetching role list " + e;
           console.log(emsg);
      });
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
    console.log("RoleAdmin.render - stage: "+this.state.stage);
    switch( this.state.stage ) {
  	  case "begin":
        return <Waiting />
      case "dataFetched":
        return <RoleList returnedText = {this.state.returnedText}
                         roleSelect   = {this.handleRoleSelect} />
      case "itemRetrieved":
        return <RoleForm returnedText = {this.state.returnedText}
                          role        = {this.state.role}
                          privList    = {this.state.privList}
                          roleUpdate  = {this.handleRoleUpdate}
                          roleChange  = {this.handleRoleChange}
                          handleQuit    = {this.handleRoleQuit}
                          handleMouseUp = {this.handleMouseUp}
               />
      default:
        return <DefaultContents />
    }
  }
}


export default RoleAdmin