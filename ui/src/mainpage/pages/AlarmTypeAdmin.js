/*************************************************************************
 * AlarmTypeAdmin.js
 * Copyright (C) 2018  Laboratorio de Lobo Azul
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
import OMSRequest      from '../requests/OMSRequest.js';
import DefaultContents from './DefaultContents.js';
import Waiting         from './Waiting.js';
import {AlarmType}     from './objects/Alarm.js';
import AlarmTypeList   from './lists/AlarmTypeList.js';
import AlarmTypeForm   from './forms/AlarmTypeForm.js';


class AlarmTypeAdmin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stage: props.stage,
      updateData: false,
      updateDisplay: true,
      msgs: null,
      type: null      
    };
    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.handleTypeSelect = this.handleTypeSelect.bind(this);
    this.handleTypeUpdate = this.handleTypeUpdate.bind(this);
    this.finishATfetch    = this.finishATfetch.bind(this);
    this.finishMsgsFetch  = this.finishMsgsFetch.bind(this);
    this.handleQuit       = this.handleQuit.bind(this);
  }
  
  handleErrors(response) {
    if (!response.ok) {
        throw Error(response.status+" ("+response.statusText+")");
    }
    return response;
  }

/* */
  finishATfetch( req ) {
    let atd = req;
    const at = new AlarmType(atd.id,atd.priority,atd.code,atd.alarmMsgId,atd.alarmMsg);
    this.setState({stage: "itemRetrieved",
                   updateDisplay: false,
                   type: at
                  });
  }
  
  finishMsgsFetch(req) {
    let msgs = req;
    this.setState({stage: "itemRetrieved",
                   updateDisplay: true,
                   msgs: msgs
                  });
  }
  
  handleTypeSelect(event) {
    const id = event.z;
    const loc = "AlarmTypeAdmin.typeSelect";
    let req0 = new OMSRequest(loc, SERVERROOT + "/alarm/type/" + id,
                            "Problem selecting alarm type id "+id, this.finishATfetch);
    req0.fetchData();
    let req1 = new OMSRequest(loc, SERVERROOT + "/alarm/message/all",
                            "Problem retrieving alarm messages", this.finishMsgsFetch);
    req1.fetchData();
  }

  handleTypeUpdate(event) {
    event.preventDefault();
    const id = this.state.type.id;
    const clsMthd = "AlarmTypeAdmin.typeUpdate";
    let method = "PUT";
    let url = SERVERROOT + "/alarm/type/update";
    if( id === 0 ) {
      method = "POST";
      url = SERVERROOT + "/alarm/type/insert";
    }
    const b = JSON.stringify(this.state.type);
    const request = async () => {
      try {
        await fetch(url, {method:method, headers:{'Content-Type':'application/json'}, body: b});
        alert("Update/insert complete on alarm type # "+id)
      } catch( error ) {
        alert("Problem updating alarm type id "+id+"\n"+error);
        Log.error("Error - " + error,clsMthd);  
      }
    }
    request();
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
    const clsMthd = "AlarmTypeAdmin.fetchList";
    const myRequest = SERVERROOT + "/alarm/type/all";
    if( myRequest !== null ) {
      const request = async () => {
        try {
          const response = await fetch(myRequest);
          const json = await response.json();
          this.setState( {returnedText: json, 
                          updateData: false, 
                          updateDisplay:true,
                          stage: "dataFetched" } );
        } catch( e ) {
          alert("Problem retrieving alarm type list\n"+e);
          const emsg = "Fetching user list " + e;
          Log.error(emsg,clsMthd);
        }
      }
      request();
    }
  }


  componentDidUpdate( prevProps, prevState ) {
    if( this.state.updateData ) {
      this.fetchList();
    }
  }
  
  componentDidMount() {
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
    switch( this.state.stage ) {
      case "begin":
        return <Waiting />
      case "dataFetched":
        return <AlarmTypeList typeData = {this.state.returnedText}
                                typeSelect = {this.handleTypeSelect} />
      case "itemRetrieved":
        if( (this.state.type === null) || (this.state.msgs === null) ) {
          return <Waiting />
        } else {
          return <AlarmTypeForm msgs        = {this.state.msgs}
                                type        = {this.state.type}
                                handleQuit  = {this.handleQuit}
                                typeUpdate  = {this.handleTypeUpdate}
                                fieldChange = {this.handleFieldChange} />
        }
      default:
        return <DefaultContents />
    }
  }
}

export default AlarmTypeAdmin;
