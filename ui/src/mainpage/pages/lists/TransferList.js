/*************************************************************************
 * TransferList.js
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
import moment from 'moment';

import {Transfer} from '../objects/Transfer.js';


class TransferList extends Component {
  constructor(props) {
    super(props);
    this.state = {  };
  }

  render() {
    var json = this.props.transferData;
    var transferSelect = this.props.transferSelect;
    var type = this.props.type;
    var typeHdr = "?";
    switch (type) {
      case "7" :
        typeHdr = "Last 7 Days";
        break;
      case "A" :
        typeHdr = "Active";
        break;
      case "S" :
        typeHdr = "Scheduled";
        break;
      case "T" :
        typeHdr = "Templates" ;
        break;
      case "X" :
        typeHdr = "Executable" ;
        break;
      default:
        typeHdr = " ????? " ;
        break;
	}
    var transferList = [];
    let aVolHdr = null;
    var now = moment().format('YYYY-MM-DD hh:mm:ss');

    if( (type === 'X') || (type==='T') ) {
      var z = new Transfer( 0, "New Transfer", 0, "", 0, "", 0, "", 0, ""
                        , null, null, null, null, null, null, null, null,0 );
      transferList.push(z);
    } else if( (type === 'A') || (type==='7') ) {
      aVolHdr = <th className={["oms-spacing-80","oms-underline"].join(' ')}> Act Volume </th>
	}
    json.map(function(ud,x){
        var xf = new Transfer(ud.id, ud.name, ud.statusId, ud.status
                             ,ud.transferTypeId, ud.transferType
                             ,ud.sourceId, ud.source,ud.destinationId, ud.destination
                             ,ud.expStartTime, ud.expEndTime, ud.expVolume
                             ,ud.actStartTime, ud.actEndTime, ud.actVolume,ud.delta);
        return transferList.push( xf );
      } );
    return (
      <div className="oms-tabs">
        <h2><div><img src="./images/spacer.png" alt="" width="50px"
                      height="2px"/>OMS {typeHdr} Transfers
          <img src="./images/spacer.png" alt="" width="50px" height="2px"/>
          {now}
        </div></h2>
        <table>
          <thead className="fixedHeader">
            <tr>
              <th className={["oms-spacing-120","oms-underline"].join(' ')}> Name </th>
              <th className={["oms-spacing-50","oms-underline"].join(' ')}> Status </th>
              <th className={["oms-spacing-90","oms-underline"].join(' ')}> Type </th>
              <th className={["oms-spacing-90","oms-underline"].join(' ')}> Source </th>
              <th className={["oms-spacing-90","oms-underline"].join(' ')}> Destination </th>
              <th className={["oms-spacing-150","oms-underline"].join(' ')}> Exp Start </th>
              <th className={["oms-spacing-80","oms-underline"].join(' ')}> Exp Volume </th>
              {aVolHdr}
            </tr>
          </thead>
          <tbody className="scrollContent">
          {transferList.map(
            function(n,x){
              let z = n.id;
              let aVol = null;
              if( (type === 'A') || (type==='7') ) {
                aVol = <td className="oms-spacing-80"> {n.actVolume} </td>
              }
              return <tr key={x}>
                       <td className={["oms-spacing-120","oms-cursor-pointer"].join(' ')}>
                         <button type="button" className="link-button"
                                 onClick={() => {transferSelect({z})}} >{n.name}
                         </button>
                       </td>
                       <td className="oms-spacing-50">{n.status}</td>
                       <td className="oms-spacing-90">{n.transferType}</td>
                       <td className="oms-spacing-90">{n.source}</td>
                       <td className="oms-spacing-90">{n.destination}</td>
                       <td className="oms-spacing-150">{n.expStartTime}</td>
                       <td className="oms-spacing-80">{n.expVolume} </td>
                       {aVol}
                     </tr>;
            } )
          }
          </tbody>
        </table>
      </div>
    );
  }

}

export default TransferList;
