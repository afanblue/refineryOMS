/*************************************************************************
 * DockList.js
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


class DockList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render () {
    var json  = this.props.returnedText;
    var ts    = this.props.tagSelect;

    var tagList = [];
    var nt = new Tag(0,'New dock','','','',0,0,0,0,0,'N');
    tagList.push(nt);
    json.map(function(n,x){var t = new Tag(n.id,n.name,n.description,n.tagTypeCode,n.tagTypeId,n.misc
                                           ,n.c1Lat,n.c1Long,n.c2Lat,n.c2Long,n.active);
                           return tagList.push( t ); } );
    return (
      <div className="oms-tabs">
        <table>
          <thead className="fixedHeader">
            <tr>
              <th className={["oms-spacing-120","oms-underline"].join(' ')}> Tag name </th>
              <th className={["oms-spacing-240","oms-underline"].join(' ')}> Description </th>
              <th className={["oms-spacing-60","oms-underline"].join(' ')}> Tag Type </th>
              <th className={["oms-spacing-80","oms-underline"].join(' ')}>"Misc"</th>
              <th className={["oms-spacing-50","oms-underline"].join(' ')}> Active </th>
            </tr>
          </thead>
          <tbody className="scrollContent">
          {tagList.map(
            function(n,x){
              let z = n.id;
              return <tr key={x}>
                       <td className={["oms-spacing-120","oms-cursor-pointer"].join(' ')}>
                         <button type="button" className="link-button"
                                 onClick={() => {ts({z})}} >{n.name}
                         </button>
                       </td>
                       <td className="oms-spacing-240">{n.description}</td>
                       <td className="oms-spacing-60">{n.tagTypeCode}</td>
                       <td className="oms-spacing-80">{n.misc}</td>
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

export default DockList;
