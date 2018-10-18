import React from 'react';
//import ReactDOM from 'react-dom';
import { Circle, Line, Group } from 'react-konva';
import Log      from '../../requests/Log.js';

/*************************************************************************
 * ScmGauge.js
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


export default class ScmGauge extends React.Component {
  constructor( props ) {
    super( props );
    Log.info( "ScmGauge: constructor" );
    this.state = {
      x: props.x,
      y: props.y,
      width: props.width,
      height: props.height,
      text: props.text,
      fill: props.fill,
      stroke: props.stroke,
      strokeWidth: props.strokeWidth,
      mu: props.handleMouseup
    };
  }
  
  static defaultProps = {
    x: 0,
    y: 0,
    width:100,
    height:100,
    fill: "darkgreen",
    stroke: "darkgreen",
    strokeWidth:8,
    text: ""
  };

  componentWillMount() {
  }
  
  componentDidMount() {
  }
  
  handleClick() {
  }
  
  render() {
    var ht   = this.props.height;
    var wd   = this.props.width;
    var cx   = this.props.x + 0.5 * wd;
    var cy   = this.props.y + 0.5 * ht;
    var r    = 0.5*((ht>wd)?wd:ht);
    var stk  = this.props.fill;
    var scl  = (this.props.max - this.props.zero);
    scl = (scl===0)?360:scl;
    var vscl = (360 * (this.props.value - this.props.zero)/scl) - 90;
    var phi  = Math.PI * vscl / 180;
    var ex   = r * Math.cos( phi );
    var ey   = r * Math.sin( phi );
    var rad  = [ 0, 0, ex, ey ];
    var mu   = this.props.handleMouseup;
    return (
      <Group onMouseUp={mu} >
        <Circle x={cx} y={cy} radius={r} 
                stroke={stk} strokeWidth={2}  />
        <Line  x={cx} y={cy} stroke={stk} strokeWidth={3}  points={rad} />
      </Group>    
    );
  }
}