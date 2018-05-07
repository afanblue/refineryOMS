import React, {Component} from 'react';
import {Transfer} from '../objects/Transfer.js';


class ActiveTransferList extends Component {
  constructor(props) {
    super(props);
    console.log( "ActiveTransferList: " + props.stage );
    this.state = {  };
  }

  render() {
    var json = this.props.transferData;
    var transferSelect = this.props.transferSelect;
    var transferList = [];
    var n = new Date();
    var now = n.toLocaleString('en-US');
    json.map(function(ud,x){
        var xf = new Transfer(ud.id, ud.name, ud.statusId, ud.status
                             ,ud.transferTypeId, ud.transferType
                             ,ud.sourceId, ud.source,ud.destinationId, ud.destination
                             ,ud.expStartTime, ud.expEndTime, ud.expVolume
                             ,ud.actStartTime, ud.actEndTime, ud.actVolume,ud.delta); 
        return transferList.push( xf ); 
      } );
    return ( 
      <div className="oms-tabs">
        <h2><div><img src="./images/spacer.png" alt="space" width="50px" 
                      height="2px"/>OMS Transfers - {now}</div></h2>
        <table>
          <thead className="fixedHeader">
            <tr>
              <th className={["oms-spacing-120","oms-underline"].join(' ')}> Name </th>
              <th className={["oms-spacing-90","oms-underline"].join(' ')}> Source </th>
              <th className={["oms-spacing-90","oms-underline"].join(' ')}> Destination </th>
              <th className={["oms-spacing-150","oms-underline"].join(' ')}> Exp Start </th>
              <th className={["oms-spacing-120","oms-underline"].join(' ')}> Exp Volume </th>
              <th className={["oms-spacing-150","oms-underline"].join(' ')}> Act Start </th>
              <th className={["oms-spacing-120","oms-underline"].join(' ')}> Act Volume </th>
              
            </tr>
          </thead>
          <tbody className="scrollContent">
          {transferList.map(
            function(n,x){
              let z = n.id;
              return <tr key={x}>
                       <td className={["oms-spacing-120","oms-cursor-pointer"].join(' ')}>
                         <a id={z} onClick={() => {transferSelect({z})}} >
                           {n.name}
                         </a>
                       </td>
                       <td className="oms-spacing-90">{n.source}</td>
                       <td className="oms-spacing-90">{n.destination}</td>
                       <td className="oms-spacing-150">{n.expStartTime}</td>
                       <td className="oms-spacing-120">{n.expVolume} </td>
                       <td className="oms-spacing-150">{n.actStartTime}</td>
                       <td className="oms-spacing-120">{n.actVolume} </td>
                     </tr>; 
            } )
          }
          </tbody>
        </table>
      </div>
    );
  }
  
}

export default ActiveTransferList;
