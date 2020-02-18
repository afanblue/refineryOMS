/*************************************************************************
 * ProcessUnit.js
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

import {SERVERROOT}       from '../../Parameters.js';
import Log                from '../requests/Log.js';
import DefaultContents    from './DefaultContents.js';
import ItemDisplay        from './displays/ItemDisplay.js';
import ProcessUnitDisplay from './displays/ProcessUnitDisplay.js';
import Waiting            from './Waiting.js';
import {PlotDetails}      from './objects/PlotGroup.js';


/*
 * select f.id, f.satellite_image image, c1_lat, c1_long, c2_lat, c2_long
	 from field f join tag t on f.id = t.id
	where t.name='DeCity';

	select field_tag_id, child_tag_id from field_tag_vw ftv, tank tk
	 where ftv.child_tag_id=tk.id and ftv.field_tag_id= 1;
 */

class ProcessUnit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stage: props.stage,
      option: props.option,
      plotDetails: null,
      updateData: false,
      updateDisplay: true,
      returnedText: null,
      id: null,
      unitTimer: null,
      itemTimer: null
    };
    this.handleItemSelect  = this.handleItemSelect.bind(this);
    this.handleQuit = this.handleQuit.bind(this);
    this.handleFieldChange = this.handleFieldChange.bind(this);
  }

  static get propTypes() {
      return {
          stage: PropTypes.string,
          option: PropTypes.string
      }
  }

  handleErrors(response) {
    if (!response.ok) {
        throw Error(response.status+" ("+response.statusText+")");
    }
    return response;
  }

  static getDerivedStateFromProps(nextProps, state) {
    clearInterval(state.itemTimer);
    if( nextProps.option !== state.option ) {
//      this.setState({option: nextProps.option});
      this.fetchList(nextProps.option);
    }
    return state;
  }

  shouldComponentUpdate(nextProps,nextState) {
    let sts = nextState.updateDisplay;
    return sts;
  }

  handleItemSelect(event) {
    const id = (event.z1 != null?event.z1:(event.z2 != null?event.z2:event.z3));
    this.fetchItemData(id);
    clearInterval(this.state.unitTimer);
    var myTimerID = setInterval(() => {this.fetchItemData(this.state.id)}, 60000 );
    this.setState( {itemTimer: myTimerID,
                    id: id } );
  }

  fetchItemData( id ) {
    const noDays = this.state.plotDetails.numberDays;
    const myRequest=SERVERROOT + "/ai/history/" + id + "/" + noDays;
    const clsMthd = "ProcessUnit.fetchItemData";
    const request = async () => {
      try {
        const response = await fetch(myRequest);
        const json = await response.json();
        let pdNew = Object.assign({},this.state.plotDetails);
        if( this.state.plotDetails.max0 === Infinity ) {
          let aiTag = json.aiTag;
          pdNew.max0 = aiTag.maxValue;
          pdNew.min0 = aiTag.zeroValue;
        }
        this.setState( {returnedText: json,
                        plotDetails: pdNew,
                        updateData: false,
                        updateDisplay:true,
                        stage: "itemRetrieved" } );
      } catch( e ) {
        const emsg = "Problem selecting process unit id "+id;
        alert(emsg+"\n"+e);
        Log.error(emsg+" - " + e, clsMthd);
      }
    }
    request();
  }

  handleQuit() {
    this.fetchList(this.state.option);
    clearInterval(this.state.itemTimer);
    var myTimerID = setInterval(() => {this.fetchList(this.state.option)}, 60000 );
    this.setState( {unitTimer: myTimerID } );
  }

  fetchList(opt) {
    const clsMthd = "ProcessUnit.fetchList";
    const myRequest = SERVERROOT + "/processunit/values/" + opt;
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
          const emsg = "Problem selecting process unit list";
          alert(emsg+"\n"+e);
          Log.error(emsg+" - " + e, clsMthd);
        }
      }
      request();
    }
  }

  componentDidMount() {
    let pd = new PlotDetails(2,Infinity,-Infinity,Infinity,-Infinity,Infinity,-Infinity,Infinity,-Infinity);
    if( this.state.plotDetails !== null ) { pd = this.state.plotDetails; }
    this.fetchList(this.state.option);
    var myTimerID = setInterval(() => {this.fetchList(this.state.option)}, 60000 );
    this.setState( {plotDetails:pd, unitTimer: myTimerID } );
  }

  componentWillUnmount() {
    if( this.state.unitTimer !== null ) {
      clearInterval(this.state.unitTimer);
    }
    if( this.state.itemTimer !== null ) {
      clearInterval(this.state.itemTimer);
    }
  }

  handleFieldChange(event) {
    event.preventDefault();
    const target = event.target;
    const value = target.value;
    const name = target.name;
    let pdNew = Object.assign({},this.state.plotDetails);
    pdNew[name] = parseInt(value,10);
    this.setState( {plotDetails: pdNew} );
  }


  render() {
    switch (this.state.stage) {
      case "begin":
        return <Waiting />
      case "dataFetched":
        return <ProcessUnitDisplay option = {this.state.option}
                                   items = {this.state.returnedText}
                                   itemSelect = {this.handleItemSelect} />
      case "itemRetrieved":
        return <ItemDisplay id    = {this.state.id}
                            items = {this.state.returnedText}
                            plotDetails = {this.state.plotDetails}
                            fieldChange = {this.handleFieldChange}
                            quit  = {this.handleQuit} />
      default:
        return <DefaultContents />
    }
  }
}

export default ProcessUnit;