import React, {Component} from 'react';
import {Stage, Layer} from 'react-konva';

import {IMAGEHEIGHT, IMAGEWIDTH} from '../../../Parameters.js';
import SiteImage from '../SiteImage.js';


class ProcessUnitForm extends Component {
  constructor(props) {
    super(props);
    console.log( "ProcessUnitForm: " + props.stage );
    this.state = {  };
  }

  render() {
    const pu = this.props.processUnit;
    const tags = pu.tags;
    const puUpdate = this.props.puUpdate;
    const tagList = this.props.returnedText.tags;
    const handleQuit = this.props.handleQuit;
    const handleMouseUp = this.props.handleMouseUp;
    const fieldChange = this.props.fieldChange;
    
    return(
      <div className="oms-tabs">
      <table>
        <tbody>
          <tr>
            <td className="oms-top">

      <form id="processUnitForm" >
        Please enter your process unit information 
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
            <td className="oms-spacing-180">
              <input type="hidden" name="id" value={pu.tag.id} />
              <input type="text" id="tag.name" name="tag.name" value={pu.tag.name} 
                     className={["oms-spacing-100","oms-fontsize-12"].join(' ')}  size="24" maxLength="10"
                     onChange={fieldChange} />
            </td>
          </tr>
          <tr>
            <th className="oms-spacing-120">Description:</th>
            <td className="oms-spacing-180">
              <input type="text" id="tag.description" name="tag.description" value={pu.tag.description}
                     className={["oms-spacing-120","oms-fontsize-12"].join(' ')}  size="120" maxLength="120"
                     onChange={fieldChange} />
            </td>
          </tr>
          <tr>
            <td className="oms-spacing-120">Active:</td>
            <td className="oms-spacing">
              <select id="active" name="active" value={pu.tag.active} 
                      onChange={fieldChange} >
                <option value="N">N</option>
                <option value="Y">Y</option>
              </select>
            </td>
          </tr>
          <tr>
            <th className="oms-spacing-120">NW Corner:</th>
            <td className="oms-spacing-180">
              <input type="text" id="tag.c1Lat" name="tag.c1Lat" value={pu.tag.c1Lat} 
                     className={["oms-spacing-90","oms-fontsize-12"].join(' ')}  size="20" maxLength="12" 
                     onChange={fieldChange} />
              &nbsp;
              <input type="text" id="tag.c1Long" name="tag.c1Long" value={pu.tag.c1Long}
                     className={["oms-spacing-90","oms-fontsize-12"].join(' ')}  size="20" maxLength="12" 
                     onChange={fieldChange} />
            </td>
          </tr>
          <tr>
            <th className="oms-spacing-120">SE Corner:</th>
            <td className="oms-spacing-180">
              <input type="text" id="tag.c2Lat" name="tag.c2Lat" value={pu.tag.c2Lat} 
                     className={["oms-spacing-90","oms-fontsize-12"].join(' ')}  size="20" maxLength="12" 
                     onChange={fieldChange} />
              &nbsp;
              <input type="text" id="tag.c2Long" name="tag.c2Long" value={pu.tag.c2Long}
                     className={["oms-spacing-90","oms-fontsize-12"].join(' ')} size="20" maxLength="12" 
                     onChange={fieldChange} />
            </td>
          </tr>
          <tr>
            <th className="oms-spacing-120">Tags in Unit:</th>
            <td>
              <select multiple={true} name="tags" id="tags" value={tags} size={10}
                     className= {["oms-spacing-120","oms-fontsize-12"].join(' ')} 
                     onChange={fieldChange}>
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
                           value="Submit" onClick={(e) => {puUpdate(e)}} />
            </td>
          </tr>
          </tbody>
        </table>
      </form>

            </td>
            <td>
              <Stage height={IMAGEHEIGHT} width={IMAGEWIDTH}>
                <Layer>
                  <SiteImage handleMouseUp={handleMouseUp} />
                </Layer>
              </Stage>
            </td>
          </tr>
        </tbody>
      </table>
      
      </div>
    );    
      
  }
  
}

export default ProcessUnitForm;
