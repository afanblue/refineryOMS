/*************************************************************************
 * Waiting.js
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
import Log          from '../requests/Log.js';


class Waiting extends Component {
  constructor(props) {
    super(props);
    Log.info( "Waiting " );
  }
  render () {
    return (    
    <table><tbody><tr>
      <td className="oms-padded-menu-text">Waiting ...</td>
      <td><img src="./images/spacer.png" alt="space" width="20px" height="480px" /></td>
    </tr></tbody></table> 
    )}
}

export default Waiting