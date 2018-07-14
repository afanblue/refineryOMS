import React, {Component} from 'react';
//import {Stage, Layer} from 'react-konva';

//import SiteImage from '../SiteImage.js';
//import {IMAGEHEIGHT, IMAGEWIDTH} from '../../../Parameters.js';


class AOForm extends Component {
  constructor(props) {
    super(props);
    console.log( "AOForm: " + props.stage );
    this.state = {  };
  }

  render() {
    const ao = this.props.ao;
    const aoData = this.props.aoData;
    const histTypes = aoData.histTypes;
    const unitList = aoData.unitList;
    const aoUpdate = this.props.aoUpdate;
    const fieldChange = this.props.fieldChange;
    const handleQuit = this.props.handleQuit;
    return(
      <div className="oms-tabs">
        <table>
          <tbody>
            <tr>
              <td className="oms-top">
        <form id="aoForm" >
          Please enter your analog output information 
          <table>
            <tbody className="scrollContent-narrow">
              <tr>
                <th className="oms-spacing-90">&nbsp;</th>
                <td className="oms-spacing-180"><img src="images/spacer.png" 
                    alt="space" height="5px" width="180px"/></td>
              </tr>
              <tr>
                <th className="oms-spacing-90">AO name:</th>
                <td className="oms-spacing-180">
                  <input type="hidden" name="tagId" value={ao.tagId} />
                  <input type="text" id="tag.name" name="tag.name" value={ao.tag.name} 
                         className={["oms-spacing-80","oms-fontsize-12"].join(' ')} size="10" maxLength="10"
                         onChange={fieldChange} />
                </td>
              </tr>
              <tr>
                <th className="oms-spacing-90">Description:</th>
                <td className="oms-spacing-180">
                  <input type="text" id="tag.description" name="tag.description" value={ao.tag.description}
                         className={["oms-spacing-180","oms-fontsize-12"].join(' ')} size="120" maxLength="120"
                         onChange={fieldChange} />
                </td>
              </tr>
            
              <tr>
                <td className="oms-spacing-90">Active:</td>
                <td className="oms-spacing-180">
                  <select id="tag.active" name="tag.active" value={ao.tag.active} 
                          className={["oms-spacing-180","oms-fontsize-12"].join(' ')}
                          onChange={fieldChange} >
                    <option value="N">N</option>
                    <option value="Y">Y</option>
                  </select>
                </td>
              </tr>

          <tr>
            <td className="oms-spacing-90">Zero Value:</td>
            <td className={["oms-spacing-180","oms-fontsize-12"].join(' ')}>
              <input type="text" id="zeroValue" name="zeroValue" value={ao.zeroValue}
                      onChange={fieldChange} maxLength="8" size="10"/>
            </td>
          </tr>
          <tr>
            <td className="oms-spacing-90">Max Value:</td>
            <td className={["oms-spacing-180","oms-fontsize-12"].join(' ')}>
            <input type="text" id="maxValue" name="maxValue" value={ao.maxValue}
                    onChange={fieldChange} maxLength="9" size="10"/>
            </td>
          </tr>
          <tr>
            <td className="oms-spacing-90">Unit:</td>
            <td >
              <select id="unitId" name="unitId" value={ao.unitId}
                      onChange={fieldChange}>
                { unitList.map( 
                  function(n,x){
                    return <option key={x} value={n.id}>{n.code} ({n.name})</option>
                  } )
                }                
              </select>
            </td>
          </tr>
          <tr>
            <td className="oms-spacing-90">Hist Type:</td>
            <td >
              <select id="histTypeCode" name="histTypeCode" value={ao.histTypeCode}
                      onChange={fieldChange}>
                { histTypes.map( 
                  function(n,x){
                    return <option key={x} value={n.code}>{n.name}</option>
                  } )
                }                
              </select>
            </td>
          </tr>
          <tr>
            <td className="oms-spacing-90">Percent:</td>
            <td className={["oms-spacing-180","oms-fontsize-12"].join(' ')}>
              <input type="text" id="percent" name="percent" value={ao.percent} 
                     onChange={fieldChange} maxLength="2" size="5"/>
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
                               onClick={(e) => {aoUpdate(e)}}/>
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

export default AOForm;
