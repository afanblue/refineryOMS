import React, {Component} from 'react';

/*************************************************************************
 * AlarmMsgForm.js
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

class AlarmMsgForm extends Component {
  constructor(props) {
    super(props);
    this.state={};
  }
  
  render() {
    const msg         = this.props.msg;
//    const types       = this.props.types;
    const handleQuit  = this.props.handleQuit;
    const fieldChange = this.props.fieldChange;
    const msgUpdate   = this.props.msgUpdate;
    
    return (
      <div className="oms-tabs">
        <form id="msgForm" name="msgForm" >
          <table>
            <tbody className="scrollContent">
              <tr>
                <th className="oms-spacing-90">&nbsp;</th>
                <td className="oms-spacing-240">
                  <img src="images/spacer.png" alt="space" height="1px" width="260px"/>
                </td>
              </tr>
              <tr>
                <td className="oms-spacing-90">&nbsp;Abbr:&nbsp;</td>
                <td className="oms-spacing-240">
                  <input type="hidden" id="id" name="id" value={msg.id} />
                  <input type="text" id="message" name="message" value={msg.abbr} 
                         className={["oms-spacing-80","oms-fontsize-12"].join(' ')} 
                         onChange={fieldChange} size="10" maxLength="4" />
                </td>
              </tr>
              <tr>
                <td className="oms-spacing-90">&nbsp;Message:&nbsp;</td>
                <td className="oms-spacing-240">
                  <input type="text" id="message" name="message" value={msg.message} 
                         className={["oms-spacing-80","oms-fontsize-12"].join(' ')} 
                         onChange={fieldChange} size="30" maxLength="120" />
                </td>
              </tr>
              <tr>
                <th className="oms-spacing-90">&nbsp;</th>
                <td className="oms-spacing-240">
                  <img src="images/spacer.png" alt="space" height="1px" width="260px"/>
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
                               onClick={(e) => {msgUpdate(e)}}/>
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      </div>
    )
  }
}

export default AlarmMsgForm;