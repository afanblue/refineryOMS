/*************************************************************************
 * SchematicForm.js
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

import { Stage, Layer, Rect } from 'react-konva';
import {IMAGEHEIGHT, IMAGEWIDTH} from '../../../Parameters.js';
import Scm3WayValve     from '../objects/Scm3WayValve.js';
import ScmGauge         from '../objects/ScmGauge.js';
import ScmPump          from '../objects/ScmPump.js';
import ScmPipe          from '../objects/ScmPipe.js';
import ScmProcessValue  from '../objects/ScmProcessValue.js';
import ScmRefUnit       from '../objects/ScmRefUnit.js';
import ScmShip          from '../objects/ScmShip.js';
import ScmTank          from '../objects/ScmTank.js';
import ScmText          from '../objects/ScmText.js';
import ScmValve         from '../objects/ScmValve.js';


class SchematicForm extends Component {
  constructor(props) {
    super(props);
    this.state = {  };
  }

  static get propTypes() {
      return {
          schematic: PropTypes.object,
          childTags: PropTypes.array,
          sco: PropTypes.object,
          typeList: PropTypes.array,
          inpTags: PropTypes.array,
          outTags: PropTypes.array,
          outTagId: PropTypes.number,
          misc: PropTypes.string,
          id: PropTypes.number,
          name: PropTypes.string,
          description: PropTypes.string,
          active: PropTypes.string,
          inpTagId: PropTypes.number,
          fieldChange: PropTypes.func,
          handleQuit: PropTypes.func,
          handleAdd: PropTypes.func,
          handleMod: PropTypes.func,
          schematicUpdate: PropTypes.func,
          schematicCopy: PropTypes.func,
          handleMouseUp: PropTypes.func
      }
  }

  setPositionLocation( sco, fc ) {
    if( sco.misc !== 'P' ) {
       return (
<div>
  <tr>
    <td>
      <img src="../../images/spacer.png" alt="" height="1px" width="10px"/>
      NW Corner:
    </td>
  </tr>
  <tr>
    <td>
      <img src="../../images/spacer.png" alt="" height="1px" width="10px"/>
      <input type="text" id="sco.c1Lat" name="sco.c1Lat" value={sco.c1Lat}
             className={["oms-spacing-50","oms-fontsize-12"].join(' ')}
             size="10" maxLength="5" onChange={fc} />
      <img src="../../images/spacer.png" alt="" height="1px" width="10px"/>
      <input type="text" id="sco.c1Long" name="sco.c1Long" value={sco.c1Long}
             className={["oms-spacing-50","oms-fontsize-12"].join(' ')}
             size="10" maxLength="10" onChange={fc} />
    </td>
  </tr>
  <tr>
    <td>
      <img src="../../images/spacer.png" alt="" height="1px" width="10px"/>
      SE Corner:
    </td>
  </tr>
  <tr>
    <td>
      <img src="../../images/spacer.png" alt="" height="1px" width="10px"/>
      <input type="text" id="sco.c2Lat" name="sco.c2Lat" value={sco.c2Lat}
             className={["oms-spacing-50","oms-fontsize-12"].join(' ')}
             size="10" maxLength="10" onChange={fc} />
      <img src="../../images/spacer.png" alt="" height="1px" width="10px"/>
      <input type="text" id="sco.c2Long" name="sco.c2Long" value={sco.c2Long}
             className={["oms-spacing-50","oms-fontsize-12"].join(' ')}
             size="10" maxLength="10" onChange={fc} />
    </td>
  </tr>
</div>
              );
    } else {
      return(
<div>
  <tr>
    <th className="oms-spacing-180">
      <img src="../../images/spacer.png" alt="" height="1px" width="10px"/>
      End Points:
    </th>
  </tr>
  <tr>
    <td className="oms-spacing-180">
      <img src="../../images/spacer.png" alt="" height="1px" width="10px"/>
      <textarea rows="5" cols="15" id="sco.vtxList" name="sco.vtxList" value={sco.vtxList}
                onChange={fc} />
    </td>
  </tr>
</div>
      );
    }
  }

  render() {
    var scm      = this.props.schematic;
    var scoList  = scm.childTags;
    if( scoList === null ) {
      scoList = [];
    }
    var sco      = this.props.sco;

    let blankItem = {};
    blankItem.id = null;
    blankItem.name = '---';

    var typeList = this.props.typeList.slice();
    typeList.unshift(blankItem);
    var inpTags  = this.props.inpTags.slice();
    inpTags.unshift(blankItem);
    var outTags  = this.props.outTags.slice();
    outTags.unshift(blankItem);
//    const xd     = this.props.schematicData;
    const fc     = this.props.fieldChange;
    const hq     = this.props.handleQuit;
    const ha     = this.props.handleAdd;
    const hm     = this.props.handleMod;
    const su     = this.props.schematicUpdate;
    const sc     = this.props.schematicCopy;
    const mu     = this.props.handleMouseUp;

    let outSelect = <select id="sco.outTagId" name="sco.outTagId" value={sco.outTagId} onChange={fc}> { outTags.map( function(n,x){ return <option key={x} value={n.id}>{n.name}</option> } ) } </select>
    if( (sco.misc === "G")  || (sco.misc === "P")  || (sco.misc === "PV") || (sco.misc === "RU") ||
        (sco.misc === "SH") || (sco.misc === "TK") || (sco.misc === "TX") ) {
      outSelect = "no output required";
    }

    let positionLocation = this.setPositionLocation(sco, fc);

    return(
      <div className="oms-tabs">
        <table>
          <tbody>
            <tr>
              <td className="oms-top">
        <form id="schematicForm" >
          Please enter your schematic information
          <table>
            <tbody>
              <tr>
                <td>
                  <table>
                    <tbody>
                      <tr>
                        <th className="oms-spacing-80">Name:</th>
                        <th className="oms-spacing-240">Description:</th>
                        <th className="oms-spacing-90">Status:</th>
                      </tr>
                      <tr>
                        <td className="oms-spacing">
                          <input type="hidden" name="id" value={scm.id} />
                          <input type="text" id="name" name="name" value={scm.name}
                                 className={["oms-spacing-80","oms-fontsize-12"].join(' ')}
                                 size="10" maxLength="10" onChange={fc} />
                        </td>
                        <td className="oms-spacing">
                          <input type="text" id="description" name="description" value={scm.description}
                                 className={["oms-spacing-240","oms-fontsize-12"].join(' ')}
                                 size="120" maxLength="120" onChange={fc} />
                        </td>
                        <td className="oms-spacing">
                          <select id="active" name="active" value={scm.active}
                                  onChange={fc} >
                            <option value="N">N</option>
                            <option value="Y">Y</option>
                          </select>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
              <tr>
                <td>
                  <table>
                    <tbody>
                      <tr>
                        <td>
                    <Stage height={IMAGEHEIGHT} width={IMAGEWIDTH}>
                      <Layer>
                        <Rect height={IMAGEHEIGHT}
                              width={IMAGEWIDTH}
                              stroke={"red"}
                              strokeWidth={1}
                              onMouseUp={mu} />
                        { scoList.map(
                          function(n,z) {
                            let y = n.c1Lat;
                            let x = n.c1Long;
                            let height = n.c2Lat - n.c1Lat;
                            let width  = n.c2Long - n.c1Long;
                            let pts = [];
                            if( n.misc === 'P' ) {
//                              pts = [0,0,width,height];
                              if( n.vtxList===null || n.vtxList===undefined || n.vtxList.length===0 ) {
                                pts = [x,y,n.c2Long,n.c2Lat];
                              } else {
                                let vtl = n.vtxList;
                                if( "object" === typeof n.vtxList ) { vtl = vtl.join(""); }
                                vtl = vtl.replace(",,",",");
                                let vtx = vtl;
                                if( "string" === typeof vtl ) { vtx = vtl.split(/\n/) }
                                vtx.map( function(nv,zv){
                                  let vl = nv.replace( /\n/gi, "");
                                  let lpt = vl.split(",");
                                  pts = pts.concat([lpt[1],lpt[0]]);
                                  return pts;
                                } );
                              }
                            }
                            let tx = n.childValue;
                            let mx = (n.childTagMax===undefined||n.childTagMax===null)?100:n.childTagMax;
                            let zero = (n.childTagZero===undefined||n.childTagZero===null)?0:n.childTagZero;
                            switch( n.misc ) {
                              case "3VB":
                                return <Scm3WayValve key={z} x={x} y={y} width={width} height={height}
                                                     value={tx} max={mx} zero={zero} fill={"green"}
                                                     orient={"bottom"} />
                              case "3VL":
                                return <Scm3WayValve key={z} x={x} y={y} width={width} height={height}
                                                     value={tx} max={mx} zero={zero} fill={"green"}
                                                     orient={"left"} />
                              case "3VR":
                                return <Scm3WayValve key={z} x={x} y={y} width={width} height={height}
                                                     value={tx} max={mx} zero={zero} fill={"green"}
                                                     orient={"right"} />
                              case "3VT":
                                return <Scm3WayValve key={z} x={x} y={y} width={width} height={height}
                                                     value={tx} max={mx} zero={zero} fill={"green"}
                                                     orient={"top"} />
                              case "G":
                                return <ScmGauge key={z} x={x} y={y} width={width} height={height}
                                                 value={tx} max={mx} zero={zero} fill={"green"} />
                              case "P":
                                return <ScmPipe key={z} x={x} y={y} points={pts} strokeWidth={3}
                                                value={tx} max={mx} zero={zero}  />
                              case "PL":
                                return <ScmPump key={z} x={x} y={y} width={width} height={height}
                                                value={tx} max={mx} zero={zero} fill={"green"} orient={"PL"} />
                              case "PR":
                                return <ScmPump key={z} x={x} y={y} width={width} height={height}
                                                value={tx} max={mx} zero={zero} fill={"green"} orient={"PR"} />
                              case "PT":
                                return <ScmPump key={z} x={x} y={y} width={width} height={height}
                                                value={tx} max={mx} zero={zero} fill={"green"}  orient={"PT"}/>
                              case "PB":
                                return <ScmPump key={z} x={x} y={y} width={width} height={height}
                                                value={tx} max={mx} zero={zero} fill={"green"}  orient={"PB"}/>
                              case "PV":
                                return <ScmProcessValue key={z} x={x} y={y} width={width} height={height} text={tx}
                                                strokeWidth={1} fontSize={14}/>
                              case "RU":
                                return <ScmRefUnit key={z} x={x} y={y} width={width} height={height}
                                                value={tx} max={mx} zero={zero}  />
                              case "SH":
                                return <ScmShip key={z} x={x} y={y} width={width} height={height}
                                                 value={tx} max={mx} zero={zero} fill={"green"} />
                              case "TK":
                                return <ScmTank key={z} x={x} y={y} width={width} height={height}
                                                value={tx} max={mx} zero={zero} fill={"red"} />
                              case "TX":
                                return <ScmText key={z} x={x} y={y} width={width} height={height} text={tx}
                                                strokeWidth={1} fontSize={14}/>
                              case "VH":
                                return <ScmValve key={z} x={x} y={y} width={width} height={height}
                                                value={tx} max={mx} zero={zero} fill={"green"} orient={"horizontal"} />
                              case "VV":
                                return <ScmValve key={z} x={x} y={y} width={width} height={height}
                                                value={tx} max={mx} zero={zero} fill={"green"} orient={"vertical"} />
                              default:
                                return null
                            }
                          } )
                        }
                      </Layer>
                    </Stage>
                        </td>
                        <td className="oms-top">
                          <table className="oms-top">
                            <tbody>
                              <tr>
                                <td>
                                  <img src="../../images/spacer.png" alt="" height="1px" width="10px"/>
                                  Objects:
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <img src="../../images/spacer.png" alt="" height="1px" width="10px"/>
                                  <select id="sco.id" name="sco.id" value={sco.id}
                                          onChange={fc} >
                                    { scoList.map(
                                      function(n,x){
                                        return <option key={x} value={n.id}>{n.name}</option>
                                      } )
                                    }
                                  </select>
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <img src="../../images/spacer.png" alt="" height="1px" width="10px"/>
                                  Object Name:
                                </td>
                              </tr>
                              <tr><td>
                                <img src="../../images/spacer.png" alt="" height="1px" width="10px"/>
                                <input type="hidden" name="id" value={sco.id} />
                                <input type="text" id="sco.name" name="sco.name" value={sco.name}
                                       className={["oms-spacing-80","oms-fontsize-12"].join(' ')}
                                       size="10" maxLength="10" onChange={fc} />
                              </td></tr>
                              <tr>
                                <td>
                                  <img src="../../images/spacer.png" alt="" height="1px" width="10px"/>
                                  Description:
                                </td>
                              </tr>
                              <tr><td>
                                <img src="../../images/spacer.png" alt="" height="1px" width="10px"/>
                                <input type="text" id="sco.description" name="sco.description" value={sco.description}
                                       className={["oms-spacing-120","oms-fontsize-12"].join(' ')}
                                       size="20" maxLength="48" onChange={fc} />
                              </td></tr>
                              <tr>
                                <td>
                                  <img src="../../images/spacer.png" alt="" height="1px" width="10px"/>
                                  Object Type:
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <select id="sco.misc" name="sco.misc" value={sco.misc}
                                          onChange={fc}>
                                    { typeList.map(
                                      function(n,x){
                                        return <option key={x} value={n.code}>{n.code} ({n.name})</option>
                                      } )
                                    }
                                  </select>
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <img src="../../images/spacer.png" alt="" height="1px" width="10px"/>
                                  Input Tag:
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <img src="../../images/spacer.png" alt="" height="1px" width="10px"/>
                                  <select id="sco.inpTagId" name="sco.inpTagId" value={sco.inpTagId}
                                          onChange={fc}>
                                    { inpTags.map(
                                      function(n,x){
                                        return <option key={x} value={n.id}>{n.name}</option>
                                      } )
                                    }
                                  </select>
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <img src="../../images/spacer.png" alt="" height="1px" width="10px"/>
                                  Output Tag:
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <img src="../../images/spacer.png" alt="" height="1px" width="10px"/>
                                  {outSelect}
                                </td>
                              </tr>
                              {positionLocation}
                              <tr>
                                <td>
                                  <img src="../../images/spacer.png" alt="" height="25px" width="20px"/>
                                  <input type="submit" id="addItem"  name="addItem"
                                         value=" Add " className="oms-spacing"
                                         onClick={(e) => {ha(e)}} />
                                  <input type="submit" id="modItem"  name="modItem"
                                         value=" Modify " className="oms-spacing"
                                         onClick={(e) => {hm(e)}} />
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
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
                         onClick={(e) => {hq(e)}} />
                  &nbsp;<input type="submit" id="submitForm" name="submitForm"
                               value=" Submit " className="oms-spacing"
                               onClick={(e) => {su(e)}}/>
                  &nbsp;<input type="submit" id="copyForm" name="copyForm"
                               value=" Copy " className="oms-spacing"
                               onClick={(e) => {sc(e)}}/>
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

export default SchematicForm;
