/*************************************************************************
 * CarrierForm.js
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


class CarrierForm extends Component {
  constructor(props) {
    super(props);
    this.state = {  };
  }

  static get propTypes() {
      return {
          carrier: PropTypes.object,
          id: PropTypes.number,
          name: PropTypes.string,
          description: PropTypes.string,
          tagTypeCode: PropTypes.string,
          active: PropTypes.string,
          quantity: PropTypes.number,
          carrierUpdate: PropTypes.func,
          handleQuit: PropTypes.func,
          carrierChange: PropTypes.func
      }
  }

  render() {
    const c = this.props.carrier;
    const carrierUpdate = this.props.carrierUpdate;
    const handleQuit = this.props.handleQuit;
    const carrierChange = this.props.carrierChange;

    return(
      <div className="oms-tabs">
      <table>
        <tbody>
          <tr>
            <td className="oms-top">

      <form id="carrierForm" >
        Please enter your carrier information
        <table>
          <tbody className="scrollContent-narrow">
          <tr>
            <th className="oms-spacing-180">&nbsp;</th>
            <td className="oms-spacing"><img src="images/spacer.png"
                alt="" height="5px" width="120px"/>
            </td>
          </tr>
          <tr>
            <th className="oms-spacing-180">Carrier (10 chars):</th>
            <td className="oms-spacing">
              <input type="hidden" name="id" value={c.id} />
              <input type="text" id="carrierName" name="carrierName" value={c.name}
                     className={["oms-spacing-180","oms-fontsize-12"].join(' ')}  size="32" maxLength="32"
                     onChange={carrierChange} />
            </td>
          </tr>
          <tr>
            <th className="oms-spacing-180">Full name:</th>
            <td className="oms-spacing">
              <input type="text" id="description" name="description" value={c.description}
                     className={["oms-spacing-120","oms-fontsize-12"].join(' ')}  size="120" maxLength="120"
                     onChange={carrierChange} />
            </td>
          </tr>
          <tr>
            <td className="oms-spacing-180">Carrier Type:</td>
            <td className="oms-spacing">
              <select id="tagTypeCode" name="tagTypeCode" value={c.tagTypeCode}
                      onChange={carrierChange} >
                <option value="TC">Tank Car</option>
                <option value="TT">Tank Truck</option>
                <option value="S">Ship</option>
              </select>
            </td>
          </tr>
          <tr>
            <td className="oms-spacing-180">Active:</td>
            <td className="oms-spacing">
              <select id="active" name="active" value={c.active}
                      onChange={carrierChange} >
                <option value="N">N</option>
                <option value="Y">Y</option>
              </select>
            </td>
          </tr>
          <tr>
            <th className="oms-spacing-180">Quantity:</th>
            <td className="oms-spacing">
              <input type="text" id="quantity" name="quantity" value={c.quantity}
                     className={["oms-spacing-120","oms-fontsize-12"].join(' ')}  size="120" maxLength="120"
                     onChange={carrierChange} />
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
                           value="Submit" onClick={(e) => {carrierUpdate(e)}} />
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

export default CarrierForm;
