/*************************************************************************
 * ItemDisplay.js
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

import { VictoryAxis, VictoryLabel, VictoryLine } from 'victory';
import moment   from 'moment';


class ItemDisplay extends Component {
  constructor( props ) {
    super(props);
    this.state = {
      id: props.id,
      updateData: false,
      updateDisplay: true,
      plotDetails: props.plotDetails,
      items: props.items,
      quit: props.quit,
      left : 'dataMin',
      right : 'dataMax',
      refAreaLeft : '',
      refAreaRight : '',
      top : 'dataMax+1',
      bottom : 0,
      animation : false

    };
  }
  
  componentWillReceiveProps(nextProps) {
    this.setState({ id: nextProps.id,
                    items: nextProps.items,
                    plotDetails: nextProps.plotDetails,
                    quit:  nextProps.quit });
  }
  
    getStyles() {
//    const BLUE_COLOR = "#00a3de";
//    const RED_COLOR = "#7c270b";
    const WHITE_COLOR = "#C3C2B9";
//    const GREEN_COLOR = "darkgreen";
//    const YELLOW_COLOR = "yellow";

    return {
      parent: {
        background: "midnightblue",
        boxSizing: "border-box",
        display: "inline",
        padding: 0,
        fontFamily: "'Fira Sans', sans-serif",
        maxWidth: "100%",
        height: "100%"
      },
      title: {
        textAnchor: "start",
        verticalAnchor: "end",
        fill: "#ffffff",
        fontFamily: "inherit",
        fontSize: "18px",
        fontWeight: "bold"
      },
      labelNumber: {
        textAnchor: "middle",
        fill: "#ffffff",
        fontFamily: "inherit",
        fontSize: "14px"
      },

      // INDEPENDENT AXIS
      axisYears: {
        axis: { stroke: WHITE_COLOR, strokeWidth: 1},
        ticks: {
          size: (tick) => {
            const tickSize = 10;
            return tickSize;
          },
          stroke: WHITE_COLOR,
          strokeWidth: 1
        },
        tickLabels: {
          fill: WHITE_COLOR,
          fontFamily: "inherit",
          fontSize: 10
        }
      },

      // DATA SET ZERO
      axisZero: {
        grid: {
          stroke: (tick) =>
            tick === -10 ? "transparent" : "#ffffff",
          strokeWidth: 1
        },
        axis: { stroke: WHITE_COLOR, strokeWidth: 1 },
        ticks: { strokeWidth: 1 },
        tickLabels: {
          fill: WHITE_COLOR,
          fontFamily: "inherit",
          fontSize: 10
        }
      },
      labelZero: {
        fill: WHITE_COLOR,
        fontFamily: "inherit",
        fontSize: 10,
        fontStyle: "italic"
      },
      lineZero: {
        data: { stroke: WHITE_COLOR, strokeWidth: 1.5 }
      },
      axisZeroCustomLabel: {
        fill: WHITE_COLOR,
        fontFamily: "inherit",
        fontWeight: 300,
        fontSize: 10
      }
    }
  }

  getTickValues(minX, maxX) {
    let xd = (maxX-minX)/4;
    return [ minX, minX+xd, minX+2*xd, minX+3*xd, maxX ];
  }

  getTickYValues(minY, maxY) {
    let xd = (maxY-minY)/5;
    return [ minY, minY+xd, minY+2*xd, minY+3*xd, minY+4*xd, maxY ];
  }

  render () {
    let aiTag = this.state.items.aiTag;
    let pd = this.state.plotDetails;
    if( pd === null ) {
      pd.numberDays = 2;
      pd.max0 = aiTag.maxValue;
      pd.min0 = aiTag.minValue;
    }
    let styles = this.getStyles();
    let tag = aiTag.tag;
    let name = tag.name;
    let zeroValue = pd.min0===-Infinity?aiTag.zeroValue:pd.min0;
    let maxValue = pd.max0===Infinity?aiTag.maxValue:pd.max0;
    let it = this.state.items.history;
    const quit = this.state.quit;
    let fc = this.props.fieldChange;
 
    var n = new Date();
    var now = n.toLocaleString('en-US');

    let LabelZero = "";
    let AxisZero = "";
    let LineZero = "";
    let AxisTwo = "";

    let minTime = it[0].x;
    let maxTime = it[it.length-1].x;

    let tickValues = this.getTickYValues(minTime,maxTime);
    const tick0Values = this.getTickValues(zeroValue, maxValue);

    const lblZero = name + " - " + tag.description;

    LabelZero = <VictoryLabel x={25} y={15} text={lblZero} style={styles.labelZero} />
    AxisZero  = <VictoryAxis dependentAxis domain={ [zeroValue, maxValue] } offsetX={50}
                             orientation="left" standalone={false}
                             style={styles.axisZero} tickValues={tick0Values} />;
    LineZero  = <VictoryLine data={it} domain={{x: [minTime, maxTime], y: [zeroValue, maxValue] }}
                             interpolation="monotoneX" scale={{x: "linear", y: "linear"}}
                             standalone={false} style={styles.lineZero} />
    AxisTwo  = <VictoryAxis domain={[zeroValue, maxValue]} orientation="right" 
                            standalone={false} style={styles.axisZero} tickValues={tick0Values} />;
    
    return(
      <div>
      <h2>
        <div className={"oms-tags"}>
           <img src="./images/spacer.png" alt="" height="1px" width="100px"/>
           {now}
        </div>
      <table>
        <tbody>
          <tr>
            <td>Days to display:</td>
            <td colSpan={4}>
              <input className="oms-spacing-60" type={"text"} value={pd.numberDays}
                     name="numberDays" id="numberDays" size="3" maxLength="3" 
                     onChange={fc}/>
            </td>
          </tr>
          <tr>
            <td>Max value</td>
            <td className="oms-spacing-80">
              <input className="oms-spacing-60" type={"text"} value={pd.max0} 
                     name="max0" id="max0" size="5" maxLength="5" onChange={fc}/>
            </td>
          </tr>
          <tr>
            <td>Min value</td>
            <td className="oms-spacing-80">
              <input className="oms-spacing-60" type={"text"} value={pd.min0} 
                     name="min0" id="min0" size="5" maxLength="5" onChange={fc}/>
            </td>
          </tr>
          <tr>
            <td>
              <input type="submit" id="closeForm"  name="closeForm"  
                     value=" Quit " className="oms-spacing"
                     onClick={(e) => {quit(e)}} />
            </td>
            <td colSpan="4">&nbsp;</td>
          </tr>
        </tbody>
      </table>
      </h2>
      <svg style={styles.parent} viewBox="0 0 640 400">
        {LabelZero}
        <g transform={"translate(20, 0)"}>
            {/* Add shared independent axis */}
          <VictoryAxis
              scale="linear"
              standalone={false}
              style={styles.axisYears}
              tickValues={tickValues}
              tickFormat={
                (x) => {
                  return moment(x*1000).format('MM-DD HH:mm')
                }
              }
            />
          {AxisZero}
          {LineZero}
          {AxisTwo}
        </g>
      </svg>
      </div>
    );
  }
}

export default ItemDisplay;

/* rechart
      <LineChart width={480}
                 height={300}
                 data={it} >
        <CartesianGrid strokeDasharray="3 3"/>
        <XAxis allowDataOverflow={true}
               dataKey="x"
               domain={[left, right]}
               type="number"
               tickFormatter={(unixTime) => moment(unixTime*1000).format('MM-DD HH:mm:ss')} />
        <YAxis allowDataOverflow={true}
               domain={[bottom, top]}
               type="number"
               yAxisId="1" />
        <Line  yAxisId="1" type='natural' dataKey='y' 
               stroke="#C3C2B9" />

      </LineChart>      
*/