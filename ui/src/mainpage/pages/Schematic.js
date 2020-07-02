/*************************************************************************
 * Schematic.js
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

import Log                from '../requests/Log.js';

import {SERVERROOT}       from '../../Parameters.js';
import DefaultContents    from './DefaultContents.js';
import SchematicDisplay   from './displays/SchematicDisplay.js';
import Waiting            from './Waiting.js';


class Schematic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stage: props.stage,
      option: props.option,
      updateData: false,
      updateDisplay: true,
      returnedText: null,
      id: null,
      itemTimer: null
    };
    this.handleMouseup = this.handleMouseup.bind(this);
    this.handleQuit    = this.handleQuit.bind(this);
  }

  static get propTypes() {
      return {
          stage: PropTypes.string,
          option: PropTypes.number
      }
  }

  handleErrors(response) {
    if (!response.ok) {
        throw Error(response.status+" ("+response.statusText+")");
    }
    return response;
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    clearInterval(prevState.itemTimer);
    if( nextProps.option !== prevState.option ) {
//      this.setState({option: nextProps.option});
      this.fetchList(nextProps.option);
    }
    return prevState;
  }

  shouldComponentUpdate(nextProps,nextState) {
    let sts = nextState.updateDisplay;
    return sts;
  }

/* */
  reqOut( id, name, val ) {
    const clsMthd = "Schematic.reqOut";
    const myRequest=SERVERROOT + "/tag/output/" + id + "/" + val;
    const request = async () => {
      try {
        await fetch(myRequest, {method:"PUT", headers:{'Content-Type':'application/json'} });
        alert("Output complete on "+name+", id = "+id)
      } catch( error ) {
        alert("Problem writing "+" id "+id+"\n"+error);
        Log.error("Error - " + error,clsMthd);
      }
    }
    request();
  }

  handleMouseup(event) {
    let x = event.evt.offsetX;
    let y = event.evt.offsetY;
    let scm = this.state.returnedText;
    let scos = scm.childTags;
    for( var i=0; i<scos.length; i++) {
      let e = scos[i];
      if(   (y >= e.c1Lat)  && (y <= e.c2Lat)
         && (x >= e.c1Long) && (x <= e.c2Long) ) {
        let outTagId = (e.outTagId===null)?undefined:e.outTagId;
        if( (outTagId !== undefined) && (e.outTagId !== 0)) {
          let newVal = e.inpValue*1;
          if( e.inpType === 'DI' ) {
			newVal = (e.inpValue*1)===0?1:0;
	      } else {
			newVal = (e.inpValue*1)+0.05*(e.inpMax-e.inpZero);
		  }
          this.reqOut(outTagId, e.outTagName, newVal );
        }
      }
    }
  }

/* */
  handleQuit() {
    this.fetchList(this.state.option);
    clearInterval(this.state.itemTimer);
    var myTimerID = setInterval(() => {this.fetchList(this.state.option)}, 60000 );
    this.setState( {itemTimer: myTimerID } );
  }

  fetchList(opt) {
    const clsMthd = "Schematic.fetchList";
    var cntnts = document.getElementById('contents');
    var width = cntnts.offsetWidth;
    var height = cntnts.offsetHeight;
    const myRequest = SERVERROOT + "/schematic/" + opt;
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
          const emsg = "Problem fetching schematic list";
          alert(emsg+"\n"+e);
          Log.error(emsg+" - " + e, clsMthd);
        }
      }
      request();
    }
  }

  componentDidMount() {
    this.fetchList(this.state.option);
    var myTimerID = setInterval(() => {this.fetchList(this.state.option)}, 60000 );
    this.setState( {itemTimer: myTimerID } );
  }

  componentWillUnmount() {
    if( this.state.itemTimer !== null ) {
      clearInterval(this.state.itemTimer);
    }
//    if( this.state.itemTimer !== null ) {
//      clearInterval(this.state.itemTimer);
//    }
  }

  render() {
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