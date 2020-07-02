/*************************************************************************
 * CalcVarAdmin.js
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

import {SERVERROOT} from '../../Parameters.js';
import DefaultContents from './DefaultContents.js';
import {CalcVar}    from './objects/CalcVar.js';
import CalcVarForm  from './forms/CalcVarForm.js';
import CalcVarList  from './lists/CalcVarList.js';
import Log          from '../requests/Log.js';
import OMSRequest   from '../requests/OMSRequest.js';
import {Tag}        from './objects/Tag.js';
import Waiting      from './Waiting.js';


class CalcVarAdmin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stage: props.stage,
      updateData: false,
      updateDisplay: true,
      returnedText: null,
      calcVar: null,
      calcInpList: null,
      calcOutList: null
    }
    this.handleChange    = this.handleChange.bind(this);
    this.handleSelect    = this.handleSelect.bind(this);
    this.handleUpdate    = this.handleUpdate.bind(this);
    this.handleQuit      = this.handleQuit.bind(this);
    this.requestRender   = this.requestRender.bind(this);
    this.handleCVFetch   = this.handleCVFetch.bind(this);
    this.handleInpFetch  = this.handleInpFetch.bind(this);
    this.handleOutFetch  = this.handleOutFetch.bind(this);
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

  handleCVFetch( req ) {
    let cvd = req;
    const t = new Tag(cvd.id, cvd.tag.name, cvd.tag.description, cvd.tag.tagTypeCode, cvd.tag.tagTypeId
                     ,cvd.tag.misc, cvd.tag.c1Lat, cvd.tag.c1Long, cvd.tag.c2Lat, cvd.tag.c2Long, cvd.tag.active);
    const cv = new CalcVar(cvd.id, t, cvd.definition, cvd.outputTagId, cvd.inputTags);
//  convert the input tags to a list of JUST the id's, not [id,name]
    var its = cvd.inputTags;
    var itids = [];
    if( its !== null ) {
      its.map(function(n,x) {
               return itids.push(n.id);
             } )
    }
    cv.inputTagIds = itids;
    this.setState({stage: "itemRetrieved",
                   updateDisplay: true,
                   updateData: false,
                   calcVar: cv
                  });
  }

  handleInpFetch(req) {
    let calcInpList = req;
    this.setState({stage: "itemRetrieved", updateDisplay: true, calcInpList: calcInpList });
  }

  handleOutFetch(req) {
    let calcOutList = req;
    let blankItem = {};
    blankItem.id = null;
    blankItem.name = '---';
    calcOutList.unshift(blankItem);
    this.setState({stage: "itemRetrieved", updateDisplay: true, calcOutList: calcOutList });
  }

  fetchFormData(id) {
    const loc = "PlotGroupAdmin.pgSelect";
    let req0 = new OMSRequest(loc, SERVERROOT + "/calcVariable/" + id,
                            "Problem selecting plot group id "+id, this.handleCVFetch);
    req0.fetchData();
    let req1 = new OMSRequest(loc, SERVERROOT + "/tag/types/AI,DI",
                            "Problem retrieving AI types", this.handleInpFetch);
    req1.fetchData();
    let req2 = new OMSRequest(loc, SERVERROOT + "/tag/types/AI,DI",
                            "Problem retrieving AI types", this.handleOutFetch);
    req2.fetchData();
  }

  handleSelect(event) {
    const id = event.z;
    this.fetchFormData(id);
  }

  /**
   * validateForm - x is an CalcVar object
   */
  validateForm( x ) {
    let doSubmit = true;
    let delim = "";
    let msg = "The following field(s) ";
    if( (x.outputTagId === null) || (x.outputTagId === undefined) ) {
        doSubmit = false;
        msg += "output tag ";
        delim = ", ";
    }
    if( (x.tag.active === null) || (x.tag.active === undefined) ) {
        doSubmit = false;
        msg += delim + "active";
        delim = ", ";
    }
    if( (x.inputTags === null) || (x.inputTags === undefined) ) {
        doSubmit = false;
        msg += delim + "input tags";
        delim = ", ";
    }
    if( ! doSubmit ) {
      msg += " must be selected!";
      alert(msg);
    }
    return doSubmit;
  }

  handleUpdate(event) {
    event.preventDefault();
    const clsMthd = "CalcVarAdmin.update";
    const cv = this.state.calcVar;
    const id = cv.id;
    let method = "PUT";
    let url = SERVERROOT + "/calcVariable/update";
    if( id === 0 ) {
      method = "POST";
      url = SERVERROOT + "/calcVariable/insert";
    }
    var cvo = Object.assign({},cv);
    delete cvo.inputTagIds;
    if( this.validateForm( cv ) ) {
      const b = JSON.stringify(cvo);
      const request = async () => {
        try {
          const response = await fetch(url, {method:method, headers:{'Content-Type':'application/json'}, body: b});
          if( response.ok ) {
            alert("Calculated variable update/insert complete for id = "+id)
          } else {
            alert("Calculated variable update/insert failed for id = "+id+":  " + response.status);
          }
        } catch( error ) {
          alert("Problem "+(id===0?"inserting":"updating")+" CalcVar "
               +"id "+id+"\n"+error);
          Log.error("Error - " + error,clsMthd);
        }
      }
      request();
    }
  }

  componentDidMount() {
    this.fetchList();
  }

//  componentDidUpdate( prevProps, prevState ) {
//  }

  requestRender() {
    let cvnew = Object.assign({},this.state.calcVar);
    this.setState({calcVar: cvnew } );
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    let np = name.split(".");
    let cvnew = Object.assign({},this.state.calcVar);
    if( target.name === "inputTagIds" ) {
        let f = -1;
        let tNew = [];
        let tLength = (cvnew.inputTagIds===null?0:cvnew.inputTagIds.length);
        for( var i=0; i<tLength; i++) {
            let v = cvnew.inputTagIds.shift();
            if( v === parseInt(value,10) ) {
                f = i;
            } else {
                tNew.push(v);
            }
        }
        if( f === -1 ) {
            tNew.push(value);
        }
        cvnew.inputTagIds = tNew;
    } else if( np.length === 1 ) {
        const fld = np[0];
        cvnew[fld] = value;
    } else {
        const fld = np[1];
        cvnew.tag[fld] = value;
    }
    this.setState({calcVar: cvnew } );
  }

  fetchList() {
    const clsMthd = "CalcVarAdmin.fetchList";
    const myRequest = SERVERROOT + "/calcVariable/all";
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
          alert("Problem retrieving calcVar list\n"+e);
          const emsg = "CalcVarAdmin.fetchList: Fetching calcVar list " + e;
          Log.error(emsg,clsMthd);
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
                    stage: "begin" } );
  }

  render() {
    switch( this.state.stage ) {
      case "begin":
        return <Waiting />
      case "dataFetched":
        return <CalcVarList returnedText = {this.state.returnedText}
                            handleSelect = {this.handleSelect} />
      case "itemRetrieved":
        if( (this.state.calcVar === null) || (this.state.calcInpList === null) ||
            (this.state.calcOutList === null) )
        {
          return <Waiting />
        } else {
          return <CalcVarForm calcVar       = {this.state.calcVar}
                              calcInpList   = {this.state.calcInpList}
                              calcOutList   = {this.state.calcOutList}
                              handleUpdate  = {this.handleUpdate}
                              handleChange  = {this.handleChange}
                              handleQuit    = {this.handleQuit}
                              requestRender = {this.requestRender}
                 />
        }
      default:
        return <DefaultContents />
    }
  }
}


export default CalcVarAdmin;