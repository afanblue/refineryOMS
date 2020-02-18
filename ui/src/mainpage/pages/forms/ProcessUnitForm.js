/*************************************************************************
 * ProcessUnitForm.js
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

import {Stage, Layer, Group, Rect} from 'react-konva';

import {IMAGEHEIGHT, IMAGEWIDTH} from '../../../Parameters.js';
import SiteImage from '../SiteImage.js';

class ProcessUnitForm extends Component {
  constructor(props) {
    super(props);
    this.state = {  };
  }

  static get propTypes() {
      return {
          processUnit: PropTypes.object,
          active: PropTypes.string,
          description: PropTypes.string,
          id: PropTypes.number,
          name: PropTypes.string,
          tags: PropTypes.array,
          site: PropTypes.object,
          c1Lat: PropTypes.number,
          c1Long: PropTypes.number,
          c2Lat: PropTypes.number,
          c2Long: PropTypes.number,
          fieldChange: PropTypes.func,
          handleMouseUp: PropTypes.func,
          handleQuit: PropTypes.func,
          puUpdate: PropTypes.func
      }
  }

  scaleX( tkLong, tLong, xScale ) {
    return Math.round(xScale * (tkLong - tLong));
  }

  scaleY( tkLat, tLat, yScale ) {
    return Math.round(yScale * (tkLat - tLat));
  }


  render() {
    const pu = this.props.processUnit;
    const site = this.props.site;
    const tagList = this.props.tags;
    const upd = this.props.puUpdate;
    const hq = this.props.handleQuit;
    const hm = this.props.handleMouseUp;
    const fc = this.props.fieldChange;


    var xDivisor = site.c2Long-site.c1Long;
    var xScale = IMAGEWIDTH / xDivisor;
    var yDivisor = site.c2Lat-site.c1Lat;
    var yScale = IMAGEHEIGHT / yDivisor;

    var xp = this.scaleX( pu.c1Long, site.c1Long, xScale);
    var w  = this.scaleX( pu.c2Long, site.c1Long, xScale) - xp;
    var yp = this.scaleY( pu.c1Lat,  site.c1Lat,  yScale);
    var h  = this.scaleY( pu.c2Lat,  site.c1Lat,  yScale) - yp;
    var color = "red";

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
                alt="" height="5px" width="240px"/>
            </td>
          </tr>
          <tr>
            <th className="oms-spacing-120">Name (10 chars):</th>
            <td className="oms-spacing-180">
              <input type="hidden" name="id" value={pu.id} />
              <input type="text" id="name" name="name" value={pu.name}
                     className={["oms-spacing-100","oms-fontsize-12"].join(' ')}  size="24" maxLength="10"
                     onChange={fc} />
            </td>
          </tr>
          <tr>
            <th className="oms-spacing-120">Description:</th>
            <td className="oms-spacing-180">
              <input type="text" id="description" name="description" value={pu.description}
                     className={["oms-spacing-120","oms-fontsize-12"].join(' ')}  size="120" maxLength="120"
                     onChange={fc} />
            </td>
          </tr>
          <tr>
            <td className="oms-spacing-120">Active:</td>
            <td className="oms-spacing">
              <select id="active" name="active" value={pu.active}
                      onChange={fc} >
                <option value="N">N</option>
                <option value="Y">Y</option>
              </select>
            </td>
          </tr>
          <tr>
            <th className="oms-spacing-120">NW Corner:</th>
            <td className="oms-spacing-180">
              <input type="text" id="c1Lat" name="c1Lat" value={pu.c1Lat}
                     className={["oms-spacing-90","oms-fontsize-12"].join(' ')}  size="20" maxLength="12"
                     onChange={fc} />
              &nbsp;
              <input type="text" id="c1Long" name="c1Long" value={pu.c1Long}
                     className={["oms-spacing-90","oms-fontsize-12"].join(' ')}  size="20" maxLength="12"
                     onChange={fc} />
            </td>
          </tr>
          <tr>
            <th className="oms-spacing-120">SE Corner:</th>
            <td className="oms-spacing-180">
              <input type="text" id="c2Lat" name="c2Lat" value={pu.c2Lat}
                     className={["oms-spacing-90","oms-fontsize-12"].join(' ')}  size="20" maxLength="12"
                     onChange={fc} />
              &nbsp;
              <input type="text" id="c2Long" name="c2Long" value={pu.c2Long}
                     className={["oms-spacing-90","oms-fontsize-12"].join(' ')} size="20" maxLength="12"
                     onChange={fc} />
            </td>
          </tr>
          <tr>
            <th className="oms-spacing-120">Tags in Unit:</th>
            <td>
              <select multiple={true} name="tags" id="tags" value={pu.tags} size={10}
                     className= {["oms-spacing-120","oms-fontsize-12"].join(' ')}
                     onChange={fc}>
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
                           value="Quit" onClick={(e) => {hq(e)}}  />
              &nbsp;<input type="submit" id="submitForm" name="submitForm"
                           value="Submit" onClick={(e) => {upd(e)}} />
            </td>
          </tr>
          </tbody>
        </table>
      </form>

            </td>
            <td>
              <Stage height={IMAGEHEIGHT} width={IMAGEWIDTH}>
                <Layer>
                  <Group>
                    <SiteImage handleMouseUp={hm} />
                    <Rect x={xp} y={yp} width={w} height={h} stroke={color} strokeWidth={1} />
                  </Group>
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
