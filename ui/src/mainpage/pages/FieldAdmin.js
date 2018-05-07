import React, {Component} from 'react';
import {SERVERROOT, IMAGEHEIGHT, IMAGEWIDTH} from '../../Parameters.js';
import DefaultContents from './DefaultContents.js';
import FieldForm from './forms/FieldForm.js';
import FieldList from './lists/FieldList.js';
import Waiting from './Waiting.js';
import {Field} from './objects/Field.js';
import {Tag, RelTagTag} from './objects/Tag.js';

/* 
all_fields: 
create view all_fields( id,name,parent_id,parent ) as
select f.id, t.name, f.id pid, t.name pname
  from field f, tag t
 where f.id = t.id
   and t.active = 'Y'
   and t.tag_type_code = 'FLD'
   and t.id not in (select child_tag_id from rel_tag_tag)
union
select t.id, t.name, tp.id pid, tp.name pname
  from rel_tag_tag rtt join tag t on rtt.child_tag_id = t.id
       join tag tp on rtt.parent_tag_id = tp.id 
 where t.tag_type_code = 'FLD'
   and tp.tag_type_code = 'FLD'
   
select af.id, af.name, af.parent_id, af.parent
  from all_fields af
	 order by af.name
*/


class FieldAdmin extends Component {
  constructor(props) {
    super(props);
    console.log( "FieldAdmin: " + props.stage );
    this.state = {
      stage: props.stage,
      updateData: false,
      updateDisplay: true,
      returnedText: null,
      field: null,
      nextCorner: 1
    }
    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.handleFieldSelect = this.handleFieldSelect.bind(this);
    this.handleFieldUpdate = this.handleFieldUpdate.bind(this);
    this.handleMouseUp     = this.handleMouseUp.bind(this);
    this.handleFieldQuit   = this.handleFieldQuit.bind(this);
  }
  
  handleErrors(response) {
    if (!response.ok) {
        throw Error(response.status+" ("+response.statusText+")");
    }
    return response;
  }

  componentWillReceiveProps(nextProps) {
    console.log( "FieldAdmin.willRcvProps: " + nextProps.selected + ":"
               + ((nextProps.option===null)?"null":nextProps.option)
               + "/" + nextProps.stage );
    if( nextProps.stage !== this.state.stage )
    {
      this.setState({ stage: nextProps.stage,
                      updateData: true,
                      updateDisplay: false,
                      returnedText: null });
    }
  }
  
  shouldComponentUpdate(nextProps,nextState) {
    let sts = nextState.updateDisplay;
    console.log( "FieldAdmin.shouldUpdate? : (" + nextState.stage + ") " + (sts?"T":"F") );
    return sts;
  }

  fetchFormData(id) {
    const myRequest = SERVERROOT + "/field/" + id;
    console.log( "FieldAdmin.fetchFormData - Request: " + myRequest );
    fetch(myRequest)
      .then(this.handleErrors)
      .then(response => {
        var contentType = response.headers.get("Content-Type");
        if(contentType && contentType.includes("application/json")) {
          return response.json();
        }
        throw new TypeError("FieldAdmin.fetchFormData: response ("+contentType+") must be a JSON string");
    }).then(json => {
       let fd = json;
       const t = new Tag(fd.id,fd.tag.name,fd.tag.description,fd.tag.tagTypeCode
                        ,fd.tag.c1Lat,fd.tag.c1Long,fd.tag.c2Lat,fd.tag.c2Long,fd.tag.active);
       const f = new Field(fd.id,t,fd.parentId,fd.parent,fd.roadImage,fd.satelliteImage);
       var cTanks = [];
       fd.childTanks.map(function(n,x) {
         let id = n.childTagId;
         return cTanks.push(id);
       } );
       f.childTanks = cTanks;
       this.setState({stage: "itemRetrieved",
                      updateDisplay: true,
                      updateData: false,
                      returnedText: json,
                      field: f                    
                     });
    }).catch(function(error) { 
       alert("Problem selecting field id "+id+"\n"+error);
       console.log("FieldAdmin.fetchFormData: Error - " + error);  
    });
  }

  handleFieldSelect(event) {
    let now = new Date();
    console.log( "FieldAdmin.fieldSelect " + now.toISOString() );
    const id = event.z;
    this.fetchFormData(id);
  }

  handleFieldUpdate(event) {
    event.preventDefault();
    const id = this.state.field.id;
    let method = "PUT";
    let url = SERVERROOT + "/field/update";
    if( id === 0 ) {
      method = "POST";
      url = SERVERROOT + "/field/insert";
    }
    var f = this.state.field;
    f.tag.tagTypeCode = 'FLD';
    f.parents = null;
    f.tanks = null;
    var childTanks = [];
    let ctanks = f.childTanks;
    ctanks.map(function(n,x) {
      let rtt = new RelTagTag(0,n,null,id,null);
      return childTanks.push(rtt);
    } );
    f.childTanks = childTanks;
    const b = JSON.stringify(f);
    console.log("FieldAdmin.fieldUpdate "+method)
    fetch(url, {
      method: method,
      headers: {'Content-Type':'application/json'},
      body: b
    }).then(this.handleErrors)
      .then(response => {
        this.fetchFormData(id);
    }).catch(function(error) { 
        alert("Problem "+(id===0?"inserting":"updating")+" Field "
             +"id "+id+"\n"+error);
        console.log("FieldAdmin.fieldUpdate: Error - " + error);  
    });
  }
  
  componentDidMount() {
    console.log( "FieldAdmin.didMount: " + this.state.stage );
    this.fetchList();
  }
  
  componentDidUpdate( prevProps, prevState ) {
    console.log( "FieldAdmin.didUpdate: " + this.state.stage );
    switch (this.state.stage) {
      case "begin":
        break;
      default:
    }
  }
  
  handleFieldChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    let np = name.split(".");
    let fnew = Object.assign({},this.state.field);
    if( target.name === "childTanks" ) {
        let f = -1;
        let tNew = [];
        let tLength = (fnew.childTanks===null?0:fnew.childTanks.length);
        for( var i=0; i<tLength; i++) {
            let v = fnew.childTanks.shift();
            if( v === parseInt(value,10) ) { 
                f = i;
            } else {
                tNew.push(v);
            }
        }
        if( f === -1 ) {
            tNew.push(value);
        }
        fnew.childTanks = tNew;
    } else if( np.length === 1 ) {
        const field = np[0];
        fnew[field] = value;
    } else {
        const field = np[1];
        fnew.tag[field] = value;
    }
    this.setState({field: fnew } );
  }
  
  fetchList() {
    console.log( "FieldAdmin.fetchList : " + this.state.stage );
    const myRequest = SERVERROOT + "/field/all";
    const now = new Date();
    console.log( "FieldAdmin.fetchList " + now.toISOString() + " Request: " + myRequest );
    if( myRequest !== null ) {
      fetch(myRequest)
          .then(this.handleErrors)
          .then(response => {
            var contentType = response.headers.get("content-type");
            if(contentType && contentType.includes("application/json")) {
              return response.json();
            }
            throw new TypeError("FieldAdmin(fetchList): response ("+contentType+") must be a JSON string");
        }).then(json => {
           console.log("FieldAdmin.fetchList: JSON retrieved - " + json);
           this.setState( {returnedText: json, 
                           updateData: false, 
                           updateDisplay:true,
                           stage: "dataFetched" } );
        }).catch(function(e) { 
           alert("Problem retrieving field list\n"+e);
           const emsg = "FieldAdmin.fetchList: Fetching field list " + e;
           console.log(emsg);
      });
    }
  }

  handleMouseUp(event) {
      const e = event;
      const t = e.evt;
      var x = t.offsetX;
      var y = t.offsetY;
      var l = this.state.returnedText.siteLocation;
      var lat = l.c1Lat + y * (l.c2Lat-l.c1Lat) / IMAGEHEIGHT;
      var long = l.c1Long + x * (l.c2Long-l.c1Long) / IMAGEWIDTH;
      console.log( "FieldAdmin.mouseUp: siteLocation{(NW["+l.c1Lat+","+l.c1Long+"] SE("+l.c2Lat+","+l.c2Long+")]}");
      console.log( "FieldAdmin.mouseUp: "+lat+","+long);
      let fnew = Object.assign({},this.state.field);
      let nextCorner = this.state.nextCorner;
      if( nextCorner === 1 ) {
        fnew.tag.c1Lat = lat;
        fnew.tag.c1Long = long;
        nextCorner = 2;
      } else {
        fnew.tag.c2Lat = lat;
        fnew.tag.c2Long = long;
        nextCorner = 1;        
      }
      this.setState( {tank: fnew, nextCorner:nextCorner} );
  }
  
  handleFieldQuit(event) {
    event.preventDefault();
    this.fetchList();
    this.setState( {returnedText: null, 
                    updateData: true, 
                    updateDisplay:true,
                    stage: "begin" } );
  }

  render() {
    console.log("FieldAdmin.render - stage: "+this.state.stage);
    switch( this.state.stage ) {
  	  case "begin":
        return <Waiting />
      case "dataFetched":
        return <FieldList returnedText = {this.state.returnedText}
                          fieldSelect = {this.handleFieldSelect} />
      case "itemRetrieved":
        return <FieldForm returnedText = {this.state.returnedText}
                          field = {this.state.field}
                          fieldUpdate = {this.handleFieldUpdate}
                          fieldChange = {this.handleFieldChange}
                          handleQuit = {this.handleFieldQuit}
                          handleMouseUp = {this.handleMouseUp}
               />
      default:
        return <DefaultContents />
    }
  }
}


export default FieldAdmin