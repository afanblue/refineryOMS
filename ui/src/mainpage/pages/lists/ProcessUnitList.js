/*************************************************************************
 * ProcessUnitList.js
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
import Log           from '../../requests/Log.js';

import {ProcessUnit} from '../objects/ProcessUnit.js';
//import {Tag} from '../objects/Tag.js';


class ProcessUnitList extends Component {
  constructor(props) {
    super(props);
    Log.info( "ProcessUnitList: " + props.stage );
    this.state = {  };
  }

  render() {
    var json = this.props.returnedText;
    var select = this.props.puSelect;
    var puList = [];
    var pu = new ProcessUnit( 0, "New Process Unit", "Create new process unit", "", "PU", null
                            , null, null, null, null, null, "N", null);
//    var tpu = new ProcessUnit(pu, null);
    puList.push(pu);
    json.map(function(n,x){
        var ts = n.tags;
        var pu = new ProcessUnit( n.id, n.name, n.description, n.tagTypeCode, n.tagTypeId
                                , n.misc, n.c1Lat, n.c1Long, n.c2Lat, n.c2Long, n.active, ts); 
        return puList.push( pu ); } );
    return ( 
      <div className="oms-tabs">
        <h2><div><img src="./images/spacer.png" alt="space" width="30px" height="2px"/>Process Units</div></h2>
        <table>
          <thead className="fixedHeader">
            <tr>
              <th className={["oms-spacing-100","oms-underline"].join(' ')}> Name </th>
              <th className={["oms-spacing-240","oms-underline"].join(' ')}> Description</th>
              <th className={["oms-spacing-80","oms-underline"].join(' ')}> Active </th>
            </tr>
          </thead>
          <tbody className="scrollContent">
          {puList.map(
            function(n,x){
              let z = n.id;
              if( z === 0 ) {
                n.name = "New";
                n.description = "Create new process unit";
                n.active = "N";
              }
              return <tr key={x}>
                       <td className={["oms-spacing-100","oms-cursor-pointer"].join(' ')}>
                         <a id={z} onClick={() => {select({z})}} >
                           {n.name}
                         </a>
                       </td>
                       <td className="oms-spacing-240">{n.description}</td>
                       <td className="oms-spacing-80">{n.active}</td>
                     </tr>; 
            } )
          }
          </tbody>
        </table>
      </div>
    );
  }
  
}

export default ProcessUnitList;
