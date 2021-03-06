/*************************************************************************
 * PlotGroupList.js
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

import {PlotGroup} from '../objects/PlotGroup.js';


class PlotGroupList extends Component {
  constructor(props) {
    super(props);
    this.state = {  };
  }

  render() {
    var json = this.props.returnedText;
    var handleSelect = this.props.handleSelect;
    var plotGroupList = [];
    var nf = new PlotGroup(0,"New Plot Group","N",null,null,null,null,'PG');
    plotGroupList.push(nf);
    json.map(function(n,x) {
      if( "PG" === n.source ) {
        var f = new PlotGroup( n.id, n.name, n.active
                             , n.id1,n.id2,n.id3,n.id4,n.source); 
        return plotGroupList.push( f ); 
      } else {
        return plotGroupList;
      } 
    } );
        
    return ( 
      <div className="oms-tabs">
        <h2><div><img src="./images/spacer.png" alt="" width="30px" height="2px"/>Site PlotGroups</div></h2>
        <table>
          <thead className="fixedHeader">
            <tr>
              <th className={["oms-spacing-180","oms-underline"].join(' ')}> PlotGroup Name </th>
              <th className={["oms-spacing-120","oms-underline"].join(' ')}> Active </th>
            </tr>
          </thead>
          <tbody className="scrollContent">
          {plotGroupList.map(
            function(n,x){
              let z = n.id;
              return <tr key={x}>
                       <td className={["oms-spacing-180","oms-cursor-pointer"].join(' ')}>
                         <button type="button" className="link-button"
                                 onClick={() => {handleSelect({z})}} >{n.name}
                         </button>
                       </td>
                       <td className="oms-spacing-120">{n.active}</td>
                     </tr>; 
            } )
          }
          </tbody>
        </table>
      </div>
    );
  }
  
}

export default PlotGroupList;
