import React, {Component} from 'react';
import {CalcVar} from '../objects/CalcVar.js';
import {Tag} from '../objects/Tag.js';


class CalcVarList extends Component {
  constructor(props) {
    super(props);
    console.log( "CalcVarList: " + props.stage );
    this.state = { };
  }

  render() {
    var json = this.props.returnedText;
    var handleSelect = this.props.handleSelect;
    var cvList = [];
    var nt = new Tag(0,'Create new CalcVar','','C',null,null,null,null,'N');
    var nf = new CalcVar(0,nt,'0',null,null,null,null);
    cvList.push(nf);
    json.map(function(n,x) {
        var t = new Tag(n.id,n.tag.name,n.tag.description,n.tag.tagTypeCode
                       ,n.tag.c1Lat,n.tag.c1Long,n.tag.c2Lat,n.tag.c2Long,n.tag.active);
        var cv = new CalcVar(n.id,t,n.definition,n.outputTagId,n.inputTags,null,null); 
        return cvList.push( cv );
    } );
    return ( 
      <div className="oms-tabs">
        <h2><div><img src="./images/spacer.png" alt="space" width="30px" height="2px"/>Calculation Variables</div></h2>
        <table>
          <thead className="fixedHeader">
            <tr>
              <th className={["oms-spacing-120","oms-underline"].join(' ')}> CalcVar Name </th>
              <th className={["oms-spacing-120","oms-underline"].join(' ')}> Definition </th>
            </tr>
          </thead>
          <tbody className="scrollContent">
          {cvList.map(
            function(n,x){
              let z = n.id;
              let defn = n.definition;
              return <tr key={x}>
                       <td className={["oms-spacing-120","oms-cursor-pointer"].join(' ')}>
                         <a id={z} onClick={() => {handleSelect({z})}} >
                           {n.tag.name}
                         </a>
                       </td>
                       <td className="oms-spacing-120">{defn}</td>
                     </tr>; 
            } )
          }
          </tbody>
        </table>
      </div>
    );
  }
  
}

export default CalcVarList;
