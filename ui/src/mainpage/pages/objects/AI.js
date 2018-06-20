import {Tag} from './Tag.js';

export function AnalogInput(i,t,tc,si,so,cs,zv,mv,htc,p,s,rv,sv,st,pv,pt,lhv,lht,hh,hi,lo,ll,u) { 
  this.tagId=i; this.tag=t; this.tagTypeId=null; this.typeCode=tc; this.unitId=u; this.scanInt=si; 
  this.scanOffset=so; this.currentScan=cs; this.zeroValue=zv; this.maxValue=mv; 
  this.histTypeCode=htc; this.percent=p; this.slope=s; this.rawValue=rv; 
  this.scanValue=sv; this.scanTime=st; this.prevValue=pv; this.prevTime=pt; 
  this.lastHistValue=lhv; this.lastHistTime=lht; this.hh=hh; this.hi=hi; 
  this.lo=lo; this.ll=ll; this.intSinceLhs=null; this.intScanTime=null;
  this.simValue=null; this.simScanTime=null; this.updated=null;
  this.almTypes=[]; this.histTypes=[]; this.aiTypes=[]; this.calm=[];
  this.unitList=[]; 
  this.siteLocation=new Tag();
}
