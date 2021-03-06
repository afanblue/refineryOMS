/*************************************************************************
 * ControlBlockAdmin.js
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

import {SERVERROOT, IMAGEHEIGHT, IMAGEWIDTH} from '../../Parameters.js';
import DefaultContents from './DefaultContents.js';
import ControlBlockForm from './forms/ControlBlockForm.js';
import ControlBlockList from './lists/ControlBlockList.js';
import Log              from '../requests/Log.js';
import OMSRequest       from '../requests/OMSRequest.js';
import Waiting from './Waiting.js';
//import {Tag} from './objects/Tag.js';
import {ControlBlock} from './objects/ControlBlock.js';


/*
{"id":177,"name":"DCTK-A101","api":32.6,"density":0.862,"height":25.0,"diameter":30.0
,"units":"f","c1Lat":39.58405,"c1Long":-75.62484,"c2Lat":null,"c2Long":null
,"contentType":"Asphalt","contentTypeCode":"A","state":"Y","tempTag":null,"levelTag":null},
*/

const className = "ControlBlockAdmin";
const loc = className + ".cbSelect";


class ControlBlockAdmin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stage: props.stage,
      updateData: false,
      updateDisplay: true,
      returnedText: null,
      newCB: false,
      cb: null,
      allOutputs: null,
      allDIInputs: null,
      allAIInputs: null
    };
    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.handleSelect      = this.handleSelect.bind(this);
    this.handleUpdate      = this.handleUpdate.bind(this);
    this.handleMouseUp     = this.handleMouseUp.bind(this);
    this.handleQuit        = this.handleQuit.bind(this);
    this.handleClick       = this.handleClick.bind(this);
    this.handleCBFetch     = this.handleCBFetch.bind(this);
    this.handleOutFetch    = this.handleOutFetch.bind(this);
    this.handleAIFetch     = this.handleAIFetch.bind(this);
    this.handleDIFetch     = this.handleDIFetch.bind(this);
    this.handleListFetch   = this.handleListFetch.bind(this);
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

  handleCBFetch( req ) {
    let cbd = req;
    var cb = new ControlBlock( cbd.id, cbd.pvId, cbd.spId, cbd.blockType
                             , cbd.co, cbd.pv, cbd.sp
                             , cbd.output, cbd.procValue, cbd.setpoint  );
    this.setState({stage: "itemRetrieved",
                   updateDisplay: true,
                   updateData: false,
                   returnedText: req,
                   cb: cb
                  });
  }

  handleAIFetch(req) {
    let allAIInputs = req;
    this.setState({stage: "itemRetrieved", updateDisplay: true, allAIInputs: allAIInputs });
  }

  handleDIFetch(req) {
    let allDIInputs = req;
    this.setState({stage: "itemRetrieved", updateDisplay: true, allDIInputs: allDIInputs });
  }

  handleOutFetch(req) {
    let allOutputs = req;
    this.setState({stage: "itemRetrieved", updateDisplay: true, allOutputs: allOutputs });
  }


  fetchCBselection( id ) {
    let req0 = new OMSRequest(loc, SERVERROOT + "/cb/" + id,
                            "Problem selecting control block - id "+id, this.handleCBFetch);
    req0.fetchData();

    let req1 = new OMSRequest(loc, SERVERROOT + "/tag/types/AO,DO",
                            "Problem retrieving calc types", this.handleOutFetch);
    req1.fetchData();

    let req2 = new OMSRequest(loc, SERVERROOT + "/tag/idname/AI",
                            "Problem retrieving AI types", this.handleAIFetch);
    req2.fetchData();

    let req3 = new OMSRequest(loc, SERVERROOT + "/tag/idname/DI",
                            "Problem retrieving DI types", this.handleDIFetch);
    req3.fetchData();
  }

  handleSelect(event) {
    const id = event.z;
    this.setState({stage: "dataFetched", updateDisplay: false, newCB: (id===0) });
    this.fetchCBselection(id);
  }

  /**
   * validateForm - x is an CB object
   */
  validateForm( x ) {
    let doSubmit = true;
    let delim = "";
    let msg = "The following field(s) ";
    if( x.pvId === null || (x.pvId === undefined) || (x.pvId === 0) ) {
        doSubmit = false;
        msg += "PV ";
        delim = ", ";
    }
    if(x.id === null || x.id===undefined || x.id===0) {
        doSubmit = false;
        msg += delim + "output tag ";
        delim = ", ";
    }
    if( x.blockType === "AO" ) {
      if( (x.spId === null) || (x.spId === undefined) || (x.spId === 0) ) {
        doSubmit = false;
        msg += delim + "SP ";
        delim = ", ";
      }
    }
    if( ! doSubmit ) {
      msg += " must be selected!";
      alert(msg);
    }
    return doSubmit;
  }

  handleUpdate(event) {
    event.preventDefault();
    const id = this.state.cb.tagId;
    let method = "PUT";
    let url = SERVERROOT + "/cb/update";
    if( this.state.newCB ) {
      method = "POST";
      url = SERVERROOT + "/cb/insert";
    }
    if( this.validateForm( this.state.cb ) ) {
      var b = JSON.stringify( this.state.cb );
      const request = async () => {
        try {
          const response = await fetch(url, {method:method, headers:{'Content-Type':'application/json'}, body: b});
          if( response.ok ) {
            alert("Control block update/insert complete for id = "+ id)
          } else {
            alert("Control block update/insert failed for id = "+id+":  " + response.status);
          }
        } catch( error ) {
          alert("Problem "+(id===0?"inserting":"updating")+" control block "
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

//  componentDidUpdate( prevProps, prevState ) {
//  }

  handleClick() {  }

  handleFieldChange(event) {
    const target = event.target;
    const field = target.name;
    let cbnew = Object.assign({},this.state.cb);
    let val = target.value;
    if( field === "id" ) {
//      let vp = val.split(".");
//      val = vp[0];
      this.fetchCBselection(val);
    } else {
      switch ( field ) {
        case "id":
        case "pvId":
        case "spId":
          cbnew[field] = parseInt(val,10);
          break;
        default:
          cbnew[field] = val;
      }
      this.setState({cb: cbnew } );
    }
  }

  handleMouseUp(event) {
      const e = event;
      const t = e.evt;
      var x = t.offsetX;
      var y = t.offsetY;
      var l = this.state.returnedText.siteLocation;
      var lat = l.c1Lat + y * (l.c2Lat-l.c1Lat) / IMAGEHEIGHT;
      var long = l.c1Long + x * (l.c2Long-l.c1Long) / IMAGEWIDTH;
//      Log.info( className+".mouseUp: siteLocation=(NW["+l.c1Lat+","+l.c1Long+"] SE("+l.c2Lat+","+l.c2Long+")]");
//      Log.info( className+".mouseUp: "+lat+","+long);
      let cbnew = Object.assign({},this.state.cb);
      let nextCorner = this.state.nextCorner;
      if( nextCorner === 1 ) {
        cbnew.tag.c1Lat = lat;
        cbnew.tag.c1Long = long;
        nextCorner = 2;
      } else {
        cbnew.tag.c2Lat = lat;
        cbnew.tag.c2Long = long;
        nextCorner = 1;
      }
      this.setState( {cb: cbnew, nextCorner:nextCorner} );
  }

  handleListFetch(resp) {
    this.setState( {returnedText: resp,
                    updateData: false,
                    updateDisplay:true,
                    stage: "dataFetched" } );
  }

  fetchList() {
    let req = new OMSRequest(loc, SERVERROOT + "/cb/all",
                            "Problem retrieving control block list", this.handleListFetch);
    req.fetchData();
  }

  handleQuit(event) {
    event.preventDefault();
    this.fetchList();
    this.setState( {returnedText: null,
                    updateData: true,
                    updateDisplay:true,
                    cb: null,
                    stage: "begin" } );
  }

  render() {
    switch( this.state.stage ) {
      case "begin":
        return <Waiting />
      case "dataFetched":
        return <ControlBlockList cbData = {this.state.returnedText}
                       cbSelect = {this.handleSelect}
                       handleQuit = {this.handleQuit}
               />
      case "itemRetrieved":
        if( (this.state.cb === null) || (this.state.allOutputs === null) ||
            (this.state.allDIInputs === null) || (this.state.allAIInputs === null) )
        {
          return <Waiting />
        } else {
          return <ControlBlockForm cbData = {this.state.returnedText}
                       cb       = {this.state.cb}
                       newCB    = {this.state.newCB}
                       allOuts  = {this.state.allOutputs}
                       allDIins = {this.state.allDIInputs}
                       allAIins = {this.state.allAIInputs}
                       cbUpdate = {this.handleUpdate}
                       fieldChange   = {this.handleFieldChange}
                       handleQuit    = {this.handleQuit}
                       handleMouseUp = {this.handleMouseUp}
               />
        }
      default:
        return <DefaultContents />
    }
  }
}

export default ControlBlockAdmin;
