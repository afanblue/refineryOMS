import React, {Component} from 'react';
import {Stage, Layer, Group, Circle, Text} from 'react-konva';
import {SERVERROOT, IMAGEHEIGHT, IMAGEWIDTH} from '../../Parameters.js';
import Log     from '../requests/Log.js';
import Waiting from './Waiting.js';

/*************************************************************************
 * SiteStar.js
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


class SiteStar extends Component {
  constructor(props) {
    super(props);
    Log.info( "DefaultContents " );
    this.state = {
      stage: props.stage,
      updateData: false,
      updateDisplay: true,
      fieldName: props.field,
      tankType: props.tankType,
      field: null,
      tags: null,
      siteLoc: null,
      returnedText: null,
      unitTimer: null
     }
  }
  
  handleErrors(response) {
    if (!response.ok) {
        throw Error(response.status+" ("+response.statusText+")");
    }
    return response;
  }

  fetchSiteValues() {
    Log.info( "SiteStar.fetchSiteValues : " + this.state.stage );
    const myRequest = SERVERROOT + "/ai/all/values";
    const now = new Date();
    Log.info( "SiteStar.fetchSiteValues " + now.toLocaleString() + " Request: " + myRequest );
    if( myRequest !== null ) {
      fetch(myRequest)
          .then(this.handleErrors)
          .then(response => {
            var contentType = response.headers.get("content-type");
            if(contentType && contentType.includes("application/json")) {
              return response.json();
            }
            throw new TypeError("SiteStar.fetchSiteValues: response ("+contentType+") must be a JSON string");
        }).then(json => {
           Log.info("SiteStar.fetchSiteValues: JSON retrieved - " + json);
           this.setState( {returnedText: json, 
                           updateData: false, 
                           updateDisplay:true,
                           stage: "dataFetched" } );
        }).catch(function(e) { 
           alert("Problem retrieving site values\n"+e);
           const emsg = "SiteStar.fetchSiteValues: Fetching field list " + e;
           Log.error(emsg);
      });
    }
  }


  componentDidMount() {
    Log.info( "SiteStar.didMount: " + this.state.stage );
    this.fetchSiteValues();
    var myTimerID = setInterval(() => {this.fetchSiteValues()}, 60000 );
    this.setState( {unitTimer: myTimerID } );    
  }
  
  componentWillUnmount() {
    Log.info( "SiteStar.willUnmount "+this.state.unitTimer);
    if( this.state.unitTimer !== null ) {
      clearInterval(this.state.unitTimer);
    }
  }

  render () {
    switch( this.state.stage ) {
      case "begin":
        return <Waiting />
      case "dataFetched":
      default:
        var r = (IMAGEWIDTH<IMAGEHEIGHT?(IMAGEWIDTH/2):(IMAGEHEIGHT/2));
        var cpx = IMAGEWIDTH/2;
        var cpy = IMAGEHEIGHT/2;
        var json = this.state.returnedText;
        var aDelt = 360/json.length;
        var now = (new Date()).toLocaleString();
        return (
          <Stage height={IMAGEHEIGHT} width={IMAGEWIDTH}>
            <Layer>
              <Text text={now} x={2} y={2} fontSize={14} stroke={"#C3C2B9"} strokeWidth={1}/>
              <Circle radius={r} stroke={"white"} strokeWidth={1} x={cpx} y={cpy} />
              <Group>
                {json.map(
                  function(n,x){
                    var theta = (x-1)*aDelt;
                    var v = (n.value>1.0)?1.02:n.value;
                    var xp = cpx + v * r * Math.cos(theta);
                    var yp = cpy + v * r * Math.sin(theta);
                    return <Circle key={x} radius={2} stroke={n.alarmColor} fill={n.alarmColor} x={xp} y={yp} />
                  } 
                ) }
              </Group>
            </Layer>
          </Stage>
        );
    }
  }
}

export default SiteStar;