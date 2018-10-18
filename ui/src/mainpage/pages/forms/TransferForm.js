import React, {Component} from 'react';
//import {Tabs, Tab} from 'react-bootstrap';
import Log       from '../../requests/Log.js';

/*************************************************************************
 * TransferForm.js
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

class TransferForm extends Component {
  constructor(props) {
    super(props);
    Log.info( "TransferForm: " + props.stage );
    this.state = {selected: "Properties"  };
  }


  render() {
    var x        = this.props.transfer;
    const option = this.props.option;
    const st     = this.props.statuses;
    const tt     = this.props.transferTypes;
    const srcs   = this.props.sources;
    const dests  = this.props.sources;
//    var fc       = this.handleFieldChange;
    return (
      <table width="100%">
        <tbody>
        <tr>
          <td>
                    
              <form id="transferForm" >
                Please enter your transfer information 
          <table>
            <tbody className="scrollContent-narrow">
              <tr>
                <th className="oms-spacing-90">&nbsp;</th>
                <td className="oms-spacing"><img src="images/spacer.png" 
                    alt="space" height="5px" width="180px"/></td>
              </tr>
              <tr>
                <th className="oms-spacing-90">Transfer name:</th>
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
                <th className="oms-spacing-90">Transfer Type:</th>
                <td className="oms-spacing">
                  <select id="transferTypeId" name="transferTypeId" value={x.transferTypeId} 
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
                                     onClick={(e) => {this.props.transferUpdate(e)}}/>
                        &nbsp;<input type="submit" id="copyForm" name="copyForm" 
                                     value=" Copy " className="oms-spacing"
                                     onClick={(e) => {this.props.transferCopy(e)}}/>
                      </td>
                    </tr>
                  </tbody>
                </table>
                
              </form>

          </td>
        </tr>
        </tbody>
      </table>
   
     )
  }
  
}

export default TransferForm;
