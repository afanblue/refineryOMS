import React, {Component} from 'react';

class Waiting extends Component {
  constructor(props) {
    super(props);
    console.log( "Waiting " );
  }
  render () {
    return (    
    <table><tbody><tr>
      <td className="oms-padded-menu-text">Waiting ...</td>
      <td><img src="./images/spacer.png" alt="space" width="20px" height="480px" /></td>
    </tr></tbody></table> 
    )}
}

export default Waiting