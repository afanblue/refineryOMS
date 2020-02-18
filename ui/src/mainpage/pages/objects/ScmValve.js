/*************************************************************************
 * ScmValve.js
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

import { Group, Line } from 'react-konva';


export default class ScmValve extends React.Component {
  constructor( props ) {
    super( props );
    this.state = {
      x: props.x,
      y: props.y,
      width: props.width,
      height: props.height,
      fill: props.fill,
      stroke: props.stroke,
      strokeWidth: props.strokeWidth,
      orient: props.orient
    };
  }

   static get propTypes() {
     return {
       x: PropTypes.integer,
       y: PropTypes.integer,
       width: PropTypes.integer,
       height: PropTypes.integer,
       fill: PropTypes.any,
       stroke: PropTypes.string,
       strokeWidth: PropTypes.integer,
       orient: PropTypes.any,
       value: PropTypes.any,
       handleMouseup: PropTypes.func
    }
  }

  componentDidMount() {
  }

  handleClick() {
  }

  render() {
    var xt = this.props.x;
    var ht = 12;
    var wd = 24;
    var yt = this.props.y;
    var orient= this.props.orient;
    var pts1 = [xt, yt, xt, yt+ht, xt+wd/2, yt+ht/2];
    var pts2 = [xt+wd, yt, xt+wd, yt+ht, xt+wd/2, yt+ht/2];
    var pts3 = [xt+wd/2, yt, xt+wd/2, yt+ht/2];
    var pts4 = [xt+wd/4, yt, xt+3*wd/4, yt];
    if( orient==="vertical" ) {
      ht = 22;
      wd = 14;
      pts1 = [xt, yt, xt+wd, yt, xt+wd/2, yt+ht/2];
      pts2 = [xt, yt+ht, xt+wd, yt+ht, xt+wd/2, yt+ht/2];
      pts3 = [xt, yt+ht/2, xt+wd/2, yt+ht/2];
      pts4 = [xt, yt+ht/4, xt, yt+3*ht/4];
    }
    var stkw = 1;
    var color = this.props.value===0?"red":"darkgreen";
    var mu = this.props.handleMouseup;
    return (
      <Group onMouseUp={mu}>
        <Line points={pts1} stroke={color} strokeWidth={stkw} fill={color} closed={true} />
        <Line points={pts2} stroke={color} strokeWidth={stkw} fill={color} closed={true} />
        <Line points={pts3} stroke={color} strokeWidth={3} fill={color} />
        <Line points={pts4} stroke={color} strokeWidth={3} fill={color} />
      </Group>
    );
  }
}

ScmValve.defaultProps = {
      x: 0,
      y: 0,
      width:100,
      height:100,
      fill: null,
      stroke: "darkgreen",
      strokeWidth:1
};