/*************************************************************************
 * DigitalInputAdmin.js
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
import DIForm          from './forms/DIForm.js';
import DIList          from './lists/DIList.js';
import Log             from '../requests/Log.js';
import OMSRequest      from '../requests/OMSRequest.js';
import Waiting         from './Waiting.js';
import {Tag}           from './objects/Tag.js';
import {DigitalInput}  from './objects/DI.js';



class DigitalInputAdmin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stage: props.stage,
      updateData: false,
      updateDisplay: true,
      returnedText: null,
      di: null,
      histTypes: null,
      siteLoc: null,
      valueViews: null,
      color: "green",
      nextCorner: 1
    };
    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.handleSelect      = this.handleSelect.bind(this);
    this.handleDIUpdate    = this.handleDIUpdate.bind(this);
    this.handleDICopy      = this.handleDICopy.bind(this);
    this.handleMouseUp     = this.handleMouseUp.bind(this);
    this.handleQuit        = this.handleQuit.bind(this);
    this.handleClick       = this.handleClick.bind(this);
    this.finishDIFetch     = this.finishDIFetch.bind(this);
    this.finishHistTypesFetch = this.finishHistTypesFetch.bind(this);
    this.finishViewsFetch  = this.finishViewsFetch.bind(this);
    this.finishSiteFetch   = this.finishSiteFetch.bind(this);
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


  finishDIFetch(req) {
    let did = req;
    var tg = new Tag(did.tag.id,did.tag.name,did.tag.description,did.tag.tagTypeCode
                    ,did.tag.tagTypeId, did.tag.misc
                    ,did.tag.c1Lat,did.tag.c1Long,did.tag.c2Lat,did.tag.c2Long
                    ,did.tag.active);
    var di = new DigitalInput(did.tagId, tg, did.scanInt, did.scanOffset
                    , did.currentScan, did.histTypeCode, did.alarmState, did.alarmCode
                    , did.scanValue, did.scanTime, did.prevValue, did.prevScanTime
                    , did.lastHistValue, did.lastHistTime, did.valueView);
    this.setState({stage: "itemRetrieved",
                   updateDisplay: true,
                   updateData: false,
                   di: di
                  });
  }

  finishHistTypesFetch(req) {
    let ht = req;
    this.setState({stage: "itemRetrieved", updateDisplay: true, histTypes: ht });
  }

  finishViewsFetch(req) {
    let vv = req;
    this.setState({stage: "itemRetrieved", updateDisplay: true, valueViews: vv });
  }

  finishSiteFetch(req) {
    let sl = req;
    this.setState({stage: "itemRetrieved", updateDisplay: true, siteLoc: sl });
  }

  handleSelect(event) {
    const id = event.z;
    const loc = "DigitalInputAdmin.diSelect";
    let req0 = new OMSRequest(loc, SERVERROOT + "/di/" + id,
                            "Problem selecting digital input id "+id, this.finishDIFetch);
    req0.fetchData();
    let req2 = new OMSRequest(loc, SERVERROOT + "/referencecode/historytypes",
                            "Problem retrieving history types", this.finishHistTypesFetch);
    req2.fetchData();
    let req3 = new OMSRequest(loc, SERVERROOT + "/config/views",
                            "Problem retrieving unit list", this.finishViewsFetch);
    req3.fetchData();
    let req4 = new OMSRequest(loc, SERVERROOT + "/config/site",
                            "Problem retrieving site location", this.finishSiteFetch);
    req4.fetchData();
  }

  handleUpdate(id) {
    const clsMthd = "DigitalInputAdmin.diUpdate";
    let method = "PUT";
    let url = SERVERROOT + "/di/update";
    var diNew = Object.assign({},this.state.di);
    if( id === 0 ) {
      diNew.tagId=0;
      diNew.tag.id=0;
      method = "POST";
      url = SERVERROOT + "/di/insert";
    }
    diNew.histTypes=null;
    diNew.simScanTime=null;
	diNew.simValue=null;
 	diNew.siteLocation=null;
 	diNew.updated=null;
 	diNew.views=null;
    var b = JSON.stringify( diNew );
    const request = async () => {
      try {
        await fetch(url, {method:method, headers:{'Content-Type':'application/json'}, body: b});
         alert("Update/insert complete on "+diNew.tag.name)
      } catch( error ) {
        alert("Problem "+(id===0?"inserting":"updating")+" digital input "
             +"id "+id+"\n"+error);
        Log.error("Error - " + error,clsMthd);
      }
    }
    request();
  }

  handleDIUpdate(event) {
    event.preventDefault();
    const id = this.state.di.tagId;
    this.handleUpdate(id);
  }

  handleDICopy(event) {
    event.preventDefault();
    const id = 0;
    this.handleUpdate(id);
  }

  componentDidMount() {
    this.fetchList();
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
    let dinew = Object.assign({},this.state.di);
    if( np.length === 1 ) {
        const field = np[0];
        dinew[field] = value;
    } else {
        const field = np[1];
        dinew.tag[field] = value;
    }
    this.setState({di: dinew } );
  }

  handleMouseUp(event) {
      const e = event;
      const t = e.evt;
      var x = t.offsetX;
      var y = t.offsetY;
      var l = this.state.returnedText.siteLocation;
      var lat = l.c1Lat + y * (l.c2Lat-l.c1Lat) / IMAGEHEIGHT;
      var long = l.c1Long + x * (l.c2Long-l.c1Long) / IMAGEWIDTH;
//      Log.info( "DigitalInputAdmin.mouseUp: siteLocation=(NW["+l.c1Lat+","+l.c1Long+"] SE("+l.c2Lat+","+l.c2Long+")]");
//      Log.info( "DigitalInputAdmin.mouseUp: "+lat+","+long);
      let dinew = Object.assign({},this.state.di);
      let nextCorner = this.state.nextCorner;
      if( nextCorner === 1 ) {
        dinew.tag.c1Lat = lat;
        dinew.tag.c1Long = long;
        nextCorner = 2;
      } else {
        dinew.tag.c2Lat = lat;
        dinew.tag.c2Long = long;
        nextCorner = 1;
      }
      this.setState( {di: dinew, nextCorner:nextCorner} );
  }

  fetchList() {
    const clsMthd = "DigitalInputAdmin.fetchList";
    const myRequest = SERVERROOT + "/di/all";
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
          alert("Problem fetching digital input list\n"+e);
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
                    di: null,
                    stage: "begin" } );
  }

  render() {
    switch( this.state.stage ) {
      case "begin":
        return <Waiting />
      case "dataFetched":
        return <DIList diData = {this.state.returnedText}
                       diSelect = {this.handleSelect}
                       handleQuit = {this.handleQuit}
               />
      case "itemRetrieved":
        if( (this.state.di === null) || (this.state.histTypes === null) ||
            (this.state.valueViews === null) || (this.state.siteLoc === null) ) {
          return <Waiting />
        } else {
          return <DIForm diData = {this.state.returnedText}
                       di     = {this.state.di}
                       histTypes = {this.state.histTypes}
                       valueViews = {this.state.valueViews}
                       siteLoc  = {this.state.siteLoc}
                       diUpdate = {this.handleDIUpdate}
                       diCopy   = {this.handleDICopy}
                       fieldChange = {this.handleFieldChange}
                       handleMouseUp = {this.handleMouseUp}
                       handleClick = {this.handleClick}
                       handleQuit = {this.handleQuit}
               />
        }
      default:
        return <DefaultContents />
    }
  }
}

export default DigitalInputAdmin;
