import React, {Component} from 'react';
import {SERVERROOT} from '../../Parameters.js';

import DefaultContents from './DefaultContents.js';
import GroupPlot       from './displays/GroupPlot.js';
import Waiting         from './Waiting.js';
import {PlotGroup}     from './objects/PlotGroup.js';


/**
 * the ad hoc form is appropriately ad hoc.  I fetch the contents of plot group
 * w/ID = 0 (i.e., a new plot group), which returns the list of analog values.
 * Since that's all I needed anyway, I display a truncated new plot group form
 * w/only the list of tags.
 * As each item is selected, in the handleChange function I get the history for
 * the selected item and store it away in a state variable, d1, d2, d3, or d4.
 *
 * this creates some problems if an item is dropped, since i have to replace 
 * the history data as well.  it turns out this isn't a big problem, since the
 * new item is always the last one.
 *
 * anyway, once the submit button is clicked, we generate the plot form.
 *
 * Notice I broke from my usual form by adding the form into the admin script. 
 */

class AdHocForm extends Component {
  constructor(props) {
    super(props);
    console.log( "AdHocForm: " + props.stage );
    this.state = { aiList: props.ailist };
  }

  componentWillReceiveProps(nextProps) {
    console.log( "AdHocForm.willRcvProps " );
    this.setState({ plotGroup: nextProps.plotGroup,
                    aiList: nextProps.aiList,
                    updateData: true,
                    updateDisplay: false,
                    returnedText: null });
  }

  render() {
    const pg = this.props.plotGroup;
    const handleUpdate = this.props.handleUpdate;
    const handleChange = this.props.handleChange;
    const aiList = this.props.aiList;
    
    return(
      <div className="oms-tabs">
      <table>
        <tbody>
          <tr>
            <td className="oms-top">

      <form id="plotGroupForm" >
        Please select the items to plot (max 4)
        <table>
          <tbody className="scrollContent-narrow">
          <tr>
            <th className="oms-spacing-120">Tags in Group:</th>
            <td>
              <select multiple={true} name="aiList" id="aiList" value={pg.aiList} size={10}
                     className= {["oms-spacing-120","oms-fontsize-12"].join(' ')} 
                     onChange={handleChange}>
                {aiList.map(function(n,x) {
                            return <option key={x} value={n.id}>{n.name}</option>
                          } )
                }
              </select>
            </td>
          </tr>
          </tbody>
        </table>
        <table className="oms-spacing">
          <tbody>
          <tr  className="oms-spacing">
            <td colSpan="2">
              &nbsp;<input type="submit" id="submitForm" name="submitForm" 
                           value="Submit" onClick={(e) => {handleUpdate(e)}} />
            </td>
          </tr>
          </tbody>
        </table>
      </form>

            </td>
          </tr>
        </tbody>
      </table>
      
      </div>
    );    
      
  }
  
}

class AdHocAdmin extends Component {
  constructor(props) {
    super(props);
    console.log( "AdHoc: " + props.stage );
    this.state = {
      stage: props.stage,
      updateData: false,
      updateDisplay: true,
      returnedText: null,
      plotGroup: null,
      d0: null,
      d1: null,
      d2: null,
      d3: null,
      aiList: null,
      unitTimer: null
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleQuit   = this.handleQuit.bind(this);
  }
  
  handleErrors(response) {
    if (!response.ok) {
        throw Error(response.status+" ("+response.statusText+")");
    }
    return response;
  }

  componentWillReceiveProps(nextProps) {
    console.log( "AdHoc.willRcvProps: " + nextProps.selected + ":"
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
    console.log( "AdHoc.shouldUpdate? : (" + nextState.stage + ") " + (sts?"T":"F") );
    return sts;
  }

  fetchFormData(id) {
    const myRequest = SERVERROOT + "/plotGroup/" + id;
    console.log( "AdHoc.fetchFormData - Request: " + myRequest );
    fetch(myRequest)
      .then(this.handleErrors)
      .then(response => {
        var contentType = response.headers.get("Content-Type");
        if(contentType && contentType.includes("application/json")) {
          return response.json();
        }
        throw new TypeError("AdHoc.fetchFormData: response ("+contentType+") must be a JSON string");
    }).then(json => {
       let fd = json;
       let ail = [];
       if( fd.id1 !== null ) { ail.push(fd.id1); }
       if( fd.id2 !== null ) { ail.push(fd.id2); }
       if( fd.id3 !== null ) { ail.push(fd.id3); }
       if( fd.id4 !== null ) { ail.push(fd.id4); }
       let pg = new PlotGroup(fd.id, fd.name, fd.active, fd.id1
                             ,fd.id2, fd.id3, fd.id4);
       pg.aiList = ail;
       this.setState({stage: "itemRetrieved",
                      updateDisplay: true,
                      updateData: false,
                      returnedText: json,
                      plotGroup: pg,
                      aiList: fd.aiList                 
                     });
    }).catch(function(error) { 
       alert("Problem selecting AdHoc id "+id+"\n"+error);
       console.log("AdHoc.fetchFormData: Error - " + error);  
    });
  }

  fetchHistory(id,ndx) {
    if( id !== undefined) {
      const myRequest = SERVERROOT + "/ai/history/" + id + "/2";
      console.log( "AdHoc.fetchHistory - Request: " + myRequest );
      fetch(myRequest)
        .then(this.handleErrors)
        .then(response => {
          var contentType = response.headers.get("Content-Type");
          if(contentType && contentType.includes("application/json")) {
            return response.json();
          }
          throw new TypeError("AdHoc.fetchHistory: response ("+contentType+") must be a JSON string");
      }).then(json => {
         let fd = json;
         switch( ndx ) {
           case 1:  this.setState({d0:fd}); break;
           case 2:  this.setState({d1:fd}); break;
           case 3:  this.setState({d2:fd}); break;
           default: this.setState({d3:fd}); break;
         }
      }).catch(function(error) { 
         alert("Problem selecting AdHoc id "+id+"\n"+error);
         console.log("AdHoc.fetchHistory: Error - " + error);  
      });
    }
  }

  handleUpdate(event) {
    event.preventDefault();
    var id1 = this.state.plotGroup.aiList[0];
    var id2 = this.state.plotGroup.aiList[1];
    var id3 = this.state.plotGroup.aiList[2];
    var id4 = this.state.plotGroup.aiList[3];
    var myTimerID = setInterval(() => {this.fetchHistory(id1,1);
                                       this.fetchHistory(id2,2);
                                       this.fetchHistory(id3,3);
                                       this.fetchHistory(id4,4);}, 60000 );
    this.setState({stage: "generatePlot",
                   unitTimer: myTimerID});
  }
  
  componentDidMount() {
    console.log( "AdHoc.didMount: " + this.state.stage );
    this.fetchFormData(0);
  }
  
  componentDidUpdate( prevProps, prevState ) {
    console.log( "AdHoc.didUpdate: " + this.state.stage );
    switch (this.state.stage) {
      case "begin":
        break;
      default:
    }
  }
  
  handleChange(event) {
    const target = event.target;
    const value = target.value;
    let pgnew = Object.assign({},this.state.plotGroup);

    if( target.value !== "" ) {
      let tv = parseInt(value,10);
      let f = -1;
      let tNew = [];
      let tLength = (pgnew.aiList===null?0:pgnew.aiList.length);
      for( var i=0; i<tLength; i++) {
        let v = pgnew.aiList.shift();
        if( v === value ) { 
          f = i;
        } else {
          tNew.push(v);
        }
      }
      if( f === -1 ) {
        if( tNew.length >= 4 ) {
          alert("Plot Groups can only contain 4 tags\n\nPlease remove one before selecting another");
        } else {
          tNew.push(tv);
          this.fetchHistory(tv,tNew.length);
        }
        pgnew.aiList = tNew;
      }
      this.setState({plotGroup: pgnew } );
    }
    
  }
  
  handleQuit(event) {
    event.preventDefault();
    if( this.state.unitTimer !== null ) {
      clearInterval(this.state.unitTimer);
    }
//    this.fetchFormData(0);
    let pgnew = Object.assign({},this.state.plotGroup);
    let tNew = [];
    pgnew.aiList = tNew;
    this.setState({plotGroup: pgnew, stage: "itemRetrieved" } );
  }
  
  componentWillUnmount() {
    console.log( "AdHoc.willUnmount "+this.state.unitTimer);
    if( this.state.unitTimer !== null ) {
      clearInterval(this.state.unitTimer);
    }
  }
  


  render() {
    console.log("AdHoc.render - stage: "+this.state.stage);
    switch( this.state.stage ) {
  	  case "begin":
        return <Waiting />
      case "itemRetrieved":
        return <AdHocForm plotGroup    = {this.state.plotGroup}
                          aiList       = {this.state.aiList}
                          handleUpdate = {this.handleUpdate}
                          handleChange = {this.handleChange}
               />
      case "generatePlot":
        return <GroupPlot d0 = {this.state.d0}
                          d1 = {this.state.d1}
                          d2 = {this.state.d2}
                          d3 = {this.state.d3}
                          handleQuit = {this.handleQuit} />
      default:
        return <DefaultContents />
    }
  }
}


export default AdHocAdmin