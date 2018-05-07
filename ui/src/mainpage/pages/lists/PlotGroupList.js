import React, {Component} from 'react';
import {PlotGroup} from '../objects/PlotGroup.js';


class PlotGroupList extends Component {
  constructor(props) {
    super(props);
    console.log( "PlotGroupList: " + props.stage );
    this.state = {  };
  }

  render() {
    var json = this.props.returnedText;
    var handleSelect = this.props.handleSelect;
    var plotGroupList = [];
    var nf = new PlotGroup(0,"New Plot Group","N",null,null,null,null);
    plotGroupList.push(nf);
    json.map(function(n,x){
        var f = new PlotGroup( n.id, n.name, n.active
                             , n.id1,n.id2,n.id3,n.id4); 
        return plotGroupList.push( f ); } );
    return ( 
      <div className="oms-tabs">
        <h2><div><img src="./images/spacer.png" alt="space" width="30px" height="2px"/>Site PlotGroups</div></h2>
        <table>
          <thead className="fixedHeader">
            <tr>
              <th className={["oms-spacing-180","oms-underline"].join(' ')}> PlotGroup Name </th>
              <th className={["oms-spacing-120","oms-underline"].join(' ')}> Active </th>
            </tr>
          </thead>
          <tbody className="scrollContent">
          {plotGroupList.map(
            function(n,x){
              let z = n.id;
              return <tr key={x}>
                       <td className={["oms-spacing-180","oms-cursor-pointer"].join(' ')}>
                         <a id={z} onClick={() => {handleSelect({z})}} >
                           {n.name}
                         </a>
                       </td>
                       <td className="oms-spacing-120">{n.active}</td>
                     </tr>; 
            } )
          }
          </tbody>
        </table>
      </div>
    );
  }
  
}

export default PlotGroupList;
