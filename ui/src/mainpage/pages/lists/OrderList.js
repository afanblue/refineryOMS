/*************************************************************************
 * OrderList.js
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
import moment    from 'moment';

import {Order}   from '../objects/Order.js';
import {IdName}  from '../objects/Tag.js';



class OrderList extends Component {
  constructor(props) {
    super(props);
    this.state = {  };
  }

  render() {
    var json = this.props.orderData;
    var orderSelect = this.props.orderSelect;
    var orderList = [];
    var typeHdr = " ???? ";
    var contentCode = this.props.contentCode;
    var contentCodes = this.props.contents;
    let blankItem = new IdName("T","All");
    contentCodes.unshift(blankItem);
    var fc = this.props.fieldChange;
    var option = this.props.option;
    var cCodeSelect = <select id="contentCode" name="contentCode" value={contentCode} onChange={fc} > { contentCodes.map( function(n,x){ return <option key={x} value={n.id}>{n.name}</option> } ) } </select>
    switch (option) {
      case "B" :
        var z = new Order( 0, 0, "", "P", "S", null, null, 0, 0, "", null, 0, "", [] );
        orderList.push(z);
        typeHdr = "Active";
        break;
      case "P" :
        typeHdr = "Pending";
        break;
      case "7" :
        typeHdr = "Last Week's" ;
        break;
      case "M" :
        typeHdr = "Last Month's" ;
        break;
      case "S" :
        typeHdr = "Sales";
        break;
      default:
        typeHdr = " ???? " ;
        break;
    }
    var now = moment().format('YYYY-MM-DD hh:mm:ss');
    json.map(function(xd,x){
        var xf = new Order( xd.id, xd.customerId, xd.customer
                          , xd.active, xd.purchase, xd.expDate, xd.actDate
                          , xd.expVolume, xd.actVolume, xd.contents
                          , xd.crontabId, xd.delay, xd.carrier, xd.items);
        return orderList.push( xf );
      } );
    return (
      <div className="oms-tabs">
        <h1><div><img src="./images/spacer.png" alt="" width="50px"
                      height="2px"/>OMS {typeHdr} Orders
                 <img src="./images/spacer.png" alt="" width="50px" height="2px"/>
                 {now}
                 <img src="./images/spacer.png" alt="" width="50px" height="2px"/>
                 {cCodeSelect}
        </div></h1>
        <table>
          <thead className="fixedHeader">
            <tr>
              <th className={["oms-spacing-60","oms-underline"].join(' ')}> Order ID </th>
              <th className={["oms-spacing-120","oms-underline"].join(' ')}> Customer </th>
              <th className={["oms-spacing-90","oms-underline"].join(' ')}> Carrier </th>
              <th className={["oms-spacing-50","oms-underline"].join(' ')}> Status </th>
              <th className={["oms-spacing-90","oms-underline"].join(' ')}> Contents </th>
              <th className={["oms-spacing-50","oms-underline"].join(' ')}> Type </th>
              <th className={["oms-spacing-120","oms-underline"].join(' ')}> Exp Start </th>
              <th className={["oms-spacing-120","oms-underline"].join(' ')}> Act Start </th>
              <th className={["oms-spacing-90","oms-underline"].join(' ')}> Exp Volume </th>
              <th className={["oms-spacing-90","oms-underline"].join(' ')}> Act Volume </th>
            </tr>
          </thead>
          <tbody className="scrollContent">
          {orderList.map(
            function(n,x){
              let z = n.id;
              let sid = "000000"+z.toString();
              sid = sid.substring(sid.length-6);
              let xStart = n.expDate.substring(0,16);
              let xEnd = n.actDate.substring(0,16);
              return <tr key={x}>
                       <td className={["oms-spacing-60","oms-cursor-pointer"].join(' ')}>
                         <button type="button" className="link-button"
                                 onClick={() => {orderSelect({z})}} >{sid}
                         </button>
                       </td>
                       <td className="oms-spacing-120">{n.customer}</td>
                       <td className="oms-spacing-90">{n.carrier}</td>
                       <td className="oms-spacing-50">{n.active}</td>
                       <td className="oms-spacing-90">{n.contents}</td>
                       <td className="oms-spacing-50">{n.purchase}</td>
                       <td className="oms-spacing-120">{xStart}</td>
                       <td className="oms-spacing-120">{xEnd}</td>
                       <td className="oms-spacing-90"> {n.expVolume} </td>
                       <td className="oms-spacing-90"> {n.actVolume} </td>
                     </tr>;
            } )
          }
          </tbody>
        </table>
      </div>
    );
  }

}

export default OrderList;
