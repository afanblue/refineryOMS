/*************************************************************************
 * Last7DaysTransfers.js
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
import Last7DaysTransferList from './lists/Last7TransferList.js';
import DefaultContents from './DefaultContents.js';
import TransferForm    from './forms/TransferForm.js';
import Waiting         from './Waiting.js';
import {Transfer}      from './objects/Transfer.js';


/*
{"id":177,"name":"DCTK-A101","api":32.6,"density":0.862,"height":25.0,"diameter":30.0
,"units":"f","c1Lat":39.58405,"c1Long":-75.62484,"c2Lat":null,"c2Long":null
,"contentType":"Asphalt","contentTypeCode":"A","state":"Y","tempTag":null,"levelTag":null},
*/


class Last7DaysTransfers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stage: props.stage,
      updateData: false,
      updateDisplay: true,
      returnedText: null,
      transfer: null,
      transferTypes: null,
      statuses: null,
      sources: null,
      color: "green"
    };
    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.handleSelect      = this.handleSelect.bind(this);
    this.handleTransferUpdate  = this.handleTransferUpdate.bind(this);
    this.handleQuit        = this.handleQuit.bind(this);
    this.handleClick       = this.handleClick.bind(this);
    this.finishXferFetch   = this.finishXferFetch.bind(this);
    this.finishTypesFetch  = this.finishTypesFetch.bind(this);
    this.finishStsFetch    = this.finishStsFetch.bind(this);
    this.finishSrcsFetch   = this.finishSrcsFetch.bind(this);
  }
  
  handleErrors(response) {
    if (!response.ok) {
        throw Error(response.status+" ("+response.statusText+")");
    }
    return response;
  }

  componentWillReceiveProps(nextProps) {
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
    return sts;
  }
  
  finishXferFetch( req ) {
    let xd = req;
    var x = new Transfer( xd.id,xd.name,xd.statusId,xd.source
                        , xd.transferTypeId,xd.transferType
                        , xd.sourceId,xd.source,xd.destinationId, xd.destination
                        , xd.expStartTime,xd.expEndTime,xd.expVolume
                        , xd.actStartTime,xd.actEndTime,xd.actVolume,xd.delta);
    this.setState({stage: "itemRetrieved",
                   updateDisplay: true,
                   updateData: false,
                   transfer: x
                  });
  }
  
  finishTypesFetch(req) {
    this.setState({stage: "itemRetrieved", updateDisplay: true, transferTypes:req });
  }
  
  finishStsFetch(req) {
    this.setState({stage: "itemRetrieved", updateDisplay: true, statuses: req });
  }

  finishSrcsFetch(req) {
    this.setState({stage: "itemRetrieved", updateDisplay: true, sources: req });
  }

  
  fetchFormData(id) {
    const loc = "Last7DaysTransfers.select";
    let myRequest = SERVERROOT + "/transfer/" + id;
    let req0 = new OMSRequest(loc, myRequest, 
                            "Problem selecting transfer "+myRequest,
                            this.finishXferFetch);
    req0.fetchData();
    let req2 = new OMSRequest(loc, SERVERROOT + "/tag/types/TK,RU,S,TC,TT,PU",
                            "Problem retrieving type list ", this.finishSrcsFetch);
    req2.fetchData();
    let req3 = new OMSRequest(loc, SERVERROOT + "/transfer/types",
                            "Problem retrieving input tag list", this.finishTypesFetch);
    req3.fetchData();
    this.setState({schematic:null, sco:null, typeList:null, inpTags:null})    
    let req4 = new OMSRequest(loc, SERVERROOT + "/transfer/statuses",
                            "Problem retrieving output tag list", this.finishStsFetch);
    req4.fetchData();
    this.setState({schematic:null, sco:null, typeList:null, outTags:null})    
  }
  
  handleSelect(event) {
    const id = event.z;
    this.fetchFormData(id);
  }



  validateForm( x ) {
    let doSubmit = true;
    let msg = "The following Fields ";
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
      const clsMthd = "Last7DaysTransfers.transferUpdate";
      let method = "PUT";
      let url = SERVERROOT + "/transfer/update";
      if( id === 0 ) {
        method = "POST";
        url = SERVERROOT + "/transfer/insert";
      }
      var b = JSON.stringify( this.state.transfer );
      const request = async () => {
        try {
          await fetch(url, {method:method, headers:{'Content-Type':'application/json'}, body: b});
          alert("Update/insert complete on "+this.state.transfer.name)
        } catch( error ) {
          alert("Problem "+(id===0?"inserting":"updating")+" transfer "
               +"id "+id+"\n"+error);
          Log.error("Error - " + error,clsMthd);
        }
      }
      request();
    }
  }
  
  componentDidMount() {
    this.fetchList();
  }
    
  componentDidUpdate( prevProps, prevState ) {
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
    let clsMthd = "Last7DaysTransfers.fetchList";
    const myRequest = SERVERROOT + "/transfer/last/7";
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
          alert("Problem fetching last 7 days list\n"+e);
          Log.error("Error - " + e, clsMthd);        
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
                    transfer: null,
                    stage: "begin" } );
  }

  render() {
    switch( this.state.stage ) {
  	  case "begin":
        return <Waiting />
      case "dataFetched":
        return <Last7DaysTransferList transferData = {this.state.returnedText}
                                      transferSelect = {this.handleSelect}
                                      handleQuit = {this.handleQuit}
               />
      case "itemRetrieved":
        if( (this.state.transfer === null) || (this.state.transferTypes === null) || 
            (this.state.sources  === null) || (this.state.statuses === null)    ) {
          return <Waiting />
        } else {
          return <TransferForm transferData = {this.state.returnedText}
                               transfer     = {this.state.transfer}
                               transferTypes= {this.state.transferTypes}
                               statuses     = {this.state.statuses}
                               sources      = {this.state.sources}
                               transferUpdate = {this.handleTransferUpdate}
                               fieldChange  = {this.handleFieldChange}
                               handleQuit   = {this.handleQuit}
                               handleClick  = {this.handleClick}
                 />
        }
      default:
        return <DefaultContents />
    }
  }
}

export default Last7DaysTransfers;
