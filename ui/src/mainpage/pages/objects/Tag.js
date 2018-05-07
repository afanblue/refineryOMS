

export function Tag(i,n,d,ttc,c1t,c1l,c2t,c2l,a) {
   this.id = i; this.name = (n===null)?'':n; this.description = (d===null)?'':d; 
   this.tagTypeCode = (ttc===null)?'':ttc; this.c1Lat = c1t; this.c1Long=c1l; 
   this.c2Lat=c2t; this.c2Long=c2l; this.active=(a===null)?'N':a;
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