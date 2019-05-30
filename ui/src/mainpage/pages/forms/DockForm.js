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

import React, {Component} from 'react';



class DockForm extends Component {
  constructor( props ) {
    super(props);
    this.state={};
    this.noAction=this.noAction.bind(this);
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
    let pumpList     = this.props.pumpList;
    let tup = this.props.tagUpdate;
    let fc  = this.props.fieldChange;
    let hq  = this.props.handleQuit;

    var miscLabel = <div></div>
    var miscListSelect = <div></div>
    var inTagLabel = <div></div>
    var inTagSelect = <div></div>
    var outTagLabel = <div></div>
    var outTagSelect = <div></div>
    var outListLabel = <div></div>
    var outListSelect = <div></div>

/* specify select options for "carrier present" */
    inTagLabel = <div>Carrier Present? : </div>
    inTagSelect = <select id="inTagId" name="inTagId" value={t.inTagId} onChange={fc} >{sensorList.map( function(n,x){ return <option key={x} value={n.id}>{n.name}</option> } )}</select>

/* specify select options for list of carriers */
    outTagLabel = <div>Carrier : </div>
    outTagSelect = <select id="outTagId" name="outTagId" value={t.outTagId} onChange={fc} >{carrierList.map( function(n,x){ return <option key={x} value={n.id}>{n.name}</option> } )}</select>

/* specify select options for MISC field (which for Docks is the carrier type) */
    miscLabel = <div>Carrier Type:</div>
    miscListSelect = <select id="misc" name="misc" value={t.misc} onChange={fc} ><option value="">---</option> <option value="S">S</option><option value="TR">Train</option><option value="TT">TankTruck</option></select>

/* specify select options for the outTagList (which are Pumps) */
    outListLabel = <div>Output pumps: </div>
    outListSelect =  <select id="outTagList" name="outTagList" value={t.outTagList} multiple="T" size="6" onChange={fc} >{pumpList.map( function(n,x){ return <option key={x} value={n.id}>{n.name}</option> } )}</select>


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
            <th className="oms-spacing-180">{miscLabel}</th>
            <td className="oms-spacing">{miscListSelect}</td>
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
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}


export default DockForm;