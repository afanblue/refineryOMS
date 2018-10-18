import React, {Component} from 'react';
import {SERVERROOT}    from '../../Parameters.js';
import ActiveAlarmList from './lists/ActiveAlarmList.js';
import DefaultContents from './DefaultContents.js';
import Log             from '../requests/Log.js';
import Waiting         from './Waiting.js';

import {Alarm} from './objects/Alarm.js';
import {Tag}   from './objects/Tag.js';

/*************************************************************************
 * ActiveAdmin.js
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


class ActiveAlarms extends Component {
  constructor(props) {
    super(props);
    Log.info( "ActiveAlarms: " + props.selected + ":" + props.option + "/" + props.stage );
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
    Log.info( "ActiveAlarms.willRcvProps: " + nextProps.stage );
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
    Log.info( "ActiveAlarms.shouldUpdate? : (" + nextState.stage + ") " + (sts?"T":"F") );
    return sts;
  }
  
  componentDidMount() {
    Log.info( "ActiveAlarms.didMount: " + this.state.stage );
    this.fetchList();
    var myTimerID = setInterval(() => {this.fetchList(this.state.option)}, 60000 );
    this.setState( {unitTimer: myTimerID } );    
  }
  
  componentDidUpdate( prevProps, prevState ) {
    Log.info( "ActiveAlarms.didUpdate: " + this.state.stage );
    switch (this.state.stage) {
      case "begin":
        break;
      default:
    }
  }
  
  componentWillUnmount() {
    Log.info( "ActiveAlarms.willUnmount "+this.state.unitTimer);
    if( this.state.unitTimer !== null ) {
      clearInterval(this.state.unitTimer);
    }
  }
    
  fetchList() {
    Log.info( "ActiveAlarms.fetchList : " + this.state.stage );
    const myRequest = SERVERROOT + "/alarm/active/all";
    const now = new Date();
    Log.info( "ActiveAlarms.fetchList " + now.toISOString() + " Request: " + myRequest );
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
           Log.info("ActiveAlarms.fetchList: JSON retrieved - " + json);
           var almList = [];
           json.map( function(n,x) { 
             var t = new Tag( n.alarmTag.id, n.alarmTag.name, n.alarmTag.description
                            , n.alarmTag.tagTypeCode, n.alarmTag.tagTypeId, null
                            , null, null, null, null, 'Y');
             var a = new Alarm( n.id, t, n.almOccurred, n.acknowledged, n.active, n.priority
                              , n.alarmCode, n.color, n.message, n.value); 
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
           Log.error(emsg);
      });
    }
  }
  
  handleSelect(event) {
//    event.preventDefault();
    const id = event.z;
    const myRequest = SERVERROOT + "/alarm/acknowledge/" + id;
    const now = new Date();
    Log.info( "ActiveAlarms.handleSelect " + now.toISOString() + " Request: " + myRequest );
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
           Log.info("ActiveAlarms.handleSelect: JSON retrieved - " + json);
           this.fetchList()
        }).catch(function(e) { 
           alert("Problem acknowledging alarm\n"+e);
           const emsg = "ActiveAlarms.handleSelect: Acknowledging alarm " + e;
           Log.error(emsg);
      });
    }
  }

  handleQuit(event) {
    event.preventDefault();
    this.fetchList();
  }


  render() {
    Log.info("ActiveAlarms.render - stage: "+this.state.stage);
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
