/*************************************************************************
 * ScmRefUnit.js
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

import React from 'react';
import PropTypes          from 'prop-types';

import { Group, Rect, Arc, Line } from 'react-konva';


export default class ScmRefUnit extends React.Component {
  constructor( props ) {
    super( props );
    this.state = {
      x: props.x,
      y: props.y,
      width: props.width,
      height: props.height,
      fill: props.fill,
      stroke: props.stroke,
      strokeWidth: props.strokeWidth
    };
  }

  static get propTypes() {
    return {
      x: PropTypes.number,
      y: PropTypes.number,
      width: PropTypes.number,
      height: PropTypes.number,
      fill: PropTypes.any,
      stroke: PropTypes.string,
      strokeWidth: PropTypes.number,
      value: PropTypes.any,
      handleMouseup: PropTypes.func
    }
  }

  componentDidMount() {
  }

  handleClick() {
  }

  render() {
//	var id = this.props.id;
//	var name = this.props.name;
    var val = this.props.value*1;
    var xt = this.props.x;
    var ht = 36;
    var wd = 60;
    var yt = this.props.y;
    var r  = 6;
    var pts1 = [xt+4*r,    yt,      xt+4*r,    yt+ht];
    var pts2 = [xt+7.47*r, yt+5,    xt+7.47*r, yt+ht];
    var pts3 = [xt+8.7*r,  yt+2,    xt+8.7*r,  yt+ht];
    var pts4 = [xt+2*r,    yt+ht/4, xt+3*r,    yt+ht/4, xt+3*r, yt+ht-5];
    var pts5 = [xt+6*r,    yt+ht/2, xt+6.5*r+2,  yt+ht/2, xt+6.5*r+2, yt+ht-5];
//    var stkw = 1;
    var color = val===0?"red":"darkgreen";
    var mu = this.props.handleMouseup;
    return (
      <Group onMouseUp={mu}>
        <Rect x={xt} y={yt+ht-5} width={wd} height={5} stroke={color} fill={color} strokeWidth={1} />
        <Arc  x={xt+r} y={yt+r} innerRadius={0} outerRadius={r} angle={180} rotation={180} fill={color} />
        <Rect x={xt} y={yt+r} width={2*r} height={ht-2*r-5} stroke={color} fill={color} strokeWidth={1} />
        <Arc  x={xt+r} y={yt+ht-2*r} innerRadius={0} outerRadius={r} angle={180} rotation={0} fill={color} clockwise={false} />
        <Arc  x={xt+5.6*r} y={yt+2.5*r} innerRadius={0} outerRadius={r-2} angle={180} rotation={180} fill={color} />
        <Rect x={xt+5.1*r} y={yt+2.5*r} width={r} height={2*r} stroke={color} fill={color} strokeWidth={1} />
        <Arc  x={xt+5.6*r} y={yt+4.5*r} innerRadius={0} outerRadius={r-2} angle={180} rotation={0} fill={color} clockwise={false} />
        <Line points={pts1} stroke={color} strokeWidth={4} />
        <Line points={pts2} stroke={color} strokeWidth={3} />
        <Line points={pts3} stroke={color} strokeWidth={4} />
        <Line points={pts4} stroke={color} strokeWidth={1} />
        <Line points={pts5} stroke={color} strokeWidth={1} />
      </Group>
    );
  }
}

ScmRefUnit.defaultProps = {
    x: 0,
    y: 0,
    width:100,
    height:100,
    fill: null,
    stroke: "darkgreen",
    strokeWidth:1
  };