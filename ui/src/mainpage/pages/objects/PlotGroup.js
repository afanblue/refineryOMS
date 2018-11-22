/*************************************************************************
 * PlotGroup.js
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

/**
 * This object defines the plot group.  We provide active transfers as 
 * fake plot groups cause that might be interesting information, but
 * we need to distinguish between a real plot group and a fake.
 * 
 * i   = plot group ID
 * n   = plot group name
 * a   = active flag
 * id1 = ID for first tag
 * id2 = ID for second tag
 * id3 = ID for third tag
 * id4 = ID for fourth tag
 * aiList = the list of tags to return to the server to update the plot
 *          group object.
 * s   = source [PG (plot group) or X (transfer)]
 */
export function PlotGroup(i,n,a,id1,id2,id3,id4,s) { 
  this.id=i; this.name=n; this.active=a; this.id1=id1;
  this.id2=id2; this.id3=id3; this.id4=id4;
  this.aiList=null; this.source=s;
}

/**
 * This is an object that defines the "details" for a plot
 * n = number of days to request; the end point is always now
 * mx1 = max value for tag 1
 * mn1 = minimum value for tag 1
 * (etc)
 */
export function PlotDetails(n,mx0,mn0,mx1,mn1,mx2,mn2,mx3,mn3) {
  this.numberDays=n;
  this.max0=mx0; this.min0=mn0;
  this.max1=mx1; this.min1=mn1;
  this.max2=mx2; this.min2=mn2;
  this.max3=mx3; this.min3=mn3;
}
