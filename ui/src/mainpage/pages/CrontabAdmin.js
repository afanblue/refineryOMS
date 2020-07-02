/*************************************************************************
 * CrontabAdmin.js
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

import {Crontab}      from './objects/Crontab.js';
import {SERVERROOT}    from '../../Parameters.js';
import CrontabForm    from './forms/CrontabForm.js';
import CrontabList    from './lists/CrontabList.js';
import DefaultContents from './DefaultContents.js';
import Log             from '../requests/Log.js';
import OMSRequest      from '../requests/OMSRequest.js';
import Waiting         from './Waiting.js';


class CrontabAdmin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stage: props.stage,
      updateData: false,
      updateDisplay: true,
      ctab: null
    };
    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.handleCtabSelect   = this.handleCtabSelect.bind(this);
    this.handleCtabUpdate   = this.handleCtabUpdate.bind(this);
    this.finishCtabFetch    = this.finishCtabFetch.bind(this);
    this.handleQuit        = this.handleQuit.bind(this);
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

  static getDerivedStateFromProps(nextProps, state) {
	return state;
  }

  shouldComponentUpdate(nextProps,nextState) {
    let sts = nextState.updateDisplay;
    return sts;
  }

/* */
  finishCtabFetch( req ) {
    let ct = req;
    const ctb = new Crontab(ct.id,ct.name,ct.moh,ct.hod,ct.dom,ct.moy,ct.dow
                           ,ct.hourDuration,ct.minuteDuration);
    this.setState({stage: "itemRetrieved", ctab: ctb });
  }

  handleCtabSelect(event) {
    const id = event.z;
    const loc = "CrontabAdmin.typeSelect";
    let req1 = new OMSRequest(loc, SERVERROOT + "/crontab/"+id,
                            "Problem retrieving crontab types", this.finishCtabFetch);
    req1.fetchData();
  }

  handleCtabUpdate(event) {
    event.preventDefault();
    const clsMthd = "CrontabAdmin.handleUpdate";
    const id = this.state.ctab.id;
    let method = "PUT";
    let url = SERVERROOT + "/crontab/update";
    if( id === 0 ) {
      method = "POST";
      url = SERVERROOT + "/crontab/insert";
    }
    const b = JSON.stringify(this.state.ctab);
    const request = async () => {
      try {
        const response = await fetch(url, {method:method, headers:{'Content-Type':'application/json'}, body: b});
        if( response.ok ) {
          alert("Crontab update/insert complete for id = "+id)
        } else {
          alert("Crontab update/insert failed for id =  "+id+":  " + response.status);
        }
      } catch( error ) {
        alert("Problem "+(id===0?"inserting":"updating")+" crontab "
             +"id "+id+"\n"+error);
        Log.error("Error - " + error,clsMthd);
      }
    }
    request();
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
    let ctbnew = Object.assign({},this.state.ctab);
    const field = name;
    ctbnew[field] = value;
    this.setState({ctab: ctbnew } );
  }

  fetchList() {
    const myRequest = SERVERROOT + "/crontab/all";
    let clsMthd = "CrontabAdmin.fetchList";
    if( myRequest !== null ) {
      const request = async () => {
        try {
          const resp = await fetch(myRequest);
          const json = await resp.json();
          this.setState( {returnedText: json,
                          updateData: false,
                          updateDisplay:true,
                          stage: "dataFetched" } );
        } catch( e ) {
          alert("Problem getting selected crontab list\n"+e);
          const erms = "Fetching list " + e;
          Log.error(erms,clsMthd);
        }
      }
      request();
    }
  }

  handleQuit(event) {
    event.preventDefault();
    this.fetchList();
    this.setState( {returnedText: null,
                    updateData: true,
                    updateDisplay:true,
                    ctab: null,
                    stage: "begin" } );
  }

  render() {
    switch( this.state.stage ) {
      case "begin":
        return <Waiting />;
      case "dataFetched":
        return <CrontabList ctabData = {this.state.returnedText}
                            ctabSelect = {this.handleCtabSelect} />
      case "itemRetrieved":
        if( (this.state.ctab === null) ) {
          return <Waiting />
        } else {
          return <CrontabForm  ctab = {this.state.ctab}
                               ctabUpdate = {this.handleCtabUpdate}
                               handleQuit = {this.handleQuit}
                               fieldChange = {this.handleFieldChange} />
        }
      default:
        return <DefaultContents />
    }
  }
}

export default CrontabAdmin;
