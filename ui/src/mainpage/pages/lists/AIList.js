import React, {Component} from 'react';
import {AnalogInput} from '../objects/AI.js';
import Log    from '../../requests/Log.js';
import {Tag}  from '../objects/Tag.js';

/*************************************************************************
 * AIList.js
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


class AIList extends Component {
  constructor(props) {
    super(props);
    Log.info( "AIList: " + props.stage );
    this.state = {  };
  }

  render() {
    var json = this.props.aiData;
    var aiSelect = this.props.aiSelect;
    var aiList = [];
    var t0 = new Tag(0,'Create new tag',null,'AI',null,null,null,null,null,null,'Y');
    var ai0 = new AnalogInput(0,t0,null,null,null,null, null,null,null,null,null
                             ,null,null,null,null,null
                             ,null,null,null,null,null,null,null);
    aiList.push(ai0);
    json.map(function(n,x){
        var t = new Tag( n.id, n.tag.name, n.tag.description, n.tag.tagTypeCode, n.tag.tagTypeId
                       , n.tag.misc, n.tag.c1Lat, n.tag.c1Long, n.tag.c2Lat, n.tag.c2Long, n.tag.active);
        var ai = new AnalogInput(n.tagId,t,n.analogTypeCode,n.scanInt,n.scanOffset,n.currentScan
                                ,n.zeroValue,n.maxValue,n.histTypeCode,n.percent,n.slope
                                ,n.rawValue,n.scanValue,n.scanTime,n.prevValue,n.prevTime
                                ,n.lastHistValue,n.lastHistTime,n.hh,n.hi,n.lo,n.ll,n.unitId);
        return aiList.push( ai ); } );
    return ( 
      <div className="oms-tabs">
        <h2><div><img src="./images/spacer.png" alt="space" width="30px" height="2px"/>Analog Inputs</div></h2>
        <table>
          <thead className="fixedHeader">
            <tr>
              <th className={["oms-spacing-90","oms-underline"].join(' ')} >Name</th>
              <th className={["oms-spacing-50","oms-underline"].join(' ')} >Active</th>
              <th className={["oms-spacing-180","oms-underline"].join(' ')} >Description</th>
              <th className={["oms-spacing-100","oms-underline"].join(' ')} >Type</th>
              <th className={["oms-spacing-50","oms-underline"].join(' ')} >Zero</th>
              <th className={["oms-spacing-50","oms-underline"].join(' ')} >Max</th>
              <th className={["oms-spacing-70","oms-underline"].join(' ')} >HType</th>
            </tr>
          </thead>
          <tbody className="scrollContent">
          {aiList.map(
            function(n,x){
              let z = n.tagId;
              return <tr key={x}>
                       <td className={["oms-spacing-90","oms-cursor-pointer","oms-fontsize-12"].join(' ')}>
                         <a id={z} onClick={() => {aiSelect({z})}} >
                           {n.tag.name}
                         </a>
                       </td>
                       <td className={["oms-spacing-50","oms-fontsize-12"].join(' ')}>{n.tag.active}</td>
                       <td className={["oms-spacing-180","oms-fontsize-12"].join(' ')}>{n.tag.description}</td>
                       <td className={["oms-spacing-100","oms-fontsize-12"].join(' ')}>{n.analogTypeCode}</td>
                       <td className={["oms-spacing-50","oms-fontsize-12"].join(' ')}>{n.zeroValue}</td>
                       <td className={["oms-spacing-50","oms-fontsize-12"].join(' ')}>{n.maxValue}</td>
                       <td className={["oms-spacing-70","oms-fontsize-12"].join(' ')}>{n.histTypeCode}</td>
                     </tr>; 
            } )
          }
          </tbody>
        </table>
      </div>
    );
  }
  
}

export default AIList;
