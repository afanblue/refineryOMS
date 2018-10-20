/*************************************************************************
 * AlarmTypeList.js
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
import {AlarmType} from '../objects/Alarm.js';


class AlarmTypeList extends Component {
  constructor( props ) {
    super(props);
    this.stage = {};
  }
  
  render() {
    var json = this.props.typeData;
    var typeSelect = this.props.typeSelect;
    var typeList = [];
    json.map(function(n,x){var at = new AlarmType(n.id, n.priority, n.code, n.alarmMsgId, n.alarmMsg); 
                           return typeList.push( at ); } );
    return ( 
      <div className="oms-tabs">
        <h2><div><img src="./images/spacer.png" alt="space" width="30px" height="2px"/>Configuration Items</div></h2>
        <table>
          <thead className="fixedHeader">
            <tr>
              <th className={["oms-spacing-70","oms-underline"].join(' ')}> Priority </th>
              <th className={["oms-spacing-70","oms-underline"].join(' ')}> Code </th>
              <th className={["oms-spacing-240","oms-underline"].join(' ')}> Message </th>
            </tr>
          </thead>
          <tbody className="scrollContent">
          {typeList.map(
            function(n,x){
              var z = n.id;
              return <tr key={x}>
                       <td className={["oms-spacing-70","oms-cursor-pointer","oms-fontsize-12"].join(' ')}>
                         <a id={z} onClick={() => {typeSelect({z})}} >
                           {n.priority}
                         </a>
                       </td>
                       <td className={["oms-spacing-70","oms-cursor-pointer","oms-fontsize-12"].join(' ')}>
                         <a id={z} onClick={() => {typeSelect({z})}} >
                           {n.code}
                         </a>
                       </td>
                       <td className={["oms-spacing-180","oms-cursor-pointer","oms-fontsize-12"].join(' ')}>
                         <a id={z} onClick={() => {typeSelect({z})}} >
                           {n.alarmMsg}
                         </a>
                       </td>
                     </tr>
              } 
            )
          }
          </tbody>
        </table>
      </div>
    );
  }

}

export default AlarmTypeList;
