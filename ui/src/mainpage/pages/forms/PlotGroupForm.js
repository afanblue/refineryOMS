/*************************************************************************
 * PlotGroupForm.js
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


class PlotGroupForm extends Component {
  constructor(props) {
    super(props);
    this.state = {  };
  }


  render() {
    const pg = this.props.plotGroup;
    const aiVarList = this.props.aiVarList;
    const handleUpdate = this.props.handleUpdate;
    const handleQuit = this.props.handleQuit;
    const handleChange = this.props.handleChange;
    
    return(
      <div className="oms-tabs">
      <table>
        <tbody>
          <tr>
            <td className="oms-top">

      <form id="plotGroupForm" >
        Please enter your PlotGroup information 
        <table>
          <tbody className="scrollContent-narrow">
          <tr>
            <th className="oms-spacing-120">&nbsp;</th>
            <td className="oms-spacing"><img src="images/spacer.png" 
                alt="" height="5px" width="240px"/>
            </td>
          </tr>
          <tr>
            <th className="oms-spacing-120">PlotGroup name (16 chars):</th>
            <td className="oms-spacing">
              <input type="hidden" name="id" value={pg.id} />            
              <input type="text" id="name" name="name" value={pg.name} 
                     className={["oms-spacing-180","oms-fontsize-12"].join(' ')}  size="20" maxLength="16"
                     onChange={handleChange} />
            </td>
          </tr>
          <tr>
            <td className="oms-spacing-120">Active:</td>
            <td className="oms-spacing">
              <select id="active" name="active" value={pg.active} 
                      onChange={handleChange} >
                <option value="N">N</option>
                <option value="Y">Y</option>
              </select>
            </td>
          </tr>
          <tr>
            <th className="oms-spacing-120">Tags in Group:</th>
            <td>
              <select multiple={true} name="aiList" id="aiList" value={pg.aiList} size={10}
                     className= {["oms-spacing-120","oms-fontsize-12"].join(' ')} 
                     onChange={handleChange}>
                {aiVarList.map(function(n,x) {
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
                           value="Submit" onClick={(e) => {handleUpdate(e)}} />
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

export default PlotGroupForm;
