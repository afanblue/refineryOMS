/*************************************************************************
 * PipeForm.js
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

import {IMAGEHEIGHT, IMAGEWIDTH} from '../../../Parameters.js';
import {Stage, Layer, Line} from 'react-konva';

import SiteImage from '../SiteImage.js';


class PipeForm extends Component {
  constructor( props ) {
    super(props);
    this.state={};
    this.noResponse = this.noResponse.bind(this);
    this.scale = this.scale.bind(this);
  }

  static get propTypes() {
      return {
          pipe: PropTypes.object,
          active: PropTypes.string,
          description: PropTypes.string,
          id: PropTypes.number,
          inTagId: PropTypes.number,
          misc: PropTypes.string,
          name: PropTypes.string,
          tagTypeCode: PropTypes.string,
          siteLoc: PropTypes.object,
          c1Lat: PropTypes.number,
          c1Long: PropTypes.number,
          c2Lat: PropTypes.number,
          c2Long: PropTypes.number,
          contentsList: PropTypes.array,
          vtxList: PropTypes.array,
          sensorList: PropTypes.array,
          types: PropTypes.array,
          clearEndPts: PropTypes.func,
          handleMouseUp: PropTypes.func,
          handleQuit: PropTypes.func,
          fieldChange: PropTypes.func,
          pipeUpdate: PropTypes.func
      }
  }

  noResponse( event ) {
  }

  scale( tagLoc, siteLoc, scaleFactor ) {
    return Math.round(scaleFactor * (tagLoc - siteLoc));
  }

  render() {
    let p = this.props.pipe;
    let site = this.props.siteLoc;
    let types = this.props.types;
    let cList = this.props.contentsList;
    let sList = this.props.sensorList;
    let vtxList = p.vtxList;

    let pup = this.props.pipeUpdate;
    let fc  = this.props.fieldChange;
    let mu  = this.props.handleMouseUp
    let hq  = this.props.handleQuit;
    let nr  = this.noResponse;
    let cep = this.props.clearEndPts;

    var xDivisor = site.c2Long-site.c1Long;
    var xScale = IMAGEWIDTH / xDivisor;
    var yDivisor = site.c2Lat-site.c1Lat;
    var yScale = IMAGEHEIGHT / yDivisor;

    var xnw = 0;
    var ynw = 0;
    let pts = [];
    var first = true;
    vtxList.map( function(n,x){
                   let lpt = n.split(",");
                   let px = Math.round(xScale * (lpt[1] - site.c1Long)) - xnw;
                   let py = Math.round(yScale * (lpt[0] - site.c1Lat)) - ynw;
                   if( first ) {
                     first = false;
                     xnw = px;
                     px = 0;
                     ynw = py;
                     py = 0;
                   }
                   pts = pts.concat([px,py]);
                   return pts;
                 } );
/*
    for( var i=0; i<vtxList.length; i++ ) {
      let lpt = vtxList[i].split(",");
      let x = this.scale( lpt[1], site.c1Long, xScale) - xnw;
      let y = this.scale( lpt[0], site.c1Lat,  yScale) - ynw;
      if( i === 0 ) {
        xnw = x;
        x = 0;
        ynw = y;
        y = 0;
      }
      pts = pts.concat([x,y]);
    }
*/
/*
    var xnw = this.scale( p.c1Long, site.c1Long, xScale);
    var wd  = xnw+1;
    if( p.c2Long !== 0 ) {
      wd  = this.scale( p.c2Long, site.c1Long, xScale) - xnw;
    }
    var ynw = this.scale( p.c1Lat,  site.c1Lat,  yScale);
    var ht  = ynw+1;
    if( p.c2Lat !== 0 ) {
      ht = this.scale( p.c2Lat,  site.c1Lat,  yScale) - ynw;
    }
    let pts = [0, 0, wd, ht ];
*/

    var color = "red";

    var paddedStyle  = { margin: '5px', padding: '4px' };

    return(
      <div className="oms-tabs">
        <table>
          <tbody>
            <tr>
              <td className="oms-top">

      <form id="pipeForm" onSubmit={(e) => {pup(e)}} >
        Please enter your pipe information
        <table>
          <tbody className="scrollContent-narrow">
          <tr>
            <th className="oms-spacing-180">&nbsp;</th>
            <td className="oms-spacing"><img src="images/spacer.png"
                alt="" height="5px" width="240px"/></td>
          </tr>
          <tr>
            <th className="oms-spacing-180">Name (10 chars):</th>
            <td className="oms-spacing">
              <input type="hidden" name="id" value={p.id} />
              <input type="text" id="name" name="name" value={p.name}
                     className="oms-spacing-80" size="10" maxLength="10"
                     onChange={fc} />
            </td>
          </tr>
          <tr>
            <th className="oms-spacing-180">Description :</th>
            <td className="oms-spacing">
              <input type="text" id="description" name="description" value={p.description}
                     className="oms-spacing-240" size="50" maxLength="120"
                     onChange={fc} />
            </td>
          </tr>
          <tr>
            <th className="oms-spacing-180">Tag Type:</th>
            <td className="oms-spacing">
              <select id="tagTypeCode" name="tagTypeCode" value={p.tagTypeCode}
                      onChange={nr} >
                { types.map(
                  function(n,x){
                    return <option key={x} value={n.code}>{n.name}</option>
                  } )
                }
              </select>
            </td>
          </tr>
          <tr>
            <th className="oms-spacing-180">Active:</th>
            <td className="oms-spacing">
              <select id="active" name="active" value={p.active}
                      onChange={fc} >
                <option value="N">N</option>
                <option value="Y">Y</option>
              </select>
            </td>
          </tr>
          <tr>
            <th className="oms-spacing-180">Contents: </th>
            <td className="oms-spacing">
              <select id="misc" name="misc" value={p.misc}
                      onChange={fc} >
               { cList.map(
                  function(n,x){
                    return <option key={x} value={n.id}>{n.name}</option>
                  } )
                }
              </select>
            </td>
          </tr>
          <tr>
            <th className="oms-spacing-180">Pipe State Tag: </th>
            <td className="oms-spacing">
              <select id="inTagId" name="inTagId" value={p.inTagId}
                      onChange={fc} >
               { sList.map(
                  function(n,x){
                    return <option key={x} value={n.id}>{n.name}</option>
                  } )
                }
              </select>
            </td>
          </tr>
          <tr>
            <th className="oms-spacing-180">End Points: </th>
            <td className="oms-spacing">
              <textarea rows="5" cols="25" id="vtxList" name="vtxList" value={p.vtxList}
                        onChange={fc} />
            </td>
          </tr>
          <tr>
            <td colSpan="2" style={paddedStyle}>
              <img src="images/spacer.png" alt="" height="2px" width="45px"/>
              <input type="submit" id="clearEndPts"  name="clearEndPts"
                           value="Clear End Points" onClick={(e) => {cep(e)}}/>
            </td>
          </tr>
          <tr>
            <td colSpan="2" style={paddedStyle}>
              <img src="images/spacer.png" alt="" height="2px" width="15px"/>
              <input type="submit" id="closeForm"  name="closeForm"
                     value="Quit" onClick={(e) => {hq(e)}}/>
              <img src="images/spacer.png" alt="" height="2px" width="15px"/>
              <input type="submit" id="submitForm" name="submitForm"
                     value="Submit" onClick={(e) => {pup(e)}} />
            </td>
          </tr>
          </tbody>
        </table>
      </form>
              </td>
              <td>
                <Stage height={IMAGEHEIGHT} width={IMAGEWIDTH}>
                  <Layer>
                    <SiteImage handleMouseUp={mu} />
                    <Line x={xnw} y={ynw} points={pts} tension={0}
                          stroke={color} strokeWidth={1} />
                  </Layer>
                </Stage>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}


export default PipeForm;

/*
           <tr>
            <th className="oms-spacing-90">End Point (NW)</th>
            <td className="oms-spacing">
              <input type="text" id="c1Lat" name="c1Lat" value={p.c1Lat}
                     className={["oms-spacing-90","oms-fontsize-12"].join(' ')}
                     onChange={fc} />
              &nbsp;
              <input type="text" id="tag.c1Long" name="c1Long" value={p.c1Long}
                     className={["oms-spacing-90","oms-fontsize-12"].join(' ')}
                     onChange={fc} />
            </td>
          </tr>
          <tr>
            <td className="oms-spacing-90">
              <img src="images/spacer.png" alt="" height="2px" width="55px"/>(SE)
            </td>
            <td>
              <input type="text" id="c2Lat" name="c2Lat" value={p.c2Lat}
                     className={["oms-spacing-90","oms-fontsize-12"].join(' ')}
                     onChange={fc} />
              &nbsp;
              <input type="text" id="tag.c2Long" name="tag.c2Long" value={p.c2Long}
                     className={["oms-spacing-90","oms-fontsize-12"].join(' ')}
                     onChange={fc} />
            </td>
          </tr>
*/