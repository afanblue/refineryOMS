import React, {Component} from 'react';

import {Tag} from '../objects/Tag.js';
import {Vessel} from '../objects/Vessel.js';


class VesselList extends Component {
  constructor(props) {
    super(props);
    console.log( "VesselList: " + props.stage );
    this.state = {  };
  }

  render() {
    var json = this.props.returnedText;
    var vesselSelect = this.props.vesselSelect;
    var vesselList = [];
    var nt = new Tag(0,'Create new vessel','','S',null,null,null,null,null,'N');
    var nf = new Vessel(0,nt,'New Vessel',0,null,null);
    vesselList.push(nf);
    json.map(function(n,x){
        var t = new Tag(n.tag.id,n.tag.name,n.tag.description,n.tag.tagTypeCode,n.tag.tagTypeId
                       ,null,null,null,null,n.tag.active);
        var v = new Vessel(n.id,t,n.vesselName,n.quantity,null,null); 
        return vesselList.push( v ); } );
    return ( 
      <div className="oms-tabs">
        <h2><div><img src="./images/spacer.png" alt="space" width="30px" height="2px"/>Site Vessels</div></h2>
        <table>
          <thead className="fixedHeader">
            <tr>
              <th className={["oms-spacing-120","oms-underline"].join(' ')}> Vessel Name </th>
              <th className={["oms-spacing-90","oms-underline"].join(' ')}> Active </th>
              <th className={["oms-spacing-120","oms-underline"].join(' ')}> Quantity (bbl) </th>
              <th className={["oms-spacing-120","oms-underline"].join(' ')}> Description </th>
            </tr>
          </thead>
          <tbody className="scrollContent">
          {vesselList.map(
            function(n,x){
              let z = n.id;
              return <tr key={x}>
                       <td className={["oms-spacing-120","oms-cursor-pointer"].join(' ')}>
                         <a id={z} onClick={() => {vesselSelect({z})}} >
                           {n.vesselName}
                         </a>
                       </td>
                       <td className="oms-spacing-90">{n.tag.active}</td>
                       <td className="oms-spacing-120">{n.quantity}</td>
                       <td className="oms-spacing-120">{n.tag.description}</td>
                     </tr>; 
            } )
          }
          </tbody>
        </table>
      </div>
    );
  }
  
}

export default VesselList;
