/*************************************************************************
 * Alarm.js
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

/*
 * "id":5,"objId":null,"abbr":"HH","message":"High High Alarm"
 */

export function Alarm(i,t,ao,ack,act,pri,c,clr,msg,v) {
  this.id=i; this.tagId=t; this.almOccurred=ao; this.acknowledged=ack;
  this.active=act; this.priority=pri; this.code=c; this.color=clr;
  this.message=msg; this.value=v;
}

export function AlarmMsg(i,a,m) {
  this.id=i; this.abbr=a; this.message=m;
}

export function AlarmType(i,p,c,mid,msg) {
  this.id=i; this.priority=p; this.code=c;
  this.alarmMsgId=mid; this.alarmMsg=msg;
}
