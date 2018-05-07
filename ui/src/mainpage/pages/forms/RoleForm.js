import React, {Component} from 'react';


class RoleForm extends Component {
  constructor(props) {
    super(props);
    console.log( "RoleForm: " + props.stage );
    this.state = {  };
  }


  render() {
    const r = this.props.role;
    const roleUpdate = this.props.roleUpdate;
    const handleQuit = this.props.handleQuit;
    const roleChange = this.props.roleChange;

    const privList = this.props.privList;
    
    return(
      <div className="oms-tabs">
      <table>
        <tbody>
          <tr>
            <td className="oms-top">

      <form id="roleForm" >
        Please enter your role information 
        <table>
          <tbody className="scrollContent-narrow">
          <tr>
            <th className="oms-spacing-180">&nbsp;</th>
            <td className="oms-spacing"><img src="images/spacer.png" 
                alt="space" height="5px" width="240px"/>
            </td>
          </tr>
          <tr>
            <th className="oms-spacing-180">Role name (30):</th>
            <td className="oms-spacing">
              <input type="hidden" name="id" value={r.id} />            
              <input type="text" id="name" name="name" value={r.name} 
                     className={["oms-spacing-180","oms-fontsize-12"].join(' ')}  size="32" maxLength="32"
                     onChange={roleChange} />
            </td>
          </tr>
          <tr>
            <td className="oms-spacing-180">Active:</td>
            <td className="oms-spacing">
              <select id="active" name="active" value={r.active} 
                      onChange={roleChange} >
                <option value="N">N</option>
                <option value="Y">Y</option>
              </select>
            </td>
          </tr>
          <tr>
            <td className="oms-spacing-180">Privileges:</td>
            <td className="oms-spacing">
              <select id="privs" name="privs" value={r.privs} 
                      onChange={roleChange} multiple={true} size={10}>
                {privList.map( 
                  function(n,x){
                    return <option key={x} value={n.id}>{n.name}</option>
                  } )
                }

              </select>
            </td>
          </tr>
          </tbody>
        </table>
        <table className="oms-spacing">
          <tbody>
          <tr  className="oms-spacing">
            <td colSpan="2">
              &nbsp;<input type="submit" id="closeForm"  name="closeForm"  
                           value="Quit" onClick={(e) => {handleQuit(e)}}  />
              &nbsp;<input type="submit" id="submitForm" name="submitForm" 
                           value="Submit" onClick={(e) => {roleUpdate(e)}} />
            </td>
          </tr>
          </tbody>
        </table>
      </form>

            </td>
          </tr>
        </tbody>
      </table>
      
      </div>
    );    
      
  }
  
}

export default RoleForm;
