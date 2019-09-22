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


export function Order(i,ci,c,cri,cr,a,p,xd,ad,xv,av) {
  let fmt = "YYYY-MM-DD";
  let now = moment().format(fmt);
  this.shipmentId=i; this.customerId=ci; this.customer=c; this.carrierId=cri;
  this.carrier=cr; this.active=a; this.purchase=p; 
  this.expDate = (xd===null)?now:moment.utc(xd*1).format(fmt); 
  this.actDate = (ad===null)?"":moment.utc(ad*1).format(fmt);
  this.expVolume=xv; this.actVolume=av; this.items=null;
}

export function Item(si,ino,nw,ccd,xvn,xvx,av) {
  this.shipmentId=si; this.itemNo=ino; 
  this.newItem=(nw==="Y"?nw:"N"); this.contentCd=ccd;
  this.expVolumeMin=xvn; this.expVolumeMax=xvx; 
  this.actVolume=(av===null?0:av);
}
