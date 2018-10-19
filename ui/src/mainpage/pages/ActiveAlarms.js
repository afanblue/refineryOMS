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

import React, {Component} from 'react';
import {SERVERROOT}    from '../../Parameters.js';
import ActiveAlarmList from './lists/ActiveAlarmList.js';
import DefaultContents from './DefaultContents.js';
import Log             from '../requests/Log.js';
import Waiting         from './Waiting.js';

import {Alarm} from './objects/Alarm.js';
import {Tag}   from './objects/Tag.js';


class ActiveAlarms extends Component {
  constructor(props) {
    super(props);
    Log.info( props.selected + ":" + props.option + "/" + props.stage,"ActiveAlarms" );
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
    Log.info( nextProps.stage,"ActiveAlarms.willReceiveProps" );
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
    Log.info( (sts?"T":"F"),"ActiveAlarms.shouldUpdae" );
    return sts;
  }
  
  componentDidMount() {
    this.fetchList();
    var myTimerID = setInterval(() => {this.fetchList(this.state.option)}, 60000 );
    this.setState( {unitTimer: myTimerID } );    
  }
  
  componentDidUpdate( prevProps, prevState ) {
    switch (this.state.stage) {
      case "begin":
        break;
      default:
    }
  }
  
  componentWillUnmount() {
    if( this.state.unitTimer !== null ) {
      clearInterval(this.state.unitTimer);
    }
  }
    
  fetchList() {
    const myRequest = SERVERROOT + "/alarm/active/all";
    const now = new Date();
    Log.info( now.toISOString() + " Request: " + myRequest,"ActiveAlarms.fetchList" );
    if( myRequest !== null ) {
      const request = async () => {
        const response = await fetch(myRequest,{
              method: 'GET',
              headers: {'Content-Type':'application/json',
                        'Cache-Control':'no-cache, no-store, max-age=0' }
           });
        const json = await response.json();
        Log.info( "I/O complete ", "ActiveAlarms.fetchList" );
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
      }
      try {
        request();
      } catch( error ) {
        alert("Problem retrieving process unit list\n"+error);
        const emsg = "Fetching process unit list " + error;
        Log.error(emsg, "ActiveAlarms.fetchList");
      }
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
