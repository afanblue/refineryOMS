/*************************************************************************
 * DOForm.js
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


class DOForm extends Component {
  constructor(props) {
    super(props);
    this.state = {  };
  }

  static get propTypes() {
      return {
          doObj: PropTypes.object,
          tag: PropTypes.object,
          tagId: PropTypes.number,
          name: PropTypes.string,
          description: PropTypes.string,
          active: PropTypes.string,
          histTypeCode: PropTypes.string,
          valueView: PropTypes.any,
          histTypes: PropTypes.array,
          valueViews: PropTypes.array,
          doUpdate: PropTypes.func,
          fieldChange: PropTypes.func,
          handleQuit: PropTypes.func
      }
  }

  render() {
    const doObj      = this.props.doObj;
    const histTypes  = this.props.histTypes;
    const valueViews = this.props.valueViews;
//    const siteLoc    = this.props.siteLoc;
    const doUpdate   = this.props.doUpdate;
    const fc         = this.props.fieldChange;
    const hq         = this.props.handleQuit;
    return(
      <div className="oms-tabs">
        <table>
          <tbody>
            <tr>
              <td className="oms-top">
        <form id="doForm" >
          Please enter your digital output information
          <table>
            <tbody className="scrollContent-narrow">
              <tr>
                <th className="oms-spacing-90">&nbsp;</th>
                <td className="oms-spacing-180"><img src="images/spacer.png"
                    alt="" height="5px" width="180px"/></td>
              </tr>
              <tr>
                <th className="oms-spacing-90">DO name:</th>
                <td className="oms-spacing-180">
                  <input type="hidden" name="tagId" value={doObj.tagId} />
                  <input type="text" id="tag.name" name="tag.name" value={doObj.tag.name}
                         className={["oms-spacing-80","oms-fontsize-12"].join(' ')} size="10" maxLength="10"
                         onChange={fc} />
                </td>
              </tr>
              <tr>
                <th className="oms-spacing-90">Description:</th>
                <td className="oms-spacing-180">
                  <input type="text" id="tag.description" name="tag.description" value={doObj.tag.description}
                         className={["oms-spacing-180","oms-fontsize-12"].join(' ')} size="120" maxLength="120"
                         onChange={fc} />
                </td>
              </tr>

              <tr>
                <td className="oms-spacing-90">Active:</td>
                <td className="oms-spacing-180">
                  <select id="tag.active" name="tag.active" value={doObj.tag.active}
                          className={["oms-spacing-180","oms-fontsize-12"].join(' ')}
                          onChange={fc} >
                    <option value="N">N</option>
                    <option value="Y">Y</option>
                  </select>
                </td>
              </tr>

          <tr>
            <td className="oms-spacing-90">Hist Type:</td>
            <td >
              <select id="histTypeCode" name="histTypeCode" value={doObj.histTypeCode}
                      onChange={fc}>
                { histTypes.map(
                  function(n,x){
                    return <option key={x} value={n.id}>{n.name} ({n.code})</option>
                  } )
                }
              </select>
            </td>
          </tr>
          <tr>
            <td className="oms-spacing-90">View Name:</td>
            <td >
              <select id="valueView" name="valueView" value={doObj.valueView}
                      onChange={fc}>
                { valueViews.map(
                  function(n,x){
                    return <option key={x} value={n}>{n}</option>
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
                         onClick={(e) => {hq(e)}} />
                  &nbsp;<input type="submit" id="submitForm" name="submitForm"
                               value="Submit" className="oms-spacing"
                               onClick={(e) => {doUpdate(e)}}/>
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

export default DOForm;
