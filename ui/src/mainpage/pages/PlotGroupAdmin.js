import React, {Component} from 'react';
import {SERVERROOT} from '../../Parameters.js';

import DefaultContents from './DefaultContents.js';
import OMSRequest      from '../requests/OMSRequest.js';
import Log             from '../requests/Log.js';
import PlotGroupForm   from './forms/PlotGroupForm.js';
import PlotGroupList   from './lists/PlotGroupList.js';
import Waiting         from './Waiting.js';
import {PlotGroup}     from './objects/PlotGroup.js';

/*************************************************************************
 * PlotGroupAdmin.js
 * Copyright (C) 2018  A. E. Van Ness
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



class PlotGroupAdmin extends Component {
  constructor(props) {
    super(props);
    Log.info( "PlotGroupAdmin: " + props.stage );
    this.state = {
      stage: props.stage,
      updateData: false,
      updateDisplay: true,
      returnedText: null,
      plotGroup: null,
      aiVarList: null
    }
    this.handleChange   = this.handleChange.bind(this);
    this.handleSelect   = this.handleSelect.bind(this);
    this.handleUpdate   = this.handleUpdate.bind(this);
    this.handleQuit     = this.handleQuit.bind(this);
    this.finishPGFetch     = this.finishPGFetch.bind(this);
    this.finishAIListFetch = this.finishAIListFetch.bind(this);
  }
  
  handleErrors(response) {
    if (!response.ok) {
        throw Error(response.status+" ("+response.statusText+")");
    }
    return response;
  }

  componentWillReceiveProps(nextProps) {
    Log.info( "PlotGroupAdmin.willRcvProps: " + nextProps.selected + ":"
               + ((nextProps.option===null)?"null":nextProps.option)
               + "/" + nextProps.stage );
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
    Log.info( "PlotGroupAdmin.shouldUpdate? : (" + nextState.stage + ") " + (sts?"T":"F") );
    return sts;
  }

  finishPGFetch( req ) {
    let fd = req;
    let ail = [];
    if( fd.id1 !== null ) { ail.push(fd.id1); }
    if( fd.id2 !== null ) { ail.push(fd.id2); }
    if( fd.id3 !== null ) { ail.push(fd.id3); }
    if( fd.id4 !== null ) { ail.push(fd.id4); }
    let pg = new PlotGroup(fd.id, fd.name, fd.active, fd.id1
                          ,fd.id2, fd.id3, fd.id4, fd.source);
    pg.aiList = ail;
    this.setState({stage: "itemRetrieved",
                   updateDisplay: true,
                   updateData: false,
                   plotGroup: pg                 
                  });
  }
  
  finishAIListFetch(req) {
    let aiVarList = req;
    this.setState({stage: "itemRetrieved", updateDisplay: true, aiVarList: aiVarList });
  }
  
  fetchFormData(id) {
    const loc = "PlotGroupAdmin.pgSelect";
    let req0 = new OMSRequest(loc, SERVERROOT + "/plotGroup/" + id,
                            "Problem selecting plot group id "+id, this.finishPGFetch);
    req0.fetchData();
    let req1 = new OMSRequest(loc, SERVERROOT + "/tag/idname/AI",
                            "Problem retrieving AI types", this.finishAIListFetch);
    req1.fetchData();
  }

  handleSelect(event) {
    let now = new Date();
    Log.info( "PlotGroupAdmin.select " + now.toISOString() );
    const id = event.z;
    this.fetchFormData(id);
  }

  handleUpdate(event) {
    event.preventDefault();
    const id = this.state.plotGroup.id;
    let method = "PUT";
    let url = SERVERROOT + "/plotGroup/update";
    if( id === 0 ) {
      method = "POST";
      url = SERVERROOT + "/plotGroup/insert";
    }
    let pg = Object.assign({},this.state.plotGroup);
    var ail = pg.aiList;
    for(var i=0; i<ail.length; i++) {
      switch( i ) {
        case 0: pg.id1 = ail[i]; break;
        case 1: pg.id2 = ail[i]; break;
        case 2: pg.id3 = ail[i]; break;
        default: pg.id4 = ail[i]; break;
      }
    }
    pg.aiList = null;
    const b = JSON.stringify(pg);
    Log.info("PlotGroupAdmin.PlotGroupUpdate "+method)
    fetch(url, {
      method: method,
      headers: {'Content-Type':'application/json'},
      body: b
    }).then(this.handleErrors)
      .then(response => {
        this.fetchFormData(id);
    }).catch(function(error) { 
        alert("Problem "+(id===0?"inserting":"updating")+" PlotGroup "
             +"id "+id+"\n"+error);
        Log.error("PlotGroupAdmin.PlotGroupUpdate: Error - " + error);  
    });
  }
  
  componentDidMount() {
    Log.info( "PlotGroupAdmin.didMount: " + this.state.stage );
    this.fetchList();
  }
  
  componentDidUpdate( prevProps, prevState ) {
    Log.info( "PlotGroupAdmin.didUpdate: " + this.state.stage );
    switch (this.state.stage) {
      case "begin":
        break;
      default:
    }
  }
  
  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const fname = target.name;
    let pgnew = Object.assign({},this.state.plotGroup);

    if( target.name === "aiList" ) {
      let f = -1;
      let tNew = [];
      let tLength = (pgnew.aiList===null?0:pgnew.aiList.length);
      for( var i=0; i<tLength; i++) {
        let v = parseInt(pgnew.aiList.shift(),10);
        if( v === parseInt(value,10) ) { 
          f = i;
        } else {
          tNew.push(v);
        }
      }
      if( f === -1 ) {
        if( tNew.length >= 4 ) {
          alert("Plot Groups can only contain 4 tags\n\nPlease remove one before selecting another");
        } else {
          tNew.push(value);
        }
      }
      pgnew.aiList = tNew;
    } else {
      pgnew[fname] = value;
    }
    this.setState({plotGroup: pgnew } );
  }
  
  fetchList() {
    Log.info( "PlotGroupAdmin.fetchList : " + this.state.stage );
    const myRequest = SERVERROOT + "/plotGroup/all";
    const now = new Date();
    Log.info( "PlotGroupAdmin.fetchList " + now.toISOString() + " Request: " + myRequest );
    if( myRequest !== null ) {
      fetch(myRequest)
          .then(this.handleErrors)
          .then(response => {
            var contentType = response.headers.get("content-type");
            if(contentType && contentType.includes("application/json")) {
              return response.json();
            }
            throw new TypeError("PlotGroupAdmin(fetchList): response ("+contentType+") must be a JSON string");
        }).then(json => {
           Log.info("PlotGroupAdmin.fetchList: JSON retrieved - " + json);
           this.setState( {returnedText: json, 
                           updateData: false, 
                           updateDisplay:true,
                           stage: "dataFetched" } );
        }).catch(function(e) { 
           alert("Problem retrieving PlotGroup list\n"+e);
           const emsg = "PlotGroupAdmin.fetchList: Fetching PlotGroup list " + e;
           Log.error(emsg);
      });
    }
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
    Log.info("PlotGroupAdmin.render - stage: "+this.state.stage);
    switch( this.state.stage ) {
  	  case "begin":
        return <Waiting />
      case "dataFetched":
        return <PlotGroupList returnedText = {this.state.returnedText}
                              handleSelect = {this.handleSelect} />
      case "itemRetrieved":
        if( (this.state.plotGroup === null) || (this.state.aiVarList === null) ) {
          return <Waiting />
        } else {
          return <PlotGroupForm returnedText = {this.state.returnedText}
                                plotGroup    = {this.state.plotGroup}
                                aiVarList    = {this.state.aiVarList}
                                handleUpdate = {this.handleUpdate}
                                handleChange = {this.handleChange}
                                handleQuit   = {this.handleQuit}
               />
        }
      default:
        return <DefaultContents />
    }
  }
}


export default PlotGroupAdmin