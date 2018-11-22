/*************************************************************************
 * PlotManager.js
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
import {SERVERROOT}    from '../../Parameters.js';
import OMSRequest      from '../requests/OMSRequest.js';
import Log             from '../requests/Log.js';

import DefaultContents from './DefaultContents.js';
import GroupPlot       from './displays/GroupPlot.js';
import Waiting         from './Waiting.js';
import {PlotGroup}     from './objects/PlotGroup.js';


/**
 * the ad hoc form is appropriately ad hoc.  I fetch the contents of plot group
 * w/ID = 0 (i.e., a new plot group), which returns the list of analog values.
 * Since that's all I needed anyway, I display a truncated new plot group form
 * w/only the list of tags.
 * As each item is selected, in the handleChange function I get the history for
 * the selected item and store it away in a state variable, d1, d2, d3, or d4.
 *
 * this creates some problems if an item is dropped, since i have to replace 
 * the history data as well.  it turns out this isn't a big problem, since the
 * new item is always the last one.
 *
 * Anyway, once the submit button is clicked, we generate the plot form.
 *
 * Notice I broke from my usual form by adding the form into the admin script. 
 */

cont FORM = "PlotManager";


class PlotManager extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stage: props.stage,
      updateData: false,
      updateDisplay: true,
      returnedText: null,
      plotGroup: null,
      d0: null,
      d1: null,
      d2: null,
      d3: null,
      aiList: null,
      unitTimer: null
    }
    this.handleChange  = this.handleChange.bind(this);
    this.handleUpdate  = this.handleUpdate.bind(this);
    this.handleQuit    = this.handleQuit.bind(this);
    this.finishPGFetch = this.finishPGFetch.bind(this);
    this.finishAIListFetch = this.finishAIListFetch.bind(this);
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
    let aiList = req;
    this.setState({stage: "itemRetrieved", updateDisplay: true, aiList: aiList });
  }
  
  fetchFormData(id) {
    const loc = FORM+".pgSelect";
    let req0 = new OMSRequest(loc, SERVERROOT + "/plotGroup/" + id,
                            "Problem selecting plot group id "+id, this.finishPGFetch);
    req0.fetchData();
    let req1 = new OMSRequest(loc, SERVERROOT + "/tag/idname/AI",
                            "Problem retrieving AI types", this.finishAIListFetch);
    req1.fetchData();
  }


  fetchHistory(id,ndx) {
    if( id !== undefined) {
      const myRequest = SERVERROOT + "/ai/history/" + id + "/2";
      fetch(myRequest)
        .then(this.handleErrors)
        .then(response => {
          var contentType = response.headers.get("Content-Type");
          if(contentType && contentType.includes("application/json")) {
            return response.json();
          }
          throw new TypeError(FORM+".fetchHistory: response ("+contentType+") must be a JSON string");
      }).then(json => {
         let fd = json;
         switch( ndx ) {
           case 1:  this.setState({d0:fd}); break;
           case 2:  this.setState({d1:fd}); break;
           case 3:  this.setState({d2:fd}); break;
           default: this.setState({d3:fd}); break;
         }
      }).catch(function(error) { 
         alert("Problem selecting AdHoc id "+id+"\n"+error);
         Log.error("Error - " + error,FORM+".fetchHistory");  
      });
    }
  }

  handleUpdate(event) {
    event.preventDefault();
    var id1 = this.state.plotGroup.aiList[0];
    var id2 = this.state.plotGroup.aiList[1];
    var id3 = this.state.plotGroup.aiList[2];
    var id4 = this.state.plotGroup.aiList[3];
    var myTimerID = setInterval(() => {this.fetchHistory(id1,1);
                                       this.fetchHistory(id2,2);
                                       this.fetchHistory(id3,3);
                                       this.fetchHistory(id4,4);}, 60000 );
    this.setState({stage: "generatePlot",
                   unitTimer: myTimerID});
  }
  
  componentDidMount() {
    this.fetchFormData(0);
  }
  
  componentDidUpdate( prevProps, prevState ) {
    switch (this.state.stage) {
      case "begin":
        break;
      default:
    }
  }
  
  handleChange(event) {
    const target = event.target;
    const value = target.value;
    let pgnew = Object.assign({},this.state.plotGroup);

    if( target.value !== "" ) {
      let tv = parseInt(value,10);
      let f = -1;
      let tNew = [];
      let tLength = (pgnew.aiList===null?0:pgnew.aiList.length);
      for( var i=0; i<tLength; i++) {
        let v = pgnew.aiList.shift();
        if( v === value ) { 
          f = i;
        } else {
          tNew.push(v);
        }
      }
      if( f === -1 ) {
        if( tNew.length >= 4 ) {
          alert("Plot Groups can only contain 4 tags\n\nPlease remove one before selecting another");
        } else {
          tNew.push(tv);
          this.fetchHistory(tv,tNew.length);
        }
        pgnew.aiList = tNew;
      }
      this.setState({plotGroup: pgnew } );
    }
    
  }
  
  handleQuit(event) {
    event.preventDefault();
    if( this.state.unitTimer !== null ) {
      clearInterval(this.state.unitTimer);
    }
//    this.fetchFormData(0);
    let pgnew = Object.assign({},this.state.plotGroup);
    let tNew = [];
    pgnew.aiList = tNew;
    this.setState({plotGroup: pgnew, stage: "itemRetrieved" } );
  }
  
  componentWillUnmount() {
    if( this.state.unitTimer !== null ) {
      clearInterval(this.state.unitTimer);
    }
  }
  


  render() {
    switch( this.state.stage ) {
  	  case "begin":
        return <Waiting />
      case "generatePlot":
        return <GroupPlot d0 = {this.state.d0}
                          d1 = {this.state.d1}
                          d2 = {this.state.d2}
                          d3 = {this.state.d3}
                          handleQuit = {this.handleQuit} />
      default:
        return <DefaultContents />
    }
  }
}


export default PlotManager