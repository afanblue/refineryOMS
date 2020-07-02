/*************************************************************************
 * CrontabForm.js
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


class CrontabForm extends Component {
  constructor(props) {
    super(props);
    this.state={};
  }

   static get propTypes() {
      return {
          ctab: PropTypes.object,
          id: PropTypes.number,
          ms: PropTypes.string,
          handleQuit: PropTypes.func,
          fieldChange: PropTypes.func,
          ctabUpdate: PropTypes.func
      }
  }

  render() {
    const ctab         = this.props.ctab;
    const handleQuit   = this.props.handleQuit;
    const fieldChange  = this.props.fieldChange;
    const ctabUpdate   = this.props.ctabUpdate;

   return (
      <div className="oms-tabs">
        <form id="ctabForm" name="ctabForm" >
          <table>
            <tbody className="scrollContent-wide">
              <tr>
                <th className="oms-spacing-100">&nbsp;</th>
                <td className="oms-spacing-240">
                  <img src="images/spacer.png" alt="" height="1px" width="260px"/>
                </td>
              </tr>
              <tr>
                <td className="oms-spacing-100">&nbsp;Name:&nbsp;</td>
                <td className="oms-spacing-240">
                  <input type="hidden" id="id" name="id" value={ctab.id} />
                  <input type="text" id="name" name="name" value={ctab.name}
                         className={["oms-spacing-240","oms-fontsize-12"].join(' ')}
                         onChange={fieldChange} size="60" maxLength="120" />
                </td>
              </tr>
              <tr>
                <td className="oms-spacing-100">&nbsp;Minute:&nbsp;</td>
                <td className="oms-spacing-240">
                  <input type="text" id="moh" name="moh" value={ctab.moh}
                         className={["oms-spacing-240","oms-fontsize-12"].join(' ')}
                         onChange={fieldChange} size="30" maxLength="120" />
                </td>
              </tr>
              <tr>
                <td className="oms-spacing-100">&nbsp;Hour:&nbsp;</td>
                <td className="oms-spacing-240">
                  <input type="text" id="hod" name="hod" value={ctab.hod}
                         className={["oms-spacing-240","oms-fontsize-12"].join(' ')}
                         onChange={fieldChange} size="30" maxLength="120" />
                </td>
              </tr>
              <tr>
                <th className="oms-spacing-100">&nbsp;Day of Month&nbsp;</th>
                  <input type="text" id="dom" name="dom" value={ctab.dom}
                         className={["oms-spacing-240","oms-fontsize-12"].join(' ')}
                         onChange={fieldChange} size="30" maxLength="120" />
              </tr>
              <tr>
                <th className="oms-spacing-100">&nbsp;Month of Year&nbsp;</th>
                  <input type="text" id="moy" name="moy" value={ctab.moy}
                         className={["oms-spacing-240","oms-fontsize-12"].join(' ')}
                         onChange={fieldChange} size="30" maxLength="120" />
              </tr>
              <tr>
                <th className="oms-spacing-100">&nbsp;Day of Week&nbsp;</th>
                  <input type="text" id="dow" name="dow" value={ctab.dow}
                         className={["oms-spacing-240","oms-fontsize-12"].join(' ')}
                         onChange={fieldChange} size="30" maxLength="120" />
              </tr>
              <tr>
                <th className="oms-spacing-100">&nbsp;Hour Duration&nbsp;</th>
                  <input type="text" id="hourDuration" name="hourDuration" value={ctab.hourDuration}
                         className={["oms-spacing-80","oms-fontsize-12"].join(' ')}
                         onChange={fieldChange} size="30" maxLength="120" />
              </tr>
              <tr>
                <th className="oms-spacing-100">&nbsp;Minute Duration&nbsp;</th>
                  <input type="text" id="minuteDuration" name="minuteDuration" value={ctab.minuteDuration}
                         className={["oms-spacing-80","oms-fontsize-12"].join(' ')}
                         onChange={fieldChange} size="30" maxLength="120" />
              </tr>
              <tr>
                <th className="oms-spacing-100">&nbsp;&nbsp;</th>
                <td className="oms-spacing-240">
                  <img src="images/spacer.png" alt="" height="1px" width="260px"/>
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
                               onClick={(e) => {ctabUpdate(e)}}/>
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      </div>
    )
  }
}

export default CrontabForm;