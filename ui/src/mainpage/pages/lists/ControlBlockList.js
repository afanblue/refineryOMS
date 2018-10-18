import React, {Component} from 'react';
import {ControlBlock} from '../objects/ControlBlock.js';
import Log     from '../../requests/Log.js';
//import {Tag} from '../objects/Tag.js';

/*************************************************************************
 * ControlBlockList.js
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


class ControlBlockList extends Component {
  constructor(props) {
    super(props);
    Log.info( "AOList: " + props.stage );
    this.state = {  };
  }

  render() {
    var json = this.props.cbData;
    var ctrlBlkSelect = this.props.cbSelect;
    var ctrlBlkList = [];
    var ctrlBlk0 = new ControlBlock(0,0,0,'','New Block','','',0,0,0);
    ctrlBlkList.push(ctrlBlk0);
    json.map(function(n,x){
        var ctrlBlk = new ControlBlock(n.id,n.pvId,n.spId,n.blockType,n.co,n.pv, n.sp, 0, 0, 0);
        return ctrlBlkList.push( ctrlBlk ); } );
    return ( 
      <div className="oms-tabs">
        <h2><div><img src="./images/spacer.png" alt="space" width="30px" height="2px"/>Control Blocks</div></h2>
        <table>
          <thead className="fixedHeader">
            <tr>
              <th className={["oms-spacing-120","oms-underline"].join(' ')} >CO</th>
              <th className={["oms-spacing-120","oms-underline"].join(' ')} >PV</th>
              <th className={["oms-spacing-120","oms-underline"].join(' ')} >Setpoint</th>
              <th className={["oms-spacing-90","oms-underline"].join(' ')} >Block Type</th>

            </tr>
          </thead>
          <tbody className="scrollContent">
          {ctrlBlkList.map(
            function(n,x){
              let z = n.id;
              return <tr key={x}>
                       <td className={["oms-spacing-120","oms-cursor-pointer","oms-fontsize-12"].join(' ')}>
                         <a id={z} onClick={() => {ctrlBlkSelect({z})}} >
                           {n.co}
                         </a>
                       </td>
                       <td className={["oms-spacing-120","oms-fontsize-12"].join(' ')}>{n.pv}</td>
                       <td className={["oms-spacing-120","oms-fontsize-12"].join(' ')}>{n.sp}</td>
                       <td className={["oms-spacing-90","oms-fontsize-12"].join(' ')}>{n.blockType}</td>
                     </tr>; 
            } )
          }
          </tbody>
        </table>
      </div>
    );
  }
  
}

export default ControlBlockList;
