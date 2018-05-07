import React, {Component} from 'react';
import {Stage, Layer} from 'react-konva';

import SiteImage from '../SiteImage.js';
import {IMAGEHEIGHT, IMAGEWIDTH} from '../../../Parameters.js';


class DIForm extends Component {
  constructor(props) {
    super(props);
    console.log( "DIForm: " + props.stage );
    this.state = {  };
  }

  render() {
    const di = this.props.di;
    const diData = this.props.diData;
    const histTypes = diData.histTypes;
    const views = diData.views;
    const diUpdate = this.props.diUpdate;
    const diCopy = this.props.diCopy;
    const fieldChange = this.props.fieldChange;
    const handleQuit = this.props.handleQuit;
    return(
      <div className="oms-tabs">
        <table>
          <tbody>
            <tr>
              <td className="oms-top">
        <form id="diForm" >
          Please enter your digital input information 
          <table>
            <tbody className="scrollContent-narrow">
              <tr>
                <th className="oms-spacing-90">&nbsp;</th>
                <td className="oms-spacing"><img src="images/spacer.png" 
                    alt="space" height="5px" width="180px"/></td>
              </tr>
              <tr>
                <th className="oms-spacing-90">DI name:</th>
                <td className="oms-spacing">
                  <input type="hidden" name="tagId" value={di.tagId} />
                  <input type="text" id="tag.name" name="tag.name" value={di.tag.name} 
                         className={["oms-spacing-80","oms-fontsize-12"].join(' ')} size="10" maxLength="10"
                         onChange={fieldChange} />
                </td>
              </tr>
              <tr>
                <th className="oms-spacing-90">Description:</th>
                <td className="oms-spacing">
                  <input type="text" id="tag.description" name="tag.description" value={di.tag.description}
                         className={["oms-spacing-240","oms-fontsize-12"].join(' ')} size="120" maxLength="120"
                         onChange={fieldChange} />
                </td>
              </tr>
            
              <tr>
                <td className="oms-spacing-90">Active:</td>
                <td className="oms-spacing">
                  <select id="active" name="active" value={di.tag.active} 
                          className={["oms-spacing-100","oms-fontsize-12"].join(' ')}
                          onChange={fieldChange} >
                    <option value="N">N</option>
                    <option value="Y">Y</option>
                  </select>
                </td>
              </tr>

          <tr>
            <td className="oms-spacing-90">ScanInterval:</td>
            <td className={["oms-spacing-180","oms-fontsize-12"].join(' ')}>
              <input type="text" id="scanInt" name="scanInt" value={di.scanInt}
                      onChange={fieldChange} maxLength="2" size="5"/>
              </td>
          </tr>
          <tr>            
            <td className="oms-spacing-90">ScanOffset:</td>
            <td className={["oms-spacing-180","oms-fontsize-12"].join(' ')}>
              <input type="text" id="scanOffset" name="scanOffset" value={di.scanOffset}
                      onChange={fieldChange} maxLength="2" size="5"/>
            </td>
          </tr>
          <tr>
            <td className="oms-spacing-90">Alarm State:</td>
            <td className={["oms-spacing-180","oms-fontsize-12"].join(' ')}>
              <input type="text" id="alarmState" name="alarmState" value={di.alarmState}
                      onChange={fieldChange} maxLength="8" size="10"/>
            </td>
          </tr>
          <tr>
            <td className="oms-spacing-90">Alarm Code:</td>
            <td className={["oms-spacing-180","oms-fontsize-12"].join(' ')}>
            <input type="text" id="alarmCode" name="alarmCode" value={di.alarmCode}
                    onChange={fieldChange} maxLength="9" size="10"/>
            </td>
          </tr>
          <tr>
            <td className="oms-spacing-90">Hist Type:</td>
            <td >
              <select id="histTypeCode" name="histTypeCode" value={di.histTypeCode}
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
            <td className="oms-spacing-90">Value View:</td>
            <td className={["oms-spacing-180","oms-fontsize-12"].join(' ')}>
              <select id="valueView" name="valueView" value={di.valueView}
                      onChange={fieldChange}>
                { views.map( 
                  function(n,x){
                    return <option key={x} value={n}>{n}</option>
                  } )
                }                
              </select>
            </td>
          </tr>
  
              <tr>
                <th className="oms-spacing-90" >Corners (NW)</th>
                <td className="oms-spacing">
                  <input type="text" id="tag.c1Lat" name="tag.c1Lat" value={di.tag.c1Lat} 
                         className={["oms-spacing-90","oms-fontsize-12"].join(' ')}
                         onChange={fieldChange} />
                  &nbsp;
                  <input type="text" id="tag.c1Long" name="tag.c1Long" value={di.tag.c1Long} 
                         className={["oms-spacing-90","oms-fontsize-12"].join(' ')}
                         onChange={fieldChange} />
                </td>
              </tr>
              <tr>
                <td className="oms-spacing-90" >&nbsp;&nbsp;&nbsp;(SE)</td>
                <td>
                  <input type="text" id="tag.c2Lat" name="tag.c2Lat" value={di.tag.c2Lat} 
                         className={["oms-spacing-90","oms-fontsize-12"].join(' ')}
                         onChange={fieldChange} />
                  &nbsp;
                  <input type="text" id="tag.c2Long" name="tag.c2Long" value={di.tag.c2Long} 
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
                         value=" Quit " className="oms-spacing"
                         onClick={(e) => {handleQuit(e)}} />
                  &nbsp;<input type="submit" id="submitForm" name="submitForm" 
                               value="Submit" className="oms-spacing"
                               onClick={(e) => {diUpdate(e)}}/>
                  &nbsp;<input type="submit" id="submitForm" name="submitForm" 
                               value=" Copy " className="oms-spacing"
                               onClick={(e) => {diCopy(e)}}/>
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

export default DIForm;
