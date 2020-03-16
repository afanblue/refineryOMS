/*************************************************************************
 * DOList.js
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
import {DigitalOutput} from '../objects/DO.js';
import {Tag}  from '../objects/Tag.js';


class DOList extends Component {
  constructor(props) {
    super(props);
    this.state = {  };
  }

  render() {
    var json = this.props.doData;
    var doSelect = this.props.doSelect;
    var doList = [];
    var t0 = new Tag(0,'New DO',null,'DO',null,null,null,null,null,null,'Y');
    var do0 = new DigitalOutput(0,t0,null,null ,null,null,null,null,null,null );
    doList.push(do0);
    json.map(function(n,x){
        var t = new Tag( n.id, n.tag.name, n.tag.description, n.tag.tagTypeCode, n.tag.tagTypeId
                       , n.tag.misc, n.tag.c1Lat, n.tag.c1Long, n.tag.c2Lat, n.tag.c2Long, n.tag.active);
        var doObj = new DigitalOutput( n.tagId, t, n.histTypeCode, n.valueView, n.scanValue, n.scanTime
                                     , n.prevValue, n.prevTime, n.lastHistValue, n.lastHistTime);
        return doList.push( doObj ); } );
    return (
      <div className="oms-tabs">
        <h2><div><img src="./images/spacer.png" alt="" width="30px" height="2px"/>Analog Outputs</div></h2>
        <table>
          <thead className="fixedHeader">
            <tr>
              <th className={["oms-spacing-90","oms-underline"].join(' ')} >Name</th>
              <th className={["oms-spacing-50","oms-underline"].join(' ')} >Active</th>
              <th className={["oms-spacing-240","oms-underline"].join(' ')} >Description</th>
              <th className={["oms-spacing-70","oms-underline"].join(' ')} >HType</th>
              <th className={["oms-spacing-180","oms-underline"].join(' ')} >View Name</th>
            </tr>
          </thead>
          <tbody className="scrollContent">
          {doList.map(
            function(n,x){
              let z = n.tagId;
              return <tr key={x}>
                       <td className={["oms-spacing-90","oms-cursor-pointer","oms-fontsize-12"].join(' ')}>
                         <button type="button" className="link-button"
                                 onClick={() => {doSelect({z})}} >{n.tag.name}
                         </button>
                       </td>
                       <td className={["oms-spacing-50","oms-fontsize-12"].join(' ')}>{n.tag.active}</td>
                       <td className={["oms-spacing-240","oms-fontsize-12"].join(' ')}>{n.tag.description}</td>
                       <td className={["oms-spacing-70","oms-fontsize-12"].join(' ')}>{n.histTypeCode}</td>
                       <td className={["oms-spacing-180","oms-fontsize-12"].join(' ')}>{n.valueView}</td>
                     </tr>;
            } )
          }
          </tbody>
        </table>
      </div>
    );
  }

}

export default DOList;
