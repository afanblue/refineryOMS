import React, {Component} from 'react';
import {SERVERROOT}  from '../../Parameters.js';
//import {ProcessUnit} from './objects/ProcessUnit.js';
//import {Tag}         from './objects/Tag.js';
import SiteOverview  from './SiteOverview.js';
import Waiting       from './Waiting.js';

function CE(i,n) {this.id=i; this.name=n; }
function IL3(i1,i2,i3) {this.i1=i1; this.i2=i2; this.i3=i3;}
  

class GroupList extends Component {
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
    console.log( "GroupList.fetchList : " + this.state.stage );
    const myRequest = SERVERROOT + "/plotGroup/all";
    const now = new Date();
    console.log( "GroupList.fetchList " + now.toISOString() + " Request: " + myRequest );
    if( myRequest !== null ) {
      fetch(myRequest)
          .then(this.handleErrors)
          .then(response => {
            var contentType = response.headers.get("content-type");
            if(contentType && contentType.includes("application/json")) {
              return response.json();
            }
            throw new TypeError("GroupList(fetchList): response ("+contentType+") must be a JSON string");
        }).then(json => {
           console.log("GroupList.fetchList: JSON retrieved - " + json);
           this.setState( {returnedText: json, 
                           updateData: false, 
                           updateDisplay:true,
                           stage: "dataFetched" } );
        }).catch(function(e) { 
           alert("Problem retrieving process unit list\n"+e);
           const emsg = "GroupList.fetchList: Fetching process unit list " + e;
           console.log(emsg);
      });
    }
  }

  componentDidMount() {
    console.log( "GroupList.didMount: " + this.state.stage );
    this.fetchList();
  }
  
  generateList() {
    let menuSelect = this.state.menuSelect;
    let data = this.state.returnedText;
    let puColumns = [];
    if( data[0].id === 0) {
      data.shift(1);
    }
    data.forEach((i,x) => {
      if( !((x+1) % 3) ) {
        let CE0 = new CE(data[x-2].id,data[x-2].name);
        let CE1 = new CE(data[x-1].id,data[x-1].name);
        let CE2 = new CE(data[x].id,data[x].name);
        let il = new IL3(CE0,CE1,CE2);
        puColumns.push(il);
      }
    });
    const dl = data.length;
    const rem = dl%3;
    let x = dl-rem;
    if( rem > 0 ) {
      let CE0 = new CE(data[x].id,data[x].name);
      let CE1 = new CE(0,"");
      if( rem > 1 ) {
        CE1 = new CE(data[x+1].id,data[x+1].name);
      }
      let CE2 = new CE(0,"");
      let il = new IL3(CE0,CE1,CE2);
      puColumns.push(il);
    }
    
    console.log("GroupList.generateList");
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
	        <td className={"oms-spacing-180"}>Group Name</td>
	        <td className={"oms-spacing-180"}>Group Name</td>
            <td className={"oms-spacing-180"}>Group Name</td>
          </tr>
        </thead>
        <tbody className={"scrollContent"}>
          {puColumns.map( 
            function(n,x) {
              const z1 = n.i1.id;
              const z2 = n.i2.id;
              const z3 = n.i3.id;
              return (
                <tr key={x}>
                  <td className={"oms-spacing-180"}>
                    <a className={"oms-menu-text"} id={z1} onClick={() => {menuSelect({z1})}} >{n.i1.name}</a>
                  </td>
                  <td className={"oms-spacing-180"}>
                    <a className={"oms-menu-text"} id={z2} onClick={() => {menuSelect({z2})}} >{n.i2.name}</a>
                  </td>
                  <td className={"oms-spacing-180"}>
                    <a className={"oms-menu-text"} id={z3} onClick={() => {menuSelect({z3})}} >{n.i3.name}</a>
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

export default GroupList;