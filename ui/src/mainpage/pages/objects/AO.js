//import {Tag} from './Tag.js';

export function AnalogOutput(i,t,zv,mv, htc,p,s,sv,st, pv,pt,lhv,lht,u) { 
  this.tagId=i; this.tag=t; this.zeroValue=zv; this.maxValue=mv; 
  this.histTypeCode=htc; this.percent=p; this.slope=s; this.scanValue=sv; this.scanTime=st;
  this.prevValue=pv; this.prevTime=pt; this.lastHistValue=lhv; this.lastHistTime=lht; this.unitId=u; 
  this.histTypes=[]; this.unitList=[]; 
}
