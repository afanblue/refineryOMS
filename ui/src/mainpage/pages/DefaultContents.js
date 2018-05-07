import React, {Component} from 'react';
import {Stage, Layer, Image, Circle} from 'react-konva';
import {IMAGEHEIGHT, IMAGEWIDTH} from '../../Parameters.js';

class DefaultContents extends Component {
  constructor(props) {
    super(props);
    console.log( "DefaultContents " );
    this.state = {
       img:null,
       onMouseUp: props.handleMouseUp
     }
  }
  
  componentDidMount() {
    const img = new window.Image();
    img.src = "images/delcity.png";
    img.onload = () => { this.setState( {img:img} ); }
  }
  
  render () {
    return (
       <Stage height={IMAGEHEIGHT} width={IMAGEWIDTH}>
         <Layer>
           <Image image={this.state.img}
                  height={IMAGEHEIGHT}
                  width={IMAGEWIDTH} />
           <Circle radius={2}
                   stroke={"white"}
                   fill={"white"}
                   x={IMAGEWIDTH/2}
                   y={IMAGEHEIGHT/2} />
         </Layer>
       </Stage>
    );
  }
}

export default DefaultContents;