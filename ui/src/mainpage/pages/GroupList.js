/*************************************************************************
 * GroupList.js
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
//import {ProcessUnit} from './objects/ProcessUnit.js';
//import {Tag}         from './objects/Tag.js';
import {CE, IL3}     from './objects/ListObjects.js';
import Log           from '../requests/Log.js';
import SiteOverview  from './SiteOverview.js';
import Waiting       from './Waiting.js';

  

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
    Log.info( this.state.stage, "GroupList.fetchList" );
    const myRequest = SERVERROOT + "/plotGroup/all";
    const now = new Date();
    Log.info( now.toISOString() + " Request: " + myRequest,"GroupList.fetchList" );
    if( myRequest !== null ) {
      const request = async () => {
        const response = await fetch(myRequest);
        const json = await response.json();
        Log.info( "I/O complete ", "GroupList.fetchList" );
        this.setState( {returnedText: json, 
                        updateData: false, 
                        updateDisplay:true,
                        stage: "dataFetched" } );
      }
      try {
        request();
      } catch( error ) {
        alert("Problem retrieving process unit list\n"+error);
        const emsg = "Fetching process unit list " + error;
        Log.error(emsg, "GroupList.fetchList");
      }
    }
  }

  componentDidMount() {
    Log.info( "GroupList.didMount: " + this.state.stage );
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
    
    Log.info("GroupList.generateList");
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