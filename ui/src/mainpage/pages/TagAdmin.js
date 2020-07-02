/*************************************************************************
 * TagAdmin.js
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

import {SERVERROOT, IMAGEHEIGHT, IMAGEWIDTH}    from '../../Parameters.js';
import TagList         from './lists/TagList.js';
import TagForm         from './forms/TagForm.js';
import DefaultContents from './DefaultContents.js';
import Log             from '../requests/Log.js';
import OMSRequest      from '../requests/OMSRequest.js';
import Waiting         from './Waiting.js';
import {Tag}           from './objects/Tag.js';



class TagAdmin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stage: props.stage,
      nextCorner: 1,
      updateData: false,
      updateDisplay: true,
      returnedText: null,
      type: "ALL",
      tag: null,
      tagList: null,
      inTag: null,
      outTag: null,
      siteLocation: null,
      tagTypes: null,
      equipList: null,
      sensorList: null,
      contentsList: null
    };
    this.finishEqpFetch    = this.finishEqpFetch.bind(this);
    this.finishCntntsFetch = this.finishCntntsFetch.bind(this);
    this.finishListFetch   = this.finishListFetch.bind(this);
    this.finishSensorFetch = this.finishSensorFetch.bind(this);
    this.finishSiteFetch   = this.finishSiteFetch.bind(this);
    this.finishSite2Fetch  = this.finishSite2Fetch.bind(this);
    this.finishTagFetch    = this.finishTagFetch.bind(this);
    this.handleTagSelect   = this.handleTagSelect.bind(this);
    this.handleTagUpdate   = this.handleTagUpdate.bind(this);
    this.finishTypesFetch  = this.finishTypesFetch.bind(this);
    this.finishTypes2Fetch = this.finishTypes2Fetch.bind(this);
    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.handleMouseUp     = this.handleMouseUp.bind(this);
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
  finishTagFetch( req ) {
    let td = req;
    const t = new Tag(td.id,td.name,td.description,td.tagTypeCode,td.tagTypeId,td.misc
                     ,td.c1Lat,td.c1Long,td.c2Lat,td.c2Long,td.active
                     ,td.inTagId,td.outTagId,td.inTagList,td.outTagList);
    this.setState({stage: "tagRetrieved", updateDisplay: true, tag: t });
  }

  finishSiteFetch(req) {
    this.setState({stage: "tagRetrieved", updateDisplay: true, siteLocation:req });
  }

   finishTypesFetch(req) {
    this.setState({stage: "tagRetrieved", updateDisplay: true, tagTypes: req });
  }

   finishEqpFetch(req) {
    this.setState({stage: "tagRetrieved", updateDisplay: true, equipList: req });
  }

   finishSensorFetch(req) {
    this.setState({stage: "tagRetrieved", updateDisplay: true, sensorList: req });
  }

  finishCntntsFetch(req) {
    var cList = [];
    var mt = {};
    mt["id"] = null;
    mt["name"] = "---";
    cList.push(mt);
    req.map( function(n,x){
               var c = {};
               c["id"] = n.code;
               c["name"] = n.description;
               return cList.push(c);
             } )
    this.setState({stage: "tagRetrieved", updateDisplay: true, contentsList:cList });
  }

  handleTagSelect(event) {
    const id = event.z;
    const loc = "TagAdmin.tagSelect";
    let req0 = new OMSRequest(loc, SERVERROOT + "/tag/" + id,
                             "Problem selecting tag id "+id, this.finishTagFetch);
    req0.fetchData();
    let req1 = new OMSRequest(loc, SERVERROOT + "/tag/types",
                             "Problem retrieving roles", this.finishTypesFetch);
    req1.fetchData();
    let req2 = new OMSRequest(loc, SERVERROOT + "/config/site",
                             "Problem retrieving site location ", this.finishSiteFetch);
    req2.fetchData();
    let req3 = new OMSRequest(loc, SERVERROOT + "/tag/types/P,PMP,V",
                             "Problem retrieving roles", this.finishEqpFetch);
    req3.fetchData();
    let req4 = new OMSRequest(loc, SERVERROOT + "/tag/types/AI,AO,DI,DO,C",
                             "Problem retrieving roles", this.finishSensorFetch);
    req4.fetchData();
    let req5 = new OMSRequest(loc, SERVERROOT + "/referencecode/category/content-type",
                             "Problem retrieving contents list ", this.finishCntntsFetch);
    req5.fetchData();

  }

  handleTagUpdate(event) {
    event.preventDefault();
    const clsMthd = "TagAdmin.handleUpdate";
    const tag = this.state.tag;
    const id = tag.id;
    let method = "PUT";
    let url = SERVERROOT + "/tag/update";
    if( id === 0 ) {
      method = "POST";
      url = SERVERROOT + "/tag/insert";
    }
    const b = JSON.stringify(tag);
    const request = async () => {
      try {
        const response = await fetch(url, {method:method, headers:{'Content-Type':'application/json'}, body: b});
        if( response.ok ) {
          alert("Tag update/insert complete for tag "+tag.name)
        } else {
          alert("Tag update/insert failed for tag  "+tag.name+":  " + response.status);
        }
      } catch( error ) {
        const emsg = "Problem "+(id===0?"inserting":"updating")+" tag, id="+id;
        alert(emsg+"\n"+error);
        Log.error(emsg+" - " + error,clsMthd);
      }
    }
    request();
  }

  componentDidMount() {
    this.fetchList("ALL");
  }

/*  componentDidUpdate( prevProps, prevState ) {
    switch (this.state.stage) {
      case "begin":
        break;
      default:
    }
  }
*/

  handleFieldChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    if( name === "type" ) {
      this.fetchList(value);
      this.setState({type:value} );
    } else {
      let tnew = Object.assign({},this.state.tag);
      let val = value;
      switch( name ) {
        case "tagTypeCode":
          if( tnew.id === 0 ) {
            tnew[name] = val;
          }
          break;
        case "name":
        case "description":
        case "active":
        case "misc":
          tnew[name] = value;
          break;
        case "c1Lat":
        case "c1Long":
        case "c2Lat":
        case "c2Long":
          if( "string" === typeof value ) {
            val = parseFloat(value,10);
          }
          tnew[name] = val;
          break;
        default:
          if( "string" === typeof value ) {
            val = parseInt(value,10);
          }
          if( "object" === typeof tnew[name] ) {
            tnew[name].push(val);
          } else {
            tnew[name] = val;
          }
          break;
      }
      this.setState({tag:tnew} );
    }
  }


  finishListFetch( req ) {
    this.setState( {stage:"dataFetched", updateDisplay:true, returnedText: req } );
  }

  finishTypes2Fetch(req) {
    this.setState({stage:"dataFetched", updateDisplay:true, tagTypes: req });
  }

  finishSite2Fetch(req) {
    this.setState({stage:"dataFetched", updateDisplay:true, siteLocation: req });
  }

  fetchList(type) {
    let loc = "TagAdmin.fetchList";
    let req0 = new OMSRequest(loc, SERVERROOT + "/tag/type/" + type,
                            "Problem selecting tag list", this.finishListFetch);
    req0.fetchData();
    if( this.state.tagTypes === null ) {
      let req1 = new OMSRequest(loc, SERVERROOT + "/tag/types",
                            "Problem retrieving roles", this.finishTypes2Fetch);
      req1.fetchData();
    }
    if( this.state.siteLocation === null ) {
      let req2 = new OMSRequest(loc, SERVERROOT + "/config/site",
                            "Problem retrieving roles", this.finishSite2Fetch);
      req2.fetchData();
    }
  }

  handleQuit(event) {
    event.preventDefault();
    this.fetchList(this.state.type);
    this.setState( {returnedText: null,
                    updateData: true,
                    updateDisplay:true,
                    stage: "begin" } );
  }

  handleMouseUp(event) {
    const e = event;
    const t = e.evt;
    var x = t.offsetX;
    var y = t.offsetY;
    var l = this.state.siteLocation;
    var lat = l.c1Lat + y * (l.c2Lat-l.c1Lat) / IMAGEHEIGHT;
    var long = l.c1Long + x * (l.c2Long-l.c1Long) / IMAGEWIDTH;
//    Log.info( "TankAdmin.mouseUp: siteLocation=(NW["+l.c1Lat+","+l.c1Long+"]"
//               + " SE("+l.c2Lat+","+l.c2Long+")]");
//    Log.info( "TankAdmin.mouseUp: "+lat+","+long);
    let tnew = Object.assign({},this.state.tag);
    let nextCorner = this.state.nextCorner;
    if( nextCorner === 1 ) {
      tnew.c1Lat = lat;
      tnew.c1Long = long;
      nextCorner = 2;
    } else {
      tnew.c2Lat = lat;
      tnew.c2Long = long;
      nextCorner = 1;
    }
    this.setState( {tag: tnew, nextCorner:nextCorner} );
  }


  render() {
    switch( this.state.stage ) {
        case "begin":
        return <Waiting />
      case "dataFetched":
        if( (this.state.returnedText===null) || (this.state.tagTypes===null)  ||
            (this.state.siteLocation===null) ) {
          return <Waiting />
        } else {
          return <TagList type         = {this.state.type}
                          types        = {this.state.tagTypes}
                          returnedText = {this.state.returnedText}
                          fieldChange  = {this.handleFieldChange}
                          tagSelect    = {this.handleTagSelect} />
        }
      case "tagRetrieved":
        if( (this.state.tag === null)        || (this.state.tagTypes === null) ||
            (this.state.equipList===null)    || (this.state.sensorList === null) ||
            (this.state.siteLocation===null) || (this.state.contentsList === null) )
        {
          return <Waiting />
        } else {
          return <TagForm tag           = {this.state.tag}
                          tagTypes      = {this.state.tagTypes}
                          siteLoc       = {this.state.siteLocation}
                          equipList     = {this.state.equipList}
                          sensorList    = {this.state.sensorList}
                          contentsList  = {this.state.contentsList}
                          tagUpdate     = {this.handleTagUpdate}
                          fieldChange   = {this.handleFieldChange}
                          handleMouseUp = {this.handleMouseUp}
                          handleQuit    = {this.handleQuit} />
        }
      default:
        return <DefaultContents />
    }
  }
}

export default TagAdmin;
