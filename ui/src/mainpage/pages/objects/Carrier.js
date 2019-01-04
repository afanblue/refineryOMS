/*************************************************************************
 * Carrier.js
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


export function Carrier(i,n,d,ttc,ttId,m,a,q) { 
  this.id=i; this.name=n; this.description=d; this.tagTypeCode=ttc; this.tagTypeId=ttId;
  this.misc=m; this.active=a; this.quantity=q; 
}
