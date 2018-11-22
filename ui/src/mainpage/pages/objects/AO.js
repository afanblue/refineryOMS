/*************************************************************************
 * AO.js
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

export function AnalogOutput(i,t,zv,mv, htc,p,s,sv,st, pv,pt,lhv,lht,u) { 
  this.tagId=i; this.tag=t; this.zeroValue=zv; this.maxValue=mv; 
  this.histTypeCode=htc; this.percent=p; this.slope=s; this.scanValue=sv; this.scanTime=st;
  this.prevValue=pv; this.prevTime=pt; this.lastHistValue=lhv; this.lastHistTime=lht;
  this.unitId=u; 
}
