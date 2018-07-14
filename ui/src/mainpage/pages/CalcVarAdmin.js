import React, {Component} from 'react';
import {SERVERROOT} from '../../Parameters.js';
import DefaultContents from './DefaultContents.js';
import CalcVarForm from './forms/CalcVarForm.js';
import CalcVarList from './lists/CalcVarList.js';
import Waiting from './Waiting.js';
import {CalcVar} from './objects/CalcVar.js';
import {Tag} from './objects/Tag.js';



class CalcVarAdmin extends Component {
  constructor(props) {
    super(props);
    console.log( "CalcVarAdmin: " + props.stage );
    this.state = {
      stage: props.stage,
      updateData: false,
      updateDisplay: true,
      returnedText: null,
      calcVar: null
    }
    this.handleChange  = this.handleChange.bind(this);
    this.handleSelect  = this.handleSelect.bind(this);
    this.handleUpdate  = this.handleUpdate.bind(this);
    this.handleQuit    = this.handleQuit.bind(this);
    this.requestRender = this.requestRender.bind(this);
  }
  
  handleErrors(response) {
    if (!response.ok) {
        throw Error(response.status+" ("+response.statusText+")");
    }
    return response;
  }

  componentWillReceiveProps(nextProps) {
    console.log( "CalcVarAdmin.willRcvProps: " + nextProps.selected + ":"
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
    console.log( "CalcVarAdmin.shouldUpdate? : (" + nextState.stage + ") " + (sts?"T":"F") );
    return sts;
  }

  fetchFormData(id) {
    const myRequest = SERVERROOT + "/calcVariable/" + id;
    console.log( "CalcVarAdmin.fetchFormData - Request: " + myRequest );
    fetch(myRequest)
      .then(this.handleErrors)
      .then(response => {
         var contentType = response.headers.get("Content-Type");
         if(contentType && contentType.includes("application/json")) {
           return response.json();
         }
         throw new TypeError("CalcVarAdmin.fetchFormData: response ("+contentType+") must be a JSON string");
    }).then( json => {
       let fd = json;
       const t = new Tag(fd.id,fd.tag.name,fd.tag.description,fd.tag.tagTypeCode,fd.tag.tagTypeId
                        ,fd.tag.c1Lat,fd.tag.c1Long,fd.tag.c2Lat,fd.tag.c2Long,fd.tag.active);
       let blankItem = {};
       blankItem.id = null;
       blankItem.name = '---';       
       let otl = fd.outputTagList;
       otl.unshift(blankItem);
       let itl = fd.inputTagList;
       const cv = new CalcVar(fd.id,t,fd.definition,fd.outputTagId,fd.inputTags,otl,itl);
       var its = fd.inputTags;
       var itids = [];
       if( its !== null ) {
         its.map(function(n,x) {
                  return itids.push(n.id);
                } )
       }
       cv.inputTagIds = itids;
       this.setState( {stage: "itemRetrieved",
                      updateDisplay: true,
                      updateData: false,
                      returnedText: json,
                      calcVar: cv                
                     } );
    }).then(alert("Calculated variable updated") )
      .catch(function(error) { 
       alert("Problem selecting calcVar id "+id+"\n"+error);
       console.log("CalcVarAdmin.fetchFormData: Error - " + error);  
    });
  }

  handleSelect(event) {
    let now = new Date();
    console.log( "CalcVarAdmin.select " + now.toISOString() );
    const id = event.z;
    this.fetchFormData(id);
  }

  /** 
   * validateForm - x is an CalcVar object
   */
  validateForm( x ) {
    let doSubmit = true;
    let delim = "";
    let msg = "The following field(s) ";
    if( (x.outputTagId === null) || (x.outputTagId === undefined) ) {
        doSubmit = false;
        msg += "output tag ";
        delim = ", ";
    }
    if( (x.tag.active === null) || (x.tag.active === undefined) ) {
        doSubmit = false;
        msg += delim + "active";
        delim = ", ";
    }
    if( (x.inputTags === null) || (x.inputTags === undefined) ) {
        doSubmit = false;
        msg += delim + "input tags";
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
    const id = this.state.calcVar.id;
    let method = "PUT";
    let url = SERVERROOT + "/calcVariable/update";
    if( id === 0 ) {
      method = "POST";
      url = SERVERROOT + "/calcVariable/insert";
    }
    var cv = Object.assign({},this.state.calcVar);
    delete cv.inputTagIds;
    if( this.validateForm( cv ) ) {
      const b = JSON.stringify(cv);
      console.log("CalcVarAdmin.update "+method)
      fetch(url, {
        method: method,
        headers: {'Content-Type':'application/json'},
        body: b
      }).then(this.handleErrors)
        .then(response => {
          this.fetchFormData(id);
      }).catch(function(error) { 
          alert("Problem "+(id===0?"inserting":"updating")+" CalcVar "
               +"id "+id+"\n"+error);
          console.log("CalcVarAdmin.update: Error - " + error);  
      });
    }
  }
  
  componentDidMount() {
    console.log( "CalcVarAdmin.didMount: " + this.state.stage );
    this.fetchList();
  }
  
  componentDidUpdate( prevProps, prevState ) {
    console.log( "CalcVarAdmin.didUpdate: " + this.state.stage );
    switch (this.state.stage) {
      case "begin":
        break;
      default:
    }
  }
  
  requestRender() {
    let cvnew = Object.assign({},this.state.calcVar);
    this.setState({calcVar: cvnew } );
  }
  
  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    let np = name.split(".");
    let cvnew = Object.assign({},this.state.calcVar);
    if( target.name === "inputTagIds" ) {
        let f = -1;
        let tNew = [];
        let tLength = (cvnew.inputTagIds===null?0:cvnew.inputTagIds.length);
        for( var i=0; i<tLength; i++) {
            let v = cvnew.inputTagIds.shift();
            if( v === parseInt(value,10) ) { 
                f = i;
            } else {
                tNew.push(v);
            }
        }
        if( f === -1 ) {
            tNew.push(value);
        }
        cvnew.inputTagIds = tNew;
    } else if( np.length === 1 ) {
        const fld = np[0];
        cvnew[fld] = value;
    } else {
        const fld = np[1];
        cvnew.tag[fld] = value;
    }
    this.setState({calcVar: cvnew } );
  }
  
  
  fetchList() {
    console.log( "CalcVarAdmin.fetchList : " + this.state.stage );
    const myRequest = SERVERROOT + "/calcVariable/all";
    const now = new Date();
    console.log( "CalcVarAdmin.fetchList " + now.toISOString() + " Request: " + myRequest );
    if( myRequest !== null ) {
      fetch(myRequest)
          .then(this.handleErrors)
          .then(response => {
            var contentType = response.headers.get("content-type");
            if(contentType && contentType.includes("application/json")) {
              return response.json();
            }
            throw new TypeError("CalcVarAdmin(fetchList): response ("+contentType+") must be a JSON string"); })
          .then(json => {
            console.log("CalcVarAdmin.fetchList: JSON retrieved - " + json);
            this.setState({ returnedText: json, 
                            updateData: false, 
                            updateDisplay:true,
                            stage: "dataFetched" });
            })
          .catch(function(e) {
             alert("Problem retrieving calcVar list\n"+e);
             const emsg = "CalcVarAdmin.fetchList: Fetching calcVar list " + e;
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
                    stage: "begin" } );
  }

  render() {
    console.log("CalcVarAdmin.render - stage: "+this.state.stage);
    switch( this.state.stage ) {
  	  case "begin":
        return <Waiting />
      case "dataFetched":
        return <CalcVarList returnedText = {this.state.returnedText}
                            handleSelect = {this.handleSelect} />
      case "itemRetrieved":
        return <CalcVarForm returnedText  = {this.state.returnedText}
                            calcVar       = {this.state.calcVar}
                            handleUpdate  = {this.handleUpdate}
                            handleChange  = {this.handleChange}
                            handleQuit    = {this.handleQuit}
                            requestRender = {this.requestRender}
               />
      default:
        return <DefaultContents />
    }
  }
}


export default CalcVarAdmin