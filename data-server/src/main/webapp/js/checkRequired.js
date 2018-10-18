/*******************************************************************************
 * Copyright (C) $(date) A. E. Van Ness
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
 *******************************************************************************/
String.prototype.initCap = function () {
   return this.toLowerCase().replace(/(?:^|\s)[a-z]/g, function (m) {
      return m.toUpperCase();
   });
};
function checkRequired(f) {
  //alert("checkRequired "+ f);
  rtn = "";
  delim = "";
  for (var i = 0, len = f.length; i < len; i++) {
	//alert( f[i] );
    fp = document.getElementById(f[i]);
    //alert( f[i] + " (" + fp.type + ") = " + fp.value );
    if( ("select-one" == fp.type) || ("select-multiple" == fp.type) ) {
      if( -1 == fp.selectedIndex ) {
    	  rtn += delim + f[i];
    	  delim = ", ";
      }
    } else {
      if( (null == fp) || (null == fp.value) || ("" == fp.value ) ) {
        rtn += delim + f[i];
        delim = ", ";
      }
    }
  }
  return rtn.initCap();
}
