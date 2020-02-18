/*************************************************************************
 * SiteOverview.js
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
/* eslint-env node, browser, es6 */

import React, {Component} from 'react';
import PropTypes          from 'prop-types';

import {SERVERROOT}    from '../../Parameters.js';
import Log             from '../requests/Log.js';
import DefaultContents from './DefaultContents.js';
import Field           from './Field.js';
import Waiting         from './Waiting.js';


/*
 * select f.id, f.satellite_image image, c1_lat, c1_long, c2_lat, c2_long
	 from field f join tag t on f.id = t.id
	where t.name='DeCity';

	select field_tag_id, child_tag_id from field_tag_vw ftv, tank tk
	 where ftv.child_tag_id=tk.id and ftv.field_tag_id= 1;
 */

class SiteOverview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stage: props.stage,
      updateData: false,
      updateDisplay: true,
      returnedText: null,
      tankType: props.tankType
    };
  }

  static get propTypes() {
      return {
          stage: PropTypes.string,
          tankType: PropTypes.any
      }
  }

  componentDidMount() {
    this.fetchSite();
  }


  handleErrors(response) {
    if (!response.ok) {
        throw Error(response.status+" ("+response.statusText+")");
    }
    return response;
  }



  fetchSite() {
    const clsMthd = "SiteOverview.fetchList";
    const myRequest = SERVERROOT + "/config/SITE";
    if( myRequest !== null ) {
      const request = async () => {
        try {
          const response = await fetch(myRequest);
          const json = await response.json();
          this.setState( {site: json.value,
                          updateData: false,
                          updateDisplay:true,
                          stage: "dataFetched" } );
        } catch( e ) {
          const emsg = "Problem fetching field list";
          alert(emsg+"\n"+e);
          Log.error(emsg+" - " + e, clsMthd);
        }
      }
      request();
    }
  }

  render() {
    switch (this.state.stage) {
      case "begin":
        return <Waiting />
      case "dataFetched":
        return <Field stage="begin"
                      field={this.state.site}
                      tankType={this.state.tankType} />
      default:
        return <DefaultContents />
    }
  }
}

export default SiteOverview;