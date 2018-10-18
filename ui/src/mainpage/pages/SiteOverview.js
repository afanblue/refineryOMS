import React, {Component} from 'react';
import {SERVERROOT}    from '../../Parameters.js';
import Log             from '../requests/Log.js';
import DefaultContents from './DefaultContents.js';
import Field           from './Field.js';
import Waiting         from './Waiting.js';
//import {Field} from './objects/Field.js';
//import {Tag} from './objects/Tag.js';

/*************************************************************************
 * SiteOverview.js
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

class SiteOverview extends Component {
  constructor(props) {
    super(props);
    Log.info( "SiteOverview " );
    this.state = {
      stage: props.stage,
      updateData: false,
      updateDisplay: true,
      returnedText: null,
      tankType: props.tankType
    };
  }
  
  componentDidMount() {
    Log.info( "SiteOverview.didMount: " + this.state.stage );
    this.fetchSite();
  }
  

  handleErrors(response) {
    if (!response.ok) {
        throw Error(response.status+" ("+response.statusText+")");
    }
    return response;
  }
  
  
  
  fetchSite() {
    Log.info( "SiteOverview.fetchList : " + this.state.stage );
    const myRequest = SERVERROOT + "/config/SITE";
    const now = new Date();
    Log.info( "SiteOverview.fetchList " + now.toLocaleString() + " Request: " + myRequest );
    if( myRequest !== null ) {
      fetch(myRequest)
          .then(this.handleErrors)
          .then(response => {
            var contentType = response.headers.get("content-type");
            if(contentType && contentType.includes("application/json")) {
              return response.json();
            }
            throw new TypeError("SiteOverview.fetchList: response ("+contentType+") must be a JSON string");
        }).then(json => {
           Log.info("SiteOverview.fetchList: JSON retrieved - " + json);
           this.setState( {site: json.value, 
                           updateData: false, 
                           updateDisplay:true,
                           stage: "dataFetched" } );
        }).catch(function(e) { 
           alert("Problem retrieving field list\n"+e);
           const emsg = "SiteOverview.fetchList: Fetching field list " + e;
           Log.error(emsg);
      });
    }
  }
  
  render() {
    Log.info("SiteOverview.render " + this.state.stage );
    switch (this.state.stage) {
      case "begin":
        return <Waiting />
      case "dataFetched":
        return <Field stage="begin"
                      field={this.state.site}
                      tankType={this.state.tankType} />
      default:
        return <DefaultContents />
    }
  }
}

export default SiteOverview;