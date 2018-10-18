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
/* *****************************************
 * MoveRight moves from the 'npr' select to the 'pr' select
 * and adds the priv to the hidden 'pr' field which is the
 * only one we actually use. 
 */
function MoveRight(d) {
  var ts=document.getElementById("npr");
  var td=document.getElementById("vpr");
  var tf=(d==null)?"pr":d;
  var th=document.getElementById(tf);
  // get the selected priv
  if( ts.selectedIndex >= 0 ) {
    var privID=ts.options[ts.selectedIndex].value;
    var priv=ts.options[ts.selectedIndex].text;
    ts.options[ts.selectedIndex]=null;
    // fix the hidden priv list
    var destList=th.value;
    if( th.value.length == 0 ) {
      destList = privID;
    } else {
      destList=th.value + '|' + privID;
    }
    th.value=destList;
    //alert('List: '+destList+'   id/value: '+privID+'/'+priv);
    // now put it in the new list.
    var noOpts=td.options.length;
    td.options[noOpts]=new Option(priv,privID);
    setDirty();
//    td.options.sort();
  }
}

/* *****************************************
 * MoveLeft moves from the 'pr' select to the 'npr' select
 * and removes the priv from the hidden 'pr' field which is
 * the one we actually use.
 */
function MoveLeft(d) {
  var td=document.getElementById("npr");
  var ts=document.getElementById("vpr");
  var tf=(d==null)?"pr":d;
  var th=document.getElementById(tf);
  // get the selected priv
  if( ts.selectedIndex >= 0 ) {
    var privID=ts.options[ts.selectedIndex].value;
    var priv=ts.options[ts.selectedIndex].text;
    ts.options[ts.selectedIndex]=null;
    // fix the hidden priv list
    var destList=th.value;
    var rEx = "(^"+privID+"\||\|"+privID+"\||\|"+privID+"$)";
    destList=destList.replace(rEx,"");
    th.value=destList;
    // alert('List: '+destList+'   id/value: '+privID+'/'+priv);
    // now put it in the new list.
    var noOpts=td.options.length;
    td.options[noOpts]=new Option(priv,privID);
//    td.options.sort();
    setDirty();
  }
}

