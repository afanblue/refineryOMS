import React, {Component} from 'react';
import {SERVERROOT} from '../../Parameters.js';
import ActiveAlarmList from './lists/ActiveAlarmList.js';
import DefaultContents from './DefaultContents.js';
import Waiting from './Waiting.js';

import {Alarm} from './objects/Alarm.js';
import {Tag}   from './objects/Tag.js';


class ActiveAlarms extends Component {
  constructor(props) {
    super(props);
    console.log( "ActiveAlarms: " + props.selected + ":" + props.option + "/" + props.stage );
    this.state = {
      stage: props.stage,
      updateData: false,
      updateDisplay: true,
      returnedText: null,
      alarmList: null,
      unitTimer: null
    };
    this.handleSelect = this.handleSelect.bind(this);
    this.handleQuit   = this.handleQuit.bind(this);
  }

  handleErrors(response) {
    if (!response.ok) {
        throw Error(response.status+" ("+response.statusText+")");
    }
    return response;
  }

  componentWillReceiveProps(nextProps) {
    console.log( "ActiveAlarms.willRcvProps: " + nextProps.stage );
    if( nextProps.stage !== this.state.stage )
    {
      this.setState({ stage: nextProps.stage,
                      updateData: true,
                      updateDisplay: false,
                      returnedText: null,
                      alarmList:null });
    }
  }

  shouldComponentUpdate(nextProps,nextState) {
    let sts = nextState.updateDisplay;
    console.log( "ActiveAlarms.shouldUpdate? : (" + nextState.stage + ") " + (sts?"T":"F") );
    return sts;
  }
  
  componentDidMount() {
    console.log( "ActiveAlarms.didMount: " + this.state.stage );
    this.fetchList();
    var myTimerID = setInterval(() => {this.fetchList(this.state.option)}, 60000 );
    this.setState( {unitTimer: myTimerID } );    
  }
  
  componentDidUpdate( prevProps, prevState ) {
    console.log( "ActiveAlarms.didUpdate: " + this.state.stage );
    switch (this.state.stage) {
      case "begin":
        break;
      default:
    }
  }
  
  componentWillUnmount() {
    console.log( "ActiveAlarms.willUnmount "+this.state.unitTimer);
    if( this.state.unitTimer !== null ) {
      clearInterval(this.state.unitTimer);
    }
  }
    
  fetchList() {
    console.log( "ActiveAlarms.fetchList : " + this.state.stage );
    const myRequest = SERVERROOT + "/alarm/active/all";
    const now = new Date();
    console.log( "ActiveAlarms.fetchList " + now.toISOString() + " Request: " + myRequest );
    if( myRequest !== null ) {
      fetch(myRequest,{
              method: 'GET',
              headers: {'Content-Type':'application/json',
                        'Cache-Control':'no-cache, no-store, max-age=0' }
           })
          .then(this.handleErrors)
          .then(response => {
            var contentType = response.headers.get("content-type");
            if(contentType && contentType.includes("application/json")) {
              return response.json();
            }
            throw new TypeError("ActiveAlarms(fetchList): response ("+contentType+") must be a JSON string");
        }).then(json => {
           console.log("ActiveAlarms.fetchList: JSON retrieved - " + json);
           var almList = [];
           json.map( function(n,x) { 
             var t = new Tag(n.alarmTag.id, n.alarmTag.name, n.alarmTag.description
                            ,n.alarmTag.tagTypeCode, n.alarmTag.tagTypeId
                            ,null, null, null, null, 'Y');
             var a = new Alarm(n.id,t,n.almOccurred,n.acknowledged,n.active,n.priority
                              ,n.alarmCode,n.color,n.message,n.value); 
             return almList.push( a ); 
           } );
           this.setState( {returnedText: json, 
                           updateData: false, 
                           updateDisplay:true,
                           stage: "dataFetched",
                           alarmList: almList } );
        }).catch(function(e) { 
           alert("Problem retrieving active alarm list\n"+e);
           const emsg = "ActiveAlarms.fetchList: Fetching active alarm list " + e;
           console.log(emsg);
      });
    }
  }
  
  handleSelect(event) {
//    event.preventDefault();
    const id = event.z;
    const myRequest = SERVERROOT + "/alarm/acknowledge/" + id;
    const now = new Date();
    console.log( "ActiveAlarms.handleSelect " + now.toISOString() + " Request: " + myRequest );
    if( myRequest !== null ) {
      fetch(myRequest, {method: 'PUT'} )
          .then(this.handleErrors)
          .then(response => {
            var contentType = response.headers.get("content-type");
            if(contentType && contentType.includes("application/json")) {
              return response.json();
            }
            throw new TypeError("ActiveAlarms.handleSelect: response ("+contentType+") must be a JSON string");
        }).then(json => {
           console.log("ActiveAlarms.handleSelect: JSON retrieved - " + json);
           this.fetchList()
        }).catch(function(e) { 
           alert("Problem acknowledging alarm\n"+e);
           const emsg = "ActiveAlarms.handleSelect: Acknowledging alarm " + e;
           console.log(emsg);
      });
    }
  }

  handleQuit(event) {
    event.preventDefault();
    this.fetchList();
  }


  render() {
    console.log("ActiveAlarms.render - stage: "+this.state.stage);
    switch( this.state.stage ) {
      case "begin":
        return <Waiting />
      case "dataFetched":
        return <ActiveAlarmList alarmList={this.state.alarmList}
                                handleSelect={this.handleSelect}
               />
      default:
        return <DefaultContents />
    }
  }
}

export default ActiveAlarms;
