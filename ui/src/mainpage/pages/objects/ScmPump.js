/*************************************************************************
 * ScmPump.js
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
import { Group, Line, Circle } from 'react-konva';


export default class ScmPump extends React.Component {
  constructor( props ) {
    super( props );
    Log.info( "ScmPump: constructor" );
    this.state = {
      x: props.x,
      y: props.y,
      width: props.width,
      height: props.height,
      orient: props.orient,
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
    var rb = 8;             /* defines template radius */
    var plb = rb + 4;        /* defines template pipe length */
//    var hb = 2 * (rb + plb); /* defines template height */
//    var wb = 2 * rb;         /* defines template width  */
    var pszb = 5;            /* defines template "pipe" width */

//    var ht = this.props.height;
//    var wd = this.props.width;
    
//    var htx = ht / hb;    /* defines vertical scale */
//    var wdx = wd / wb;    /* defines horizontal scale */
    var r = rb;
    var psz = pszb;
    var pl = plb;
    var xt = this.props.x;
    var yt = this.props.y;
    
//  assume a vertical right orientation
    var orient = this.props.orient;
    var pts1 = [xt+psz/2    , yt          ,xt+psz/2    , yt+pl];
    var pts2 = [xt+2*r-psz/2, yt+pl       ,xt+2*r-psz/2, yt+2*pl];
    var xc = xt+r;
    var yc = yt+pl;
    if( orient === "PB" ) {
      pts1 = [xt+psz/2    , yt+pl, xt+psz/2   , yt+2*pl];
      pts2 = [xt+2*r-psz/2, yt   ,xt+2*r-psz/2, yt+pl];
      xc = xt+r;
      yc = yt+pl;
    }else if( orient === "PL" ) {
      pts1 = [xt          , yt+psz/2    ,xt+pl  , yt+psz/2];
      pts2 = [xt+pl       , yt+2*r-psz/2,xt+2*pl, yt+2*r-psz/2];
      xc = xt+pl;
      yc = yt+r;
    } else if( orient === "PR" ) {
      pts1 = [xt+pl    , yt+psz/2    ,xt+2*pl,yt+psz/2];
      pts2 = [xt       , yt+2*r-psz/2,xt+pl  ,yt+2*r-psz/2];
      xc = xt+pl;
      yc = yt+r;
    }

    var color = this.props.value===0?"red":"darkgreen";
    var mu = this.props.handleMouseup;
    return (
      <Group onMouseUp={mu} >
        <Line points={pts1} stroke={color} strokeWidth={psz} fill={color} />
        <Circle x={xc} y={yc} radius={r} stroke={"black"} strokeWidth={1} fill={color} />
        <Line points={pts2} stroke={color} strokeWidth={psz} fill={color} />
      </Group>
    );
  }
}