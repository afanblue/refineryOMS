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
import moment             from 'moment';

import {SERVERROOT}    from '../../Parameters.js';
import OMSRequest      from '../requests/OMSRequest.js';
import DefaultContents from './DefaultContents.js';
import Log             from '../requests/Log.js';
import OrderForm       from './forms/OrderForm.js';
import OrderList       from './lists/OrderList.js';
import Waiting         from './Waiting.js';
import {Order,Item}    from './objects/Order.js';
import {IdName}        from './objects/Tag.js';

/*
{"id":177,"name":"DCTK-A101","api":32.6,"density":0.862,"height":25.0,"diameter":30.0
,"units":"f","c1Lat":39.58405,"c1Long":-75.62484,"c2Lat":null,"c2Long":null
,"contentType":"Asphalt","contentTypeCode":"A","state":"Y","tempTag":null,"levelTag":null},
*/


class OrderAdmin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stage: props.stage,
      updateData: false,
      updateDisplay: true,
      returnedText: null,
      option: props.option,
      contentCode: 'T',
      order: null,
      orderTypes: null,
      contentCodes: null,
      customers: null,
      carriers: null,
      color: "green",
      type: props.type,
      itemTimer: null
    };
    this.handleFieldChange   = this.handleFieldChange.bind(this);
    this.handleCopy          = this.handleCopy.bind(this);
    this.handleSelect        = this.handleSelect.bind(this);
    this.handleUpdate        = this.handleUpdate.bind(this);
    this.handleQuit          = this.handleQuit.bind(this);
    this.handleClick         = this.handleClick.bind(this);
    this.finishOrderFetch    = this.finishOrderFetch.bind(this);
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
    if( nextProps.option !== prevState.option ) {
	  var myTimerID = prevState.itemTimer;
      if( prevState !== 'B') {
        clearInterval(prevState.itemTimer);
        myTimerID = null;
      }
      return { option: nextProps.option, itemTimer:myTimerID };
    }
    return prevState;
  }

  shouldComponentUpdate(nextProps,nextState) {
    let sts = nextState.updateDisplay;
    if( nextState.stage !== this.state.stage ) { sts = true; }
    if( nextProps.option !== this.state.option ) {
      this.fetchList(nextProps.option);
    }
    return sts;
  }

  finishOrderFetch( req ) {
    let xd = req;
    let items = xd.items;
    var x = new Order( xd.id, xd.customerId, xd.customer
                     , xd.active, xd.purchase, xd.expDate, xd.actDate
                     , xd.expVolume, xd.actVolume, xd.contents
                     , xd.crontabId, xd.delay, xd.carrier, items );
    var ordItems = [];
    items.map(
      function(n,x){
        let sid = n.id===0?xd.id:n.id;
        let i = new Item(sid,n.itemNo,n.active,n.newItem,n.contentCd,n.expVolumeMin,n.expVolumeMax
                        ,n.actVolume,n.carrierId, n.carrier,n.stationId,n.station
                        ,n.transferId,n.transfer);
        return ordItems.push(i);
      } )
    var itemNo = ordItems.length+1;
    let i = new Item(xd.id, itemNo, "", false, "", 0, 0, 0, 0, "", 0, "", 0, "" );
    ordItems.push(i);
    x.items = ordItems;
    this.setState({stage: "itemRetrieved",
                   updateDisplay: true,
                   updateData: false,
                   order: x
                  });
  }

  finishTypesFetch(req) {
	var types = [];
    req.map(
      function(n,x) {
        let i = new IdName(n.code,n.name);
        return types.push(i);
      } )
    this.setState({stage: "itemRetrieved", updateDisplay: true, contentCodes:types });
  }

  finishCarriersFetch(req) {
    let blankItem = {};
    blankItem.code = null;
    blankItem.name = '---';
    req.unshift(blankItem);
    this.setState({stage: "itemRetrieved", updateDisplay: true, carriers: req });
  }

  finishCustFetch(req) {
    let blankItem = {};
    blankItem.code = null;
    blankItem.name = '---';
    req.unshift(blankItem);
    this.setState({stage: "itemRetrieved", updateDisplay: true, customers: req });
  }

  fetchFormData(id) {
    const loc = "OrderAdmin.select";
    let myRequest = SERVERROOT + "/order/" + id;
    let req0 = new OMSRequest(loc, myRequest,
                            "Problem selecting order "+myRequest,
                            this.finishOrderFetch);
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
    clearInterval(this.state.itemTimer);
    this.fetchFormData(id);
  }

  validateForm( x ) {
    let doSubmit = true;
    let msg = "The following fields ";
    let delim = " ";
    if( x.purchase === "" ) {
        doSubmit = false;
        msg += "Order Type ";
        delim = ", ";
    }
    if(x.customerId === 0) {
        doSubmit = false;
        msg += delim + "Customer, ";
        delim = ", ";
    }
    var items = x.items;
    items.map(
      function(n,y){
        if( n.contentCd === "" && n.carrierId === 0 && n.active === "" &&
		    n.expVolumeMin === 0 && n.expVolumeMax === 0 ) {
          doSubmit = doSubmit || true;
		  } else {
          if( n.active === "" ) {
              doSubmit = false;
	  	    }
		    if( n.contentCd === "" ) {
			     doSubmit = false;
		    }
		    if( n.carrierId === 0 ) {
			     doSubmit = false;
		    }
		    if( n.expVolumeMin === 0 ) {
			     doSubmit = false;
		    }
		    if( n.expVolumeMax === 0 ) {
			     doSubmit = false;
		    }
        }
        return doSubmit;
	   } )

    if( ! doSubmit ) {
      msg += " must be selected!";
      alert(msg);
    }
    return doSubmit;
  }

  updateOrder(id) {
    let clsMthd = "OrderAdmin.updateOrder";
    let newo = Object.assign({},this.state.order);
    let method = "PUT";
    let url = SERVERROOT + "/order/update";
    if( id === 0 ) {
      newo.id = 0;
      method = "POST";
      url = SERVERROOT + "/order/insert";
    }
    // format the time
    var at = moment(newo.actDate,"YYYY-MM-DD HH:mm:ss");
    var xt = moment(newo.expDate,"YYYY-MM-DD HH:mm:ss");
    newo.actDate = moment(at).format();
    newo.expDate = moment(xt).format();
    // take out the item that wasn't filled out
    var i = [];
	newo.items.map(
      function(n,y){
        if( n.contentCd === "" && n.carrierId === 0 && n.active === "" &&
            n.expVolumeMin === 0 && n.expVolumeMax === 0 ) {
          return null;
        } else {
		  return i.push(n);
	    }
	  })
	newo.items = i;

    var b = JSON.stringify( newo );
    const request = async () => {
      try {
        const response = await fetch(url, {method:method, headers:{'Content-Type':'application/json'}, body: b});
        if( response.ok ) {
	      alert("Order update complete on "+newo.id)
		} else {
          alert("Order update failed on "+newo.id+": " + response.status);
	    }
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
    this.fetchList(this.state.option);
    if( ("B" === this.state.option) && (this.state.itemTimer !== null) ) {
      var myTimerID = setInterval(() => {this.fetchList("B")}, 60000 );
      this.setState({itemTimer:myTimerID});
    }
  }

//  componentDidUpdate( prevProps, prevState ) {
//    Log.info("OrderAdmin - componentDidUpdate");
//  }

  handleClick() {
  }

  handleFieldChange(event) {
    const target = event.target;
    if( (target !== null) && (target !== undefined) ) {
      if( target.name === "contentCode" ) {
        this.setState({contentCode: target.value});
      } else {
        let ordNew = Object.assign({},this.state.order);
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
//      } else {   // expDate target == null ?
//        let iso = event.format("YYYY-MM-DD");
//        ordNew["expDate"] = iso;
        this.setState({order: ordNew } );
      }
    }
  }


  /**
   * B - both, P - purchases, 7 - week, M - last month, S - sales
   */
  fetchList(option) {
    const clsMthd = "OrderAdmin.fetchList";
    var myTimerID = this.state.itemTimer;
    if( (null !== this.state.itemTimer) && (undefined !== this.state.itemTimer)) {
      if( this.state.option !== 'B' ) {
        clearInterval(this.state.itemTimer);
        myTimerID = null;
      }
    } else {
      if( "B" === this.state.option ) {
        myTimerID = setInterval(() => {this.fetchList("B")}, 60000 );
      }
    }
    let req1 = new OMSRequest(clsMthd, SERVERROOT + "/referencecode/category/content-type",
                            "Problem retrieving contents list", this.finishTypesFetch);
    req1.fetchData();

    var myRequest = SERVERROOT + "/order/active/"+this.state.contentCode;
    switch (option) {
      case "B" :
        myRequest = SERVERROOT + "/order/active/"+this.state.contentCode;
        break;
      case "P" :
        myRequest = SERVERROOT + "/order/type/P/"+this.state.contentCode;
        break;
      case "7" :
        myRequest = SERVERROOT + "/order/lastWeek/"+this.state.contentCode;
        break;
      case "M" :
        myRequest = SERVERROOT + "/order/lastMonth/"+this.state.contentCode;
        break;
      case "S" :
        myRequest = SERVERROOT + "/order/type/S/"+this.state.contentCode;
        break;
      default:
        myRequest = SERVERROOT + "/order/active/" ;
        break;
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
                          itemTimer:myTimerID,
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
    var myTimerID = null;
    if( "B" === this.state.option ) {
      myTimerID = setInterval(() => {this.fetchList("B")}, 60000 );
    }
    this.fetchList(this.state.option);
    this.setState( {returnedText: null,
                    updateData: true,
                    updateDisplay:true,
                    order: null,
                    stage: "begin",
                    itemTimer:myTimerID } );
  }

  componentWillUnmount() {
    if( this.state.itemTimer !== null ) {
      clearInterval(this.state.itemTimer);
    }
  }

  render() {
    switch( this.state.stage ) {
      case "begin":
        return <Waiting />
      case "dataFetched":
        if( (this.state.returnedText === null) || (this.state.contentCodes === null) )
        {
          return <Waiting />
        } else {
          return <OrderList option = {this.state.option}
                            contentCode = {this.state.contentCode}
                            contents = {this.state.contentCodes}
                            orderData = {this.state.returnedText}
                            orderSelect = {this.handleSelect}
                            fieldChange = {this.handleFieldChange}
                            handleQuit = {this.handleQuit}
               />
        }
      case "itemRetrieved":
        if( (this.state.order     === null) || (this.state.carriers === null) ||
            (this.state.customers === null) || (this.state.contentCodes === null) )
        {
          return <Waiting />
        } else {
          return <OrderForm order       = {this.state.order}
                            contents    = {this.state.contentCodes}
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
