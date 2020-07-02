/*************************************************************************
 * GroupPlot.js
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
import {PlotDetails} from '../objects/PlotGroup.js';

import { VictoryAxis, VictoryChart, VictoryLabel, VictoryLine, VictoryTheme } from 'victory';
import moment from 'moment';



class GroupPlot extends Component {
  constructor( props ) {
    super(props);
    this.state = {
      updateData: false,
      updateDisplay: true,
      d0: props.d0,
      d1: props.d1,
      d2: props.d2,
      d3: props.d3,
      plotDetails: props.plotDetails
    };
  }

  static getDerivedStateFromProps(nextProps, state ) {
	let nextState = state;
    nextState = { updateData: state.updateData,
                  updateDisplay: state.updateDisplay,
                  d0: nextProps.d0,
                  d1: nextProps.d1,
                  d2: nextProps.d2,
                  d3: nextProps.d3,
                  plotDetails: nextProps.plotDetails };
    return nextState;
  }

  getStyles() {
//    const BLUE_COLOR = "#00a3de";
    const RED_COLOR = "#7c270b";
    const WHITE_COLOR = "#C3C2B9";
    const GREEN_COLOR = "darkgreen";
    const YELLOW_COLOR = "yellow";

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
          fill: GREEN_COLOR,
          fontFamily: "inherit",
          fontSize: 10
        }
      },
      labelZero: {
        fill: GREEN_COLOR,
        fontFamily: "inherit",
        fontSize: 10,
        fontStyle: "italic"
      },
      lineZero: {
        data: { stroke: GREEN_COLOR, strokeWidth: 1.5 }
      },
      axisZeroCustomLabel: {
        fill: GREEN_COLOR,
        fontFamily: "inherit",
        fontWeight: 300,
        fontSize: 10
      },

      // DATA SET ONE
      axisOne: {
        axis: { stroke: RED_COLOR, strokeWidth: 0 },
        tickLabels: {
          fill: RED_COLOR,
          fontFamily: "inherit",
          fontSize: 10
        }
      },
      labelOne: {
        textAnchor: "start",
        fill: RED_COLOR,
        fontFamily: "inherit",
        fontSize: 10,
        fontStyle: "italic"
      },
      lineOne: {
        data: { stroke: RED_COLOR, strokeWidth: 1.5 }
      },

      // DATA SET TWO
      axisTwo: {
        axis: { stroke: WHITE_COLOR, strokeWidth: 1 },
        tickLabels: {
          fill: WHITE_COLOR,
          fontFamily: "inherit",
          fontSize: 10
        }
      },
      labelTwo: {
        textAnchor: "start",
        fill: WHITE_COLOR,
        fontFamily: "inherit",
        fontSize: 10,
        fontStyle: "italic"
      },
      lineTwo: {
        data: { stroke: WHITE_COLOR, strokeWidth: 1.5 }
      },

      // DATA SET THREE
      axisThree: {
        axis: { stroke: YELLOW_COLOR, strokeWidth: 0 },
        tickLabels: {
          fill: YELLOW_COLOR,
          fontFamily: "inherit",
          fontSize: 10
        }
      },
      labelThree: {
        textAnchor: "start",
        fill: YELLOW_COLOR,
        fontFamily: "inherit",
        fontSize: 10,
        fontStyle: "italic"
      },
      lineThree: {
        data: { stroke: YELLOW_COLOR, strokeWidth: 1.5 }
      }

    };
  }

  getTickValues(minX, maxX) {
    let xd = (maxX-minX)/4;
    return [ minX, minX+xd, minX+2*xd, minX+3*xd, maxX ];
  }

  getTickYValues(minY, maxY) {
    var xd = (maxY-minY)/5;
    return [ minY, minY+xd, minY+2*xd, minY+3*xd, minY+4*xd, maxY ];
  }


  render () {
    let styles = this.getStyles();
    let d0 = ((this.state.d0!==null)&&(this.state.d0!==undefined))?this.state.d0:null;
    let d1 = ((this.state.d1!==null)&&(this.state.d1!==undefined))?this.state.d1:null;
    let d2 = ((this.state.d2!==null)&&(this.state.d2!==undefined))?this.state.d2:null;
    let d3 = ((this.state.d3!==null)&&(this.state.d3!==undefined))?this.state.d3:null;
    let pd = this.state.plotDetails;
    if( (pd===null) || (pd===undefined) ) { pd = new PlotDetails(); }
    let fc = this.props.fieldChange;

    const minTime = Math.min( ( d0 !== null ) ? d0.history[0].x:Infinity
                            , ( d1 !== null ) ? d1.history[0].x:Infinity
                            , ( d2 !== null ) ? d2.history[0].x:Infinity
                            , ( d3 !== null ) ? d3.history[0].x:Infinity);

    const maxTime = Math.max( ( d0 !== null ) ? d0.history[d0.history.length-1].x:-Infinity
                            , ( d1 !== null ) ? d1.history[d1.history.length-1].x:-Infinity
                            , ( d2 !== null ) ? d2.history[d2.history.length-1].x:-Infinity
                            , ( d3 !== null ) ? d3.history[d3.history.length-1].x:-Infinity);

    let LabelZero = "";
    let AxisZero = "";
    let LineZero = "";
    let minY0 = 0;
    let maxY0 = 100;
    let tick0Values = this.getTickYValues(minY0,maxY0);
    if( d0 !== null ) {
      minY0 = pd.min0;
      maxY0 = pd.max0;
      tick0Values = this.getTickYValues(minY0,maxY0);
      const dsZero  = d0.history;
      const lblZero = d0.aiTag.tag.name + " - " + d0.aiTag.tag.description;

      LabelZero = <VictoryLabel x={25} y={15} text={lblZero} style={styles.labelZero} />
      AxisZero  = <VictoryAxis dependentAxis domain={ [minY0, maxY0] } offsetX={50}
                               orientation="left" standalone={false}
                               style={styles.axisZero} tickValues={tick0Values} />;
      LineZero  = <VictoryLine data={dsZero} domain={{x: [minTime, maxTime], y: [minY0, maxY0] }}
                               interpolation="monotoneX" scale={{x: "time", y: "linear"}}
                               standalone={false} style={styles.lineZero} />
    }

    let LabelOne = "";
    let AxisOne  = "";
    let LineOne  = "";
    if( d1 !== null ) {
      const minY1 = pd.min1;
      const maxY1 = pd.max1;
      const tick1Values = this.getTickYValues(minY1,maxY1);
      const dsOne  = d1.history;
      const lblOne = d1.aiTag.tag.name + " - " + d1.aiTag.tag.description;

      LabelOne = <VictoryLabel x={25} y={30} text={lblOne} style={styles.labelOne} />;
      AxisOne =  <VictoryAxis domain={[minY1, maxY1]} offsetX={30} orientation="left"
                              standalone={false} style={styles.axisOne} tickValues={tick1Values} />;
      LineOne  = <VictoryLine data={dsOne} domain={{x: [minTime, maxTime], y: [minY1,   maxY1] }}
                              interpolation="monotoneX" scale={{x: "time", y: "linear"}}
                              standalone={false} style={styles.lineOne} />;
    }

    let LabelTwo = "";
    let AxisTwo  = "";
    let LineTwo  = "";
    if( d2 !== null ) {
      const minY2 = pd.min2;
      const maxY2 = pd.max2;
      const tick2Values = this.getTickYValues(minY2,maxY2);
      const dsTwo  = d2.history;
      const lblTwo = d2.aiTag.tag.name + " - " + d2.aiTag.tag.description;

      LabelTwo = <VictoryLabel x={265} y={15} text={lblTwo} style={styles.labelTwo} />;
      AxisTwo  = <VictoryAxis domain={[minY2, maxY2]} orientation="right"
                              standalone={false} style={styles.axisTwo} tickValues={tick2Values} />;
      LineTwo  = <VictoryLine data={dsTwo} domain={{x: [minTime, maxTime], y: [minY2,   maxY2] }}
                              interpolation="monotoneX" scale={{x: "time", y: "linear"}}
                              standalone={false} style={styles.lineTwo} />;
    } else {
      AxisTwo = <VictoryAxis domain={[minY0, maxY0]} orientation="right" standalone={false}
                              style={styles.axisZero} tickValues={tick0Values} />;
    }

    let LabelThree = "";
    let AxisThree  = "";
    let LineThree  = "";
    if( d3 !== null ) {
      const minY3 = pd.min3;
      const maxY3 = pd.max3;
      const tick3Values = this.getTickYValues(minY3,maxY3);
      const dsThree  = d3.history;
      const lblThree = d3.aiTag.tag.name + " - " + d3.aiTag.tag.description;

      LabelThree = <VictoryLabel x={265} y={30} text={lblThree} style={styles.labelThree} />
      AxisThree  = <VictoryAxis domain={[minY3, maxY3]} offsetX={30} orientation="right"
                                standalone={false} style={styles.axisThree} tickValues={tick3Values} />;
      LineThree  = <VictoryLine data={dsThree} domain={{x: [minTime, maxTime],y: [minY3,   maxY3] }}
                                interpolation="monotoneX" scale={{x: "time", y: "linear"}}
                                standalone={false} style={styles.lineThree} />;
    }

    const tickValues = this.getTickValues(minTime, maxTime);

    var now = moment().format('YYYY-MM-DD hh:mm:ss');
    var gstyle = { width:500, height:3};
    return(
      <div>
      <form>
      <table>
        <tbody>
          <tr>
            <td className="oms-spacing-40">Days</td>
            <td>
              <input className="oms-spacing-40" type={"text"} value={pd.numberDays}
                     name="numberDays" id="numberDays" size="3" maxLength="3"
                     onChange={fc}/>
            </td>
            <td rowSpan={12} width={1000}>&nbsp;to display&nbsp;
              <img src="./images/spacer.png" alt="" height="1px" width="100px"/>
              {now}
              <svg  viewBox="0 0 900 500">
              <g transform={"scale(1.25)"}>
              {LabelZero}
              {LabelOne}
              {LabelTwo}
              {LabelThree}
              </g>
              <g transform={"translate(10, 4) scale(1.75)"} >
              {/* Add shared independent axis */}
              <VictoryAxis
                scale="linear"
                standalone={false}
                style={styles.axisYears}
                tickValues={tickValues}
                tickFormat={ (x) => {return moment(x*1000).format('MM-DD HH:mm')} }
              />
              {AxisZero}
              {AxisOne}
              {AxisTwo}
              {AxisThree}
              {/* dataset 0 */}
              {LineZero}
              {/* dataset 1 */}
              {LineOne}
              {/* dataset 2 */}
              {LineTwo}
              {/* dataset 3 */}
              {LineThree}
              </g>
              </svg>
            </td>
          </tr>
          <tr>
            <td><img src="./images/spacer.png" alt="" width="30px" height="23px"/></td>
            <td><img src="./images/spacer.png" alt="" width="30px" height="23px"/></td>
          </tr>
          <tr>
            <td>Min </td>
            <td>Max </td>
          </tr>
          <tr>
            <td>(1-4):</td>
            <td>(1-4):</td>
          </tr>
          <tr>
            <td className="oms-spacing-40">
              <input className="oms-spacing-40" type={"text"} value={pd.min0}
                     name="min0" id="min0" size="5" maxLength="5" onChange={fc}/>
            </td>
            <td className="oms-spacing-40">
              <input className="oms-spacing-40" type={"text"} value={pd.max0}
                     name="max0" id="max0" size="5" maxLength="5" onChange={fc}/>
            </td>
          </tr>
          <tr>
            <td className="oms-spacing-40">
              <input className="oms-spacing-40" type={"text"} value={pd.min1}
                     name="min1" id="min1" size="5" maxLength="5" onChange={fc}/>
            </td>
            <td className="oms-spacing-40">
              <input className="oms-spacing-40" type={"text"} value={pd.max1}
                     name="max1" id="max1" size="5" maxLength="5" onChange={fc}/>
            </td>
          </tr>
          <tr>
            <td className="oms-spacing-40">
              <input className="oms-spacing-40" type={"text"} value={pd.min2}
                     name="min2" id="min2" size="5" maxLength="5" onChange={fc}/>
            </td>
            <td className="oms-spacing-40">
              <input className="oms-spacing-40" type={"text"} value={pd.max2}
                     name="max2" id="max2" size="5" maxLength="5" onChange={fc}/>
            </td>
          </tr>
          <tr>
            <td className="oms-spacing-40">
              <input className="oms-spacing-40" type={"text"} value={pd.min3}
                     name="min3" id="min3" size="5" maxLength="5" onChange={fc}/>
            </td>
            <td className="oms-spacing-40">
              <input className="oms-spacing-40" type={"text"} value={pd.max3}
                     name="max3" id="max3" size="5" maxLength="5" onChange={fc}/>
            </td>
          </tr>
          <tr>
            <td><img src="./images/spacer.png" alt="" width="30px" height="23px"/></td>
            <td><img src="./images/spacer.png" alt="" width="30px" height="23px"/></td>
          </tr>
          <tr>
            <td><img src="./images/spacer.png" alt="" width="30px" height="23px"/></td>
            <td><img src="./images/spacer.png" alt="" width="30px" height="23px"/></td>
          </tr>
          <tr>
            <td><img src="./images/spacer.png" alt="" width="30px" height="23px"/></td>
            <td><img src="./images/spacer.png" alt="" width="30px" height="23px"/></td>
          </tr>
          <tr>
            <td><img src="./images/spacer.png" alt="" width="30px" height="23px"/></td>
            <td><img src="./images/spacer.png" alt="" width="30px" height="23px"/></td>
          </tr>
          <tr>
            <td><img src="./images/spacer.png" alt="" width="30px" height="23px"/></td>
            <td><img src="./images/spacer.png" alt="" width="30px" height="23px"/></td>
          </tr>
        </tbody>
      </table>
      </form>
      </div>
    );
  }
}

export default GroupPlot;


/*
              <svg  viewBox="0 0 740 500">
              {LabelZero}
              {LabelOne}
              {LabelTwo}
              {LabelThree}
              <g transform={"translate(20, 40)"}>
              {/* Add shared independent axis * /}
              <VictoryAxis
                scale="linear"
                standalone={false}
                style={styles.axisYears}
                tickValues={tickValues}
                tickFormat={ (x) => {return moment(x*1000).format('MM-DD HH:mm')} }
              />
              {AxisZero}
              {AxisOne}
              {AxisTwo}
              {AxisThree}
              {/* dataset 0 * /}
              {LineZero}
              {/* dataset 1 * /}
              {LineOne}
              {/* dataset 2 * /}
              {LineTwo}
              {/* dataset 3 * /}
              {LineThree}
              </g>
              </svg>

*/