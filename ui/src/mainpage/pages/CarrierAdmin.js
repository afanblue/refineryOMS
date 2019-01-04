/*************************************************************************
 * CarrierAdmin.js
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
import DefaultContents from './DefaultContents.js';
import Log             from '../requests/Log.js';
import CarrierForm   from './forms/CarrierForm.js';
import CarrierList   from './lists/CarrierList.js';
import Waiting         from './Waiting.js';
import {Carrier}     from './objects/Carrier.js';
//import {Tag}           from './objects/Tag.js';



class CarrierAdmin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stage: props.stage,
      updateData: false,
      updateDisplay: true,
      returnedText: null,
      carrier: null,
      custList: null
    }
    this.handleCarrierChange = this.handleCarrierChange.bind(this);
    this.handleCarrierSelect = this.handleCarrierSelect.bind(this);
    this.handleCarrierUpdate = this.handleCarrierUpdate.bind(this);
    this.handleCarrierQuit   = this.handleCarrierQuit.bind(this);
    this.finishCntnrFetch    = this.finishCntnrFetch.bind(this);
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
  
  finishCntnrFetch( req ) {
    let cd = req;
    const c = new Carrier(cd.id,cd.name,cd.description,cd.tagTypeCode,cd.tagTypeId
                         ,cd.misc,cd.active,cd.quantity);
    this.setState( {stage: "itemRetrieved", updateDisplay: true, carrier: c} );
  }

  fetchFormData(id) {
    const myRequest = SERVERROOT + "/carrier/" + id;
    const loc = "CarrierAdmin.fetchFormData";
    let req0 = new OMSRequest(loc, myRequest, 
                             "Problem selecting carrier "+myRequest, this.finishCntnrFetch);
    req0.fetchData();
  }

  handleCarrierSelect(event) {
    const id = event.z;
    this.fetchFormData(id);
  }

  handleCarrierUpdate(event) {
    event.preventDefault();
    const id = this.state.carrier.id;
    let method = "PUT";
    let url = SERVERROOT + "/carrier/update";
    if( id === 0 ) {
      method = "POST";
      url = SERVERROOT + "/carrier/insert";
    }
    var c = this.state.carrier;
    c.name = c.tagTypeCode+id;
    const b = JSON.stringify(c);
    const clsMthd = "CarrierAdmin.carrierUpdate";
    const request = async () => {
      try {
        await fetch(url, {method:method, headers:{'Content-Type':'application/json'}, body: b});
        alert("Update/insert complete on "+c.name)
        this.fetchFormData(id);
      } catch( error ) {
        const emsg = "Problem "+(id===0?"inserting":"updating")+" carrier, id="+id;
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
  
  handleCarrierChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    let np = name.split(".");
    let fnew = Object.assign({},this.state.carrier);
    if( np.length === 1 ) {
        const carrier = np[0];
        fnew[carrier] = value;
    } else {
        const carrier = np[1];
        fnew.tag[carrier] = value;
    }
    this.setState({carrier: fnew } );
  }
  
  fetchList() {
    const clsMthd = "CarrierAdmin.fetchList";
    const myRequest = SERVERROOT + "/carrier/all";
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
          const emsg = "Problem fetching carrier list";
          alert(emsg+"\n"+e);
          Log.error(emsg+" - " + e, clsMthd);        
        }
      }
      request();
    }
  }
  
  handleCarrierQuit(event) {
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
        return <CarrierList returnedText = {this.state.returnedText}
                           carrierSelect = {this.handleCarrierSelect} />
      case "itemRetrieved":
        if( this.state.carrier === null ) {
          return <Waiting />
        } else {
          return <CarrierForm returnedText = {this.state.returnedText}
                          carrier          = {this.state.carrier}
                          carrierUpdate    = {this.handleCarrierUpdate}
                          carrierChange    = {this.handleCarrierChange}
                          handleQuit       = {this.handleCarrierQuit}
               />
        }
      default:
        return <DefaultContents />
    }
  }
}


export default CarrierAdmin