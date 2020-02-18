/*************************************************************************
 * OrderAdmin.js
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
import OMSRequest      from '../requests/OMSRequest.js';
import DefaultContents from './DefaultContents.js';
import Log             from '../requests/Log.js';
import OrderForm       from './forms/OrderForm.js';
import OrderList       from './lists/OrderList.js';
import Waiting         from './Waiting.js';
import {Order,Item}    from './objects/Order.js';


/*
{"id":177,"name":"DCTK-A101","api":32.6,"density":0.862,"height":25.0,"diameter":30.0
,"units":"f","c1Lat":39.58405,"c1Long":-75.62484,"c2Lat":null,"c2Long":null
,"contentType":"Asphalt","contentTypeCode":"A","state":"Y","tempTag":null,"levelTag":null},
*/


class OrderAdmin extends Component {
  constructor(props) {
    super(props);
    Log.info("OrderAdmin - constructor");
    this.state = {
      stage: props.stage,
      updateData: false,
      updateDisplay: true,
      returnedText: null,
      order: null,
      orderTypes: null,
      contentTypes: null,
      customers: null,
      carriers: null,
      option: "B",
      color: "green",
      type: props.type,
      nextCorner: 1
    };
    this.handleFieldChange   = this.handleFieldChange.bind(this);
    this.handleCopy          = this.handleCopy.bind(this);
    this.handleSelect        = this.handleSelect.bind(this);
    this.handleUpdate        = this.handleUpdate.bind(this);
    this.handleQuit          = this.handleQuit.bind(this);
    this.handleClick         = this.handleClick.bind(this);
    this.finishXferFetch     = this.finishXferFetch.bind(this);
    this.finishTypesFetch    = this.finishTypesFetch.bind(this);
    this.finishCarriersFetch = this.finishCarriersFetch.bind(this);
    this.finishCustFetch     = this.finishCustFetch.bind(this);
  }

  static get propTypes() {
      return {
          stage: PropTypes.string,
          option: PropTypes.string,
          type: PropTypes.any
      }
  }

  handleErrors(response) {
    if (!response.ok) {
        throw Error(response.status+" ("+response.statusText+")");
    }
    return response;
  }

  /* after instantiation and before re-rendering */
  static getDerivedStateFromProps(nextProps,prevState) {
    Log.info("getDerivedStateFromProps");
    return prevState;
  }

  shouldComponentUpdate(nextProps,nextState) {
    Log.info("OrderAdmin - shouldComponentUpdate - stage : "+this.state.stage+"/"+nextProps.stage
            +", option: "+this.state.option+"/"+nextProps.option);
    let sts = nextState.updateDisplay;
    if( nextState.stage !== this.state.stage ) { sts = true; }
    if( nextProps.option !== this.state.option ) {
      this.fetchList(nextProps.option);
    }
    return sts;
  }

  finishXferFetch( req ) {
    let xd = req;
    let items = xd.items;
    var x = new Order( xd.shipmentId, xd.customerId, xd.customer, xd.carrierId
                     , xd.carrier, xd.active, xd.purchase, xd.expDate, xd.actDate
                     , xd.expVolume, xd.actVolume );
    var ordItems = [];
    items.map(
      function(n,x){
        let sid = n.shipmentId===0?xd.shipmentId:n.shipmentId;
        let i = new Item(sid,n.itemNo,n.newItem,n.contentCd,n.expVolumeMin,n.expVolumeMax,n.actVolume);
        return ordItems.push(i);
      } )
    x.items = ordItems;
    this.setState({stage: "itemRetrieved",
                   updateDisplay: true,
                   updateData: false,
                   order: x
                  });
  }

  finishTypesFetch(req) {
    let blankItem = {};
    blankItem.code = null;
    blankItem.name = '---';
    req.unshift(blankItem);
    this.setState({stage: "itemRetrieved", updateDisplay: true, contentTypes:req });
  }

  finishCarriersFetch(req) {
    this.setState({stage: "itemRetrieved", updateDisplay: true, carriers: req });
  }

  finishCustFetch(req) {
    this.setState({stage: "itemRetrieved", updateDisplay: true, customers: req });
  }

  fetchFormData(id) {
    const loc = "OrderAdmin.select";
    Log.info(loc + " - " + id);
    let myRequest = SERVERROOT + "/order/" + id;
    let req0 = new OMSRequest(loc, myRequest,
                            "Problem selecting order "+myRequest,
                            this.finishXferFetch);
    req0.fetchData();
    let req1 = new OMSRequest(loc, SERVERROOT + "/referencecode/category/content-type",
                            "Problem retrieving contents list", this.finishTypesFetch);
    req1.fetchData();
    let req2 = new OMSRequest(loc, SERVERROOT + "/customer/all",
                            "Problem retrieving customer list ", this.finishCustFetch);
    req2.fetchData();
    let req3 = new OMSRequest(loc, SERVERROOT + "/carrier/all",
                            "Problem retrieving input tag list", this.finishCarriersFetch);
    req3.fetchData();

  }

  handleSelect(event) {
    const id = event.z;
    this.fetchFormData(id);
  }

  validateForm( x ) {
    let doSubmit = true;
    let msg = "The following fields ";
    if( x.statusId === 0 ) {
        doSubmit = false;
        msg += "order status, ";
    }
    if(x.orderTypeId === 0) {
        doSubmit = false;
        msg = "order type, ";
    }
    if(x.sourceId === 0) {
        doSubmit = false;
        msg = "order source, ";
    }
    if(x.destinationId === 0) {
        doSubmit = false;
        msg = "order destination ";
    }
    if( ! doSubmit ) {
      msg += " must be selected!";
      alert(msg);
    }
    return doSubmit;
  }

  updateOrder(id) {
    let clsMthd = "OrderAdmin.updateOrder";
    Log.info(clsMthd + " - " + id);
    let newt = Object.assign({},this.state.order);
    let method = "PUT";
    let url = SERVERROOT + "/order/update";
    if( id === 0 ) {
      newt.id = 0;
      method = "POST";
      url = SERVERROOT + "/order/insert";
    }
    var b = JSON.stringify( newt );
    const request = async () => {
      try {
        await fetch(url, {method:method, headers:{'Content-Type':'application/json'}, body: b});
        alert("Update complete on order "+newt.shipmentId)
      } catch( error ) {
        let emsg = clsMthd+" - Problem "+(id===0?"inserting":"updating")+" order id "+id;
        alert(emsg+"\n"+error);
        Log.error(emsg+" - " + error,clsMthd);
      }
    }
    request();
  }

  handleUpdate(event) {
    event.preventDefault();
    let x = this.state.order;
    let doSubmit = this.validateForm(x);
    if( doSubmit ) {
      const id = this.state.order.id;
      this.updateOrder(id);
    }
  }

  handleCopy(event) {
    event.preventDefault();
    let x = this.state.order;
    let doSubmit = this.validateForm(x);
    if( doSubmit ) {
      const id = 0;
      this.updateOrder(id);
    }
  }

  componentDidMount() {
    Log.info("OrderAdmin - componentDidMount");
    this.fetchList(this.state.option);
  }

//  componentDidUpdate( prevProps, prevState ) {
//    Log.info("OrderAdmin - componentDidUpdate");
//  }

  handleClick() {
  }

  handleFieldChange(event) {
    let ordNew = Object.assign({},this.state.order);
    const target = event.target;
    if( (target !== null) && (target !== undefined) ) {
      const value = target.value;
      const name = target.name;
      let np = name.split(".");
      if( np.length === 1 ) {
        const field = np[0];
        ordNew[field] = value;
      } else {
        let itemNo = parseInt(np[1],10);
        let fld = np[2];
        ordNew.items[itemNo][fld] = value;
      }
    } else {
      let iso = event.format("YYYY-MM-DD");
      ordNew["expDate"] = iso;
    }
    this.setState({order: ordNew } );
  }


  fetchList(option) {
    const clsMthd = "OrderAdmin.fetchList";
    Log.info(clsMthd + " - " + option);
    var myRequest = SERVERROOT + "/order/active";
    if( option !== "B" ) {
      myRequest = SERVERROOT + "/order/type/" + option;
    }
    if( myRequest !== null ) {
      const request = async () => {
        try {
          const response = await fetch(myRequest);
          const json = await response.json();
          this.setState( {returnedText: json,
                          updateData: false,
                          updateDisplay:true,
                          option:option,
                          stage: "dataFetched" } );
        } catch( error ) {
          let emsg = clsMthd+" - Problem fetching order list";
          alert(emsg+"\n"+error);
          Log.error(emsg+" - " + error,clsMthd);
        }
      }
      request();
    }
  }

  handleQuit(event) {
    event.preventDefault();
    this.fetchList("B");
    this.setState( {returnedText: null,
                    updateData: true,
                    updateDisplay:true,
                    order: null,
                    stage: "begin" } );
  }

  render() {
    Log.info("OrderAdmin - render - stage: "+this.state.stage);
    switch( this.state.stage ) {
      case "begin":
        return <Waiting />
      case "dataFetched":
        return <OrderList orderData = {this.state.returnedText}
                          orderSelect = {this.handleSelect}
                          handleQuit = {this.handleQuit}
               />
      case "itemRetrieved":
        if( (this.state.order     === null) || (this.state.carriers === null) ||
            (this.state.customers === null) || (this.state.contentTypes === null) )
        {
          return <Waiting />
        } else {
          return <OrderForm order       = {this.state.order}
                            contents    = {this.state.contentTypes}
                            carriers    = {this.state.carriers}
                            customers   = {this.state.customers}
                            orderCopy   = {this.handleCopy}
                            orderUpdate = {this.handleUpdate}
                            fieldChange = {this.handleFieldChange}
                            handleQuit  = {this.handleQuit}
                            handleClick = {this.handleClick}
                 />
        }
      default:
        return <DefaultContents />
    }
  }
}

export default OrderAdmin;
