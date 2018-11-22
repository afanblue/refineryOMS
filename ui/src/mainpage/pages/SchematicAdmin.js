/*************************************************************************
 * SchematicAdmin.js
 * Copyright (C) 2018  Laboratorio de Lobo Azul
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 ***********************************************************************/

import React, {Component} from 'react';
import {SERVERROOT}    from '../../Parameters.js';
import OMSRequest      from '../requests/OMSRequest.js';
import Log             from '../requests/Log.js';

import DefaultContents from './DefaultContents.js';
import SchematicForm   from './forms/SchematicForm.js';
import SchematicList   from './lists/SchematicList.js';
import Waiting         from './Waiting.js';
import {ChildValue}    from './objects/ChildValue.js';
import {Schematic}     from './objects/Schematic.js';
import {Vertex}        from './objects/Vertex.js';


class SchematicAdmin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stage: props.stage,
      updateData: false,
      updateDisplay: true,
      returnedText: null,
      schematic: null,
      sco: null,
      typeList: null,
      inpTags: null,
      outTags: null,
      color: "green",
      type: props.type,
      nextCorner: 1
    };
    this.handleFieldChange      = this.handleFieldChange.bind(this);
    this.handleSchematicCopy    = this.handleSchematicCopy.bind(this);
    this.handleSchematicSelect  = this.handleSchematicSelect.bind(this);
    this.handleSchematicUpdate  = this.handleSchematicUpdate.bind(this);
    this.handleQuit             = this.handleQuit.bind(this);
    this.handleAdd              = this.handleAdd.bind(this);
    this.handleModify           = this.handleModify.bind(this);
    this.handleItemChange       = this.handleItemChange.bind(this);
    this.handleMouseUp          = this.handleMouseUp.bind(this);
    this.finishSCMFetch         = this.finishSCMFetch.bind(this);
    this.finishTypesFetch       = this.finishTypesFetch.bind(this);
    this.finishInpTagFetch      = this.finishInpTagFetch.bind(this);
    this.finishOutTagFetch      = this.finishOutTagFetch.bind(this);
  }
  
  handleErrors(response) {
    if (!response.ok) {
        throw Error(response.status+" ("+response.statusText+")");
    }
    return response;
  }

/*
  getDerivedStateFromProps(nextProps,prevState) {
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
    if( nextState.type  !== nextProps.type  ) { sts = true; }
//    if( nextProps.type !== nextState.type ) {
//      this.fetchList();
//    }
    return sts;
  }
  
  /**
   * Notice that the vtxList for the Pipe SCO's comes in as a Vertex object from
   * the dataserver and leaves (!) as an array of [longitude+","+latitude] strings
   *
   * The Vertices get pasted into a TextArea as a long string of "longitude,latitude"
   * strings (note the comma) with embedded "\n" so it looks pretty on the page.
   * 
   * The  
   */
  finishSCMFetch( req ) {
    let sd = req;
    const scm = new Schematic( sd.id, sd.name, sd.description, sd.active, sd.tagTypeCode, sd.tagTypeId
                             , sd.misc, sd.c1Lat, sd.c1Long, sd.c2Lat, sd.c2Long, sd.childTags);
//    ChildValue                i,n,d,a, tt,ttid,m, c1Lt,c1Lg,c2Lt,c2Lg,pid,rtid
//                             ,itId,itName,itVal,itType,irtid,itMx,itz,iac
//                             ,otId,otName,otVal,otType,ortid,otMx,otz,oac,vtl                           
    const item = new ChildValue( 0, 'New Item', '', 'Y', 'SCO', 0, ''
                               , null, null, null, null, sd.id, null
                               , 0, '', 0, '', 0, 0, 0, 'darkgreen' 
                               , 0, '', 0, '', 0, 0, 0, 'darkgreen', [] );
    let newt = Object.assign({},item);
    let cTags = [];
    if( sd.childTags !== null && sd.childTags !== undefined ) {
      for( var ict=0; ict<sd.childTags.length; ict++ ) {
        let pd = sd.childTags[ict];
        let pts = [];
        if( pd.misc === "P" ) {
          let vtxList = pd.vtxList;
          if( vtxList === null ) {
            pts = pts.concat(pd.c1Lat+","+pd.c1Long);
            pts = pts.concat("\n"+pd.c2Lat+","+pd.c2Long);
          } else {
            let sep = "";
            for( var i=0; i<vtxList.length; i++ ) {
//              let lpt = vtxList[i].split(",");
              let plt = vtxList[i].latitude;
              let plg = vtxList[i].longitude;
              sep = "";
              if( i > 0 ) { sep="\n"; }
              pts = pts.concat(sep+plt+","+plg);
            }
          }
        }
        const p = new ChildValue(pd.id,pd.name,pd.description,pd.active
                                ,pd.tagTypeCode,pd.tagTypeId,pd.misc
                                ,pd.c1Lat,pd.c1Long,pd.c2Lat,pd.c2Long
                                ,pd.parentId,pd.relTagId
                                ,pd.inpTagId,pd.inpTagName,pd.inpValue,pd.inpType
                                ,pd.inpRelTagId,pd.inpMax,pd.inpZero,pd.inpAlmColor
                                ,pd.outTagId,pd.outTagName,pd.outValue,pd.outType
                                ,pd.outRelTagId,pd.outMax,pd.outZero,pd.outAlmColor,pts);
        cTags.push(p);
      }
    }
    cTags.unshift(newt);
    scm.childTags = cTags;
    this.setState({stage: "itemRetrieved", updateDisplay: true, schematic:scm, sco:item });
  }
  
  finishTypesFetch(req) {
    let typeList = req;
//    req.map(function(n,x){ return privs.push(n.id); } )
//    let rnew = Object.assign({},this.state.role);
//    rnew.privs = privs;    
    this.setState({stage: "itemRetrieved", updateDisplay: true, typeList:typeList });
  }
  
  finishInpTagFetch(req) {
    let inpTags = req;
    this.setState({stage: "itemRetrieved", updateDisplay: true, inpTags: inpTags });
  }

  finishOutTagFetch(req) {
    let outTags = req;
    this.setState({stage: "itemRetrieved", updateDisplay: true, outTags: outTags });
  }

  fetchFormData( myRequest ) {
    const loc = "SchematicAdmin.select";
    let req0 = new OMSRequest(loc, myRequest, 
                            "Problem selecting schematic "+myRequest, this.finishSCMFetch);
    req0.fetchData();
    let req2 = new OMSRequest(loc, SERVERROOT + "/schematic/objTypeList",
                            "Problem retrieving type list ", this.finishTypesFetch);
    req2.fetchData();
    let req3 = new OMSRequest(loc, SERVERROOT + "/tag/types/AI,DI",
                            "Problem retrieving input tag list", this.finishInpTagFetch);
    req3.fetchData();
    this.setState({schematic:null, sco:null, typeList:null, inpTags:null})    
    let req4 = new OMSRequest(loc, SERVERROOT + "/tag/types/AO,DO",
                            "Problem retrieving output tag list", this.finishOutTagFetch);
    req4.fetchData();
    this.setState({schematic:null, sco:null, typeList:null, outTags:null})    
  }

  
  handleSchematicSelect(event) {
    const id = event.z;
    const myRequest=SERVERROOT + "/schematic/" + id;
    this.fetchFormData(myRequest); 
  }

  validateForm( x ) {
    let doSubmit = true;
    let msg = "The following fields ";
    if( x.statusId === 0 ) {
        doSubmit = false;
        msg += "schematic status, ";
    }
    if( ! doSubmit ) {
      msg += " must be selected!";
      alert(msg);
    }
    return doSubmit;
  }

  updateSchematic(id) {
    const clsMthd = "SchematicAdmin.updateSchematic";
    let newt = JSON.parse(JSON.stringify(this.state.schematic));
//    let newt = Object.assign({},this.state.schematic);
    let method = "PUT";
    let url = SERVERROOT + "/schematic/update";
    if( id === 0 ) {
      newt.id = 0;
      method = "POST";
      url = SERVERROOT + "/schematic/insert";
    }
    var sct = newt.childTags;
    var sco = sct.shift();
    if( sco.name !== "New Item" ) {
      sct.unshift(sco);
    }

    var sctnew = [];
    for( var nosco=0; nosco<sct.length; nosco++) {
      sco = sct[nosco];
      let pts = [];
/* */
      if( sco.misc === 'P' ) {
        pts = [];
        let vtl = sco.vtxList;
        if( vtl.length > 0 ) {
          if( "object" === typeof vtl ) { vtl = sco.vtxList.join(); }
          let lpt = vtl.split(",");
          for( var i=0; i<lpt.length; i=i+2 ) {
            let px = lpt[i].replace(/\n/gi, "");
            let py = lpt[i+1].replace(/\n/gi, "");
            var vtx = new Vertex(0,id,i,px,py);
            pts.push(vtx);
          }
        }
        sco.vtxList = pts;
      } else {
        sco.vtxList = pts;
      }
/* */
      sctnew.push(sco);
    }

    newt.childTags = sctnew;

    var b = JSON.stringify( newt );
    const request = async () => {
      try {
        await fetch(url, {method:method, headers:{'Content-Type':'application/json'}, body: b});
        alert("Update/insert complete on "+newt.name)
      } catch( error ) {
        const emsg = "Problem "+(id===0?"inserting":"updating")+" schematic id="+id; 
        alert(emsg+"\n"+error);
        Log.error(emsg+" - " + error,clsMthd);
      }
    }
    request();
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
    this.fetchList();
  }
    
  componentDidUpdate( prevProps, prevState ) {
  }

  handleMouseUp(event) {
    const e = event;
    const t = e.evt;
    var x = t.offsetX;
    var y = t.offsetY;

    let sconew = Object.assign({},this.state.sco);
    let nextCorner = this.state.nextCorner;
    if( sconew.misc !== 'P' ) {
      if( nextCorner === 1 ) {
        sconew.c1Lat = y;
        sconew.c1Long = x;
        nextCorner = 2;
      } else {
        sconew.c2Lat = y;
        sconew.c2Long = x;
        nextCorner = 1;        
      }
    } else {
      let sep = "";
      if( sconew.vtxList.length > 0 ) { sep="\n"}
      sconew.vtxList = sconew.vtxList.concat(sep+y+","+x);
    }
    this.setState( {sco: sconew, nextCorner:nextCorner} );
  }
  
  handleItemChange(id) {
    var sco = undefined;
    let cts = this.state.schematic.childTags;
    cts.forEach( function( e ) {
        if( e.id === parseInt(id,10) ) {
          sco = e;
          if( sco.vtxList === null || sco.vtxList === undefined ) {
            sco.vtxList = [];
          }
        }
    } );
    return sco;
  };
  
  handleFieldChange(event) {
    const target = event.target;
    const value  = target.value;
    const name   = target.name;
    let np = name.split(".");
    let scmnew = Object.assign({},this.state.schematic);
    let sconew = Object.assign({},this.state.sco);
    if( np.length === 1 ) {
        let fld = np[0];
        scmnew[fld] = value;
    } else {
        let fld = np[1];
        if( fld === "id" ) {
          sconew = this.handleItemChange(value);
        } else if( fld === "c1Lat" ) {
          let v = parseInt(value,10);
          let v2 = v;
          switch(sconew.misc) { 
            case "G" : v2 = v; break;
            case "P" : v2 = v; break;
            case "PB": v2 = v+10; break;
            case "PL": v2 = v+15; break;
            case "PR": v2 = v+15; break;
            case "PT": v2 = v+10; break;
            case "RU": v2 = v+68; break;
            case "S" : v2 = v+100; break;
            case "TK": v2 = v; break;
            case "T" : v2 = v; break;
            case "VH": v2 = v+12; break;
            case "VV": v2 = v+24; break;
            default:   v2 = v; break;
          }
          sconew[fld] = v;
          if( v2 !== v ) { sconew['c2Lat'] = v2; }
        } else if( fld === "c1Long") {
          let v = parseInt(value,10);
          let v2 = v;
          switch(sconew.misc)
          { case "G" : v2 = v; break;
            case "P" : v2 = v; break;
            case "PB": v2 = v+15; break;
            case "PL": v2 = v+10; break;
            case "PR": v2 = v+10; break;
            case "PT": v2 = v+15; break;
            case "RU": v2 = v+36; break;
            case "S" : v2 = v+100; break;
            case "TK": v2 = v; break;
            case "T" : v2 = v; break;
            case "VH": v2 = v+24; break;
            case "VV": v2 = v+12; break;
            default:   v2 = v; break;
          }
          sconew[fld] = v;
          if( v2 !== v ) { sconew['c2Long'] = v2; }
        } else if( fld === 'c2Lat' || fld === 'c2Long' ) {
          sconew[fld] = parseInt(value,10);
        } else if( fld !== 'vtxList' ) {
          sconew[fld] = value;
        } else {
          sconew[fld] = value;
        }
    }
    this.setState({schematic: scmnew, sco: sconew } );
  }
  
 
  fetchList() {
    const clsMthd = "SchematicAdmin.fetchList";
    const myRequest = SERVERROOT + "/tag/type/SCM";
    if( myRequest !== null ) {
      const request = async () => {
        const response = await fetch(myRequest);
        const json = await response.json();
        this.setState( {returnedText: json, 
                        updateData: false, 
                        updateDisplay:true,
                        stage: "dataFetched" } );
      }
      try {
        request();
      } catch( e ) {
        const emsg = "Problem fetching schematic list";
        alert(emsg+"\n"+e);
        Log.error(emsg+" - " + e, clsMthd);        
      }
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

  validateItem( sco ) {
    let doSubmit = true;
    let msg = "The following fields ";
    var delim = "";
    if( sco.id === null || sco.id === undefined ) {
      sco.id = 0;
    }
    if( sco.name === null || sco.name === "" || 
        sco.name === "New Item" || sco.name === undefined ) {
      doSubmit = false;
      msg += delim + " name";
      delim = ", ";
    }
    if( sco.misc === null || sco.misc === "" ) {
      doSubmit = false;
      msg += delim + " object type";
      delim = ", ";
    }
    if( sco.childTagId === null || sco.childTagId === "" || sco.childTagId === 0 ) {
      doSubmit = false;
      msg += delim + " child tag";
      delim = ", ";
    }
    if( sco.inpTagId === null || sco.inpTagId === "" || sco.inpTagId === 0 ) {
      doSubmit = false;
      msg += delim + " input tag";
      delim = ", ";
    }
    if( sco.outTagId === null || sco.outTagId === "" || sco.outTagId === 0 ) {
      if( (sco.misc === "HP") || (sco.misc === "VP") || (sco.misc === "HV") || (sco.misc === "VV") ) {
        doSubmit = false;
        msg += delim + " output tag";
        delim = ", ";
      }
    }
    if( (sco.c1Lat ===null?true:parseInt(sco.c1Lat,10)===0) || 
        (sco.c1Long===null?true:parseInt(sco.c1Long,10)===0) ) {
      doSubmit = false;
      msg += delim + " NW Corner";
      delim = ", ";
    }
    if( (sco.c2Lat ===null?true:parseInt(sco.c2Lat,10)===0) || 
        (sco.c2Long===null?true:parseInt(sco.c2Long,10)===0) ) {
      doSubmit = false;
      msg += delim + " SE Corner";
      delim = ", ";
    }
    if( ! doSubmit ) {
      msg += " must be initialized/selected!";
      alert(msg);
    }
    return doSubmit;
  }

  handleAdd(event) {
    event.preventDefault();
    let scm = Object.assign({},this.state.schematic);
    var sco = Object.assign({},this.state.sco);
    if( this.validateItem(sco) ) {
      if( scm.childTags === null ) {
        scm.childTags = [];
      }
      scm.childTags.push(sco);
      sco = { id:0, name:'New Item', description:'', active:'Y', misc:"", tagTypeCode:'SCO'
            , tagTypeId:0, c1Lat:0, c1Long:0, c2Lat:0, c2Long:0, parentId:scm.id, relTagId:0
            , inpRelTagId:0, inpTagId:0, inpType:"", inpTagName:"", inpValue:0, inpMax:0, inpZero:0
            , outRelTagId:0, outTagId:0, outType:"", outTagName:"", outValue:0, outMax:0, outZero:0
            , vtxList:[] };
      this.setState( {returnedText: null, 
                      updateData: true, 
                      updateDisplay:true,
                      schematic: scm,
                      sco: sco,
                      stage: "itemRetrieved" } );
    }
  }

  handleModify(event) {
    event.preventDefault();
    let scm = Object.assign({},this.state.schematic);
    var sco = Object.assign({},this.state.sco);
    if( this.validateItem(sco) ) {
      if( sco.id === 0 && sco.name === "New Item" ) {
        alert( "This item needs to be added to the list before it can be modified" );
      } else {
        let sct = scm.childTags;
        for( var i=0; i<sct.length; i++ ) {
          if( sct[i].id === sco.id ) {
//            sct.splice(i,1);
            sct[i].name = sco.name;
            sct[i].description = sco.description;
            sct[i].c1Lat = sco.c1Lat;
            sct[i].c1Long = sco.c1Long;
            sct[i].c2Lat = sco.c2Lat;
            sct[i].c2Long = sco.c2Long;
            sct[i].inpTagId = (sco.inpTagId===null?undefined:sco.inpTagId);
            sct[i].outTagId = (sco.outTagId===null?undefined:sco.outTagId);
            sct[i].misc = sco.misc;
            sct[i].vtxList = sco.vtxList;
            if( sco.misc === "P" ) {
              let pts = [];
              let vtxList = sco.vtxList;
              if( "object" === typeof vtxList ) { vtxList = vtxList.join(); } 
              let first = true;
              let sep = "";
              let vl = vtxList.replace( /\n/gi, ",");
              vl = vl.replace(/,,/gi,",");
              let lpt = vl.split(",");
              for( var j=0; j<lpt.length; j=j+2 ) {
//                var vtx = new Vertex(0,sct[i].id,j,lpt[0],lpt[2]);
                pts.push(sep+lpt[j]+","+lpt[j+1]);
                if( first ) { sep="\n"; first=false; }
              }
              sct[i].vtxList = pts;
            } else {
              sct[i].vtxList = [];
            }

          }
        }
        this.setState( {returnedText: null, 
                        updateData: true, 
                        updateDisplay:true,
                        schematic: scm,
                        sco: sco,
                        stage: "itemRetrieved" } );
      }
    }
  }


  render() {
    switch( this.state.stage ) {
  	  case "begin":
        return <Waiting />
      case "dataFetched":
        return <SchematicList schematicData   = {this.state.returnedText}
                              schematicSelect = {this.handleSchematicSelect}
                              handleQuit      = {this.handleQuit}
               />
      case "itemRetrieved":
        if( (this.state.schematic === null) || (this.state.typeList === null) || 
            (this.state.inpTags === null)   || (this.state.outTags === null)   ) {
          return <Waiting />
        } else {
          return <SchematicForm schematic     = {this.state.schematic}
                                sco           = {this.state.sco}
                                typeList      = {this.state.typeList}
                                inpTags       = {this.state.inpTags}
                                outTags       = {this.state.outTags}
                                schematicCopy = {this.handleSchematicCopy}
                                schematicUpdate = {this.handleSchematicUpdate}
                                fieldChange   = {this.handleFieldChange}
                                handleQuit    = {this.handleQuit}
                                handleAdd     = {this.handleAdd}
                                handleMod     = {this.handleModify}
                                handleMouseUp = {this.handleMouseUp}
                 />
        }
      default:
        return <DefaultContents />
    }
  }
}

export default SchematicAdmin;
