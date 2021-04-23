/*************************************************************************
 * ProcessUnitDisplay.js
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
import moment             from 'moment';

//import {AIValue}  from '../objects/AIValue.js';
//import {IL3}      from '../objects/ListObjects.js';



class ProcessUnitDisplay extends Component {
  constructor( props ) {
    super(props);
    this.state = {
      stage: props.stage,
      option: props.option,
      updateData: false,
      updateDisplay: true,
      items: props.items,
      itemSelect: props.itemSelect
    };
  }

  static get propTypes() {
      return {
          stage: PropTypes.string,
          option: PropTypes.string,
          items: PropTypes.array,
          itemSelect: PropTypes.func
      }
  }

  static getDerivedStateFromProps(nextProps, state) {
    return { option: nextProps.option,
                     items: nextProps.items,
                     itemSelect: nextProps.itemSelect };
  }

  render () {
    let itemSelect = this.state.itemSelect;
    let it = this.state.items;
//    let puColumns = [];
    var now = moment().format('YYYY-MM-DD HH:mm:ss');
    return(
      <div>
      <h2>
        <div className={"oms-tags"}>
           <img src="./images/spacer.png" alt="" height="1px" width="100px"/>
           Process Unit {this.state.option} - {now}
        </div>
      </h2>
      <table className={"scrollTable"}>
        <thead className={"fixedHeader"}>
          <tr>
            <td className={"oms-spacing-120"}>
              <img src="./images/spacer.png" alt="" height="1px" width="5px"/>
              Tag
            </td>
            <td className={"oms-spacing-240"}>
              <img src="./images/spacer.png" alt="" height="1px" width="5px"/>
              Description
            </td>
            <td className={"oms-spacing-90"}>
              <img src="./images/spacer.png" alt="" height="1px" width="5px"/>
              Value
            </td>
            <td className={"oms-spacing-90"}>
              <img src="./images/spacer.png" alt="" height="1px" width="5px"/>
              Scan Time
            </td>
          </tr>
        </thead>
        <tbody className={"scrollContent"}>
          {it.map(
            function(n,x) {
              let ztc = "#C3C2B9";
              let zx1 = n;
              const z1 = zx1.tagId;
              let zx1c = zx1.alarmColor;
              return (
                <tr key={x}>
                  <td className={"oms-spacing-120"}>
                    <button type="button" className="link-button"
                            onClick={() => {itemSelect({z1})}} >
                      <div style={{"color":ztc}}>{zx1.name}</div>
                    </button>
                  </td>
                  <td className={"oms-spacing-240"}>
                    <div style={{"color":ztc}}>{zx1.description}</div>
                  </td>
                  <td className={"oms-spacing-90"}>
                    <div style={{"color":zx1c}}>{zx1.valueText}</div>
                  </td>
                  <td className={"oms-spacing-90"}>
                    <div style={{"color":zx1c}}>{zx1.scanTime}</div>
                  </td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
      </div>

      );
  }
}

export default ProcessUnitDisplay;