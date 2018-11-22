/*************************************************************************
 * ScmPipe.js
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

import React from 'react';
//import ReactDOM from 'react-dom';
import { Line } from 'react-konva';


export default class ScmPipe extends React.Component {
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
  
  static defaultProps = {
    x: 0,
    y: 0,
    width:100,
    height:100,
    fill: null,
    stroke: "darkgreen",
    strokeWidth:1
  };

  componentWillMount() {
  }
  
  componentDidMount() {
  }
  
  handleClick() {
  }
  
  render() {
//    var xt = this.props.x;
//    var yt = this.props.y;
    var pts = this.props.points;
    var stkw = this.props.strokeWidth;
    var color = this.props.value===0?"red":"darkgreen";
    return (
      <Line points={pts} stroke={color} strokeWidth={stkw}  />
    );
  }
}