import React, {Component} from 'react';
//import { Stage, Layer, Text } from 'react-konva';

//import {SERVERROOT}  from '../../Parameters.js';
import {AIValue}     from '../objects/AIValue.js';


function IL3(i1,i2,i3) {this.i1=i1; this.i2=i2; this.i3=i3;}
  

class ProcessUnitDisplay extends Component {
  constructor( props ) {
    super(props);
    this.state = {
      stage: props.stage,
      option: props.option,
      updateData: false,
      updateDisplay: true,
      items: props.items,
      itemSelect: props.itemSelect
    };
  }
  
  componentWillReceiveProps(nextProps) {
    console.log( "ProcessUnitDisplay.willRcvProps: "
               + ((nextProps.option===null)?"null":nextProps.option) );
    this.setState({ option: nextProps.option,
                    items: nextProps.items,
                    itemSelect: nextProps.itemSelect });
  }
  
  render () {
    let itemSelect = this.state.itemSelect;
    let it = this.state.items;
    let puColumns = [];
    it.forEach((i,x) => {
//      console.log("forEach loop: x="+x);
      if( !((x+1) % 3) ) {
//        console.log("forEachLoop inner: x="+x);
        let it0 = it[x-2];
        let it1 = it[x-1];
        let it2 = it[x];
        let AIV0 = new AIValue(it0.tagId,it0.name,it0.value,it0.valueText,it0.scanTime,it0.alarmCode,it0.alarmColor);
        let AIV1 = new AIValue(it1.tagId,it1.name,it1.value,it1.valueText,it1.scanTime,it1.alarmCode,it1.alarmColor);
        let AIV2 = new AIValue(it2.tagId,it2.name,it2.value,it2.valueText,it2.scanTime,it2.alarmCode,it2.alarmColor);
        let il = new IL3(AIV0,AIV1,AIV2);
        puColumns.push(il);
      }
    });
    const dl = it.length;
    const rem = dl%3;
//    console.log("Remainder "+dl%3+" processing");
    if( rem > 0 ) {
      let AIV2 = new AIValue(0,"",null,"",null,"NORM","green");
      let AIV1 = new AIValue(0,"",null,"",null,"NORM","green");
      let AIV0 = new AIValue(0,"",null,"",null,"NORM","green");
      let x = dl-rem;
      if( rem > 1 ) {
        let it1 = it[x+1];
        AIV1 = new AIValue(it1.tagId,it1.name,it1.value,it1.valueText,it1.scanTime,it1.alarmCode,it1.alarmColor);
      }
      let it0  = it[x];
      AIV0 = new AIValue(it0.tagId,it0.name,it0.value,it0.valueText,it0.scanTime,it0.alarmCode,it0.alarmColor);
      let il = new IL3(AIV0,AIV1,AIV2);
      puColumns.push(il);
    }
 
    var n = new Date();
    var now = n.toLocaleString('en-US');
    console.log("ProcessUnitDisplay.generateList");
    return(
      <div>
      <h2>
        <div className={"oms-tags"}>
           <img src="./images/spacer.png" alt="space" height="1px" width="100px"/>
           Process Unit {this.state.option} - {now}
        </div>
      </h2>
      <table className={"scrollTable"}>
        <thead className={"fixedHeader"}>
          <tr>
	        <td className={"oms-spacing-180"}>
	          <img src="./images/spacer.png" alt="space" height="1px" width="10px"/>
	          Tag
	          <img src="./images/spacer.png" alt="space" height="1px" width="45px"/>
	          Value
	        </td>
	        <td className={"oms-spacing-180"}>
	          <img src="./images/spacer.png" alt="space" height="1px" width="10px"/>
	          Tag
	          <img src="./images/spacer.png" alt="space" height="1px" width="45px"/>
	          Value
	        </td>
            <td className={"oms-spacing-180"}>
	          <img src="./images/spacer.png" alt="space" height="1px" width="10px"/>
	          Tag
	          <img src="./images/spacer.png" alt="space" height="1px" width="45px"/>
	          Value
            </td>
          </tr>
        </thead>
        <tbody className={"scrollContent"}>
          {puColumns.map( 
            function(n,x) {
              let zx1 = n.i1;
              const z1 = zx1.id;
              let zx1c = zx1.color;
              let zx2 = n.i2;
              const z2 = zx2.id;
              let zx2c = zx2.color;
              let zx3 = n.i3;
              const z3 = zx3.id;
              let zx3c = zx3.color;
              return (
                <tr key={x}>
                  <td className={"oms-spacing-180"}>
                    <a className={"oms-menu-text"} 
                       id={z1} onClick={() => {itemSelect({z1})}} >
                      <div style={{"color":zx1c}}>{zx1.name}&nbsp;&nbsp;&nbsp;&nbsp;{zx1.valueText}</div>
                    </a>
                  </td>
                  <td className={"oms-spacing-180"}>
                    <a className={"oms-menu-text"} 
                       id={z2} onClick={() => {itemSelect({z2})}} >
                      <div style={{"color":zx2c}}>{zx2.name}&nbsp;&nbsp;&nbsp;&nbsp;{zx2.valueText}</div>
                    </a>
                  </td>
                  <td className={"oms-spacing-180"}>
                    <a className={"oms-menu-text"}
                       id={z3} onClick={() => {itemSelect({z3})}} >
                      <div style={{"color":zx3c}}>{zx3.name}&nbsp;&nbsp;&nbsp;&nbsp;{zx3.valueText}</div>
                    </a>
                  </td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
      </div>

      );
  }
}

export default ProcessUnitDisplay;