/*************************************************************************
 * SchematicDisplay.js
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

import React, {Component}     from 'react';
import { Stage, Layer, Rect } from 'react-konva';
import moment                 from 'moment';

import Log              from '../../requests/Log.js';

import {IMAGEHEIGHT, IMAGEWIDTH}  from '../../../Parameters.js';
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


class SchematicDisplay extends Component {
  constructor( props ) {
    super(props);
    this.state = {
      stage: props.stage,
      option: props.option,
      updateData: false,
      updateDisplay: true,
      scm: props.schematic,
      handleMouseup: props.handleMouseup
    };
  }

  static getDerivedStateFromProps(nextProps, state) {
    return state;
//    this.setState({ option: nextProps.option,
//                    scm: nextProps.schematic,
//                    handleMouseup: nextProps.handleMouseup });
  }

  render () {
    let handleMouseup = this.state.handleMouseup;
    let scm = this.props.schematic;
    let scoList = scm.childTags;
    let stkWid = 3;
    if( scm.tagTypeCode === 'XFR' ) {
      stkWid = 1;
    }

    var w = document.getElementById('contents');
    var ht = w.offsetHeight;
    var wid = w.offsetWidth;
    var rat = ht/IMAGEHEIGHT < wid/IMAGEWIDTH ? ht/IMAGEHEIGHT : wid/IMAGEWIDTH;
    rat = rat < 1 ? 1 : Math.floor(rat*1000)/1000;
	rat = 1.25;
    var scrnHt = rat * IMAGEHEIGHT;
    var scrnWid = rat * IMAGEWIDTH;
    Log.debug("schmDisp: ratio: "+rat+" - "+ht+"/"+wid);
//    var n = new Date();
    var now = moment().format('YYYY-MM-DD HH:mm:ss');
    return(
      <div>
      <h2>
        <div className={"oms-tags"}>
           <img src="./images/spacer.png" alt="" height="1px" width="100px"/>
           Schematic {scm.name} - {now}
        </div>
      </h2>
      <div>
              <Stage height={scrnHt} width={scrnWid}>
                <Layer>
                  <Rect height={scrnHt}
                        width={scrnWid}
                        stroke={"red"}
                        strokeWidth={1} />
                 { scoList.map(
                       function(n,z) {
                         let id = n.id;
                         let name = n.name;   // name of schematic object
                         let y = rat * n.c1Lat;
                         let x = rat * n.c1Long;
                         let height = rat * (n.c2Lat - n.c1Lat);
                         let width  = rat * (n.c2Long - n.c1Long);
                         let cv = n.inpValue;
                         let tx = cv;
                         let mx = n.inpMax;
                         let zero = n.inpZero;
                         let color = n.inpAlmColor;
                         let pts = [];
                         if( n.misc==="P" ) {
                           if( n.vtxList===null || n.vtxList===undefined || n.vtxList.length===0 ) {
                             pts = [x,y,rat*n.c2Long,rat*n.c2Lat];
                           } else {
                             n.vtxList.map( function(nv,zv){
//                               let vl = z.replace( /\n/gi, "");
//                               let lpt = vl.split(",");
                               pts = pts.concat([rat*nv.longitude,rat*nv.latitude]);
                               return pts;
                             } );
                           }
                           mx = 100;
                         }
                         switch( n.misc ) {
                           case "3VB":
                             return <Scm3WayValve key={z} id={id} name={name} x={x} y={y} width={width} height={height}
                                                  value={cv} max={mx} zero={zero} fill={color}
                                                  orient={"bottom"} handleMouseup={handleMouseup}/>
                           case "3VL":
                             return <Scm3WayValve key={z} id={id} name={name} x={x} y={y} width={width} height={height}
                                                  value={cv} max={mx} zero={zero} fill={color}
                                                  orient={"left"} handleMouseup={handleMouseup}/>
                           case "3VR":
                             return <Scm3WayValve key={z} id={id} name={name} x={x} y={y} width={width} height={height}
                                                  value={cv} max={mx} zero={zero} fill={color}
                                                  orient={"right"} handleMouseup={handleMouseup}/>
                           case "3VT":
                             return <Scm3WayValve key={z} id={id} name={name} x={x} y={y} width={width} height={height}
                                                  value={cv} max={mx} zero={zero} fill={color}
                                                  orient={"top"} handleMouseup={handleMouseup}/>
                           case "G":
                             return <ScmGauge key={z} id={id} name={name} x={x} y={y} width={width} height={height}
                                              value={cv} max={mx} zero={zero} fill={color}
                                              handleMouseup={handleMouseup}/>
                           case "P":
                             return <ScmPipe key={z} id={id} name={name} x={x} y={y} points={pts} strokeWidth={stkWid}
                                             value={cv} max={mx} zero={zero} fill={color}
                                             handleMouseup={handleMouseup} />
                           case "PB":
                             return <ScmPump key={z} id={id} name={name} x={x} y={y} width={width} height={height}
                                             value={cv} max={mx} zero={zero} fill={color}
                                             orient={"bottom"} handleMouseup={handleMouseup} />
                           case "PL":
                             return <ScmPump key={z} id={id} name={name} x={x} y={y} width={width} height={height}
                                             value={cv} max={mx} zero={zero} fill={color}
                                             orient={"left"} handleMouseup={handleMouseup}/>
                           case "PR":
                             return <ScmPump key={z} id={id} name={name} x={x} y={y} width={width} height={height}
                                             value={cv} max={mx} zero={zero} fill={color}
                                             orient={"right"} handleMouseup={handleMouseup}/>
                           case "PT":
                             return <ScmPump key={z} id={id} name={name} x={x} y={y} width={width} height={height}
                                             value={cv} max={mx} zero={zero} fill={color}
                                             orient={"top"} handleMouseup={handleMouseup} />
                           case "PV":
                             return <ScmProcessValue key={z} id={id} name={name} x={x} y={y} width={width} height={height} text={tx}
                                              strokeWidth={1} fontSize={14} fill={color}
                                              handleMouseup={handleMouseup}/>
                           case "RU":
                             return <ScmRefUnit key={z} id={id} name={name} x={x} y={y} width={width} height={height}
                                             value={cv} max={mx} zero={zero} fill={color}
                                             handleMouseup={handleMouseup} />
                           case "SH":
                             return <ScmShip key={z} id={id} name={name} x={x} y={y} width={width} height={height}
                                             value={cv} max={mx} zero={zero} fill={color}
                                             handleMouseup={handleMouseup} />
                           case "TK":
                             return <ScmTank key={z} id={id} name={name} x={x} y={y} width={width} height={height}
                                             value={cv} max={mx} zero={zero} fill={color}
                                             handleMouseup={handleMouseup}/>
                           case "TX":
                             return <ScmText key={z} id={id} name={name} x={x} y={y} width={width} height={height} text={tx}
                                             strokeWidth={1} fontSize={14} fill={color}
                                             handleMouseup={handleMouseup}/>
                           case "VH":
                             return <ScmValve key={z} id={id} name={name} x={x} y={y} width={width} height={height}
                                             value={cv} max={mx} zero={zero} fill={color}
                                             orient={"horizontal"} handleMouseup={handleMouseup} />
                           case "VV":
                             return <ScmValve key={z} id={id} name={name} x={x} y={y} width={width} height={height}
                                             value={cv} max={mx} zero={zero} fill={color}
                                             orient={"vertical"} handleMouseup={handleMouseup} />
                           default:
                             return null
                         }
                       } )
                     }
                </Layer>
              </Stage>
        </div>
      </div>

      );
  }
}

export default SchematicDisplay;