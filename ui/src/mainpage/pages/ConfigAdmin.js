/*************************************************************************
 * ConfigAdmin.js
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
import ConfigList      from './lists/ConfigList.js';
import DefaultContents from './DefaultContents.js';
import Log             from '../requests/Log.js';
import Waiting         from './Waiting.js';


function ConfigItem(i,k,v) { this.id=i; this.key=k; this.value=v; }

class ConfigAdmin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stage: props.stage,
      updateData: false,
      updateDisplay: true,
      returnedText: null,
      configItems: null
    };
    this.handleFieldChange = this.handleFieldChange.bind(this);
//    this.handleConfigSelect = this.handleConfigSelect.bind(this);
    this.handleConfigUpdate = this.handleConfigUpdate.bind(this);
    this.handleQuit = this.handleQuit.bind(this);
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

  static getDerivedStateFromProps(nextProps, prevState) {
	let state = prevState;
    return state;
  }

  shouldComponentUpdate(nextProps,nextState) {
    let sts = nextState.updateDisplay;
    return sts;
  }

  componentDidMount() {
    this.fetchList();
  }

//  componentDidUpdate( prevProps, prevState ) {
//  }

  handleFieldChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    let np = name.split(".");
    let cfg = this.state.configItems.slice(0);
    let ndx = np[1];
    if( np[0] === "key" ) {
        cfg[ndx].key = value;
    } else {
        cfg[ndx].value = value;
    }
    this.setState({configItems: cfg } );
  }

  fetchList() {
    const clsMthd = "ConfigAdmin.fetchList";
    const myRequest = SERVERROOT + "/config/all";
    if( myRequest !== null ) {
      const request = async () => {
        try {
          const response = await fetch(myRequest);
          const json = await response.json();
          var itemList = [];
          var c = new ConfigItem(0,"Add new item","");
          itemList.push(c);
          json.map( function(n,x) { var ci = new ConfigItem(n.id,n.key,n.value);
                                    return itemList.push( ci ); } );
          this.setState( {returnedText: json,
                          updateData: false,
                          updateDisplay:true,
                          stage: "dataFetched",
                          configItems: itemList } );
        } catch( e ) {
          alert("Problem fetching system configuration list\n"+e);
          Log.error("Error - " + e, clsMthd);
        }
      }
      request();
    }
  }

  handleConfigUpdate(event) {
    event.preventDefault();
    let clsMthd = "ConfigAdmin.configUpdate";
    let method = "PUT";
    let url = SERVERROOT + "/config/update";
    let cfg = [];
    if(  (this.state.configItems[0].key==="Add new item")
      || (this.state.configItems[0].value==="" )) {
        cfg = this.state.configItems.splice(1);
    } else {
        cfg = this.state.configItems.splice(0);
    }
    const b = JSON.stringify(cfg);
    const request = async () => {
      try {
        const response = await fetch(url, {method:method, headers:{'Content-Type':'application/json'}, body: b});
        if( response.ok ) {
          alert("Configuration update/insert complete");
          this.fetchList();
        } else {
          alert("Configuration update/insert failed " + response.status);
        }
      } catch( error ) {
        alert("Problem updating system configuration\n"+error);
        Log.error("Error - " + error,clsMthd);
      }
    }
    request();
  }

  handleQuit(event) {
    event.preventDefault();
    this.fetchList();
    this.setState( {returnedText: null,
                    updateData: true,
                    updateDisplay:true,
                    configItems: null,
                    stage: "begin" } );
  }


  render() {
    switch( this.state.stage ) {
      case "begin":
        return <Waiting />
      case "dataFetched":
        return <ConfigList configData={this.state.returnedText}
                           configItems={this.state.configItems}
                           fieldChange={this.handleFieldChange}
                           configUpdate = {this.handleConfigUpdate}
                           handleQuit ={this.handleQuit}
               />
      default:
        return <DefaultContents />
    }
  }
}

export default ConfigAdmin;
