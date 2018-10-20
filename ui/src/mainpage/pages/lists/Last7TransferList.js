/*************************************************************************
 * Last7TransferList.js
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
import Log        from '../../requests/Log.js';
import {Transfer} from '../objects/Transfer.js';


class Last7DaysTransferList extends Component {
  constructor(props) {
    super(props);
    Log.info( "Last7DaysTransferList: " + props.stage );
    this.state = {  };
  }

  render() {
    var json = this.props.transferData;
    var transferList = [];
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
        <h2><div><img src="./images/spacer.png" alt="space" width="50px" 
                      height="2px"/>OMS Transfers</div></h2>
        <table>
          <thead className="fixedHeader">
            <tr>
              <th className={["oms-spacing-120","oms-underline"].join(' ')}> Name </th>
              <th className={["oms-spacing-90","oms-underline"].join(' ')}> Source </th>
              <th className={["oms-spacing-90","oms-underline"].join(' ')}> Destination </th>
              <th className={["oms-spacing-150","oms-underline"].join(' ')}> Exp/Act Start </th>
              <th className={["oms-spacing-150","oms-underline"].join(' ')}> Exp/Act End </th>
              <th className={["oms-spacing-120","oms-underline"].join(' ')}> Exp/Act Volume </th>
            </tr>
          </thead>
          <tbody className="scrollContent">
          {transferList.map(
            function(n,x){
              return <tr key={x}>
                       <td className="oms-spacing-120">{n.name}</td>
                       <td className="oms-spacing-90">{n.source}</td>
                       <td className="oms-spacing-90">{n.destination}</td>
                       <td className="oms-spacing-150">
                         {n.expStartTime}<br/>{n.actStartTime}
                       </td>
                       <td className="oms-spacing-150">
                         {n.expEndTime}<br/>{n.actEndTime}
                       </td>
                       <td className="oms-spacing-120">
                         {n.expVolume}<br/>{n.actVolume}
                       </td>
                     </tr>
            } )
          }
          </tbody>
        </table>
      </div>
    );
  }
  
}

export default Last7DaysTransferList;
