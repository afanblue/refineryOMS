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

import React, { Component } from 'react';


class MenuList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    var menuList = this.props.menus;
    var selected = this.props.selected;
    var menuSelect = this.props.handleMenuSelect;
    return (
      <div className="oms-left-menu">
        <table>
          <tbody>
            <tr>
              <td className="oms-menu-text">
                <img src="./images/spacer.png" alt="" height="15px" width="120px" />
              </td>
            </tr>
            {menuList.map(
            function(n,x){
              let t=n.category.replace(" ","");
              let z=n.menuname;
              if( selected.localeCompare(t) === 0 ) {
                return(
                  <tr key={x}>
                    <td className="oms-menu-text">
                      <img src="./images/spacer.png" alt="" height="5px" width="10px" />
                      <a id={z} onClick={() => {menuSelect({z})}} >{n.text}</a>
                    </td>
                  </tr> );
              }
              return null;
            } 
            )}
          </tbody>
        </table>
      </div>
    );
  }

}

export default MenuList;