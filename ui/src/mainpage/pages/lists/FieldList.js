import React, {Component} from 'react';
import {Field} from '../objects/Field.js';
import Log     from '../../requests/Log.js';
//import {Tag} from '../objects/Tag.js';

/*************************************************************************
 * FieldList.js
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


class FieldList extends Component {
  constructor(props) {
    super(props);
    Log.info( "FieldList: " + props.stage );
    this.state = {  };
  }

  render() {
    var json = this.props.returnedText;
    var fieldSelect = this.props.fieldSelect;
    var fieldList = [];
    var nf = new Field( 0, 'Create new Field', '', 'FLD', null, null, null
                      , null, null, null, 'N', null, null, null, null);
    fieldList.push(nf);
    json.map(function(n,x){
        var f = new Field( n.id, n.name, n.description, n.tagTypeCode, n.tagTypeId
                         , n.misc, n.c1Lat, n.c1Long, n.c2Lat, n.c2Long, n.active
                         , n.parentId, n.parent, n.roadImage, n.satelliteImage); 
        return fieldList.push( f ); } );
    return ( 
      <div className="oms-tabs">
        <h2><div><img src="./images/spacer.png" alt="space" width="30px" height="2px"/>Site Fields</div></h2>
        <table>
          <thead className="fixedHeader">
            <tr>
              <th className={["oms-spacing-120","oms-underline"].join(' ')}> Field Name </th>
              <th className={["oms-spacing-120","oms-underline"].join(' ')}> Parent </th>
            </tr>
          </thead>
          <tbody className="scrollContent">
          {fieldList.map(
            function(n,x){
              let z = n.id;
              return <tr key={x}>
                       <td className={["oms-spacing-120","oms-cursor-pointer"].join(' ')}>
                         <a id={z} onClick={() => {fieldSelect({z})}} >
                           {n.name}
                         </a>
                       </td>
                       <td className="oms-spacing-120">{n.parent}</td>
                     </tr>; 
            } )
          }
          </tbody>
        </table>
      </div>
    );
  }
  
}

export default FieldList;
