/*************************************************************************
 * FieldForm.js
 * Copyright (C) 2018  A. E. Van Ness
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

import React, {Component} from 'react';
import {Stage, Layer, Group, Rect} from 'react-konva';
import {IMAGEHEIGHT, IMAGEWIDTH} from '../../../Parameters.js';

import Log       from '../../requests/Log.js';
import SiteImage from '../SiteImage.js';


class FieldForm extends Component {
  constructor(props) {
    super(props);
    Log.info( "FieldForm: " + props.stage );
    this.state = {  };
  }

  scaleX( tkLong, tLong, xScale ) {
    return Math.round(xScale * (tkLong - tLong));
  }

  scaleY( tkLat, tLat, yScale ) {
    return Math.round(yScale * (tkLat - tLat));
  }


  render() {
    const ud = this.props.returnedText;
    const p = ud.parents;
    const f = this.props.field;
    const fieldUpdate = this.props.fieldUpdate;
    const handleQuit = this.props.handleQuit;
    const handleMouseUp = this.props.handleMouseUp;
    const fieldChange = this.props.fieldChange;
    const tankList = this.props.returnedText.tanks;
    
    const site = ud.siteLocation;
    
    var xDivisor = site.c2Long-site.c1Long;
    var xScale = IMAGEWIDTH / xDivisor;
    var yDivisor = site.c2Lat-site.c1Lat;
    var yScale = IMAGEHEIGHT / yDivisor;

    var xp = this.scaleX( f.c1Long, site.c1Long, xScale);
    var w  = this.scaleX( f.c2Long, site.c1Long, xScale) - xp;
    var yp = this.scaleY( f.c1Lat,  site.c1Lat,  yScale);
    var h  = this.scaleY( f.c2Lat,  site.c1Lat,  yScale) - yp;
    var color = "red";

    return(
      <div className="oms-tabs">
      <table>
        <tbody>
          <tr>
            <td className="oms-top">

      <form id="FieldForm" >
        Please enter your field information 
        <table>
          <tbody className="scrollContent-narrow">
          <tr>
            <th className="oms-spacing-120">&nbsp;</th>
            <td className="oms-spacing"><img src="images/spacer.png" 
                alt="space" height="5px" width="240px"/>
            </td>
          </tr>
          <tr>
            <th className="oms-spacing-120">Field name (10 chars):</th>
            <td className="oms-spacing">
              <input type="hidden" name="id" value={f.id} />            
              <input type="text" id="name" name="name" value={f.name} 
                     className={["oms-spacing-50","oms-fontsize-12"].join(' ')}  size="10" maxLength="10"
                     onChange={fieldChange} />
            </td>
          </tr>
          <tr>
            <td className="oms-spacing-120">Active:</td>
            <td className="oms-spacing">
              <select id="active" name="active" value={f.active} 
                      onChange={fieldChange} >
                <option value="N">N</option>
                <option value="Y">Y</option>
              </select>
            </td>
          </tr>
          <tr>
            <th className="oms-spacing-120">Description:</th>
            <td className="oms-spacing">
              <input type="text" id="description" name="description" value={f.description}
                     className={["oms-spacing-120","oms-fontsize-12"].join(' ')}  size="120" maxLength="120"
                     onChange={fieldChange} />
            </td>
          </tr>
          <tr>
            <th className="oms-spacing-120">Road Image:</th>
            <td className="oms-spacing">
              <input type="text" id="roadImage" name="roadImage" value={f.roadImage}
                     className={["oms-spacing-180","oms-fontsize-12"].join(' ')}  size="120" maxLength="120"
                     onChange={fieldChange} />
            </td>
          </tr>
          <tr>
            <th className="oms-spacing-120">Satellite Image:</th>
            <td className="oms-spacing">
              <input type="text" id="satelliteImage" name="satelliteImage" value={f.satelliteImage} 
                     className={["oms-spacing-180","oms-fontsize-12"].join(' ')}  size="120" maxLength="120" 
                     onChange={fieldChange} />
            </td>
          </tr>
          <tr>
            <th className="oms-spacing-120">NW Corner:</th>
            <td className="oms-spacing-180">
              <input type="text" id="c1Lat" name="c1Lat" value={f.c1Lat} 
                     className={["oms-spacing-90","oms-fontsize-12"].join(' ')}  size="20" maxLength="12" 
                     onChange={fieldChange} />
              &nbsp;
              <input type="text" id="c1Long" name="c1Long" value={f.c1Long}
                     className={["oms-spacing-90","oms-fontsize-12"].join(' ')}  size="20" maxLength="12" 
                     onChange={fieldChange} />
            </td>
          </tr>
          <tr>
            <th className="oms-spacing-120">SE Corner:</th>
            <td className="oms-spacing-180">
              <input type="text" id="c2Lat" name="c2Lat" value={f.c2Lat} 
                     className={["oms-spacing-90","oms-fontsize-12"].join(' ')}  size="20" maxLength="12" 
                     onChange={fieldChange} />
              &nbsp;
              <input type="text" id="c2Long" name="c2Long" value={f.c2Long}
                     className={["oms-spacing-90","oms-fontsize-12"].join(' ')} size="20" maxLength="12" 
                     onChange={fieldChange} />
            </td>
          </tr>
          <tr>
            <th className="oms-spacing-120">Parent:</th>
            <td className="oms-spacing">
              <select id="parentId" name="parentId" value={f.parentId}
                      onChange={fieldChange} >
                {p.map( 
                  function(n,x){
                    return <option key={x} value={n.id}>{n.name}</option>
                  } )
                }
              </select>
            </td>
          </tr>
          <tr>
            <th className="oms-spacing-120">Tanks in Unit:</th>
            <td>
              <select multiple={true} name="childTanks" id="childTanks" value={f.childTanks} size={10}
                     className= {["oms-spacing-120","oms-fontsize-12"].join(' ')} 
                     onChange={fieldChange}>
                {tankList.map(function(n,x) {
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
                           value="Submit" onClick={(e) => {fieldUpdate(e)}} />
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
                    <SiteImage handleMouseUp={handleMouseUp} />
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

export default FieldForm;
