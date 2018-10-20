/*************************************************************************
 * ProcessUnitList.js
 * Copyright (C) 2018  A. E. Van Ness
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 ***********************************************************************/

import React, {Component} from 'react';
import {SERVERROOT}  from '../../Parameters.js';
import {CE, IL3}     from './objects/ListObjects.js';
import Log           from '../requests/Log.js';
import SiteOverview  from './SiteOverview.js';
import Waiting       from './Waiting.js';


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
    const clsMthd = "ProcessUnitList.fetchList";
    const myRequest = SERVERROOT + "/processunit/all";
    if( myRequest !== null ) {
      const request = async () => {
        const response = await fetch(myRequest);
        const json = await response.json();
        this.setState( {returnedText: json, 
                        updateData: false, 
                        updateDisplay:true,
                        stage: "dataFetched" } );
      }
      try {
        request();
      } catch( e ) {
        const emsg = "ProcessUnitList.fetchList: Fetching process unit list " + e;
        alert(emsg+"\n"+e);
        Log.error(emsg+" - "+e, clsMthd);        
      }
    }
  }

  componentDidMount() {
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
//      Log.info("forEach loop: x="+x);
      if( !((x+1) % 3) ) {
//        Log.info("forEachLoop inner: x="+x);
        let CE0 = new CE(data[x-2].id,data[x-2].name);
        let CE1 = new CE(data[x-1].id,data[x-1].name);
        let CE2 = new CE(data[x].id,data[x].name);
        let il = new IL3(CE0,CE1,CE2);
        puColumns.push(il);
      }
    });
    const dl = data.length;
    const rem = dl%3;
    if( rem > 1 ) {
      let x = dl-rem;
      let CE2 = new CE(0,"");
      let CE0 = new CE(data[x].id,data[x].name);
      let CE1 = new CE(0,"");
      if( rem > 0 ) {
        CE1 = new CE(data[x+1].id,data[x+1].name);
      }
      let il = new IL3(CE0,CE1,CE2);
      puColumns.push(il);
    }
    
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