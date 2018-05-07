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
                <img src="./images/spacer.png" alt="space" height="15px" width="120px" />
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