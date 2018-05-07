import React, {Component} from 'react';
import { Stage, Layer, Arc, Line, Circle, Ellipse, Text } from 'react-konva';
import Konva from 'konva';



function Radius(xp,yp) { this.x=xp; this.y=yp; }

class OmsEllipse extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      color: 'midnightblue',
      r: props.radius,
      x: props.x,
      y: props.y,
      stroke: props.stroke,
      rotation: props.rotation
    };
  }
  
  handleClick = () => {
    this.setState({
      color: Konva.Util.getRandomColor()
    });
  };

  
  render() {
    return (
      <Ellipse
        x = {this.state.x}
        y = {this.state.y}
        radius={this.state.r}
        rotation = {this.state.rotation}
        fill={this.state.color}
        opacity={1}
        fillOpacity={0}
        shadowBlur={5}
        stroke={this.state.stroke}
      />
    );
  }
}

/*    Vertical (1)   Horizontal (2)
 *  1   155, 15        30, 160   OK
 *  2   175, 75        90, 128   OK
 *  3   165, 135      150, 120   OK
 *  4   155, 195      210, 125   OK
 *  5   127, 255      270, 122   OK
 *  6    80, 305      331, 160   OK
 *  7    65, 255      270, 193   OK
 *  8    71, 195      210, 199   OK
 *  9    84, 135      150, 199   OK 
 * 10   106, 75        90, 192   OK
 */

class LoginDisplay extends Component {
  constructor( props ) {
    super(props);
    this.state={
      pos1x:155,
      pos1y:15,
      pos2x:30,
      pos2y:160,
      timerID: null,
      next: 0
    };
    this.interval = setInterval(this.updateScreen.bind(this),500);
    this.p1x = [ 71, 74, 77, 81, 84, 89, 95,100,106,115,125,136,155,169,173,174,175,173,172,170, -3, -3, -3, -3, -3,145,141,133,127,120,113,101, 80, 70, 67, 66, 66, 66, 68, 69];
    this.p1y = [195,180,165,150,135,120,105, 89, 74, 58, 43, 28, 15, 30, 45, 60, 75, 90,105,120,135,140,165,180,195,210,225,240,255,267,280,292,305,295,285,270,255,240,225,205];
    this.p2x = [240,225,210,195,180,165,150,135,120,105, 90, 75, 60, 45, 30, 45, 60, 75, 90,105,120,135,150,165,180,195,210,225,240,255,270,292,316,323,331,315,300,285,270,255];
    this.p2y = [196,197,199,199,199,199,199,198,196,194,192,189,185,179,160,142,136,131,128,126,124,122,120,120,120,120,121,123,124,126,128,136,144,150,160,177,184,188,193,195];
  }
  
  componentWillUnmount() {
    clearInterval(this.interval);
  }
  
  updateScreen() {
    let n = this.state.next + 1;
    if( n >= this.p1x.length ) {
      n = 0;
    }
    this.setState( {pos1x:this.p1x[n], pos1y:this.p1y[n],
                    pos2x:this.p2x[n], pos2y:this.p2y[n],
                    next: n } );
  }
  
  render() {
    let alias = this.props.alias;
    let handleChange = this.props.handleLoginChange;
    let handleLogin = this.props.handleLogin;
    
    const r1 = new Radius(150,40);
    const r2 = new Radius(40,150);
    return( 
      <div>
      <table className="oms-table">
        <tbody>
          <tr>
            <td>

              <Stage width={400} height={360}>
                <Layer>
                  <OmsEllipse radius={r1}
                              x={120}
                              y={160}
                              stroke={"#C3C2B9"}
                              color={"midnightblue"}
                              rotation={105}/>
                  <OmsEllipse radius={r2}
                              x={180}
                              y={160}
                              stroke={"#C3C2B9"}
                              color={"midnightblue"}
                              rotation={90}/>
                  <Text text="Oil Movement System"
                        x={88}
                        y={148}
                        fontSize={22}
                        fontStyle={"italic"}
                        stroke={"#C3C2B9"} />
                  <Circle radius={2}
                          stroke={"white"}
                          fill={"white"}
                          x={this.state.pos1x}
                          y={this.state.pos1y} />
                  <Circle radius={2}
                          stroke={"white"}
                          fill={"white"}
                          x={this.state.pos2x}
                          y={this.state.pos2y} />
                  <Arc    innerRadius = {300}
                          outerRadius = {300}
                          x = {370}
                          y = {229}
                          angle = {12}
                          rotation = {188}
                          stroke={"#C3C2B9"} />
                  <Line   points={[0, 160, 32, 160]}
                          x = {0}
                          y = {0}
                          stroke={"#C3C2B9"}
                          strokeWidth={3} />
                  <Line   points={[330, 160, 400, 160]}
                          x = {0}
                          y = {0}
                          stroke={"#C3C2B9"}
                          strokeWidth={3} />
                          
                </Layer>
              </Stage>

            </td>
            <td className="oms-top">
            
              <form id="omsLogin" onSubmit={handleLogin} >
              <table className="oms-table" width="320px" height="150px">
                <tbody>
                <tr>
                  <td className="oms-right-text">
                    <img src="./images/spacer.png" alt="space" height="90px"/>
                  </td>
                  <td className="oms-left-text">&nbsp;</td>
                </tr>
                <tr>
                  <td className="oms-right-text">User:&nbsp;</td>
                  <td className="oms-left-text">
                    &nbsp;<input type="text" name="alias" value={alias} onChange={handleChange} />
                  </td>
                </tr>
                <tr><td colSpan="2" className="oms-right-text">&nbsp;</td></tr>
                <tr>
                  <td className="oms-right-text" >Password:&nbsp;</td>
                  <td className="oms-left-text">
                    &nbsp;<input type="password" name="pwd" onChange={handleChange} />
                  </td>
                </tr>
                <tr><td colSpan="2" className="oms-right-text">&nbsp;</td></tr>
                <tr>
                  <td className="oms-right-text">&nbsp;</td>
                  <td className="oms-left-text">
                    &nbsp;<input type="submit" value="Submit" />
                  </td>
                </tr>
                <tr>
                  <td className="oms-right-text"><img src="./images/spacer.png" alt="space" height="10px"/></td>
                  <td className="oms-left-text">&nbsp;</td>
                </tr>
                </tbody>
              </table>
              </form>

            </td>
          </tr>
        </tbody>
      </table>
      </div>
    );
  }
  
}

export default LoginDisplay;
