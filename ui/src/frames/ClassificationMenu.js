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
import PropTypes from 'prop-types';

//import {Category}   from '../mainpage/pages/objects/Category.js';
//import {Menu}       from '../mainpage/pages/objects/Category.js';

class ClassificationMenu extends Component {
  constructor(props) {
    super(props);
    this.stage={};
  }

  static get propTypes() {
      return {
		  menuType: PropTypes.string,
		  menus: PropTypes.array,
          classifications: PropTypes.any,
          selected: PropTypes.any,
          option: PropTypes.any,
          handleMouseEnter: PropTypes.func,
          handleMouseLeave: PropTypes.func,
          handleMenuSelect: PropTypes.func,
          handleCatSelect: PropTypes.func
      }
  }

  sidebarClasses( classList, selected, lineStyle, catSelected ) {
    return (
      <div className="oms-tabs">
        <nav>
          <ul className="oms-tabs-nav">
            {classList.map(
              function(n,x){
                let t=n.text.replace(" ","");
                if( selected.localeCompare(t) !== 0 ) {
                  return <li key={x}>
                           <button type="button" className="cat-button" onClick={() => {catSelected({t})}} >
                             {n.text}
                           </button>
                         </li>
                }
                return <li key={x}>
                         <button type="button" className="cat-button-selected" onClick={() => {catSelected({t})}} >
                           {n.text}
                         </button>
                       </li>;
                }
              )
            }
          </ul>
        </nav>
        <hr color="white" size="3 px" width="1000 px" align="left" style={lineStyle} />
      </div>
    )
  }

  dropdownClasses( classList, selected, lineStyle, option, mouseEnter, mouseLeave, menuSelect  ) {
    return (
      <div className="oms-tab">
        <nav>
          <ul className="oms-tabs-nav">
            {classList.map( function(n,x){
              var t=n.text.replace(" ","");
              var menus=n.menus;
              var anchorStyle = { verticalAlign:"top", fontSize:14, paddingTop:0, paddingBottom: 0, paddingRight: 10, paddingLeft: 10 };
              return <li key={x}>
                       <div className="dropdown">
                         <button type="button" className="dropbtn" onMouseEnter={() => {mouseEnter({t})}} onMouseLeave={mouseLeave} >
                           {n.text}
                         </button>
                         <div id={t} name={t} className="dropdown-content" onMouseEnter={() => {mouseEnter({t})}} onMouseLeave={mouseLeave} >
                           {menus.map( function(m,x){
                             let z=t+"."+m.menuname.replace(" ","");
                             return(
                             <a key={x} href="#" style={anchorStyle} onClick={() => { menuSelect({z})} } >{m.text}</a>
                             );
                           } ) }
                         </div>
                       </div>
                     </li>
            } ) }
          </ul>
        </nav>
        <hr color="white" size="3 px" width="100%" align="left" style={lineStyle} />
      </div>
    );
  }

  render() {
    var classList = this.props.classifications;
    var selected = this.props.selected;
    var catSelected = this.props.handleCatSelect;
    var lineStyle = { marginTop:10, border:0, height:3};
    if( "dropdown" === this.props.menuType ) {
      var option = this.props.option;
      var menuSelect = this.props.handleMenuSelect;
      var mouseEnter = this.props.handleMouseEnter;
      var mouseLeave = this.props.handleMouseLeave;
      return this.dropdownClasses( classList, selected, lineStyle, option, mouseEnter, mouseLeave, menuSelect  );
    } else {
      return this.sidebarClasses( classList, selected, lineStyle, catSelected);
    }
  }

}

export default ClassificationMenu;
