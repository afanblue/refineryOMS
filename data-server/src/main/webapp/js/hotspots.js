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

