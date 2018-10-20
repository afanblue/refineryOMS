/*************************************************************************
 * AI.js
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

import {Tag} from './Tag.js';

export function AnalogInput(i,t,tc,si,so,cs,zv,mv,htc,p,s,rv,sv,st,pv,pt,lhv,lht,hh,hi,lo,ll,u) { 
  this.tagId=i; this.tag=t; this.analogTypeCode=tc; this.unitId=u; this.scanInt=si; 
  this.scanOffset=so; this.currentScan=cs; this.zeroValue=zv; this.maxValue=mv; 
  this.histTypeCode=htc; this.percent=p; this.slope=s; this.rawValue=rv; 
  this.scanValue=sv; this.scanTime=st; this.prevValue=pv; this.prevTime=pt; 
  this.lastHistValue=lhv; this.lastHistTime=lht; this.hh=hh; this.hi=hi; 
  this.lo=lo; this.ll=ll; this.intSinceLhs=null; this.intScanTime=null;
  this.simValue=null; this.simScanTime=null; this.updated=null;
  this.calm=[]; this.siteLocation=new Tag();
}
