import React, {Component} from 'react';
//import {IMAGEHEIGHT, IMAGEWIDTH} from '../../../Parameters.js';
import { Group, Arc, Line, Rect, Text } from 'react-konva';



/**
 *  tkType = filled, empty, (everything else)
 */
class Tank extends Component {
  constructor(props) {
    super(props);
    console.log( "Tank constructor");
    this.state = {
      updateData:    false,
      updateDisplay: true,
      key  : props.key,
      name : props.name,
      xp   : props.xp,
      yp   : props.yp,
      h    : props.height,
      w    : props.width,
      tkHt : props.tankHeight,
      tkType: props.tankType,
      level : props.level,
      temp  : props.temp,
      color: props.color
    };
  }
  
  componentDidMount() {
    console.log( "Tank.didMount" );
  }
  
  componentWillReceiveProps(nextProps) {
    this.setState( {key  : nextProps.key,
                    name : nextProps.name,
                    xp   : nextProps.xp,
                    yp   : nextProps.yp,
                    h    : nextProps.height,
                    w    : nextProps.width,
                    tkHt : nextProps.tankHeight,
                    tkType: nextProps.tankType,
                    level : nextProps.level,
                    temp  : nextProps.temp,
                    color: nextProps.color} );
  }

  render() {
    var xp    = this.state.xp;
    var yp    = this.state.yp;
    var w     = this.state.w;
    var h     = this.state.h;
    var tkHt  = this.state.tkHt;
    var color = this.state.color;
    var name  = this.state.name;
    switch( this.state.tkType ) {
      case "filled":
        return(
          <Group>
          <Rect x={xp} y={yp} width={w} height={h}
                stroke={color} strokeWidth={1} />
          <Rect x={xp} y={yp+h-tkHt} width={w} height={tkHt}
                stroke={color} fill={color} strokeWidth={1} />
          </Group>
        );
      case "empty":
        return(
          <Rect x={xp} y={yp} width={w} height={h} stroke={color} strokeWidth={1} />
        );
      default:
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
//      1st arc: Top tank arc (top)
//      2nd arc: Top tank arc (bottom)
//      3rd arc: Bottom tank arc
//      4th arc: Top tank level 
//      Lines:  sides of tank (1st is left; 2nd is right)
        return(
          <Group>
          <Rect x={xp} y={yp+h-tkHt} width={wRect} height={tkHt}
                stroke={color} fill={color} strokeWidth={1} />
          <Arc x={xp+w/2} y={yp+xl}
               innerRadius={r} outerRadius={r}
               angle={deg} rotation={rt1}
               stroke={color} strokeWidth={1} counterclockwise={true} />
          <Arc x={xp+w/2} y={by-h}
               innerRadius={r} outerRadius={r}
               angle={deg} rotation={rt3}
               stroke={color} strokeWidth={1} clockwise={false} />
          <Arc x={xp+w/2} y={by}
               innerRadius={ir} outerRadius={r}
               angle={deg} rotation={rt3} fill={arcColor}
               stroke={color} strokeWidth={1} clockwise={false} />
          <Arc x={xp+w/2} y={yp+xl+h-tkHt}
               innerRadius={ir} outerRadius={r}
               angle={deg} rotation={rt1}
               stroke={color} strokeWidth={1} 
               fill={arcColor} counterclockwise={true} />
          <Line points={lp1} stroke={color} strokeWidth={1} />
          <Line points={lp2} stroke={color} strokeWidth={1} />
          <Text text={name} x={xp+w+2} y={tpyn}
                fontSize={10} stroke={color} strokeWidth={1} />
          <Text text={level} x={xp+w+2} y={tpyl}
                fontSize={10} stroke={color} strokeWidth={1} />
          <Text text={temp} x={xp+w+2} y={tpyt}
                fontSize={10} stroke={color} strokeWidth={1} />
          </Group>
        );
    }
  }

}

export default Tank;
