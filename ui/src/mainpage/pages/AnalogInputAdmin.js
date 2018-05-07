import React, {Component} from 'react';
import {SERVERROOT, IMAGEHEIGHT, IMAGEWIDTH} from '../../Parameters.js';
import DefaultContents from './DefaultContents.js';
import AIForm from './forms/AIForm.js';
import AIList from './lists/AIList.js';
import Waiting from './Waiting.js';
import {Tag} from './objects/Tag.js';
import {AnalogInput} from './objects/AI.js';


/*
{"id":177,"name":"DCTK-A101","api":32.6,"density":0.862,"height":25.0,"diameter":30.0
,"units":"f","c1Lat":39.58405,"c1Long":-75.62484,"c2Lat":null,"c2Long":null
,"contentType":"Asphalt","contentTypeCode":"A","state":"Y","tempTag":null,"levelTag":null},
*/


class AnalogInputAdmin extends Component {
  constructor(props) {
    super(props);
    console.log( "AnalogInputAdmin: " + props.stage );
    this.state = {
      stage: props.stage,
      updateData: false,
      updateDisplay: true,
      returnedText: null,
      ai: null,
      color: "green",
      nextCorner: 1
    };
    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.handleSelect      = this.handleSelect.bind(this);
    this.handleUpdate      = this.handleUpdate.bind(this);
    this.handleMouseUp     = this.handleMouseUp.bind(this);
    this.handleQuit        = this.handleQuit.bind(this);
    this.handleClick       = this.handleClick.bind(this);
  }
  
  handleErrors(response) {
    if (!response.ok) {
        throw Error(response.status+" ("+response.statusText+")");
    }
    return response;
  }

  componentWillReceiveProps(nextProps) {
    console.log( "AnalogInputAdmin.willRcvProps: " + nextProps.selected + ":"
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
    console.log( "AnalogInputAdmin.shouldUpdate? : (" + nextState.stage + ") " + (sts?"T":"F") );
    return sts;
  }
  
  handleSelect(event) {
    let now = new Date();
    console.log( "AnalogInputAdmin.aiSelect " + now.toISOString() );
    const id = event.z;
    const myRequest=SERVERROOT + "/ai/" + id;
    now = new Date();
    console.log( "AnalogInputAdmin.aiSelect - Request: " + myRequest );
    fetch(myRequest)
      .then(this.handleErrors)
      .then(response => {
        var contentType = response.headers.get("Content-Type");
        if(contentType && contentType.includes("application/json")) {
          return response.json();
        }
        throw new TypeError("AnalogInputAdmin.aiSelect: response ("+contentType+") must be a JSON string");
    }).then(json => {
       let aid = json;
       var tg = new Tag(aid.tag.id,aid.tag.name,aid.tag.description,aid.tag.tagTypeCode
                       ,aid.tag.c1Lat,aid.tag.c1Long,aid.tag.c2Lat,aid.tag.c2Long
                       ,aid.tag.active);
       var ai = new AnalogInput(aid.tagId,tg,aid.typeCode, aid.scanInt, aid.scanOffset
                       ,aid.currentScan, aid.zeroValue, aid.maxValue, aid.histTypeCode
                       ,aid.percent, aid.slope, aid.rawValue, aid.scanValue, aid.scanTime
                       ,aid.prevValue, aid.prevTime, aid.lastHistValue, aid.lastHistTime
                       ,aid.hh, aid.hi, aid.lo, aid.ll);
       this.setState({stage: "itemRetrieved",
                      updateDisplay: true,
                      updateData: false,
                      returnedText: json,
                      ai: ai
                     });
    }).catch(function(error) { 
       alert("Problem selecting analog input id "+id+"\n"+error);
       console.log("AnalogInputAdmin.aiSelect: Error - " + error);  
    });
  }

  handleUpdate(event) {
    event.preventDefault();
    const id = this.state.ai.tagId;
    console.log("AnalogInputAdmin.aiUpdate: (data) tagId="+id
               +", name:"+this.state.ai.tag.name);
    let method = "PUT";
    let url = SERVERROOT + "/ai/update";
    if( id === 0 ) {
      method = "POST";
      url = SERVERROOT + "/ai/insert";
    }
    var b = JSON.stringify( this.state.ai );
    fetch(url, {
      method: method,
      headers: {'Content-Type':'application/json'},
      body: b
    }).then(this.handleErrors)
      .catch(function(error) { 
        alert("Problem "+(id===0?"inserting":"updating")+" analog input "
              +"id "+id+"\n"+error);
        console.log("AnalogInputAdmin.aiUpdate: Error - " + error);  
    });
;
  }
  
  componentDidMount() {
    console.log( "AnalogInputAdmin.didMount: " + this.state.stage );
    this.fetchList();
  }
    
  componentDidUpdate( prevProps, prevState ) {
    console.log( "AnalogInputAdmin.didUpdate: " + this.state.stage );
  }

  handleClick() {
    
  };
  
  handleFieldChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    let np = name.split(".");
    let ainew = Object.assign({},this.state.ai);
    if( np.length === 1 ) {
        const field = np[0];
        ainew[field] = value;
    } else {
        const field = np[1];
        ainew.tag[field] = value;
    }
    this.setState({ai: ainew } );
  }
  
  handleMouseUp(event) {
      const e = event;
      const t = e.evt;
      var x = t.offsetX;
      var y = t.offsetY;
      var l = this.state.returnedText.siteLocation;
      var lat = l.c1Lat + y * (l.c2Lat-l.c1Lat) / IMAGEHEIGHT;
      var long = l.c1Long + x * (l.c2Long-l.c1Long) / IMAGEWIDTH;
      console.log( "AnalogInputAdmin.mouseUp: siteLocation=(NW["+l.c1Lat+","+l.c1Long+"] SE("+l.c2Lat+","+l.c2Long+")]");
      console.log( "AnalogInputAdmin.mouseUp: "+lat+","+long);
      let ainew = Object.assign({},this.state.ai);
      let nextCorner = this.state.nextCorner;
      if( nextCorner === 1 ) {
        ainew.tag.c1Lat = lat;
        ainew.tag.c1Long = long;
        nextCorner = 2;
      } else {
        ainew.tag.c2Lat = lat;
        ainew.tag.c2Long = long;
        nextCorner = 1;        
      }
      this.setState( {ai: ainew, nextCorner:nextCorner} );
  }
 
  fetchList() {
    console.log( "AnalogInputAdmin.fetchList : " + this.state.stage );
    const myRequest = SERVERROOT + "/ai/all";
    const now = new Date();
    console.log( "AnalogInputAdmin.fetchList " + now.toISOString() + " Request: " + myRequest );
    if( myRequest !== null ) {
      fetch(myRequest)
          .then(this.handleErrors)
          .then(response => {
            var contentType = response.headers.get("content-type");
            if(contentType && contentType.includes("application/json")) {
              return response.json();
            }
            throw new TypeError("AnalogInputAdmin(fetchList): response ("+contentType+") must be a JSON string");
        }).then(json => {
           console.log("AnalogInputAdmin.fetchList: JSON retrieved - " + json);
           this.setState( {returnedText: json, 
                           updateData: false, 
                           updateDisplay:true,
                           stage: "dataFetched" } );
        }).catch(function(e) { 
           alert("Problem retrieving analog input list\n"+e);
           const emsg = "AnalogInputAdmin.fetchList: Fetching ai list " + e;
           console.log(emsg);
      });
    }
  }

  handleQuit(event) {
    event.preventDefault();
    this.fetchList();
    this.setState( {returnedText: null, 
                    updateData: true, 
                    updateDisplay:true,
                    ai: null,
                    stage: "begin" } );
  }

  render() {
    console.log("AnalogInputAdmin (render) - stage: "+this.state.stage);
    switch( this.state.stage ) {
  	  case "begin":
        return <Waiting />
      case "dataFetched":
        return <AIList aiData = {this.state.returnedText}
                       aiSelect = {this.handleSelect}
                       handleQuit = {this.handleQuit}
               />
      case "itemRetrieved":
        return <AIForm aiData = {this.state.returnedText}
                       ai     = {this.state.ai}
                       aiUpdate = {this.handleUpdate}
                       fieldChange = {this.handleFieldChange}
                       handleQuit = {this.handleQuit}
                       handleMouseUp = {this.handleMouseUp}
                       handleClick = {this.handleClick}
               />
      default:
        return <DefaultContents />
    }
  }
}

export default AnalogInputAdmin;
