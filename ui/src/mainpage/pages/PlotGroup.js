import React, {Component} from 'react';

import {SERVERROOT}    from '../../Parameters.js';
import DefaultContents from './DefaultContents.js';
import GroupPlot       from './displays/GroupPlot.js';
import Waiting         from './Waiting.js';


class PlotGroup extends Component {
  constructor(props) {
    super(props);
    console.log( "PlotGroup: " + props.stage );
    this.state = {
      stage: props.stage,
      updateData: false,
      updateDisplay: true,
      returnedText: null,
      id: props.id,
      unitTimer: null,
      color: "green"
    };
  }
  
  handleErrors(response) {
    if (!response.ok) {
        throw Error(response.status+" ("+response.statusText+")");
    }
    return response;
  }

  componentWillReceiveProps(nextProps) {
    console.log( "PlotGroup.willRcvProps: " + nextProps.selected + ":"
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
    console.log( "PlotGroup.shouldUpdate? : (" + nextState.stage + ") " + (sts?"T":"F") );
    return sts;
  }
  
  fetchData( id ) {
    let now = new Date();
    console.log( "PlotGroup.fetchData " + now.toISOString() );
    const myRequest=SERVERROOT + "/ai/plotGroup/" + id;
    now = new Date();
    console.log( "PlotGroup.fetchData - Request: " + myRequest );
    fetch(myRequest)
      .then(this.handleErrors)
      .then(response => {
        var contentType = response.headers.get("Content-Type");
        if(contentType && contentType.includes("application/json")) {
          return response.json();
        }
        throw new TypeError("PlotGroup.fetchData: response ("+contentType+") must be a JSON string");
    }).then(json => {
       this.setState({stage: "dataRetrieved",
                      updateDisplay: true,
                      updateData: false,
                      returnedText: json
                     });
    }).catch(function(error) { 
       alert("Problem selecting transfer id "+id+"\n"+error);
       console.log("PlotGroup.fetchData: Error - " + error);  
    });
  }

  
  componentDidMount() {
    console.log( "PlotGroup.didMount: " + this.state.stage );
    this.fetchData(this.state.id);
    var myTimerID = setInterval(() => {this.fetchData(this.state.id)}, 60000 );
    this.setState( {unitTimer: myTimerID } );    
  }
    
  componentDidUpdate( prevProps, prevState ) {
    console.log( "PlotGroup.didUpdate: " + this.state.stage );
  }

  componentWillUnmount() {
    console.log( "PlotGroup.willUnmount "+this.state.unitTimer);
    if( this.state.unitTimer !== null ) {
      clearInterval(this.state.unitTimer);
    }
  }
  
  render() {
    console.log("PlotGroup (render) - stage: "+this.state.stage);
    switch( this.state.stage ) {
  	  case "begin":
        return <Waiting />
      case "dataRetrieved":
        var d = this.state.returnedText;
        return <GroupPlot d0 = {d[0]} d1={d[1]} d2={d[2]} d3={d[3]} />
      default:
        return <DefaultContents />
    }
  }
}

export default PlotGroup;
