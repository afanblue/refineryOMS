import React, {Component} from 'react';
import {SERVERROOT} from '../../Parameters.js';
import DefaultContents from './DefaultContents.js';
import Waiting from './Waiting.js';
import FieldDisplay from './displays/FieldDisplay.js';

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
    console.log( "Field.constructor" );
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
    console.log( "Field.willRcvProps: " + nextProps.stage + ":"
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
    console.log( "Field.fetchList : " + this.state.stage );
    const myRequest = SERVERROOT + "/field/objects/"+fn;
    const now = new Date();
    console.log( "Field.fetchList " + now.toLocaleString() + " Request: " + myRequest );
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
           console.log("Field.fetchList: JSON retrieved - " + json);
           this.setState( {field: json.field,
                           tags: json.tags,
                           siteLoc: json.siteLocation, 
                           updateData: false, 
                           updateDisplay:true,
                           stage: "dataFetched" } );
        }).catch(function(e) { 
           alert("Problem retrieving field list\n"+e);
           const emsg = "Field.fetchList: Fetching field list " + e;
           console.log(emsg);
      });
    }
  }

  componentDidMount() {
    console.log( "Field.didMount: " + this.state.stage );
    this.fetchSite(this.state.fieldName);
    var myTimerID = setInterval(() => {this.fetchSite(this.state.fieldName)}, 60000 );
    this.setState( {unitTimer: myTimerID } );    
  }
  
  componentWillUnmount() {
    console.log( "Field.willUnmount "+this.state.unitTimer);
    if( this.state.unitTimer !== null ) {
      clearInterval(this.state.unitTimer);
    }
    if( this.state.itemTimer !== null ) {
      clearInterval(this.state.itemTimer);
    }
  }

  render() {
    console.log("Field.render " + this.state.stage + " - " + this.state.field );
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