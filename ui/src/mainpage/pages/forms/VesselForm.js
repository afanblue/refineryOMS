import React, {Component} from 'react';
import Log       from '../../requests/Log.js';

/*************************************************************************
 * VesselForm.js
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


class VesselForm extends Component {
  constructor(props) {
    super(props);
    Log.info( "VesselForm: " + props.stage );
    this.state = {  };
  }


  render() {
    const v = this.props.vessel;
    const vesselUpdate = this.props.vesselUpdate;
    const handleQuit = this.props.handleQuit;
    const vesselChange = this.props.vesselChange;

    const custList = this.props.custList;       
    
    return(
      <div className="oms-tabs">
      <table>
        <tbody>
          <tr>
            <td className="oms-top">

      <form id="vesselForm" >
        Please enter your vessel information 
        <table>
          <tbody className="scrollContent-narrow">
          <tr>
            <th className="oms-spacing-180">&nbsp;</th>
            <td className="oms-spacing"><img src="images/spacer.png" 
                alt="space" height="5px" width="240px"/>
            </td>
          </tr>
          <tr>
            <th className="oms-spacing-180">Vessel name (32 chars):</th>
            <td className="oms-spacing">
              <input type="hidden" name="id" value={v.id} />            
              <input type="text" id="vesselName" name="vesselName" value={v.vesselName} 
                     className={["oms-spacing-180","oms-fontsize-12"].join(' ')}  size="32" maxLength="32"
                     onChange={vesselChange} />
            </td>
          </tr>
          <tr>
            <td className="oms-spacing-180">Vessel Type:</td>
            <td className="oms-spacing">
              <select id="tag.tagTypeCode" name="tag.tagTypeCode" value={v.tag.tagTypeCode} 
                      onChange={vesselChange} >
                <option value="TC">Tank Car</option>
                <option value="TT">Tank Truck</option>
                <option value="S">Ship</option>
              </select>
            </td>
          </tr>
          <tr>
            <td className="oms-spacing-180">Active:</td>
            <td className="oms-spacing">
              <select id="tag.active" name="tag.active" value={v.tag.active} 
                      onChange={vesselChange} >
                <option value="N">N</option>
                <option value="Y">Y</option>
              </select>
            </td>
          </tr>
          <tr>
            <th className="oms-spacing-180">Description:</th>
            <td className="oms-spacing">
              <input type="text" id="tag.description" name="tag.description" value={v.tag.description}
                     className={["oms-spacing-120","oms-fontsize-12"].join(' ')}  size="120" maxLength="120"
                     onChange={vesselChange} />
            </td>
          </tr>
          <tr>
            <th className="oms-spacing-180">Quantity:</th>
            <td className="oms-spacing">
              <input type="text" id="quantity" name="quantity" value={v.quantity}
                     className={["oms-spacing-120","oms-fontsize-12"].join(' ')}  size="120" maxLength="120"
                     onChange={vesselChange} />
            </td>
          </tr>
          <tr>
            <th className="oms-spacing-180">Customer:</th>
            <td className="oms-spacing">
              <select id="customerId" name="customerId" value={v.customerId}
                      onChange={vesselChange} >
                {custList.map( 
                  function(n,x){
                    return <option key={x} value={n.id}>{n.name}</option>
                  } )
                }
              </select>
            </td>
          </tr>
          </tbody>
        </table>
        <table className="oms-spacing">
          <tbody>
          <tr  className="oms-spacing">
            <td colSpan="2">
              &nbsp;<input type="submit" id="closeForm"  name="closeForm"  
                           value="Quit" onClick={(e) => {handleQuit(e)}}  />
              &nbsp;<input type="submit" id="submitForm" name="submitForm" 
                           value="Submit" onClick={(e) => {vesselUpdate(e)}} />
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

export default VesselForm;
