/*************************************************************************
 * oms.js
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

import React, { Component } from 'react';
import { Stage, Layer, Line, Ellipse, Text } from 'react-konva';


class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {hdr: props.text}
  }

  render() {
    return (
      <Stage width={640} height={40} >
        <Layer>
          <Ellipse radiusX={3}
                   radiusY={16}
                   x={30}
                   y={20}
                   stroke={"#C3C2B9"}
                   color={"midnightblue"}
                   rotation={90}/>
          <Ellipse radiusX={16}
                   radiusY={4}
                   x={25}
                   y={20}
                   stroke={"#C3C2B9"}
                   color={"midnightblue"}
                   rotation={105}/>
          <Text text={this.state.hdr} 
                fontSize={24}
                x={80}
                y={10}
                fontStyle={"italic"}
                stroke={"#C3C2B9"} />
          <Text text={"Oil Movement System"} 
                fontSize={2}
                x={22}
                y={19}
                stroke={"#C3C2B9"} />
          <Line x={0}
                y={20}
                points={[0, 0, 70, 0]}
                stroke={"#C3C2B9"}
                strokeWidth={1} />
        </Layer>
      </Stage>
    );
  }
}

export default Header;