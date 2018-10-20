/*************************************************************************
 * Schematic.js
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

import React, {Component} from 'react';
import Log                from '../requests/Log.js';

import {SERVERROOT}       from '../../Parameters.js';
import DefaultContents    from './DefaultContents.js';
import SchematicDisplay   from './displays/SchematicDisplay.js';
import Waiting            from './Waiting.js';


class Schematic extends Component {
  constructor(props) {
    super(props);
    Log.info( "Schematic " );
    this.state = {
      stage: props.stage,
      option: props.option,
      updateData: false,
      updateDisplay: true,
      returnedText: null,
      id: null,
      unitTimer: null,
      itemTimer: null
    };
    this.handleMouseup = this.handleMouseup.bind(this);
    this.handleQuit    = this.handleQuit.bind(this);
  }
  
  handleErrors(response) {
    if (!response.ok) {
        throw Error(response.status+" ("+response.statusText+")");
    }
    return response;
  }

  componentWillReceiveProps(nextProps) {
    Log.info("Schematic.willReceiveProps: "+this.state.option+" =? next "+ nextProps.option );
    clearInterval(this.state.itemTimer);
    if( nextProps.option !== this.state.option ) {
      this.setState({option: nextProps.option});
      this.fetchList(nextProps.option);
    }
  }
  
  shouldComponentUpdate(nextProps,nextState) {
    let sts = nextState.updateDisplay;
    Log.info( "Schematic.shouldUpdate? : (" + nextState.stage + ") " + (sts?"T":"F") );
    return sts;
  }

/* */ 
  reqOut( id ) {
    const myRequest=SERVERROOT + "/tag/output/" + id;
    var now = new Date();
    Log.info( "Schematic.reqOut - Request: " + myRequest + " - " + now.toLocaleString() );
    fetch(myRequest,  {
      method: "PUT",
      headers: {'Content-Type':'application/json'}
    })
      .then(this.handleErrors)
      .catch(function(error) { 
       alert("Problem selecting process unit id "+id+"\n"+error);
       Log.error("Schematic.reqOut: Error - " + error);  
    });
  }

  handleMouseup(event) {
    let now = new Date();
    let x = event.evt.offsetX;
    let y = event.evt.offsetY;
    Log.info( "Schematic.mouseUp " + now.toLocaleString()+" x="+x+", y="+y );
    let scm = this.state.returnedText;
    let scos = scm.childTags;
    for( var i=0; i<scos.length; i++) {
      let e = scos[i];
      if(   (x >= e.c1Lat)  && (x <= e.c2Lat) 
         && (y >= e.c1Long) && (y <= e.c2Long) ) {
        let outTagId = (e.outTagId===null)?undefined:e.outTagId;
        if( (outTagId !== undefined) && (e.outTagId !== 0)) {
          this.reqOut(outTagId);
        }
      } 
    }
  }

/* */
  handleQuit() {
    this.fetchList(this.state.option);
    clearInterval(this.state.itemTimer);
    var myTimerID = setInterval(() => {this.fetchList(this.state.option)}, 60000 );
    this.setState( {unitTimer: myTimerID } );    
  }

  fetchList(opt) {
    const clsMthd = "Schematic.fetchList";
    const myRequest = SERVERROOT + "/schematic/" + opt;
    if( myRequest !== null ) {
      const request = async () => {
        const response = await fetch(myRequest);
        const json = await response.json();
        this.setState( {returnedText: json, 
                        updateData: false, 
                        updateDisplay:true,
                        stage: "dataFetched" } );
      }
      try {
        request();
      } catch( e ) {
        const emsg = "Problem fetching schematic list";
        alert(emsg+"\n"+e);
        Log.error(emsg+" - " + e, clsMthd);        
      }

    }
  }

  componentDidMount() {
    Log.info( "Schematic.didMount: " + this.state.stage );
    this.fetchList(this.state.option);
    var myTimerID = setInterval(() => {this.fetchList(this.state.option)}, 60000 );
    this.setState( {unitTimer: myTimerID } );
  }
  
  componentWillUnmount() {
    Log.info( "Schematic.willUnmount "+this.state.unitTimer);
    if( this.state.unitTimer !== null ) {
      clearInterval(this.state.unitTimer);
    }
//    if( this.state.itemTimer !== null ) {
//      clearInterval(this.state.itemTimer);
//    }
  }

  render() {
    Log.info("Schematic.render " + this.state.stage );
    switch (this.state.stage) {
      case "begin":
        return <Waiting />
      case "dataFetched":
        return <SchematicDisplay option = {this.state.option}
                                 schematic = {this.state.returnedText}
                                 handleMouseup = {this.handleMouseup} 
               />
//      case "itemRetrieved":
//        return <ItemDisplay id    = {this.state.id}
//                            items = {this.state.returnedText}
//                            quit  = {this.handleQuit} />
      default:
        return <DefaultContents />
    }
  }
}

export default Schematic;