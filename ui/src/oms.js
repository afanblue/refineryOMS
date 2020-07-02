/*************************************************************************
 * oms.js
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

import React, { Component } from 'react';
import PropTypes            from 'prop-types';
//import logo from './logo.svg';

import './reset.css';
import './oms.css';
import './react-datetime.css';

import Log          from './mainpage/requests/Log.js';
import ClassificationMenu from './frames/ClassificationMenu.js';
import Header       from './frames/Header.js';
import MenuList     from './frames/MenuList.js';
import LoginDisplay from './mainpage/LoginDisplay.js';
import { SESSIONLENGTH, RESPONSENOTJSON } from './Parameters.js';
import Contents     from './mainpage/Contents.js';
import {Category}   from './mainpage/pages/objects/Category.js';
import {Menu}   from './mainpage/pages/objects/Category.js';
//require('es6-promise').polyfill();
require('isomorphic-fetch');



function AppDisplay(props) {
  let classifications = props.classifications;
  let menuType = props.menuType;
  let option = props.option;
  let selected = props.selected;
  let catSelect = props.handleCatSelect;
  let menuSelect = props.handleMenuSelect;
  let mouseEnter = props.handleMouseEnter;
  let mouseLeave = props.handleMouseLeave;
  if( option === "" || option === undefined || option === null ) {
    if(      selected === "Admin" )         { option = "Users"; }
    else if( selected === "Alarms" )        { option = "ActiveAlarms"; }
    else if( selected === "FieldDisplays" ) { option = "SiteOverview"; }
    else if( selected === "Orders" )        { option = "Active"; }
    else if( selected === "PlotGroups" )    { option = "SiteStarPlot"; }
    else if( selected === "ProcessUnits" )  { option = "ProcessUnits"; }
    else if( selected === "Schematics" )    { option = "ListSchematics"; }
    else if( selected === "Transfers" )     { option = "ActiveTransfers"; }
  }
  var menuWidth = "20%";
  var contentWidth = "80%";
  switch (menuType) {
	case "dropdown" :
	  menuWidth = "3%"
	  contentWidth = "97%";
	  break;
	case "sidebar" :
	  menuWidth = "20%";
	  contentWidth = "80%";
	  break;
  }

  return (
    <table className="oms-table" width="100%">
      <tbody>
      <tr>
        <td colSpan="2">
          <ClassificationMenu menuType={menuType}
                              classifications={classifications}
                              selected={selected}
                              option={option}
                              handleMenuSelect={menuSelect}
                              handleCatSelect={catSelect}
                              handleMouseEnter={mouseEnter}
                              handleMouseLeave={mouseLeave}
          />
        </td>
      </tr>
      <tr>
        <td className='oms-menu' width={menuWidth}>
          <MenuList menuType={menuType}
                    classifications={classifications}
                    selected={selected}
                    option={option}
                    handleMenuSelect={menuSelect}
          />
        </td>
        <td name='contents' id='contents' width={contentWidth}>
          <div name='admin' id="admin" className="oms-intro">
            <Contents selected={selected}
                      option={option}
                      stage="begin"
                      handleMenuSelect={menuSelect}
            />
          </div>
        </td>
      </tr>
      </tbody>
    </table>
  );
}

AppDisplay.propTypes = {
	classifications: PropTypes.any,
	option: PropTypes.any,
	selected: PropTypes.any,
	menuType: PropTypes.string,
	handleCatSelect: PropTypes.func,
	handleMenuSelect: PropTypes.func
}

function MainDisplay(props) {
  if( props.loggedIn ) {
    return <AppDisplay classifications={props.classifications}
                       selected={props.selected}
                       option={props.option}
                       menuType={props.menuType}
                       handleCatSelect={props.handleCatSelect}
                       handleMenuSelect={props.handleMenuSelect}
                       handleMouseEnter={props.handleMouseEnter}
                       handleMouseLeave={props.handleMouseLeave}
           />;
  } else {
    return <LoginDisplay alias={props.alias}
                         handleLoginChange={props.handleLoginChange}
                         handleLogin={props.handleLogin}
           />;
  }
}

function Validation(v,c,m) {this.valid=v; this.classes=c; }


class OMS extends Component {
  constructor(props) {
    super(props);
    const cats= ['Field Displays', 'Process Units', 'Transfers', 'Alarms', 'Admin'];
    var classes = [];
    cats.map(function(n,x){var Category = {text:n}; return classes.push( Category ); } );
    var menus = [];
    this.state = {
      alias: "",
      pwd: null,
      isLoggedIn: false,
      validate: false,
      classifications: classes,
      menuList: menus,
      selected: "Admin",
      option: "",
      activity: "",
      menuType: "dropdown",
      timerID: null
    };
    this.handleLoginChange = this.handleLoginChange.bind(this);
    this.handleLogin       = this.handleLogin.bind(this);
    this.handleMouseEnter  = this.handleMouseEnter.bind(this);
    this.handleMouseLeave  = this.handleMouseLeave.bind(this);
    this.handleCatSelect   = this.handleCatSelect.bind(this);
    this.handleMenuSelect  = this.handleMenuSelect.bind(this);
  }

/*
  shouldComponentUpdate(nextProps,nextState) {
    Log.info( "OMS (shouldUpdate)" + nextState.activity );
    return true;
  }
*/

  handleTimer() {
//    if( this.state.timerID !== null ) {
//      clearTimeout(this.state.timerID);
//    }
    this.setState({timerID: null, isLoggedIn: false});
  }

  handleErrors(response) {
    if (!response.ok) {
        throw Error(response.status+" ("+response.statusText+")");
    }
    return response;
  }

  handleLogin(event) {
    event.preventDefault();
    const myRequest="http://localhost:8080/oms/user/"+this.state.alias+"/"+this.state.pwd;
    const alias=this.state.alias;
//    const now = new Date();
//    Log.info( "now.toISOString() + " Request: " + myRequest,"OMS (handleLogin)" );
    fetch(myRequest)
      .then(this.handleErrors)
      .then(response => {
        var contentType = response.headers.get("Content-Type");
//        Log.info("Content type "+contentType);
        if(contentType && contentType.includes("application/json")) {
          return response.json();
        }
        throw new TypeError("UserValidation: "+RESPONSENOTJSON);
    }).then(json => {
       if( json.valid === 1 ) {
//         Log.info("User validated","OMS (handleLogin)");
         var vx = new Validation( true, null, null );
         var classes = [];
         var menuList = [];
         json.categories.map(function(n,x){
		   var menuList = [];
		   n.menus.map(function(m,y) {var menu = new Menu(m.text,m.category,m.menuname); return menuList.push( menu ); } );
           var cat = new Category(n.text, menuList);
           return classes.push( cat ); }
         );
         vx.classes=classes;
       } else {
         alert("User name and password must match a valid account");
         vx = new Validation( false, null, null );
       }
       var myTimerID = setTimeout(() => {this.setState({timerID: null, isLoggedIn:false})}, SESSIONLENGTH);
       this.setState({isLoggedIn: vx.valid,
                      classifications: vx.classes,
                      timerID: myTimerID
                     });
    }).catch(function(error) {
       alert("Problem logging in \n"+error);
       Log.error("Validating user (" + alias + ") " + error,"OMS (handleLogin)");
    });
  }

  handleCatSelect(event) {
//    alert( event.t );
    this.setState({selected:event.t, option:"", activity:"catSelect"});
  }

  handleMenuSelect(event) {
//    alert( event.z );
    let z = event.z;
    if( z === undefined ) {z=event.z1;}
    if( z === undefined ) {z=event.z2;}
    if( z === undefined ) {z=event.z3;}
    let option = z;
    let category = this.state.selected;
    if( typeof z === "string" ) {
      var opts = z.split(/\./);
      if( opts.length===2 ) {
        option = opts[1];
        category = opts[0];
      }
    }
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
    this.setState({selected:category,option:option,activity:"menuSelect" });
  }

  handleMouseEnter(event) {
    let t = event.t;
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
    document.getElementById(t).classList.toggle("show");
  }

  handleMouseLeave(event) {
    if (!event.target.matches('dropbtn')) {
      var dropdowns = document.getElementsByClassName("dropdown-content");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
  }

  handleLoginChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({[name]: value, activity:"userInput" } );
  }

  render() {
//    Log.info( this.state.selected + ":" + this.state.option,"OMS (render)" );
    let footer='Copyright 2014-'+((new Date()).getFullYear())+', Lobo Azul Software';
    let un = this.state.alias;
    let header=(un!=null&&un!=="")?'OMS ('+un+')':'OMS';
    return (
      <div className="oms">
        <header className="oms-header">
          <Header text={header} />
        </header>
        <MainDisplay loggedIn={this.state.isLoggedIn}
                     classifications={this.state.classifications}
                     alias = {this.state.alias}
                     selected = {this.state.selected}
                     option = {this.state.option}
                     menuType = {this.state.menuType}
                     handleLoginChange={this.handleLoginChange}
                     handleLogin={this.handleLogin}
                     handleCatSelect={this.handleCatSelect}
                     handleMenuSelect={this.handleMenuSelect}
                     handleMouseEnter={this.handleMouseEnter}
                     handleMouseLeave={this.handleMouseLeave}
        />
        <footer className="oms-footer">
          <div className="bottom-text">{footer}</div>
        </footer>
      </div>
    )
  }
}

export default OMS;
