/*************************************************************************
 * PipeList.js
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
import {Pipe} from '../objects/Pipe.js';


class PipeList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  
  render () {
    var json  = this.props.returnedText;
    var ps    = this.props.pipeSelect;
    
    var pipeList = [];
    var nt = new Pipe(0,'Create new pipe','','','',0,0,0,0,0,'N',0,[]);
    pipeList.push(nt);
    json.map(function(n,x){var p = new Pipe(n.id,n.name,n.description,n.tagTypeCode
                                           ,n.tagTypeId,n.misc
                                           ,n.c1Lat,n.c1Long,n.c2Lat,n.c2Long
                                           ,n.active,n.inTagId,n.vtxList); 
                           return pipeList.push( p ); } );
    return ( 
      <div className="oms-tabs">
        <h2><div>
          <img src="./images/spacer.png" alt="" width="30px" height="2px"/>Pipes
          <img src="./images/spacer.png" alt="" width="10px" height="2px"/>
        </div></h2>
        <table>
          <thead className="fixedHeader">
            <tr>
              <th className={["oms-spacing-120","oms-underline"].join(' ')}> Pipe name </th>
              <th className={["oms-spacing-240","oms-underline"].join(' ')}> Description </th>
              <th className={["oms-spacing-50","oms-underline"].join(' ')}> Active </th>
              <th className={["oms-spacing-50","oms-underline"].join(' ')}> Contents </th>
            </tr>
          </thead>
          <tbody className="scrollContent">
          {pipeList.map(
            function(n,x){
              let z = n.id;
              return <tr key={x}>
                       <td className={["oms-spacing-120","oms-cursor-pointer"].join(' ')}>
                         <button type="button" className="link-button"
                                 onClick={() => {ps({z})}} >{n.name}
                         </button>
                       </td>
                       <td className="oms-spacing-240">{n.description}</td>
                       <td className="oms-spacing-50">{n.active}</td>
                       <td className="oms-spacing-50">{n.misc}</td>
                     </tr>; 
            } )
          }
          </tbody>
        </table>
      </div>
    );
  }
}

export default PipeList;
