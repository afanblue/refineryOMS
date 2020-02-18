/*************************************************************************
 * TagForm.js
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
import {Stage, Layer, Rect} from 'react-konva';

import SiteImage from '../SiteImage.js';


class TagForm extends Component {
  constructor( props ) {
    super(props);
    this.state={};
    this.noAction=this.noAction.bind(this);
  }

  static get propTypes() {
      return {
          contentsList: PropTypes.array,
          equipList: PropTypes.array,
          sensorList: PropTypes.array,
          siteLoc: PropTypes.object,
          tag: PropTypes.object,
          active: PropTypes.string,
          description: PropTypes.string,
          id: PropTypes.number,
          inTagId: PropTypes.number,
          inTagList: PropTypes.array,
          misc: PropTypes.string,
          name: PropTypes.string,
          outTagId: PropTypes.number,
          outTagList: PropTypes.array,
          tagTypeCode: PropTypes.string,
          tagTypes: PropTypes.array,
          fieldChange: PropTypes.func,
          handleMouseUp: PropTypes.func,
          handleQuit: PropTypes.func,
          tagUpdate: PropTypes.func
      }
  }

  scale( tagLoc, siteLoc, scaleFactor ) {
    return Math.round(scaleFactor * (tagLoc - siteLoc));
  }

  noAction(e) {
    e.preventDefault();
  }

  render() {
    let t = this.props.tag;
    let types        = this.props.tagTypes;
    let site         = this.props.siteLoc;
    let equipList    = this.props.equipList;
    let sensorList   = this.props.sensorList;
    let contentsList = this.props.contentsList;
//    let tagList = (this.props.tagList===null)?[]:this.props.tagList;
//    let inTagId = (this.props.inTagId===null)?0:this.props.inTagId;
//    let outTagId = (this.props.outTagId===null)?0:this.props.outTagId;
    let tup = this.props.tagUpdate;
    let fc  = this.props.fieldChange;
    let mu  = this.props.handleMouseUp
    let hq  = this.props.handleQuit;
//    let na  = this.noAction;

    var miscLabel = <div></div>
    var miscListSelect = <div></div>
    var inListLabel = <div></div>
    var inListSelect = <div></div>
    var outListLabel = <div></div>
    var outListSelect = <div></div>
    var inTagLabel = <div></div>
    var inTagSelect = <div></div>
    var outTagLabel = <div></div>
    var outTagSelect = <div></div>
    if( (t.tagTypeCode === 'RU') || (t.tagTypeCode==='TK') ) {
      inListLabel = <div>Input Equipment : </div>
      inListSelect = <select id="inTagList" name="inTagList" multiple={true} value={t.inTagList} onChange={fc} >{equipList.map( function(n,x){ return <option key={x} value={n.id}>{n.name}</option> } )}</select>
      outListLabel = <div>Output Equipment : </div>
      outListSelect = <select id="outTagList" name="outTagList" multiple={true} value={t.outTagList} onChange={fc} >{equipList.map( function(n,x){ return <option key={x} value={n.id}>{n.name}</option> } )}</select>
    }
    if( (t.tagTypeCode === 'V') || (t.tagTypeCode === 'PMP') ||
        (t.tagTypeCode === 'P') || (t.tagTypeCode === "RU")   ) {
      inTagLabel = <div>State Input : </div>
      inTagSelect = <select id="inTagId" name="inTagId" value={t.inTagId} onChange={fc} >{sensorList.map( function(n,x){ return <option key={x} value={n.id}>{n.name}</option> } )}</select>
    }

/* specify select options for list of outputs */
    if( (t.tagTypeCode === 'V') || (t.tagTypeCode === 'PMP') || (t.tagTypeCode === 'P') ) {
      outTagLabel = <div>State Output : </div>
      outTagSelect = <select id="outTagId" name="outTagId" value={t.outTagId} onChange={fc} >{sensorList.map( function(n,x){ return <option key={x} value={n.id}>{n.name}</option> } )}</select>
    }

/* specify select options for MISC field */
    if( (t.tagTypeCode === 'P') || (t.tagTypeCode === 'XFR' ) ) {
      miscLabel = <div>Contents:</div>
      miscListSelect = <select id="misc" name="misc" value={t.misc} onChange={fc} > { contentsList.map( function(n,x){ return <option key={x} value={n.id}>{n.name}</option> } ) } </select>
    } else if( t.tagTypeCode === 'DK' ) {
      miscLabel = <div>Carrier:</div>
      miscListSelect = <select id="misc" name="misc" value={t.misc} onChange={fc} ><option value="">---</option> <option value="S">S</option><option value="TR">Train</option><option value="TT">TankTruck</option></select>
    } else if( t.tagTypeCode === 'STN' ) {
      miscLabel = <div>Parent Type:</div>
      miscListSelect = <select id="misc" name="misc" value={t.misc} onChange={fc} >{ types.map( function(n,x){ return <option key={x} value={n.code}>{n.name}</option> } ) } </select>
    }

    var xDivisor = site.c2Long-site.c1Long;
    var xScale = IMAGEWIDTH / xDivisor;
    var yDivisor = site.c2Lat-site.c1Lat;
    var yScale = IMAGEHEIGHT / yDivisor;

    var xnw = this.scale( t.c1Long, site.c1Long, xScale);
    var wd  = this.scale( t.c2Long, site.c1Long, xScale) - xnw;
    var ynw = this.scale( t.c1Lat,  site.c1Lat,  yScale);
    var ht  = this.scale( t.c2Lat,  site.c1Lat,  yScale) - ynw;
    var color = "red";

    return(
      <div className="oms-tabs">
        <table>
          <tbody>
            <tr>
              <td className="oms-top">

      <form id="tagForm" onSubmit={(e) => {tup(e)}} >
        Please enter your tag information
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
              <input type="hidden" name="id" value={t.id} />
              <input type="text" id="name" name="name" value={t.name}
                     className="oms-spacing-80" size="10" maxLength="10"
                     onChange={fc} />
            </td>
          </tr>
          <tr>
            <th className="oms-spacing-180">Description :</th>
            <td className="oms-spacing">
              <input type="text" id="description" name="description" value={t.description}
                     className="oms-spacing-240" size="50" maxLength="120"
                     onChange={fc} />
            </td>
          </tr>
          <tr>
            <th className="oms-spacing-180">Tag Type:</th>
            <td className="oms-spacing">
              <select id="tagTypeCode" name="tagTypeCode" value={t.tagTypeCode}
                      onChange={fc} >
                { types.map(
                  function(n,x){
                    return <option key={x} value={n.code}>{n.name}</option>
                  } )
                }
              </select>
            </td>
          </tr>
          <tr>
            <th className="oms-spacing-180">{miscLabel}</th>
            <td className="oms-spacing">{miscListSelect}</td>
          </tr>
          <tr>
            <th className="oms-spacing-90">Corners (NW)</th>
            <td className="oms-spacing">
              <input type="text" id="c1Lat" name="c1Lat" value={t.c1Lat}
                     className={["oms-spacing-90","oms-fontsize-12"].join(' ')}
                     onChange={fc} />
              &nbsp;
              <input type="text" id="c1Long" name="c1Long" value={t.c1Long}
                     className={["oms-spacing-90","oms-fontsize-12"].join(' ')}
                     onChange={fc} />
            </td>
          </tr>
          <tr>
            <td className="oms-spacing-90">&nbsp;&nbsp;&nbsp;(SE)</td>
            <td>
              <input type="text" id="c2Lat" name="c2Lat" value={t.c2Lat}
                     className={["oms-spacing-90","oms-fontsize-12"].join(' ')}
                     onChange={fc} />
              &nbsp;
              <input type="text" id="c2Long" name="c2Long" value={t.c2Long}
                     className={["oms-spacing-90","oms-fontsize-12"].join(' ')}
                     onChange={fc} />
            </td>
          </tr>
          <tr>
            <th className="oms-spacing-180">Active:</th>
            <td className="oms-spacing">
              <select id="active" name="active" value={t.active}
                      onChange={fc} >
                <option value="N">N</option>
                <option value="Y">Y</option>
              </select>
            </td>
          </tr>
          <tr>
            <th className="oms-spacing-180">{inTagLabel}</th>
            <td className="oms-spacing">{inTagSelect}</td>
          </tr>
          <tr>
            <th className="oms-spacing-180">{outTagLabel}</th>
            <td className="oms-spacing">{outTagSelect}</td>
          </tr>
          <tr>
            <th className="oms-spacing-180">{inListLabel}</th>
            <td className="oms-spacing">{inListSelect}</td>
          </tr>
          <tr>
            <th className="oms-spacing-180">{outListLabel}</th>
            <td className="oms-spacing">{outListSelect}</td>
          </tr>
          <tr>
            <td colSpan="2">
              &nbsp;<input type="submit" id="closeForm"  name="closeForm"
                           value="Quit" onClick={(e) => {hq(e)}}/>
              &nbsp;<input type="submit" id="submitForm" name="submitForm"
                           value="Submit" onClick={(e) => {tup(e)}} />
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
                    <Rect x={xnw} y={ynw} width={wd} height={ht}
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


export default TagForm;