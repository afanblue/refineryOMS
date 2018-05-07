import React, { Component } from 'react';


class ClassificationMenu extends Component {
  constructor(props) {
    super(props);
    this.stage={};
  }
      
  render() {
    var classList = this.props.classifications;
    var selected = this.props.selected;
    var catSelected = this.props.handleCatSelect;
    return ( 
      <div className="oms-tabs">
        <nav>
          <ul className="oms-tabs-nav">
            {classList.map(
              function(n,x){
                let t=n.text.replace(" ","");
                if( selected.localeCompare(t) !== 0 ) {
                  return <li key={x}><a data-content={t} onClick={() => {catSelected({t})}} >{n.text}</a></li>;
                }
                return <li key={x}><a data-content={t} className="selected" onClick={() => {catSelected({t})}} >{n.text}</a></li>; 
                } 
              )
            }
          </ul>
        </nav>
      </div>
    )
  }
}

export default ClassificationMenu;
