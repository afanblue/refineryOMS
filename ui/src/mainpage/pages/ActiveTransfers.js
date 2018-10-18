import React, {Component} from 'react';
import {SERVERROOT}       from '../../Parameters.js';
import ActiveTransferList from './lists/ActiveTransferList.js';
import DefaultContents    from './DefaultContents.js';
import Log                from '../requests/Log.js';
import TransferForm       from './forms/TransferForm.js';
import Waiting            from './Waiting.js';
import {Transfer}         from './objects/Transfer.js';

/*************************************************************************
 * ActiveTransfers.js
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

/*
{"id":177,"name":"DCTK-A101","api":32.6,"density":0.862,"height":25.0,"diameter":30.0
,"units":"f","c1Lat":39.58405,"c1Long":-75.62484,"c2Lat":null,"c2Long":null
,"contentType":"Asphalt","contentTypeCode":"A","state":"Y","tempTag":null,"levelTag":null},
*/


class ActiveTransfers extends Component {
  constructor(props) {
    super(props);
    Log.info( "ActiveTransfers: " + props.stage );
    this.state = {
      stage: props.stage,
      updateData: false,
      updateDisplay: true,
      returnedText: null,
      transfer: null,
      unitTimer: null
    };
    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.handleTransferSelect  = this.handleTransferSelect.bind(this);
    this.handleTransferUpdate  = this.handleTransferUpdate.bind(this);
    this.handleQuit        = this.handleQuit.bind(this);
    this.handleClick       = this.handleClick.bind(this);
  }
  
  handleErrors(response) {
    if (!response.ok) {
        throw Error(response.status+" ("+response.statusText+")");
    }
    return response;
  }

  componentWillReceiveProps(nextProps) {
    Log.info( "ActiveTransfers.willRcvProps: " + nextProps.selected + ":"
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
    Log.info( "ActiveTransfers.shouldUpdate? : (" + nextState.stage + ") " + (sts?"T":"F") );
    return sts;
  }
  
  handleTransferSelect(event) {
    let now = new Date();
    Log.info( "ActiveTransfers.transferSelect " + now.toISOString() );
    const id = event.z;
    const myRequest=SERVERROOT + "/transfer/" + id;
    now = new Date();
    Log.info( "ActiveTransfers.transferSelect - Request: " + myRequest );
    fetch(myRequest)
      .then(this.handleErrors)
      .then(response => {
        var contentType = response.headers.get("Content-Type");
        if(contentType && contentType.includes("application/json")) {
          return response.json();
        }
        throw new TypeError("ActiveTransfers.transferSelect: response ("+contentType+") must be a JSON string");
    }).then(json => {
       if( this.state.unitTimer !== null ) {
         clearInterval(this.state.unitTimer);
       }
       let ud = json;
       var x = new Transfer(ud.id,ud.name,ud.statusId,ud.source
                           ,ud.transferTypeId,ud.transferType
                           ,ud.sourceId,ud.source,ud.destinationId, ud.destination
                           ,ud.expStartTime,ud.expEndTime,ud.expVolume
                           ,ud.actStartTime,ud.actEndTime,ud.actVolume,ud.delta);
       this.setState({stage: "itemRetrieved",
                      updateDisplay: true,
                      updateData: false,
                      returnedText: json,
                      transfer: x,
                      unitTimer:null
                     });
    }).catch(function(error) { 
       alert("Problem selecting transfer id "+id+"\n"+error);
       Log.error("ActiveTransfers.transferSelect: Error - " + error);  
    });
  }

  validateForm( x ) {
    let doSubmit = true;
    let msg = "The following fields ";
    if( x.statusId === 0 ) {
        doSubmit = false;
        msg += "transfer status, ";
    }
    if(x.transferTypeId === 0) {
        doSubmit = false;
        msg = "transfer type, ";
    }
    if(x.sourceId === 0) {
        doSubmit = false;
        msg = "transfer source, ";
    }
    if(x.destinationId === 0) {
        doSubmit = false;
        msg = "transfer destination ";
    }
    if( ! doSubmit ) {
      msg += " must be selected!";
      alert(msg);
    }
    return doSubmit;
  }

  handleTransferUpdate(event) {
    event.preventDefault();
    let x = this.state.transfer;
    let doSubmit = this.validateForm(x);
    if( doSubmit ) {
      const id = this.state.transfer.id;
      Log.info("ActiveTransfers.transferUpdate: (data) id="+id
                 +", name:"+this.state.transfer.name);
      let method = "PUT";
      let url = SERVERROOT + "/transfer/update";
      if( id === 0 ) {
        method = "POST";
        url = SERVERROOT + "/transfer/insert";
      }
//      let tt = new Date(x.expStartTime);
//      x.expStartTime = tt;
//      tt = new Date(x.expEndTime);
//      x.expEndTime = tt;
      var b = JSON.stringify( this.state.transfer );
      fetch(url, {
        method: method,
        headers: {'Content-Type':'application/json'},
        body: b
      }).then(this.handleErrors)
        .catch(function(error) { 
          alert("Problm "+(id===0?"inserting":"updating")+" transfer "
               +"id "+id+"\n"+error);
          Log.error("ActiveTransfers.transferUpdate: Error - " + error);  
      });
    }
  }
  
  componentDidMount() {
    Log.info( "ActiveTransfers.didMount: " + this.state.stage );
    var myTimerID = setInterval(() => {this.fetchList()}, 60000 );
    this.fetchList();
    this.setState({unitTimer:myTimerID});
  }
    
  componentDidUpdate( prevProps, prevState ) {
    Log.info( "ActiveTransfers.didUpdate: " + this.state.stage );
  }

  handleClick() {
    
  };
  
  handleFieldChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    let np = name.split(".");
    let tknew = Object.assign({},this.state.transfer);
    if( np.length === 1 ) {
        const field = np[0];
        tknew[field] = value;
    } else {
        const field = np[1];
        tknew.tag[field] = value;
    }
    this.setState({transfer: tknew } );
  }
  
 
  fetchList() {
    Log.info( "ActiveTransfers.fetchList : " + this.state.stage );
    const myRequest = SERVERROOT + "/transfer/active";
    const now = new Date();
    Log.info( "ActiveTransfers.fetchList " + now.toISOString() + " Request: " + myRequest );
    if( myRequest !== null ) {
      fetch(myRequest)
          .then(this.handleErrors)
          .then(response => {
            var contentType = response.headers.get("content-type");
            if(contentType && contentType.includes("application/json")) {
              return response.json();
            }
            throw new TypeError("ActiveTransfers(fetchList): response ("+contentType+") must be a JSON string");
        }).then(json => {
           Log.info("ActiveTransfers.fetchList: JSON retrieved - " + json);
           this.setState( {returnedText: json, 
                           updateData: false, 
                           updateDisplay:true,
                           stage: "dataFetched" } );
        }).catch(function(e) { 
           alert("Problem retrieving transfer list\n"+e);
           const emsg = "ActiveTransfers.fetchList: Fetching transfer list " + e;
           Log.error(emsg);
      });
    }
  }

  handleQuit(event) {
    event.preventDefault();
    var myTimerID = setInterval(() => {this.fetchList()}, 60000 );
    this.fetchList();
    this.setState( {returnedText: null, 
                    updateData: true, 
                    updateDisplay:true,
                    transfer: null,
                    stage: "begin",
                    unitTimer:myTimerID});
  }

  componentWillUnmount() {
    Log.info( "ActiveTransfers.willUnmount "+this.state.unitTimer);
    if( this.state.unitTimer !== null ) {
      clearInterval(this.state.unitTimer);
    }
  }
  

  render() {
    Log.info("ActiveTransfers (render) - stage: "+this.state.stage);
    switch( this.state.stage ) {
  	  case "begin":
        return <Waiting />
      case "dataFetched":
        return <ActiveTransferList transferData = {this.state.returnedText}
                                   transferSelect = {this.handleTransferSelect}
                                   handleQuit = {this.handleQuit}
               />
      case "itemRetrieved":
        return <TransferForm transferData = {this.state.returnedText}
                             transfer     = {this.state.transfer}
                             transferUpdate = {this.handleTransferUpdate}
                             fieldChange = {this.handleFieldChange}
                             handleQuit = {this.handleQuit}
                             handleClick = {this.handleClick}
               />
      default:
        return <DefaultContents />
    }
  }
}

export default ActiveTransfers;
