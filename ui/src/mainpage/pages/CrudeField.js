import React, {Component} from 'react';
import {SERVERROOT} from '../../Parameters.js';
import DefaultContents from './DefaultContents.js';
import Waiting from './Waiting.js';
import {Field} from './objects/Field.js';
import {Tag} from './objects/Tag.js';

/*
 * select f.id, f.satellite_image image, c1_lat, c1_long, c2_lat, c2_long
	 from field f join tag t on f.id = t.id 
	where t.name='DeCity';
	
	select field_tag_id, child_tag_id from field_tag_vw ftv, tank tk 
	 where ftv.child_tag_id=tk.id and ftv.field_tag_id= 1;
 */

class CrudeField extends Component {
  constructor(props) {
    super(props);
    console.log( "CrudeField: " + props.stage );
    this.state = {
      stage: props.stage,
      updateData: false,
      updateDisplay: true,
      returnedText: null
    };
  }
  
  render() {
    console.log("CrudeField.render " + this.state.stage );
    switch (this.state.stage) {
      case "begin":
        return <Waiting />
      default:
        return <DefaultContents />
    }
  }
}

export default CrudeField;