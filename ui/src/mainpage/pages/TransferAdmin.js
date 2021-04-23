/*************************************************************************
 * TransferAdmin.js
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
import moment             from 'moment';

import {SERVERROOT}    from '../../Parameters.js';
import OMSRequest      from '../requests/OMSRequest.js';
import DefaultContents from './DefaultContents.js';
import Log             from '../requests/Log.js';
import TransferForm    from './forms/TransferForm.js';
import TransferList    from './lists/TransferList.js';
import Waiting         from './Waiting.js';
import {Transfer}      from './objects/Transfer.js';


/*
{"id":177,"name":"DCTK-A101","api":32.6,"density":0.862,"height":25.0,"diameter":30.0
,"units":"f","c1Lat":39.58405,"c1Long":-75.62484,"c2Lat":null,"c2Long":null
,"contentType":"Asphalt","contentTypeCode":"A","state":"Y","tempTag":null,"levelTag":null},
*/


class TransferAdmin extends Component {
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
      color: "green",
      type: "B",
      myTimerID: null
    };
    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.handleCopy        = this.handleCopy.bind(this);
    this.handleSelect      = this.handleSelect.bind(this);
    this.handleUpdate      = this.handleUpdate.bind(this);
    this.handleQuit        = this.handleQuit.bind(this);
    this.handleClick       = this.handleClick.bind(this);
    this.finishXferFetch   = this.finishXferFetch.bind(this);
    this.finishTypesFetch  = this.finishTypesFetch.bind(this);
    this.finishStsFetch    = this.finishStsFetch.bind(this);
    this.finishSrcsFetch   = this.finishSrcsFetch.bind(this);
  }

  static get propTypes() {
      return {
          stage: PropTypes.string,
          type: PropTypes.string
      }
  }

  handleErrors(response) {
    if (!response.ok) {
        throw Error(response.status+" ("+response.statusText+")");
    }
    return response;
  }

  static getDerivedStateFromProps(nextProps,prevState) {
    return prevState;
  }

  shouldComponentUpdate(nextProps,nextState) {
    Log.info("xfrAdmin-shouldComponentUpdate - type: "+this.state.type+"/"+nextState.type+"/"+nextProps.type
            +" - "+nextState.myTimerID+"/"+this.state.myTimerID);
    let sts = nextState.updateDisplay;
    if( nextState.stage !== this.state.stage ) { sts = true; }
    if( nextProps.type  !== nextState.type  ) {
      sts = true;
      this.fetchList(nextProps.type);
      if( nextProps.type === 'A' ) {
        if( (this.state.myTimerID === null) && (nextState.myTimerID === null) ) {
          var timerID = setInterval(() => {this.fetchList(nextProps.type)}, 60000 );
          this.setState( {myTimerID: timerID, type:nextProps.type } );
        }
      } else {
        clearInterval(this.state.myTimerID);
        this.setState({myTimerID: null, type:nextProps.type });
      }
    }
    return sts;
  }

  componentWillUnmount() {
    if( this.state.myTimerID !== null ) {
      clearInterval(this.state.myTimerID);
    }
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
    let blankItem = {};
    blankItem.id = -1;
    blankItem.name = '---';
    req.unshift(blankItem);
    this.setState({stage: "itemRetrieved", updateDisplay: true, transferTypes:req });
  }

  finishStsFetch(req) {
    let blankItem = {};
    blankItem.id = -1;
    blankItem.name = '---';
    req.unshift(blankItem);
    this.setState({stage: "itemRetrieved", updateDisplay: true, statuses: req });
  }

  finishSrcsFetch(req) {
    this.setState({stage: "itemRetrieved", updateDisplay: true, sources: req });
  }

  fetchFormData(id) {
    const loc = "TransferAdmin.select";
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
    let req4 = new OMSRequest(loc, SERVERROOT + "/transfer/statuses",
                            "Problem retrieving output tag list", this.finishStsFetch);
    req4.fetchData();
    this.setState({schematic:null, sco:null, typeList:null, outTags:null})
  }

  handleSelect(event) {
    const id = event.z;
    clearInterval(this.state.myTimerID);
    this.fetchFormData(id);
  }

  validateForm( x ) {
    let doSubmit = true;
    let msg = "The following fields";
    let delim = " ";
    if( x.statusId === -1 ) {
        doSubmit = false;
        msg += "transfer status";
        delim = ", ";
    }
    if( (x.transferTypeId === -1) ) {
        doSubmit = false;
        msg += delim + "transfer type";
        delim = ", ";
    }
    if(x.sourceId === 0) {
        doSubmit = false;
        msg += delim + "transfer source";
        delim = ", ";
    }
    if(x.destinationId === 0) {
        doSubmit = false;
        msg += delim + "transfer destination";
        delim = ", ";
    }
    if( x.delta === null ) {
    	  doSubmit = false;
    	  msg = delim + "repeat interval";
    }
    if( ! doSubmit ) {
      msg += " must be selected!";
      alert(msg);
    }
    return doSubmit;
  }

  updateTransfer(id) {
    let clsMthd = "TransferAdmin.updateTransfer";
    let newt = Object.assign({},this.state.transfer);
    let method = "PUT";
    let url = SERVERROOT + "/transfer/update";
    if( id === 0 ) {
      newt.id = 0;
      method = "POST";
      url = SERVERROOT + "/transfer/insert";
    }
    // format the time
    var fmt = "YYYY-MM-DD HH:mm:ss";
    var xet = moment(newt.expEndTime,fmt);
    var xst = moment(newt.expStartTime,fmt);
    newt.expEndTime = moment(xet).format();
    newt.expStartTime = moment(xst).format();
    if( newt.actStartTime !== "" ) {
      var ast = moment(newt.actStartTime,fmt);
      newt.actStartTime = moment(ast).format();
    }
    if( newt.actEndTime !== "" ) {
      var aet = moment(newt.actEndTime,fmt);
      newt.actEndTime = moment(aet).format();
    }
    var b = JSON.stringify( newt );
    const request = async () => {
      try {
        const response = await fetch(url, {method:method, headers:{'Content-Type':'application/json'}, body: b});
        if( response.ok ) {
	      alert("transfer update complete on "+newt.name)
		} else {
          alert("Transfer update failed on "+newt.name+": " + response.status);
	    }
      } catch( error ) {
        let emsg = "Problem "+(id===0?"inserting":"updating")+" transfer id "+id;
        alert(emsg+"\n"+error);
        Log.error(emsg+" - " + error,clsMthd);
      }
    }
    request();
  }

  handleUpdate(event) {
    event.preventDefault();
    let x = this.state.transfer;
    let doSubmit = this.validateForm(x);
    if( doSubmit ) {
      const id = this.state.transfer.id;
      this.updateTransfer(id);
    }
  }

  handleCopy(event) {
    event.preventDefault();
    let x = this.state.transfer;
    let doSubmit = this.validateForm(x);
    if( doSubmit ) {
      const id = 0;
      this.updateTransfer(id);
    }
  }

  componentDidMount() {
    this.fetchList(this.state.type);
    if( this.state.type === 'A' ) {
      var timerID = setInterval(() => {this.fetchList(this.state.type)}, 60000 );
      this.setState( {myTimerID: timerID } );
    }
  }

//  componentDidUpdate( prevProps, prevState ) {
//  }

  handleClick() {

  }

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

  /**
   * type = X (executable), T (template), A (active}, S (scheduled), 7 (Last Seven days)
   */
  fetchList( type ) {
    const clsMthd = "TransferAdmin.fetchList";
    if( (null !== this.state.myTimerID) && (undefined !== this.state.myTimerID)) {
      if( type !== 'A' ) {
        clearInterval(this.state.myTimerID);
        this.setState({myTimerID: null });
      }
    }
    var myRequest = SERVERROOT + "/transfer/active";
    switch (type) {
      case "7" :
        myRequest = SERVERROOT + "/transfer/last/7";
        break;
      case "A" :
        myRequest = SERVERROOT + "/transfer/active";
        break;
      case "S" :
        myRequest = SERVERROOT + "/transfer/scheduled";
        break;
      case "T" :
        myRequest = SERVERROOT + "/transfer/all/T" ;
        break;
      case "X" :
        myRequest = SERVERROOT + "/transfer/all/X" ;
        break;
      default:
//        type = "A";
        myRequest = SERVERROOT + "/transfer/active" ;
        break;
    }
    if( myRequest !== null ) {
      const request = async () => {
        try {
          const response = await fetch(myRequest);
          const json = await response.json();
          this.setState( {returnedText: json,
                          updateData: false,
                          updateDisplay:true,
                          type:type,
                          stage: "dataFetched" } );
        } catch( error ) {
          let emsg = "Problem fetching transfer list";
          alert(emsg+"\n"+error);
          Log.error(emsg+" - " + error,clsMthd);
        }
      }
      request();
    }
  }

  handleQuit(event) {
    event.preventDefault();
    var timerID = null;
    if( "A" === this.state.type ) {
      timerID = setInterval(() => {this.fetchList("A")}, 60000 );
    }
    this.fetchList(this.state.type);
    this.setState( {returnedText: null,
                    updateData: true,
                    updateDisplay:true,
                    transfer: null,
                    myTimeID: timerID,
                    stage: "begin" } );
  }

  render() {
    switch( this.state.stage ) {
        case "begin":
        return <Waiting />
      case "dataFetched":
        return <TransferList type = {this.state.type}
                             transferData = {this.state.returnedText}
                             transferSelect = {this.handleSelect}
                             handleQuit = {this.handleQuit}
               />
      case "itemRetrieved":
        if( (this.state.transfer === null) || (this.state.transferTypes === null) ||
            (this.state.sources  === null) || (this.state.statuses === null)    ) {
          return <Waiting />
        } else {
          return <TransferForm transfer     = {this.state.transfer}
                               transferTypes= {this.state.transferTypes}
                               statuses     = {this.state.statuses}
                               sources      = {this.state.sources}
                               transferCopy = {this.handleCopy}
                               transferUpdate = {this.handleUpdate}
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

export default TransferAdmin;
