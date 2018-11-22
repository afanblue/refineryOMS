/*************************************************************************
 * ScmText.js
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

import React from 'react';
import { Text } from 'react-konva';


export default class ScmText extends React.Component {
  constructor( props ) {
    super( props );
    this.state = {
      x: props.x,
      y: props.y,
      width: props.width,
      height: props.height,
      text: props.text,
      fill: props.fill,
      stroke: props.stroke,
      strokeWidth: props.strokeWidth,
      font: props.font,
      fontSize: props.fontSize,
      fontStyle: props.fontStyle
    };
  }
  
  static defaultProps = {
    x: 0,
    y: 0,
    width:100,
    height:100,
    fill: "darkgreen",
    stroke: "darkgreen",
    strokeWidth:1,
    text: "",
    font: "Arial",
    fontSize: 12,
    fontStyle: "normal"
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
    var stk = this.props.fill;
    var stkw = this.props.strokeWidth;
    var f   = this.props.font;
    var fsz = this.props.fontSize;
    var fst = this.props.fontStyle;
    
    return (
      <Text x={xt} y={yt} height={ht} width={wd} 
            text={this.props.text} 
            stroke={stk} strokeWidth={stkw}  
            font={f} fontSize={fsz} fontStyle={fst}  />
    );
  }
}