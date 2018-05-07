//import React, {Component} from 'react';


export function Field(i,t,pid,pn,ri,si) { 
  this.id=i; this.tag=t; this.parentId=pid; this.parent=pn; 
  this.roadImage=ri; this.satelliteImage=si; this.parents=null;
  this.tanks=null; this.siteLocation=null; this.childTanks = null; }
