import React, {Component} from 'react';

import {AlarmMsg} from './objects/Alarm.js';
import {SERVERROOT} from '../../Parameters.js';
import AlarmMsgForm from './forms/AlarmMsgForm.js';
import AlarmMsgList from './lists/AlarmMsgList.js';
import DefaultContents from './DefaultContents.js';
import Waiting from './Waiting.js';


class AlarmMsgAdmin extends Component {
  constructor(props) {
    super(props);
    console.log( "AlarmMsgAdmin: " + props.stage );
    this.state = {
      stage: props.stage,
      updateData: false,
      updateDisplay: true,
      returnedText: null,
      alarmType: null
    };
    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.handleMsgSelect = this.handleMsgSelect.bind(this);
    this.handleMsgUpdate = this.handleMsgUpdate.bind(this);
    this.handleQuit = this.handleQuit.bind(this);
  }
  
  handleErrors(response) {
    if (!response.ok) {
        throw Error(response.status+" ("+response.statusText+")");
    }
    return response;
  }

  componentWillReceiveProps(nextProps) {
    console.log( "AlarmMsgAdmin.willRcvProps: " + nextProps.stage );
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
    console.log( "AlarmMsgAdmin.shouldUpdate? : (" + nextState.stage + ") " + (sts?"T":"F") );
    return sts;
  }


  handleMsgSelect(event) {
    let now = new Date();
    console.log( "AlarmMsgAdmin.msgSelect " + now.toISOString() );
    const id = event.z;
    const myRequest=SERVERROOT + "/alarm/message/"+id;
    now = new Date();
    console.log( "AlarmMsgAdmin.msgSelect - Request: " + myRequest );
    fetch(myRequest)
      .then(this.handleErrors)
      .then(response => {
        var contentType = response.headers.get("Content-Type");
        if(contentType && contentType.includes("application/json")) {
          return response.json();
        }
        throw new TypeError("AlarmMsgAdmin.msgSelect: response ("+contentType+") must be a JSON string");
    }).then(json => {
       let amd = json;
       const am = new AlarmMsg(amd.id,amd.abbr,amd.message);
       this.setState({stage: "itemRetrieved",
                      updateDisplay: true,
                      updateData: false,
                      returnedText: json,
                      msg: am                   
                     });
    }).catch(function(error) { 
       alert("Problem getting selected alarm message id = "+id+"\n"+error);
       console.log("AlarmMsgAdmin.msgSelect: Error - " + error);  
    });
  }

  handleMsgUpdate(event) {
    event.preventDefault();
//    console.log("AlarmMsgAdmin.handleUpdate: "+event);
    const id = this.state.msg.id;
    console.log("AlarmMsgAdmin.msgUpdate: (data) id="+id
               +", abbr:"+this.state.msg.abbr);
    let method = "PUT";
    let url = "http://localhost:8080/oms/alarm/message/update";
    if( id === 0 ) {
      method = "POST";
      url = "http://localhost:8080/oms/alarm/message/insert";
    }
    const b = JSON.stringify(this.state.msg);
    fetch(url, {
      method: method,
      headers: {'Content-Type':'application/json'},
      body: b
    })
    .then(this.handleErrors)
    .then(alert("Alarm message updated") )
    .catch(function(error) { 
       alert("Problem "+(method==="PUT"?"updating":"inserting")
             +" alarm message\n"+error);
       console.log("AlarmMsgAdmin.msgUpdate: Error - " + error);  
    });
  }
  
  componentDidMount() {
    console.log( "AlarmMsgAdmin.didMount: " + this.state.stage );
    this.fetchList();
  }
  
  componentDidUpdate( prevProps, prevState ) {
    console.log( "AlarmMsgAdmin.didUpdate: " + this.state.stage );
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
    let msgnew = Object.assign({},this.state.msg);
    const field = name;
    msgnew[field] = value;
    this.setState({msg: msgnew } );
  }
  
  fetchList() {
    console.log( "AlarmMsgAdmin.fetchList : " + this.state.stage );
    const myRequest = SERVERROOT + "/alarm/message/all";
    const now = new Date();
    console.log( "AlarmMsgAdmin.fetchList " + now.toISOString() + " Request: " + myRequest );
    if( myRequest !== null ) {
      fetch(myRequest)
          .then(this.handleErrors)
          .then(response => {
            var contentType = response.headers.get("content-type");
            if(contentType && contentType.includes("application/json")) {
              return response.json();
            }
            throw new TypeError("AlarmMsgAdmin(fetchList): response ("+contentType+") must be a JSON string");
        }).then(json => {
           console.log("AlarmMsgAdmin.fetchList: JSON retrieved - " + json);
           this.setState( {returnedText: json, 
                           updateData: false, 
                           updateDisplay:true,
                           stage: "dataFetched" } );
        }).catch(function(e) { 
           alert("Problem getting selected alarm message list\n"+e);
           const emsg = "AlarmMsgAdmin.fetchList: Fetching msg list " + e;
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
                    msg: null,
                    stage: "begin" } );
  }

  render() {
    console.log("AlarmMsgAdmin (render) - stage: "+this.state.stage);
    switch( this.state.stage ) {
      case "begin":
        return <Waiting />;
      case "dataFetched":
        return <AlarmMsgList msgData = {this.state.returnedText}
                             msgSelect = {this.handleMsgSelect} />
      case "itemRetrieved":
        return <AlarmMsgForm msgData = {this.state.returnedText}
                             msg = {this.state.msg}
                             msgUpdate = {this.handleMsgUpdate}
                             handleQuit = {this.handleQuit}
                             fieldChange = {this.handleFieldChange} />
      default:
        return <DefaultContents />
    }
  }
}

export default AlarmMsgAdmin;
