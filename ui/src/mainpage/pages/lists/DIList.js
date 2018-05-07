import React, {Component} from 'react';
import {DigitalInput} from '../objects/DI.js';
import {Tag} from '../objects/Tag.js';


class DIList extends Component {
  constructor(props) {
    super(props);
    console.log( "DIList: " + props.stage );
    this.state = {  };
  }

  render() {
    var json = this.props.diData;
    var diSelect = this.props.diSelect;
    var t0 = new Tag(0,'Create New DI','','DI',null,null,null,null,'');
    var di0 = new DigitalInput(0,t0,0,0,0,'B',null,null,null,null,null,null,null,null,null);
    var diList = [];
    diList.push(di0);
    json.map(function(n,x){
        var t = new Tag(n.id,n.tag.name,n.tag.description,n.tag.tagTypeCode
                       ,n.tag.c1Lat,n.tag.c1Long,n.tag.c2Lat,n.tag.c2Long,n.tag.active);
        var di = new DigitalInput(
            n.tagId,t,n.scanInt,n.scanOffset,n.currentScan,n.histTypeCode
           ,n.alarmState,n.alarmCode,n.scanValue,n.scanTime
           ,n.prevValue,n.prevScanTime,n.lastHistValue,n.lastHistTime,n.valueView);
        return diList.push( di ); } );
    return ( 
      <div className="oms-tabs">
        <h2><div><img src="./images/spacer.png" alt="space" width="30px" height="2px"/>Site Fields</div></h2>
        <table>
          <thead className="fixedHeader">
            <tr>
              <th className={["oms-spacing-90","oms-underline"].join(' ')} >Name</th>
              <th className={["oms-spacing-50","oms-underline"].join(' ')} >Active</th>
              <th className={["oms-spacing-240","oms-underline"].join(' ')} >Description</th>
              <th className={["oms-spacing-50","oms-underline"].join(' ')} >AlmState</th>
              <th className={["oms-spacing-80","oms-underline"].join(' ')} >AlmCode</th>
              <th className={["oms-spacing-180","oms-underline"].join(' ')} >ValueView</th>
            </tr>
          </thead>
          <tbody className="scrollContent">
          {diList.map(
            function(n,x){
              let z = n.tagId;
              return <tr key={x}>
                       <td className={["oms-spacing-90","oms-cursor-pointer","oms-fontsize-12"].join(' ')}>
                         <a id={z} onClick={() => {diSelect({z})}} >
                           {n.tag.name}
                         </a>
                       </td>
                       <td className={["oms-spacing-50","oms-fontsize-12"].join(' ')}>{n.tag.active}</td>
                       <td className={["oms-spacing-240","oms-fontsize-12"].join(' ')}>{n.tag.description}</td>
                       <td className={["oms-spacing-50","oms-fontsize-12"].join(' ')}>{n.alarmState}</td>
                       <td className={["oms-spacing-80","oms-fontsize-12"].join(' ')}>{n.alarmCode}</td>
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

export default DIList;
