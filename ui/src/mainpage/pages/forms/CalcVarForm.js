/*************************************************************************
 * CalcVarForm.js
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

import React, {Component} from 'react';
import Log      from '../../requests/Log.js';


class CalcVarForm extends Component {
  constructor(props) {
    super(props);
    Log.info( "CalcVarForm: constructor " );
    this.state = { 
      imgLeft: null,
      imgRight: null
    };
    this.moveLeft  = this.moveLeft.bind(this);
    this.moveRight = this.moveRight.bind(this);
  }

  componentDidMount() {
    let imgLeft  = new window.Image();
    let imgRight = new window.Image();
    imgLeft.src = "images/leftArrow.png";
    imgLeft.onload = ()  => { this.setState( {imgLeft:imgLeft} ); }
    imgRight.src = "images/rightArrow.png";
    imgRight.onload = () => { this.setState( {imgRight:imgRight} ); }
  }
  
  moveLeft(event) {
    event.preventDefault();
    let now = new Date();
    Log.info( "CalcVarAdmin.moveLeft " + now.toISOString() );
    let cv = this.props.calcVar;
    let inpTagList = this.props.calcInpList;
//    let lft = this.refs.inputTags;
    let rit = this.refs.inputTagList;
    var ndx = rit.selectedIndex;
    if( ndx !== undefined ) {
      var id = parseInt(rit[ndx].value,10);
      var name = rit[ndx].text;
      var option = {};
      option.id = id;
      option.name = name;
      cv.inputTagIds.push(id);
      cv.inputTags.push(option);
      inpTagList = inpTagList.filter(n => n.id !== id);
      this.props.requestRender();
    }    
  }

  moveRight(event) {
    event.preventDefault();
    let now = new Date();
    Log.info( "CalcVarAdmin.moveRight " + now.toISOString() );
    let cv = this.props.calcVar;
    let inpTagList = this.props.calcInpList;
    let lft = this.refs.inputTags;
//    let rit = this.refs.inputTagList;
    var ndx = lft.selectedIndex;
    if( ndx !== undefined ) {
      var id = parseInt(lft[ndx].value,10);
      var name = lft[ndx].text;
      var option = {};
      option.id = id;
      option.name = name;
      cv.inputTags = cv.inputTags.filter(n => n.id !== id );
      cv.inputTagIds = cv.inputTagIds.filter(n => n !== id);
      inpTagList.unshift(option);
      this.props.requestRender();
    }
  }


  render() {
    const cv = this.props.calcVar;
    const otl = this.props.calcOutList;
    var inputTags = cv.inputTags;
    const tagList = this.props.calcInpList;
    const handleUpdate = this.props.handleUpdate;
    const handleQuit = this.props.handleQuit;
    const handleChange = this.props.handleChange;
    const moveLeft = this.moveLeft;
    const moveRight = this.moveRight;
    const imgLeft = "images/leftArrow.png";
    const imgRight = "images/rightArrow.png";
    
    var midStyle   = { verticalAlign: 'middle'};
    var leftStyle  = { height: '20px', width: '50px', margin: '5px', padding: '2px' };
    var rightStyle = { height: '20px', width: '50px', margin: '5px', padding: '2px' };
    
//    const tag  = ud.tag;
    

    return(
      <div className="oms-tabs">
      <table>
        <tbody>
          <tr>
            <td className="oms-top">

      <form id="CalcVarForm" >
        Please enter your Calculated Variable information 
        <table>
          <tbody className="scrollContent-medium">
          <tr>
            <th className="oms-spacing-120">&nbsp;</th>
            <td className="oms-spacing"><img src="images/spacer.png" 
                alt="space" height="5px" width="240px"/>
            </td>
          </tr>
          <tr>
            <th className="oms-spacing-120">Name (10 chars):</th>
            <td className="oms-spacing">
              <input type="hidden" name="id" value={cv.id} />            
              <input type="text" id="tag.name" name="tag.name" value={cv.tag.name} 
                     className={["oms-spacing-90","oms-fontsize-12"].join(' ')}  size="25" maxLength="10"
                     onChange={handleChange} />
            </td>
          </tr>
          <tr>
            <td className="oms-spacing-120">Active:</td>
            <td className="oms-spacing">
              <select id="tag.active" name="tag.active" value={cv.tag.active} 
                      onChange={handleChange} >
                <option value="N">N</option>
                <option value="Y">Y</option>
              </select>
            </td>
          </tr>
          <tr>
            <th className="oms-spacing-120">Description:</th>
            <td className="oms-spacing">
              <input type="text" id="tag.description" name="tag.description" value={cv.tag.description}
                     className={["oms-spacing-180","oms-fontsize-12"].join(' ')}  size="120" maxLength="120"
                     onChange={handleChange} />
            </td>
          </tr>
          <tr>
            <th className="oms-spacing-120">Definition (RPN):</th>
            <td className="oms-spacing">
              <input type="text" id="definition" name="definition" value={cv.definition}
                     className={["oms-spacing-240","oms-fontsize-12"].join(' ')}  size="120" maxLength="80"
                     onChange={handleChange} />
            </td>
          </tr>
          <tr>
            <th className="oms-spacing-120">Output Tag:</th>
            <td>
              <select name="outputTagId" id="outputTagId" value={cv.outputTagId}
                     className= {["oms-spacing-120","oms-fontsize-12"].join(' ')} 
                     onChange={handleChange}>
                {otl.map(function(n,x) {
                            return <option key={x} value={n.id}>{n.name}</option>
                        } )
                }
              </select>
            </td>
          </tr>
          <tr><th>&nbsp;</th><td>&nbsp;</td></tr>
          <tr>
            <th className="oms-spacing-120" style={midStyle}>Input Tags:</th>
            <td>
              <table>
                <tbody>
                <tr>
                  <td>
                    <select name="inputTagIds" id="inputTagIds" ref="inputTags" size={10}
                           className= {["oms-spacing-120","oms-fontsize-12"].join(' ')} 
                           onChange={handleChange}>
                      {inputTags.map(function(n,x) {
                          return <option key={x} value={n.id}>{n.name}</option>
                        } )
                      }
                    </select>
                  </td>
                  <td style={midStyle}>
                    <a onClick={moveLeft}><img src={imgLeft} alt="leftArrow" style={leftStyle} /></a>
                    <p/>
                    <a onClick={moveRight}><img src={imgRight} alt="rightArrow" style={rightStyle} /></a>
                  </td>
                  <td>
                    <select name="inputTags" id="inputTags"  ref="inputTagList" size={10}
                           className= {["oms-spacing-120","oms-fontsize-12"].join(' ')} >
                      {tagList.map(function(n,x) {
                          return <option key={x} value={n.id}>{n.name}</option>
                        } )
                      }
                    </select>
                  </td>
                </tr>
                </tbody>
              </table>
            </td>            
          </tr>
          </tbody>
        </table>
        <table className="oms-spacing">
          <tbody>
          <tr  className="oms-spacing">
            <td colSpan="2">
              &nbsp;<input type="submit" id="closeForm"  name="closeForm"  
                           value="Quit" onClick={(e) => {handleQuit(e)}}  />
              &nbsp;<input type="submit" id="submitForm" name="submitForm" 
                           value="Submit" onClick={(e) => {handleUpdate(e)}} />
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

export default CalcVarForm;
