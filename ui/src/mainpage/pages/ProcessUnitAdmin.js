/*************************************************************************
 * ProcessUnitAdmin.js
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
import OMSRequest      from '../requests/OMSRequest.js';
import Log             from '../requests/Log.js';
import DefaultContents from './DefaultContents.js';
import ProcessUnitForm from './forms/ProcessUnitForm.js';
import ProcessUnitList from './lists/ProcessUnitList.js';
import Waiting from './Waiting.js';
import {RelTagTag} from './objects/Tag.js';
import {ProcessUnit} from './objects/ProcessUnit.js';


class ProcessUnitAdmin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stage: props.stage,
      updateData: false,
      updateDisplay: true,
      returnedText: null,
      processUnit: null,
      inpTags: null,
      siteLocation: null,
      nextCorner: 1
    }
    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.handleSelect      = this.handleSelect.bind(this);
    this.handleUpdate      = this.handleUpdate.bind(this);
    this.handleMouseUp     = this.handleMouseUp.bind(this);
    this.handleQuit        = this.handleQuit.bind(this);
    this.finishPUFetch     = this.finishPUFetch.bind(this);
    this.finishSiteFetch   = this.finishSiteFetch.bind(this);
    this.finishInpTagFetch = this.finishInpTagFetch.bind(this);
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

  finishPUFetch( req ) {
    let pud = req;
    const tags = []
    pud.childTags.map(function(n,x) { return tags.push(n.childTagId); } );
    const pu = new ProcessUnit( pud.id, pud.name, pud.description, pud.tagTypeCode
                              , pud.tagTypeId, pud.misc, pud.c1Lat, pud.c1Long
                              , pud.c2Lat, pud.c2Long, pud.active, pud.childTags, tags );
    this.setState({stage: "itemRetrieved", updateDisplay: true, processUnit:pu });
  }

  finishSiteFetch(req) {
//    let inpTags = req;
    this.setState({stage: "itemRetrieved", updateDisplay: true, siteLocation: req });
  }

  finishInpTagFetch(req) {
//    let inpTags = req;
    this.setState({stage: "itemRetrieved", updateDisplay: true, inpTags: req });
  }

  fetchFormData(req) {
    const loc = "ProcessUnitAdmin.select";
    let req0 = new OMSRequest(loc, req, 
                            "Problem selecting process unit "+req, this.finishPUFetch);
    req0.fetchData();
    let req2 = new OMSRequest(loc, SERVERROOT + "/config/site",
                            "Problem retrieving site location", this.finishSiteFetch);
    req2.fetchData();
    let req3 = new OMSRequest(loc, SERVERROOT + "/tag/types/TK,AI,DI",
                            "Problem retrieving tag list", this.finishInpTagFetch);
    req3.fetchData();
    this.setState({processUnit:null, siteLocation:null, inpTags:null})    
  }    
    
  handleSelect(event) {
    const id = event.z;
    const myRequest = SERVERROOT + "/processunit/" + id;
    this.fetchFormData(myRequest); 
  }
  
  handleUpdate(event) {
    event.preventDefault();
    const id = this.state.processUnit.id;
    let method = "PUT";
    let url = SERVERROOT + "/processunit/update";
    let childTags = [];
    if( id === 0 ) {
      method = "POST";
      url = SERVERROOT + "/processunit/insert";
    }
    let ctags = this.state.processUnit.tags;
    ctags.map(function(n,x) {
      let rtt = new RelTagTag(0,n,null,id,null);
      return childTags.push(rtt);
    } );
    let punew = Object.assign({},this.state.processUnit);
    punew.childTags = childTags;
    punew.tags = null;
    const b = JSON.stringify(punew);
    const clsMthd = "ProcessUnitAdmin.update";
    const request = async () => {
      try {
        await fetch(url, {method:method, headers:{'Content-Type':'application/json'}, body: b});
        const myRequest=SERVERROOT + "/processunit/name/" + punew.name;
        this.fetchFormData(myRequest);
      } catch( error ) {
        const emsg = "Problem "+(id===0?"inserting":"updating")+" XXXX "
             +"id "+id;
        alert(emsg+"\n"+error);
        Log.error(emsg+" - " + error,clsMthd);
      }
    }
    request();
  }
  
  componentDidMount() {
    this.fetchList();
  }
  
  componentDidUpdate( prevProps, prevState ) {
    switch (this.state.stage) {
      case "begin":
        break;
      default:
    }
  }
  
  handleFieldChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    let np = name.split(".");
    let punew = Object.assign({},this.state.processUnit);
    if( target.name === "tags" ) {
        let f = -1;
        let tNew = [];
        let tLength = punew.tags.length;
        for( var i=0; i<tLength; i++) {
            let v = punew.tags.shift();
            if( v === parseInt(value,10) ) { 
                f = i;
            } else {
                tNew.push(v);
            }
        }
        if( f === -1 ) {
            tNew.push(value);
        }
        punew.tags = tNew;
    } else if( np.length === 1 ) {
        const fld = np[0];
        punew[fld] = value;
    } else {
        const fld = np[1];
        punew.tag[fld] = value;
    }
    this.setState({processUnit: punew } );
  }
  
  fetchList() {
    const myRequest = SERVERROOT + "/processunit/all";
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
          const emsg = "ProcessUnitAdmin.fetchList: Fetching process unit list";
          alert(emsg+"\n"+e);
          Log.error(emsg+" - "+e);
        }
      }
      request();
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
//      Log.info( "ProcessUnitAdmin.mouseUp: siteLocation{(NW["+l.c1Lat+","+l.c1Long+"] SE("+l.c2Lat+","+l.c2Long+")]}");
//      Log.info( "ProcessUnitAdmin.mouseUp: "+lat+","+long);
      let punew = Object.assign({},this.state.processUnit);
      let nextCorner = this.state.nextCorner;
      if( nextCorner === 1 ) {
        punew.c1Lat = lat;
        punew.c1Long = long;
        nextCorner = 2;
      } else {
        punew.c2Lat = lat;
        punew.c2Long = long;
        nextCorner = 1;        
      }
      this.setState( {tank: punew, nextCorner:nextCorner} );
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
        return <ProcessUnitList 
                   returnedText = {this.state.returnedText}
                   puSelect = {this.handleSelect} />
      case "itemRetrieved":
        if( (this.state.processUnit === null) || (this.state.inpTags === null) 
          || (this.state.siteLocation === null) ) {
          return <Waiting />        
        } else {
          return <ProcessUnitForm
                     returnedText = {this.state.returnedText}
                     processUnit  = {this.state.processUnit}
                     site         = {this.state.siteLocation}
                     tags         = {this.state.inpTags}
                     puUpdate     = {this.handleUpdate}
                     fieldChange  = {this.handleFieldChange}
                     handleQuit   = {this.handleQuit}
                     handleMouseUp = {this.handleMouseUp}
                 />
        }
      default:
        return <DefaultContents />
    }
  }
}


export default ProcessUnitAdmin