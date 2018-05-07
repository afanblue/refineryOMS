import React, {Component} from 'react';
import {Image} from 'react-konva';
import {IMAGEHEIGHT, IMAGEWIDTH} from '../../Parameters.js';

class SiteImage extends Component {
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
    console.log( "SiteImage.render:"  );
    return <Image image={this.state.img}
                  height={IMAGEHEIGHT}
                  width={IMAGEWIDTH} 
                  onMouseUp={this.state.onMouseUp} />
  }
}

export default SiteImage;