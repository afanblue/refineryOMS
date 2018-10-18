import React, {Component} from 'react';
import Log             from '../requests/Log.js';

import {SERVERROOT}    from '../../Parameters.js';
import GroupPlot       from './displays/GroupPlot.js';
import Waiting         from './Waiting.js';
import {PlotDetails}   from './objects/PlotGroup.js';

/*************************************************************************
 * PlotGroup.js
 * Copyright (C) 2018  A. E. Van Ness
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
 
const CLASS = "PlotGroupVars";  
 
class PlotGroupVars extends Component {
  constructor(props) {
    super(props);
    Log.info( "PlotGroup: " + props.stage );
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
    this.fetchData    = this.fetchData.bind(this);
    this.fetchHistory = this.fetchHistory.bind(this);
  }
  
  handleErrors(response) {
    if (!response.ok) {
        throw Error(response.status+" ("+response.statusText+")");
    }
    return response;
  }

  componentWillReceiveProps(nextProps) {
    Log.info( CLASS+".willRcvProps: " + nextProps.selected + ":"
               + ((nextProps.option===null)?"null":nextProps.option)
               + "/" + nextProps.stage );
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
    Log.info( CLASS+".shouldUpdate? : (" + nextState.stage + ") " + (sts?"T":"F") );
    return sts;
  }
  
  fetchData( id ) {
    let now = new Date();
    Log.info( CLASS+".fetchData " + now.toISOString() );
    const myRequest=SERVERROOT + "/plotGroup/" + id;
    now = new Date();
    Log.info( CLASS+".fetchData - Request: " + myRequest );
    const request = async () => {
      const response = await fetch(myRequest);
      const pg = await response.json();
      Log.info( "fetched plotGroup",CLASS+".fetchData" );
//      var contentType = response.headers.get("ContentType");
//      if( contentType && contentType.includes("application/json")) {
      this.fetchHistory(pg.id1,1);
      this.fetchHistory(pg.id2,2);
      this.fetchHistory(pg.id3,3);
      this.fetchHistory(pg.id4,4);
      var myTimerID = setInterval(() => {this.fetchHistory(pg.id1,1);
                                         this.fetchHistory(pg.id2,2);
                                         this.fetchHistory(pg.id3,3);
                                         this.fetchHistory(pg.id4,4);}, 60000 );
      this.setState({stage: "begin",
                     unitTimer: myTimerID});
//      }
//      throw new TypeError(CLASS+".fetchData: response ("+contentType+") must be a JSON string");
    }
    try {
      request();
    } catch( error ) {
      alert("Problem "+(id===0?"inserting":"updating")+" transfer "
           +"id "+id+"\n"+error);
      Log.error("Error - " + error,CLASS+".updateTransfer");
    }
  }

  fetchHistory(id,ndx) {
    if( id !== undefined) {
      const pd = this.state.plotDetails;
      var noDays = 2;
      if( pd !== null && pd !== undefined ) {
        noDays = (pd.numberDays!==null)?pd.numberDays:2;
      }
      const myRequest = SERVERROOT + "/ai/history/" + id + "/" + noDays;
      Log.info( "Request: " + myRequest, CLASS+".fetchHistory" );
      const request = async () => {
        const response = await fetch(myRequest);
        const fd = await response.json();
        var pd = null;
        if( this.state.plotDetails === null ) {
          pd = new PlotDetails(2,null,null,null,null,null,null,null,null);
        } else {
          pd = Object.assign({},this.state.plotDetails);
        }
        switch( ndx ) {
          case 1:
            if( pd.max0 === null ) {
              pd.min0 = fd.aiTag.zeroValue;
              pd.max0 = fd.aiTag.maxValue;
            }
            this.setState({stage: "generatePlot", d0:fd, plotDetails: pd});
            break;
          case 2:  
            if( pd.max1 === null ) {
              pd.min1 = fd.aiTag.zeroValue;
              pd.max1 = fd.aiTag.maxValue;
            }
            this.setState({stage: "generatePlot", d1:fd, plotDetails: pd});
            break;
          case 3:  
            if( pd.max2 === null ) {
              pd.min2 = fd.aiTag.zeroValue;
              pd.max2 = fd.aiTag.maxValue;
            }
            this.setState({stage: "generatePlot", d2:fd, plotDetails: pd});
            break;
          default: 
            if( pd.max3 === null ) {
              pd.min3 = fd.aiTag.zeroValue;
              pd.max3 = fd.aiTag.maxValue;
            }
            this.setState({stage: "generatePlot", d3:fd, plotDetails: pd});
            break;
        }
      }
      try {
        request();
      } catch( error ) {
         alert("Problem selecting history for AI id "+id+"\n"+error);
         Log.error("Error - " + error, CLASS+".fetchHistory" );  
      }

/*      fetch(myRequest)
        .then(this.handleErrors)
        .then(response => {
          var contentType = response.headers.get("Content-Type");
          if(contentType && contentType.includes("application/json")) {
            return response.json();
          }
          throw new TypeError(CLASS+".fetchHistory: response ("+contentType+") must be a JSON string");
      }).then(json => {
         let fd = json;
         switch( ndx ) {
           case 1:  this.setState({stage: "generatePlot", d0:fd}); break;
           case 2:  this.setState({stage: "generatePlot", d1:fd}); break;
           case 3:  this.setState({stage: "generatePlot", d2:fd}); break;
           default: this.setState({stage: "generatePlot", d3:fd}); break;
         }
      }).catch(function(error) { 
         alert("Problem selecting history for AI id "+id+"\n"+error);
         Log.error("Error - " + error, CLASS+".fetchHistory" );  
      });
*/
    }
  }

  
  componentDidMount() {
    Log.info( CLASS+".didMount: " + this.state.stage + ", source: " + this.state.source );
    if( this.state.stage === "begin" ) {
      this.fetchData(this.state.id);
    } else {
      var pg = this.state.plotGroup;
      this.fetchHistory(pg.id1,1);
      this.fetchHistory(pg.id2,2);
      this.fetchHistory(pg.id3,3);
      this.fetchHistory(pg.id4,4);
      var myTimerID = setInterval(() => {this.fetchHistory(pg.id1,1);
                                         this.fetchHistory(pg.id2,2);
                                         this.fetchHistory(pg.id3,3);
                                         this.fetchHistory(pg.id4,4);}, 60000 );
      this.setState({stage: "begin",
                     unitTimer: myTimerID});
    }
  }
    
  componentDidUpdate( prevProps, prevState ) {
    Log.info( CLASS+".didUpdate: " + this.state.stage );
  }

  componentWillUnmount() {
    Log.info( CLASS+".willUnmount "+this.state.unitTimer);
    if( this.state.unitTimer !== null ) {
      clearInterval(this.state.unitTimer);
    }
  }
  
  render() {
    Log.info(CLASS+".render - stage: "+this.state.stage);
    switch( this.state.stage ) {
  	  case "begin":
        return <Waiting />
      case "generatePlot":
        return <GroupPlot d0 = {this.state.d0} d1 = {this.state.d1} 
                          d2 = {this.state.d2} d3 = {this.state.d3}
                          plotDetails = {this.state.plotDetails} />
      default:
        return <Waiting />
    }
  }
}

export default PlotGroupVars;
