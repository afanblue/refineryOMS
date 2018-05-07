import React, {Component} from 'react';
import {Stage, Layer, Group, Rect} from 'react-konva';
import {IMAGEHEIGHT, IMAGEWIDTH} from '../../../Parameters.js';

import SiteImage from '../SiteImage.js';


class FieldForm extends Component {
  constructor(props) {
    super(props);
    console.log( "FieldForm: " + props.stage );
    this.state = {  };
  }

  scaleX( tkLong, tLong, xScale ) {
    return Math.round(xScale * (tkLong - tLong));
  }

  scaleY( tkLat, tLat, yScale ) {
    return Math.round(yScale * (tkLat - tLat));
  }


  render() {
    const ud = this.props.returnedText;
    const p = ud.parents;
    const f = this.props.field;
    const fieldUpdate = this.props.fieldUpdate;
    const handleQuit = this.props.handleQuit;
    const handleMouseUp = this.props.handleMouseUp;
    const fieldChange = this.props.fieldChange;
    const tankList = this.props.returnedText.tanks;
    
    const site = ud.siteLocation;
    const tag  = ud.tag;
    
    var xDivisor = site.c2Long-site.c1Long;
    var xScale = IMAGEWIDTH / xDivisor;
    var yDivisor = site.c2Lat-site.c1Lat;
    var yScale = IMAGEHEIGHT / yDivisor;

    var xp = this.scaleX( tag.c1Long, site.c1Long, xScale);
    var w  = this.scaleX( tag.c2Long, site.c1Long, xScale) - xp;
    var yp = this.scaleY( tag.c1Lat,  site.c1Lat,  yScale);
    var h  = this.scaleY( tag.c2Lat,  site.c1Lat,  yScale) - yp;
    var color = "red";

    return(
      <div className="oms-tabs">
      <table>
        <tbody>
          <tr>
            <td className="oms-top">

      <form id="FieldForm" >
        Please enter your field information 
        <table>
          <tbody className="scrollContent-narrow">
          <tr>
            <th className="oms-spacing-120">&nbsp;</th>
            <td className="oms-spacing"><img src="images/spacer.png" 
                alt="space" height="5px" width="240px"/>
            </td>
          </tr>
          <tr>
            <th className="oms-spacing-120">Field name (10 chars):</th>
            <td className="oms-spacing">
              <input type="hidden" name="id" value={f.id} />            
              <input type="text" id="tag.name" name="tag.name" value={f.tag.name} 
                     className={["oms-spacing-50","oms-fontsize-12"].join(' ')}  size="10" maxLength="10"
                     onChange={fieldChange} />
            </td>
          </tr>
          <tr>
            <td className="oms-spacing-120">Active:</td>
            <td className="oms-spacing">
              <select id="tag.active" name="tag.active" value={f.tag.active} 
                      onChange={fieldChange} >
                <option value="N">N</option>
                <option value="Y">Y</option>
              </select>
            </td>
          </tr>
          <tr>
            <th className="oms-spacing-120">Description:</th>
            <td className="oms-spacing">
              <input type="text" id="tag.description" name="tag.description" value={f.tag.description}
                     className={["oms-spacing-120","oms-fontsize-12"].join(' ')}  size="120" maxLength="120"
                     onChange={fieldChange} />
            </td>
          </tr>
          <tr>
            <th className="oms-spacing-120">Road Image:</th>
            <td className="oms-spacing">
              <input type="text" id="roadImage" name="roadImage" value={f.roadImage}
                     className={["oms-spacing-180","oms-fontsize-12"].join(' ')}  size="120" maxLength="120"
                     onChange={fieldChange} />
            </td>
          </tr>
          <tr>
            <th className="oms-spacing-120">Satellite Image:</th>
            <td className="oms-spacing">
              <input type="text" id="satelliteImage" name="satelliteImage" value={f.satelliteImage} 
                     className={["oms-spacing-180","oms-fontsize-12"].join(' ')}  size="120" maxLength="120" 
                     onChange={fieldChange} />
            </td>
          </tr>
          <tr>
            <th className="oms-spacing-120">NW Corner (latitude):</th>
            <td className="oms-spacing">
              <input type="text" id="tag.c1Lat" name="tag.c1Lat" value={f.tag.c1Lat} 
                     className={["oms-spacing-90","oms-fontsize-12"].join(' ')}  size="20" maxLength="12" 
                     onChange={fieldChange} />
            </td>
          </tr>
          <tr>
            <th className="oms-spacing-120">NW Corner (longitude):</th>
            <td className="oms-spacing">
              <input type="text" id="tag.c1Long" name="tag.c1Long" value={f.tag.c1Long}
                     className={["oms-spacing-90","oms-fontsize-12"].join(' ')}  size="20" maxLength="12" 
                     onChange={fieldChange} />
            </td>
          </tr>
          <tr>
            <th className="oms-spacing-120">SE Corner (latitude):</th>
            <td className="oms-spacing">
              <input type="text" id="tag.c2Lat" name="tag.c2Lat" value={f.tag.c2Lat} 
                     className={["oms-spacing-90","oms-fontsize-12"].join(' ')}  size="20" maxLength="12" 
                     onChange={fieldChange} />
            </td>
          </tr>
          <tr>
            <th className="oms-spacing-120">SE Corner (longitude):</th>
            <td className="oms-spacing">
              <input type="text" id="tag.c2Long" name="tag.c2Long" value={f.tag.c2Long}
                     className={["oms-spacing-90","oms-fontsize-12"].join(' ')} size="20" maxLength="12" 
                     onChange={fieldChange} />
            </td>
          </tr>
          <tr>
            <th className="oms-spacing-120">Parent:</th>
            <td className="oms-spacing">
              <select id="parentId" name="parentId" value={f.parentId}
                      onChange={fieldChange} >
                {p.map( 
                  function(n,x){
                    return <option key={x} value={n.id}>{n.tag.name}</option>
                  } )
                }
              </select>
            </td>
          </tr>
          <tr>
            <th className="oms-spacing-120">Tanks in Unit:</th>
            <td>
              <select multiple={true} name="childTanks" id="childTanks" value={f.childTanks} size={10}
                     className= {["oms-spacing-120","oms-fontsize-12"].join(' ')} 
                     onChange={fieldChange}>
                {tankList.map(function(n,x) {
                            return <option key={x} value={n.id}>{n.name}</option>
                          } )
                }
              </select>
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
                           value="Submit" onClick={(e) => {fieldUpdate(e)}} />
            </td>
          </tr>
          </tbody>
        </table>
      </form>

            </td>
            <td>
              <Stage height={IMAGEHEIGHT} width={IMAGEWIDTH}>
                <Layer>
                  <Group>
                    <SiteImage handleMouseUp={handleMouseUp} />
                    <Rect x={xp} y={yp} width={w} height={h} stroke={color} strokeWidth={1} />
                  </Group>
                </Layer>
              </Stage>
            </td>
          </tr>
        </tbody>
      </table>
      
      </div>
    );    
      
  }
  
}

export default FieldForm;
