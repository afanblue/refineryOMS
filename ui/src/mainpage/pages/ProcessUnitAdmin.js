import React, {Component} from 'react';
import {SERVERROOT, IMAGEHEIGHT, IMAGEWIDTH} from '../../Parameters.js';
import DefaultContents from './DefaultContents.js';
import ProcessUnitForm from './forms/ProcessUnitForm.js';
import ProcessUnitList from './lists/ProcessUnitList.js';
import Waiting from './Waiting.js';
import {Tag, RelTagTag} from './objects/Tag.js';
import {ProcessUnit} from './objects/ProcessUnit.js';



class ProcessUnitAdmin extends Component {
  constructor(props) {
    super(props);
    console.log( "ProcessUnitAdmin: " + props.stage );
    this.state = {
      stage: props.stage,
      updateData: false,
      updateDisplay: true,
      returnedText: null,
      processUnit: null,
      nextCorner: 1
    }
    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.handleSelect      = this.handleSelect.bind(this);
    this.handleUpdate      = this.handleUpdate.bind(this);
    this.handleMouseUp     = this.handleMouseUp.bind(this);
    this.handleQuit        = this.handleQuit.bind(this);
  }
  
  handleErrors(response) {
    if (!response.ok) {
        throw Error(response.status+" ("+response.statusText+")");
    }
    return response;
  }

  componentWillReceiveProps(nextProps) {
    console.log( "ProcessUnitAdmin.willRcvProps: " + nextProps.selected + ":"
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
    console.log( "ProcessUnitAdmin.shouldUpdate? : (" + nextState.stage + ") " + (sts?"T":"F") );
    return sts;
  }


  handleSelect(event) {
    let now = new Date();
    console.log( "ProcessUnitAdmin.select " + now.toISOString() );
    const id = event.z;
    const myRequest = SERVERROOT + "/processunit/" + id;
    now = new Date();
    console.log( "ProcessUnitAdmin.select - Request:" + myRequest );
    fetch(myRequest)
      .then(this.handleErrors)
      .then(response => {
        var contentType = response.headers.get("Content-Type");
        if(contentType && contentType.includes("application/json")) {
          return response.json();
        }
        throw new TypeError("ProcessUnitAdmin.select: response ("+contentType+") must be a JSON string");
    }).then(json => {
       let pud = json.tag;
       const t = new Tag( pud.id, pud.name, pud.description, pud.tagTypeCode, pud.tagTypeId
                        , pud.c1Lat, pud.c1Long, pud.c2Lat, pud.c2Long, ((pud.active===null)?"Y":pud.active));
       let tags = [];
       if( json.childTags != null ) {
         json.childTags.map( function(n,x){ return tags.push(n.childTagId); } );
       }
       const pu = new ProcessUnit(t,json.childTags,tags);
       this.setState({stage: "itemRetrieved",
                      updateDisplay: true,
                      updateData: false,
                      returnedText: json,
                      processUnit: pu                    
                     });
    }).catch(function(error) { 
       alert("problem selecting process unit id "+id+"\n"+error);
       console.log("ProcessUnitAdmin.select: Error - " + error);  
    });
  }

  handleUpdate(event) {
    event.preventDefault();
    const id = this.state.processUnit.tag.id;
    let method = "PUT";
    let url = SERVERROOT + "/processunit/update";
    let childTags = [];
    if( id === 0 ) {
      method = "POST";
      url = SERVERROOT + "/processunit/insert";
    }
    let ctags = this.state.processUnit.tags;
    ctags.map(function(n,x) {
      let rtt = new RelTagTag(0,n,null,id,null);
      return childTags.push(rtt);
    } );
    let punew = new ProcessUnit(this.state.processUnit.tag,childTags,null);
    const b = JSON.stringify(punew);
    console.log("ProcessUnitAdmin.update "+method);
    fetch(url, {
      method: method,
      headers: {'Content-Type':'application/json'},
      body: b
    }).then(this.handleErrors)
      .catch(function(error) { 
       alert("Problem "+(id===0?"inserting":"updating")+" process unit "
            +"id "+id+"\n"+error);
       console.log("ProcessUnitAdmin.update: Error - " + error);  
    });
  }
  
  componentDidMount() {
    console.log( "ProcessUnitAdmin.didMount: " + this.state.stage );
    this.fetchList();
  }
  
  componentDidUpdate( prevProps, prevState ) {
    console.log( "ProcessUnitAdmin.didUpdate: " + this.state.stage );
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
    let punew = Object.assign({},this.state.processUnit);
    if( target.name === "tags" ) {
        let f = -1;
        let tNew = [];
        let tLength = punew.tags.length;
        for( var i=0; i<tLength; i++) {
            let v = punew.tags.shift();
            if( v === parseInt(value,10) ) { 
                f = i;
            } else {
                tNew.push(v);
            }
        }
        if( f === -1 ) {
            tNew.push(value);
        }
        punew.tags = tNew;
    } else if( np.length === 1 ) {
        const fld = np[0];
        punew[fld] = value;
    } else {
        const fld = np[1];
        punew.tag[fld] = value;
    }
    this.setState({processUnit: punew } );
  }
  
  fetchList() {
    console.log( "ProcessUnitAdmin.fetchList : " + this.state.stage );
    const myRequest = SERVERROOT + "/processunit/all";
    const now = new Date();
    console.log( "ProcessUnitAdmin.fetchList " + now.toISOString() + " Request: " + myRequest );
    if( myRequest !== null ) {
      fetch(myRequest)
          .then(this.handleErrors)
          .then(response => {
            var contentType = response.headers.get("content-type");
            if(contentType && contentType.includes("application/json")) {
              return response.json();
            }
            throw new TypeError("ProcessUnitAdmin(fetchList): response ("+contentType+") must be a JSON string");
        }).then(json => {
           console.log("ProcessUnitAdmin.fetchList: JSON retrieved - " + json);
           this.setState( {returnedText: json, 
                           updateData: false, 
                           updateDisplay:true,
                           stage: "dataFetched" } );
        }).catch(function(e) { 
           alert("Problem retrieving process unit list\n"+e);
           const emsg = "ProcessUnitAdmin.fetchList: Fetching process unit list " + e;
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
      console.log( "ProcessUnitAdmin.mouseUp: siteLocation{(NW["+l.c1Lat+","+l.c1Long+"] SE("+l.c2Lat+","+l.c2Long+")]}");
      console.log( "ProcessUnitAdmin.mouseUp: "+lat+","+long);
      let punew = Object.assign({},this.state.processUnit);
      let nextCorner = this.state.nextCorner;
      if( nextCorner === 1 ) {
        punew.tag.c1Lat = lat;
        punew.tag.c1Long = long;
        nextCorner = 2;
      } else {
        punew.tag.c2Lat = lat;
        punew.tag.c2Long = long;
        nextCorner = 1;        
      }
      this.setState( {tank: punew, nextCorner:nextCorner} );
  }
  
  handleQuit(event) {
    event.preventDefault();
    this.fetchList();
    this.setState( {returnedText: null, 
                    updateData: true, 
                    updateDisplay:true,
                    stage: "begin" } );
  }

  render() {
    console.log("ProcessUnitAdmin.render - stage: "+this.state.stage);
    switch( this.state.stage ) {
  	  case "begin":
        return <Waiting />
      case "dataFetched":
        return <ProcessUnitList 
                          returnedText = {this.state.returnedText}
                          puSelect = {this.handleSelect} />
      case "itemRetrieved":
        return <ProcessUnitForm
                          returnedText = {this.state.returnedText}
                          processUnit  = {this.state.processUnit}
                          puUpdate = {this.handleUpdate}
                          fieldChange = {this.handleFieldChange}
                          handleQuit = {this.handleQuit}
                          handleMouseUp = {this.handleMouseUp}
               />
      default:
        return <DefaultContents />
    }
  }
}


export default ProcessUnitAdmin