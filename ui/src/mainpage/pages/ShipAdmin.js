/*************************************************************************
 * ShipAdmin.js
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
import {SERVERROOT}     from '../../Parameters.js';
import ShipList         from './lists/ShipList.js';
import ShipForm         from './forms/ShipForm.js';
import DefaultContents  from './DefaultContents.js';
import Log              from '../requests/Log.js';
import OMSRequest       from '../requests/OMSRequest.js';
import Waiting          from './Waiting.js';
import {Tag}            from './objects/Tag.js';



class ShipAdmin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stage: props.stage,
      nextCorner: 1,
      updateData: false,
      updateDisplay: true,
      returnedText: null,
      ship: null,
      dock: null,
      dockList: null
    };
    this.finishDListFetch   = this.finishDListFetch.bind(this);
    this.finishShipFetch    = this.finishShipFetch.bind(this);
    this.finishListFetch    = this.finishListFetch.bind(this);
    this.handleShipSelect   = this.handleShipSelect.bind(this);
    this.handleShipUpdate   = this.handleShipUpdate.bind(this);
    this.handleFieldChange  = this.handleFieldChange.bind(this);
    this.handleMouseUp      = this.handleMouseUp.bind(this);
    this.handleQuit         = this.handleQuit.bind(this);
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

/* */
  finishShipFetch( req ) {
    let td = req;
    let tgTyp = (td.id===0)?"S":td.tagTypeCode;
    const t = new Tag(td.id,td.name,td.description,tgTyp,td.tagTypeId,td.misc
                     ,td.c1Lat,td.c1Long,td.c2Lat,td.c2Long,td.active
                     ,td.inTagId,td.outTagId,td.inTagList,td.outTagList);
    this.setState({stage: "shipRetrieved", updateDisplay: true, ship: t });
  }

  finishDListFetch(req) {
    let mt = {};
    mt.id = 0;
    mt.name = '---';
    req.unshift(mt);
    this.setState({stage: "shipRetrieved", updateDisplay: true, dockList: req });
  }
  
  handleShipSelect(event) {
    const id = event.z;
    const loc = "ShipAdmin.shipSelect";
    let req0 = new OMSRequest(loc, SERVERROOT + "/tag/" + id,
                             "Problem selecting tag id "+id, this.finishShipFetch);
    req0.fetchData();
    let req4 = new OMSRequest(loc, SERVERROOT + "/tag/types/DK",
                            "Problem retrieving roles", this.finishDListFetch);
    req4.fetchData();
  }

  handleShipUpdate(event) {
    event.preventDefault();
    const clsMthd = "ShipAdmin.handleUpdate";
    const ship = this.state.ship;
    const id = ship.id;
    let method = "PUT";
    let url = SERVERROOT + "/tag/update";
    if( id === 0 ) {
      method = "POST";
      url = SERVERROOT + "/tag/insert";
    }
    const b = JSON.stringify(ship);
    const request = async () => {
      try {
        await fetch(url, {method:method, headers:{'Content-Type':'application/json'}, body: b});
        alert("Update/insert complete on ship, id="+id)
      } catch( error ) {
        const emsg = "Problem "+(id===0?"inserting":"updating")+" ship, id="+id;
        alert(emsg+"\n"+error);
        Log.error(emsg+" - " + error,clsMthd);
      }
    }
    request();
  }

  componentDidMount() {
    this.fetchList("ALL");
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
    let tnew = Object.assign({},this.state.ship);
    if( name === 'inTagId' ) {
      tnew[name] = parseInt(value,10);
    } else {
      tnew[name] = value;
    } 
    this.setState({ship:tnew} );
  }


  finishListFetch( req ) {
    this.setState( {stage:"dataFetched", updateDisplay:true, returnedText: req } );
  }
    
  fetchList(type) {
    let loc = "ShipAdmin.fetchList";
    let req0 = new OMSRequest(loc, SERVERROOT + "/tag/type/S",
                            "Problem selecting ship list", this.finishListFetch);
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
  }
 

  render() {
    switch( this.state.stage ) {
  	  case "begin":
        return <Waiting />
      case "dataFetched":
        return <ShipList returnedText = {this.state.returnedText}
                         shipSelect   = {this.handleShipSelect} />
      case "shipRetrieved":
        if( (this.state.ship === null) || (this.state.dockList===null)  ) 
        {
          return <Waiting />
        } else {
          return <ShipForm ship          = {this.state.ship}
                           dockList      = {this.state.dockList}
                           shipUpdate    = {this.handleShipUpdate}
                           fieldChange   = {this.handleFieldChange}
                           handleQuit    = {this.handleQuit} />
        }
      default:
        return <DefaultContents />
    }
  }
}

export default ShipAdmin;
