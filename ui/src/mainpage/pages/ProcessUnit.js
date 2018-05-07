import React, {Component} from 'react';
import {SERVERROOT}       from '../../Parameters.js';
import DefaultContents    from './DefaultContents.js';
import ItemDisplay        from './displays/ItemDisplay.js';
import ProcessUnitDisplay from './displays/ProcessUnitDisplay.js';
import Waiting            from './Waiting.js';
//import {Field}            from './objects/Field.js';
//import {Tag}              from './objects/Tag.js';

/*
 * select f.id, f.satellite_image image, c1_lat, c1_long, c2_lat, c2_long
	 from field f join tag t on f.id = t.id 
	where t.name='DeCity';
	
	select field_tag_id, child_tag_id from field_tag_vw ftv, tank tk 
	 where ftv.child_tag_id=tk.id and ftv.field_tag_id= 1;
 */

class ProcessUnit extends Component {
  constructor(props) {
    super(props);
    console.log( "ProcessUnit " );
    this.state = {
      stage: props.stage,
      option: props.option,
      updateData: false,
      updateDisplay: true,
      returnedText: null,
      id: null,
      unitTimer: null,
      itemTimer: null
    };
    this.handleItemSelect  = this.handleItemSelect.bind(this);
    this.handleQuit = this.handleQuit.bind(this);
  }
  
  handleErrors(response) {
    if (!response.ok) {
        throw Error(response.status+" ("+response.statusText+")");
    }
    return response;
  }

  componentWillReceiveProps(nextProps) {
    console.log("ProcessUnit.willReceiveProps: "+this.state.option+" =? next "+ nextProps.option );
    clearInterval(this.state.itemTimer);
    if( nextProps.option !== this.state.option ) {
      this.setState({option: nextProps.option});
      this.fetchList(nextProps.option);
    }
  }
  
  shouldComponentUpdate(nextProps,nextState) {
    let sts = nextState.updateDisplay;
    console.log( "ProcessUnit.shouldUpdate? : (" + nextState.stage + ") " + (sts?"T":"F") );
    return sts;
  }
  
  handleItemSelect(event) {
    let now = new Date();
    console.log( "ProcessUnit.itemSelect " + now.toLocaleString() );
    const id = (event.z1 != null?event.z1:(event.z2 != null?event.z2:event.z3));
    this.fetchItemData(id);
    clearInterval(this.state.unitTimer);
    var myTimerID = setInterval(() => {this.fetchItemData(this.state.id)}, 60000 );
    this.setState( {itemTimer: myTimerID,
                    id: id } );
  }
  
  fetchItemData( id ) {
    const myRequest=SERVERROOT + "/ai/history/" + id + "/2";
    var now = new Date();
    console.log( "ProcessUnit.fetchItemData - Request: " + myRequest + now.toLocaleString() );
    fetch(myRequest)
      .then(this.handleErrors)
      .then(response => {
        var contentType = response.headers.get("Content-Type");
        if(contentType && contentType.includes("application/json")) {
          return response.json();
        }
        throw new TypeError("ProcessUnit.fetchItemData: response ("+contentType+") must be a JSON string");
    }).then(json => {
       this.setState({stage: "itemRetrieved",
                      updateDisplay: true,
                      updateData: false,
                      returnedText: json
                     });
    }).catch(function(error) { 
       alert("Problem selecting process unit id "+id+"\n"+error);
       console.log("ProcessUnit.fetchItemData: Error - " + error);  
    });
  }
  
  handleQuit() {
    console.log( "ProcessUnit: handleQuit" );
    this.fetchList(this.state.option);
    clearInterval(this.state.itemTimer);
    var myTimerID = setInterval(() => {this.fetchList(this.state.option)}, 60000 );
    this.setState( {unitTimer: myTimerID } );    
  }

  fetchList(opt) {
    console.log( "ProcessUnit.fetchList : " + opt );
    const myRequest = SERVERROOT + "/ai/pulist/" + opt;
    const now = new Date();
    console.log( "ProcessUnit.fetchList " + now.toISOString() + " Request: " + myRequest );
    if( myRequest !== null ) {
      fetch(myRequest,{
              method: 'GET',
              headers: {'Content-Type':'application/json',
                        'Cache-Control':'no-cache, no-store, max-age=0' }
           })
          .then(this.handleErrors)
          .then(response => {
            var contentType = response.headers.get("content-type");
            if(contentType && contentType.includes("application/json")) {
              return response.json();
            }
            throw new TypeError("TransferAdmin(fetchList): response ("+contentType+") must be a JSON string");
        }).then(json => {
           console.log("ProcessUnit.fetchList: JSON retrieved - " + json);
           this.setState( {returnedText: json, 
                           updateData: false, 
                           updateDisplay:true,
                           stage: "dataFetched"} );
        }).catch(function(e) { 
           alert("Problem retrieving field list\n"+e);
           const emsg = "ProcessUnit.fetchList: Fetching field list " + e;
           console.log(emsg);
      });
    }
  }

  componentDidMount() {
    console.log( "ProcessUnit.didMount: " + this.state.stage );
    this.fetchList(this.state.option);
    var myTimerID = setInterval(() => {this.fetchList(this.state.option)}, 60000 );
    this.setState( {unitTimer: myTimerID } );
  }
  
  componentWillUnmount() {
    console.log( "ProcessUnit.willUnmount "+this.state.unitTimer);
    if( this.state.unitTimer !== null ) {
      clearInterval(this.state.unitTimer);
    }
    if( this.state.itemTimer !== null ) {
      clearInterval(this.state.itemTimer);
    }
  }

  render() {
    console.log("ProcessUnit.render " + this.state.stage );
    switch (this.state.stage) {
      case "begin":
        return <Waiting />
      case "dataFetched":
        return <ProcessUnitDisplay option = {this.state.option}
                                   items = {this.state.returnedText}
                                   itemSelect = {this.handleItemSelect} />
      case "itemRetrieved":
        return <ItemDisplay id    = {this.state.id}
                            items = {this.state.returnedText}
                            quit  = {this.handleQuit} />
      default:
        return <DefaultContents />
    }
  }
}

export default ProcessUnit;