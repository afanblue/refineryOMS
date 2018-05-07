import React, {Component} from 'react';
import {IMAGEHEIGHT, IMAGEWIDTH} from '../../../Parameters.js';
import { Stage, Layer, Image } from 'react-konva';

import Tank from './Tank.js';


class Field extends Component {
  constructor(props) {
    super(props);
    console.log( "FieldDisplay.constructor");
    this.state = {
      stage: props.stage,
      updateData: false,
      updateDisplay: true,
      field: props.field,
      tags: props.tags,
      siteLoc: props.siteLoc,
      tankType: props.tankType,
      returnedText: null
    };
  }
  
  componentDidMount() {
    console.log( "FieldDisplay.didMount ");
    const img = new window.Image();
    var field = this.state.field;
    img.src = (field.roadImage===null?field.satelliteImage:field.roadImage);
    img.onload = () => { this.setState( {img:img} ); }

  }
  
  componentWillReceiveProps(nextProps) {
    this.setState( {field: nextProps.field,
                    tags:  nextProps.tags,
                    siteLoc: nextProps.siteLoc,
                    tankType: nextProps.tankType} );
  }

  handleErrors(response) {
    if (!response.ok) {
        throw Error(response.status+" ("+response.statusText+")");
    }
    return response;
  }
 
  scaleX( tkLong, tLong, xScale ) {
    return Math.round(xScale * (tkLong - tLong));
  }

  scaleY( tkLat, tLat, yScale ) {
    return Math.round(yScale * (tkLat - tLat));
  }

  render() {
    var field = this.state.field;
    var tag = field.tag;
    var site = this.state.siteLoc
    var xDivisor = (tag.c1Long===null?site.c2Long-site.c1Long:tag.c2Long-tag.c1Long);
    var xScale = IMAGEWIDTH / xDivisor;
    var yDivisor = (tag.c1Long===null?site.c2Lat-site.c1Lat:tag.c2Lat-tag.c1Lat);
    var yScale = IMAGEHEIGHT / yDivisor;
    var sX = this.scaleX;
    var sY = this.scaleY;
    var tType = this.state.tankType;
    var now = (new Date()).toLocaleString();
    return (
      <div>
      <table><tbody><tr><td>{now}</td></tr></tbody></table>
      <Stage height={IMAGEHEIGHT} width={IMAGEWIDTH}>
        <Layer>
           <Image image={this.state.img}
                  height={IMAGEHEIGHT}
                  width={IMAGEWIDTH} />
          {this.state.tags.map(
            function(n,x) {
              var loc  = n.location;
              var xnw  = sX( loc.c1Long, tag.c1Long, xScale);
              var wid  = Math.abs(sX( loc.c2Long, tag.c1Long, xScale) - xnw);
              var ynw  = sY( loc.c1Lat,  tag.c1Lat,  yScale);
              var ht   = Math.abs(sY( loc.c2Lat,  tag.c1Lat,  yScale) - ynw);
              var tkHt = Math.abs(ht*n.level/n.maxLevel);
              var color= n.levelColor;
              var tkName = n.name;
              return ( 
                <Tank key = {x} xp = {xnw} yp = {ynw}
                      width = {wid}   height = {ht}
                      name = {tkName}
                      tankHeight = {tkHt}
                      tankType = {tType} color={color}
                      level = {n.levelText} temp={n.tempText} />
              );
            } 
          )}
        </Layer>
      </Stage>
      </div>
    );
  } 
}

export default Field;