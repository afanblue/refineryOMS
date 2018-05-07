import React, {Component} from 'react';
import {Field} from '../objects/Field.js';
import {Tag} from '../objects/Tag.js';


class FieldList extends Component {
  constructor(props) {
    super(props);
    console.log( "FieldList: " + props.stage );
    this.state = {  };
  }

  render() {
    var json = this.props.returnedText;
    var fieldSelect = this.props.fieldSelect;
    var fieldList = [];
    var nt = new Tag(0,'Create new Field','','FLD',null,null,null,null,'N');
    var nf = new Field(0,nt,null,null,null,null);
    fieldList.push(nf);
    json.map(function(n,x){
        var t = new Tag(n.id,n.tag.name,n.tag.description,n.tag.tagTypeCode
                       ,n.tag.c1Lat,n.tag.c1Long,n.tag.c2Lat,n.tag.c2Long,n.tag.active);
        var f = new Field(n.id,t,n.parentId,n.parent
                         ,n.roadImage,n.satelliteImage); 
        return fieldList.push( f ); } );
    return ( 
      <div className="oms-tabs">
        <h2><div><img src="./images/spacer.png" alt="space" width="30px" height="2px"/>Site Fields</div></h2>
        <table>
          <thead className="fixedHeader">
            <tr>
              <th className={["oms-spacing-120","oms-underline"].join(' ')}> Field Name </th>
              <th className={["oms-spacing-120","oms-underline"].join(' ')}> Parent </th>
            </tr>
          </thead>
          <tbody className="scrollContent">
          {fieldList.map(
            function(n,x){
              let z = n.id;
              return <tr key={x}>
                       <td className={["oms-spacing-120","oms-cursor-pointer"].join(' ')}>
                         <a id={z} onClick={() => {fieldSelect({z})}} >
                           {n.tag.name}
                         </a>
                       </td>
                       <td className="oms-spacing-120">{n.parent}</td>
                     </tr>; 
            } )
          }
          </tbody>
        </table>
      </div>
    );
  }
  
}

export default FieldList;
