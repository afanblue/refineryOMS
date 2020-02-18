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
/* eslint-env node, browser, es6 */

import React, {Component} from 'react';
import PropTypes          from 'prop-types';

import {SERVERROOT, IMAGEHEIGHT, IMAGEWIDTH} from '../../Parameters.js';
import DefaultContents from './DefaultContents.js';
import AIForm          from './forms/AIForm.js';
import AIList          from './lists/AIList.js';
import Log             from '../requests/Log.js';
import OMSRequest      from '../requests/OMSRequest.js';
import Waiting         from './Waiting.js';
import {Tag}           from './objects/Tag.js';
import {AnalogInput}   from './objects/AI.js';


/*
{"id":177,"name":"DCTK-A101","api":32.6,"density":0.862,"height":25.0,"diameter":30.0
,"units":"f","c1Lat":39.58405,"c1Long":-75.62484,"c2Lat":null,"c2Long":null
,"contentType":"Asphalt","contentTypeCode":"A","state":"Y","tempTag":null,"levelTag":null},
*/


class AnalogInputAdmin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stage: props.stage,
      updateData: false,
      updateDisplay: true,
      returnedText: null,
      ai: null,
      aiTypes:null,
      histTypes:null,
      unitList: null,
      siteLoc: null,
      color: "green",
      nextCorner: 1
    };
    this.handleFieldChange  = this.handleFieldChange.bind(this);
    this.handleSelect       = this.handleSelect.bind(this);
    this.handleUpdate       = this.handleUpdate.bind(this);
    this.handleMouseUp      = this.handleMouseUp.bind(this);
    this.handleQuit         = this.handleQuit.bind(this);
    this.handleClick        = this.handleClick.bind(this);
    this.finishAIFetch      = this.finishAIFetch.bind(this);
    this.finishAITypesFetch = this.finishAITypesFetch.bind(this);
    this.finishHistTypesFetch = this.finishHistTypesFetch.bind(this);
    this.finishUnitsFetch   = this.finishUnitsFetch.bind(this);
    this.finishSiteLocFetch = this.finishSiteLocFetch.bind(this);
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

  static getDerivedStateFromProps(nextProps, state ) {
	return state;
  }

  shouldComponentUpdate(nextProps,nextState) {
    let sts = nextState.updateDisplay;
    return sts;
  }

  finishAIFetch( req ) {
    let aid = req;
    var tg = new Tag(aid.tag.id, aid.tag.name, aid.tag.description, aid.tag.tagTypeCode
                    ,aid.tag.tagTypeId, aid.misc
                    ,aid.tag.c1Lat, aid.tag.c1Long, aid.tag.c2Lat, aid.tag.c2Long
                    ,aid.tag.active);
    var ai = new AnalogInput(aid.tagId, tg, aid.analogTypeCode, aid.scanInt, aid.scanOffset
                    ,aid.currentScan, aid.zeroValue, aid.maxValue, aid.histTypeCode
                    ,aid.percent, aid.slope, aid.rawValue, aid.scanValue, aid.scanTime
                    ,aid.prevValue, aid.prevTime, aid.lastHistValue, aid.lastHistTime
                    ,aid.hh, aid.hi, aid.lo, aid.ll, aid.unitId);
    this.setState({stage: "itemRetrieved", updateDisplay: true, ai: ai });
  }

  finishAITypesFetch(req) {
    let aiTypes = req;
    let blankItem = {};
    blankItem.id = null;
    blankItem.name = '---';
    aiTypes.unshift(blankItem);
    this.setState({stage: "itemRetrieved", updateDisplay: true, aiTypes: aiTypes });
  }

  finishHistTypesFetch(req) {
    let histTypes = req;
    let blankItem = {};
    blankItem.id = null;
    blankItem.name = '---';
    histTypes.unshift(blankItem);
    this.setState({stage: "itemRetrieved", updateDisplay: true, histTypes: histTypes });
  }

  finishUnitsFetch(req) {
    let unitList = req;
    let blankItem = {};
    blankItem.id = null;
    blankItem.name = '---';
    unitList.unshift(blankItem);
    this.setState({stage: "itemRetrieved", updateDisplay: true, unitList: unitList });
  }

  finishSiteLocFetch(req) {
    let siteLoc = req;
    this.setState({stage: "itemRetrieved", updateDisplay: true, siteLoc: siteLoc });
  }

  handleSelect(event) {
    const id = event.z;
    const loc = "AnalogInputAdmin.aiSelect";
    let req0 = new OMSRequest(loc, SERVERROOT + "/ai/" + id,
                            "Problem selecting analog input id "+id, this.finishAIFetch);
    req0.fetchData();
    let req1 = new OMSRequest(loc, SERVERROOT + "/referencecode/aitypes",
                            "Problem retrieving AI types", this.finishAITypesFetch);
    req1.fetchData();
    let req2 = new OMSRequest(loc, SERVERROOT + "/referencecode/historytypes",
                            "Problem retrieving history types", this.finishHistTypesFetch);
    req2.fetchData();
    let req3 = new OMSRequest(loc, SERVERROOT + "/unit/all",
                            "Problem retrieving unit list", this.finishUnitsFetch);
    req3.fetchData();
    let req4 = new OMSRequest(loc, SERVERROOT + "/config/site",
                            "Problem retrieving site location", this.finishSiteLocFetch);
    req4.fetchData();
  }

  /**
   * validateForm - x is an AI object
   */
  validateForm( x ) {
    let doSubmit = true;
    let delim = "";
    let msg = "The following field(s) ";
    if( x.unitId === null || (x.unitId === undefined) ) {
        doSubmit = false;
        msg += "units ";
        delim = ", ";
    }
    if(x.histTypeCode === null) {
        doSubmit = false;
        msg += delim + "history type";
        delim = ", ";
    }
    if(x.analogTypeCode === null) {
        doSubmit = false;
        msg += delim + "analog type";
        delim = ", ";
    }
    if( ! doSubmit ) {
      msg += " must be selected!";
      alert(msg);
    }
    return doSubmit;
  }

  handleUpdate(event) {
    event.preventDefault();
    let ai = this.state.ai;
    const id = ai.tagId;
    const clsMthd = "AnalogInputAdmin.aiUpdate";
    let method = "PUT";
    let url = SERVERROOT + "/ai/update";
    if( id === 0 ) {
      method = "POST";
      url = SERVERROOT + "/ai/insert";
    }
    if( this.validateForm( ai ) ) {
      var b = JSON.stringify( ai );
      const request = async () => {
        try {
          await fetch(url, {method:method, headers:{'Content-Type':'application/json'}, body: b});
          alert("Update/insert complete on analog input ");
        } catch( error ) {
          alert("Problem "+(id===0?"inserting":"updating")+" analog input "
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

  handleClick() {

  };

  handleFieldChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    let np = name.split(".");
    let ainew = Object.assign({},this.state.ai);
    if( np.length === 1 ) {
        const field = np[0];
        switch ( field ) {
            case "unitId":
            case "maxValue":
            case "zeroValue":
                ainew[field] = parseInt(value,10);
                break;
            default:
                ainew[field] = value;
        }
    } else {
        const field = np[1];
        ainew.tag[field] = value;
    }
    this.setState({ai: ainew } );
  }

  handleMouseUp(event) {
      const e = event;
      const t = e.evt;
      var x = t.offsetX;
      var y = t.offsetY;
      var l = this.state.siteLoc;
      var lat = l.c1Lat + y * (l.c2Lat-l.c1Lat) / IMAGEHEIGHT;
      var long = l.c1Long + x * (l.c2Long-l.c1Long) / IMAGEWIDTH;
//      Log.info( "AnalogInputAdmin.mouseUp: siteLocation=(NW["+l.c1Lat+","+l.c1Long+"] SE("+l.c2Lat+","+l.c2Long+")]");
//      Log.info( "AnalogInputAdmin.mouseUp: "+lat+","+long);
      let ainew = Object.assign({},this.state.ai);
      let nextCorner = this.state.nextCorner;
      if( nextCorner === 1 ) {
        ainew.tag.c1Lat = lat;
        ainew.tag.c1Long = long;
        nextCorner = 2;
      } else {
        ainew.tag.c2Lat = lat;
        ainew.tag.c2Long = long;
        nextCorner = 1;
      }
      this.setState( {ai: ainew, nextCorner:nextCorner} );
  }

  fetchList() {
    const clsMthd = "AnalogInputAdmin.fetchList";
    const myRequest = SERVERROOT + "/ai/all";
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
          alert("Problem retrieving analog input list\n"+e);
          const emsg = "AnalogInputAdmin.fetchList: Fetching ai list " + e;
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
                    ai: null,
                    stage: "begin" } );
  }

  render() {
    switch( this.state.stage ) {
  	  case "begin":
        return <Waiting />
      case "dataFetched":
        return <AIList aiData = {this.state.returnedText}
                       aiSelect = {this.handleSelect}
                       handleQuit = {this.handleQuit}
               />
      case "itemRetrieved":
        if( (this.state.ai        === null) || (this.state.aiTypes  === null) ||
            (this.state.histTypes === null) || (this.state.unitList === null) ||
            (this.state.siteLoc   === null) ) {
          return <Waiting />
        } else {
          return <AIForm aiData   = {this.state.returnedText}
                         ai       = {this.state.ai}
                         aiTypes  = {this.state.aiTypes}
                         histTypes= {this.state.histTypes}
                         unitList = {this.state.unitList}
                         siteLoc  = {this.state.siteLoc}
                         aiUpdate = {this.handleUpdate}
                         fieldChange = {this.handleFieldChange}
                         handleQuit = {this.handleQuit}
                         handleMouseUp = {this.handleMouseUp}
                         handleClick = {this.handleClick} />
        }
      default:
        return <DefaultContents />
    }
  }
}

export default AnalogInputAdmin;
