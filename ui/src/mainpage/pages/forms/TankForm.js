import React, {Component} from 'react';
import {IMAGEHEIGHT, IMAGEWIDTH} from '../../../Parameters.js';
import {Stage, Layer} from 'react-konva';

import SiteImage from '../SiteImage.js';
import Tank      from '../displays/Tank.js';


class TankForm extends Component {
  constructor(props) {
    super(props);
    console.log( "TankForm: " + props.stage );
    this.state = {  };
  }

  scaleX( tkLong, tLong, xScale ) {
    return Math.round(xScale * (tkLong - tLong));
  }

  scaleY( tkLat, tLat, yScale ) {
    return Math.round(yScale * (tkLat - tLat));
  }

  render() {
    const td = this.props.tankData;
    const fieldChange = this.props.fieldChange;
    const ct = td.contentTypes;
    const tl = td.temperatures;
    const ll = td.levels;
    const site = td.siteLocation;
    const tag = td.tag;
    var xDivisor = site.c2Long-site.c1Long;
    var xScale = IMAGEWIDTH / xDivisor;
    var yDivisor = site.c2Lat-site.c1Lat;
    var yScale = IMAGEHEIGHT / yDivisor;
    var style = "empty";

    var xnw = this.scaleX( tag.c1Long, site.c1Long, xScale);
    var wid = this.scaleX( tag.c2Long, site.c1Long, xScale) - xnw;
    var ynw = this.scaleY( tag.c1Lat,  site.c1Lat,  yScale);
    var ht  = this.scaleY( tag.c2Lat,  site.c1Lat,  yScale) - ynw;
    var tkHt = 0;
    var color = "red";

    return(
      <div className="oms-tabs">
        <table>
          <tbody>
            <tr>
              <td className="oms-top">
        <form id="tankForm" >
          Please enter your tank information 
          <table>
            <tbody className="scrollContent-narrow">
              <tr>
                <th className="oms-spacing-90">&nbsp;</th>
                <td className="oms-spacing"><img src="images/spacer.png" 
                    alt="space" height="5px" width="180px"/></td>
              </tr>
              <tr>
                <th className="oms-spacing-90">Field name:</th>
                <td className="oms-spacing">
                  <input type="hidden" name="id" value={this.props.tank.id} />
                  <input type="text" id="tag.name" name="tag.name" value={this.props.tank.tag.name} 
                         className={["oms-spacing-80","oms-fontsize-12"].join(' ')} size="10" maxLength="10"
                         onChange={fieldChange} />
                </td>
              </tr>
              <tr>
                <th className="oms-spacing-90">Description:</th>
                <td className="oms-spacing">
                  <input type="text" id="tag.description" name="tag.description" value={this.props.tank.tag.description}
                         className={["oms-spacing-240","oms-fontsize-12"].join(' ')} size="120" maxLength="120"
                         onChange={fieldChange} />
                </td>
              </tr>
            
              <tr>
                <td className="oms-spacing-90">Active:</td>
                <td className="oms-spacing">
                  <select id="active" name="active" value={this.props.tank.tag.active} 
                          onChange={fieldChange} >
                    <option value="N">N</option>
                    <option value="Y">Y</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td className="oms-spacing-90">Contents:</td>
                <td className="oms-spacing">
                  <select id="contentTypeCode" name="contentTypeCode" value={this.props.tank.contentTypeCode}
                          onChange={fieldChange} >
                    { ct.map( 
                      function(n,x){
                        return <option key={x} value={n.code}>{n.name}</option>
                      } )
                    }
                  </select>
                </td>
              </tr>
              <tr>
                <th className="oms-spacing-90">Corners (NW)</th>
                <td className="oms-spacing">
                  <input type="text" id="tag.c1Lat" name="tag.c1Lat" value={this.props.tank.tag.c1Lat} 
                         className={["oms-spacing-90","oms-fontsize-12"].join(' ')}
                         onChange={fieldChange} />
                  &nbsp;
                  <input type="text" id="tag.c1Long" name="tag.c1Long" value={this.props.tank.tag.c1Long} 
                         className={["oms-spacing-90","oms-fontsize-12"].join(' ')}
                         onChange={fieldChange} />
                </td>
              </tr>
              <tr>
                <td className="oms-spacing-90">&nbsp;&nbsp;&nbsp;(SE)</td>
                <td>
                  <input type="text" id="tag.c2Lat" name="tag.c2Lat" value={this.props.tank.tag.c2Lat} 
                         className={["oms-spacing-90","oms-fontsize-12"].join(' ')}
                         onChange={fieldChange} />
                  &nbsp;
                  <input type="text" id="tag.c2Long" name="tag.c2Long" value={this.props.tank.tag.c2Long} 
                         className={["oms-spacing-90","oms-fontsize-12"].join(' ')}
                         onChange={fieldChange} />
                </td>
              </tr>
              <tr>
                <td className="oms-spacing-90">Density:</td>
                <td className="oms-spacing">
                  <input type="text" id="density" name="density" value={this.props.tank.density} maxLength="10"
                         className={["oms-spacing-90","oms-fontsize-12"].join(' ')} 
                         onChange={fieldChange} />
                </td>
              </tr>
              <tr>
                <td className="oms-spacing-90">Units:</td>
                <td className="oms-spacing">
                  <select id="units" name="units" value={this.props.tank.units}
                          onChange={fieldChange}>
                    <option value="f">f</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td className="oms-spacing-90">Height:</td>
                <td className="oms-spacing">
                  <input type="text" id="height" name="height" value={this.props.tank.height} size="8"
                         className={["oms-spacing-90","oms-fontsize-12"].join(' ')} 
                         onChange={fieldChange} />
                </td>
              </tr>
              <tr>
                <td className="oms-spacing-90">Diameter:</td>
                <td className="oms-spacing">
                  <input type="text" id="diameter" name="diameter" value={this.props.tank.diameter} size="8"
                         className={["oms-spacing-90","oms-fontsize-12"].join(' ')} 
                         onChange={fieldChange} />
                </td>
              </tr>
              <tr>
                <td className="oms-spacing-90">Level:</td>
                <td className="oms-spacing">
                  <select id="levelId" name="levelId" value={this.props.tank.levelId}
                          onChange={fieldChange} >
                    { ll.map( 
                      function(n,x){
                        return <option key={x} value={n.id}>{n.name}</option>
                      } )
                    }
                  </select>
                </td>
              </tr>
              <tr>
                <td className="oms-spacing-90">Temperature:</td>
                <td className="oms-spacing">
                  <select id="tempId" name="tempId" value={this.props.tank.tempId}
                          onChange={fieldChange} >
                    { tl.map( 
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
              <tr className="oms-spacing">
                <td>
                  <input type="submit" id="closeForm"  name="closeForm"  
                         value="Quit" className="oms-spacing"
                         onClick={(e) => {this.props.handleQuit(e)}} />
                  &nbsp;<input type="submit" id="submitForm" name="submitForm" 
                               value="Submit" className="oms-spacing"
                               onClick={(e) => {this.props.tankUpdate(e)}}/>
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
                    <Tank xp = {xnw} yp = {ynw}
                          width = {wid}   height = {ht}
                          tankHeight = {tkHt}
                          tankType = {style} color={color} />
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

export default TankForm;
