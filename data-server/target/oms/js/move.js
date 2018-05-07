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

