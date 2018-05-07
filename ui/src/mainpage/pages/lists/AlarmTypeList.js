import React, {Component} from 'react';
import {AlarmType} from '../objects/Alarm.js';


class AlarmTypeList extends Component {
  constructor( props ) {
    super(props);
    this.stage = {};
  }
  
  render() {
    var json = this.props.typeData;
    var typeSelect = this.props.typeSelect;
    var typeList = [];
    json.map(function(n,x){var at = new AlarmType(n.id, n.priority, n.code, n.alarmMsgId, n.alarmMsg); 
                           return typeList.push( at ); } );
    return ( 
      <div className="oms-tabs">
        <h2><div><img src="./images/spacer.png" alt="space" width="30px" height="2px"/>Configuration Items</div></h2>
        <table>
          <thead className="fixedHeader">
            <tr>
              <th className={["oms-spacing-70","oms-underline"].join(' ')}> Priority </th>
              <th className={["oms-spacing-70","oms-underline"].join(' ')}> Code </th>
              <th className={["oms-spacing-240","oms-underline"].join(' ')}> Message </th>
            </tr>
          </thead>
          <tbody className="scrollContent">
          {typeList.map(
            function(n,x){
              var z = n.id;
              return <tr key={x}>
                       <td className={["oms-spacing-70","oms-cursor-pointer","oms-fontsize-12"].join(' ')}>
                         <a id={z} onClick={() => {typeSelect({z})}} >
                           {n.priority}
                         </a>
                       </td>
                       <td className={["oms-spacing-70","oms-cursor-pointer","oms-fontsize-12"].join(' ')}>
                         <a id={z} onClick={() => {typeSelect({z})}} >
                           {n.code}
                         </a>
                       </td>
                       <td className={["oms-spacing-180","oms-cursor-pointer","oms-fontsize-12"].join(' ')}>
                         <a id={z} onClick={() => {typeSelect({z})}} >
                           {n.alarmMsg}
                         </a>
                       </td>
                     </tr>
              } 
            )
          }
          </tbody>
        </table>
      </div>
    );
  }

}

export default AlarmTypeList;
