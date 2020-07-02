/*************************************************************************
 * FieldAdmin.js
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
/* eslint-env node, browser, es6 */

import React, {Component} from 'react';
import PropTypes          from 'prop-types';

import {SERVERROOT, IMAGEHEIGHT, IMAGEWIDTH} from '../../Parameters.js';
import DefaultContents from './DefaultContents.js';
import FieldForm   from './forms/FieldForm.js';
import FieldList   from './lists/FieldList.js';
import Log         from '../requests/Log.js';
import Waiting     from './Waiting.js';
import {Field}     from './objects/Field.js';
import {RelTagTag} from './objects/Tag.js';


/*
all_fields:
create view all_fields( id,name,parent_id,parent ) as
select f.id, t.name, f.id pid, t.name pname
  from field f, tag t
 where f.id = t.id
   and t.active = 'Y'
   and t.tag_type_code = 'FLD'
   and t.id not in (select child_tag_id from rel_tag_tag)
union
select t.id, t.name, tp.id pid, tp.name pname
  from rel_tag_tag rtt join tag t on rtt.child_tag_id = t.id
       join tag tp on rtt.parent_tag_id = tp.id
 where t.tag_type_code = 'FLD'
   and tp.tag_type_code = 'FLD'

select af.id, af.name, af.parent_id, af.parent
  from all_fields af
	 order by af.name
*/


class FieldAdmin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stage: props.stage,
      updateData: false,
      updateDisplay: true,
      returnedText: null,
      field: null,
      nextCorner: 1
    }
    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.handleFieldSelect = this.handleFieldSelect.bind(this);
    this.handleFieldUpdate = this.handleFieldUpdate.bind(this);
    this.handleMouseUp     = this.handleMouseUp.bind(this);
    this.handleFieldQuit   = this.handleFieldQuit.bind(this);
  }

  static get propTypes() {
      return {
          stage: PropTypes.string
      }
  }

  handleErrors(response) {
    if (!response.ok) {
        throw Error(response.status+" ("+response.statusText+")");
    }
    return response;
  }

  static getDerivedStateFromProps(nextProps, state) {
    return state;
  }

  shouldComponentUpdate(nextProps,nextState) {
    let sts = nextState.updateDisplay;
    return sts;
  }

  fetchFormData(id) {
    const myRequest = SERVERROOT + "/field/" + id;
    const clsMthd = "FieldAdmin.fetchFormData";
    const request = async () => {
      try {
        const response = await fetch(myRequest);
        const fd = await response.json();
        const f = new Field( fd.id, fd.name, fd.description, fd.tagTypeCode, fd.tagTypeId
                           , fd.misc, fd.c1Lat, fd.c1Long, fd.c2Lat, fd.c2Long, fd.active
                           , fd.parentId, fd.parent, fd.roadImage, fd.satelliteImage);
        var cTanks = [];
        fd.childTanks.map(function(n,x) {
          let id = n.childTagId;
          return cTanks.push(id);
        } );
        f.childTanks = cTanks;
        this.setState({stage: "itemRetrieved",
                       updateDisplay: true,
                       updateData: false,
                       returnedText: fd,
                       field: f
                      });
      } catch( e ) {
        let emsg = "Problem selecting field id "+id;
        alert(emsg+"\n"+e);
        Log.error(emsg+"  "+ e,clsMthd);
      }
    }
    request();
  }

  handleFieldSelect(event) {
    const id = event.z;
    this.fetchFormData(id);
  }

  handleFieldUpdate(event) {
    event.preventDefault();
    let clsMthd = "FieldAdmin.update";
    const id = this.state.field.id;
    let method = "PUT";
    let url = SERVERROOT + "/field/update";
    if( id === 0 ) {
      method = "POST";
      url = SERVERROOT + "/field/insert";
    }
    var f = this.state.field;
    f.tagTypeCode = 'FLD';
    f.parents = null;
    f.tanks = null;
    var childTanks = [];
    let ctanks = f.childTanks;
    ctanks.map(function(n,x) {
      let rtt = new RelTagTag(0,n,null,id,null);
      return childTanks.push(rtt);
    } );
    f.childTanks = childTanks;
    const b = JSON.stringify(f);
    const request = async () => {
      try {
        const response = await fetch(url, {method:method, headers:{'Content-Type':'application/json'}, body: b});
        if( response.ok ) {
          alert("Field update/insert complete for id = "+id)
          this.fetchFormData(id);
        } else {
          alert("Field update/insert failed for id =  "+id+":  " + response.status);
        }
      } catch( error ) {
        alert("Problem "+(id===0?"inserting":"updating")+" field id "+id+"\n"+error);
        Log.error("Error - " + error,clsMthd);
      }
    }
    request();
  }

  componentDidMount() {
    this.fetchList();
  }

//  componentDidUpdate( prevProps, prevState ) {
//  }

  handleFieldChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    let np = name.split(".");
    let fnew = Object.assign({},this.state.field);
    if( target.name === "childTanks" ) {
        let f = -1;
        let tNew = [];
        let tLength = (fnew.childTanks===null?0:fnew.childTanks.length);
        for( var i=0; i<tLength; i++) {
            let v = fnew.childTanks.shift();
            if( v === parseInt(value,10) ) {
                f = i;
            } else {
                tNew.push(v);
            }
        }
        if( f === -1 ) {
            tNew.push(value);
        }
        fnew.childTanks = tNew;
    } else if( np.length === 1 ) {
        const field = np[0];
        fnew[field] = value;
    } else {
        const field = np[1];
        fnew.tag[field] = value;
    }
    this.setState({field: fnew } );
  }

  fetchList() {
    const clsMthd = "FieldAdmin.fetchList";
    const myRequest = SERVERROOT + "/field/all";
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
        const emsg = "Problem fetching field list";
        alert(emsg+"\n"+e);
        Log.error(emsg+" - " + e, clsMthd);
      }
    }
  }

  handleMouseUp(event) {
      const e = event;
      const t = e.evt;
      var x = t.offsetX;
      var y = t.offsetY;
      var l = this.state.returnedText.siteLocation;
      var lat = l.c1Lat + y * (l.c2Lat-l.c1Lat) / IMAGEHEIGHT;
      var long = l.c1Long + x * (l.c2Long-l.c1Long) / IMAGEWIDTH;
//      Log.info( "FieldAdmin.mouseUp: siteLocation{(NW["+l.c1Lat+","+l.c1Long+"] SE("+l.c2Lat+","+l.c2Long+")]}");
//      Log.info( "FieldAdmin.mouseUp: "+lat+","+long);
      let fnew = Object.assign({},this.state.field);
      let nextCorner = this.state.nextCorner;
      if( nextCorner === 1 ) {
        fnew.c1Lat = lat;
        fnew.c1Long = long;
        nextCorner = 2;
      } else {
        fnew.c2Lat = lat;
        fnew.c2Long = long;
        nextCorner = 1;
      }
      this.setState( {tank: fnew, nextCorner:nextCorner} );
  }

  handleFieldQuit(event) {
    event.preventDefault();
    this.fetchList();
    this.setState( {returnedText: null,
                    updateData: true,
                    updateDisplay:true,
                    stage: "begin" } );
  }

  render() {
    switch( this.state.stage ) {
      case "begin":
        return <Waiting />
      case "dataFetched":
        return <FieldList returnedText = {this.state.returnedText}
                          fieldSelect = {this.handleFieldSelect} />
      case "itemRetrieved":
        return <FieldForm returnedText = {this.state.returnedText}
                          field = {this.state.field}
                          fieldUpdate = {this.handleFieldUpdate}
                          fieldChange = {this.handleFieldChange}
                          handleQuit = {this.handleFieldQuit}
                          handleMouseUp = {this.handleMouseUp}
               />
      default:
        return <DefaultContents />
    }
  }
}


export default FieldAdmin