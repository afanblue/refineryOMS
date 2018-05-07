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
