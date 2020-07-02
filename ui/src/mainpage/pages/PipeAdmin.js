/*************************************************************************
 * PipeAdmin.js
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
import PipeList        from './lists/PipeList.js';
import PipeForm        from './forms/PipeForm.js';
import DefaultContents from './DefaultContents.js';
import Log             from '../requests/Log.js';
import OMSRequest      from '../requests/OMSRequest.js';
import Waiting         from './Waiting.js';
import {Pipe}          from './objects/Pipe.js';
import {Vertex}        from './objects/Vertex.js';



class PipeAdmin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stage: props.stage,
      updateData: false,
      updateDisplay: true,
      returnedText: null,
      type: "P",
      types: null,
      pipe: null,
      siteLocation: null,
      contentsList: null,
      sensorList: null
    };
    this.clearEndPtsList   = this.clearEndPtsList.bind(this);
    this.finishCntntsFetch = this.finishCntntsFetch.bind(this);
    this.finishListFetch   = this.finishListFetch.bind(this);
    this.finishPipeFetch   = this.finishPipeFetch.bind(this);
    this.finishSiteFetch   = this.finishSiteFetch.bind(this);
    this.finishSensorFetch = this.finishSensorFetch.bind(this);
    this.finishTypesFetch  = this.finishTypesFetch.bind(this);
    this.handlePipeSelect  = this.handlePipeSelect.bind(this);
    this.handlePipeUpdate  = this.handlePipeUpdate.bind(this);
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
  finishPipeFetch( req ) {
    let pd = req;
    let pts = [];
    let vtxList = pd.vtxList;
    for( var i=0; i<vtxList.length; i++ ) {
//      let lpt = vtxList[i].split(",");
      let x = vtxList[i].latitude;
      let y = vtxList[i].longitude;
      let sep = "";
      if( i > 0 ) { sep="\n"}
      pts = pts.concat(sep+x+","+y);
    }
    const p = new Pipe(pd.id,pd.name,pd.description,pd.tagTypeCode,pd.tagTypeId,pd.misc
                      ,pd.c1Lat,pd.c1Long,pd.c2Lat,pd.c2Long,pd.active,pd.inTagId,pts);
    this.setState({stage: "pipeRetrieved", updateDisplay: true, pipe: p });
  }

  finishTypesFetch(req) {
    this.setState({stage:"pipeRetrieved", updateDisplay:true, types: req });
  }

  finishSiteFetch(req) {
    this.setState({stage: "pipeRetrieved", updateDisplay: true, siteLocation:req });
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
    this.setState({stage: "pipeRetrieved", updateDisplay: true, contentsList:cList });
  }

  finishSensorFetch(req) {
    this.setState({stage: "pipeRetrieved", updateDisplay: true, sensorList: req });
  }

  handlePipeSelect(event) {
    const id = event.z;
    const loc = "PipeAdmin.pipeSelect";
    let req0 = new OMSRequest(loc, SERVERROOT + "/pipe/" + id,
                             "Problem selecting pipe id "+id, this.finishPipeFetch);
    req0.fetchData();
    let req1 = new OMSRequest(loc, SERVERROOT + "/tag/types",
                             "Problem retrieving tag types", this.finishTypesFetch);
    req1.fetchData();
    let req2 = new OMSRequest(loc, SERVERROOT + "/config/site",
                             "Problem retrieving site location ", this.finishSiteFetch);
    req2.fetchData();
    let req3 = new OMSRequest(loc, SERVERROOT + "/referencecode/category/content-type",
                             "Problem retrieving contents list ", this.finishCntntsFetch);
    req3.fetchData();
    let req4 = new OMSRequest(loc, SERVERROOT + "/tag/types/AI,AO,DI,DO,C",
                             "Problem retrieving roles", this.finishSensorFetch);
    req4.fetchData();
  }

  handlePipeUpdate(event) {
    event.preventDefault();
    const clsMthd = "PipeAdmin.handleUpdate";
    const pipe = Object.assign({},this.state.pipe);
    const id = pipe.id;
    let method = "PUT";
    let url = SERVERROOT + "/pipe/update";
    if( id === 0 ) {
      method = "POST";
      url = SERVERROOT + "/pipe/insert";
    }
    let pts = [];
    let vtxList = pipe.vtxList;
    for( var i=0; i<vtxList.length; i++ ) {
      let lpt = vtxList[i].split(",");
      var vtx = new Vertex(0,id,i,lpt[0],lpt[1]);
      pts.push(vtx);
    }
    pipe.vtxList = pts;

    const b = JSON.stringify(pipe);
    const request = async () => {
      try {
        const response = await fetch(url, {method:method, headers:{'Content-Type':'application/json'}, body: b});
        if( response.ok ) {
          alert("Pipe update/insert complete for id = "+id)
        } else {
          alert("Pipe update/insert failed for id =  "+id+":  " + response.status);
        }
      } catch( error ) {
        const emsg = "Problem "+(id===0?"inserting":"updating")+" pipe, id="+id;
        alert(emsg+"\n"+error);
        Log.error(emsg+" - " + error,clsMthd);
      }
    }
    request();
  }

  componentDidMount() {
    this.fetchList("P");
  }

//  componentDidUpdate( prevProps, prevState ) {
//  }

  handleFieldChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    let pnew = Object.assign({},this.state.pipe);
    if( target !== 'vtxList' ) {
      pnew[name] = value;
      this.setState({pipe:pnew} );
    }
  }


  finishListFetch( req ) {
    this.setState( {stage:"dataFetched", updateDisplay:true, returnedText: req } );
  }

  fetchList(type) {
    let loc = "PipeAdmin.fetchList";
    let req0 = new OMSRequest(loc, SERVERROOT + "/tag/type/" + type,
                            "Problem selecting tag list", this.finishListFetch);
    req0.fetchData();
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
    if( ! this.state.pathSelection ) {
      var x = t.offsetX;
      var y = t.offsetY;
      var l = this.state.siteLocation;
      var lat = l.c1Lat + y * (l.c2Lat-l.c1Lat) / IMAGEHEIGHT;
      var long = l.c1Long + x * (l.c2Long-l.c1Long) / IMAGEWIDTH;
//      Log.info( "PipeAdmin.mouseUp: siteLocation=(NW["+l.c1Lat+","+l.c1Long+"]"
//                 + " SE("+l.c2Lat+","+l.c2Long+")]");
//      Log.info( "PipeAdmin.mouseUp: "+lat+","+long);
      let pnew = Object.assign({},this.state.pipe);
      let sep = "";
      if( pnew.vtxList.length > 0 ) { sep="\n"}
      pnew.vtxList = pnew.vtxList.concat(sep+lat.toPrecision(9)+","+long.toPrecision(9));
      this.setState( {pipe: pnew} );
    }
  }

  clearEndPtsList(event) {
    event.preventDefault();
    let pnew = Object.assign({},this.state.pipe);
    let pts = [];
    pnew.vtxList = pts;
    this.setState( {pipe: pnew} );
  }

  render() {
    switch( this.state.stage ) {
      case "begin":
        return <Waiting />
      case "dataFetched":
        return <PipeList returnedText = {this.state.returnedText}
                         pipeSelect   = {this.handlePipeSelect} />
      case "pipeRetrieved":
        if( (this.state.pipe === null)  || (this.state.siteLocation===null) ||
            (this.state.types === null) || (this.state.contentsList===null) ||
            (this.state.sensorList === null) )
        {
          return <Waiting />
        } else {
          return <PipeForm pipe          = {this.state.pipe}
                           siteLoc       = {this.state.siteLocation}
                           types         = {this.state.types}
                           contentsList  = {this.state.contentsList}
                           sensorList    = {this.state.sensorList}
                           pathSelect    = {this.state.pathSelection}
                           pipeUpdate    = {this.handlePipeUpdate}
                           clearEndPts   = {this.clearEndPtsList}
                           fieldChange   = {this.handleFieldChange}
                           handleMouseUp = {this.handleMouseUp}
                           handleQuit    = {this.handleQuit} />
        }
      default:
        return <DefaultContents />
    }
  }
}

export default PipeAdmin;
