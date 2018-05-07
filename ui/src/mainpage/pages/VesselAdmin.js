import React, {Component} from 'react';
import {SERVERROOT} from '../../Parameters.js';
import DefaultContents from './DefaultContents.js';
import VesselForm from './forms/VesselForm.js';
import VesselList from './lists/VesselList.js';
import Waiting from './Waiting.js';
import {Vessel} from './objects/Vessel.js';
import {Tag} from './objects/Tag.js';



class VesselAdmin extends Component {
  constructor(props) {
    super(props);
    console.log( "VesselAdmin: " + props.stage );
    this.state = {
      stage: props.stage,
      updateData: false,
      updateDisplay: true,
      returnedText: null,
      vessel: null,
      custList: null
    }
    this.handleVesselChange = this.handleVesselChange.bind(this);
    this.handleVesselSelect = this.handleVesselSelect.bind(this);
    this.handleVesselUpdate = this.handleVesselUpdate.bind(this);
    this.handleVesselQuit   = this.handleVesselQuit.bind(this);
  }
  
  handleErrors(response) {
    if (!response.ok) {
        throw Error(response.status+" ("+response.statusText+")");
    }
    return response;
  }

  componentWillReceiveProps(nextProps) {
    console.log( "VesselAdmin.willRcvProps: " + nextProps.selected + ":"
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
    console.log( "VesselAdmin.shouldUpdate? : (" + nextState.stage + ") " + (sts?"T":"F") );
    return sts;
  }

  fetchFormData(id) {
    const myRequest = SERVERROOT + "/vessel/" + id;
    console.log( "VesselAdmin.fetchFormData - Request: " + myRequest );
    fetch(myRequest)
      .then(this.handleErrors)
      .then(response => {
        var contentType = response.headers.get("Content-Type");
        if(contentType && contentType.includes("application/json")) {
          return response.json();
        }
        throw new TypeError("VesselAdmin.fetchFormData: response ("+contentType+") must be a JSON string");
    }).then(json => {
       let vd = json;
       const t = new Tag(vd.id,vd.tag.name,vd.tag.description,vd.tag.tagTypeCode
                        ,vd.tag.c1Lat,vd.tag.c1Long,vd.tag.c2Lat,vd.tag.c2Long,vd.tag.active);
       const v = new Vessel(vd.id,t,vd.vesselName,vd.quantity,vd.customerId,vd.customer);
       const custList = vd.customers;
       this.setState({stage: "itemRetrieved",
                      updateDisplay: true,
                      updateData: false,
                      returnedText: vd,
                      vessel: v,
                      custList: custList
                     });
    }).catch(function(error) { 
       alert("Problem selecting vessel id "+id+"\n"+error);
       console.log("VesselAdmin.fetchFormData: Error - " + error);  
    });
  }

  handleVesselSelect(event) {
    let now = new Date();
    console.log( "VesselAdmin.vesselSelect " + now.toISOString() );
    const id = event.z;
    this.fetchFormData(id);
  }

  handleVesselUpdate(event) {
    event.preventDefault();
    const id = this.state.vessel.id;
    let method = "PUT";
    let url = SERVERROOT + "/vessel/update";
    if( id === 0 ) {
      method = "POST";
      url = SERVERROOT + "/vessel/insert";
    }
    var v = this.state.vessel;
    v.tag.name = v.tag.tagTypeCode+id;
    const b = JSON.stringify(v);
    console.log("VesselAdmin.vesselUpdate "+method)
    fetch(url, {
      method: method,
      headers: {'Content-Type':'application/json'},
      body: b
    }).then(this.handleErrors)
      .then(response => {
        this.fetchFormData(id);
    }).catch(function(error) { 
        alert("Problem "+(id===0?"inserting":"updating")+" vessel "
             +"id "+id+"\n"+error);
        console.log("VesselAdmin.vesselUpdate: Error - " + error);  
    });
  }
  
  componentDidMount() {
    console.log( "VesselAdmin.didMount: " + this.state.stage );
    this.fetchList();
  }
  
  componentDidUpdate( prevProps, prevState ) {
    console.log( "VesselAdmin.didUpdate: " + this.state.stage );
    switch (this.state.stage) {
      case "begin":
        break;
      default:
    }
  }
  
  handleVesselChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    let np = name.split(".");
    let fnew = Object.assign({},this.state.vessel);
    if( np.length === 1 ) {
        const vessel = np[0];
        fnew[vessel] = value;
    } else {
        const vessel = np[1];
        fnew.tag[vessel] = value;
    }
    this.setState({vessel: fnew } );
  }
  
  fetchList() {
    console.log( "VesselAdmin.fetchList : " + this.state.stage );
    const myRequest = SERVERROOT + "/vessel/all";
    const now = new Date();
    console.log( "VesselAdmin.fetchList " + now.toISOString() + " Request: " + myRequest );
    if( myRequest !== null ) {
      fetch(myRequest)
          .then(this.handleErrors)
          .then(response => {
            var contentType = response.headers.get("content-type");
            if(contentType && contentType.includes("application/json")) {
              return response.json();
            }
            throw new TypeError("VesselAdmin(fetchList): response ("+contentType+") must be a JSON string");
        }).then(json => {
           console.log("VesselAdmin.fetchList: JSON retrieved - " + json);
           this.setState( {returnedText: json, 
                           updateData: false, 
                           updateDisplay:true,
                           stage: "dataFetched" } );
        }).catch(function(e) { 
           alert("Problem retrieving vessel list\n"+e);
           const emsg = "VesselAdmin.fetchList: Fetching vessel list " + e;
           console.log(emsg);
      });
    }
  }
  
  handleVesselQuit(event) {
    event.preventDefault();
    this.fetchList();
    this.setState( {returnedText: null, 
                    updateData: true, 
                    updateDisplay:true,
                    stage: "begin" } );
  }

  render() {
    console.log("VesselAdmin.render - stage: "+this.state.stage);
    switch( this.state.stage ) {
  	  case "begin":
        return <Waiting />
      case "dataFetched":
        return <VesselList returnedText = {this.state.returnedText}
                           vesselSelect = {this.handleVesselSelect} />
      case "itemRetrieved":
        return <VesselForm returnedText = {this.state.returnedText}
                          vessel        = {this.state.vessel}
                          custList      = {this.state.custList}
                          vesselUpdate  = {this.handleVesselUpdate}
                          vesselChange  = {this.handleVesselChange}
                          handleQuit    = {this.handleVesselQuit}
                          handleMouseUp = {this.handleMouseUp}
               />
      default:
        return <DefaultContents />
    }
  }
}


export default VesselAdmin