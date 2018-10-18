import React, {Component} from 'react';

import Log      from '../../requests/Log.js';

import {Tag}    from '../objects/Tag.js';
import {Vessel} from '../objects/Vessel.js';

/*************************************************************************
 * VesselList.js
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


class VesselList extends Component {
  constructor(props) {
    super(props);
    Log.info( "VesselList: " + props.stage );
    this.state = {  };
  }

  render() {
    var json = this.props.returnedText;
    var vesselSelect = this.props.vesselSelect;
    var vesselList = [];
    var nt = new Tag(0,'Create new vessel','','S',null,null,null,null,null,null,'N');
    var nf = new Vessel(0,nt,'New Vessel',0,null,null);
    vesselList.push(nf);
    json.map(function(n,x){
        var t = new Tag( n.id, n.name, n.description, n.tagTypeCode, n.tag.tagTypeId
                       , n.misc, null, null, null, null, n.active);
        var v = new Vessel(n.id,t,n.vesselName,n.quantity,null,null); 
        return vesselList.push( v ); } );
    return ( 
      <div className="oms-tabs">
        <h2><div><img src="./images/spacer.png" alt="space" width="30px" height="2px"/>Site Vessels</div></h2>
        <table>
          <thead className="fixedHeader">
            <tr>
              <th className={["oms-spacing-120","oms-underline"].join(' ')}> Vessel Name </th>
              <th className={["oms-spacing-90","oms-underline"].join(' ')}> Active </th>
              <th className={["oms-spacing-120","oms-underline"].join(' ')}> Quantity (bbl) </th>
              <th className={["oms-spacing-120","oms-underline"].join(' ')}> Description </th>
            </tr>
          </thead>
          <tbody className="scrollContent">
          {vesselList.map(
            function(n,x){
              let z = n.id;
              return <tr key={x}>
                       <td className={["oms-spacing-120","oms-cursor-pointer"].join(' ')}>
                         <a id={z} onClick={() => {vesselSelect({z})}} >
                           {n.vesselName}
                         </a>
                       </td>
                       <td className="oms-spacing-90">{n.tag.active}</td>
                       <td className="oms-spacing-120">{n.quantity}</td>
                       <td className="oms-spacing-120">{n.tag.description}</td>
                     </tr>; 
            } )
          }
          </tbody>
        </table>
      </div>
    );
  }
  
}

export default VesselList;
