import React, {Component} from 'react';
import {ControlBlock} from '../objects/ControlBlock.js';
//import {Tag} from '../objects/Tag.js';


class ControlBlockList extends Component {
  constructor(props) {
    super(props);
    console.log( "AOList: " + props.stage );
    this.state = {  };
  }

  render() {
    var json = this.props.cbData;
    var ctrlBlkSelect = this.props.cbSelect;
    var ctrlBlkList = [];
//    var t0 = new Tag(0,'Create new tag',null,'AO',null,null,null,null,null,'Y');
    var ctrlBlk0 = new ControlBlock(0,0,null,'New Block','',null,null,null);
    ctrlBlkList.push(ctrlBlk0);
    json.map(function(n,x){
//        var t = new Tag(n.id,n.tag.name,n.tag.description,n.tag.tagTypeCode,n.tag.tagTypeId
//                       ,n.tag.c1Lat,n.tag.c1Long,n.tag.c2Lat,n.tag.c2Long,n.tag.active);
        var ctrlBlk = new ControlBlock(n.id, n.tagId,n.blockType,n.output,n.input
                                      ,n.allOutputs,n.allDInputs,n.allAInputs);
        return ctrlBlkList.push( ctrlBlk ); } );
    return ( 
      <div className="oms-tabs">
        <h2><div><img src="./images/spacer.png" alt="space" width="30px" height="2px"/>Control Blocks</div></h2>
        <table>
          <thead className="fixedHeader">
            <tr>
              <th className={["oms-spacing-120","oms-underline"].join(' ')} >Output</th>
              <th className={["oms-spacing-120","oms-underline"].join(' ')} >Input</th>
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
                           {n.output}
                         </a>
                       </td>
                       <td className={["oms-spacing-120","oms-fontsize-12"].join(' ')}>{n.input}</td>
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
