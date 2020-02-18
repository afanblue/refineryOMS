/*************************************************************************
 * DIForm.js
 * Copyright (C) 2018  Laboratorio de Lobo Azul
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 ***********************************************************************/
/* eslint-env node, browser, es6 */

import React, {Component} from 'react';
import PropTypes          from 'prop-types';

import {Stage, Layer} from 'react-konva';

import SiteImage from '../SiteImage.js';
import {IMAGEHEIGHT, IMAGEWIDTH} from '../../../Parameters.js';


class DIForm extends Component {
  constructor(props) {
    super(props);
    this.state = {  };
  }

  static get propTypes() {
      return {
          di: PropTypes.object,
          alarmCode: PropTypes.string,
          alarmState: PropTypes.string,
          histTypeCode: PropTypes.string,
          scanInt: PropTypes.number,
          scanOffset: PropTypes.number,
          tag: PropTypes.object,
          active: PropTypes.string,
          c1Lat: PropTypes.number,
          c1Long: PropTypes.number,
          c2Lat: PropTypes.number,
          c2Long: PropTypes.number,
          description: PropTypes.string,
          name: PropTypes.string,
          tagId: PropTypes.number,
          valueView: PropTypes.any,
          valueViews: PropTypes.any,
          histTypes: PropTypes.any,
          diCopy: PropTypes.func,
          diUpdate: PropTypes.func,
          fieldChange: PropTypes.func,
          handleMouseUp: PropTypes.func,
          handleQuit: PropTypes.func
      }
  }

  render() {
    const di = this.props.di;
//    const diData = this.props.diData;
    const histTypes = this.props.histTypes;
    const views = this.props.valueViews;
//    const site  = this.props.siteLoc;
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
                    alt="" height="5px" width="180px"/></td>
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
