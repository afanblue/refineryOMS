/*************************************************************************
 * DefaultContents.js
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
/* eslint-env node, browser, es6 */

import React, {Component} from 'react';
import PropTypes          from 'prop-types';

import {Stage, Layer, Image, Text} from 'react-konva';
import {IMAGEHEIGHT, IMAGEWIDTH} from '../../Parameters.js';


class DefaultContents extends Component {
  constructor(props) {
    super(props);
    this.state = {
       img:null,
       onMouseUp: props.handleMouseUp
     }
  }

  static get propTypes() {
      return {
          handleMouseUp: PropTypes.func,
          pageName: PropTypes.string
      }
  }

  componentDidMount() {
    const img = new window.Image();
    img.src = "images/delcity.png";
    img.onload = () => { this.setState( {img:img} ); }
  }

  render () {
    let pageName = this.props.pageName;
    return (
       <Stage height={IMAGEHEIGHT+20} width={IMAGEWIDTH}>
         <Layer>
           <Text text={pageName}
                 fontSize={12}
                 x={80}
                 y={1}
                 stroke={"#C3C2B9"}
                 strokeWidth={1} />
           <Image image={this.state.img}
                  y={20}
                  height={IMAGEHEIGHT}
                  width={IMAGEWIDTH} />
         </Layer>
       </Stage>
    );
  }
}

export default DefaultContents;