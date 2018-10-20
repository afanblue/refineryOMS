/*************************************************************************
 * ControlBlockForm.js
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

import React, {Component} from 'react';
import Log       from '../../requests/Log.js';


class ControlBlockForm extends Component {
  constructor(props) {
    super(props);
    Log.info( "CBForm: " + props.stage );
    this.state = {  };
  }

  render() {
    const ctrlBlk = this.props.cb;
    let allCBs = this.props.allOuts;
    let blank = {};
    blank.id = 0;
    blank.name = "---";
    allCBs.unshift(blank);
    const allDIs = this.props.allDIins;
    allDIs.unshift(blank);
    const allAIs = this.props.allAIins;
    allAIs.unshift(blank);
    const ctrlBlkUpdate = this.props.cbUpdate;
    const fieldChange = this.props.fieldChange;
    const handleQuit = this.props.handleQuit;
    let outSelect = ctrlBlk.co;
    let spSelect = null;
    let pvSelect = null;
    if( this.props.newCB ) {
      outSelect = <select name="id" id="id" value={ctrlBlk.id} className= {["oms-spacing-180","oms-fontsize-12"].join(' ')} onChange={fieldChange}>{allCBs.map(function(n,x) {var z=n.id; return <option key={x} value={z}>{n.name}</option>})}</select>;
      spSelect = <select name="spId" id="spId" value={ctrlBlk.spId} className= {["oms-spacing-180","oms-fontsize-12"].join(' ')} onChange={fieldChange}>{allAIs.map(function(n,x) {return <option key={x} value={n.id}>{n.name}</option>})}{allDIs.map(function(n,x) {return <option key={x} value={n.id}>{n.name}</option>})}</select>;
      pvSelect = <select name="pvId" id="pvId" value={ctrlBlk.pvId} className= {["oms-spacing-180","oms-fontsize-12"].join(' ')} onChange={fieldChange}>{allAIs.map(function(n,x) {return <option key={x} value={n.id}>{n.name}</option>})}{allDIs.map(function(n,x) {return <option key={x} value={n.id}>{n.name}</option>})}</select>;
    } else {
      if( ctrlBlk.blockType === "AO" ) {
        spSelect = <select name="spId" id="spId" value={ctrlBlk.spId} className= {["oms-spacing-180","oms-fontsize-12"].join(' ')} onChange={fieldChange}>{allAIs.map(function(n,x) {return <option key={x} value={n.id}>{n.name}</option>})} </select>;
        pvSelect = <select name="pvId" id="pvId" value={ctrlBlk.pvId} className= {["oms-spacing-180","oms-fontsize-12"].join(' ')} onChange={fieldChange}>{allAIs.map(function(n,x) {return <option key={x} value={n.id}>{n.name}</option>})} </select>;
      } else if( ctrlBlk.blockType === "DO" ) {
        spSelect = <select name="spId" id="spId" value={ctrlBlk.spId} className= {["oms-spacing-180","oms-fontsize-12"].join(' ')} onChange={fieldChange}>{allDIs.map(function(n,x) {return <option key={x} value={n.id}>{n.name}</option>})}</select>;
        pvSelect = <select name="pvId" id="pvId" value={ctrlBlk.pvId} className= {["oms-spacing-180","oms-fontsize-12"].join(' ')} onChange={fieldChange}>{allDIs.map(function(n,x) {return <option key={x} value={n.id}>{n.name}</option>})}</select>;
      } else {
        spSelect = <select name="spId" id="spId" value={ctrlBlk.spId} className= {["oms-spacing-180","oms-fontsize-12"].join(' ')} onChange={fieldChange}>{allAIs.map(function(n,x) {return <option key={x} value={n.id}>{n.name}</option>})}{allDIs.map(function(n,x) {return <option key={x} value={n.id}>{n.name}</option>})}</select>;
        pvSelect = <select name="pvId" id="pvId" value={ctrlBlk.pvId} className= {["oms-spacing-180","oms-fontsize-12"].join(' ')} onChange={fieldChange}>{allAIs.map(function(n,x) {return <option key={x} value={n.id}>{n.name}</option>})}{allDIs.map(function(n,x) {return <option key={x} value={n.id}>{n.name}</option>})}</select>;
      }
    }
    return(
      <div className="oms-tabs">
        <table>
          <tbody>
            <tr>
              <td className="oms-top">
        <form id="ctrlBlkForm" >
          Please enter your control block information 
          <table>
            <tbody className="scrollContent-narrow">
              <tr>
                <th className="oms-spacing-90">&nbsp;</th>
                <td className="oms-spacing-180"><img src="images/spacer.png" 
                    alt="space" height="5px" width="180px"/></td>
              </tr>
              <tr>
                <th className="oms-spacing-90">Output:</th>
                <td className="oms-spacing-180">
                  <input type="hidden" name="id" id="id" value={ctrlBlk.id} />
                  {outSelect}
                </td>
              </tr>
              <tr>
                <th className="oms-spacing-90">PV:</th>
                <td className="oms-spacing-180">
                  {pvSelect}
                </td>
              </tr>
              <tr>
                <th className="oms-spacing-90">SP:</th>
                <td className="oms-spacing-180">
                  {spSelect}
                </td>
              </tr>
              <tr>
                <th className="oms-spacing-90">Block Type:</th>
                <td className="oms-spacing-180">
                  {ctrlBlk.blockType}
                </td>
              </tr>
  
            </tbody>
          </table>
          <table className="oms-spacing">
            <tbody>
              <tr className="oms-spacing">
                <td>
                  <input type="submit" id="closeForm"  name="closeForm"  
                         value="Quit" className="oms-spacing"
                         onClick={(e) => {handleQuit(e)}} />
                  &nbsp;<input type="submit" id="submitForm" name="submitForm" 
                               value="Submit" className="oms-spacing"
                               onClick={(e) => {ctrlBlkUpdate(e)}}/>
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

export default ControlBlockForm;
