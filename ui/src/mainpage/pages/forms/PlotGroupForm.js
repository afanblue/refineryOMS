import React, {Component} from 'react';


class PlotGroupForm extends Component {
  constructor(props) {
    super(props);
    console.log( "PlotGroupForm: " + props.stage );
    this.state = {  };
  }


  render() {
    const ud = this.props.returnedText;
    const pg = this.props.plotGroup;
    const handleUpdate = this.props.handleUpdate;
    const handleQuit = this.props.handleQuit;
    const handleChange = this.props.handleChange;
    const aiList = ud.aiList;
    
    return(
      <div className="oms-tabs">
      <table>
        <tbody>
          <tr>
            <td className="oms-top">

      <form id="plotGroupForm" >
        Please enter your PlotGroup information 
        <table>
          <tbody className="scrollContent-narrow">
          <tr>
            <th className="oms-spacing-120">&nbsp;</th>
            <td className="oms-spacing"><img src="images/spacer.png" 
                alt="space" height="5px" width="240px"/>
            </td>
          </tr>
          <tr>
            <th className="oms-spacing-120">PlotGroup name (16 chars):</th>
            <td className="oms-spacing">
              <input type="hidden" name="id" value={pg.id} />            
              <input type="text" id="name" name="name" value={pg.name} 
                     className={["oms-spacing-180","oms-fontsize-12"].join(' ')}  size="20" maxLength="16"
                     onChange={handleChange} />
            </td>
          </tr>
          <tr>
            <td className="oms-spacing-120">Active:</td>
            <td className="oms-spacing">
              <select id="active" name="active" value={pg.active} 
                      onChange={handleChange} >
                <option value="N">N</option>
                <option value="Y">Y</option>
              </select>
            </td>
          </tr>
          <tr>
            <th className="oms-spacing-120">Tags in Group:</th>
            <td>
              <select multiple={true} name="aiList" id="aiList" value={pg.aiList} size={10}
                     className= {["oms-spacing-120","oms-fontsize-12"].join(' ')} 
                     onChange={handleChange}>
                {aiList.map(function(n,x) {
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
                           value="Submit" onClick={(e) => {handleUpdate(e)}} />
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

export default PlotGroupForm;
