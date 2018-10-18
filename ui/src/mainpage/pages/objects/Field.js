/*************************************************************************
 * Field.js
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


export function Field(i,n,d,ttc,ttid,m,c1t,c1l,c2t,c2l,a,pid,pn,ri,si) { 
  this.id=i; this.name = (n===null)?'':n; this.description = (d===null)?'':d; 
  this.tagTypeCode = (ttc===null)?'FLD':ttc; this.tagTypeId = (ttid===null)?'':ttid;  
  this.c1Lat = c1t; this.c1Long=c1l;  this.c2Lat=c2t; this.c2Long=c2l; 
  this.active=(a===null)?'N':a; this.misc=m;
  this.parentId=pid; this.parent=pn; 
  this.roadImage=ri; this.satelliteImage=si; this.parents=null;
  this.tanks=null; this.siteLocation=null; this.childTanks = null; }
