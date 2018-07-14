import React, {Component} from 'react';
//import { Stage, Layer, Text } from 'react-konva';
import { VictoryAxis, VictoryLabel, VictoryLine } from 'victory';
import moment from 'moment';

//import {SERVERROOT}  from '../../Parameters.js';
//import {AIValue}     from './objects/AIValue.js';



class GroupPlot extends Component {
  constructor( props ) {
    super(props);
    this.state = {
      updateData: false,
      updateDisplay: true,
      d0: props.d0,
      d1: props.d1,
      d2: props.d2,
      d3: props.d3
    };
  }
  
  componentWillReceiveProps(nextProps) {
    console.log( "GroupPlot.willRcvProps " );
    this.setState({ d0: nextProps.d0,
                    d1: nextProps.d1,
                    d2: nextProps.d2,
                    d3: nextProps.d3 });
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
        height: "80%"
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
          fill: GREEN_COLOR,
          fontFamily: "inherit",
          fontSize: 10
        }
      },
      labelTwo: {
        textAnchor: "start",
        fill: GREEN_COLOR,
        fontFamily: "inherit",
        fontSize: 10,
        fontStyle: "italic"
      },
      lineTwo: {
        data: { stroke: GREEN_COLOR, strokeWidth: 1.5 }
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
    let xd = (maxY-minY)/5;
    return [ minY, minY+xd, minY+2*xd, minY+3*xd, minY+4*xd, maxY ];
  }


  render () {
    let styles = this.getStyles();
    let d0 = this.state.d0;
    let d1 = this.state.d1;
    let d2 = this.state.d2;
    let d3 = this.state.d3;
    
    if( d0 == null ) {
        return
    }
    const minTime = Math.min( d0.history[0].x
                            , d1 !== null?d1.history[0].x:d0.history[0].x
                            , d2 !== null?d2.history[0].x:d0.history[0].x
                            , d3 !== null?d3.history[0].x:d0.history[0].x);
    const maxTime = d0.history[d0.history.length-1].x;
    
    const minY0 = d0.aiTag.zeroValue;
    const maxY0 = d0.aiTag.maxValue;
    const tick0Values = this.getTickYValues(minY0,maxY0);
    const dataSetZero = d0.history;
    const labelZero  = d0.aiTag.tag.name + " - " + d0.aiTag.tag.description;

    let LabelZero = <VictoryLabel x={25} y={15} text={labelZero} style={styles.labelZero} />
    let AxisZero  = <VictoryAxis dependentAxis domain={ [minY0, maxY0] } offsetX={50}
                                orientation="left" standalone={false}
                                style={styles.axisZero} tickValues={tick0Values} />;
    let LineZero  = <VictoryLine data={dataSetZero} domain={{x: [minTime, maxTime], y: [minY0, maxY0] }}
                                 interpolation="monotoneX" scale={{x: "linear", y: "linear"}}
                                 standalone={false} style={styles.lineZero} />

    let LabelOne = "";
    let AxisOne  = "";
    let LineOne  = "";
    if( d1 !== null ) {
      const minY1 = d1.aiTag.zeroValue;
      const maxY1 = d1.aiTag.maxValue;
      const tick1Values = this.getTickYValues(minY1,maxY1);
      const dataSetOne = d1.history;
      const labelOne   = d1.aiTag.tag.name + " - " + d1.aiTag.tag.description;
      
      LabelOne = <VictoryLabel x={25} y={30} text={labelOne} style={styles.labelOne} />;
      AxisOne =  <VictoryAxis domain={[minY1, maxY1]} offsetX={30} orientation="left"
                              standalone={false} style={styles.axisOne} tickValues={tick1Values} />;
      LineOne  = <VictoryLine data={dataSetOne} domain={{x: [minTime, maxTime], y: [minY1,   maxY1] }}
                              interpolation="monotoneX" scale={{x: "linear", y: "linear"}}
                              standalone={false} style={styles.lineOne} />;
    }

    let LabelTwo = "";
    let AxisTwo  = "";
    let LineTwo  = "";
    if( d2 !== null ) {
      const minY2 = d2.aiTag.zeroValue;
      const maxY2 = d2.aiTag.maxValue;
      const tick2Values = this.getTickYValues(minY2,maxY2);
      const dataSetTwo = d2.history;
      const labelTwo   = d2.aiTag.tag.name + " - " + d2.aiTag.tag.description;

      LabelTwo = <VictoryLabel x={25} y={45} text={labelTwo} style={styles.labelTwo} />;
      AxisTwo =  <VictoryAxis domain={[minY2, maxY2]} orientation="right" 
                              standalone={false} style={styles.axisTwo} tickValues={tick2Values} />;
      LineTwo  = <VictoryLine data={dataSetTwo} domain={{x: [minTime, maxTime], y: [minY2,   maxY2] }}
                              interpolation="monotoneX" scale={{x: "linear", y: "linear"}}
                              standalone={false} style={styles.lineTwo} />;
    } else {
      AxisTwo = <VictoryAxis domain={[minY0, maxY0]} orientation="right" standalone={false}
                              style={styles.axisZero} tickValues={tick0Values} />;
    }

    let LabelThree = "";
    let AxisThree  = "";
    let LineThree  = "";
    if( d3 !== null ) {
      const minY3 = d3.aiTag.zeroValue;
      const maxY3 = d3.aiTag.maxValue;
      const tick3Values = this.getTickYValues(minY3,maxY3);
      const dataSetThree  = d3.history;
      const labelThree = d3.aiTag.tag.name + " - " + d3.aiTag.tag.description;
      
      LabelThree = <VictoryLabel x={25} y={60} text={labelThree} style={styles.labelThree} />
      AxisThree  = <VictoryAxis domain={[minY3, maxY3]} offsetX={30} orientation="right"
                                standalone={false} style={styles.axisThree} tickValues={tick3Values} />;
      LineThree  = <VictoryLine data={dataSetThree} domain={{x: [minTime, maxTime],y: [minY3,   maxY3] }}
                                interpolation="monotoneX" scale={{x: "linear", y: "linear"}}
                                standalone={false} style={styles.lineThree} />;
    }

    const tickValues = this.getTickValues(minTime, maxTime);
    
    var n = new Date();
    var now = n.toLocaleString('en-US');
    console.log(now+" GroupPlot.render");
    return(
      <div>
      <h2>
        <div className={"oms-tags"}>
           <img src="./images/spacer.png" alt="space" height="1px" width="100px"/>
           {now}
        </div>
      </h2>
      <svg style={styles.parent} viewBox="0 0 640 400">
        {LabelZero}
        {LabelOne}
        {LabelTwo}
        {LabelThree}
        <g transform={"translate(20, 40)"}>
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
      </div>
    );
  }
}

export default GroupPlot;