import React from 'react';
//import ReactDOM from 'react-dom';
import Log             from '../../requests/Log.js';
import { Group, Line } from 'react-konva';

/*************************************************************************
 * ScmValve.js
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


export default class ScmValve extends React.Component {
  constructor( props ) {
    super( props );
    Log.info( "ScmValve: constructor" );
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