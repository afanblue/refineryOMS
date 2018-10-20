/*************************************************************************
 * AlarmTypeForm.js
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


class AlarmTypeForm extends Component {
  constructor(props) {
    super(props);
    this.state={};
  }
  
  render() {
    const type   = this.props.type;
    const msgs   = this.props.msgs;
    const typeUpdate  = this.props.typeUpdate;
    const handleQuit  = this.props.handleQuit;
    const fieldChange = this.props.FieldChange;
    
    return (
      <div className="oms-tabs">
        <form id="typeForm" name="typeForm" >
          <table>
            <tbody className="scrollContent-narrow">
              <tr>
                <th className="oms-spacing-90">&nbsp;</th>
                <td className="oms-spacing-180">
                  <img src="images/spacer.png" alt="space" height="1px" width="260px"/>
                </td>
              </tr>
              <tr>
                <td className="oms-spacing-90">&nbsp;Priority:&nbsp;</td>
                <td className="oms-spacing-180">
                  <input type="hidden" name="id" value={type.id}
                         className={["oms-spacing-80","oms-fontsize-12"].join(' ')} />
                   <input type="text" id="priority" name="priority" value={type.priority} 
                         className={["oms-spacing-80","oms-fontsize-12"].join(' ')} 
                         onChange={fieldChange} size="5" maxLength="2" />
                </td>
              </tr>
              <tr>
                <td className="oms-spacing-90">&nbsp;Code:&nbsp;</td>
                <td className={["oms-spacing-80","oms-fontsize-12"].join(' ')} >
                   <input type="text" id="code" name="code" value={type.code} 
                         className={["oms-spacing-80","oms-fontsize-12"].join(' ')} 
                         onChange={fieldChange} size="8" maxLength="4" />
               </td>
              </tr>
              <tr>
                <td className="oms-spacing-90">&nbsp;Message:&nbsp;</td>
                <td className="oms-spacing-180">
                  <select id="alarmMsgId" name="alarmMsgId" value={type.alarmMsgId}
                          className={["oms-spacing-80","oms-fontsize-12"].join(' ')} 
                          onChange={fieldChange}>
                    { msgs.map( 
                      function(n,x){
                        return <option key={x} value={n.id}>{n.message}</option>
                      } )
                    }                
                  </select>
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
                               onClick={(e) => {typeUpdate(e)}}/>
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      </div>
    )
  }
}

export default AlarmTypeForm;