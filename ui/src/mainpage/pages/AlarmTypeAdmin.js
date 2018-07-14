import React, {Component} from 'react';
import {SERVERROOT}    from '../../Parameters.js';
import DefaultContents from './DefaultContents.js';
import Waiting         from './Waiting.js';
import {AlarmType}     from './objects/Alarm.js';
import AlarmTypeList   from './lists/AlarmTypeList.js';
import AlarmTypeForm   from './forms/AlarmTypeForm.js';


class AlarmTypeAdmin extends Component {
  constructor(props) {
    super(props);
    console.log( "AlarmTypeAdmin: " + props.stage );
    this.state = {
      stage: props.stage,
      updateData: false,
      updateDisplay: true,
      returnedText: null,
      type: null      
    };
    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.handleTypeSelect = this.handleTypeSelect.bind(this);
    this.handleTypeUpdate = this.handleTypeUpdate.bind(this);
    this.handleQuit       = this.handleQuit.bind(this);
  }
  
  handleErrors(response) {
    if (!response.ok) {
        throw Error(response.status+" ("+response.statusText+")");
    }
    return response;
  }

  handleTypeSelect(event) {
    const id = event.z;
    const myRequest=SERVERROOT + "/alarm/type/" + id;
    const now = new Date();
    console.log( "AlarmTypeAdmin.typeSelect: " + now.toISOString() + " Request: " + myRequest );
    fetch(myRequest)
      .then(this.handleErrors)
      .then(response => {
        var contentType = response.headers.get("Content-Type");
        if(contentType && contentType.includes("application/json")) {
          return response.json();
        }
        throw new TypeError("AlarmTypeAdmin.typeSelect: response ("+contentType+") must be a JSON string");
    }).then(json => {
       let atd = json;
       const at = new AlarmType(atd.id,atd.priority,atd.code,atd.alarmMsgId,atd.alarmMsg);
       this.setState({stage: "itemRetrieved",
                      updateDisplay: true,
                      returnedText: json,
                      type: at
                     });
    }).catch(function(error) { 
       alert("Problem selecting alarm type id "+id+"\n"+error);
       console.log("AlarmTypeAdmin.typeSelect: Error - " + error);  
    });
  }

  handleTypeUpdate(event) {
    event.preventDefault();
    const id = this.state.type.id;
    console.log("AlarmTypeAdmin.typeUpdate: (data) id="+id
               +", code:"+this.state.type.code);
    let method = "PUT";
    let url = "http://localhost:8080/oms/alarm/type/update";
    if( id === 0 ) {
      method = "POST";
      url = "http://localhost:8080/oms/alarm/type/insert";
    }
    const b = JSON.stringify(this.state.type);
    fetch(url, {
      method: method,
      headers: {'Content-Type':'application/json'},
      body: b
    }).then(this.handleErrors)
      .then(alert("Alarm Type updated") )
      .catch(function(error) { 
        alert("Problem updating alarm type id "+id+"\n"+error);
        console.log("AlarmMsgAdmin.msgUpdate: Error - " + error);  
    });
  }
  
  
  handleFieldChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    let tnew = Object.assign({},this.state.type);
    const field = name;
    tnew[field] = value;
    this.setState({type: tnew } );
  }

  fetchList() {
    console.log( "AlarmTypeAdmin.fetchList : " + this.state.stage );
    const myRequest = SERVERROOT + "/alarm/type/all";
    const now = new Date();
    console.log( "AlarmTypeAdmin.fetchList " + now.toISOString() + " Request: " + myRequest );
    if( myRequest !== null ) {
      fetch(myRequest)
          .then(this.handleErrors)
          .then(response => {
            var contentType = response.headers.get("content-type");
            if(contentType && contentType.includes("application/json")) {
              return response.json();
            }
            throw new TypeError("AlarmTypeAdmin(fetchList): response ("+contentType+") must be a JSON string");
        }).then(json => {
           console.log("AlarmTypeAdmin.fetchList: JSON retrieved - " + json);
           this.setState( {returnedText: json, 
                           updateData: false, 
                           updateDisplay:true,
                           stage: "dataFetched" } );
        }).catch(function(e) { 
           alert("Problem retrieving alarm type list\n"+e);
           const emsg = "AlarmTypeAdmin.fetchList: Fetching user list " + e;
           console.log(emsg);
      });
    }
  }


  componentDidUpdate( prevProps, prevState ) {
    console.log( "AlarmTypeAdmin.didUpdate: updated? " + (this.state.updated?"T":"F") );
    if( this.state.updateData ) {
      this.fetchList();
    }
  }
  
  componentDidMount() {
    console.log( "AlarmTypeAdmin.didMount: " + this.state.stage );
    this.fetchList();
  }
  
  handleQuit(event) {
    event.preventDefault();
    this.fetchList();
    this.setState( {returnedText: null, 
                    updateData: true, 
                    updateDisplay:true,
                    type: null,
                    stage: "begin" } );
  }

  render() {
    console.log("AlarmTypeAdmin (render) - stage: "+this.state.stage);
    switch( this.state.stage ) {
      case "begin":
        return <Waiting />
      case "dataFetched":
        return <AlarmTypeList typeData = {this.state.returnedText}
                              typeSelect = {this.handleTypeSelect} />
      case "itemRetrieved":
        return <AlarmTypeForm typeData    = {this.state.returnedText}
                              type        = {this.state.type}
                              handleQuit  = {this.handleQuit}
                              typeUpdate  = {this.handleTypeUpdate}
                              fieldChange = {this.handleFieldChange} />
      default:
        return <DefaultContents />
    }
  }
}

export default AlarmTypeAdmin;
