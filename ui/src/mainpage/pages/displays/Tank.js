/*************************************************************************
 * Tank.js
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

import React, {Component} from 'react';
import { Group, Ellipse, Rect, Line, Text } from 'react-konva';


/**
 *  tkType = filled, empty, (everything else)
 */
class Tank extends Component {
  constructor(props) {
    super(props);
    this.state = {
      updateData:    false,
      updateDisplay: true,
      key  : props.key,
      name : props.name,
      xp   : props.xp,
      yp   : props.yp,
      ht   : props.height,
      wd   : props.width,
      tkHt : props.tankHeight,
      tkType: props.tankType,
      level : props.level,
      temp  : props.temp,
      color: props.color
    };
  }
  
  componentDidMount() {
  }
  
  componentWillReceiveProps(nextProps) {
    this.setState( {key  : nextProps.key,
                    name : nextProps.name,
                    xp   : nextProps.xp,
                    yp   : nextProps.yp,
                    ht   : nextProps.height,
                    wd   : nextProps.width,
                    tkHt : nextProps.tankHeight,
                    tkType: nextProps.tankType,
                    level : nextProps.level,
                    temp  : nextProps.temp,
                    color: nextProps.color} );
  }

  render() {
    var xt    = this.state.xp;
    var yp    = this.state.yp;
    var wd    = this.state.wd;
    var ht    = this.state.ht;
    var tkHt  = this.state.tkHt;
    var color = this.state.color;
    var name  = this.state.name;
    var level = this.state.level;
    var temp  = this.state.temp;
    switch( this.state.tkType ) {
      case "filled":
        return(
          <Group>
          <Rect x={xt} y={yp} width={wd} height={ht}
                stroke={color} strokeWidth={1} />
          <Rect x={xt} y={yp+ht-tkHt} width={wd} height={tkHt}
                stroke={color} fill={color} strokeWidth={1} />
          </Group>
        );
      case "empty":
        return(
          <Rect x={xt} y={yp} width={wd} height={ht} stroke={color} strokeWidth={1} />
        );
      default:
        var ch = 0.05 * ht;
        ch = (ch===0?2:ch);
        var rx = wd/2;
        var yt = yp - ch/2;
        var yb = yp + ht - ch/2;
        var rt = { x:rx, y:ch };
//        var scale = tkHt;
        var ptsl = [xt, yt, xt, yb];
        var ptsr = [xt+wd, yt, xt+wd, yb];
//        var vscl = parseFloat(level)/scale;
//        var yscl = tkHt * (yb - yt);
        var ybscl = yb - tkHt;
        var tpyn = yt - 16 + ht/2;
        var tpyl = yt + ht/2;
        var tpyt = yt + 16 + ht/2; 

/*
        var r = 3 * h;
        var phi = Math.asin(w/(2*r));
        var deg = Math.round(360 * phi/Math.PI);
        var xl = r * Math.cos(phi);
        var by = yp - xl + h;
        var rt1 = 270 - deg/2;
        var rt3 =  90 - deg/2;
        var lp1 = [xp,yp,   xp,yp+h];
        var lp2 = [xp+w,yp, xp+w,yp+h];
        var tpyn = yp - 16 + h/2;
        var tpyl = yp + h/2;
        var tpyt = yp + 16 + h/2; 
        var level = this.state.level;
        var temp = this.state.temp;
        var ir = tkHt < (r-xl)?(r-tkHt):xl;
        var arcColor = tkHt<(r-xl)?"midnightblue":color;
        var wRect = tkHt<(r-xl)?1:w;
*/
//      1st ellipse: Top of tank
//      2nd ellipse: Bottom of tank 
//      Rectangle: body of tank ?
//      4th ellipse: Top of tank contents 
//      Lines:  sides of tank (1st is left; 2nd is right)
        return(
          <Group>
            <Ellipse x = {xt+rx} y = {yt} radius={rt} stroke={color}
                     strokeWidth={1} />
            <Ellipse x = {xt+rx} y = {yb} radius={rt} stroke={color}
                     strokeWidth={1} fill={color} />
            <Line points={ptsl} stroke={color} strokeWidth={1} />
            <Line points={ptsr} stroke={color} strokeWidth={1} />
            <Ellipse x = {xt+rx} y = {ybscl} radius={rt} stroke={color}
                     strokeWidth={1} fill={color} />
            <Rect x={xt} y={ybscl} width={wd} height={tkHt}
                  stroke={color} fill={color} strokeWidth={1} />
            <Text text={name} x={xt+wd+2} y={tpyn}
                  fontSize={10} stroke={color} strokeWidth={1} />
            <Text text={level} x={xt+wd+2} y={tpyl}
                  fontSize={10} stroke={color} strokeWidth={1} />
            <Text text={temp} x={xt+wd+2} y={tpyt}
                  fontSize={10} stroke={color} strokeWidth={1} />
          </Group>
        );
    }
  }

}

export default Tank;
