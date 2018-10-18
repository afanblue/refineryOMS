/*************************************************************************
 * Tank.js
 * Copyright (C) 2018  A. E. Van Ness
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
 * id   = id of tank
 * t    = tag object for tank
 * a    = api (unused)
 * d    = density (unused)
 * h    = height of tank
 * dc   = diameter of tank
 * u    = units for height & diameter
 * ct   = content type
 * ctc  = content type code
 * tt   = temperature tag name
 * tid  = temperature tag id
 * trid = temperature rel_tag_tag id
 * lt   = level tag name
 * lid  = level tag id
 * lrid = level rel_tag_tag id
 * v    = array of volume [level,volume] objects
 */
export function Tank(i,t,a,d,h,dc,u,ct,ctc,tt,lt,tid,lid,trid,lrid,v) { 
  this.id=i; this.tag=t; this.api=a; this.density=d;
  this.height=h; this.diameter=dc; this.units=u; 
  this.contentType=ct; this.contentTypeCode=ctc; 
  this.tempTag=tt;  this.tempId=tid; 
  this.tempRttId=(trid===null||trid===undefined?0:trid); 
  this.levelTag=lt; this.levelId=lid; 
  this.levelRttId=(lrid===null||lrid===undefined?0:lrid); 
  this.volumes=v;
}
