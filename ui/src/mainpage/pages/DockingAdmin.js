/*************************************************************************
 * DockingAdmin.js
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

import {SERVERROOT}    from '../../Parameters.js';
import DefaultContents from './DefaultContents.js';
import DockList        from './lists/DockList.js';
import DockForm        from './forms/DockForm.js';
import Log             from '../requests/Log.js';
import OMSRequest      from '../requests/OMSRequest.js';
import Waiting         from './Waiting.js';
import {Tag}           from './objects/Tag.js';



class DockingAdmin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stage: props.stage,
      nextCorner: 1,
      updateData: false,
      updateDisplay: true,
      returnedText: null,
      tag: null,
      tagList: null,
      inTag: null,
      outTag: null,
      siteLocation: null,
      carrierList: null,
      sensorList: null,
      pumpList: null,
      contentsList: null
    };
    this.finishCarrierFetch  = this.finishCarrierFetch.bind(this);
    this.finishCntntsFetch   = this.finishCntntsFetch.bind(this);
    this.finishListFetch     = this.finishListFetch.bind(this);
    this.finishPumpListFetch = this.finishPumpListFetch.bind(this);
    this.finishSensorFetch   = this.finishSensorFetch.bind(this);
    this.finishTagFetch      = this.finishTagFetch.bind(this);
    this.handleTagSelect     = this.handleTagSelect.bind(this);
    this.handleTagUpdate     = this.handleTagUpdate.bind(this);
    this.handleFieldChange   = this.handleFieldChange.bind(this);
    this.handleQuit          = this.handleQuit.bind(this);
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
    let code = (this.state.tag===null)?"S":td.misc;
    let req2 = new OMSRequest("DockingAdmin.tagSelect", SERVERROOT + "/tag/types/" + code,
                           "Problem retrieving dock list", this.finishCarrierFetch);
    req2.fetchData();
  }


  finishCarrierFetch(req) {
    let blankItem = {};
    blankItem.id = null;
    blankItem.name = '---';
    req.unshift(blankItem);
    this.setState({stage: "tagRetrieved", updateDisplay: true, carrierList: req });
  }

  finishSensorFetch(req) {
    let blankItem = {};
    blankItem.id = null;
    blankItem.name = '---';
    req.unshift(blankItem);
    this.setState({stage: "tagRetrieved", updateDisplay: true, sensorList: req });
  }

  finishPumpListFetch(req) {
    this.setState({stage: "tagRetrieved", updateDisplay: true, pumpList: req });
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
    /* ignore new dock selection */
    if( id !== 0 ) {
      const loc = "DockingAdmin.tagSelect";
      let req0 = new OMSRequest(loc, SERVERROOT + "/dock/" + id,
                             "Problem selecting tag id "+id, this.finishTagFetch);
      req0.fetchData();
      let req3 = new OMSRequest(loc, SERVERROOT + "/tag/types/PMP",
                             "Problem retrieving pump list", this.finishPumpListFetch);
      req3.fetchData();
      let req4 = new OMSRequest(loc, SERVERROOT + "/tag/types/DI",
                             "Problem retrieving roles", this.finishSensorFetch);
      req4.fetchData();
      let req5 = new OMSRequest(loc, SERVERROOT + "/referencecode/category/content-type",
                             "Problem retrieving contents list ", this.finishCntntsFetch);
      req5.fetchData();
    } else {
      alert( "Can't bring a carrier into a new dock" );
    }

  }

  handleTagUpdate(event) {
    event.preventDefault();
    const clsMthd = "DockingAdmin.handleUpdate";
    const tag = this.state.tag;
    const id = tag.id;
    let method = "PUT";
    let url = SERVERROOT + "/dock/update";
    if( id === 0 ) {
      method = "POST";
      url = SERVERROOT + "/dock/insert";
    }
    const b = JSON.stringify(tag);
    const request = async () => {
      try {
        await fetch(url, {method:method, headers:{'Content-Type':'application/json'}, body: b});
        alert("Update/insert complete on tag, id="+id)
      } catch( error ) {
        const emsg = "Problem "+(id===0?"inserting":"updating")+" tag, id="+id;
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
        case "outTagList":
          if( "string" === typeof value ) {
            val = parseInt(value,10);
          }
          if( "object" === typeof tnew[name] ) {
            tnew[name].push(val);
          } else {
            tnew[name] = val;
          }
          break;
        default:
          if( "string" === typeof value ) {
            val = parseInt(value,10);
          }
          tnew[name] = val;
          break;
      }
      this.setState({tag:tnew} );
    }
  }


  finishListFetch( req ) {
    this.setState( {stage:"dataFetched", updateDisplay:true, returnedText: req } );
  }


  fetchList() {
    let loc = "DockingAdmin.fetchList";
    let req0 = new OMSRequest(loc, SERVERROOT + "/dock/all",
                            "Problem selecting tag list", this.finishListFetch);
    req0.fetchData();
  }

  handleQuit(event) {
    event.preventDefault();
    this.fetchList();
    this.setState( {returnedText: null,
                    updateData: true,
                    updateDisplay:true,
                    stage: "begin" } );
  }

  render() {
    switch( this.state.stage ) {
      case "begin":
        return <Waiting />
      case "dataFetched":
        if( (this.state.returnedText===null) ) {
          return <Waiting />
        } else {
          return <DockList returnedText = {this.state.returnedText}
                           tagSelect    = {this.handleTagSelect} />
        }
      case "tagRetrieved":
        if( (this.state.tag === null)        || (this.state.carrierList===null)
         || (this.state.sensorList === null) )
        {
          return <Waiting />
        } else {
          return <DockForm tag           = {this.state.tag}
                           carrierList   = {this.state.carrierList}
                           sensorList    = {this.state.sensorList}
                           pumpList      = {null}
                           contentsList  = {this.state.contentsList}
                           tagUpdate     = {this.handleTagUpdate}
                           fieldChange   = {this.handleFieldChange}
                           handleQuit    = {this.handleQuit} />
        }
      default:
        return <DefaultContents />
    }
  }
}

export default DockingAdmin;
