import React, {Component} from 'react';
import {Tag} from '../objects/Tag.js';
import {Tank} from '../objects/Tank.js';


class TankList extends Component {
  constructor(props) {
    super(props);
    console.log( "TankList: " + props.stage );
    this.state = {  };
  }

  render() {
    var json = this.props.tankData;
    var tankSelect = this.props.tankSelect;
    var tankList = [];
    var tg0 = new Tag(0,'New Tank','','','','','','','Y');
    var tk0 = new Tank(0,tg0,'','','','','','','','','','','');
    tankList.push(tk0);
    json.map(function(n,x){var tg = new Tag(n.id,n.tag.name,n.tag.description
                                           ,n.tag.tagTypeCode,n.tag.c1Lat
                                           ,n.tag.c1Long,n.tag.c2Lat,n.tag.c2Long
                                           ,n.tag.active);
                           var tk = new Tank(n.id,tg,n.api,n.density,n.height
                                           ,n.diameter,n.units,n.contentType
                                           ,n.contentTypeCode
                                           ,n.tempTag,n.levelTag
                                           ,n.tempId,n.levelId); 
                           return tankList.push( tk ); } );
    return ( 
      <div className="oms-tabs">
        <h2><div><img src="./images/spacer.png" alt="space" width="50px" 
                      height="2px"/>OMS Tanks</div></h2>
        <table>
          <thead className="fixedHeader">
            <tr>
              <th className={["oms-spacing-100","oms-underline"].join(' ')}> Name </th>
              <th className={["oms-spacing-50","oms-underline"].join(' ')}> Active </th>
              <th className={["oms-spacing-70","oms-underline"].join(' ')}> Height </th>
              <th className={["oms-spacing-90","oms-underline"].join(' ')}> Diameter </th>
              <th className={["oms-spacing-50","oms-underline"].join(' ')}> Units </th>
              <th className={["oms-spacing-120","oms-underline"].join(' ')}> Contents </th>
              <th className={["oms-spacing-90","oms-underline"].join(' ')}> Temperature </th>
              <th className={["oms-spacing-90","oms-underline"].join(' ')}> Level </th>
            </tr>
          </thead>
          <tbody className="scrollContent">
          {tankList.map(
            function(n,x){
              let z = n.id;
              return <tr key={x}>
                       <td className={["oms-spacing-100","oms-cursor-pointer"].join(' ')}>
                         <a id={z} onClick={() => {tankSelect({z})}} >
                           {n.tag.name}
                         </a>
                       </td>
                       <td className="oms-spacing-50">{n.tag.active}</td>
                       <td className="oms-spacing-70">{n.height}</td>
                       <td className="oms-spacing-90">{n.diameter}</td>
                       <td className="oms-spacing-50">{n.units}</td>
                       <td className="oms-spacing-120">{n.contentType}</td>
                       <td className="oms-spacing-90">{n.tempTag} </td>
                       <td className="oms-spacing-90">{n.levelTag} </td>
                     </tr>; 
            } )
          }
          </tbody>
        </table>
      </div>
    );
  }
  
}

export default TankList;
