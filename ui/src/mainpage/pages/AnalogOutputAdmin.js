import React, {Component} from 'react';
import {SERVERROOT, IMAGEHEIGHT, IMAGEWIDTH} from '../../Parameters.js';
import DefaultContents from './DefaultContents.js';
import AOForm from './forms/AOForm.js';
import AOList from './lists/AOList.js';
import Waiting from './Waiting.js';
import {Tag} from './objects/Tag.js';
import {AnalogOutput} from './objects/AO.js';


/*
{"id":177,"name":"DCTK-A101","api":32.6,"density":0.862,"height":25.0,"diameter":30.0
,"units":"f","c1Lat":39.58405,"c1Long":-75.62484,"c2Lat":null,"c2Long":null
,"contentType":"Asphalt","contentTypeCode":"A","state":"Y","tempTag":null,"levelTag":null},
*/


class AnalogOutputAdmin extends Component {
  constructor(props) {
    super(props);
    console.log( "AnalogOutputAdmin: " + props.stage );
    this.state = {
      stage: props.stage,
      updateData: false,
      updateDisplay: true,
      returnedText: null,
      ao: null,
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
    console.log( "AnalogOutputAdmin.willRcvProps: " + nextProps.selected + ":"
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
    console.log( "AnalogOutputAdmin.shouldUpdate? : (" + nextState.stage + ") " + (sts?"T":"F") );
    return sts;
  }
  
  handleSelect(event) {
    let now = new Date();
    console.log( "AnalogOutputAdmin.aoSelect " + now.toISOString() );
    const id = event.z;
    const myRequest=SERVERROOT + "/ao/" + id;
    now = new Date();
    console.log( "AnalogOutputAdmin.aoSelect - Request: " + myRequest );
    fetch(myRequest)
      .then(this.handleErrors)
      .then(response => {
        var contentType = response.headers.get("Content-Type");
        if(contentType && contentType.includes("application/json")) {
          return response.json();
        }
        throw new TypeError("AnalogOutputAdmin.aoSelect: response ("+contentType+") must be a JSON string");
    }).then(json => {
       let aod = json;
       var tg = new Tag( aod.tag.id,aod.tag.name,aod.tag.description,aod.tag.tagTypeCode
                       , aod.tag.tagTypeId, aod.tag.c1Lat,aod.tag.c1Long,aod.tag.c2Lat,aod.tag.c2Long
                       , aod.tag.active);
       var ao = new AnalogOutput( aod.tagId, tg, aod.zeroValue, aod.maxValue
                       , aod.histTypeCode, aod.percent, aod.slope, aod.scanValue, aod.scanTime
                       , aod.prevValue, aod.prevTime, aod.lastHistValue, aod.lastHistTime, aod.unitId);
       ao.histTypes = aod.histTypes;
       ao.unitList = aod.unitList;
       this.setState({stage: "itemRetrieved",
                      updateDisplay: true,
                      updateData: false,
                      returnedText: json,
                      ao: ao
                     });
    }).catch(function(error) { 
       alert("Problem selecting analog output id "+id+"\n"+error);
       console.log("AnalogOutputAdmin.aoSelect: Error - " + error);  
    });
  }
  
  /** 
   * validateForm - x is an AO object
   */
  validateForm( x ) {
    let doSubmit = true;
    let delim = "";
    let msg = "The following field(s) ";
    if( x.unitId === null || (x.unitId === undefined) ) {
        doSubmit = false;
        msg += "units ";
        delim = ", ";
    }
    if(x.histTypeCode === null) {
        doSubmit = false;
        msg += delim + "history type";
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
    const id = this.state.ao.tagId;
    console.log("AnalogOutputAdmin.aoUpdate: (data) tagId="+id
               +", name:"+this.state.ao.tag.name);
    let method = "PUT";
    let url = SERVERROOT + "/ao/update";
    if( id === 0 ) {
      method = "POST";
      url = SERVERROOT + "/ao/insert";
    }
    if( this.validateForm( this.state.ao ) ) {
      var b = JSON.stringify( this.state.ao );
      fetch(url, {
        method: method,
        headers: {'Content-Type':'application/json'},
        body: b
      }).then(this.handleErrors)
        .catch(function(error) { 
          alert("Problem "+(id===0?"inserting":"updating")+" analog output "
                +"id "+id+"\n"+error);
          console.log("AnalogOutputAdmin.aoUpdate: Error - " + error);  
      });
    }
  }
  
  componentDidMount() {
    console.log( "AnalogOutputAdmin.didMount: " + this.state.stage );
    this.fetchList();
  }
    
  componentDidUpdate( prevProps, prevState ) {
    console.log( "AnalogOutputAdmin.didUpdate: " + this.state.stage );
  }

  handleClick() {
    
  };
  
  handleFieldChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    let np = name.split(".");
    let aonew = Object.assign({},this.state.ao);
    if( np.length === 1 ) {
        const field = np[0];
        switch ( field ) {
            case "unitId":
            case "maxValue":
            case "zeroValue":
                aonew[field] = parseInt(value,10);
                break;
            default:
                aonew[field] = value;
        }
    } else {
        const field = np[1];
        aonew.tag[field] = value;
    }
    this.setState({ao: aonew } );
  }
  
  handleMouseUp(event) {
      const e = event;
      const t = e.evt;
      var x = t.offsetX;
      var y = t.offsetY;
      var l = this.state.returnedText.siteLocation;
      var lat = l.c1Lat + y * (l.c2Lat-l.c1Lat) / IMAGEHEIGHT;
      var long = l.c1Long + x * (l.c2Long-l.c1Long) / IMAGEWIDTH;
      console.log( "AnalogOutputAdmin.mouseUp: siteLocation=(NW["+l.c1Lat+","+l.c1Long+"] SE("+l.c2Lat+","+l.c2Long+")]");
      console.log( "AnalogOutputAdmin.mouseUp: "+lat+","+long);
      let aonew = Object.assign({},this.state.ao);
      let nextCorner = this.state.nextCorner;
      if( nextCorner === 1 ) {
        aonew.tag.c1Lat = lat;
        aonew.tag.c1Long = long;
        nextCorner = 2;
      } else {
        aonew.tag.c2Lat = lat;
        aonew.tag.c2Long = long;
        nextCorner = 1;        
      }
      this.setState( {ao: aonew, nextCorner:nextCorner} );
  }
 
  fetchList() {
    console.log( "AnalogOutputAdmin.fetchList : " + this.state.stage );
    const myRequest = SERVERROOT + "/ao/all";
    const now = new Date();
    console.log( "AnalogOutputAdmin.fetchList " + now.toISOString() + " Request: " + myRequest );
    if( myRequest !== null ) {
      fetch(myRequest)
          .then(this.handleErrors)
          .then(response => {
            var contentType = response.headers.get("content-type");
            if(contentType && contentType.includes("application/json")) {
              return response.json();
            }
            throw new TypeError("AnalogOutputAdmin(fetchList): response ("+contentType+") must be a JSON string");
        }).then(json => {
           console.log("AnalogOutputAdmin.fetchList: JSON retrieved - " + json);
           this.setState( {returnedText: json, 
                           updateData: false, 
                           updateDisplay:true,
                           stage: "dataFetched" } );
        }).catch(function(e) { 
           alert("Problem retrieving analog output list\n"+e);
           const emsg = "AnalogOutputAdmin.fetchList: Fetching ao list " + e;
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
                    ao: null,
                    stage: "begin" } );
  }

  render() {
    console.log("AnalogOutputAdmin (render) - stage: "+this.state.stage);
    switch( this.state.stage ) {
  	  case "begin":
        return <Waiting />
      case "dataFetched":
        return <AOList aoData = {this.state.returnedText}
                       aoSelect = {this.handleSelect}
                       handleQuit = {this.handleQuit}
               />
      case "itemRetrieved":
        return <AOForm aoData = {this.state.returnedText}
                       ao     = {this.state.ao}
                       aoUpdate = {this.handleUpdate}
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

export default AnalogOutputAdmin;
