import React, {Component} from 'react';
import {SERVERROOT}  from '../../Parameters.js';
//import {ProcessUnit} from './objects/ProcessUnit.js';
//import {Tag}         from './objects/Tag.js';
import SiteOverview  from './SiteOverview.js';
import Waiting       from './Waiting.js';

function CE(i,n) {this.id=i; this.name=n; }
function IL3(i1,i2,i3) {this.i1=i1; this.i2=i2; this.i3=i3;}
  

class ProcessUnitList extends Component {
  constructor( props ) {
    super(props);
    this.state = {
      stage: props.stage,
      updateData: false,
      updateDisplay: true,
      returnedText: null,
      menuSelect: props.menuSelect
    };
  }
  
  handleErrors(response) {
    if (!response.ok) {
        throw Error(response.status+" ("+response.statusText+")");
    }
    return response;
  }

  fetchList() {
    console.log( "ProcessUnitList.fetchList : " + this.state.stage );
    const myRequest = SERVERROOT + "/processunit/all";
    const now = new Date();
    console.log( "ProcessUnitList.fetchList " + now.toISOString() + " Request: " + myRequest );
    if( myRequest !== null ) {
      fetch(myRequest)
          .then(this.handleErrors)
          .then(response => {
            var contentType = response.headers.get("content-type");
            if(contentType && contentType.includes("application/json")) {
              return response.json();
            }
            throw new TypeError("ProcessUnitList(fetchList): response ("+contentType+") must be a JSON string");
        }).then(json => {
           console.log("ProcessUnitList.fetchList: JSON retrieved - " + json);
           this.setState( {returnedText: json, 
                           updateData: false, 
                           updateDisplay:true,
                           stage: "dataFetched" } );
        }).catch(function(e) { 
           alert("Problem retrieving process unit list\n"+e);
           const emsg = "ProcessUnitList.fetchList: Fetching process unit list " + e;
           console.log(emsg);
      });
    }
  }

  componentDidMount() {
    console.log( "ProcessUnitList.didMount: " + this.state.stage );
    this.fetchList();
  }
  
  generateList() {
    let menuSelect = this.state.menuSelect;
    let data = this.state.returnedText;
    let puColumns = [];
    if( data[0].tag.id === 0) {
      data.shift(1);
    }
    data.forEach((i,x) => {
//      console.log("forEach loop: x="+x);
      if( !((x+1) % 3) ) {
//        console.log("forEachLoop inner: x="+x);
        let CE0 = new CE(data[x-2].tag.id,data[x-2].tag.name);
        let CE1 = new CE(data[x-1].tag.id,data[x-1].tag.name);
        let CE2 = new CE(data[x].tag.id,data[x].tag.name);
        let il = new IL3(CE0,CE1,CE2);
        puColumns.push(il);
      }
    });
    const dl = data.length;
    const rem = dl%3;
    if( rem > 1 ) {
      let x = dl-rem;
      let CE2 = new CE(0,"");
      let CE0 = new CE(data[x].tag.id,data[x].tag.name);
      let CE1 = new CE(0,"");
      if( rem > 0 ) {
        CE1 = new CE(data[x+1].tag.id,data[x+1].tag.name);
      }
      let il = new IL3(CE0,CE1,CE2);
      puColumns.push(il);
    }
    
    console.log("ProcessUnitList.generateList");
    return(
      <div>
      <h2>
        <div className={"oms-tags"}>
           <img src="./images/spacer.png" alt="space" height="1px" width="100px"/>Process Units
        </div>
      </h2>
      <table className={"scrollTable"}>
        <thead className={"fixedHeader"}>
          <tr>
	        <td className={"oms-spacing-180"}>Unit Name</td>
	        <td className={"oms-spacing-180"}>Unit Name</td>
            <td className={"oms-spacing-180"}>Unit Name</td>
          </tr>
        </thead>
        <tbody className={"scrollContent"}>
          {puColumns.map( 
            function(n,x) {
              const z1 = n.i1.name;
              const z2 = n.i2.name;
              const z3 = n.i3.name;
              return (
                <tr key={x}>
                  <td className={"oms-spacing-180"}>
                    <a className={"oms-menu-text"} id={z1} onClick={() => {menuSelect({z1})}} >{z1}</a>
                  </td>
                  <td className={"oms-spacing-180"}>
                    <a className={"oms-menu-text"} id={z2} onClick={() => {menuSelect({z2})}} >{z2}</a>
                  </td>
                  <td className={"oms-spacing-180"}>
                    <a className={"oms-menu-text"} id={z3} onClick={() => {menuSelect({z3})}} >{z3}</a>
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

  render () {
    switch ( this.state.stage ) {
      case "begin":
        return <Waiting />
      case "dataFetched":
        return this.generateList();
      default:
        return <SiteOverview />
    }
  }
}

export default ProcessUnitList;