/*************************************************************************
 * CrontabList.js
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
import {Crontab} from '../objects/Crontab.js';


class CrontabList extends Component {
  constructor( props ) {
    super(props);
    this.stage = {};
  }

  render() {
    var json = this.props.ctabData;
    var ctabSelect = this.props.ctabSelect;
    var ctabList = [];
    const z = 0;
    var ctb0 = new Crontab(0, 'Create new Crontab','','','','','','','');
    ctabList.push(ctb0);
    json.map(function(n,x){var ctb = new Crontab(n.id, n.name, n.moh, n.hod, n.dom, n.moy, n.dow, n.hourDuration, n.minuteDuration);
                           return ctabList.push( ctb ); } );
    return (
      <div className="oms-tabs">
        <h2><div><img src="./images/spacer.png" alt="" width="30px" height="2px"/>Configuration Items</div></h2>
        <table>
          <thead className="fixedHeader">
            <tr>
              <th className={["oms-spacing-240","oms-underline"].join(' ')}> Name </th>
              <th className={["oms-spacing-90","oms-underline"].join(' ')}> Minute </th>
              <th className={["oms-spacing-90","oms-underline"].join(' ')}> Hour </th>
              <th className={["oms-spacing-90","oms-underline"].join(' ')}> Day of Month </th>
              <th className={["oms-spacing-90","oms-underline"].join(' ')}> Month of Year </th>
              <th className={["oms-spacing-90","oms-underline"].join(' ')}> Day of Week </th>
              <th className={["oms-spacing-100","oms-underline"].join(' ')}> Duration (Hours) </th>
              <th className={["oms-spacing-100","oms-underline"].join(' ')}> Duration (Minutes) </th>
            </tr>
          </thead>
          <tbody className="scrollContent">
          {ctabList.map(
            function(n,x){
              const z = n.id;
              return <tr key={x}>
                       <td className={["oms-spacing-240","oms-cursor-pointer","oms-fontsize-12"].join(' ')}>
                         <button type="button" className="link-button"
                                 onClick={() => {ctabSelect({z})}} >{n.name}
                         </button>
                       </td>
                       <td className={["oms-spacing-90","oms-cursor-pointer","oms-fontsize-12"].join(' ')}>
                         <button type="button" className="link-button"
                                 onClick={() => {ctabSelect({z})}} >{n.moh}
                         </button>
                       </td>
                       <td className={["oms-spacing-90","oms-cursor-pointer","oms-fontsize-12"].join(' ')}>
                         <button type="button" className="link-button"
                                 onClick={() => {ctabSelect({z})}} >{n.hod}
                         </button>
                       </td>
                       <td className={["oms-spacing-90","oms-cursor-pointer","oms-fontsize-12"].join(' ')}>
                         <button type="button" className="link-button"
                                 onClick={() => {ctabSelect({z})}} >{n.dom}
                         </button>
                       </td>
                       <td className={["oms-spacing-90","oms-cursor-pointer","oms-fontsize-12"].join(' ')}>
                         <button type="button" className="link-button"
                                 onClick={() => {ctabSelect({z})}} >{n.moy}
                         </button>
                       </td>
                       <td className={["oms-spacing-90","oms-cursor-pointer","oms-fontsize-12"].join(' ')}>
                         <button type="button" className="link-button"
                                 onClick={() => {ctabSelect({z})}} >{n.dow}
                         </button>
                       </td>
                       <td className={["oms-spacing-100","oms-cursor-pointer","oms-fontsize-12"].join(' ')}>
                         <button type="button" className="link-button"
                                 onClick={() => {ctabSelect({z})}} >{n.hourDuration}
                         </button>
                       </td>
                       <td className={["oms-spacing-100","oms-cursor-pointer","oms-fontsize-12"].join(' ')}>
                         <button type="button" className="link-button"
                                 onClick={() => {ctabSelect({z})}} >{n.minuteDuration}
                         </button>
                       </td>
                     </tr>;
              }
            )
          }
          </tbody>
        </table>
      </div>
    );
  }
}

export default CrontabList;
