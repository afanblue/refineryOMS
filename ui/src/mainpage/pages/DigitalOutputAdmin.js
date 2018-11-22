/*************************************************************************
 * DigitalOutputAdmin.js
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
import DOForm          from './forms/DOForm.js';
import DOList          from './lists/DOList.js';
import Log             from '../requests/Log.js';
import OMSRequest      from '../requests/OMSRequest.js';
import Waiting         from './Waiting.js';
import {Tag}           from './objects/Tag.js';
import {DigitalOutput}  from './objects/DO.js';


/*
{"id":177,"name":"DCTK-A101","api":32.6,"density":0.862,"height":25.0,"diameter":30.0
,"units":"f","c1Lat":39.58405,"c1Long":-75.62484,"c2Lat":null,"c2Long":null
,"contentType":"Asphalt","contentTypeCode":"A","state":"Y","tempTag":null,"levelTag":null},
*/


class DigitalOutputAdmin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stage: props.stage,
      updateData: false,
      updateDisplay: true,
      returnedText: null,
      histTypes: null,
      doObj: null,
      valueViews: null,
      siteLoc: null,
      color: "green",
      nextCorner: 1
    };
    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.handleSelect      = this.handleSelect.bind(this);
    this.handleUpdate      = this.handleUpdate.bind(this);
    this.handleMouseUp     = this.handleMouseUp.bind(this);
    this.handleQuit        = this.handleQuit.bind(this);
    this.handleClick       = this.handleClick.bind(this);
    this.finishDOFetch     = this.finishDOFetch.bind(this);
    this.finishHistTypesFetch = this.finishHistTypesFetch.bind(this);
    this.finishSiteLocFetch = this.finishSiteLocFetch.bind(this);
    this.finishViewsFetch  = this.finishViewsFetch.bind(this);
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

  finishDOFetch( req ) {
    let dod = req;
    var tg = new Tag( dod.tag.id, dod.tag.name, dod.tag.description, dod.tag.tagTypeCode
                    , dod.tag.tagTypeId, dod.misc, dod.tag.c1Lat, dod.tag.c1Long
                    , dod.tag.c2Lat, dod.tag.c2Long, dod.tag.active);
    var doObj = new DigitalOutput( dod.tagId, tg, dod.histTypeCode, dod.valueView
                    , dod.scanValue, dod.scanTime, dod.prevValue, dod.prevTime
                    , dod.lastHistValue, dod.lastHistTime );
    this.setState({stage: "itemRetrieved", updateDisplay: true, doObj: doObj });
  }
  
  finishHistTypesFetch(req) {
    let histTypes = req;
    this.setState({stage: "itemRetrieved", updateDisplay: true, histTypes: histTypes });
  }
  
  finishSiteLocFetch(req) {
    let sl = req;
    this.setState({stage: "itemRetrieved", updateDisplay: true, siteLoc: sl });
  }
  
  finishViewsFetch(req) {
    let vv = req;
    this.setState({stage: "itemRetrieved", updateDisplay: true, valueViews: vv });
  }
  
  handleSelect(event) {
    const id = event.z;
    const loc = "DigitalOutputAdmin.aiSelect";
    let req0 = new OMSRequest(loc, SERVERROOT + "/do/" + id,
                            "Problem selecting analog output id "+id, this.finishDOFetch);
    req0.fetchData();
    let req2 = new OMSRequest(loc, SERVERROOT + "/referencecode/historytypes",
                            "Problem retrieving history types", this.finishHistTypesFetch);
    req2.fetchData();
    let req3 = new OMSRequest(loc, SERVERROOT + "/config/site",
                            "Problem retrieving siteLocation", this.finishSiteLocFetch);
    req3.fetchData();    
    let req4 = new OMSRequest(loc, SERVERROOT + "/config/views",
                            "Problem retrieving unit list", this.finishViewsFetch);
    req4.fetchData();    
  }

  /** 
   * validateForm - x is an AO object
   */
  validateForm( x ) {
    let doSubmit = true;
    let delim = "";
    let msg = "The following field(s) ";
    if(x.histTypeCode === null) {
        doSubmit = false;
        msg += delim + "history type";
        delim = ", ";
    }
    if(x.valueView === null) {
        doSubmit = false;
        msg += delim + "value view name";
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
    const clsMthd = "DigitalOutputAdmin.update";
    const doObj = this.state.doObj;
    const id = doObj.tagId;
    let method = "PUT";
    let url = SERVERROOT + "/do/update";
    if( id === 0 ) {
      method = "POST";
      url = SERVERROOT + "/do/insert";
    }
    if( this.validateForm( this.state.doObj ) ) {
      var b = JSON.stringify( this.state.doObj );
      const request = async () => {
        try {
          await fetch(url, {method:method, headers:{'Content-Type':'application/json'}, body: b});
          alert("Update/insert complete on "+doObj.tag.name)
        } catch( error ) {
          alert("Problem "+(id===0?"inserting":"updating")+" digital output "
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
    let donew = Object.assign({},this.state.doObj);
    if( np.length === 1 ) {
        const field = np[0];
        donew[field] = value;
    } else {
        const field = np[1];
        donew.tag[field] = value;
    }
    this.setState({doObj: donew } );
  }
  
  handleMouseUp(event) {
      const e = event;
      const t = e.evt;
      var x = t.offsetX;
      var y = t.offsetY;
      var l = this.state.returnedText.siteLocation;
      var lat = l.c1Lat + y * (l.c2Lat-l.c1Lat) / IMAGEHEIGHT;
      var long = l.c1Long + x * (l.c2Long-l.c1Long) / IMAGEWIDTH;
//      Log.info( "DigitalOutputAdmin.mouseUp: siteLocation=(NW["+l.c1Lat+","+l.c1Long+"] SE("+l.c2Lat+","+l.c2Long+")]");
//      Log.info( "DigitalOutputAdmin.mouseUp: "+lat+","+long);
      let donew = Object.assign({},this.state.doObj);
      let nextCorner = this.state.nextCorner;
      if( nextCorner === 1 ) {
        donew.tag.c1Lat = lat;
        donew.tag.c1Long = long;
        nextCorner = 2;
      } else {
        donew.tag.c2Lat = lat;
        donew.tag.c2Long = long;
        nextCorner = 1;        
      }
      this.setState( {doObj: donew, nextCorner:nextCorner} );
  }
 
  fetchList() {
    let clsMthd = "DigitalOutputAdmin.fetchList";
    const myRequest = SERVERROOT + "/do/all";
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
          alert("Problem fetching digital output list\n"+e);
          Log.error("Problem fetching digital output list - " + e, clsMthd);        
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
                    doObj: null,
                    stage: "begin" } );
  }

  render() {
    switch( this.state.stage ) {
  	  case "begin":
        return <Waiting />
      case "dataFetched":
        return <DOList doData = {this.state.returnedText}
                       doSelect = {this.handleSelect}
                       handleQuit = {this.handleQuit}
               />
      case "itemRetrieved":
        if( (this.state.doObj === null) || (this.state.histTypes===null) || 
            (this.state.valueViews===null) || (this.state.siteLoc===null) ) {
          return <Waiting />        
        } else {
          return <DOForm doData      = {this.state.returnedText}
                         doObj       = {this.state.doObj}
                         histTypes   = {this.state.histTypes}
                         valueViews  = {this.state.valueViews}
                         siteLoc     = {this.state.siteLoc}
                         doUpdate    = {this.handleUpdate}
                         fieldChange = {this.handleFieldChange}
                         handleQuit  = {this.handleQuit}
                         handleMouseUp = {this.handleMouseUp}
                         handleClick = {this.handleClick} />
        }
      default:
        return <DefaultContents />
    }
  }
}

export default DigitalOutputAdmin;
