import React, {Component} from 'react';
import {AlarmMsg} from '../objects/Alarm.js';


class AlarmMsgList extends Component {
  constructor( props ) {
    super(props);
    this.stage = {};
  }
  
  render() {
    var json = this.props.msgData;
    var msgSelect = this.props.msgSelect;
    var msgList = [];
    json.map(function(n,x){var am = new AlarmMsg(n.id, n.abbr, n.message); 
                           return msgList.push( am ); } );
    return ( 
      <div className="oms-tabs">
        <h2><div><img src="./images/spacer.png" alt="space" width="30px" height="2px"/>Configuration Items</div></h2>
        <table>
          <thead className="fixedHeader">
            <tr>
              <th className={["oms-spacing-70","oms-underline"].join(' ')}> Abbr </th>
              <th className={["oms-spacing-240","oms-underline"].join(' ')}> Message </th>
            </tr>
          </thead>
          <tbody className="scrollContent">
            <tr>
              <td className={["oms-spacing-90","oms-cursor-pointer","oms-fontsize-12"].join(' ')} colSpan="2">
                <a id="0" onClick={() => {msgSelect(0)}} >
                  Create New Message
                </a>
              </td>
            </tr>
          {msgList.map(
            function(n,x){
              const z = n.id;
              return <tr key={x}>
                       <td className={["oms-spacing-90","oms-cursor-pointer","oms-fontsize-12"].join(' ')}>
                         <a id={z} onClick={() => {msgSelect({z})}} >
                           {n.abbr}
                         </a>
                       </td>
                       <td className={["oms-spacing-240","oms-cursor-pointer","oms-fontsize-12"].join(' ')}>
                         <a id={z} onClick={() => {msgSelect({z})}} >
                           {n.message}
                         </a>
                       </td>
                     </tr>; 
              } 
            )
          }
          </tbody>
        </table>
      </div>
    );
  }
}

export default AlarmMsgList;
