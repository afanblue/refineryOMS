import React, {Component} from 'react';


class ConfigList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  
  render() {
    console.log("ConfigList.render ");
    var ci = this.props.configItems;
    let configUpdate = this.props.configUpdate;
    let fieldChange = this.props.fieldChange;
    let handleQuit  = this.props.handleQuit;
    return ( 
      <div className="oms-tabs">
        <h2><div><img src="./images/spacer.png" alt="space" width="30px" height="2px"/>Configuration Items</div></h2>
        <form id="configForm" onSubmit={(e) => {configUpdate(e)}} >
        <table>
          <thead className="fixedHeader">
            <tr>
              <th className={["oms-spacing-180","oms-underline"].join(' ')}> Name </th>
              <th className={["oms-spacing-240","oms-underline"].join(' ')}> Value </th>
            </tr>
          </thead>
          <tbody className="scrollContent">
          {ci.map(
            function(n,x){
              let key="key."+x;
              let val = "value."+x
              return <tr key={x}>
                       <td className="oms-spacing-180">
                         <input type="text" id={key} name={key} value={ci[x].key} 
                                className="oms-spacing-180" onChange={fieldChange}/>
                       </td>
                       <td className="oms-spacing-240">
                         <input type="text" id={val} name={val} value={ci[x].value} 
                                className="oms-spacing-240" onChange={fieldChange}/>
                       </td>
                     </tr>
              } 
            )
          }
          </tbody>
        </table>
        <table className="oms-spacing">
          <tbody>
            <tr className="oms-spacing">
              <td>
                <input type="submit" id="closeForm"  name="closeForm"  
                       value="Quit" className="oms-spacing"
                       onClick={(e) => {handleQuit(e)}} />
                &nbsp;<input type="submit" id="submitForm" name="submitForm" 
                             value="Submit" className="oms-spacing"
                             onClick={(e) => {configUpdate(e)}}/>
              </td>
            </tr>
          </tbody>
        </table>
        </form>
      </div>
    );
  }
  
}

export default ConfigList;