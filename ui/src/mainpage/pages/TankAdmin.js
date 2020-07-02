/*************************************************************************
 * TankAdmin.js
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
import OMSRequest      from '../requests/OMSRequest.js';
import DefaultContents from './DefaultContents.js';
import Log             from '../requests/Log.js';
import TankForm        from './forms/TankForm.js';
import TankList        from './lists/TankList.js';
import Waiting         from './Waiting.js';
import {Tag}           from './objects/Tag.js';
import {Tank}          from './objects/Tank.js';


/*
{"id":177,"name":"DCTK-A101","api":32.6,"density":0.862,"height":25.0,"diameter":30.0
,"units":"f","c1Lat":39.58405,"c1Long":-75.62484,"c2Lat":null,"c2Long":null
,"contentType":"Asphalt","contentTypeCode":"A","state":"Y","tempTag":null,"levelTag":null},
*/


class TankAdmin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stage: props.stage,
      updateData: false,
      updateDisplay: true,
      returnedText: null,
      tank: null,
      siteLocation: null,
      temperatures: null,
      levels: null,
      contentTypes: null,
      color: "green",
      nextCorner: 1
    };
    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.handleTankSelect  = this.handleTankSelect.bind(this);
    this.handleTankUpdate  = this.handleTankUpdate.bind(this);
    this.handleMouseUp     = this.handleMouseUp.bind(this);
    this.handleQuit        = this.handleQuit.bind(this);
    this.handleClick       = this.handleClick.bind(this);
    this.finishTankFetch   = this.finishTankFetch.bind(this);
    this.finishSiteFetch   = this.finishSiteFetch.bind(this);
    this.finishTempFetch   = this.finishTempFetch.bind(this);
    this.finishLevelFetch  = this.finishLevelFetch.bind(this);
    this.finishCntntsFetch = this.finishCntntsFetch.bind(this);
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

  finishTankFetch(req) {
       let tkd = req;
       var tg = new Tag( tkd.id, tkd.tag.name, tkd.tag.description, tkd.tag.tagTypeCode
                       , tkd.tag.tagTypeId, tkd.tag.misc
                       , tkd.tag.c1Lat, tkd.tag.c1Long, tkd.tag.c2Lat, tkd.tag.c2Long
                       , tkd.tag.active);
       var tk = new Tank(tkd.id,tg,tkd.api,tkd.density,tkd.height
                        ,tkd.diameter,tkd.units,tkd.contentType
                        ,tkd.contentTypeCode,tkd.tempTag,tkd.levelTag
                        ,tkd.tempId,tkd.levelId,tkd.tempRttId, tkd.levelRttId
                        ,tkd.volumes);
       this.setState({stage: "itemRetrieved",
                      updateDisplay: true,
                      updateData: false,
                      tank: tk
                     });
    this.setState({stage: "itemRetrieved", updateDisplay: true, tank: tk });
  }

  finishSiteFetch(req) {
    this.setState({stage: "itemRetrieved", updateDisplay: true, siteLocation:req });
  }

  finishTempFetch(req) {
    this.setState({stage: "itemRetrieved", updateDisplay: true, temperatures:req });
  }

  finishLevelFetch(req) {
    this.setState({stage: "itemRetrieved", updateDisplay: true, levels:req });
  }

  finishCntntsFetch(req) {
    this.setState({stage: "itemRetrieved", updateDisplay: true, contentTypes:req });
  }

// siteLocation, temperatures, levels, contentTypes

  fetchTankData(id) {
    const loc = "TankAdmin.fetchTank";
    const myRequest=SERVERROOT + "/tank/" + id;
    let req0 = new OMSRequest(loc, myRequest,
                            "Problem selecting tank "+myRequest, this.finishTankFetch);
    req0.fetchData();
    let req1 = new OMSRequest(loc, SERVERROOT + "/config/site",
                            "Problem retrieving site location ", this.finishSiteFetch);
    req1.fetchData();
    let req2 = new OMSRequest(loc, SERVERROOT + "/ai/all/T",
                            "Problem retrieving temperature list ", this.finishTempFetch);
    req2.fetchData();
    let req3 = new OMSRequest(loc, SERVERROOT + "/ai/all/L",
                            "Problem retrieving level tag list", this.finishLevelFetch);
    req3.fetchData();
    this.setState({schematic:null, sco:null, typeList:null, inpTags:null})
    let req4 = new OMSRequest(loc, SERVERROOT + "/tank/contentTypes",
                            "Problem retrieving content types list", this.finishCntntsFetch);
    req4.fetchData();
    this.setState({tank:null, siteLocation:null, temperatures:null, levels:null, contentTypes:null})
  }


  handleTankSelect(event) {
    const id = event.z;
    this.fetchTankData(id);
  }

  handleTankUpdate(event) {
    event.preventDefault();
    const tk = this.state.tank;
    const id = tk.id;
    const clsMthd = "TankAdmin.tankUpdate";
    let method = "PUT";
    let url = SERVERROOT + "/tank/update";
    if( id === 0 ) {
      method = "POST";
      url = SERVERROOT + "/tank/insert";
    }
    var b = JSON.stringify( this.state.tank );
    const request = async () => {
      try {
        const response = await fetch(url, {method:method, headers:{'Content-Type':'application/json'}, body: b});
        if( response.ok ) {
          alert("Tank update/insert complete for id = "+id)
        } else {
          alert("Tank update/insert failed for id =  "+id+":  " + response.status);
        }
        this.fetchTankData(id);
      } catch( error ) {
        const emsg = "Problem "+(id===0?"inserting":"updating")+" tank, id="+id;
        alert(emsg+"\n"+error);
        Log.error(emsg+" - " + error,clsMthd);
      }
    }
    request();
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
    let tknew = Object.assign({},this.state.tank);
    if( np.length === 1 ) {
        const field = np[0];
        tknew[field] = value;
    } else {
        const field = np[1];
        tknew.tag[field] = value;
    }
    this.setState({tank: tknew } );
  }

  handleMouseUp(event) {
      const e = event;
      const t = e.evt;
      var x = t.offsetX;
      var y = t.offsetY;
      var l = this.state.returnedText.siteLocation;
      var lat = l.c1Lat + y * (l.c2Lat-l.c1Lat) / IMAGEHEIGHT;
      var long = l.c1Long + x * (l.c2Long-l.c1Long) / IMAGEWIDTH;
//      Log.info( "TankAdmin.mouseUp: siteLocation=(NW["+l.c1Lat+","+l.c1Long+"]"
//                 + " SE("+l.c2Lat+","+l.c2Long+")]");
//      Log.info( "TankAdmin.mouseUp: "+lat+","+long);
      let tknew = Object.assign({},this.state.tank);
      let nextCorner = this.state.nextCorner;
      if( nextCorner === 1 ) {
        tknew.tag.c1Lat = lat;
        tknew.tag.c1Long = long;
        nextCorner = 2;
      } else {
        tknew.tag.c2Lat = lat;
        tknew.tag.c2Long = long;
        nextCorner = 1;
      }
      this.setState( {tank: tknew, nextCorner:nextCorner} );
  }

  fetchList() {
    const clsMthd = "TankAdmin.fetchList";
    const myRequest = SERVERROOT + "/tank/all";
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
          const emsg = "TankAdmin.fetchList: Fetching tank list";
          alert(emsg+"\n"+e);
          Log.error(emsg+" - " + e, clsMthd);
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
                    tank: null,
                    stage: "begin" } );
  }

  render() {
    switch( this.state.stage ) {
        case "begin":
        return <Waiting />
      case "dataFetched":
        return <TankList tankData = {this.state.returnedText}
                         tankSelect = {this.handleTankSelect}
                         handleQuit = {this.handleQuit}
               />
      case "itemRetrieved":
        if( (this.state.tank===null) || (this.state.siteLocation===null) ||
            (this.state.temperatures===null) || (this.state.levels===null) ||
            (this.state.contentTypes===null) ) {
          return <Waiting />
        } else {
          return <TankForm tank         = {this.state.tank}
                           siteLocation = {this.state.siteLocation}
                           temperatures = {this.state.temperatures}
                           levels       = {this.state.levels}
                           contentTypes = {this.state.contentTypes}
                           tankUpdate   = {this.handleTankUpdate}
                           fieldChange  = {this.handleFieldChange}
                           handleQuit   = {this.handleQuit}
                           handleMouseUp = {this.handleMouseUp}
                           handleClick  = {this.handleClick}
                 />
        }
      default:
        return <DefaultContents />
    }
  }
}

export default TankAdmin;
