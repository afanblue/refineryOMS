/*************************************************************************
 * TagList.js
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
import {Tag} from '../objects/Tag.js';


class TagList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  
  render () {
    var type  = this.props.type;
    let blankItem = {};
    blankItem.id = null;
    blankItem.name = '---';       
    var types = this.props.types.slice(0);
    types.unshift(blankItem);
    var json  = this.props.returnedText;
    var ts    = this.props.tagSelect;
    var fc    = this.props.fieldChange;
    
    var tagList = [];
    var nt = new Tag(0,'Create new tag','','','',0,0,0,0,0,'N');
    tagList.push(nt);
    json.map(function(n,x){var t = new Tag(n.id,n.name,n.description,n.tagTypeCode,n.tagTypeId,n.misc
                                           ,n.c1Lat,n.c1Long,n.c2Lat,n.c2Long,n.active); 
                           return tagList.push( t ); } );
    return ( 
      <div className="oms-tabs">
        <h2><div>
          <img src="./images/spacer.png" alt="" width="30px" height="2px"/>OMS Tags
          <img src="./images/spacer.png" alt="" width="10px" height="2px"/>
          <select id="type" name="type" value={type} 
                  onChange={fc} >
            { types.map( 
              function(n,x){
                return <option key={x} value={n.code}>{n.name}</option>
              } )
            }
          </select>
        </div></h2>
        <table>
          <thead className="fixedHeader">
            <tr>
              <th className={["oms-spacing-120","oms-underline"].join(' ')}> Tag name </th>
              <th className={["oms-spacing-240","oms-underline"].join(' ')}> Description </th>
              <th className={["oms-spacing-90","oms-underline"].join(' ')}> Tag Type </th>
              <th className={["oms-spacing-180","oms-underline"].join(' ')}> NW Corner </th>
              <th className={["oms-spacing-180","oms-underline"].join(' ')}> SE Corner </th>
              <th className={["oms-spacing-50","oms-underline"].join(' ')}> Active </th>
            </tr>
          </thead>
          <tbody className="scrollContent">
          {tagList.map(
            function(n,x){
              let z = n.id;
              return <tr key={x}>
                       <td className={["oms-spacing-120","oms-cursor-pointer"].join(' ')}>
                         <a id={z} onClick={() => {ts({z})}} >
                           {n.name}
                         </a>
                       </td>
                       <td className="oms-spacing-240">{n.description}</td>
                       <td className="oms-spacing-90">{n.tagTypeCode}</td>
                       <td className="oms-spacing-180">{n.c1Lat},{n.c1Long}</td>
                       <td className="oms-spacing-180">{n.c2Lat},{n.c2Long}</td>
                       <td className="oms-spacing-50">{n.active}</td>
                     </tr>; 
            } )
          }
          </tbody>
        </table>
      </div>
    );
  }
}

export default TagList;
