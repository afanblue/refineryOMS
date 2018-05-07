

export function DigitalInput(i,t,si,so,cs,htc,as,ac,sv,st,pv,pt,lhv,lht,vv) { 
  this.tagId=i; this.tag=t; this.scanInt=si; this.scanOffset=so; this.currentScan=cs; 
  this.histTypeCode=htc; this.alarmState=as; this.alarmCode=ac; this.scanValue=sv;
  this.scanTime=st; this.prevValue=pv; this.prevScanTime=pt; this.lastHistValue=lhv; 
  this.lastHistTime=lht; this.valueView=vv; 
}
