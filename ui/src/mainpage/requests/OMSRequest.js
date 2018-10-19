/*************************************************************************
 * OMSRequest.js
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

import Log          from './Log.js';

class OMSRequest {
  constructor(id,uri,erm,fComplete) {
//    Log.info( "Request: " + props.stage ); 
    this.uri = uri; 
    this.identifier= id;
    this.errMsg = erm;
    this.fetchData = this.fetchData.bind(this);
    this.rtndData = null;
    this.fc = fComplete;
  }
  
  fetchData() {
    const now = new Date();
    Log.info( this.identifier+" "+ now.toISOString() + " Request: " + this.uri );
    const erm = this.errMsg;
/* --
    const request = async () => {
      const response = await fetch(this.uri);
      if (response.status === 200) {
        const json = await response.json();
        this.fc(json);
      }
      throw new Error(erm+"\n"+response.status);
    }
    request();
-- */  
/* */
    return fetch(this.uri)
      .then(this.handleErrors)
      .then(response => {
        var contentType = response.headers.get("Content-Type");
        if(contentType && contentType.includes("application/json")) {
          return response.json();
        }
        throw new TypeError(this.identifier + ": response ("+contentType+") must be a JSON string");
    }).then(json => {
        let x = json;
        Log.info("json: "+x);
        this.fc(x);
    }).catch(function(error) { 
        alert(erm+"\n"+error);
        Log.error(": Error - " + error);  
    });
/* */
  }
}

export default OMSRequest;