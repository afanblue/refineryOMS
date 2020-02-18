/*************************************************************************
 * PlotGroupVars.js
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

import Log             from '../requests/Log.js';
import {SERVERROOT}    from '../../Parameters.js';
import GroupPlot       from './displays/GroupPlot.js';
import Waiting         from './Waiting.js';
import {PlotDetails}   from './objects/PlotGroup.js';

const CLASS = "PlotGroupVars";

class PlotGroupVars extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stage: props.stage,
      updateData: false,
      updateDisplay: true,
      returnedText: null,
      id: props.id,
      source: props.source,
      plotGroup: props.plotGroup,
      plotDetails: null,
      d0: null,
      d1: null,
      d2: null,
      d3: null,
      unitTimer: null,
      color: "green"
    };
    this.fetchAll          = this.fetchAll.bind(this);
    this.fetchData         = this.fetchData.bind(this);
    this.fetchHistory      = this.fetchHistory.bind(this);
    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.handleClick       = this.handleClick.bind(this);
  }

   static get propTypes() {
      return {
          stage: PropTypes.string,
          id: PropTypes.any,
          plotGroup: PropTypes.any,
          source: PropTypes.any
      }
  }

 handleErrors(response) {
    if (!response.ok) {
        throw Error(response.status+" ("+response.statusText+")");
    }
    return response;
  }

  static getDerivedStateFromProps(nextProps, state) {
    if( nextProps.stage !== state.stage && nextProps.stage === "begin")
    {
      if( state.unitTimer !== null ) { clearInterval(state.unitTimer); }
      this.fetchData(nextProps.id);
    }
    return state;
  }

  shouldComponentUpdate(nextProps,nextState) {
    let sts = nextState.updateDisplay || nextState.updateData;
    return sts;
  }

  fetchAll( pg ) {
    this.fetchHistory(pg.id1,1);
    this.fetchHistory(pg.id2,2);
    this.fetchHistory(pg.id3,3);
    this.fetchHistory(pg.id4,4);
  }

  fetchData( id ) {
    const myRequest=SERVERROOT + "/plotGroup/" + id;
    const request = async () => {
      try {
        const response = await fetch(myRequest);
        const pg = await response.json();
        this.fetchAll(pg);
        var myTimerID = setInterval(() => {this.fetchAll(pg);}, 60000 );
        this.setState({stage: "begin", unitTimer: myTimerID});
      } catch( error ) {
        alert("Problem "+(id===0?"inserting":"updating")+" transfer "
             +"id "+id+"\n"+error);
        Log.error("Error - " + error,CLASS+".updateTransfer");
      }
    }
    request();
  }

  fetchHistory(id,ndx) {
    const pd = this.state.plotDetails;
    var noDays = 2;
    let skip = false;
    if( pd !== null && pd !== undefined ) {
      if( pd.numberDays === "" ) {
        skip = true;
      } else {
        noDays = (pd.numberDays!==null)?pd.numberDays:2;
      }
    }
    if( id !== undefined && ! skip ) {
      const myRequest = SERVERROOT + "/ai/history/" + id + "/" + noDays;
      const request = async () => {
        try {
          const response = await fetch(myRequest);
          const fd = await response.json();
          var pd = null;
          if( this.state.plotDetails === null ) {
            pd = new PlotDetails(2,Infinity,-Infinity,Infinity,-Infinity,Infinity,-Infinity,Infinity,-Infinity);
          } else {
            pd = Object.assign({},this.state.plotDetails);
          }
          switch( ndx ) {
            case 1:
              if( pd.max0 === Infinity ) {
                pd.min0 = fd.aiTag.zeroValue;
                pd.max0 = fd.aiTag.maxValue;
              }
              this.setState({stage: "generatePlot", d0:fd, plotDetails: pd});
              break;
            case 2:
              if( pd.max1 === Infinity ) {
                pd.min1 = fd.aiTag.zeroValue;
                pd.max1 = fd.aiTag.maxValue;
              }
              this.setState({stage: "generatePlot", d1:fd, plotDetails: pd});
              break;
            case 3:
              if( pd.max2 === Infinity ) {
                pd.min2 = fd.aiTag.zeroValue;
                pd.max2 = fd.aiTag.maxValue;
              }
              this.setState({stage: "generatePlot", d2:fd, plotDetails: pd});
              break;
            default:
              if( pd.max3 === Infinity ) {
                pd.min3 = fd.aiTag.zeroValue;
                pd.max3 = fd.aiTag.maxValue;
              }
              this.setState({stage: "generatePlot", d3:fd, plotDetails: pd});
              break;
          }
        } catch( error ) {
           alert("Problem selecting history for AI id "+id+"\n"+error);
           Log.error("Error - " + error, CLASS+".fetchHistory" );
        }
      }
      request();
    }
  }


  componentDidMount() {
    if( this.state.stage === "begin" ) {
      this.fetchData(this.state.id);
    } else {
      var pg = this.state.plotGroup;
      this.fetchAll(pg);
      var myTimerID = setInterval(() => {this.fetchAll(pg);}, 60000 );
      this.setState({stage: "begin",
                     unitTimer: myTimerID});
    }
  }

//  componentDidUpdate( prevProps, prevState ) {
//  }

  componentWillUnmount() {
    if( this.state.unitTimer !== null ) {
      clearInterval(this.state.unitTimer);
    }
  }

  handleClick() {
  }

  handleFieldChange(event) {
    event.preventDefault();
    const target = event.target;
    let value = target.value;
    const name = target.name;
    let pdNew = Object.assign({},this.state.plotDetails);
    if( value === "" ) { value="0"; }
    pdNew[name] = parseInt(value,10);
    this.setState( {plotDetails: pdNew} );
  }



  render() {
    switch( this.state.stage ) {
  	  case "begin":
        return <Waiting />
      case "generatePlot":
        return <GroupPlot d0 = {this.state.d0} d1 = {this.state.d1}
                          d2 = {this.state.d2} d3 = {this.state.d3}
                          plotDetails = {this.state.plotDetails}
                          fieldChange = {this.handleFieldChange}
                          handleClick = {this.handleClick} />
      default:
        return <Waiting />
    }
  }
}

export default PlotGroupVars;
