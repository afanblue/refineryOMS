/*************************************************************************
 * AlarmOutputAdmin.js
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
import {SERVERROOT, IMAGEHEIGHT, IMAGEWIDTH} from '../../Parameters.js';
import DefaultContents from './DefaultContents.js';
import AOForm          from './forms/AOForm.js';
import AOList          from './lists/AOList.js';
import Log             from '../requests/Log.js';
import OMSRequest      from '../requests/OMSRequest.js';
import Waiting         from './Waiting.js';
import {Tag}           from './objects/Tag.js';
import {AnalogOutput}  from './objects/AO.js';

/*
{"id":177,"name":"DCTK-A101","api":32.6,"density":0.862,"height":25.0,"diameter":30.0
,"units":"f","c1Lat":39.58405,"c1Long":-75.62484,"c2Lat":null,"c2Long":null
,"contentType":"Asphalt","contentTypeCode":"A","state":"Y","tempTag":null,"levelTag":null},
*/


class AnalogOutputAdmin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stage: props.stage,
      updateData: false,
      updateDisplay: true,
      returnedText: null,
      histTypes: null,
      unitList: null,
      siteLoc: null,
      ao: null,
      color: "green",
      nextCorner: 1
    };
    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.handleSelect      = this.handleSelect.bind(this);
    this.handleUpdate      = this.handleUpdate.bind(this);
    this.handleMouseUp     = this.handleMouseUp.bind(this);
    this.handleQuit        = this.handleQuit.bind(this);
    this.handleClick       = this.handleClick.bind(this);
    this.finishAOFetch     = this.finishAOFetch.bind(this);
    this.finishHistTypesFetch = this.finishHistTypesFetch.bind(this);
    this.finishUnitsFetch  = this.finishUnitsFetch.bind(this);
    this.finishSiteFetch   = this.finishSiteFetch.bind(this);
    this.finishListFetch   = this.finishListFetch.bind(this);
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

  finishAOFetch( req ) {
    let aod = req;
    var tg = new Tag( aod.tag.id, aod.tag.name, aod.tag.description, aod.tag.tagTypeCode
                    , aod.tag.tagTypeId, aod.misc, aod.tag.c1Lat, aod.tag.c1Long
                    , aod.tag.c2Lat, aod.tag.c2Long, aod.tag.active);
    var ao = new AnalogOutput( aod.tagId, tg, aod.zeroValue, aod.maxValue
                    , aod.histTypeCode, aod.percent, aod.slope, aod.scanValue, aod.scanTime
                    , aod.prevValue, aod.prevTime, aod.lastHistValue, aod.lastHistTime, aod.unitId);
    this.setState({stage: "itemRetrieved", updateDisplay: true, ao: ao });
  }
  
  finishHistTypesFetch(req) {
    let histTypes = req;
    this.setState({stage: "itemRetrieved", updateDisplay: true, histTypes: histTypes });
  }
  
  finishUnitsFetch(req) {
    let unitList = req;
    this.setState({stage: "itemRetrieved", updateDisplay: true, unitList: unitList });
  }
  
  finishSiteFetch(req) {
    let sl = req;
    this.setState({stage: "itemRetrieved", updateDisplay: true, siteLoc: sl });
  }
  
  handleSelect(event) {
    const id = event.z;
    const loc = "AnalogOutputAdmin.aiSelect";
    let req0 = new OMSRequest(loc, SERVERROOT + "/ao/" + id,
                            "Problem selecting analog output id "+id, this.finishAOFetch);
    req0.fetchData();
    let req2 = new OMSRequest(loc, SERVERROOT + "/referencecode/historytypes",
                            "Problem retrieving history types", this.finishHistTypesFetch);
    req2.fetchData();
    let req3 = new OMSRequest(loc, SERVERROOT + "/unit/all",
                            "Problem retrieving unit list", this.finishUnitsFetch);
    req3.fetchData();
    let req4 = new OMSRequest(loc, SERVERROOT + "/config/site",
                            "Problem retrieving site location", this.finishSiteFetch);
    req4.fetchData();
  }

  /** 
   * validateForm - x is an AO object
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
    if( ! doSubmit ) {
      msg += " must be selected!";
      alert(msg);
    }
    return doSubmit;
  }

  handleUpdate(event) {
    event.preventDefault();
    const clsMthd = "AnalogOutputAdmin.aoUpdate";
    const ao = this.state.ao;
    const id = ao.tagId;
    let method = "PUT";
    let url = SERVERROOT + "/ao/update";
    if( id === 0 ) {
      method = "POST";
      url = SERVERROOT + "/ao/insert";
    }
    if( this.validateForm( ao ) ) {
      var b = JSON.stringify( ao );
      const request = async () => {
        try {
          await fetch(url, {method:method, headers:{'Content-Type':'application/json'}, body: b});
          alert("Update/insert complete on "+ao.tag.name)
        } catch( error ) {
          alert("Problem "+(id===0?"inserting":"updating")+" analog output "
               +"id "+id+" ("+ao.tag.name+")\n"+error);
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
    let aonew = Object.assign({},this.state.ao);
    if( np.length === 1 ) {
        const field = np[0];
        switch ( field ) {
            case "unitId":
            case "maxValue":
            case "zeroValue":
                aonew[field] = parseInt(value,10);
                break;
            default:
                aonew[field] = value;
        }
    } else {
        const field = np[1];
        aonew.tag[field] = value;
    }
    this.setState({ao: aonew } );
  }
  
  handleMouseUp(event) {
      const e = event;
      const t = e.evt;
      var x = t.offsetX;
      var y = t.offsetY;
      var l = this.state.returnedText.siteLocation;
      var lat = l.c1Lat + y * (l.c2Lat-l.c1Lat) / IMAGEHEIGHT;
      var long = l.c1Long + x * (l.c2Long-l.c1Long) / IMAGEWIDTH;
//      Log.info( "AnalogOutputAdmin.mouseUp: siteLocation=(NW["+l.c1Lat+","+l.c1Long+"] SE("+l.c2Lat+","+l.c2Long+")]");
//      Log.info( "AnalogOutputAdmin.mouseUp: "+lat+","+long);
      let aonew = Object.assign({},this.state.ao);
      let nextCorner = this.state.nextCorner;
      if( nextCorner === 1 ) {
        aonew.tag.c1Lat = lat;
        aonew.tag.c1Long = long;
        nextCorner = 2;
      } else {
        aonew.tag.c2Lat = lat;
        aonew.tag.c2Long = long;
        nextCorner = 1;        
      }
      this.setState( {ao: aonew, nextCorner:nextCorner} );
  }
  
  finishListFetch(resp) {
    this.setState( {returnedText: resp, 
                    updateData: false, 
                    updateDisplay:true,
                    stage: "dataFetched" } );
  }
 
  fetchList() {
    const myRequest = SERVERROOT + "/ao/all";
    const loc = "AnalogOutputAdmin.aiSelect";
    if( myRequest !== null ) {
      let req0 = new OMSRequest(loc, myRequest,
                              "Problem selecting analog output list", this.finishListFetch);
      req0.fetchData();
    }
  }

  handleQuit(event) {
    event.preventDefault();
    this.fetchList();
    this.setState( {returnedText: null, 
                    updateData: true, 
                    updateDisplay:true,
                    ao: null,
                    stage: "begin" } );
  }

  render() {
    switch( this.state.stage ) {
  	  case "begin":
        return <Waiting />
      case "dataFetched":
        return <AOList aoData = {this.state.returnedText}
                       aoSelect = {this.handleSelect}
                       handleQuit = {this.handleQuit}
               />
      case "itemRetrieved":
        if( (this.state.ao === null) || (this.state.histTypes === null) || 
            (this.state.unitList === null) || (this.state.siteLoc === null) ) {
          return <Waiting />        
        } else {
          return <AOForm aoData    = {this.state.returnedText}
                         ao        = {this.state.ao}
                         histTypes = {this.state.histTypes}
                         unitList  = {this.state.unitList}
                         siteLoc   = {this.state.siteLoc}
                         aoUpdate  = {this.handleUpdate}
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

export default AnalogOutputAdmin;
