import React, {Component} from 'react';
//import { Stage, Layer, Text } from 'react-konva';
import Log      from '../../requests/Log.js';
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';
import moment   from 'moment';

/*************************************************************************
 * ItemDisplay.js
 * Copyright (C) 2018  A. E. Van Ness
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



class ItemDisplay extends Component {
  constructor( props ) {
    super(props);
    this.state = {
      id: props.id,
      updateData: false,
      updateDisplay: true,
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
    Log.info( "ItemDisplay.willRcvProps: "
               + ((nextProps.option===null)?"null":nextProps.option) );
    this.setState({ id: nextProps.id,
                    items: nextProps.items,
                    quit:  nextProps.quit });
  }
  
  render () {
    let name = this.state.items.aiTag.tag.name;
    let zeroValue = this.state.items.aiTag.zeroValue;
    let maxValue = this.state.items.aiTag.maxValue;
    let it = this.state.items.history;
    const quit = this.state.quit;
 
    var n = new Date();
    var now = n.toLocaleString('en-US');
    Log.info("ItemDisplay.render");
    var bottom = zeroValue;
    var left = this.state.left;
    var right = this.state.right;
    var top = maxValue;
    return(
      <div>
      <h2>
        <div className={"oms-tags"}>
           <img src="./images/spacer.png" alt="space" height="1px" width="100px"/>
           Tag {name} ({this.state.id}) - {now}
        </div>
      </h2>
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
      <p/>
      <input type="submit" id="closeForm"  name="closeForm"  
             value=" Quit " className="oms-spacing"
             onClick={(e) => {quit(e)}} />
      </div>
    );
  }
}

export default ItemDisplay;