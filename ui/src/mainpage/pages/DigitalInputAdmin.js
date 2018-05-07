import React, {Component} from 'react';
import {SERVERROOT, IMAGEHEIGHT, IMAGEWIDTH} from '../../Parameters.js';
import DefaultContents from './DefaultContents.js';
import DIForm from './forms/DIForm.js';
import DIList from './lists/DIList.js';
import Waiting from './Waiting.js';
import {Tag} from './objects/Tag.js';
import {DigitalInput} from './objects/DI.js';



class DigitalInputAdmin extends Component {
  constructor(props) {
    super(props);
    console.log( "DigitalInputAdmin: " + props.stage );
    this.state = {
      stage: props.stage,
      updateData: false,
      updateDisplay: true,
      returnedText: null,
      di: null,
      color: "green",
      nextCorner: 1
    };
    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.handleSelect      = this.handleSelect.bind(this);
    this.handleDIUpdate    = this.handleDIUpdate.bind(this);
    this.handleDICopy      = this.handleDICopy.bind(this);
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
    console.log( "DigitalInputAdmin.willRcvProps: " + nextProps.selected + ":"
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
    console.log( "DigitalInputAdmin.shouldUpdate? : (" + nextState.stage + ") " + (sts?"T":"F") );
    return sts;
  }
  
  handleSelect(event) {
    let now = new Date();
    console.log( "DigitalInputAdmin.diSelect " + now.toISOString() );
    const id = event.z;
    const myRequest=SERVERROOT + "/di/" + id;
    now = new Date();
    console.log( "DigitalInputAdmin.diSelect - Request: " + myRequest );
    fetch(myRequest)
      .then(this.handleErrors)
      .then(response => {
        var contentType = response.headers.get("Content-Type");
        if(contentType && contentType.includes("application/json")) {
          return response.json();
        }
        throw new TypeError("DigitalInputAdmin.diSelect: response ("+contentType+") must be a JSON string");
    }).then(json => {
       let did = json;
       var tg = new Tag(did.tag.id,did.tag.name,did.tag.description,did.tag.tagTypeCode
                       ,did.tag.c1Lat,did.tag.c1Long,did.tag.c2Lat,did.tag.c2Long
                       ,did.tag.active);
       var di = new DigitalInput(did.tagId, tg, did.scanInt, did.scanOffset
                       , did.currentScan, did.histTypeCode, did.alarmState, did.alarmCode
                       , did.scanValue, did.scanTime, did.prevValue, did.prevScanTime
                       , did.lastHistValue, did.lastHistTime, did.valueView);
       this.setState({stage: "itemRetrieved",
                      updateDisplay: true,
                      updateData: false,
                      returnedText: json,
                      di: di
                     });
    }).catch(function(error) { 
       alert("Problem retrieving digital input id "+id+"\n"+error);
       console.log("DigitalInputAdmin.diSelect: Error - " + error);  
    });
  }

  handleUpdate(id) {
    console.log("DigitalInputAdmin.diUpdate: (data) tagId="+id
               +", name:"+this.state.di.tag.name);
    let method = "PUT";
    let url = SERVERROOT + "/di/update";
    var diNew = Object.assign({},this.state.di);
    if( id === 0 ) {
      diNew.tagId=0;
      diNew.tag.id=0;
      method = "POST";
      url = SERVERROOT + "/di/insert";
    }
    diNew.histTypes=null;
    diNew.simScanTime=null;
	diNew.simValue=null;
 	diNew.siteLocation=null;
 	diNew.updated=null;
 	diNew.views=null;
    var b = JSON.stringify( diNew );
    fetch(url, {
      method: method,
      headers: {'Content-Type':'application/json'},
      body: b
    }).then(this.handleErrors)
      .catch(function(error) { 
        alert("Problem "+(id===0?"inserting":"updating")+" digital input "
             +" id "+id+"\n"+error);
        console.log("DigitalInputAdmin.diUpdate: Error - " + error);  
    });
  }

  handleDIUpdate(event) {
    event.preventDefault();
    const id = this.state.di.tagId;
    this.handleUpdate(id);
  }
  
  handleDICopy(event) {
    event.preventDefault();
    const id = 0;
    this.handleUpdate(id);
  }
  
  componentDidMount() {
    console.log( "DigitalInputAdmin.didMount: " + this.state.stage );
    this.fetchList();
  }
    
  componentDidUpdate( prevProps, prevState ) {
    console.log( "DigitalInputAdmin.didUpdate: " + this.state.stage );
  }

  handleClick() {
    
  };
  
  handleFieldChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    let np = name.split(".");
    let dinew = Object.assign({},this.state.di);
    if( np.length === 1 ) {
        const field = np[0];
        dinew[field] = value;
    } else {
        const field = np[1];
        dinew.tag[field] = value;
    }
    this.setState({di: dinew } );
  }
  
  handleMouseUp(event) {
      const e = event;
      const t = e.evt;
      var x = t.offsetX;
      var y = t.offsetY;
      var l = this.state.returnedText.siteLocation;
      var lat = l.c1Lat + y * (l.c2Lat-l.c1Lat) / IMAGEHEIGHT;
      var long = l.c1Long + x * (l.c2Long-l.c1Long) / IMAGEWIDTH;
      console.log( "DigitalInputAdmin.mouseUp: siteLocation=(NW["+l.c1Lat+","+l.c1Long+"] SE("+l.c2Lat+","+l.c2Long+")]");
      console.log( "DigitalInputAdmin.mouseUp: "+lat+","+long);
      let dinew = Object.assign({},this.state.di);
      let nextCorner = this.state.nextCorner;
      if( nextCorner === 1 ) {
        dinew.tag.c1Lat = lat;
        dinew.tag.c1Long = long;
        nextCorner = 2;
      } else {
        dinew.tag.c2Lat = lat;
        dinew.tag.c2Long = long;
        nextCorner = 1;        
      }
      this.setState( {di: dinew, nextCorner:nextCorner} );
  }
 
  fetchList() {
    console.log( "DigitalInputAdmin.fetchList : " + this.state.stage );
    const myRequest = SERVERROOT + "/di/all";
    const now = new Date();
    console.log( "DigitalInputAdmin.fetchList " + now.toISOString() + " Request: " + myRequest );
    if( myRequest !== null ) {
      fetch(myRequest)
          .then(this.handleErrors)
          .then(response => {
            var contentType = response.headers.get("content-type");
            if(contentType && contentType.includes("application/json")) {
              return response.json();
            }
            throw new TypeError("DigitalInputAdmin(fetchList): response ("+contentType+") must be a JSON string");
        }).then(json => {
           console.log("DigitalInputAdmin.fetchList: JSON retrieved - " + json);
           this.setState( {returnedText: json, 
                           updateData: false, 
                           updateDisplay:true,
                           stage: "dataFetched" } );
        }).catch(function(e) { 
           alert("Problem retrieving digital input list\n"+e);
           const emsg = "DigitalInputAdmin.fetchList: Fetching di list " + e;
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
                    di: null,
                    stage: "begin" } );
  }

  render() {
    console.log("DigitalInputAdmin (render) - stage: "+this.state.stage);
    switch( this.state.stage ) {
  	  case "begin":
        return <Waiting />
      case "dataFetched":
        return <DIList diData = {this.state.returnedText}
                       diSelect = {this.handleSelect}
                       handleQuit = {this.handleQuit}
               />
      case "itemRetrieved":
        return <DIForm diData = {this.state.returnedText}
                       di     = {this.state.di}
                       diUpdate = {this.handleDIUpdate}
                       diCopy   = {this.handleDICopy}
                       fieldChange = {this.handleFieldChange}
                       handleMouseUp = {this.handleMouseUp}
                       handleClick = {this.handleClick}
                       handleQuit = {this.handleQuit}
               />
      default:
        return <DefaultContents />
    }
  }
}

export default DigitalInputAdmin;
