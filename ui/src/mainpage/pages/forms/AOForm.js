/*************************************************************************
 * AOForm.js
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
import Log         from '../../requests/Log.js';


class AOForm extends Component {
  constructor(props) {
    super(props);
    Log.info( "AOForm: " + props.stage );
    this.state = {  };
  }

  render() {
    const ao = this.props.ao;
    const histTypes = this.props.histTypes;
    const unitList  = this.props.unitList;
//    const siteLoc   = this.props.siteLoc;
    const aoUpdate  = this.props.aoUpdate;
    const fieldChange = this.props.fieldChange;
    const handleQuit = this.props.handleQuit;
    return(
      <div className="oms-tabs">
        <table>
          <tbody>
            <tr>
              <td className="oms-top">
        <form id="aoForm" >
          Please enter your analog output information 
          <table>
            <tbody className="scrollContent-narrow">
              <tr>
                <th className="oms-spacing-90">&nbsp;</th>
                <td className="oms-spacing-180"><img src="images/spacer.png" 
                    alt="space" height="5px" width="180px"/></td>
              </tr>
              <tr>
                <th className="oms-spacing-90">AO name:</th>
                <td className="oms-spacing-180">
                  <input type="hidden" name="tagId" value={ao.tagId} />
                  <input type="text" id="tag.name" name="tag.name" value={ao.tag.name} 
                         className={["oms-spacing-80","oms-fontsize-12"].join(' ')} size="10" maxLength="10"
                         onChange={fieldChange} />
                </td>
              </tr>
              <tr>
                <th className="oms-spacing-90">Description:</th>
                <td className="oms-spacing-180">
                  <input type="text" id="tag.description" name="tag.description" value={ao.tag.description}
                         className={["oms-spacing-180","oms-fontsize-12"].join(' ')} size="120" maxLength="120"
                         onChange={fieldChange} />
                </td>
              </tr>
            
              <tr>
                <td className="oms-spacing-90">Active:</td>
                <td className="oms-spacing-180">
                  <select id="tag.active" name="tag.active" value={ao.tag.active} 
                          className={["oms-spacing-180","oms-fontsize-12"].join(' ')}
                          onChange={fieldChange} >
                    <option value="N">N</option>
                    <option value="Y">Y</option>
                  </select>
                </td>
              </tr>

          <tr>
            <td className="oms-spacing-90">Zero Value:</td>
            <td className={["oms-spacing-180","oms-fontsize-12"].join(' ')}>
              <input type="text" id="zeroValue" name="zeroValue" value={ao.zeroValue}
                      onChange={fieldChange} maxLength="8" size="10"/>
            </td>
          </tr>
          <tr>
            <td className="oms-spacing-90">Max Value:</td>
            <td className={["oms-spacing-180","oms-fontsize-12"].join(' ')}>
            <input type="text" id="maxValue" name="maxValue" value={ao.maxValue}
                    onChange={fieldChange} maxLength="9" size="10"/>
            </td>
          </tr>
          <tr>
            <td className="oms-spacing-90">Unit:</td>
            <td >
              <select id="unitId" name="unitId" value={ao.unitId}
                      onChange={fieldChange}>
                { unitList.map( 
                  function(n,x){
                    return <option key={x} value={n.id}>{n.code} ({n.name})</option>
                  } )
                }                
              </select>
            </td>
          </tr>
          <tr>
            <td className="oms-spacing-90">Hist Type:</td>
            <td >
              <select id="histTypeCode" name="histTypeCode" value={ao.histTypeCode}
                      onChange={fieldChange}>
                { histTypes.map( 
                  function(n,x){
                    return <option key={x} value={n.code}>{n.name}</option>
                  } )
                }                
              </select>
            </td>
          </tr>
          <tr>
            <td className="oms-spacing-90">Percent:</td>
            <td className={["oms-spacing-180","oms-fontsize-12"].join(' ')}>
              <input type="text" id="percent" name="percent" value={ao.percent} 
                     onChange={fieldChange} maxLength="2" size="5"/>
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
                               onClick={(e) => {aoUpdate(e)}}/>
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

export default AOForm;
