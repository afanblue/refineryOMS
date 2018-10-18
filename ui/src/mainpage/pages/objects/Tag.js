/*************************************************************************
 * Tag.js
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


export function Tag(i,n,d,ttc,ttid,m,c1t,c1l,c2t,c2l,a) {
   this.id = i; this.name = (n===null)?'':n; this.description = (d===null)?'':d; 
   this.tagTypeCode = (ttc===null)?'':ttc; this.tagTypeId = (ttid===null)?'':ttid;  
   this.c1Lat = c1t; this.c1Long=c1l;  this.c2Lat=c2t; this.c2Long=c2l; 
   this.active=(a===null)?'N':a; this.misc=m;
}

export function Taglet(i,n,d,ttc,tti,a) {
   this.id = i; this.name = (n===null)?'':n; this.description = (d===null)?'':d; 
   this.tagTypeCode = (ttc===null)?'':ttc; this.tagTypeInfo = tti; 
   this.active=(a===null)?'N':a;
}

export function RelTagTag(i,cid,c,pid,p) {
  this.id = i; this.childTagId=cid; this.child=(c===null)?'':c; 
  this.parentTagId=pid; this.parent=(p===null)?'':p;
}

export function IdName( i, n) {
  this.id = i; this.name=n;
}