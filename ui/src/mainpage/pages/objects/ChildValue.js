/*************************************************************************
 * ChildValue.js
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


/* shows up as ChildValue in Java routines 
 * {"id":369,"name":"Dock1","description":"","tagTypeCode":"SCO","tagTypeId":null,"misc":"SH"
 * ,"c1Lat":498.0,"c1Long":403.0,"c2Lat":620.0,"c2Long":465.0
 * ,"active":"Y","parentId":342,"relTagId":null
 * ,"inpTagId":null,"inpRelTagId":328,"inpTagName":"DI-Ship1","inpValue":0.0,"inpType":"DI"
 * ,"inpMax":1.0,"inpZero":0.0
 * ,"outTagId":null,"outRelTagId":null,"outTagName":null,"outValue":null,"outType":null
 * ,"outMax":null,"outZero":null}
 */
/*
 * Case misc
 *   G:   c2Lat =c1Lt+(c2Lt-c1Lt)>(c2Lg-c1Lg)?(c2Lg-c1Lg):(c2Lt-c1Lt);
 *        c2Long=c1Lg+(c2Lt-c1Lt)>(c2Lg-c1Lg)?(c2Lg-c1Lg):(c2Lt-c1Lt);
 *   HP:  c2Lat =c1Lt+15;
 *        c2Long=c1Lg+10;
 *   HV:  c2Lat =c1Lt+12;
 *        c2Long=c1Lg+24;
 *   P:   (as provided)
 *   RU:  c2Lat =c1Lt+60;
 *        c2Long=c2Lg+36;
 *   S:   c2Lat =c1Lt+100;
 *        c2Long=c2Lg+100;
 *   TK:  (as provided)
 *   T:   (as provided)   
 *   VP:  c2Lat =c1Lt+10
 *        c1Long=c1Lg+15
 *   VV:  c2Lat =c1Lt+24
 *        c2Long=c2Lg+12
 *
 *  Currently the vtxList is only used by the P
 */

export function ChildValue(i,n,d,a,tt,ttid,m,c1Lt,c1Lg,c2Lt,c2Lg,pid,rtid
                          ,itId,itName,itVal,itType,irtid,itMx,itz,iac
                          ,otId,otName,otVal,otType,ortid,otMx,otz,oac,vtl) { 
  this.id=i; this.name=n; this.description=(d!=null?d:""); 
  this.tagTypeCode=(tt!==null?tt:'SCO');   this.tagTypeId=(ttid!==null?ttid:0);
  this.misc=(m===null?"":m);
  this.active=a; 
  this.c1Lat=(c1Lt!==null?c1Lt:0);         this.c1Long=(c1Lg!==null?c1Lg:0);
  this.c2Lat =(c2Lt!==null?c2Lt:0);        this.c2Long=(c2Lg!==null?c2Lg:0);
  this.parentId=pid;                       this.relTagId=(rtid!==null?rtid:0); 
  this.inpTagId=(itId===null?0:itId);      this.inpRelTagId=(irtid!==null?irtid:0); 
  this.inpTagName=itName;                  this.inpValue=(itVal===null?0:itVal);
  this.inpType=itType;                     
  this.inpMax=(itMx===null?0:itMx);        this.inpZero=(itz===null?0:itz);
  this.inpAlmColor=iac;
  this.outTagId=(otId===null?0:otId);      this.outRelTagId=(ortid!==null?ortid:0);
  this.outTagName=otName;                  this.outValue=(otVal===null?0:otVal);
  this.outType=otType;                     
  this.outMax=(otMx===null?0:otMx);        this.outZero=(otz===null?0:otz);
  this.outAlmColor=oac;
  this.vtxList=((vtl===null||vtl===undefined)?[]:vtl);
}

