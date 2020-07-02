/*************************************************************************
 * AlarmMsgAdmin.js
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
/* eslint-env node, browser, es6 */

import React, {Component} from 'react';
import PropTypes          from 'prop-types';

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

  static get propTypes() {
      return {
          stage: PropTypes.string
      }
  }

  handleErrors(response) {
    if (!response.ok) {
        throw Error(response.status+" ("+response.statusText+")");
    }
    return response;
  }

  static getDerivedStateFromProps(nextProps, state) {
	return state;
  }

  shouldComponentUpdate(nextProps,nextState) {
    let sts = nextState.updateDisplay;
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
  }

  handleMsgUpdate(event) {
    event.preventDefault();
    const clsMthd = "AlarmMsgAdmin.handleUpdate";
    const id = this.state.msg.id;
    let method = "PUT";
    let url = SERVERROOT + "/alarm/message/update";
    if( id === 0 ) {
      method = "POST";
      url = SERVERROOT + "/alarm/message/insert";
    }
    const b = JSON.stringify(this.state.msg);
    const request = async () => {
      try {
        const response = await fetch(url, {method:method, headers:{'Content-Type':'application/json'}, body: b});
        if( response.ok ) {
          alert("Alarm message update/insert complete for id="+id)
        } else {
          alert("Alarm message update/insert failed for id="+id+":  " + response.status);
        }
      } catch( error ) {
        alert("Problem "+(id===0?"inserting":"updating")+" transfer "
             +"id "+id+"\n"+error);
        Log.error("Error - " + error,clsMthd);
      }
    }
    request();
  }

  componentDidMount() {
    this.fetchList();
  }

//  componentDidUpdate( prevProps, prevState ) {
//  }

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
    let clsMthd = "AlarmMsgAdmin.fetchList";
    if( myRequest !== null ) {
      const request = async () => {
        try {
          const resp = await fetch(myRequest);
          const json = await resp.json();
          this.setState( {returnedText: json,
                          updateData: false,
                          updateDisplay:true,
                          stage: "dataFetched" } );
        } catch( e ) {
          alert("Problem getting selected alarm message list\n"+e);
          const emsg = "Fetching msg list " + e;
          Log.error(emsg,clsMthd);
        }
      }
      request();
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
