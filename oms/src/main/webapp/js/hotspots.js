function HotSpot( c1y, c1x, c2y, c2x, uri ) {
this.c1Lat=c1y;
this.c1Long=c1x;
this.c2Lat=c2y;
this.c2Long=c2x;
this.uri=uri;
this.Between = function(v,vmin,vmax) { vn=vmin>=vmax?vmax:vmin; vx=vmin>=vmax?vmin:vmax; return (v>=vn && v<=vx);}
this.InLat  = function(l){ return this.Between(l,this.c1Lat, this.c2Lat);}
this.InLong = function(l){ return this.Between(l,this.c1Long,this.c2Long);}
}

hotSpots = new Array();


function CheckHotSpot(e) {
  x=e.clientX;
  y=e.clientY;
//  alert('Number elements: '+hotSpots.length);
  for(i=0; i<hotSpots.length; i++ ) {
    var hs = hotSpots[i];
    if( hs == null ) { alert('hs('+i+') is null'); }
    if( hs.InLat(y) && hs.InLong(x) ) {
//      alert(hs.uri);
      return hs.uri
    }
  }
  return null;
}

