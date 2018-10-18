import React from 'react';
//import ReactDOM from 'react-dom';
import Log      from '../../requests/Log.js';
import { Group, Arc, Rect } from 'react-konva';

/*************************************************************************
 * ScmShip.js
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


export default class ScmShip extends React.Component {
  constructor( props ) {
    super( props );
    Log.info( "ScmPipe: constructor" );
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
    var xt = this.props.x;
    var ht = this.props.height;
    var wd = this.props.width;
    var yt = this.props.y;
    var r  = ht/2;
    var color = this.props.value===0?"red":"darkgreen";
    var mu = this.props.handleMouseup;
    return (
      <Group onMouseUp={mu}>
        <Arc  x={xt+r} y={yt+ht/2} innerRadius={0} outerRadius={ht/2} angle={90} rotation={90} fill={color} />
        <Rect x={xt+r} y={yt+ht/2} width={wd-r} height={ht-r} stroke={color} fill={color} strokeWidth={1} />
      </Group>
    );
  }
}