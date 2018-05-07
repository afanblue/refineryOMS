//import React, {Component} from 'react';



export function Transfer(i,n,sid,s,ttid,tt,srcid,src,destid,dest,est,eet,ev,ast,aet,av,d) { 
  this.id=i; this.name=n; 
  this.statusId=(sid!=null?sid:0); this.status=s; 
  this.transferTypeId=(ttid!==null?ttid:0); this.transferType=tt;
  this.sourceId=(srcid!==null?srcid:0); this.source=src;
  this.destinationId=(destid!==0?destid:0); this.destination=dest;
  this.expStartTime=est; this.expEndTime=eet; this.expVolume=ev; this.delta=d;
  this.actStartTime=ast; this.actEndTime=aet; this.actVolume=av;
}

