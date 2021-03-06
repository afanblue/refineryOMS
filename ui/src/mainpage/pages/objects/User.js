/*************************************************************************
 * User.js
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


export function User(i,a,fn,mn,ln,e,p,st,sts,rid,rn,urId) {
  this.id=i; this.alias=a; this.firstName=fn; this.lastName=ln;
  this.middleName=(mn===null?"":mn); this.userRoleId=urId;
  this.email=(e===null?"":e); this.password=p; this.state=st;
  this.active=((sts===null||sts==="")?"N":sts);
  this.roleId=rid; this.role=(rn===null?"":rn);
}