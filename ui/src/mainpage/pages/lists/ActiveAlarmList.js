/*************************************************************************
 * ActiveAlarmList.js
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
import moment             from 'moment';

class ActiveAlarmList extends Component {
  constructor(props) {
    super(props);
    this.state = {alarmList: props.alarmList};
  }
  
  componentWillReceiveProps(nextProps) {
    this.setState({ alarmList: nextProps.alarmList });
  }
  

  
  render() {
    var almList = this.state.alarmList;
    let handleSelect  = this.props.handleSelect;
    var now = (new Date()).toLocaleString('en-US', {hour12:false});
    return ( 
      <div className="oms-tabs">
        <h2><div>
          <img src="./images/spacer.png" alt="" width="30px" height="2px"/>
          Alarm List 
          <img src="./images/spacer.png" alt="" width="50px" height="2px"/>
          {now}
        </div></h2>
        <table>
          <thead className="fixedHeader">
            <tr>
              <th className={["oms-spacing-90","oms-underline"].join(' ')}> Name </th>
              <th className={["oms-spacing-150","oms-underline"].join(' ')}> Occurred </th>
              <th className={["oms-spacing-240","oms-underline"].join(' ')}> Description </th>
              <th className={["oms-spacing-80","oms-underline"].join(' ')}> Code </th>
              <th className={["oms-spacing-50","oms-underline"].join(' ')}> Pri </th>
              <th className={["oms-spacing-90","oms-underline"].join(' ')}> Value </th>
              <th className={["oms-spacing-240","oms-underline"].join(' ')}> Message </th>
            </tr>
          </thead>
          <tbody className="scrollContent">
          {almList.map(
            function(n,x){
              var z = n.id;
              var color = n.color;
              var ackColor = n.color;
              if( n.acknowledged === 'Y' ) {
                ackColor = "white";
              }
              var occ = moment.unix(n.almOccurred).format("YYYY-MM-DD HH:mm:ss");
              return (
                <tr key={x}>
                  <td className={["oms-spacing-90","oms-cursor-pointer"].join(' ')} 
                      style={{"color":ackColor}}>
                    <button type="button" className="link-button"
                            onClick={() => {handleSelect({z})}} >{n.tagId.name}
                    </button>
                  </td>
                  <td className="oms-spacing-150" style={{"color":ackColor}}>
                    {occ}
                  </td>
                  <td className="oms-spacing-240" style={{"color":color}}>
                    {n.tagId.description}
                  </td>
                  <td className="oms-spacing-80" style={{"color":color}}>
                    {n.code}
                  </td>
                  <td className="oms-spacing-50" style={{"color":color}}>
                    {n.priority}
                  </td>
                  <td className="oms-spacing-90" style={{"color":color}}>
                    {n.value}
                  </td>
                  <td className="oms-spacing-240" style={{"color":color}}>
                    {n.message}
                  </td>
                </tr>
                );
              } 
            )
          }
          </tbody>
        </table>
      </div>
    );
  }
  
}

export default ActiveAlarmList;