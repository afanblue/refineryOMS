/*************************************************************************
 * Schematic.js
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


export function Schematic(i,n,d,a,tt,ttid,m,c1Lt,c1Lg,c2Lt,c2Lg,cts) { 
  this.id=i; this.name=n; this.description=(d!=null?d:""); this.active=a; 
  this.tagTypeCode=(tt!==null?tt:'SCM'); this.tagTypeId=(ttid!==null?ttid:0);
  this.c1Lat=(c1Lt!==null?c1Lt:0); this.c1Long=(c1Lg!==null?c1Lg:0);
  this.c2Lat=(c2Lt!==null?c2Lt:0); this.c2Long=(c2Lg!==null?c2Lg:0);
  this.misc=(m===null?0:m); this.childTags=cts;
}

