import React, {Component} from 'react';
//import {Stage, Layer, Group, Rect} from 'react-konva';
//import {IMAGEHEIGHT, IMAGEWIDTH} from '../../../Parameters.js';


class CalcVarForm extends Component {
  constructor(props) {
    super(props);
    console.log( "CalcVarForm: " + props.stage );
    this.state = {  };
  }


  render() {
    const ud = this.props.returnedText;
    const cv = this.props.calcVar;
    const otl = ud.outputTagList;
    const tagList = ud.tagList;
    const handleUpdate = this.props.handleUpdate;
    const handleQuit = this.props.handleQuit;
    const handleChange = this.props.handleChange;
    
//    const tag  = ud.tag;
    
    return(
      <div className="oms-tabs">
      <table>
        <tbody>
          <tr>
            <td className="oms-top">

      <form id="CalcVarForm" >
        Please enter your Calculated Variable information 
        <table>
          <tbody className="scrollContent-narrow">
          <tr>
            <th className="oms-spacing-120">&nbsp;</th>
            <td className="oms-spacing"><img src="images/spacer.png" 
                alt="space" height="5px" width="240px"/>
            </td>
          </tr>
          <tr>
            <th className="oms-spacing-120">Name (10 chars):</th>
            <td className="oms-spacing">
              <input type="hidden" name="id" value={cv.id} />            
              <input type="text" id="tag.name" name="tag.name" value={cv.tag.name} 
                     className={["oms-spacing-90","oms-fontsize-12"].join(' ')}  size="25" maxLength="10"
                     onChange={handleChange} />
            </td>
          </tr>
          <tr>
            <td className="oms-spacing-120">Active:</td>
            <td className="oms-spacing">
              <select id="tag.active" name="tag.active" value={cv.tag.active} 
                      onChange={handleChange} >
                <option value="N">N</option>
                <option value="Y">Y</option>
              </select>
            </td>
          </tr>
          <tr>
            <th className="oms-spacing-120">Description:</th>
            <td className="oms-spacing">
              <input type="text" id="tag.description" name="tag.description" value={cv.tag.description}
                     className={["oms-spacing-180","oms-fontsize-12"].join(' ')}  size="120" maxLength="120"
                     onChange={handleChange} />
            </td>
          </tr>
          <tr>
            <th className="oms-spacing-120">Definition:</th>
            <td className="oms-spacing">
              <input type="text" id="definition" name="definition" value={cv.definition}
                     className={["oms-spacing-240","oms-fontsize-12"].join(' ')}  size="120" maxLength="80"
                     onChange={handleChange} />
            </td>
          </tr>
          <tr>
            <th className="oms-spacing-120">Output Tag:</th>
            <td>
              <select name="outputTagId" id="outputTagId" value={cv.outputTagId}
                     className= {["oms-spacing-120","oms-fontsize-12"].join(' ')} 
                     onChange={handleChange}>
                {otl.map(function(n,x) {
                            return <option key={x} value={n.id}>{n.name}</option>
                        } )
                }
              </select>
            </td>
          </tr>
          <tr><th>&nbsp;</th><td>&nbsp;</td></tr>
          <tr>
            <th className="oms-spacing-120">Input Tags:</th>
            <td>
              <select multiple={true} name="inputTags" id="inputTags" value={cv.inputTags} size={10}
                     className= {["oms-spacing-120","oms-fontsize-12"].join(' ')} 
                     onChange={handleChange}>
                {tagList.map(function(n,x) {
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

export default CalcVarForm;
