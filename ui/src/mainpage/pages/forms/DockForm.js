/*************************************************************************
 * DockForm.js
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


class DockForm extends Component {
  constructor( props ) {
    super(props);
    this.state={};
    this.noAction=this.noAction.bind(this);
  }

  static get propTypes() {
      return {
          carrierList: PropTypes.array,
          sensorList: PropTypes.array,
          stationList: PropTypes.array,
          tag: PropTypes.object,
          active: PropTypes.string,
          description: PropTypes.string,
          id: PropTypes.number,
          inTagId: PropTypes.number,
          misc: PropTypes.string,
          name: PropTypes.string,
          outTagId: PropTypes.number,
          outTagList: PropTypes.array,
          fieldChange: PropTypes.func,
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
    let carrierList  = this.props.carrierList;
    let sensorList   = this.props.sensorList;
    let stnList      = this.props.stationList;
    let tup = this.props.tagUpdate;
    let fc  = this.props.fieldChange;
    let hq  = this.props.handleQuit;

    var nameInput = <div></div>
    var miscLabel = <div></div>
    var miscListSelect = <div></div>
    var inTagLabel = <div></div>
    var inTagSelect = <div></div>
    var outTagLabel = <div></div>
    var outTagSelect = <div></div>
    var outListLabel = <div></div>
    var outListSelect = <div></div>
    var activeLabel = <div></div>
    var activeSelect = <div></div>
    var midStyle = {verticalAlign:'middle'};


/* specify select options for list of carriers */
    outTagLabel = <div>Carrier : </div>
    outTagSelect = <select id="outTagId" name="outTagId" value={t.outTagId} onChange={fc} >{carrierList.map( function(n,x){ return <option key={x} value={n.id}>{n.name}</option> } )}</select>

/* IF stationList is null, then we only want to set the Carrier */
    if( stnList !== null ) {

/*    set name input to readonly */
      nameInput = <div><input type="text" id="name" name="name" value={t.name} className="oms-spacing-80" size="10" maxLength="10" onChange={fc} /></div>

/*    set active options */
      activeLabel = <div>Active :</div>
      activeSelect = <div><select id="active" name="active" value={t.active} onChange={fc} ><option value="N">N</option><option value="Y">Y</option></select></div>

/*    specify select options for MISC field (which for Docks is the carrier type) */
      miscLabel = <div>Carrier Type:</div>
      miscListSelect = <select id="misc" name="misc" value={t.misc} onChange={fc} ><option value="">---</option> <option value="S">S</option><option value="TR">Train</option><option value="TT">TankTruck</option></select>

/*    specify select options for "carrier present" */
      inTagLabel = <div>Carrier Present? : </div>
      inTagSelect = <select id="inTagId" name="inTagId" value={t.inTagId} onChange={fc} >{sensorList.map( function(n,x){ return <option key={x} value={n.id}>{n.name}</option> } )}</select>

/*    specify select options for the outTagList (which are Stations) */
      outListLabel = <div style={midStyle}>Dock stations: </div>
      outListSelect =  <select id="outTagList" name="outTagList" value={t.outTagList} multiple="T" size="6" onChange={fc} >{stnList.map( function(n,x){ return <option key={x} value={n.id}>{n.name}</option> } )}</select>
    } else {
      nameInput = <div><input type="text" id="name" name="name" value={t.name} className="oms-spacing-80" size="10" maxLength="10" onChange={fc} readOnly="readonly" /></div>
    }


    return(
      <div className="oms-tabs">
        <table>
          <tbody>
            <tr>
              <td className="oms-top">

      <form id="tagForm" onSubmit={(e) => {tup(e)}} >
        Please add the carrier to your dock information
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
              {nameInput}
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
            <th className="oms-spacing-180">{miscLabel}</th>
            <td className="oms-spacing">{miscListSelect}</td>
          </tr>
          <tr>
            <th className="oms-spacing-180">{activeLabel}</th>
            <td className="oms-spacing">{activeSelect}</td>
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
            <th className="oms-spacing-180" style={midStyle}>{outListLabel}</th>
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
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}


export default DockForm;