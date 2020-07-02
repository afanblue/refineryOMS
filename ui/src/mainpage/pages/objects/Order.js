/*************************************************************************
 * Order.js
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
import moment    from 'moment';


export function Order(i,ci,c,a,p,xd,ad,xv,av,cnts,cid,dly,cr,items ) {
  let fmt = "YYYY-MM-DD HH:MM:SS";
  this.id=i; this.customerId=ci; this.customer=c;
  this.purchase=p; this.active=a; this.contents=cnts;
  this.carrier=cr;
  this.expDate=(xd===null||xd===undefined)?"":moment.utc(xd*1).local().format(fmt);
  this.actDate=(ad===null||ad===undefined)?"":moment.utc(ad*1).local().format(fmt);
  this.expVolume=(xv===null?0:xv); this.actVolume=(av===null?0:av);
  this.crontabId=null; this.delay=0;
  this.items=items;
}

export function Item(si,ino,sts,nw,ccd,xvn,xvx,av,cid,c,stnId,stn,xfrId,xfr) {
  this.id=si; this.itemNo=ino; this.active=sts;
  this.newItem=(nw==="Y"?nw:"N"); this.contentCd=ccd;
  this.expVolumeMin=xvn; this.expVolumeMax=xvx;
  this.actVolume=(av===null?0:av);
  this.carrierId=cid; this.carrier=c;
  this.stationId=stnId; this.station=stn;
  this.transferId=xfrId; this.transfer=xfr;
}
