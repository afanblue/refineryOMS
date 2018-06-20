import React, {Component} from 'react';
import {SERVERROOT} from '../../Parameters.js';
import DefaultContents from './DefaultContents.js';
import SchematicForm from './forms/SchematicForm.js';
import SchematicList from './lists/SchematicList.js';
import Waiting from './Waiting.js';
import {Schematic} from './objects/Schematic.js';


/*
{"id":177,"name":"DCTK-A101","api":32.6,"density":0.862,"height":25.0,"diameter":30.0
,"units":"f","c1Lat":39.58405,"c1Long":-75.62484,"c2Lat":null,"c2Long":null
,"contentType":"Asphalt","contentTypeCode":"A","state":"Y","tempTag":null,"levelTag":null},
*/


class SchematicAdmin extends Component {
  constructor(props) {
    super(props);
    console.log( "SchematicAdmin: " + props.stage );
    this.state = {
      stage: props.stage,
      updateData: false,
      updateDisplay: true,
      returnedText: null,
      schematic: null,
      color: "green",
      type: props.type,
      nextCorner: 1
    };
    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.handleSchematicCopy    = this.handleSchematicCopy.bind(this);
    this.handleSchematicSelect  = this.handleSchematicSelect.bind(this);
    this.handleSchematicUpdate  = this.handleSchematicUpdate.bind(this);
    this.handleQuit        = this.handleQuit.bind(this);
    this.handleClick       = this.handleClick.bind(this);
  }
  
  handleErrors(response) {
    if (!response.ok) {
        throw Error(response.status+" ("+response.statusText+")");
    }
    return response;
  }

/*
  getDerivedStateFromProps(nextProps,prevState) {
    console.log( "SchematicAdmin.getDerivedState" + nextProps.stage );
    if(  (nextProps.stage !== prevState.stage) 
      || (nextProps.type != prevState.type ) )
    {
      this.setState({ stage: nextProps.stage,
                      type: nextProps.type,
                      updateData: true,
                      updateDisplay: false,
                      returnedText: null });
    }
  }
*/
/* */  
  componentWillReceiveProps(nextProps) {
    console.log( "SchematicAdmin.willRcvProps = " + nextProps.stage + "/" + nextProps.type );
    if(  (nextProps.stage !== this.state.stage) 
      || (nextProps.type  !== this.state.type ) )
    {
//      this.fetchList();
      this.setState({ stage: nextProps.stage,
                      type: nextProps.type,
                      updateData: true,
                      updateDisplay: false,
                      returnedText: null });
    }
  }
/* */

  shouldComponentUpdate(nextProps,nextState) {
    let sts = nextState.updateDisplay;
    if( nextState.stage !== nextProps.stage ) { sts = true; }
    if( nextState.type  !== nextProps.type  ) { sts = true;         }
    console.log( "SchematicAdmin.shouldUpdate (state? " + nextState.stage + "/" + nextProps.stage
               + ", display: " + (sts?"T":"F") 
               + ", data: " + (nextState.updateData?"T":"F") );
    console.log( "SchematicAdmin.shouldUpdate (props)? : display: " 
               + (nextProps.updateDisplay?"T":"F") 
               + ", data: " + (nextProps.updateData?"T":"F") );
    console.log("SchematicAdmin.shouldUpdate: type (props:" + nextProps.type+", state:"+nextState.type+")");
//    if( nextProps.type !== nextState.type ) {
//      this.fetchList();
//    }
    return sts;
  }
  
  handleSchematicSelect(event) {
    let now = new Date();
    console.log( "SchematicAdmin.SchematicSelect " + now.toISOString() );
    const id = event.z;
    const myRequest=SERVERROOT + "/schematic/" + id;
    now = new Date();
    console.log( "SchematicAdmin.schematicSelect - Request: " + myRequest );
    fetch(myRequest)
      .then(this.handleErrors)
      .then(response => {
        var contentType = response.headers.get("Content-Type");
        if(contentType && contentType.includes("application/json")) {
          return response.json();
        }
        throw new TypeError("SchematicAdmin.schematicSelect: response ("+contentType+") must be a JSON string");
    }).then(json => {
       let ud = json;
       var x = new Schematic(ud.id,ud.name,ud.statusId,ud.source
                           ,ud.schematicTypeId,ud.schematicType
                           ,ud.sourceId,ud.source,ud.destinationId, ud.destination
                           ,ud.expStartTime,ud.expEndTime,ud.expVolume
                           ,ud.actStartTime,ud.actEndTime,ud.actVolume,ud.delta);
       this.setState({stage: "itemRetrieved",
                      updateDisplay: true,
                      updateData: false,
                      returnedText: json,
                      schematic: x
                     });
    }).catch(function(error) { 
       alert("Problem selecting schematic id "+id+"\n"+error);
       console.log("SchematicAdmin.schematicSelect: Error - " + error);  
    });
  }

  validateForm( x ) {
    let doSubmit = true;
    let msg = "The following fields ";
    if( x.statusId === 0 ) {
        doSubmit = false;
        msg += "schematic status, ";
    }
    if(x.schematicTypeId === 0) {
        doSubmit = false;
        msg = "schematic type, ";
    }
    if(x.sourceId === 0) {
        doSubmit = false;
        msg = "schematic source, ";
    }
    if(x.destinationId === 0) {
        doSubmit = false;
        msg = "schematic destination ";
    }
    if( ! doSubmit ) {
      msg += " must be selected!";
      alert(msg);
    }
    return doSubmit;
  }

  updateSchematic(id) {
    console.log("SchematicAdmin.updateSchematic: (data) id="+id
               +", name:"+this.state.schematic.name);
    let newt = Object.assign({},this.state.schematic);
    let method = "PUT";
    let url = SERVERROOT + "/schematic/update";
    if( id === 0 ) {
      newt.id = 0;
      method = "POST";
      url = SERVERROOT + "/schematic/insert";
    }
    var b = JSON.stringify( newt );
    fetch(url, {
      method: method,
      headers: {'Content-Type':'application/json'},
      body: b
    }).then(this.handleErrors)
      .catch(function(error) { 
        alert("Problem "+(id===0?"inserting":"updating")+" schematic "
             +"id "+id+"\n"+error);
        console.log("SchematicAdmin.updateSchematic: Error - " + error);  
    });
  }

  handleSchematicUpdate(event) {
    event.preventDefault();
    let x = this.state.schematic;
    let doSubmit = this.validateForm(x);
    if( doSubmit ) {
      const id = this.state.schematic.id;
      this.updateSchematic(id);
    }
  }
  
  handleSchematicCopy(event) {
    event.preventDefault();
    let x = this.state.schematic;
    let doSubmit = this.validateForm(x);
    if( doSubmit ) {
      const id = 0;
      this.updateSchematic(id);
    }
  }
  
  componentDidMount() {
    console.log( "SchematicAdmin.didMount: " + this.state.stage );
    this.fetchList();
  }
    
  componentDidUpdate( prevProps, prevState ) {
    console.log( "SchematicAdmin.didUpdate: " + this.state.stage );
  }

  handleClick() {
    
  };
  
  handleFieldChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    let np = name.split(".");
    let tknew = Object.assign({},this.state.schematic);
    if( np.length === 1 ) {
        const field = np[0];
        tknew[field] = value;
    } else {
        const field = np[1];
        tknew.tag[field] = value;
    }
    this.setState({schematic: tknew } );
  }
  
 
  fetchList() {
    console.log( "SchematicAdmin.fetchList : " + this.state.stage );
    const myRequest = SERVERROOT + "/schematic/all/"+this.state.type;
    const now = new Date();
    console.log( "SchematicAdmin.fetchList " + now.toISOString() + " Request: " + myRequest );
    if( myRequest !== null ) {
      fetch(myRequest)
          .then(this.handleErrors)
          .then(response => {
            var contentType = response.headers.get("content-type");
            if(contentType && contentType.includes("application/json")) {
              return response.json();
            }
            throw new TypeError("SchematicAdmin(fetchList): response ("+contentType+") must be a JSON string");
        }).then(json => {
           console.log("SchematicAdmin.fetchList: JSON retrieved - " + json);
           this.setState( {returnedText: json, 
                           updateData: false, 
                           updateDisplay:true,
                           stage: "dataFetched" } );
        }).catch(function(e) { 
           alert("Problem retrieving schematic list\n"+e);
           const emsg = "SchematicAdmin.fetchList: Fetching schematic list " + e;
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
                    schematic: null,
                    stage: "begin" } );
  }

  render() {
    console.log("SchematicAdmin (render) - stage: "+this.state.stage);
    switch( this.state.stage ) {
  	  case "begin":
        return <Waiting />
      case "dataFetched":
        return <SchematicList schematicData   = {this.state.returnedText}
                              schematicSelect = {this.handleSchematicSelect}
                              handleQuit      = {this.handleQuit}
               />
      case "itemRetrieved":
        return <SchematicForm schematicData = {this.state.returnedText}
                              schematic     = {this.state.schematic}
                              schematicCopy = {this.handleSchematicCopy}
                              schematicUpdate = {this.handleSchematicUpdate}
                              fieldChange   = {this.handleFieldChange}
                              handleQuit    = {this.handleQuit}
                              handleClick   = {this.handleClick}
               />
      default:
        return <DefaultContents />
    }
  }
}

export default SchematicAdmin;
