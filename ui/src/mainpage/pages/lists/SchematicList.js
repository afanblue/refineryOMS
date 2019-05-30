/*************************************************************************
 * SchematicList.js
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

import {Schematic} from '../objects/Schematic.js';


class SchematicList extends Component {
  constructor(props) {
    super(props);
    this.state = {  };
  }

  render() {
    var json = this.props.schematicData;
    var schematicSelect = this.props.schematicSelect;
    var schematicList = [];
    var z = new Schematic( 0, "New Schematic", "", "N", "SCM", 0, null, null, null, null, null, null );
    schematicList.push(z);
    if( json.length !== 0 ) {
      json.map(function(ud,x){
          var xf = new Schematic( ud.id, ud.name, ud.description, ud.active, ud.tagTypeCode, ud.tagTypeId
                                , ud.misc, ud.c1Lat, ud.c1Long, ud.c2Lat, ud.c2Long, ud.childTags); 
          return schematicList.push( xf ); 
        } );
    }
    return ( 
      <div className="oms-tabs">
        <h2><div><img src="./images/spacer.png" alt="" width="50px" 
                      height="2px"/>OMS Schematics</div></h2>
        <table>
          <thead className="fixedHeader">
            <tr>
              <th className={["oms-spacing-120","oms-underline"].join(' ')}> Name </th>
              <th className={["oms-spacing-240","oms-underline"].join(' ')}> Description </th>
              <th className={["oms-spacing-80","oms-underline"].join(' ')}> Active </th>
            </tr>
          </thead>
          <tbody className="scrollContent">
          {schematicList.map(
            function(n,x){
              let z = n.id;
              return <tr key={x}>
                       <td className={["oms-spacing-120","oms-cursor-pointer"].join(' ')}>
                         <button type="button" className="link-button"
                                 onClick={() => {schematicSelect({z})}} >{n.name}
                         </button>
                       </td>
                       <td className={["oms-spacing-240","oms-cursor-pointer"].join(' ')}>{n.description}</td>
                       <td className={["oms-spacing-80","oms-cursor-pointer"].join(' ')}>{n.active}</td>
                     </tr>; 
            } )
          }
          </tbody>
        </table>
      </div>
    );
  }
  
}

export default SchematicList;
