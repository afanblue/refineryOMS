/*************************************************************************
 * FieldDisplay.js
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

import React, {Component}        from 'react';
import {IMAGEHEIGHT, IMAGEWIDTH} from '../../../Parameters.js';
import moment                    from 'moment';
import { Stage, Layer, Image }   from 'react-konva';

import Tank   from './Tank.js';


class Field extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stage: props.stage,
      img: props.img,
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
    const img = new window.Image();
    var field = this.state.field;
    img.src = (field.roadImage===null?field.satelliteImage:field.roadImage);
    img.onload = () => { this.setState( {img:img} ); }
  }

  componentDidUpdate( prevProps, prevState ) {
//    this.setState({ field: prevProps.field } );
  }

  static getDerivedStateFromProps(nextProps, state) {
    return { field: nextProps.field,
             siteLoc: nextProps.siteLoc,
             tags: nextProps.tags };
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
    var w = document.getElementById('contents');
    var ht = w.offsetHeight;
    var wid = w.offsetWidth;
    var rat = ht/IMAGEHEIGHT < wid/IMAGEWIDTH ? ht/IMAGEHEIGHT : wid/IMAGEWIDTH;
    rat = rat < 1 ? 1 : Math.floor(rat*1000)/1000;
    rat = 1.25;
    var scrnHt = rat * IMAGEHEIGHT;
    var scrnWid = rat * IMAGEWIDTH;
    var f = this.state.field;
    var site = this.state.siteLoc
    var xDivisor = (f.c1Long===null?site.c2Long-site.c1Long:f.c2Long-f.c1Long);
    var xScale = IMAGEWIDTH / xDivisor;
    var yDivisor = (f.c1Lat===null?site.c2Lat-site.c1Lat:f.c2Lat-f.c1Lat);
    var yScale = IMAGEHEIGHT / yDivisor;
    var sX = this.scaleX;
    var sY = this.scaleY;
    var tType = this.state.tankType;
    var now = moment().format('YYYY-MM-DD HH:mm:ss');
    return (
      <div>
      <table><tbody><tr><td>{now}</td></tr></tbody></table>
      <Stage height={scrnHt} width={scrnWid}>
        <Layer>
           <Image image={this.state.img}
                  height={scrnHt}
                  width={scrnWid} />
          {this.state.tags.map(
            function(n,x) {
              var loc  = n.location;
              var xnw  = sX( rat * loc.c1Long, rat * f.c1Long, xScale);
              var wid  = Math.abs( sX( rat * loc.c2Long, rat * f.c1Long, xScale) - xnw);
              var ynw  = sY( rat * loc.c1Lat,  rat * f.c1Lat,  yScale);
              var ht   = Math.abs( sY( rat * loc.c2Lat,  rat * f.c1Lat,  yScale) - ynw);
              var tkHt = Math.abs( ht * n.level / n.maxLevel);
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