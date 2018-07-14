import React, {Component} from 'react';
import {SERVERROOT, IMAGEHEIGHT, IMAGEWIDTH} from '../../Parameters.js';
import DefaultContents from './DefaultContents.js';
import ControlBlockForm from './forms/ControlBlockForm.js';
import ControlBlockList from './lists/ControlBlockList.js';
import Waiting from './Waiting.js';
//import {Tag} from './objects/Tag.js';
import {ControlBlock} from './objects/ControlBlock.js';


/*
{"id":177,"name":"DCTK-A101","api":32.6,"density":0.862,"height":25.0,"diameter":30.0
,"units":"f","c1Lat":39.58405,"c1Long":-75.62484,"c2Lat":null,"c2Long":null
,"contentType":"Asphalt","contentTypeCode":"A","state":"Y","tempTag":null,"levelTag":null},
*/


class ControlBlockAdmin extends Component {
  constructor(props) {
    super(props);
    console.log( "ControlBlockAdmin: " + props.stage );
    this.state = {
      stage: props.stage,
      updateData: false,
      updateDisplay: true,
      returnedText: null,
      cb: null,
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
    console.log( "ControlBlockAdmin.willRcvProps: " + nextProps.selected + ":"
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
    console.log( "ControlBlockAdmin.shouldUpdate? : (" + nextState.stage + ") " + (sts?"T":"F") );
    return sts;
  }

  fetchCBselection( id ) {
    const myRequest=SERVERROOT + "/cb/" + id;
//    var now = new Date();
    console.log( "ControlBlockAdmin.cbSelect - Request: " + myRequest );
    fetch(myRequest)
      .then(this.handleErrors)
      .then(response => {
        var contentType = response.headers.get("Content-Type");
        if(contentType && contentType.includes("application/json")) {
          return response.json();
        }
        throw new TypeError("ControlBlockAdmin.cbSelect: response ("+contentType+") must be a JSON string");
    }).then(json => {
       let cbd = json;
       var cb = new ControlBlock( cbd.id, cbd.tagId, cbd.blockType, cbd.output, cbd.input
                                , cbd.allOutputs, cbd.allDInputs, cbd.allAInputs );
       this.setState({stage: "itemRetrieved",
                      updateDisplay: true,
                      updateData: false,
                      returnedText: json,
                      cb: cb
                     });
    }).catch(function(error) { 
       alert("Problem selecting analog output id "+id+"\n"+error);
       console.log("ControlBlockAdmin.cbSelect: Error - " + error);  
    });
  }

  
  handleSelect(event) {
    let now = new Date();
    console.log( "ControlBlockAdmin.cbSelect " + now.toISOString() );
    const id = event.z;
    this.fetchCBselection(id);
  }
  
  /** 
   * validateForm - x is an AO object
   */
  validateForm( x ) {
    let doSubmit = true;
    let delim = "";
    let msg = "The following field(s) ";
    if( x.tagId === null || (x.tagId === undefined) ) {
        doSubmit = false;
        msg += "input tag ";
        delim = ", ";
    }
    if(x.id === null || x.id===undefined || x.id===0) {
        doSubmit = false;
        msg += delim + "output tag ";
        delim = ", ";
    }
    if( ! doSubmit ) {
      msg += " must be selected!";
      alert(msg);
    }
    return doSubmit;
  }

  handleUpdate(event) {
    event.preventDefault();
    const id = this.state.cb.tagId;
    console.log("ControlBlockAdmin.cbUpdate: (data) id="+id);
    let method = "PUT";
    let url = SERVERROOT + "/cb/update";
    if( id === 0 ) {
      method = "POST";
      url = SERVERROOT + "/cb/insert";
    }
    if( this.validateForm( this.state.cb ) ) {
      var b = JSON.stringify( this.state.cb );
      fetch(url, {
        method: method,
        headers: {'Content-Type':'application/json'},
        body: b
      }).then(this.handleErrors)
        .then(alert("Control block updated") )
        .catch(function(error) { 
          alert("Problem "+(id===0?"inserting":"updating")+" control block "
                +"for id "+id+"\n"+error);
          console.log("ControlBlockAdmin.cbUpdate: Error - " + error);  
      });
    }
  }
  
  componentDidMount() {
    console.log( "ControlBlockAdmin.didMount: " + this.state.stage );
    this.fetchList();
  }
    
  componentDidUpdate( prevProps, prevState ) {
    console.log( "ControlBlockAdmin.didUpdate: " + this.state.stage );
  }

  handleClick() {  };
  
  handleFieldChange(event) {
    const target = event.target;
    const field = target.name;
    let cbnew = Object.assign({},this.state.cb);
    let val = target.value;
    if( field === "id" ) {
      let vp = val.split(".");
      val = vp[0];
      this.fetchCBselection(val);
    } else {
      cbnew[field] = val;
      this.setState({cb: cbnew } );
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
      console.log( "ControlBlockAdmin.mouseUp: siteLocation=(NW["+l.c1Lat+","+l.c1Long+"] SE("+l.c2Lat+","+l.c2Long+")]");
      console.log( "ControlBlockAdmin.mouseUp: "+lat+","+long);
      let cbnew = Object.assign({},this.state.cb);
      let nextCorner = this.state.nextCorner;
      if( nextCorner === 1 ) {
        cbnew.tag.c1Lat = lat;
        cbnew.tag.c1Long = long;
        nextCorner = 2;
      } else {
        cbnew.tag.c2Lat = lat;
        cbnew.tag.c2Long = long;
        nextCorner = 1;        
      }
      this.setState( {cb: cbnew, nextCorner:nextCorner} );
  }
 
  fetchList() {
    console.log( "ControlBlockAdmin.fetchList : " + this.state.stage );
    const myRequest = SERVERROOT + "/cb/all";
    const now = new Date();
    console.log( "ControlBlockAdmin.fetchList " + now.toISOString() + " Request: " + myRequest );
    if( myRequest !== null ) {
      fetch(myRequest)
          .then(this.handleErrors)
          .then(response => {
            var contentType = response.headers.get("content-type");
            if(contentType && contentType.includes("application/json")) {
              return response.json();
            }
            throw new TypeError("ControlBlockAdmin(fetchList): response ("+contentType+") must be a JSON string");
        }).then(json => {
           console.log("ControlBlockAdmin.fetchList: JSON retrieved - " + json);
           this.setState( {returnedText: json, 
                           updateData: false, 
                           updateDisplay:true,
                           stage: "dataFetched" } );
        }).catch(function(e) { 
           alert("Problem retrieving analog output list\n"+e);
           const emsg = "ControlBlockAdmin.fetchList: Fetching cb list " + e;
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
                    cb: null,
                    stage: "begin" } );
  }

  render() {
    console.log("ControlBlockAdmin (render) - stage: "+this.state.stage);
    switch( this.state.stage ) {
  	  case "begin":
        return <Waiting />
      case "dataFetched":
        return <ControlBlockList cbData = {this.state.returnedText}
                       cbSelect = {this.handleSelect}
                       handleQuit = {this.handleQuit}
               />
      case "itemRetrieved":
        return <ControlBlockForm cbData = {this.state.returnedText}
                       cb     = {this.state.cb}
                       cbUpdate = {this.handleUpdate}
                       fieldChange = {this.handleFieldChange}
                       handleQuit = {this.handleQuit}
                       handleMouseUp = {this.handleMouseUp}
               />
      default:
        return <DefaultContents />
    }
  }
}

export default ControlBlockAdmin;
