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

import {Category}   from '../mainpage/pages/objects/Category.js';
import {Menu}       from '../mainpage/pages/objects/Category.js';


class MenuList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  sidebarMenus( classList, selected, option, menuSelect ) {
	let menuList = []
	classList.map(function(c,x){ if( selected.localeCompare(c.text)===0 ) { return menuList.push(c.menus); } else return null; } );
	menus = menuList[0];
    return (
      <div className="oms-left-menu">
        <table>
          <tbody>
            <tr>
              <td className="oms-menu-text">
                <img src="./images/spacer.png" alt="" height="15px" width="180px" />
              </td>
            </tr>
            {menus.map(
            function(n,x){
              let t=n.category.replace(" ","");
              let z=n.menuname;
              return(
                <tr key={x}>
                  <td className="oms-menu-text">
                    <img src="./images/spacer.png" alt="" height="5px" width="10px" />
                    <button type="button" className="link-button-selected" onClick={() => {menuSelect({z})}} >
                      {n.text}
                    </button>
                  </td>
                </tr> );
            }
            )}
          </tbody>
        </table>
      </div>
      );
  }

  dropdownMenus( ) {
	return (
      <div className="oms-left-menu">
        <img src="./images/spacer.png" alt="" height="5px" width="20px" />
      </div>
    );
  }

  render() {
    var menuType = this.props.menuType;
    var classList = this.props.classifications;
    var selected = this.props.selected;
    var option   = this.props.option;
    var menuSelect = this.props.handleMenuSelect;
    if( "sidebar" == this.props.menuType ) {
      return this.sidebarMenus( classList, selected, option, menuSelect );
    } else {
      return this.dropdownMenus( );
    }
  }

}

export default MenuList;