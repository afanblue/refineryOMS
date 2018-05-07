import React, {Component} from 'react';
import {Stage, Layer} from 'react-konva';

import SiteImage from '../SiteImage.js';
import {IMAGEHEIGHT, IMAGEWIDTH} from '../../../Parameters.js';


class AIForm extends Component {
  constructor(props) {
    super(props);
    console.log( "AIForm: " + props.stage );
    this.state = {  };
  }

  render() {
    const ai = this.props.ai;
    const aiData = this.props.aiData;
    const aitypes = aiData.aiTypes;
    const histTypes = aiData.histTypes;
    const aiUpdate = this.props.aiUpdate;
    const fieldChange = this.props.fieldChange;
    const handleQuit = this.props.handleQuit;
    return(
      <div className="oms-tabs">
        <table>
          <tbody>
            <tr>
              <td className="oms-top">
        <form id="aiForm" >
          Please enter your analog input information 
          <table>
            <tbody className="scrollContent-narrow">
              <tr>
                <th className="oms-spacing-90">&nbsp;</th>
                <td className="oms-spacing-180"><img src="images/spacer.png" 
                    alt="space" height="5px" width="180px"/></td>
              </tr>
              <tr>
                <th className="oms-spacing-90">AI name:</th>
                <td className="oms-spacing-180">
                  <input type="hidden" name="tagId" value={ai.tagId} />
                  <input type="text" id="tag.name" name="tag.name" value={ai.tag.name} 
                         className={["oms-spacing-80","oms-fontsize-12"].join(' ')} size="10" maxLength="10"
                         onChange={fieldChange} />
                </td>
              </tr>
              <tr>
                <th className="oms-spacing-90">Description:</th>
                <td className="oms-spacing-180">
                  <input type="text" id="tag.description" name="tag.description" value={ai.tag.description}
                         className={["oms-spacing-180","oms-fontsize-12"].join(' ')} size="120" maxLength="120"
                         onChange={fieldChange} />
                </td>
              </tr>
            
              <tr>
                <td className="oms-spacing-90">Active:</td>
                <td className="oms-spacing-180">
                  <select id="active" name="active" value={ai.tag.active} 
                          className={["oms-spacing-180","oms-fontsize-12"].join(' ')}
                          onChange={fieldChange} >
                    <option value="N">N</option>
                    <option value="Y">Y</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td className="oms-spacing-90">Contents:</td>
                <td className="oms-spacing-180">
                  <select id="typeCode" name="typeCode" value={ai.typeCode}
                          className={["oms-spacing-180","oms-fontsize-12"].join(' ')}
                          onChange={fieldChange} >
                    { aitypes.map( 
                      function(n,x){
                        return <option key={x} value={n.code}>{n.name}</option>
                      } )
                    }
                  </select>
                </td>
              </tr>
 
          <tr>
            <td className="oms-spacing-90">ScanInterval:</td>
            <td className={["oms-spacing-180","oms-fontsize-12"].join(' ')}>
              <input type="text" id="scanInt" name="scanInt" value={ai.scanInt}
                      onChange={fieldChange} maxLength="2" size="5"/>
              </td>
          </tr>
          <tr>            
            <td className="oms-spacing-90">ScanOffset:</td>
            <td className={["oms-spacing-180","oms-fontsize-12"].join(' ')}>
              <input type="text" id="scanOffset" name="scanOffset" value={ai.scanOffset}
                      onChange={fieldChange} maxLength="2" size="5"/>
            </td>
          </tr>
          <tr>
            <td className="oms-spacing-90">Zero Value:</td>
            <td className={["oms-spacing-180","oms-fontsize-12"].join(' ')}>
              <input type="text" id="zeroValue" name="zeroValue" value={ai.zeroValue}
                      onChange={fieldChange} maxLength="8" size="10"/>
            </td>
          </tr>
          <tr>
            <td className="oms-spacing-90">Max Value:</td>
            <td className={["oms-spacing-180","oms-fontsize-12"].join(' ')}>
            <input type="text" id="maxValue" name="maxValue" value={ai.maxValue}
                    onChange={fieldChange} maxLength="9" size="10"/>
            </td>
          </tr>
          <tr>
            <td className="oms-spacing-90">Hist Type:</td>
            <td >
              <select id="histTypeCode" name="histTypeCode" value={ai.histTypeCode}
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
              <input type="text" id="percent" name="percent" value={ai.percent} 
                     onChange={fieldChange} maxLength="2" size="5"/>
            </td>
          </tr>
  
              <tr>
                <th className="oms-spacing-90" >Corners (NW)</th>
                <td className="oms-spacing-180">
                  <input type="text" id="tag.c1Lat" name="tag.c1Lat" value={ai.tag.c1Lat} 
                         className={["oms-spacing","oms-fontsize-12"].join(' ')}
                         onChange={fieldChange} maxLength="11" size="10" />
                  &nbsp;
                  <input type="text" id="tag.c1Long" name="tag.c1Long" value={ai.tag.c1Long} 
                         className={["oms-spacing","oms-fontsize-12"].join(' ')}
                         onChange={fieldChange}  maxLength="11" size="10" />
                </td>
              </tr>
              <tr>
                <td className="oms-spacing-90" >&nbsp;&nbsp;&nbsp;(SE)</td>
                <td className={["oms-spacing-180","oms-fontsize-12"].join(' ')}>
                  <input type="text" id="tag.c2Lat" name="tag.c2Lat" value={ai.tag.c2Lat}
                         className={["oms-spacing","oms-fontsize-12"].join(' ')} 
                         onChange={fieldChange} maxLength="11" size="10" />
                  &nbsp;
                  <input type="text" id="tag.c2Long" name="tag.c2Long" value={ai.tag.c2Long} 
                         className={["oms-spacing","oms-fontsize-12"].join(' ')}
                         onChange={fieldChange}  maxLength="11" size="10" />
                </td>
              </tr>
              <tr>
                <td className="oms-spacing-90">&nbsp;</td>
                <td className="oms-spacing-180">
                  HH: <input type="text" id="hh" name="hh" value={ai.hh} size="8"
                         className={["oms-spacing-90","oms-fontsize-12"].join(' ')} 
                         onChange={fieldChange} />
                </td>
              </tr>
              <tr>
                <td className="oms-spacing-90">Alarm Limits:</td>
                <td className="oms-spacing-180">
                  HI: <input type="text" id="hi" name="hi" value={ai.hi} size="8"
                         className={["oms-spacing-90","oms-fontsize-12"].join(' ')} 
                         onChange={fieldChange} />
                </td>
              </tr>
              <tr>
                <td className="oms-spacing-90"></td>
                <td className="oms-spacing-180">
                  LO: <input type="text" id="lo" name="lo" value={ai.lo} size="8"
                         className={["oms-spacing-90","oms-fontsize-12"].join(' ')} 
                         onChange={fieldChange} />
                </td>
              </tr>
              <tr>
                <td className="oms-spacing-90"></td>
                <td className="oms-spacing-180">
                  LL: <input type="text" id="ll_id" name="ll_id" value={ai.ll} size="8"
                         className={["oms-spacing-90","oms-fontsize-12"].join(' ')} 
                         onChange={fieldChange} />
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
                               onClick={(e) => {aiUpdate(e)}}/>
                </td>
              </tr>
            </tbody>
          </table>
        </form>
  
              </td>
              <td>
                <Stage height={IMAGEHEIGHT} width={IMAGEWIDTH}>
                  <Layer>
                    <SiteImage handleMouseUp={this.props.handleMouseUp} />
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

export default AIForm;
