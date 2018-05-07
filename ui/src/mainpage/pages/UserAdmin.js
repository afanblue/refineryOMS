import React, {Component} from 'react';
import {SERVERROOT} from '../../Parameters.js';
import UserList from './lists/UserList.js';
import UserForm from './forms/UserForm.js';
import DefaultContents from './DefaultContents.js';
import Waiting from './Waiting.js';
import {User} from './objects/User.js';



class UserAdmin extends Component {
  constructor(props) {
    super(props);
    console.log( "UserAdmin: " + props.stage );
    this.state = {
      stage: props.stage,
      updateData: false,
      updateDisplay: true,
      returnedText: null,
      user: null
    };
    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.handleUserSelect = this.handleUserSelect.bind(this);
    this.handleUserUpdate = this.handleUserUpdate.bind(this);
    this.handleQuit       = this.handleQuit.bind(this);
  }
  
  handleErrors(response) {
    if (!response.ok) {
        throw Error(response.status+" ("+response.statusText+")");
    }
    return response;
  }

  componentWillReceiveProps(nextProps) {
    console.log( "UserAdmin.willRcvProps: " + nextProps.selected + ":"
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
    console.log( "UserAdmin.shouldUpdate? : (" + nextState.stage + ") " + (sts?"T":"F") );
    return sts;
  }


  handleUserSelect(event) {
    let now = new Date();
    console.log( "UserAdmin.userSelect " + now.toISOString() );
    const id = event.z;
    const myRequest=SERVERROOT + "/user/" + id;
    now = new Date();
    console.log( "UserAdmin.userSelect - Request: " + myRequest );
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
       console.log("UserAdmin.userSelect: Error - " + error);  
    });
  }

  handleUserUpdate(event) {
    event.preventDefault();
//    console.log("UserAdmin.handleUpdate: "+event);
    const id = this.state.user.id;
    console.log("UserAdmin.userUpdate: id="+id
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
        console.log("UserAdmin.userUpdate: Error - " + error);  
    });
  }

  componentDidMount() {
    console.log( "UserAdmin.didMount: " + this.state.stage );
    this.fetchList();
  }
  
  componentDidUpdate( prevProps, prevState ) {
    console.log( "UserAdmin.didUpdate: " + this.state.stage );
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
    this.setState({[name]: value, activity:"userInput" } );
  }
  
  fetchList() {
    console.log( "UserAdmin.fetchList : " + this.state.stage );
    const myRequest = SERVERROOT + "/user/all";
    const now = new Date();
    console.log( "UserAdmin.fetchList " + now.toISOString() + " Request: " + myRequest );
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
           console.log("UserAdmin.fetchList: JSON retrieved - " + json);
           this.setState( {returnedText: json, 
                           updateData: false, 
                           updateDisplay:true,
                           stage: "dataFetched" } );
        }).catch(function(e) { 
           alert("Problem retrieving user list\n"+e);
           const emsg = "UserAdmin.fetchList: Fetching user list " + e;
           console.log(emsg);
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
    console.log("UserAdmin.render - stage: "+this.state.stage);
    switch( this.state.stage ) {
  	  case "begin":
        return <Waiting />
      case "dataFetched":
        return <UserList returnedText = {this.state.returnedText}
                         userSelect = {this.handleUserSelect} />
      case "itemRetrieved":
        return <UserForm returnedText = {this.state.returnedText}
                         user         = {this.state.user}
                         userUpdate   = {this.handleUserUpdate}
                         fieldChange  = {this.handleFieldChange}
                         handleQuit   = {this.handleQuit}
               />
      default:
        return <DefaultContents />
    }
  }
}

export default UserAdmin;
