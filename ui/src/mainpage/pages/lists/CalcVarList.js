/*************************************************************************
 * CalcVarList.js
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
import {CalcVar} from '../objects/CalcVar.js';
import {Tag}     from '../objects/Tag.js';


class CalcVarList extends Component {
  constructor(props) {
    super(props);
    this.state = { };
  }

  render() {
    var json = this.props.returnedText;
    var handleSelect = this.props.handleSelect;
    var cvList = [];
    var nt = new Tag(0,'New CalcVar','','C',null,null,null,null,null,null,'N');
    var nf = new CalcVar(0,nt,'0',null,null,null,null);
    cvList.push(nf);
    json.map(function(n,x) {
        var t = new Tag( n.id,n.tag.name,n.tag.description,n.tag.tagTypeCode,n.tag.tagTypeId
                       , n.tag.misc, n.tag.c1Lat,n.tag.c1Long,n.tag.c2Lat,n.tag.c2Long,n.tag.active);
        var cv = new CalcVar(n.id,t,n.definition,n.outputTagId,n.inputTags,null,null);
        return cvList.push( cv );
    } );
    return (
      <div className="oms-tabs">
        <h2><div><img src="./images/spacer.png" alt="" width="30px" height="2px"/>Calculation Variables</div></h2>
        <table>
          <thead className="fixedHeader">
            <tr>
              <th className={["oms-spacing-120","oms-underline"].join(' ')}> CalcVar Name </th>
              <th className={["oms-spacing-180","oms-underline"].join(' ')}> Description </th>
              <th className={["oms-spacing-120","oms-underline"].join(' ')}> Definition (RPN) </th>
            </tr>
          </thead>
          <tbody className="scrollContent">
          {cvList.map(
            function(n,x){
              let z = n.id;
              let defn = n.definition;
              let descr = n.tag.description;
              return <tr key={x}>
                       <td className={["oms-spacing-120","oms-cursor-pointer"].join(' ')}>
                         <button type="button" className="link-button"
                                 onClick={() => {handleSelect({z})}} >{n.tag.name}
                         </button>
                       </td>
                       <td className="oms-spacing-180">{descr}</td>
                       <td className="oms-spacing-120">{defn}</td>
                     </tr>;
            } )
          }
          </tbody>
        </table>
      </div>
    );
  }

}

export default CalcVarList;
