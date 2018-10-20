/*************************************************************************
 * DefaultContents.js
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
import {Stage, Layer, Image, Circle} from 'react-konva';
import {IMAGEHEIGHT, IMAGEWIDTH} from '../../Parameters.js';
import Log          from '../requests/Log.js';


class DefaultContents extends Component {
  constructor(props) {
    super(props);
    Log.info( "DefaultContents " );
    this.state = {
       img:null,
       onMouseUp: props.handleMouseUp
     }
  }
  
  componentDidMount() {
    const img = new window.Image();
    img.src = "images/delcity.png";
    img.onload = () => { this.setState( {img:img} ); }
  }
  
  render () {
    return (
       <Stage height={IMAGEHEIGHT} width={IMAGEWIDTH}>
         <Layer>
           <Image image={this.state.img}
                  height={IMAGEHEIGHT}
                  width={IMAGEWIDTH} />
           <Circle radius={2}
                   stroke={"white"}
                   fill={"white"}
                   x={IMAGEWIDTH/2}
                   y={IMAGEHEIGHT/2} />
         </Layer>
       </Stage>
    );
  }
}

export default DefaultContents;