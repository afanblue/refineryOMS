/*************************************************************************
 * AdHoc.js
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
import {SERVERROOT}    from '../../Parameters.js';
import OMSRequest      from '../requests/OMSRequest.js';
import Log             from '../requests/Log.js';

import DefaultContents from './DefaultContents.js';
import PlotGroupVars   from './PlotGroupVars.js';
import Waiting         from './Waiting.js';
import {PlotGroup}     from './objects/PlotGroup.js';

/**
 * the ad hoc form is appropriately ad hoc.  I fetch the contents of plot group
 * w/ID = 0 (i.e., a new plot group), which returns the list of analog values.
 * Since that's all I needed anyway, I display a truncated new plot group form
 * w/only the list of tags.
 * As each item is selected, in the handleChange function I get the history for
 * the selected item and store it away in a state variable, d1, d2, d3, or d4.
 *
 * this creates some problems if an item is dropped, since i have to replace 
 * the history data as well.  it turns out this isn't a big problem, since the
 * new item is always the last one.
 *
 * Anyway, once the submit button is clicked, we generate the plot form.
 *
 * Notice I broke from my usual form by adding the form into the admin script. 
 */

class AdHocForm extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      aiList: props.ailist,
      itl: props.itl,
      imgLeft: null,
      imgRight: null
    };
    this.moveLeft  = this.moveLeft.bind(this);
    this.moveRight = this.moveRight.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ plotGroup: nextProps.plotGroup,
                    aiList: nextProps.aiList,
                    updateData: true,
                    updateDisplay: false,
                    returnedText: null });
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
    let itl = this.props.rtl;
    let ltl = this.props.ltl;
    let aiList = this.props.aiList;
    if( aiList.length < 4 ) {
//    let lft = this.refs.inputTags;
      let rit = this.refs.rtl;
      var ndx = rit.selectedIndex;
      if( ndx !== undefined ) {
        var id = parseInt(rit[ndx].value,10);
        var name = rit[ndx].text;
        var option = {};
        option.id = id;
        option.name = name;
        aiList.push(id);
        ltl.push(option);
        itl = itl.filter(n => n.id !== id);
        this.props.requestRender(ltl, itl, aiList);
      }
    } else {
      alert("A maximum of four (4) tags are graphed at once");
    }  
  }

  moveRight(event) {
    event.preventDefault();
//    let cv = this.props.calcVar;
//    let inpTagList = this.props.calcInpList;
    let lft = this.refs.ltl;
    let ltl = this.props.ltl;
    let rtl = this.props.rtl;
    let aiList = this.props.aiList;
//    let rit = this.refs.inputTagList;
    var ndx = lft.selectedIndex;
    if( ndx !== undefined ) {
      var id = parseInt(lft[ndx].value,10);
      var name = lft[ndx].text;
      var option = {};
      option.id = id;
      option.name = name;
      aiList = aiList.filter(n => n !== id );
      ltl = ltl.filter(n => n.id !== id);
      rtl.unshift(option);
      rtl.sort(function(a, b){return a.name > b.name});
      this.props.requestRender(ltl, rtl, aiList);
    }
  }


  render() {
//    const pg = this.props.plotGroup;
    const handleUpdate = this.props.handleUpdate;
    const handleChange = this.props.handleChange;
//    const handleClick  = this.props.handleClick;
//    const aiList = this.props.aiList;
    var   rtl    = this.props.rtl;
    var   ltl    = this.props.ltl;
    if( ltl === null ) { ltl = []; }

    const moveLeft = this.moveLeft;
    const moveRight = this.moveRight;
    const imgLeft = "images/leftArrow.png";
    const imgRight = "images/rightArrow.png";
    
    var midStyle   = { verticalAlign: 'middle'};
    var leftStyle  = { height: '20px', width: '50px', margin: '5px', padding: '2px' };
    var rightStyle = { height: '20px', width: '50px', margin: '5px', padding: '2px' };
    
    return(
      <div className="oms-tabs">
      <table>
        <tbody>
          <tr>
            <td className="oms-top">

      <form id="plotGroupForm" >
        Please select the items to plot (max 4)
        <table>
          <tbody className="scrollContent-narrow">
          <tr>
            <th className="oms-spacing-120">Tags in Group:</th>
            <td>
              <table>
                <tbody>
                <tr>
                  <td>
                    <select name="ltl" id="ltl" ref="ltl" size={10}
                           className= {["oms-spacing-120","oms-fontsize-12"].join(' ')} 
                           onChange={handleChange}>
                      {ltl.map(function(n,x) {
                          return <option key={x} value={n.id}>{n.name}</option>
                        } )
                      }
                    </select>
                  </td>
                  <td style={midStyle}>
                    <button type="button" className="link-button" onClick={moveLeft}>
                      <img src={imgLeft} alt="leftArrow" style={leftStyle} />
                    </button>
                    <p/>
                    <button type="button" className="link-button" onClick={moveRight}>
                      <img src={imgRight} alt="righttArrow" style={rightStyle} />
                    </button>
                  </td>
                  <td>
                    <select name="rtl" id="rtl"  ref="rtl" size={10}
                           className= {["oms-spacing-120","oms-fontsize-12"].join(' ')} >
                      {rtl.map(function(n,x) {
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

/**
 * AdHocAdmin
 * Description: manages the UI requesting an "ad hoc" set of AI tags to plot
 *
 * rtl = right tag list, ie, the original list of AI tags (id,name) to choose from
 * ltl = left tag list, ie, the list of tags AI tags (id,name) chosen to plot
 * aiList = list of ID's chosen to plot
 */
class AdHocAdmin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stage: props.stage,
      updateData: false,
      updateDisplay: true,
      returnedText: null,
      plotGroup: null,
      d0: null,
      d1: null,
      d2: null,
      d3: null,
      aiList: [],
      rtl: null,
      ltl: [],
      unitTimer: null
    }
    this.handleChange  = this.handleChange.bind(this);
    this.handleClick   = this.handleClick.bind(this);
    this.handleUpdate  = this.handleUpdate.bind(this);
    this.handleQuit    = this.handleQuit.bind(this);
    this.finishPGFetch = this.finishPGFetch.bind(this);
    this.finishAIListFetch = this.finishAIListFetch.bind(this);
    this.requestRender = this.requestRender.bind(this);
  }
  
  handleErrors(response) {
    if (!response.ok) {
        throw Error(response.status+" ("+response.statusText+")");
    }
    return response;
  }

  componentWillReceiveProps(nextProps) {
    if( nextProps.stage !== this.state.stage )
    {
      this.setState({ stage: nextProps.stage,
                      updateData: true,
                      updateDisplay: false,
                      returnedText: null });
    }
  }
  
  shouldComponentUpdate(nextProps,nextState) {
    let sts = nextState.updateDisplay;
    return sts;
  }
  
  requestRender(ltl, rtl, aiList) {
    this.setState({ ltl:ltl, rtl:rtl, aiList:aiList });
  }

  finishPGFetch( req ) {
    let fd = req;
    let ail = [];
    if( fd.id1 !== null ) { ail.push(fd.id1); }
    if( fd.id2 !== null ) { ail.push(fd.id2); }
    if( fd.id3 !== null ) { ail.push(fd.id3); }
    if( fd.id4 !== null ) { ail.push(fd.id4); }
    let pg = new PlotGroup(fd.id, fd.name, fd.active, fd.id1
                          ,fd.id2, fd.id3, fd.id4, fd.source);
    pg.aiList = ail;
    this.setState({stage: "itemRetrieved",
                   updateDisplay: true,
                   updateData: false,
                   plotGroup: pg                 
                  });
  }
  
  finishAIListFetch(req) {
    this.setState({stage: "itemRetrieved", updateDisplay: true, rtl: req });
  }
  
  fetchFormData(id) {
    const loc = "AdHoc.pgSelect";
    let req0 = new OMSRequest(loc, SERVERROOT + "/plotGroup/" + id,
                            "Problem selecting plot group id "+id, this.finishPGFetch);
    req0.fetchData();
    let req1 = new OMSRequest(loc, SERVERROOT + "/tag/idname/AI",
                            "Problem retrieving AI types", this.finishAIListFetch);
    req1.fetchData();
  }

  handleUpdate(event) {
    event.preventDefault();
    var id1 = this.state.aiList[0];
    var id2 = this.state.aiList[1];
    var id3 = this.state.aiList[2];
    var id4 = this.state.aiList[3];
    var pg  = new PlotGroup(0,"","Y",id1,id2,id3,id4,"PG");
/*    var myTimerID = setInterval(() => {this.fetchHistory(id1,1);
                                       this.fetchHistory(id2,2);
                                       this.fetchHistory(id3,3);
                                       this.fetchHistory(id4,4);}, 60000 );
    this.setState({stage: "generatePlot",
                   unitTimer: myTimerID});
*/
    this.setState({stage: "generatePlot",
                   plotGroup: pg});
  }
  
  componentDidMount() {
    this.fetchFormData(0);
  }
  
  componentDidUpdate( prevProps, prevState ) {
    switch (this.state.stage) {
      case "begin":
        break;
      default:
    }
  }
  
  handleChange(event) {
    const target = event.target;
    const value = target.value;
    let pgnew = Object.assign({},this.state.plotGroup);
    Log.info("add value "+value+" to "+target.name,'AdHoc.change');
    if( target.value !== "" ) {
      let tv = parseInt(value,10);
      let f = -1;
      let tNew = [];
      let tLength = (pgnew.aiList===null?0:pgnew.aiList.length);
      for( var i=0; i<tLength; i++) {
        let v = pgnew.aiList.shift();
        if( v === tv ) { 
          f = i;
        } else {
          tNew.push(v);
        }
      }
      if( f === -1 ) {
        if( tNew.length >= 4 ) {
          alert("Plot Groups can only contain 4 tags\n\nPlease remove one before selecting another");
        } else {
          tNew.push(tv);
//          this.fetchHistory(tv,tNew.length);
        }
        pgnew.aiList = tNew;
      }
      this.setState({plotGroup: pgnew } );
    }
    
  }
  
  handleQuit(event) {
    event.preventDefault();
    if( this.state.unitTimer !== null ) {
      clearInterval(this.state.unitTimer);
    }
//    this.fetchFormData(0);
    let pgnew = Object.assign({},this.state.plotGroup);
    let tNew = [];
    pgnew.aiList = tNew;
    this.setState({plotGroup: pgnew, stage: "itemRetrieved" } );
  }
  
  componentWillUnmount() {
    if( this.state.unitTimer !== null ) {
      clearInterval(this.state.unitTimer);
    }
  }
  
  handleClick(event) {
    event.preventDefault();
    Log.info("",'AdHoc.click');
  }

  render() {
    switch( this.state.stage ) {
  	  case "begin":
        return <Waiting />
      case "itemRetrieved":
        if( (this.state.plotGroup===null) || (this.state.rtl===null)) {
          return <Waiting />        
        } else {
          let ltl = (this.state.ltl===null)?[]:this.state.ltl;
          return <AdHocForm plotGroup    = {this.state.plotGroup}
                            aiList       = {this.state.aiList}
                            rtl          = {this.state.rtl}
                            ltl          = {ltl}
                            handleUpdate = {this.handleUpdate}
                            handleChange = {this.handleChange}
                            handleClick  = {this.handleClick}
                            requestRender= {this.requestRender}
               />
         }
      case "generatePlot":
        return <PlotGroupVars stage = {"next"}
                            plotGroup = {this.state.plotGroup}
                            id = {"0"}
                            source = {"pg"} />
      default:
        return <DefaultContents />
    }
  }
}


export default AdHocAdmin