import React, {Component} from 'react';
//import {Stage, Layer} from 'react-konva';

//import SiteImage from '../SiteImage.js';
//import {IMAGEHEIGHT, IMAGEWIDTH} from '../../../Parameters.js';


class ControlBlockForm extends Component {
  constructor(props) {
    super(props);
    console.log( "CBForm: " + props.stage );
    this.state = {  };
  }

  render() {
    const ctrlBlk = this.props.cb;
    let allCBs = ctrlBlk.allOutputs;
    let blank = {};
    blank.id = 0;
    blank.name = "---";
    allCBs.unshift(blank);
    const allDIs = ctrlBlk.allDInputs;
    allDIs.unshift(blank);
    const allAIs = ctrlBlk.allAInputs;
    allAIs.unshift(blank);
    const ctrlBlkUpdate = this.props.cbUpdate;
    const fieldChange = this.props.fieldChange;
    const handleQuit = this.props.handleQuit;
    let outSelect = ctrlBlk.output;
    let inSelect = null;
    if( ctrlBlk.id === 0 ) {
      outSelect = <select name="id" id="id" value={ctrlBlk.id} className= {["oms-spacing-180","oms-fontsize-12"].join(' ')} onChange={fieldChange}>{allCBs.map(function(n,x) {var z=n.id+"."+n.name; return <option key={x} value={z}>{n.name}</option>})}</select>;
    }
    if( ctrlBlk.id === 0 ) {
      inSelect = <select name="tagId" id="tagId" value={ctrlBlk.tagId} className= {["oms-spacing-180","oms-fontsize-12"].join(' ')} onChange={fieldChange}>{allAIs.map(function(n,x) {return <option key={x} value={n.id}>{n.name}</option>})}{allDIs.map(function(n,x) {return <option key={x} value={n.id}>{n.name}</option>})}</select>;
    } else {
      if( ctrlBlk.blkType === "analog" ) {
        inSelect = <select name="tagId" id="tagId" value={ctrlBlk.tagId} className= {["oms-spacing-180","oms-fontsize-12"].join(' ')} onChange={fieldChange}>{allAIs.map(function(n,x) {return <option key={x} value={n.id}>{n.name}</option>})} </select>;
      } else {
        inSelect = <select name="tagId" id="tagId" value={ctrlBlk.tagId} className= {["oms-spacing-180","oms-fontsize-12"].join(' ')} onChange={fieldChange}>{allDIs.map(function(n,x) {return <option key={x} value={n.id}>{n.name}</option>})}</select>;
      }
    }
    return(
      <div className="oms-tabs">
        <table>
          <tbody>
            <tr>
              <td className="oms-top">
        <form id="ctrlBlkForm" >
          Please enter your control block information 
          <table>
            <tbody className="scrollContent-narrow">
              <tr>
                <th className="oms-spacing-90">&nbsp;</th>
                <td className="oms-spacing-180"><img src="images/spacer.png" 
                    alt="space" height="5px" width="180px"/></td>
              </tr>
              <tr>
                <th className="oms-spacing-90">Output:</th>
                <td className="oms-spacing-180">
                  {outSelect}
                </td>
              </tr>
              <tr>
                <th className="oms-spacing-90">Input:</th>
                <td className="oms-spacing-180">
                  {inSelect}
                </td>
              </tr>
              <tr>
                <th className="oms-spacing-90">Block Type:</th>
                <td className="oms-spacing-180">
                  {ctrlBlk.blockType}
                </td>
              </tr>
  
            </tbody>
          </table>
          <table className="oms-spacing">
            <tbody>
              <tr className="oms-spacing">
                <td>
                  <input type="submit" id="closeForm"  name="closeForm"  
                         value="Quit" className="oms-spacing"
                         onClick={(e) => {handleQuit(e)}} />
                  &nbsp;<input type="submit" id="submitForm" name="submitForm" 
                               value="Submit" className="oms-spacing"
                               onClick={(e) => {ctrlBlkUpdate(e)}}/>
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

export default ControlBlockForm;
