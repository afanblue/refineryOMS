import React, {Component} from 'react';
import {SERVERROOT}    from '../../Parameters.js';
import DefaultContents from './DefaultContents.js';
import Field           from './Field.js';
import Waiting         from './Waiting.js';
//import {Field} from './objects/Field.js';
//import {Tag} from './objects/Tag.js';

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
    console.log( "SiteOverview " );
    this.state = {
      stage: props.stage,
      updateData: false,
      updateDisplay: true,
      returnedText: null,
      tankType: props.tankType
    };
  }
  
  componentDidMount() {
    console.log( "SiteOverview.didMount: " + this.state.stage );
    this.fetchSite();
  }
  

  handleErrors(response) {
    if (!response.ok) {
        throw Error(response.status+" ("+response.statusText+")");
    }
    return response;
  }
  
  
  
  fetchSite() {
    console.log( "SiteOverview.fetchList : " + this.state.stage );
    const myRequest = SERVERROOT + "/config/SITE";
    const now = new Date();
    console.log( "SiteOverview.fetchList " + now.toLocaleString() + " Request: " + myRequest );
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
           console.log("SiteOverview.fetchList: JSON retrieved - " + json);
           this.setState( {site: json.value, 
                           updateData: false, 
                           updateDisplay:true,
                           stage: "dataFetched" } );
        }).catch(function(e) { 
           alert("Problem retrieving field list\n"+e);
           const emsg = "SiteOverview.fetchList: Fetching field list " + e;
           console.log(emsg);
      });
    }
  }
  
  render() {
    console.log("SiteOverview.render " + this.state.stage );
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