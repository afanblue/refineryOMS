/*************************************************************************
 * ScmTank.js
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

import React from 'react';
import Log      from '../../requests/Log.js';
import { Group, Ellipse, Line, Rect } from 'react-konva';


export default class ScmTank extends React.Component {
  constructor( props ) {
    super( props );
    Log.info( "ScmTank: constructor" );
    this.state = {
      x: props.x,
      y: props.y,
      width: props.width,
      height: props.height,
      fill: props.fill,
      stroke: props.stroke,
      strokeWidth: props.strokeWidth,
      value: props.value
    };
  }
  
  static defaultProps = {
    x: 0,
    y: 0,
    width:100,
    height:100,
    fill: "darkgreen",
    stroke: "darkgreen",
    strokeWidth:1,
    value: 0
  };

  componentWillMount() {
  }
  
  componentDidMount() {
  }
  
  handleClick() {
  }
  
  render() {
    var ch = 0.05 * this.props.height;
    ch = (ch===0?2:ch);
    var xt = this.props.x;
    var rx = this.props.width/2;
    var wd = this.props.width;
    var xr = this.props.x + this.props.width;
    var yt = this.props.y - ch/2;
    var yb = this.props.y + this.props.height - ch/2;
    var rt = { x:rx, y:ch };
    var ll = [xt, yt, xt, yb];
    var rl = [xr, yt, xr, yb];
    var scale = this.props.max - this.props.zero;
    var vscl = (this.props.value - this.props.zero)/scale;
    var yscl = vscl * (yb - yt);
    var ybscl = yb - yscl;
    var fill = this.props.fill;
    var stroke = this.props.fill;
    var mu = this.props.handleMouseup;
    return (
      <Group onMouseUp={mu}>
      <Ellipse x = {xt+rx} y = {yt} radius={rt} stroke={stroke}
               strokeWidth={this.props.strokeWidth} />

      <Line x = {0} y={0} points={ll} stroke={stroke} strokeWidth={this.props.strokeWidth} />

      <Ellipse x = {xt+rx} y = {yb} radius={rt} stroke={stroke}
               strokeWidth={this.props.strokeWidth} fill={fill} />

      <Ellipse x = {xt+rx} y = {yb} radius={rt} stroke={stroke}
               strokeWidth={this.props.strokeWidth} fill={fill} />
      
      <Rect x={xt} y={ybscl} width={wd} height={yscl}
            stroke={fill} fill={fill} strokeWidth={1} />
                
      <Ellipse x = {xt+rx} y = {ybscl} radius={rt} stroke={stroke}
               strokeWidth={this.props.strokeWidth} fill={fill} />

     <Line x = {0} y={0} points={rl} stroke={stroke} strokeWidth={this.props.strokeWidth} />

      </Group>
    );
  }
}