import React, { Component } from 'react';
//import logo from './logo.svg';

import './reset.css';
import './oms.css';
import ClassificationMenu from './frames/ClassificationMenu.js';
import Header from './frames/Header.js';
import MenuList from './frames/MenuList.js';
import LoginDisplay from './mainpage/LoginDisplay.js';
import { SESSIONLENGTH, RESPONSENOTJSON } from './Parameters.js';
import Contents from './mainpage/Contents.js';
require('es6-promise').polyfill();
require('isomorphic-fetch');


function AppDisplay(props) {
  let classifications = props.classifications;
  let option = props.option;
  let menus = props.menus;
  let selected = props.selected;
  let catSelect = props.handleCatSelect;
  let menuSelect = props.handleMenuSelect;
  return (
    <table className="oms-table" width="100%">
      <tbody>
      <tr>
        <td colSpan="2">
          <ClassificationMenu classifications={classifications}
                              selected={selected}
                              handleCatSelect={catSelect}
          />
        </td>
      </tr>
      <tr>
        <td className='oms-menu' width="20%">
          <MenuList menus={menus}
                    selected={selected}
                    handleMenuSelect={menuSelect}
          />
        </td>
        <td width="80%">
          <div id="admin" className="oms-intro">
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

function MainDisplay(props) {
  if( props.loggedIn ) {
    return <AppDisplay classifications={props.classifications}
                       menus={props.menus}
                       selected={props.selected}
                       option={props.option}
                       handleCatSelect={props.handleCatSelect}
                       handleMenuSelect={props.handleMenuSelect}
           />;
  } else {
    return <LoginDisplay alias={props.alias} 
                         handleLoginChange={props.handleLoginChange}
                         handleLogin={props.handleLogin}
           />;
  }
}

function Category(t) { this.text = t; }
function Menu(t,u,c,m) { this.text=t; this.uri=u; this.category=c; this.menuname=m; }
function Validation(v,c,m) {this.valid=v; this.classes=c; this.menus=m; }


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
      timerID: null
    };
    this.handleLoginChange = this.handleLoginChange.bind(this);
    this.handleLogin       = this.handleLogin.bind(this);
    this.handleCatSelect   = this.handleCatSelect.bind(this);
    this.handleMenuSelect  = this.handleMenuSelect.bind(this);
  }

/*
  shouldComponentUpdate(nextProps,nextState) {
    console.log( "OMS (shouldUpdate)" + nextState.activity );
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
    const now = new Date();
    console.log( "OMS (handleLogin) " + now.toISOString() + " Request: " + myRequest );
    fetch(myRequest)
      .then(this.handleErrors)
      .then(response => {
        var contentType = response.headers.get("Content-Type");
//        console.log("Content type "+contentType);
        if(contentType && contentType.includes("application/json")) {
          return response.json();
        }
        throw new TypeError("UserValidation: "+RESPONSENOTJSON);
    }).then(json => {
       if( json.valid === 1 ) {
         console.log("OMS (handleLogin): User validated");
         var vx = new Validation( false, null, null );
         var classes = [];
         var menuList = [];
         json.categories.map(function(n,x){var cat = new Category(n.text); return classes.push( cat ); } );
         json.menus.map(function(n,x){var m = new Menu(n.text,n.uri,n.category,n.menuname); return menuList.push( m ); } );
         vx = new Validation( true, classes, menuList );
       } else {
         alert("User name and password must match a valid account");
         vx = new Validation( false, null, null );
       }
       var myTimerID = setTimeout(() => {this.setState({timerID: null, isLoggedIn:false})}, SESSIONLENGTH);
       this.setState({isLoggedIn: vx.valid,
                      classifications: vx.classes,
                      menuList: vx.menus,
                      timerID: myTimerID
                     });
    }).catch(function(error) { 
       alert("Problem logging in \n"+error);
       console.log("OMS (handleLogin): Validating user (" + alias + ") " + error);  
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
    this.setState({option:z,activity:"menuSelect" });
  }

  handleLoginChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({[name]: value, activity:"userInput" } );
  }

  render() {
    console.log( "OMS (render) " + this.state.selected + ":" + this.state.option );
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
                     menus={this.state.menuList}
                     alias = {this.state.alias}
                     selected = {this.state.selected}
                     option = {this.state.option}
                     handleLoginChange={this.handleLoginChange}
                     handleLogin={this.handleLogin}
                     handleCatSelect={this.handleCatSelect}
                     handleMenuSelect={this.handleMenuSelect}
        />
        <footer className="oms-footer">
          <div className="bottom-text">{footer}</div>
        </footer>
      </div>
    )
  }
}

export default OMS;
