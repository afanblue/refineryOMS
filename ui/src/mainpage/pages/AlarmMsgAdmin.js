/*************************************************************************
 * AlarmMsgAdmin.js
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

import {AlarmMsg}      from './objects/Alarm.js';
import {SERVERROOT}    from '../../Parameters.js';
import AlarmMsgForm    from './forms/AlarmMsgForm.js';
import AlarmMsgList    from './lists/AlarmMsgList.js';
import DefaultContents from './DefaultContents.js';
import Log             from '../requests/Log.js';
import OMSRequest      from '../requests/OMSRequest.js';
import Waiting         from './Waiting.js';


class AlarmMsgAdmin extends Component {
  constructor(props) {
    super(props);
    Log.info( "AlarmMsgAdmin: " + props.stage );
    this.state = {
      stage: props.stage,
      updateData: false,
      updateDisplay: true,
      types: null,
      msg: null
    };
    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.handleMsgSelect   = this.handleMsgSelect.bind(this);
    this.handleMsgUpdate   = this.handleMsgUpdate.bind(this);
    this.finishMsgFetch    = this.finishMsgFetch.bind(this);
    this.finishTypesFetch  = this.finishTypesFetch.bind(this);
    this.handleQuit        = this.handleQuit.bind(this);
  }
  
  handleErrors(response) {
    if (!response.ok) {
        throw Error(response.status+" ("+response.statusText+")");
    }
    return response;
  }

  componentWillReceiveProps(nextProps) {
    Log.info( "AlarmMsgAdmin.willRcvProps: " + nextProps.stage );
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
    Log.info( "AlarmMsgAdmin.shouldUpdate? : (" + nextState.stage + ") " + (sts?"T":"F") );
    return sts;
  }

/* */
  finishMsgFetch( req ) {
    let amd = req;
    const am = new AlarmMsg(amd.id,amd.abbr,amd.message);
    this.setState({stage: "itemRetrieved", msg: am });
  }
  
  finishTypesFetch(req) {
    let types = req;
    this.setState({stage: "itemRetrieved", types: types });
  }
  
  handleMsgSelect(event) {
    const id = event.z;
    const loc = "AlarmMsgAdmin.typeSelect";
    let req0 = new OMSRequest(loc, SERVERROOT + "/alarm/message/" + id,
                            "Problem selecting alarm message id "+id, this.finishMsgFetch);
    req0.fetchData();
    let req1 = new OMSRequest(loc, SERVERROOT + "/alarm/type/all",
                            "Problem retrieving alarm types", this.finishTypesFetch);
    req1.fetchData();
//    Log.info( "req0.uri="+req0.uri + " <-> req1.uri="+req1.uri);
//    Log.info( "req0.erm="+req0.errMsg + " <-> req1.erm="+req1.errMsg);
  }

  handleMsgUpdate(event) {
    event.preventDefault();
//    Log.info("AlarmMsgAdmin.handleUpdate: "+event);
    const clsMthd = "AlarmMsgAdmin.handleUpdate";
    const id = this.state.msg.id;
    Log.info("(data) id="+id+", abbr:"+this.state.msg.abbr,clsMthd);
    let method = "PUT";
    let url = "http://localhost:8080/oms/alarm/message/update";
    if( id === 0 ) {
      method = "POST";
      url = "http://localhost:8080/oms/alarm/message/insert";
    }
    const b = JSON.stringify(this.state.msg);
    const request = async () => {
      await fetch(url, {method:method, headers:{'Content-Type':'application/json'}, body: b});
      alert("Update/insert complete on message # "+id)
      Log.info( "update complete",clsMthd );
    }
    try {
      request();
    } catch( error ) {
      alert("Problem "+(id===0?"inserting":"updating")+" transfer "
           +"id "+id+"\n"+error);
      Log.error("Error - " + error,clsMthd);
    }
  }
  
  componentDidMount() {
    Log.info( "AlarmMsgAdmin.didMount: " + this.state.stage );
    this.fetchList();
  }
  
  componentDidUpdate( prevProps, prevState ) {
    Log.info( "AlarmMsgAdmin.didUpdate: " + this.state.stage );
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
    const myRequest = SERVERROOT + "/alarm/message/all";
    const now = new Date();
    let clsMthd = "AlarmMsgAdmin.fetchList";
    Log.info( now.toISOString() + " Request: " + myRequest,clsMthd );
    if( myRequest !== null ) {
      const request = async () => {
        const resp = await fetch(myRequest);
        const json = await resp.json();
        this.setState( {returnedText: json, 
                        updateData: false, 
                        updateDisplay:true,
                        stage: "dataFetched" } );
      }
      try {
        request();
      } catch( e ) {
        alert("Problem getting selected alarm message list\n"+e);
        const emsg = "Fetching msg list " + e;
        Log.error(emsg,clsMthd);
      }
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
    Log.info("AlarmMsgAdmin (render) - stage: "+this.state.stage);
    switch( this.state.stage ) {
      case "begin":
        return <Waiting />;
      case "dataFetched":
        return <AlarmMsgList msgData = {this.state.returnedText}
                             msgSelect = {this.handleMsgSelect} />
      case "itemRetrieved":
        if( (this.state.msg === null) || (this.state.types === null) ) {
          return <Waiting />
        } else {
          return <AlarmMsgForm types = {this.state.types}
                               msg = {this.state.msg}
                               msgUpdate = {this.handleMsgUpdate}
                               handleQuit = {this.handleQuit}
                               fieldChange = {this.handleFieldChange} />
        }
      default:
        return <DefaultContents />
    }
  }
}

export default AlarmMsgAdmin;
