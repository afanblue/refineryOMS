/*************************************************************************
 * CarrierList.js
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

import {Carrier} from '../objects/Carrier.js';


class CarrierList extends Component {
  constructor(props) {
    super(props);
    this.state = {  };
  }

  render() {
    var json = this.props.returnedText;
    var carrierSelect = this.props.carrierSelect;
    var carrierList = [];    // i,n,d,ttc,ttId,m,a,q
    var nc = new Carrier(0,'New carrier','','S',0,null,'N',0);
    carrierList.push(nc);
    json.map(function(n,x){
        var v = new Carrier( n.id,n.name, n.description, n.tagTypeCode, n.tagTypeId
                           , n.misc, n.active, n.quantity);
        return carrierList.push( v ); } );
    return (
      <div className="oms-tabs">
        <h2><div><img src="./images/spacer.png" alt="" width="30px" height="2px"/>Site Carriers</div></h2>
        <table>
          <thead className="fixedHeader">
            <tr>
              <th className={["oms-spacing-120","oms-underline"].join(' ')}> Carrier Name </th>
              <th className={["oms-spacing-180","oms-underline"].join(' ')}> Full Name/Description </th>
              <th className={["oms-spacing-90","oms-underline"].join(' ')} > Active </th>
              <th className={["oms-spacing-120","oms-underline"].join(' ')}> Quantity (bbl) </th>
            </tr>
          </thead>
          <tbody className="scrollContent">
          {carrierList.map(
            function(n,x){
              let z = n.id;
              return <tr key={x}>
                       <td className={["oms-spacing-120","oms-cursor-pointer"].join(' ')}>
                         <button type="button" className="link-button"
                                 onClick={() => {carrierSelect({z})}} >{n.name}
                         </button>
                       </td>
                       <td className="oms-spacing-180">{n.description}</td>
                       <td className="oms-spacing-90" >{n.active}</td>
                       <td className="oms-spacing-120">{n.quantity}</td>
                     </tr>;
            } )
          }
          </tbody>
        </table>
      </div>
    );
  }

}

export default CarrierList;
