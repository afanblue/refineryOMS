import React, { Component } from 'react';
//import logo from './logo.svg';
import { Stage, Layer, Line, Ellipse, Text } from 'react-konva';
//import Konva from 'konva';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {hdr: props.text}
  }

  render() {
    return (
      <Stage width={640} height={40} >
        <Layer>
          <Ellipse radiusX={3}
                   radiusY={16}
                   x={30}
                   y={20}
                   stroke={"#C3C2B9"}
                   color={"midnightblue"}
                   rotation={90}/>
          <Ellipse radiusX={16}
                   radiusY={4}
                   x={25}
                   y={20}
                   stroke={"#C3C2B9"}
                   color={"midnightblue"}
                   rotation={105}/>
          <Text text={this.state.hdr} 
                fontSize={24}
                x={80}
                y={10}
                fontStyle={"italic"}
                stroke={"#C3C2B9"} />
          <Text text={"Oil Movement System"} 
                fontSize={2}
                x={22}
                y={19}
                stroke={"#C3C2B9"} />
          <Line x={0}
                y={20}
                points={[0, 0, 70, 0]}
                stroke={"#C3C2B9"}
                strokeWidth={1} />
        </Layer>
      </Stage>
    );
  }
}

export default Header;