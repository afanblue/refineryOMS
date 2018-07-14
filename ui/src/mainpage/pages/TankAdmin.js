import React, {Component} from 'react';
import {SERVERROOT, IMAGEHEIGHT, IMAGEWIDTH} from '../../Parameters.js';
import DefaultContents from './DefaultContents.js';
import TankForm from './forms/TankForm.js';
import TankList from './lists/TankList.js';
import Waiting from './Waiting.js';
import {Tag} from './objects/Tag.js';
import {Tank} from './objects/Tank.js';


/*
{"id":177,"name":"DCTK-A101","api":32.6,"density":0.862,"height":25.0,"diameter":30.0
,"units":"f","c1Lat":39.58405,"c1Long":-75.62484,"c2Lat":null,"c2Long":null
,"contentType":"Asphalt","contentTypeCode":"A","state":"Y","tempTag":null,"levelTag":null},
*/


class TankAdmin extends Component {
  constructor(props) {
    super(props);
    console.log( "TankAdmin: " + props.stage );
    this.state = {
      stage: props.stage,
      updateData: false,
      updateDisplay: true,
      returnedText: null,
      tank: null,
      color: "green",
      nextCorner: 1
    };
    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.handleTankSelect  = this.handleTankSelect.bind(this);
    this.handleTankUpdate  = this.handleTankUpdate.bind(this);
    this.handleMouseUp     = this.handleMouseUp.bind(this);
    this.handleQuit        = this.handleQuit.bind(this);
    this.handleClick       = this.handleClick.bind(this);
  }
  
  handleErrors(response) {
    if (!response.ok) {
        throw Error(response.status+" ("+response.statusText+")");
    }
    return response;
  }

  componentWillReceiveProps(nextProps) {
    console.log( "TankAdmin.willRcvProps: " + nextProps.selected + ":"
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
    console.log( "TankAdmin.shouldUpdate? : (" + nextState.stage + ") " + (sts?"T":"F") );
    return sts;
  }
  
  fetchTankData(id) {
    const myRequest=SERVERROOT + "/tank/" + id;
    console.log( "TankAdmin.fetchTank - Request: " + myRequest );
    fetch(myRequest)
      .then(this.handleErrors)
      .then(response => {
        var contentType = response.headers.get("Content-Type");
        if(contentType && contentType.includes("application/json")) {
          return response.json();
        }
        throw new TypeError("TankAdmin.fetchTank: response ("+contentType+") must be a JSON string");
    }).then(json => {
       let ud = json;
       var tg = new Tag(ud.id,ud.tag.name,ud.tag.description,ud.tag.tagTypeCode
                       ,ud.tag.tagTypeId
                       ,ud.tag.c1Lat,ud.tag.c1Long,ud.tag.c2Lat,ud.tag.c2Long
                       ,ud.tag.active);
       var tk = new Tank(ud.id,tg,ud.api,ud.density,ud.height
                        ,ud.diameter,ud.units,ud.contentType
                        ,ud.contentTypeCode,ud.tempTag,ud.levelTag
                        ,ud.tempId,ud.levelId);
       this.setState({stage: "itemRetrieved",
                      updateDisplay: true,
                      updateData: false,
                      returnedText: json,
                      tank: tk
                     });
    }).catch(function(error) { 
       alert("Problem selecting tank id "+id+"\n"+error);
       console.log("TankAdmin.fetchTank: Error - " + error);  
    });
  }
  
  handleTankSelect(event) {
    let now = new Date();
    console.log( "TankAdmin.tankSelect " + now.toISOString() );
    const id = event.z;
    this.fetchTankData(id);
  }

  handleTankUpdate(event) {
    event.preventDefault();
    const id = this.state.tank.id;
    console.log("TankAdmin.tankUpdate: (data) id="+id
               +", alias:"+this.state.alias);
    let method = "PUT";
    let url = SERVERROOT + "/tank/update";
    if( id === 0 ) {
      method = "POST";
      url = SERVERROOT + "/tank/insert";
    }
    var b = JSON.stringify( this.state.tank );
    fetch(url, {
      method: method,
      headers: {'Content-Type':'application/json'},
      body: b
    }).then(this.handleErrors)
      .then(response => {
        this.fetchTankData(id);
    }).catch(function(error) { 
        alert("Problem "+(id===0?"inserting":"updating")+" tank "
             +"id "+id+"\n"+error);
        console.log("TankAdmin.tankUpdate: Error - " + error);  
    });
;
  }
  
  componentDidMount() {
    console.log( "TankAdmin.didMount: " + this.state.stage );
    this.fetchList();
  }
    
  componentDidUpdate( prevProps, prevState ) {
    console.log( "TankAdmin.didUpdate: " + this.state.stage );
  }

  handleClick() {
    
  };
  
  handleFieldChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    let np = name.split(".");
    let tknew = Object.assign({},this.state.tank);
    if( np.length === 1 ) {
        const field = np[0];
        tknew[field] = value;
    } else {
        const field = np[1];
        tknew.tag[field] = value;
    }
    this.setState({tank: tknew } );
  }
  
  handleMouseUp(event) {
      const e = event;
      const t = e.evt;
      var x = t.offsetX;
      var y = t.offsetY;
      var l = this.state.returnedText.siteLocation;
      var lat = l.c1Lat + y * (l.c2Lat-l.c1Lat) / IMAGEHEIGHT;
      var long = l.c1Long + x * (l.c2Long-l.c1Long) / IMAGEWIDTH;
      console.log( "TankAdmin.mouseUp: siteLocation=(NW["+l.c1Lat+","+l.c1Long+"]"
                 + " SE("+l.c2Lat+","+l.c2Long+")]");
      console.log( "TankAdmin.mouseUp: "+lat+","+long);
      let tknew = Object.assign({},this.state.tank);
      let nextCorner = this.state.nextCorner;
      if( nextCorner === 1 ) {
        tknew.tag.c1Lat = lat;
        tknew.tag.c1Long = long;
        nextCorner = 2;
      } else {
        tknew.tag.c2Lat = lat;
        tknew.tag.c2Long = long;
        nextCorner = 1;        
      }
      this.setState( {tank: tknew, nextCorner:nextCorner} );
  }
 
  fetchList() {
    console.log( "TankAdmin.fetchList : " + this.state.stage );
    const myRequest = SERVERROOT + "/tank/all";
    const now = new Date();
    console.log( "TankAdmin.fetchList " + now.toISOString() + " Request: " + myRequest );
    if( myRequest !== null ) {
      fetch(myRequest)
          .then(this.handleErrors)
          .then(response => {
            var contentType = response.headers.get("content-type");
            if(contentType && contentType.includes("application/json")) {
              return response.json();
            }
            throw new TypeError("TankAdmin(fetchList): response ("+contentType+") must be a JSON string");
        }).then(json => {
           console.log("TankAdmin.fetchList: JSON retrieved - " + json);
           this.setState( {returnedText: json, 
                           updateData: false, 
                           updateDisplay:true,
                           stage: "dataFetched" } );
        }).catch(function(e) { 
           alert("Problem retrieving tank list\n"+e);
           const emsg = "TankAdmin.fetchList: Fetching tank list " + e;
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
                    tank: null,
                    stage: "begin" } );
  }

  render() {
    console.log("TankAdmin (render) - stage: "+this.state.stage);
    switch( this.state.stage ) {
  	  case "begin":
        return <Waiting />
      case "dataFetched":
        return <TankList tankData = {this.state.returnedText}
                         tankSelect = {this.handleTankSelect}
                         handleQuit = {this.handleQuit}
               />
      case "itemRetrieved":
        return <TankForm tankData = {this.state.returnedText}
                         tank     = {this.state.tank}
                         tankUpdate = {this.handleTankUpdate}
                         fieldChange = {this.handleFieldChange}
                         handleQuit = {this.handleQuit}
                         handleMouseUp = {this.handleMouseUp}
                         handleClick = {this.handleClick}
               />
      default:
        return <DefaultContents />
    }
  }
}

export default TankAdmin;
