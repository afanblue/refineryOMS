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
/* eslint-env node, browser, es6 */

import React from 'react';
import PropTypes          from 'prop-types';

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

  static get propTypes() {
    return {
      x: PropTypes.number,
      y: PropTypes.number,
      width: PropTypes.number,
      height: PropTypes.number,
      fill: PropTypes.any,
      stroke: PropTypes.string,
      strokeWidth: PropTypes.number,
      points: PropTypes.array,
      value: PropTypes.any
    }
  }

  componentDidMount() {
  }

  handleClick() {
  }

  render() {
//    var xt = this.props.x;
//    var yt = this.props.y;
//    var id = this.props.id;
//    var name = this.props.name;
    var val = this.props.value*1;
    var pts = this.props.points;
    var stkw = this.props.strokeWidth;
    var color = val===0?"red":"darkgreen";
    return (
      <Line points={pts} stroke={color} strokeWidth={stkw}  />
    );
  }
}

ScmPipe.defaultProps = {
    x: 0,
    y: 0,
    width:100,
    height:100,
    fill: null,
    stroke: "darkgreen",
    strokeWidth:1
  };