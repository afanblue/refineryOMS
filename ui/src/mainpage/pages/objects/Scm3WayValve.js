/*************************************************************************
 * Scm3WayValve.js
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


export default class Scm3WayValve extends React.Component {
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
          x: PropTypes.any,
          y: PropTypes.any,
          width: PropTypes.any,
          height: PropTypes.any,
          fill: PropTypes.string,
          stroke: PropTypes.any,
          strokeWidth: PropTypes.any,
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
	var id = this.props.id;
    var xt = this.props.x;
    var ht = 15;
    var wd = 18;
    var yt = this.props.y;
    var orient = this.props.orient;
    var val = this.props.value*1;
    var colorIn   = val===0?"red":(val===1?"darkgreen":"darkgreen");
    var colorOut1 = val===0?"red":(val===1?"darkgreen":"red");
    var colorOut2 = val===0?"red":(val===1?"red":"darkgreen");

    var ptsOut1 = [xt+wd,   yt+4, xt+wd,     yt+ht, xt+wd/2, yt+4+(ht-4)/2];
    var ptsOut2 = [xt,      yt+4, xt,        yt+ht, xt+wd/2, yt+4+(ht-4)/2];
    var ptsIn   = [xt+wd/4, yt,   xt+3*wd/4, yt,    xt+wd/2, yt+4+(ht-4)/2];
    if( orient === "left" ) {
      ht = 18;
      wd = 15;
      ptsOut1 = [xt+4, yt,      xt+wd, yt,        xt+4+(wd-4)/2, yt+ht/2];
      ptsOut2 = [xt+4, yt+ht,   xt+wd, yt+ht,     xt+4+(wd-4)/2, yt+ht/2];
      ptsIn   = [xt,   yt+ht/4, xt,    yt+3*ht/4, xt+4+(wd-4)/2, yt+ht/2];
    } else if( orient === "right") {
      ht = 18;
      wd = 15;
      ptsOut1 = [xt,    yt+ht,   xt+wd-4, yt+ht,     xt+(wd-4)/2, yt+ht/2];
      ptsOut2 = [xt,    yt,      xt+wd-4, yt,        xt+(wd-4)/2, yt+ht/2];
      ptsIn   = [xt+wd, yt+ht/4, xt+wd,   yt+3*ht/4, xt+(wd-4)/2, yt+ht/2];
    } else if( orient === "bottom") {
      ht = 15;
      wd = 18;
      ptsOut1 = [xt,      yt,    xt,        yt+ht-4, xt+wd/2, yt+(ht-4)/2];
      ptsOut2 = [xt+wd,   yt,    xt+wd,     yt+ht-4, xt+wd/2, yt+(ht-4)/2];
      ptsIn   = [xt+wd/4, yt+ht, xt+3*wd/4, yt+ht,   xt+wd/2, yt+(ht-4)/2];
    }

    var stkw = 1;
    var mu = this.props.handleMouseup;
    return (
      <Group onMouseUp={mu}>
        <Line points={ptsOut1} stroke={colorOut1} strokeWidth={stkw} fill={colorOut1} closed={true} />
        <Line points={ptsOut2} stroke={colorOut2} strokeWidth={stkw} fill={colorOut2} closed={true} />
        <Line points={ptsIn}   stroke={colorIn}   strokeWidth={stkw} fill={colorIn}   closed={true} />

      </Group>
    );
  }
}

Scm3WayValve.defaultProps = {
    x: 0,
    y: 0,
    width:100,
    height:100,
    fill: null,
    stroke: "darkgreen",
    strokeWidth:1
  };

