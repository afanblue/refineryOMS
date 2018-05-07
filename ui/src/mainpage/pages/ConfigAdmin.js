import React, {Component} from 'react';
import {SERVERROOT} from '../../Parameters.js';
import ConfigList from './lists/ConfigList.js';
import DefaultContents from './DefaultContents.js';
import Waiting from './Waiting.js';

function ConfigItem(i,k,v) { this.id=i; this.key=k; this.value=v; };


class ConfigAdmin extends Component {
  constructor(props) {
    super(props);
    console.log( "ConfigAdmin: " + props.selected + ":" + props.option + "/" + props.stage );
    this.state = {
      stage: props.stage,
      updateData: false,
      updateDisplay: true,
      returnedText: null,
      configItems: null
    };
    this.handleFieldChange = this.handleFieldChange.bind(this);
//    this.handleConfigSelect = this.handleConfigSelect.bind(this);
    this.handleConfigUpdate = this.handleConfigUpdate.bind(this);
    this.handleQuit = this.handleQuit.bind(this);
  }

  handleErrors(response) {
    if (!response.ok) {
        throw Error(response.status+" ("+response.statusText+")");
    }
    return response;
  }

  componentWillReceiveProps(nextProps) {
    console.log( "ConfigAdmin.willRcvProps: " + nextProps.stage );
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
    console.log( "ConfigAdmin.shouldUpdate? : (" + nextState.stage + ") " + (sts?"T":"F") );
    return sts;
  }
  
  componentDidMount() {
    console.log( "ConfigAdmin.didMount: " + this.state.stage );
    this.fetchList();
  }
  
  componentDidUpdate( prevProps, prevState ) {
    console.log( "ConfigAdmin.didUpdate: " + this.state.stage );
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
    console.log("ConfigAdmin.fieldChange: "+name+" = "+value);
    let np = name.split(".");
    let cfg = this.state.configItems.slice(0);
    let ndx = np[1];
    if( np[0] === "key" ) {
        cfg[ndx].key = value;
    } else {
        cfg[ndx].value = value;
    }
    this.setState({configItems: cfg } );
  }
  
  fetchList() {
    console.log( "ConfigAdmin.fetchList : " + this.state.stage );
    const myRequest = SERVERROOT + "/config/all";
    const now = new Date();
    console.log( "ConfigAdmin.fetchList " + now.toISOString() + " Request: " + myRequest );
    if( myRequest !== null ) {
      fetch(myRequest)
          .then(this.handleErrors)
          .then(response => {
            var contentType = response.headers.get("content-type");
            if(contentType && contentType.includes("application/json")) {
              return response.json();
            }
            throw new TypeError("ConfigAdmin(fetchList): response ("+contentType+") must be a JSON string");
        }).then(json => {
           console.log("ConfigAdmin.fetchList: JSON retrieved - " + json);
           var itemList = [];
           var c = new ConfigItem(0,"Add new item","");
           itemList.push(c);
           json.map( function(n,x) { var ci = new ConfigItem(n.id,n.key,n.value); 
                                     return itemList.push( ci ); } );
           this.setState( {returnedText: json, 
                           updateData: false, 
                           updateDisplay:true,
                           stage: "dataFetched",
                           configItems: itemList } );
        }).catch(function(e) { 
           alert("Problem retrieving system configuration list\n"+e);
           const emsg = "ConfigAdmin.fetchList: Fetching system configuration list " + e;
           console.log(emsg);
      });
    }
  }

  handleConfigUpdate(event) {
    event.preventDefault();
    let method = "PUT";
    let url = SERVERROOT + "/config/update";
    let cfg = [];
    if(  (this.state.configItems[0].key==="Add new item") 
      || (this.state.configItems[0].value==="" )) {
        cfg = this.state.configItems.splice(1);        
    } else {
        cfg = this.state.configItems.splice(0);
    }
    const b = JSON.stringify(cfg);
    console.log("ConfigAdmin.configUpdate "+method)
    fetch(url, {
      method: method,
      headers: {'Content-Type':'application/json'},
      body: b
    }).then(this.handleErrors)
      .catch(function(error) { 
        alert("Problem updatig system configuration list\n"+error);
        console.log("ConfigAdmin.configUpdate: Error - " + error);  
    });
  }

  handleQuit(event) {
    event.preventDefault();
    this.fetchList();
    this.setState( {returnedText: null, 
                    updateData: true, 
                    updateDisplay:true,
                    configItems: null,
                    stage: "begin" } );
  }


  render() {
    console.log("ConfigAdmin.render - stage: "+this.state.stage);
    switch( this.state.stage ) {
      case "begin":
        return <Waiting />
      case "dataFetched":
        return <ConfigList configData={this.state.returnedText}
                           configItems={this.state.configItems}
                           fieldChange={this.handleFieldChange}
                           configUpdate = {this.handleConfigUpdate}
                           handleQuit ={this.handleQuit}
               />
      default:
        return <DefaultContents />
    }
  }
}

export default ConfigAdmin;
