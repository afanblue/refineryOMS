import React, {Component} from 'react';


class AlarmMsgForm extends Component {
  constructor(props) {
    super(props);
    this.state={};
  }
  
  render() {
    const msg         = this.props.msg;
    const msgUpdate   = this.props.msgUpdate;
    const handleQuit  = this.props.handleQuit;
    const fieldChange = this.props.fieldChange;
    
    return (
      <div className="oms-tabs">
        <form id="msgForm" name="msgForm" >
          <table>
            <tbody className="scrollContent">
              <tr>
                <th className="oms-spacing-90">&nbsp;</th>
                <td className="oms-spacing-240">
                  <img src="images/spacer.png" alt="space" height="1px" width="260px"/>
                </td>
              </tr>
              <tr>
                <td className="oms-spacing-90">&nbsp;Abbr:&nbsp;</td>
                <td className="oms-spacing-240">
                  <input type="hidden" id="id" name="id" value={msg.id} />
                  <input type="text" id="message" name="message" value={msg.abbr} 
                         className={["oms-spacing-80","oms-fontsize-12"].join(' ')} 
                         onChange={fieldChange} size="10" maxLength="4" />
                </td>
              </tr>
              <tr>
                <td className="oms-spacing-90">&nbsp;Message:&nbsp;</td>
                <td className="oms-spacing-240">
                  <input type="text" id="message" name="message" value={msg.message} 
                         className={["oms-spacing-80","oms-fontsize-12"].join(' ')} 
                         onChange={fieldChange} size="30" maxLength="120" />
                </td>
              </tr>
              <tr>
                <th className="oms-spacing-90">&nbsp;</th>
                <td className="oms-spacing-240">
                  <img src="images/spacer.png" alt="space" height="1px" width="260px"/>
                </td>
              </tr>
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
                               onClick={(e) => {msgUpdate(e)}}/>
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      </div>
    )
  }
}

export default AlarmMsgForm;