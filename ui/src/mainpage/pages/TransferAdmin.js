import React, {Component} from 'react';
import {SERVERROOT} from '../../Parameters.js';
import DefaultContents from './DefaultContents.js';
import TransferForm from './forms/TransferForm.js';
import TransferList from './lists/TransferList.js';
import Waiting from './Waiting.js';
import {Transfer} from './objects/Transfer.js';


/*
{"id":177,"name":"DCTK-A101","api":32.6,"density":0.862,"height":25.0,"diameter":30.0
,"units":"f","c1Lat":39.58405,"c1Long":-75.62484,"c2Lat":null,"c2Long":null
,"contentType":"Asphalt","contentTypeCode":"A","state":"Y","tempTag":null,"levelTag":null},
*/


class TransferAdmin extends Component {
  constructor(props) {
    super(props);
    console.log( "TransferAdmin: " + props.stage );
    this.state = {
      stage: props.stage,
      updateData: false,
      updateDisplay: true,
      returnedText: null,
      transfer: null,
      color: "green",
      type: props.type,
      nextCorner: 1
    };
    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.handleTransferCopy    = this.handleTransferCopy.bind(this);
    this.handleTransferSelect  = this.handleTransferSelect.bind(this);
    this.handleTransferUpdate  = this.handleTransferUpdate.bind(this);
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
    console.log( "TransferAdmin.getDerivedState" + nextProps.stage );
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
    console.log( "TransferAdmin.willRcvProps = " + nextProps.stage + "/" + nextProps.type );
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
    console.log( "TransferAdmin.shouldUpdate (state? " + nextState.stage + "/" + nextProps.stage
               + ", display: " + (sts?"T":"F") 
               + ", data: " + (nextState.updateData?"T":"F") );
    console.log( "TransferAdmin.shouldUpdate (props)? : display: " 
               + (nextProps.updateDisplay?"T":"F") 
               + ", data: " + (nextProps.updateData?"T":"F") );
    console.log("TransferAdmin.shouldUpdate: type (props:" + nextProps.type+", state:"+nextState.type+")");
//    if( nextProps.type !== nextState.type ) {
//      this.fetchList();
//    }
    return sts;
  }
  
  handleTransferSelect(event) {
    let now = new Date();
    console.log( "TransferAdmin.transferSelect " + now.toISOString() );
    const id = event.z;
    const myRequest=SERVERROOT + "/transfer/" + id;
    now = new Date();
    console.log( "TransferAdmin.transferSelect - Request: " + myRequest );
    fetch(myRequest)
      .then(this.handleErrors)
      .then(response => {
        var contentType = response.headers.get("Content-Type");
        if(contentType && contentType.includes("application/json")) {
          return response.json();
        }
        throw new TypeError("TransferAdmin.transferSelect: response ("+contentType+") must be a JSON string");
    }).then(json => {
       let ud = json;
       var x = new Transfer(ud.id,ud.name,ud.statusId,ud.source
                           ,ud.transferTypeId,ud.transferType
                           ,ud.sourceId,ud.source,ud.destinationId, ud.destination
                           ,ud.expStartTime,ud.expEndTime,ud.expVolume
                           ,ud.actStartTime,ud.actEndTime,ud.actVolume,ud.delta);
       this.setState({stage: "itemRetrieved",
                      updateDisplay: true,
                      updateData: false,
                      returnedText: json,
                      transfer: x
                     });
    }).catch(function(error) { 
       alert("Problem selecting transfer id "+id+"\n"+error);
       console.log("TransferAdmin.transferSelect: Error - " + error);  
    });
  }

  validateForm( x ) {
    let doSubmit = true;
    let msg = "The following fields ";
    if( x.statusId === 0 ) {
        doSubmit = false;
        msg += "transfer status, ";
    }
    if(x.transferTypeId === 0) {
        doSubmit = false;
        msg = "transfer type, ";
    }
    if(x.sourceId === 0) {
        doSubmit = false;
        msg = "transfer source, ";
    }
    if(x.destinationId === 0) {
        doSubmit = false;
        msg = "transfer destination ";
    }
    if( ! doSubmit ) {
      msg += " must be selected!";
      alert(msg);
    }
    return doSubmit;
  }

  updateTransfer(id) {
    console.log("TransferAdmin.updateTransfer: (data) id="+id
               +", name:"+this.state.transfer.name);
    let newt = Object.assign({},this.state.transfer);
    let method = "PUT";
    let url = SERVERROOT + "/transfer/update";
    if( id === 0 ) {
      newt.id = 0;
      method = "POST";
      url = SERVERROOT + "/transfer/insert";
    }
    var b = JSON.stringify( newt );
    fetch(url, {
      method: method,
      headers: {'Content-Type':'application/json'},
      body: b
    }).then(this.handleErrors)
      .catch(function(error) { 
        alert("Problem "+(id===0?"inserting":"updating")+" transfer "
             +"id "+id+"\n"+error);
        console.log("TransferAdmin.updateTransfer: Error - " + error);  
    });
  }

  handleTransferUpdate(event) {
    event.preventDefault();
    let x = this.state.transfer;
    let doSubmit = this.validateForm(x);
    if( doSubmit ) {
      const id = this.state.transfer.id;
      this.updateTransfer(id);
    }
  }
  
  handleTransferCopy(event) {
    event.preventDefault();
    let x = this.state.transfer;
    let doSubmit = this.validateForm(x);
    if( doSubmit ) {
      const id = 0;
      this.updateTransfer(id);
    }
  }
  
  componentDidMount() {
    console.log( "TransferAdmin.didMount: " + this.state.stage );
    this.fetchList();
  }
    
  componentDidUpdate( prevProps, prevState ) {
    console.log( "TransferAdmin.didUpdate: " + this.state.stage );
  }

  handleClick() {
    
  };
  
  handleFieldChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    let np = name.split(".");
    let tknew = Object.assign({},this.state.transfer);
    if( np.length === 1 ) {
        const field = np[0];
        tknew[field] = value;
    } else {
        const field = np[1];
        tknew.tag[field] = value;
    }
    this.setState({transfer: tknew } );
  }
  
 
  fetchList() {
    console.log( "TransferAdmin.fetchList : " + this.state.stage );
    const myRequest = SERVERROOT + "/transfer/all/"+this.state.type;
    const now = new Date();
    console.log( "TransferAdmin.fetchList " + now.toISOString() + " Request: " + myRequest );
    if( myRequest !== null ) {
      fetch(myRequest)
          .then(this.handleErrors)
          .then(response => {
            var contentType = response.headers.get("content-type");
            if(contentType && contentType.includes("application/json")) {
              return response.json();
            }
            throw new TypeError("TransferAdmin(fetchList): response ("+contentType+") must be a JSON string");
        }).then(json => {
           console.log("TransferAdmin.fetchList: JSON retrieved - " + json);
           this.setState( {returnedText: json, 
                           updateData: false, 
                           updateDisplay:true,
                           stage: "dataFetched" } );
        }).catch(function(e) { 
           alert("Problem retrieving transfer list\n"+e);
           const emsg = "TransferAdmin.fetchList: Fetching transfer list " + e;
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
                    transfer: null,
                    stage: "begin" } );
  }

  render() {
    console.log("TransferAdmin (render) - stage: "+this.state.stage);
    switch( this.state.stage ) {
  	  case "begin":
        return <Waiting />
      case "dataFetched":
        return <TransferList transferData = {this.state.returnedText}
                             transferSelect = {this.handleTransferSelect}
                             handleQuit = {this.handleQuit}
               />
      case "itemRetrieved":
        return <TransferForm transferData = {this.state.returnedText}
                             transfer     = {this.state.transfer}
                             transferCopy = {this.handleTransferCopy}
                             transferUpdate = {this.handleTransferUpdate}
                             fieldChange = {this.handleFieldChange}
                             handleQuit = {this.handleQuit}
                             handleClick = {this.handleClick}
               />
      default:
        return <DefaultContents />
    }
  }
}

export default TransferAdmin;
