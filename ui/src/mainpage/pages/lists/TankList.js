/*************************************************************************
 * TankList.js
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

import {Tag}  from '../objects/Tag.js';
import {Tank} from '../objects/Tank.js';


class TankList extends Component {
  constructor(props) {
    super(props);
    this.state = {  };
  }

  render() {
    var json = this.props.tankData;
    var tankSelect = this.props.tankSelect;
    var tankList = [];
    var tg0 = new Tag( 0, 'New Tank', '', 'TK', null, null
                     , null, null, null, null, 'Y');
    var tk0 = new Tank(0,tg0,'','','','','','','','','','','',0,0,null);
    tankList.push(tk0);
    json.map(function(n,x){var tg = new Tag(n.id, n.tag.name, n.tag.description
                                           ,n.tag.tagTypeCode, n.tag.tagTypeId, n.tag.misc
                                           ,n.tag.c1Lat, n.tag.c1Long, n.tag.c2Lat, n.tag.c2Long
                                           ,n.tag.active);
                           var tk = new Tank(n.id,tg,n.api,n.density,n.height
                                           ,n.diameter,n.units,n.contentType
                                           ,n.contentTypeCode
                                           ,n.tempTag,n.levelTag
                                           ,n.tempId,n.levelId
                                           ,n.tempRttId,n.levelRttId,n.volume); 
                           return tankList.push( tk ); } );
    return ( 
      <div className="oms-tabs">
        <h2><div><img src="./images/spacer.png" alt="" width="50px" 
                      height="2px"/>OMS Tanks</div></h2>
        <table>
          <thead className="fixedHeader">
            <tr>
              <th className={["oms-spacing-100","oms-underline"].join(' ')}> Name </th>
              <th className={["oms-spacing-50","oms-underline"].join(' ')}> Active </th>
              <th className={["oms-spacing-70","oms-underline"].join(' ')}> Height </th>
              <th className={["oms-spacing-90","oms-underline"].join(' ')}> Diameter </th>
              <th className={["oms-spacing-50","oms-underline"].join(' ')}> Units </th>
              <th className={["oms-spacing-120","oms-underline"].join(' ')}> Contents </th>
              <th className={["oms-spacing-90","oms-underline"].join(' ')}> Temperature </th>
              <th className={["oms-spacing-90","oms-underline"].join(' ')}> Level </th>
            </tr>
          </thead>
          <tbody className="scrollContent">
          {tankList.map(
            function(n,x){
              let z = n.id;
              return <tr key={x}>
                       <td className={["oms-spacing-100","oms-cursor-pointer"].join(' ')}>
                         <a id={z} onClick={() => {tankSelect({z})}} >
                           {n.tag.name}
                         </a>
                       </td>
                       <td className="oms-spacing-50">{n.tag.active}</td>
                       <td className="oms-spacing-70">{n.height}</td>
                       <td className="oms-spacing-90">{n.diameter}</td>
                       <td className="oms-spacing-50">{n.units}</td>
                       <td className="oms-spacing-120">{n.contentType}</td>
                       <td className="oms-spacing-90">{n.tempTag} </td>
                       <td className="oms-spacing-90">{n.levelTag} </td>
                     </tr>; 
            } )
          }
          </tbody>
        </table>
      </div>
    );
  }
  
}

export default TankList;
