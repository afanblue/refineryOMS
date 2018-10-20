/*************************************************************************
 * VesselAdmin.js
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
import {SERVERROOT}    from '../../Parameters.js';
import DefaultContents from './DefaultContents.js';
import Log             from '../requests/Log.js';
import VesselForm      from './forms/VesselForm.js';
import VesselList      from './lists/VesselList.js';
import Waiting         from './Waiting.js';
import {Vessel}        from './objects/Vessel.js';
import {Tag}           from './objects/Tag.js';



class VesselAdmin extends Component {
  constructor(props) {
    super(props);
    Log.info( "VesselAdmin: " + props.stage );
    this.state = {
      stage: props.stage,
      updateData: false,
      updateDisplay: true,
      returnedText: null,
      vessel: null,
      custList: null
    }
    this.handleVesselChange = this.handleVesselChange.bind(this);
    this.handleVesselSelect = this.handleVesselSelect.bind(this);
    this.handleVesselUpdate = this.handleVesselUpdate.bind(this);
    this.handleVesselQuit   = this.handleVesselQuit.bind(this);
  }
  
  handleErrors(response) {
    if (!response.ok) {
        throw Error(response.status+" ("+response.statusText+")");
    }
    return response;
  }

  componentWillReceiveProps(nextProps) {
    Log.info( "VesselAdmin.willRcvProps: " + nextProps.selected + ":"
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
    Log.info( "VesselAdmin.shouldUpdate? : (" + nextState.stage + ") " + (sts?"T":"F") );
    return sts;
  }

  fetchFormData(id) {
    const myRequest = SERVERROOT + "/vessel/" + id;
    const clsMthd = "VesselAdmin.fetchFormData";
    const request = async () => {
      const response = await fetch(myRequest);
      const vd = await response.json();
      const t = new Tag(vd.id,vd.tag.name,vd.tag.description,vd.tag.tagTypeCode,vd.tag.tagTypeId
                       ,vd.tag.misc,vd.tag.c1Lat,vd.tag.c1Long,vd.tag.c2Lat,vd.tag.c2Long,vd.tag.active);
      const v = new Vessel(vd.id,t,vd.vesselName,vd.quantity,vd.customerId,vd.customer);
      const custList = vd.customers;
      this.setState({stage: "itemRetrieved",
                     updateDisplay: true,
                     updateData: false,
                     returnedText: vd,
                     vessel: v,
                     custList: custList
                    });
    }
    try {
      request();
    } catch( e ) {
      const emsg = "Problem fetching vessel id "+id; 
      alert(emsg+"\n"+e);
      Log.error(emsg+" - " + e, clsMthd);        
    }
  }

  handleVesselSelect(event) {
    const id = event.z;
    this.fetchFormData(id);
  }

  handleVesselUpdate(event) {
    event.preventDefault();
    const id = this.state.vessel.id;
    let method = "PUT";
    let url = SERVERROOT + "/vessel/update";
    if( id === 0 ) {
      method = "POST";
      url = SERVERROOT + "/vessel/insert";
    }
    var v = this.state.vessel;
    v.tag.name = v.tag.tagTypeCode+id;
    const b = JSON.stringify(v);
    const clsMthd = "VesselAdmin.vesselUpdate";
    const request = async () => {
      await fetch(url, {method:method, headers:{'Content-Type':'application/json'}, body: b});
      Log.info( "update complete",clsMthd );
      alert("Update/insert complete on "+v.tag.name)
      this.fetchFormData(id);
    }
    try {
      request();
    } catch( error ) {
      const emsg = "Problem "+(id===0?"inserting":"updating")+" vessel, id="+id;
      alert(emsg+"\n"+error);
      Log.error(emsg+" - " + error,clsMthd);
    }
    
    fetch(url, {
      method: method,
      headers: {'Content-Type':'application/json'},
      body: b
    }).then(this.handleErrors)
      .then(response => {
        this.fetchFormData(id);
    }).catch(function(error) { 
        alert("Problem "+(id===0?"inserting":"updating")+" vessel "
             +"id "+id+"\n"+error);
        Log.error("VesselAdmin.vesselUpdate: Error - " + error);  
    });
  }
  
  componentDidMount() {
    Log.info( "VesselAdmin.didMount: " + this.state.stage );
    this.fetchList();
  }
  
  componentDidUpdate( prevProps, prevState ) {
    Log.info( "VesselAdmin.didUpdate: " + this.state.stage );
    switch (this.state.stage) {
      case "begin":
        break;
      default:
    }
  }
  
  handleVesselChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    let np = name.split(".");
    let fnew = Object.assign({},this.state.vessel);
    if( np.length === 1 ) {
        const vessel = np[0];
        fnew[vessel] = value;
    } else {
        const vessel = np[1];
        fnew.tag[vessel] = value;
    }
    this.setState({vessel: fnew } );
  }
  
  fetchList() {
    const clsMthd = "VesselAdmin.fetchList";
    const myRequest = SERVERROOT + "/vessel/all";
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
        const emsg = "Problem fetching vessel list";
        alert(emsg+"\n"+e);
        Log.error(emsg+" - " + e, clsMthd);        
      }
    }
  }
  
  handleVesselQuit(event) {
    event.preventDefault();
    this.fetchList();
    this.setState( {returnedText: null, 
                    updateData: true, 
                    updateDisplay:true,
                    stage: "begin" } );
  }

  render() {
    Log.info("VesselAdmin.render - stage: "+this.state.stage);
    switch( this.state.stage ) {
  	  case "begin":
        return <Waiting />
      case "dataFetched":
        return <VesselList returnedText = {this.state.returnedText}
                           vesselSelect = {this.handleVesselSelect} />
      case "itemRetrieved":
        return <VesselForm returnedText = {this.state.returnedText}
                          vessel        = {this.state.vessel}
                          custList      = {this.state.custList}
                          vesselUpdate  = {this.handleVesselUpdate}
                          vesselChange  = {this.handleVesselChange}
                          handleQuit    = {this.handleVesselQuit}
               />
      default:
        return <DefaultContents />
    }
  }
}


export default VesselAdmin