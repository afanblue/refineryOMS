import React, {Component} from 'react';
//import { Stage, Layer } from 'react-konva';
//import Konva from 'konva';
//import {IMAGEHEIGHT, IMAGEWIDTH} from '../../../Parameters.js';



class SchematicForm extends Component {
  constructor(props) {
    super(props);
    console.log( "SchematicForm: " + props.stage );
    this.state = {  };
  }

  render() {
    var x       = this.props.schematic;
    const xd    = this.props.schematicData;
    const st    = xd.statuses;
    const tt    = xd.schematicTypes;
    const srcs  = xd.sources;
    const dests = xd.destinations;
    return(
      <div className="oms-tabs">
        <table>
          <tbody>
            <tr>
              <td className="oms-top">
        <form id="schematicForm" >
          Please enter your schematic information 
          <table>
            <tbody className="scrollContent-narrow">
              <tr>
                <th className="oms-spacing-90">&nbsp;</th>
                <td className="oms-spacing"><img src="images/spacer.png" 
                    alt="space" height="5px" width="180px"/></td>
              </tr>
              <tr>
                <th className="oms-spacing-90">Schematic name:</th>
                <td className="oms-spacing">
                  <input type="hidden" name="id" value={x.id} />
                  <input type="text" id="name" name="name" value={x.name} 
                         className={["oms-spacing-80","oms-fontsize-12"].join(' ')}
                         size="20" maxLength="20" onChange={this.props.fieldChange} />
                </td>
              </tr>            
              <tr>
                <th className="oms-spacing-90">Status:</th>
                <td className="oms-spacing">
                  <select id="statusId" name="statusId" value={x.statusId}
                          onChange={this.props.fieldChange} >
                    { st.map( 
                      function(n,x){
                        return <option key={x} value={n.id}>{n.name}</option>
                      } )
                    }
                  </select>
                </td>
              </tr>
              <tr>
                <th className="oms-spacing-90">Schematic Type:</th>
                <td className="oms-spacing">
                  <select id="schematicTypeId" name="schematicTypeId" value={x.schematicTypeId} 
                          onChange={this.props.fieldChange} >
                    { tt.map( 
                      function(n,x){
                        return <option key={x} value={n.id}>{n.name}</option>
                      } )
                    }
                  </select>
                </td>
              </tr>
              <tr>
                <th className="oms-spacing-90">Source:</th>
                <td className="oms-spacing">
                  <select id="sourceId" name="sourceId" value={x.sourceId} 
                          onChange={this.props.fieldChange} >
                    { srcs.map( 
                      function(n,x){
                        return <option key={x} value={n.id}>{n.name}</option>
                      } )
                    }
                  </select>
                </td>
              </tr>
              <tr>
                <th className="oms-spacing-90">Destination:</th>
                <td className="oms-spacing">
                  <select id="destinationId" name="destinationId" value={x.destinationId} 
                          onChange={this.props.fieldChange} >
                    { dests.map( 
                      function(n,x){
                        return <option key={x} value={n.id}>{n.name}</option>
                      } )
                    }
                  </select>
                </td>
              </tr>
              <tr>
                <th className="oms-spacing-90">Expected Start:</th>
                <td className="oms-spacing">
                  <input type="text" id="expStartTime" name="expStartTime" value={x.expStartTime}
                         className={["oms-spacing-120","oms-fontsize-12"].join(' ')} 
                         size="20" maxLength="20" onChange={this.props.fieldChange} />
                </td>
              </tr>
              <tr>
                <th className="oms-spacing-90">Expected End:</th>
                <td className="oms-spacing">
                  <input type="text" id="expEndTime" name="expEndTime" value={x.expEndTime}
                         className={["oms-spacing-120","oms-fontsize-12"].join(' ')} 
                         size="20" maxLength="20" onChange={this.props.fieldChange} />
                </td>
              </tr>
              <tr>
                <td className="oms-spacing-90">Expected Volume:</td>
                <td className="oms-spacing">
                  <input type="text" id="expVolume" name="expVolume" value={x.expVolume}
                         className={["oms-spacing-90","oms-fontsize-12"].join(' ')} 
                         size="20" maxLength="10" onChange={this.props.fieldChange} />
                </td>
              </tr>
              <tr>
                <td className="oms-spacing-90">Repeat Interval:</td>
                <td className="oms-spacing">
                  <select id="delta" name="delta" value={x.delta}
                          onChange={this.props.fieldChange} >
                    <option value="0">0</option>
                    <option value="15">15 min</option>
                    <option value="30">30 min</option>
                    <option value="45">45 min</option>
                    <option value="60">1 hour</option>
                    <option value="120">2 hours</option>
                    <option value="180">3 hours</option>
                    <option value="240">4 hours</option>
                    <option value="360">6 hours</option>
                    <option value="480">8 hours</option>
                    <option value="720">12 hours</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td className="oms-spacing-90">Actual Start Time:</td>
                <td className="oms-spacing">
                  {x.actStartTime} 
                </td>
              </tr>
              <tr>
                <td className="oms-spacing-90">Actual End Time:</td>
                <td className="oms-spacing">
                  {x.actEndTime}
               </td>
              </tr>
              <tr>
                <td className="oms-spacing-90">Actual Volume:</td>
                <td className="oms-spacing">
                  {x.actVolume}
     	  		</td>
              </tr>
            
            </tbody>
          </table>
          <table className="oms-spacing">
            <tbody>
              <tr className="oms-spacing">
                <td>
                  <input type="submit" id="closeForm"  name="closeForm"  
                         value=" Quit " className="oms-spacing"
                         onClick={(e) => {this.props.handleQuit(e)}} />
                  &nbsp;<input type="submit" id="submitForm" name="submitForm" 
                               value=" Submit " className="oms-spacing"
                               onClick={(e) => {this.props.schematicUpdate(e)}}/>
                  &nbsp;<input type="submit" id="copyForm" name="copyForm" 
                               value=" Copy " className="oms-spacing"
                               onClick={(e) => {this.props.schematicCopy(e)}}/>
                </td>
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

export default SchematicForm;
