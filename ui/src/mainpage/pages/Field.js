import React, {Component} from 'react';
import {SERVERROOT}    from '../../Parameters.js';
import DefaultContents from './DefaultContents.js';
import Log             from '../requests/Log.js';
import Waiting         from './Waiting.js';
import FieldDisplay    from './displays/FieldDisplay.js';

/*************************************************************************
 * Field.js
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


/*
 * select f.id, f.satellite_image image, c1_lat, c1_long, c2_lat, c2_long
	 from field f join tag t on f.id = t.id 
	where t.name='DeCity';
	
	select field_tag_id, child_tag_id from field_tag_vw ftv, tank tk 
	 where ftv.child_tag_id=tk.id and ftv.field_tag_id= 1;
 */

class Field extends Component {
  constructor(props) {
    super(props);
    Log.info( "Field.constructor" );
    this.state = {
      stage: props.stage,
      updateData: false,
      updateDisplay: true,
      fieldName: props.field,
      tankType: props.tankType,
      field: null,
      tags: null,
      siteLoc: null,
      returnedText: null,
      unitTimer: null,
      itemTimer: null
    };
  }
  
  handleErrors(response) {
    if (!response.ok) {
        throw Error(response.status+" ("+response.statusText+")");
    }
    return response;
  }
  
  componentWillReceiveProps(nextProps) {
    Log.info( "Field.willRcvProps: " + nextProps.stage + ":"
               + ((nextProps.field===null)?"null":nextProps.field)
               + "/" + nextProps.tankType );
    this.fetchSite(nextProps.field);
    this.setState({ stage: nextProps.stage,
                    fieldName: nextProps.field,
                    tankType: nextProps.tankType,
                    updateData: true,
                    updateDisplay: false,
                    returnedText: null });
  }
  
  fetchSite(fn) {
    Log.info( "Field.fetchList : " + this.state.stage );
    const myRequest = SERVERROOT + "/field/objects/"+fn;
    const now = new Date();
    Log.info( "Field.fetchList " + now.toLocaleString() + " Request: " + myRequest );
    if( myRequest !== null ) {
      fetch(myRequest)
          .then(this.handleErrors)
          .then(response => {
            var contentType = response.headers.get("content-type");
            if(contentType && contentType.includes("application/json")) {
              return response.json();
            }
            throw new TypeError("Field.fetchList: response ("+contentType+") must be a JSON string");
        }).then(json => {
           Log.info("Field.fetchList: JSON retrieved - " + json);
           this.setState( {field: json.field,
                           tags: json.tags,
                           siteLoc: json.siteLocation, 
                           updateData: false, 
                           updateDisplay:true,
                           stage: "dataFetched" } );
        }).catch(function(e) { 
           alert("Problem retrieving field list\n"+e);
           const emsg = "Field.fetchList: Fetching field list " + e;
           Log.error(emsg);
      });
    }
  }

  componentDidMount() {
    Log.info( "Field.didMount: " + this.state.stage );
    this.fetchSite(this.state.fieldName);
    var myTimerID = setInterval(() => {this.fetchSite(this.state.fieldName)}, 60000 );
    this.setState( {unitTimer: myTimerID } );    
  }
  
  componentWillUnmount() {
    Log.info( "Field.willUnmount "+this.state.unitTimer);
    if( this.state.unitTimer !== null ) {
      clearInterval(this.state.unitTimer);
    }
    if( this.state.itemTimer !== null ) {
      clearInterval(this.state.itemTimer);
    }
  }

  render() {
    Log.info("Field.render " + this.state.stage + " - " + this.state.field );
    switch (this.state.stage) {
      case "begin":
        return <Waiting />
      case "dataFetched":
        return <FieldDisplay field={this.state.field}
                             tags ={this.state.tags}
                             siteLoc={this.state.siteLoc}
                             tankType={this.state.tankType} />
      default:
        return <DefaultContents />
    }
  }
}

export default Field;