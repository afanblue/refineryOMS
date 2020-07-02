/*************************************************************************
 * OrderForm.js
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
import Datetime           from 'react-datetime';

class OrderForm extends Component {
  constructor(props) {
    super(props);
    this.state = {selected: "Properties"  };
  }

  static get propTypes() {
      return {
          order: PropTypes.object,
          items: PropTypes.array,
          id: PropTypes.number,
          option: PropTypes.string,
          contents: PropTypes.any,
          customers: PropTypes.any,
          carriers: PropTypes.any,
          expDate: PropTypes.any,
          purchase: PropTypes.any,
          active: PropTypes.string,
          customerId: PropTypes.number,
          carrierId: PropTypes.number,
          actDate: PropTypes.string,
          expVolume: PropTypes.number,
          actVolume: PropTypes.number,
          fieldChange: PropTypes.func,
          handleQuit: PropTypes.func,
          orderUpdate: PropTypes.func,
          orderCopy: PropTypes.func
      }
  }

  render() {
    var x          = this.props.order;
    var items      = x.items;
    var sid        = "000000"+x.id.toString();
    sid            = sid.substring(sid.length-6);
    const option   = this.props.option;
    const contents = this.props.contents;
    const custs    = this.props.customers;
    const carrs    = this.props.carriers;
    let defVal     = x.expDate;
    var fc       = this.props.fieldChange;
    var purchaseSelect = <select id="purchase" name="purchase" value={x.purchase} onChange={fc} ><option value={""}>---</option><option value={"P"}>Purchase</option><option value={"S"}>Sale</option></select>
    var statusSelect = <select id="active" name="active" value={x.active} onChange={fc} ><option value={"A"}>Active</option><option value={"C"}>Complete</option><option value={"P"}>Pending</option></select>
    if( x.id !== 0 ) {
      purchaseSelect = <select id="purchase" name="purchase" readOnly="READONLY" value={x.purchase} onChange={fc} ><option value={"P"}>Purchase</option><option value={"S"}>Sale</option></select>
      statusSelect = <select id="active" name="active" readOnly="READONLY" value={x.active} onChange={fc} ><option value={"A"}>Active</option><option value={"C"}>Complete</option><option value={"P"}>Pending</option></select>
    }
    return (
      <table width="100%">
        <tbody>
        <tr>
          <td>

              <form id="orderForm" >
                Please enter your order information
          <table>
            <tbody className="scrollContent">
              <tr>
                <th className="oms-spacing-150">&nbsp;</th>
                <td className="oms-spacing"><img src="images/spacer.png"
                    alt="" height="5px" width="180px"/></td>
              </tr>
              <tr>
                <th className="oms-spacing-150">Order ID:</th>
                <td className="oms-spacing">
                  <input type="hidden" id="id" name="id" value={x.id} />
                  {sid}
                </td>
              </tr>
              <tr>
                <th className="oms-spacing-150">Customer:</th>
                <td className="oms-spacing">
                  <select id="customerId" name="customerId" value={x.customerId} onChange={fc} >
                    { custs.map(
                      function(n,x){
                        return <option key={x} value={n.id}>{n.name}</option>
                      } )
                    }
                  </select>
                </td>
              </tr>
              <tr>
                <th className="oms-spacing-150"> Order Type:</th>
                <td className="oms-spacing">
                  {purchaseSelect}
                </td>
              </tr>
              <tr>
                <th className="oms-spacing-150">Expected Date:</th>
                <td className="oms-spacing">
                  <input type="text" id="expDate" name="expDate" value={x.expDate}
                         className={["oms-spacing-150","oms-fontsize-12"].join(' ')}
                         size="20" maxLength="20" onChange={fc} />
                  <Datetime dateFormat="YYYY-MM-DD" timeFormat={false} defaultValue={defVal}
                            input={false} onChange={fc} value={x.expDate} />
                </td>
              </tr>
              <tr>
                <td className="oms-spacing-150">Actual Date:</td>
                <td className="oms-spacing">
                  {x.actDate}
                </td>
              </tr>
              <tr>
                <th className="oms-spacing-150">Expected Volume (total):</th>
                <td className="oms-spacing">
                  {x.expVolume}&nbsp;May not be meaningful&nbsp;
                </td>
              </tr>
              <tr>
                <td className="oms-spacing-150">Actual Volume (total):</td>
                <td className="oms-spacing">
                  {x.actVolume}
                </td>
              </tr>

              <tr><td colSpan="2">
                <table>
                  <thead>
                    <tr>
                      <th className="oms-spacing-80">Item No.</th>
                      <th className="oms-spacing-100">Contents</th>
                      <th className="oms-spacing-150">Carrier:</th>
                      <th className="oms-spacing-150">Status:</th>
                      <th className="oms-spacing-100">Exp Vol (min)</th>
                      <th className="oms-spacing-100">Exp Vol (max)</th>
                      <th className="oms-spacing-100">Act Volume</th>
                    </tr>
                  </thead>
                  <tbody>

              { items.map(
                function(n,x){
                  let itemNdx = n.itemNo-1;
                  return <tr key={x}>
                           <td className="oms-spacing-80">
                             &nbsp;
                             <input id={["item",itemNdx,"id"].join('.')}
                                    name={["item",itemNdx,"id"].join('.')}
                                    type="hidden" value={n.id}/>&nbsp;
                             &nbsp;{n.itemNo}&nbsp;
                           </td>
                           <td className="oms-spacing-100">
                             &nbsp;
                               <select id={["item",itemNdx,"contentCd"].join('.')}
                                       name={["item",itemNdx,"contentCd"].join('.')}
                                       value={n.contentCd} onChange={fc} >
                                 {contents.map(
                                   function(c,cx) {
                                     return <option key={cx} value={c.code}>{c.name}</option>
                                   } )
                                 }
                               </select>
                             &nbsp;
                           </td>
                           <td className="oms-spacing">
                             <select id={["item",itemNdx,"carrierId"].join('.')}
                                     name={["item",itemNdx,"carrierId"].join('.')}
                                     value={n.carrierId} onChange={fc} >
                             { carrs.map(
							  function(c,x){ return <option key={x} value={c.id}>{c.name}</option> } )
							 }
							 </select>
                           </td>
                           <td className="oms-spacing">
                             <select id={["item",itemNdx,"active"].join('.')}
                                     name={["item",itemNdx,"active"].join('.')}
                                     value={n.active} onChange={fc} >
                               <option value={"-"}>------</option>
                               <option value={"A"}>Active</option>
                               <option value={"C"}>Complete</option>
                               <option value={"P"}>Pending</option>
							 </select>
                           </td>
                           <td className="oms-spacing-100">
                             &nbsp;
                               <input type="text" id={["item",itemNdx,"expVolumeMin"].join('.')}
                                      name={["item",itemNdx,"expVolumeMin"].join('.')}
                                      value={n.expVolumeMin} size="9" maxLength="9"
                                      onChange={fc} />
                             &nbsp;
                           </td>
                           <td className="oms-spacing-100">
                             &nbsp;
                               <input type="text" id={["item",itemNdx,"expVolumeMax"].join('.')}
                                      name={["item",itemNdx,"expVolumeMax"].join('.')}
                                      value={n.expVolumeMax} size="9" maxLength="9"
                                      onChange={fc} />
                             &nbsp;
                           </td>
                           <td className="oms-spacing-100">&nbsp;{n.actVolume}&nbsp;</td>
                         </tr>
                } )
              }
                  </tbody>
                </table>
              </td></tr>

            </tbody>
          </table>

                <table className="oms-spacing">
                  <tbody>
                    <tr className="oms-spacing">
                      <td>
                        <input type="submit" id="closeForm"  name="closeForm"
                               value=" Quit " className="oms-spacing"
                               onClick={(e) => {this.props.handleQuit(e)}} />
                        &nbsp;<input type="submit" id="submitForm" name="submitForm"
                                     value=" Submit " className="oms-spacing"
                                     onClick={(e) => {this.props.orderUpdate(e)}}/>
                        &nbsp;<input type="submit" id="copyForm" name="copyForm"
                                     value=" Copy " className="oms-spacing"
                                     onClick={(e) => {this.props.orderCopy(e)}}/>
                      </td>
                    </tr>
                  </tbody>
                </table>

              </form>

          </td>
        </tr>
        </tbody>
      </table>

     )
  }

}

export default OrderForm;
