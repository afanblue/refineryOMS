import React, {Component} from 'react';
import {ProcessUnit} from '../objects/ProcessUnit.js';
import {Tag} from '../objects/Tag.js';


class ProcessUnitList extends Component {
  constructor(props) {
    super(props);
    console.log( "ProcessUnitList: " + props.stage );
    this.state = {  };
  }

  render() {
    var json = this.props.returnedText;
    var select = this.props.puSelect;
    var puList = [];
    var tt = new Tag(0, "New Process Unit", "Create new process unit", null, null, null, null, null, null, null);
    var tpu = new ProcessUnit(tt, null);
    puList.push(tpu);
    json.map(function(n,x){
        var t = new Tag( n.tag.id, n.tag.name, n.tag.description, n.tag.tagTypeCode
                       , n.tag.c1Lat, n.tag.c1Long, n.tag.c2Lat, n.tag.c2Long, n.tag.active);
        var ts = n.tags;
        var pu = new ProcessUnit(t, ts); 
                           return puList.push( pu ); } );
    return ( 
      <div className="oms-tabs">
        <h2><div><img src="./images/spacer.png" alt="space" width="30px" height="2px"/>Process Units</div></h2>
        <table>
          <thead className="fixedHeader">
            <tr>
              <th className={["oms-spacing-100","oms-underline"].join(' ')}> Name </th>
              <th className={["oms-spacing-240","oms-underline"].join(' ')}> Description</th>
            </tr>
          </thead>
          <tbody className="scrollContent">
          {puList.map(
            function(n,x){
              let z = n.tag.id;
              if( z === 0 ) {
                n.tag.name = "New";
                n.tag.description = "Create new process unit";
              }
              return <tr key={x}>
                       <td className={["oms-spacing-100","oms-cursor-pointer"].join(' ')}>
                         <a id={z} onClick={() => {select({z})}} >
                           {n.tag.name}
                         </a>
                       </td>
                       <td className="oms-spacing-240">{n.tag.description}</td>
                     </tr>; 
            } )
          }
          </tbody>
        </table>
      </div>
    );
  }
  
}

export default ProcessUnitList;
