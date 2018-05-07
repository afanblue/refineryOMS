import React, {Component} from 'react';
import {AnalogInput} from '../objects/AI.js';
import {Tag} from '../objects/Tag.js';


class AIList extends Component {
  constructor(props) {
    super(props);
    console.log( "AIList: " + props.stage );
    this.state = {  };
  }

  render() {
    var json = this.props.aiData;
    var aiSelect = this.props.aiSelect;
    var aiList = [];
    json.map(function(n,x){
        var t = new Tag(n.id,n.tag.name,n.tag.description,n.tag.tagTypeCode
                       ,n.tag.c1Lat,n.tag.c1Long,n.tag.c2Lat,n.tag.c2Long,n.tag.active);
        var ai = new AnalogInput(
            n.tagId,t,n.typeCode,n.scanInt,n.scanOffset,n.currentScan,n.zeroValue
           ,n.maxValue,n.histTypeCode,n.percent,n.slope,n.rawValue,n.scanValue,n.scanTime
           ,n.prevValue,n.prevTime,n.lastHistValue,n.lastHistTime,n.hh,n.hi,n.lo,n.ll);
        return aiList.push( ai ); } );
    return ( 
      <div className="oms-tabs">
        <h2><div><img src="./images/spacer.png" alt="space" width="30px" height="2px"/>Site Fields</div></h2>
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
            <tr key="0">
              <td className={["oms-spacing-90","oms-cursor-pointer"].join(' ')} colSpan="2">
                <a id="0" onClick={() => {aiSelect(0)}} >
                   Create New Analog Input
                </a>
              </td>
              <td className="oms-spacing-120" colSpan="5"></td>
            </tr>
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
                       <td className={["oms-spacing-100","oms-fontsize-12"].join(' ')}>{n.typeCode}</td>
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
